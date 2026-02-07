import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  Renderer2,
  HostListener,
  forwardRef,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'wa-tree',
  exportAs: 'waTree',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaTreeDirective),
      multi: true
    }
  ]
})
export class WaTreeDirective implements OnChanges, ControlValueAccessor {
  // Inputs
  @Input() selection: 'single' | 'multiple' | 'leaf' | null = null;
  /** Name of the tree, used for querySelector targeting */
  @Input() name?: string;

  // Outputs
  @Output() waSelectionChange = new EventEmitter<any>();
  @Output('wa-selection-change') waSelectionChangeHyphen = this.waSelectionChange;

  // Styling inputs
  @Input() indentSize?: string;
  @Input() indentGuideColor?: string;
  @Input() indentGuideOffset?: string;
  @Input() indentGuideStyle?: string;
  @Input() indentGuideWidth?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // CVA internals
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private isDisabled = false;
  private modelValue: any[] | any = [];

  ngOnChanges() {
    const tree = this.el.nativeElement as HTMLElement;

    // Set tree name attribute for external querySelector targeting
    if (this.name != null && this.name !== '') {
      this.renderer.setAttribute(tree, 'name', String(this.name));
    } else {
      this.renderer.removeAttribute(tree, 'name');
    }

    // Set selection mode attribute
    if (this.selection) {
      this.renderer.setAttribute(tree, 'selection', this.selection);
    } else {
      this.renderer.removeAttribute(tree, 'selection');
    }

    // Apply custom CSS properties for styling
    this.setCssVar('--indent-size', this.indentSize);
    this.setCssVar('--indent-guide-color', this.indentGuideColor);
    this.setCssVar('--indent-guide-offset', this.indentGuideOffset);
    this.setCssVar('--indent-guide-style', this.indentGuideStyle);
    this.setCssVar('--indent-guide-width', this.indentGuideWidth);
  }

