import { Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * WaMenuDirective
 *
 * Angular wrapper for the <wa-menu> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds size attribute
 * - Emits select event
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for menu items and labels
 * - Supports custom styling via CSS variables
 */
@Directive({
  selector: 'wa-menu',
  standalone: true
})
export class WaMenuDirective implements OnInit {
  @Input() size?: 'small' | 'medium' | 'large' | 'inherit' | string;

  // Style inputs
  @Input() padding?: string;
  @Input() margin?: string;
  @Input() borderRadius?: string;
  @Input() background?: string;
  @Input() boxShadow?: string;
  @Input() border?: string;
  @Input() fontSize?: string;

  // Event outputs
  @Output() select = new EventEmitter<CustomEvent>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set string attributes
    this.setAttr('size', this.size);

    // Set style attributes
    this.setCssVar('--padding', this.padding);
    this.setCssVar('--margin', this.margin);
    this.setCssVar('--border-radius', this.borderRadius);
    this.setCssVar('--background', this.background);
    this.setCssVar('--box-shadow', this.boxShadow);
    this.setCssVar('--border', this.border);
    this.setCssVar('--font-size', this.fontSize);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'wa-select', (event: CustomEvent) => {
      this.select.emit(event);
    });
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
}

/**
 * WaMenuItemDirective
 *
 * Angular wrapper for the <wa-menu-item> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds attributes: type, checked, value, loading, disabled, label, withSubmenu
 * - Emits events: blur, focus
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, prefix, suffix, submenu, etc.
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support on checkbox type
 */
@Directive({
  selector: 'wa-menu-item',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaMenuItemDirective),
      multi: true
    }
  ]
})
export class WaMenuItemDirective implements OnInit, ControlValueAccessor {
  @Input() type?: 'normal' | 'checkbox' | string;
  @Input() checked?: boolean | string;
  @Input() value?: string;
  @Input() loading?: boolean | string;
  @Input() disabled?: boolean | string;
  @Input() label?: string;
  @Input() withSubmenu?: boolean | string;

  // Style inputs
  @Input() backgroundColorHover?: string;
  @Input() textColorHover?: string;
  @Input() submenuOffset?: string;
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

    // Set boolean attributes (only if true)
    this.setBooleanAttr('checked', this.checked);
    this.setBooleanAttr('loading', this.loading);
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('with-submenu', this.withSubmenu);

    // Set style attributes
    this.setCssVar('--background-color-hover', this.backgroundColorHover);
    this.setCssVar('--text-color-hover', this.textColorHover);
    this.setCssVar('--submenu-offset', this.submenuOffset);
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

/**
 * WaMenuLabelDirective
 *
 * Angular wrapper for the <wa-menu-label> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content
 * - Supports custom styling via CSS variables
 */
@Directive({
  selector: 'wa-menu-label',
  standalone: true
})
export class WaMenuLabelDirective implements OnInit {
  // Style inputs
  @Input() padding?: string;
  @Input() fontSize?: string;
  @Input() color?: string;
  @Input() margin?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    // Set style attributes
    this.setCssVar('--padding', this.padding);
    this.setCssVar('--font-size', this.fontSize);
    this.setCssVar('--color', this.color);
    this.setCssVar('--margin', this.margin);
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
