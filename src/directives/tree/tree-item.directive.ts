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

  // Outputs
  @Output() waExpand = new EventEmitter<void>();
  @Output('wa-expand') waExpandHyphen = this.waExpand;
  @Output() waAfterExpand = new EventEmitter<void>();
  @Output('wa-after-expand') waAfterExpandHyphen = this.waAfterExpand;
  @Output() waCollapse = new EventEmitter<void>();
  @Output('wa-collapse') waCollapseHyphen = this.waCollapse;
  @Output() waAfterCollapse = new EventEmitter<void>();
  @Output('wa-after-collapse') waAfterCollapseHyphen = this.waAfterCollapse;
  @Output() lazyChange = new EventEmitter<boolean>();
  @Output() waLazyLoad = new EventEmitter<void>();
  @Output('wa-lazy-load') waLazyLoadHyphen = this.waLazyLoad;

  // Styling inputs
  @Input() selectionBackgroundColor?: string;
  @Input() selectionIndicatorColor?: string;
  @Input() expandButtonColor?: string;
  @Input() showDuration?: string;
  @Input() hideDuration?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  private isTruthy(value: boolean | string | null | undefined): boolean {
    return value === '' || value === true || value === 'true';
  }

  @HostListener('wa-expand')
  onExpand() {
    if (!this.isTruthy(this.disabled)) {
      this.waExpand.emit();
    }
  }

  @HostListener('wa-after-expand')
  onAfterExpand() {
    this.waAfterExpand.emit();
  }

  @HostListener('wa-collapse')
  onCollapse() {
    if (!this.isTruthy(this.disabled)) {
      this.waCollapse.emit();
    }
  }

  @HostListener('wa-after-collapse')
  onAfterCollapse() {
    this.waAfterCollapse.emit();
  }

  @HostListener('wa-lazy-load')
  onLazyLoad() {
    if (this.isTruthy(this.lazy) && !this.isTruthy(this.disabled)) {
      this.waLazyLoad.emit();
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
      this.renderer.setStyle(this.el.nativeElement, name, value);
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