  // Re-emit native selection change for Angular consumers and update ngModel
  @HostListener('wa-selection-change', ['$event'])
  onSelectionChanged(event: CustomEvent) {
    this.waSelectionChange.emit(event);

    const isLeaf = (item: Element): boolean => {
      // A leaf has no wa-tree-item children
      return !(item as HTMLElement).querySelector('wa-tree-item');
    };

    const hasDataOrValue = (item: any): boolean => {
      return item.__waValue !== undefined || item.__waData !== undefined || item.getAttribute?.('value') != null;
    };

    const pickIdentity = (item: any): any => {
      const pref = (item.__waValue !== undefined ? item.__waValue
                  : item.__waData !== undefined ? item.__waData
                  : item.getAttribute?.('value') ?? undefined);
      if (pref !== undefined && pref !== null) return pref;
      // fallback to label, but only if we didn't require data/value; requirement says "data tags"
      return (item.textContent || '').trim();
    };

    const computeValues = (): any[] => {
      const selectedItems = this.el.nativeElement.querySelectorAll('wa-tree-item[selected]');
      const out: any[] = [];
      const seen = new Set<any>();
      selectedItems.forEach((item: any) => {
        if (!isLeaf(item)) return; // include only leaves
        // Only include items that have bound data — result must be data objects
        const data = item.__waData;
        const id = item.__waValue ?? item.getAttribute?.('value');
        if (data === undefined) return;
        const key = id !== undefined && id !== null ? id : data; // prefer value id for dedupe
        if (!seen.has(key)) { seen.add(key); out.push(data); }
      });
      return out;
    };

    const mapDetail = (detailArr: any[]): any[] => {
      const out: any[] = [];
      const seen = new Set<any>();
      detailArr.forEach((item: any) => {
        if (!item) return;
        if (!isLeaf(item)) return;
        const data = item.__waData;
        const id = item.__waValue ?? item.getAttribute?.('value');
        if (data === undefined) return;
        const key = id !== undefined && id !== null ? id : data;
        if (!seen.has(key)) { seen.add(key); out.push(data); }
      });
      return out;
    };

    // Prefer event.detail if provided by the web component
    let values: any[] | null = null;
    const detail: any = (event as any)?.detail;

    // Delta handling: if detail is a single item and selected flag, update model incrementally
    const tryDelta = () => {
      if (!detail) return false;
      // Common shapes: { item, selected } or { target, selected } or direct element
      const changedEl = detail.item ?? detail.target ?? (detail instanceof Element ? detail : null);
      const selectedFlag = typeof detail.selected === 'boolean' ? detail.selected : undefined;
      if (!changedEl || typeof selectedFlag !== 'boolean') return false;
      if (!isLeaf(changedEl)) return false;
      const data = changedEl.__waData;
      const id = changedEl.__waValue ?? changedEl.getAttribute?.('value');
      if (data === undefined) return false;
      // Start from current or empty
      const current: any[] = Array.isArray(this.modelValue) ? [...this.modelValue] : (this.modelValue ? [this.modelValue] : []);
      const keyOf = (x: any) => (x && typeof x === 'object' && ('value' in x || 'id' in x)) ? (x.value ?? x.id) : x;
      const key = id ?? keyOf(data);
      const idx = current.findIndex(v => keyOf(v) === key);
      if (selectedFlag) {
        if (idx === -1) current.push(data);
      } else {
        if (idx !== -1) current.splice(idx, 1);
      }
      values = current;
      return true;
    };

    if (Array.isArray(detail)) {
      values = mapDetail(detail);
    } else if (!tryDelta()) {
      values = computeValues();
    }

    const finalize = (vals: any[]) => {
      const finalValue = this.selection === 'single' ? (vals[0] ?? null) : vals;
      if (this.selection === 'multiple' && Array.isArray(finalValue) && finalValue.length === 0) {
        this.modelValue = [];
        this.onChange([]);
      } else if (this.selection === 'single' && (finalValue === undefined || finalValue === null)) {
        this.modelValue = null;
        this.onChange(null);
      } else {
        this.modelValue = finalValue;
        this.onChange(finalValue);
      }
      this.onTouched();
    };

    finalize(values ?? []);

    // Schedule a microtask recompute since parent toggles may update children after event fires
    Promise.resolve().then(() => {
      const settled = computeValues();
      // If different, emit update
      const eqByKey = (a: any[], b: any[]) => {
        if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
        const toKey = (x: any) => (x && typeof x === 'object' && ('value' in x || 'id' in x)) ? ((x as any).value ?? (x as any).id) : x;
        const ak = a.map(toKey);
        const bk = b.map(toKey);
        return ak.every((v, i) => v === bk[i]);
      };
      const isEqual = eqByKey(this.modelValue, settled);
      if (!isEqual) {
        finalize(settled);
      }
    });
  }

  // ControlValueAccessor implementation
  writeValue(obj: any): void {
    this.modelValue = obj;
    // Reflect into DOM selection state if possible
    const treeEl = this.el.nativeElement as HTMLElement;
    const items = Array.from(treeEl.querySelectorAll('wa-tree-item')) as any[];

    // If empty array/null/undefined provided, clear all selections explicitly
    if (obj == null || (Array.isArray(obj) && obj.length === 0)) {
      items.forEach((item: any) => this.renderer.removeAttribute(item, 'selected'));
      return;
    }

    const isMulti = this.selection === 'multiple' || Array.isArray(obj);
    const arr = isMulti ? (Array.isArray(obj) ? obj : []) : [obj];

    items.forEach((item: any) => {
      // Only reflect selection on leaf items with data/value bindings
      const isLeaf = !(item as HTMLElement).querySelector('wa-tree-item');
      const data = item.__waData;
      const id = item.__waValue ?? item.getAttribute('value');
      const identityMatches = (v: any) => {
        // Compare either by id when present or by strict object reference
        if (id !== undefined && id !== null) {
          const vId = (v && typeof v === 'object' && 'value' in v) ? (v as any).value : (v as any);
          return vId === id;
        }
        return v === data;
      };
      const match = isLeaf && (data !== undefined) && arr.some(identityMatches);
      if (match) {
        this.renderer.setAttribute(item, 'selected', '');
      } else {
        this.renderer.removeAttribute(item, 'selected');
      }
    });
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    const treeEl = this.el.nativeElement as HTMLElement;
    if (isDisabled) {
      this.renderer.setAttribute(treeEl, 'inert', '');
    } else {
      this.renderer.removeAttribute(treeEl, 'inert');
    }
  }

  /**
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
    }
  }
}
