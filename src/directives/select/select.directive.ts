import { Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SizeToken, Appearance, normalizeAppearance } from '../../types/tokens';

/**
 * WaSelectWrapperComponent
 *
 * Angular wrapper for the <wa-select> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported select attributes as @Input() properties
 * - Emits events for input, change, focus, blur, etc.
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for wa-option elements
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
@Component({
  selector: 'wa-select',
  standalone: true,
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaSelectWrapperComponent),
      multi: true
    }
  ]
})
export class WaSelectWrapperComponent implements OnInit, OnChanges, ControlValueAccessor {
  // Core input attributes
  @Input() value?: any | any[];
  @Input() label?: string;
  @Input() hint?: string;
  @Input() placeholder?: string;
  @Input() appearance?: Appearance | string;
  @Input() pill?: boolean | string;
  @Input() withClear?: boolean | string;
  @Input() disabled?: boolean | string;
  @Input() multiple?: boolean | string;
  @Input() size?: SizeToken | string;
  @Input() placement?: 'top' | 'bottom' | string;
  @Input() required?: boolean | string;
  @Input() maxOptionsVisible?: number | string;
  @Input() form?: string;
  // Custom tag renderer for multiselect tags
  @Input() getTag?: any;

  // Style inputs
  @Input() backgroundColor?: string;
  @Input() borderColor?: string;
  @Input() borderWidth?: string;
  @Input() boxShadow?: string;
  @Input() backgroundColorCurrent?: string;
  @Input() backgroundColorHover?: string;
  @Input() textColorCurrent?: string;
  @Input() textColorHover?: string;

  // Event outputs
  @Output() inputEvent = new EventEmitter<Event>();
  @Output() changeEvent = new EventEmitter<Event>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() clearEvent = new EventEmitter<CustomEvent>();
  @Output() showEvent = new EventEmitter<CustomEvent>();
  @Output() afterShowEvent = new EventEmitter<CustomEvent>();
  @Output() hideEvent = new EventEmitter<CustomEvent>();
  @Output() afterHideEvent = new EventEmitter<CustomEvent>();
  @Output() invalidEvent = new EventEmitter<CustomEvent>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // Object binding support
  @Input() valueField?: string; // property name to use as key when value is an object
  @Input() trackBy?: (item: any) => string; // custom key generator
  private keyToObject = new Map<string, any>();
  private objectToKey = new WeakMap<object, string>();
  private uidCounter = 0;

  private getKeyFor(val: any): string {
    // primitives and null/undefined -> stringify directly
    if (val == null) { return ''; }
    const t = typeof val;
    if (t !== 'object') { return String(val); }
    // objects
    if (this.objectToKey.has(val)) { return this.objectToKey.get(val)!; }
    let key: string | undefined;
    try {
      if (this.trackBy) {
        key = this.trackBy(val);
      } else if (this.valueField && (val as any)[this.valueField] != null) {
        key = String((val as any)[this.valueField]);
      }
    } catch {}
    if (!key) {
      key = `obj:${++this.uidCounter}`;
    }
    this.objectToKey.set(val as object, key);
    if (!this.keyToObject.has(key)) {
      this.keyToObject.set(key, val);
    }
    return key;
  }

  /** Register an option's value and return the key to set on DOM */
  public registerOptionValue(val: any): string {
    const key = this.getKeyFor(val);
    // ensure reverse map exists for primitives too, to translate back
    if (!this.keyToObject.has(key)) {
      this.keyToObject.set(key, val);
    }
    return key;
  }

  /** Translate raw value(s) from WC back to Angular model values */
  private mapFromKeys(raw: string | string[]): any | any[] {
    const mapOne = (k: string) => this.keyToObject.has(k) ? this.keyToObject.get(k) : k;
    if (Array.isArray(raw)) {
      return raw.map(mapOne);
    }
    return mapOne(raw);
  }

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  /**
   * Internal flag to suppress model updates when we are writing programmatically
   * to the underlying element (prevents feedback loops with MutationObserver/events).
   */
  private isWriting = false;
  private attrObserver?: MutationObserver;

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    this.applyInputs();

    // Set up event listeners
    const handleValueRead = () => {
      const el: any = this.el.nativeElement;
      // Prefer attribute first; fallback to property
      let raw: any = el?.getAttribute?.('value');
      if (raw == null) {
        raw = el?.value ?? '';
      }
      let newValue: string | string[] = raw;
      if (this.multiple === true || this.multiple === 'true' || this.multiple === '') {
        if (Array.isArray(newValue)) {
          // Ensure array if WC already provides it
        } else {
          newValue = String(newValue).split(' ').filter(v => v !== '');
        }
      }
      const mapped = this.mapFromKeys(newValue);
      this.onChange(mapped);
    };

    // Listen to both standard and WebAwesome custom events
    this.renderer.listen(nativeEl, 'input', (event: Event) => {
      this.inputEvent.emit(event);
      handleValueRead();
    });
    this.renderer.listen(nativeEl, 'change', (event: Event) => {
      this.changeEvent.emit(event);
      handleValueRead();
    });
    this.renderer.listen(nativeEl, 'wa-input', (event: CustomEvent) => {
      this.inputEvent.emit(event as unknown as Event);
      handleValueRead();
    });
    this.renderer.listen(nativeEl, 'wa-change', (event: CustomEvent) => {
      this.changeEvent.emit(event as unknown as Event);
      handleValueRead();
    });
    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => {
      this.focusEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.blurEvent.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'wa-clear', (event: CustomEvent) => {
      this.clearEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-show', (event: CustomEvent) => {
      this.showEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-after-show', (event: CustomEvent) => {
      this.afterShowEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-hide', (event: CustomEvent) => {
      this.hideEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-after-hide', (event: CustomEvent) => {
      this.afterHideEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-invalid', (event: CustomEvent) => {
      this.invalidEvent.emit(event);
    });
    // Observe 'value' attribute changes to sync model when WC updates attribute
    try {
      this.attrObserver = new MutationObserver((mutations) => {
        if (this.isWriting) { return; }
        for (const m of mutations) {
          if (m.type === 'attributes' && m.attributeName === 'value') {
            const el: any = this.el.nativeElement;
            const current = el?.value ?? el?.getAttribute?.('value') ?? '';
            let newValue: string | string[] = current;
            if (this.multiple === true || this.multiple === 'true' || this.multiple === '') {
              if (!Array.isArray(newValue)) {
                newValue = String(current).split(' ').filter(v => v !== '');
              }
            }
            const mapped = this.mapFromKeys(newValue);
            this.onChange(mapped);
          }
        }
      });
      this.attrObserver.observe(nativeEl, { attributes: true, attributeFilter: ['value'] });
    } catch {}
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs(): void {
    // Set string attributes
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setAttr('placeholder', this.placeholder);
    this.setAttr('appearance', normalizeAppearance(this.appearance as any));
    this.setAttr('size', this.size);
    this.setAttr('placement', this.placement);
    this.setAttr('form', this.form);
    this.setNumericAttr('max-options-visible', this.maxOptionsVisible);

    // Set boolean attributes (only if true)
    // First clear booleans then reapply to allow toggling off
    const host = this.el.nativeElement as HTMLElement;
    ['pill','with-clear','disabled','multiple','required'].forEach(a => host.removeAttribute(a));
    this.setBooleanAttr('pill', this.pill);
    this.setBooleanAttr('with-clear', this.withClear);
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('multiple', this.multiple);
    this.setBooleanAttr('required', this.required);

    // Styles
    this.setCssVar('--background-color', this.backgroundColor);
    this.setCssVar('--border-color', this.borderColor);
    this.setCssVar('--border-width', this.borderWidth);
    this.setCssVar('--box-shadow', this.boxShadow);
    this.setCssVar('--background-color-current', this.backgroundColorCurrent);
    this.setCssVar('--background-color-hover', this.backgroundColorHover);
    this.setCssVar('--text-color-current', this.textColorCurrent);
    this.setCssVar('--text-color-hover', this.textColorHover);

    // Properties
    if (this.getTag) {
      (this.el.nativeElement as any).getTag = this.getTag;
    }
  }

  /**
   * Exposes the native element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Sets an attribute on the native element if the value is not null or undefined
   */
  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    }
  }

  /**
   * Sets a numeric attribute on the native element if the value is not null or undefined
   */
  private setNumericAttr(name: string, value: number | string | null | undefined) {
    if (value != null) {
      const numericValue = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(numericValue)) {
        this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
      }
    }
  }

  /**
   * Sets a CSS custom property on the native element if the value is truthy
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
    }
  }

  /**
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
      this.isWriting = true;
      try {
        const el: any = this.el.nativeElement;
        // Reflect to property first
        if (this.multiple === true || this.multiple === 'true' || this.multiple === '') {
          if (Array.isArray(value)) {
            const keys = value.map(v => this.getKeyFor(v));
            this.renderer.setProperty(el, 'value', keys);
            if (keys.length === 0) {
              this.renderer.removeAttribute(el, 'value');
            } else {
              this.setAttr('value', keys.join(' '));
            }
          } else if (value == null || value === '') {
            this.renderer.setProperty(el, 'value', []);
            this.renderer.removeAttribute(el, 'value');
          } else {
            const key = this.getKeyFor(value);
            this.renderer.setProperty(el, 'value', [key]);
            this.setAttr('value', key);
          }
        } else {
          if (value == null || value === '') {
            this.renderer.setProperty(el, 'value', '');
            this.renderer.removeAttribute(el, 'value');
          } else {
            const key = this.getKeyFor(value);
            this.renderer.setProperty(el, 'value', key);
            this.setAttr('value', key);
          }
        }
      } finally {
        Promise.resolve().then(() => (this.isWriting = false));
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Reflect disabled in both property and attribute space
    this.renderer.setProperty(this.el.nativeElement, 'disabled', !!isDisabled);
    if (isDisabled) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
    } else {
      this.el.nativeElement.removeAttribute('disabled');
    }
  }
}

/**
 * WaOptionDirective
 *
 * Angular wrapper for the <wa-option> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds value, label, and disabled attributes
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content
 * - Supports custom styling via CSS variables
 */
