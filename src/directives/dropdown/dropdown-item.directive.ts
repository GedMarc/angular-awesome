import { Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * WaDropdownItemDirective
 *
 * Angular wrapper for the <wa-dropdown-item> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds attributes: type, checked, value, loading, disabled, label, variant
 * - Emits events: blur, focus
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, icon, details, submenu, etc.
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support on checkbox type
 *
 * Slots:
 * - default: The dropdown item's content
 * - icon: Icon to display at the start of the item (replaces start slot)
 * - details: Additional details like keyboard shortcuts
 * - submenu: Nested dropdown items for creating submenus
 */
@Directive({
  selector: 'wa-dropdown-item',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaDropdownItemDirective),
      multi: true
    }
  ]
})
export class WaDropdownItemDirective implements OnInit, ControlValueAccessor {
  @Input() type?: 'normal' | 'checkbox' | string;
  @Input() checked?: boolean | string;
  @Input() value?: string;
  @Input() loading?: boolean | string;
  @Input() disabled?: boolean | string;
  @Input() label?: string;
  @Input() variant?: 'danger' | string;

  // Style inputs
  @Input() backgroundColorHover?: string;
  @Input() textColorHover?: string;
  @Input() padding?: string;
  @Input() margin?: string;
  @Input() fontSize?: string;

  // Event outputs
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set string attributes
    this.setAttr('type', this.type);
    this.setAttr('value', this.value);
    this.setAttr('label', this.label);
    this.setAttr('variant', this.variant);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('checked', this.checked);
    this.setBooleanAttr('loading', this.loading);
    this.setBooleanAttr('disabled', this.disabled);

    // Set style attributes
    this.setCssVar('--background-color-hover', this.backgroundColorHover);
    this.setCssVar('--text-color-hover', this.textColorHover);
    this.setCssVar('--padding', this.padding);
    this.setCssVar('--margin', this.margin);
    this.setCssVar('--font-size', this.fontSize);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.blurEvent.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => {
      this.focusEvent.emit(event);
    });

    // For checkbox type, listen for checked changes
    if (this.type === 'checkbox') {
      this.renderer.listen(nativeEl, 'checkedChange', (event: CustomEvent<boolean>) => {
        this.onChange(event.detail);
      });
    }
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
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value !== undefined) {
      this.checked = value;
      this.setBooleanAttr('checked', value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.setBooleanAttr('disabled', isDisabled);
  }
}
