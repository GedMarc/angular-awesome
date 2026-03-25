import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  HostListener,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: 'wa-tree-item',
  exportAs: 'waTreeItem',
  standalone: true
})
export class WaTreeItemDirective implements OnChanges {
  // Inputs (boolean-like inputs accept boolean or string for plain attribute support)
  @Input() expanded: boolean | string = false;
  @Input() selected: boolean | string = false;
  @Input() disabled: boolean | string = false;
  @Input() lazy: boolean | string = false;

  /** Optional data payload bound to this tree item. Used for two-way binding via ngModel */
  @Input() data: any;
  /** Optional value key; if provided, will be used as value identity */
  @Input() value: any;

  // Outputs — camelCase only; hyphenated aliases removed to prevent infinite
  // re-dispatch loops (HostListener catches native event → emit → Output alias
  // dispatches it back as the same native event → HostListener catches it again).
  @Output() waExpand = new EventEmitter<void>();
  @Output() waAfterExpand = new EventEmitter<void>();
  @Output() waCollapse = new EventEmitter<void>();
  @Output() waAfterCollapse = new EventEmitter<void>();
  @Output() lazyChange = new EventEmitter<boolean>();
  @Output() waLazyLoad = new EventEmitter<void>();

  // Styling inputs
  @Input() selectionBackgroundColor?: string;
  @Input() selectionIndicatorColor?: string;
  @Input() expandButtonColor?: string;
  @Input() showDuration?: string;
  @Input() hideDuration?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  /** Guard flag – prevents re-entrant HostListener → emit → HostListener loops. */
  private emitting = false;

  private isTruthy(value: boolean | string | null | undefined): boolean {
    return value === '' || value === true || value === 'true';
  }

  @HostListener('wa-expand', ['$event'])
  onExpand(event: Event) {
    if (this.emitting || event.target !== this.el.nativeElement) return;
    if (!this.isTruthy(this.disabled)) {
      this.emitting = true;
      try { this.waExpand.emit(); } finally { this.emitting = false; }
    }
  }

  @HostListener('wa-after-expand', ['$event'])
  onAfterExpand(event: Event) {
    if (this.emitting || event.target !== this.el.nativeElement) return;
    this.emitting = true;
    try { this.waAfterExpand.emit(); } finally { this.emitting = false; }
  }

  @HostListener('wa-collapse', ['$event'])
  onCollapse(event: Event) {
    if (this.emitting || event.target !== this.el.nativeElement) return;
    if (!this.isTruthy(this.disabled)) {
      this.emitting = true;
      try { this.waCollapse.emit(); } finally { this.emitting = false; }
    }
  }

  @HostListener('wa-after-collapse', ['$event'])
  onAfterCollapse(event: Event) {
    if (this.emitting || event.target !== this.el.nativeElement) return;
    this.emitting = true;
    try { this.waAfterCollapse.emit(); } finally { this.emitting = false; }
  }

  @HostListener('wa-lazy-load', ['$event'])
  onLazyLoad(event: Event) {
    if (this.emitting || event.target !== this.el.nativeElement) return;
    if (this.isTruthy(this.lazy) && !this.isTruthy(this.disabled)) {
      this.emitting = true;
      try { this.waLazyLoad.emit(); } finally { this.emitting = false; }
    }
  }

  ngOnChanges() {
    const item = this.el.nativeElement as any;

    // Set boolean attributes
    this.setBooleanAttr('expanded', this.expanded);
    this.setBooleanAttr('selected', this.selected);
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('lazy', this.lazy);

    // Store data/value on the DOM element for wa-tree to collect
    if (this.data !== undefined) {
      item.__waData = this.data;
    }
    if (this.value !== undefined) {
      item.__waValue = this.value;
      // Mirror as attribute when it's a primitive for potential CSS/selector usage
      if (typeof this.value === 'string' || typeof this.value === 'number' || typeof this.value === 'boolean') {
        try { this.renderer.setAttribute(item, 'value', String(this.value)); } catch {}
      }
    }

    // Apply custom CSS properties for styling
    this.setCssVar('--selection-background-color', this.selectionBackgroundColor);
    this.setCssVar('--selection-indicator-color', this.selectionIndicatorColor);
    this.setCssVar('--expand-button-color', this.expandButtonColor);
    this.setCssVar('--show-duration', this.showDuration);
    this.setCssVar('--hide-duration', this.hideDuration);
  }

  /**
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.el.nativeElement.style.setProperty(name, value);
    }
  }

  /**
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    const truthy = value === '' || value === true || value === 'true';
    if (truthy) {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }
}
