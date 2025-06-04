import { Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * WaRadioGroupDirective
 *
 * Angular wrapper for the <wa-radio-group> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported radio group attributes as @Input() properties
 * - Emits events for input, change, focus, blur, etc.
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for radio buttons
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
@Directive({
  selector: 'wa-radio-group',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaRadioGroupDirective),
      multi: true
    }
  ]
})
export class WaRadioGroupDirective implements OnInit, ControlValueAccessor {
  // Core input attributes
  @Input() value?: string | null;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() name?: string;
  @Input() orientation?: 'horizontal' | 'vertical' | string;
  @Input() size?: 'small' | 'medium' | 'large' | 'inherit' | string;
  @Input() required?: boolean | string;
  @Input() withLabel?: boolean | string;
  @Input() withHint?: boolean | string;

  // Style inputs
  @Input() styleRadiosGap?: string;

  // Event outputs
  @Output() input = new EventEmitter<Event>();
  @Output() change = new EventEmitter<Event>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() waInvalid = new EventEmitter<CustomEvent>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set string attributes
    this.setAttr('value', this.value);
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setAttr('name', this.name);
    this.setAttr('orientation', this.orientation);
    this.setAttr('size', this.size);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('required', this.required);
    this.setBooleanAttr('with-label', this.withLabel);
    this.setBooleanAttr('with-hint', this.withHint);

    // Set style attributes
    this.setCssVar('--gap', this.styleRadiosGap);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'input', (event: Event) => {
      this.input.emit(event);
      const target = event.target as HTMLInputElement;
      this.onChange(target.value);
    });
    this.renderer.listen(nativeEl, 'change', (event: Event) => {
      this.change.emit(event);
    });
    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => {
      this.focusEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.blurEvent.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'waInvalid', (event: CustomEvent) => {
      this.waInvalid.emit(event);
    });
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
      this.value = value;
      this.setAttr('value', value);
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
 * WaRadioDirective
 *
 * Angular wrapper for the <wa-radio> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported radio attributes as @Input() properties
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content
 * - Supports custom styling via CSS variables
 */
@Directive({
  selector: 'wa-radio',
  standalone: true
})
export class WaRadioDirective implements OnInit {
  // Core input attributes
  @Input() value?: string;
  @Input() checked?: boolean | string;
  @Input() disabled?: boolean | string;

  // Style inputs
  @Input() styleBackgroundColor?: string;
  @Input() styleBackgroundColorChecked?: string;
  @Input() styleBorderColor?: string;
  @Input() styleBorderColorChecked?: string;
  @Input() styleBorderStyle?: string;
  @Input() styleBorderWidth?: string;
  @Input() styleBoxShadow?: string;
  @Input() styleCheckedIconColor?: string;
  @Input() styleCheckedIconScale?: string;
  @Input() styleToggleSize?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    // Set string attributes
    this.setAttr('value', this.value);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('checked', this.checked);
    this.setBooleanAttr('disabled', this.disabled);

    // Set style attributes
    this.setCssVar('--background-color', this.styleBackgroundColor);
    this.setCssVar('--background-color-checked', this.styleBackgroundColorChecked);
    this.setCssVar('--border-color', this.styleBorderColor);
    this.setCssVar('--border-color-checked', this.styleBorderColorChecked);
    this.setCssVar('--border-style', this.styleBorderStyle);
    this.setCssVar('--border-width', this.styleBorderWidth);
    this.setCssVar('--box-shadow', this.styleBoxShadow);
    this.setCssVar('--checked-icon-color', this.styleCheckedIconColor);
    this.setCssVar('--checked-icon-scale', this.styleCheckedIconScale);
    this.setCssVar('--toggle-size', this.styleToggleSize);
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
}

/**
 * WaRadioButtonDirective
 *
 * Angular wrapper for the <wa-radio-button> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported radio button attributes as @Input() properties
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, prefix, and suffix
 * - Supports custom styling via CSS variables
 */
@Directive({
  selector: 'wa-radio-button',
  standalone: true
})
export class WaRadioButtonDirective implements OnInit {
  // Core input attributes
  @Input() value?: string;
  @Input() checked?: boolean | string;
  @Input() disabled?: boolean | string;
  @Input() withPrefix?: boolean | string;
  @Input() withSuffix?: boolean | string;

  // Style inputs
  @Input() styleIndicatorColor?: string;
  @Input() styleIndicatorWidth?: string;
  @Input() styleDisplay?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    // Set string attributes
    this.setAttr('value', this.value);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('checked', this.checked);
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('with-prefix', this.withPrefix);
    this.setBooleanAttr('with-suffix', this.withSuffix);

    // Set style attributes
    this.setCssVar('--indicator-color', this.styleIndicatorColor);
    this.setCssVar('--indicator-width', this.styleIndicatorWidth);
    this.setCssVar('--display', this.styleDisplay);
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
}