@Component({
  selector: 'wa-option',
  standalone: true,
  template: '<ng-content></ng-content>'
})
export class WaOptionComponent implements OnInit {
  @Input() value?: any;
  @Input() label?: string;
  @Input() disabled?: boolean | string;

  // Style inputs
  @Input() backgroundColorCurrent?: string;
  @Input() backgroundColorHover?: string;
  @Input() textColorCurrent?: string;
  @Input() textColorHover?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private parent = inject(WaSelectWrapperComponent, { optional: true } as any);

  ngOnInit() {
    // Compute and set the actual DOM value (string key)
    let domValue: string | undefined;
    if (this.value != null) {
      try {
        domValue = this.parent ? this.parent.registerOptionValue(this.value) : String(this.value);
      } catch {
        domValue = String(this.value);
      }
    }

    // Set attributes
    this.setAttr('value', domValue);
    this.setAttr('label', this.label);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('disabled', this.disabled);

    // Set style attributes
    this.setCssVar('--background-color-current', this.backgroundColorCurrent);
    this.setCssVar('--background-color-hover', this.backgroundColorHover);
    this.setCssVar('--text-color-current', this.textColorCurrent);
    this.setCssVar('--text-color-hover', this.textColorHover);
  }

  /**
   * Sets an attribute on the native element if the value is not null or undefined
   */
  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    }
  }

  /**
   * Sets a CSS custom property on the native element if the value is truthy
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
    }
  }

  /**
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    }
  }
}
