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
  @Input() disabled?: boolean | string;
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
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('with-label', this.withLabel);
    this.setBooleanAttr('with-hint', this.withHint);

    // Set style attributes
    this.setCssVar('--gap', this.styleRadiosGap);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'input', (event: Event) => {
      this.input.emit(event);
      // For custom elements, prefer the host element's value property
      const hostValue = (this.el.nativeElement as any)?.value;
      const target = event.target as any;
      const nextValue = hostValue ?? target?.value ?? null;
      // Keep internal value and attribute in sync for two-way binding
      this.value = nextValue;
      if (nextValue == null) {
        this.renderer.removeAttribute(this.el.nativeElement, 'value');
        this.renderer.setProperty(this.el.nativeElement, 'value', null);
      } else {
        this.renderer.setProperty(this.el.nativeElement, 'value', nextValue);
        this.renderer.setAttribute(this.el.nativeElement, 'value', String(nextValue));
      }
      this.onChange(nextValue);
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
    // Sync value from model into the host element
    if (value === undefined) {
      return; // Angular may call with undefined initially; ignore
    }
    this.value = value ?? null;
    if (value == null) {
      // Clear selection
      this.renderer.setProperty(this.el.nativeElement, 'value', null);
      this.renderer.removeAttribute(this.el.nativeElement, 'value');
    } else {
      // Set both the property and the attribute for robust syncing
      this.renderer.setProperty(this.el.nativeElement, 'value', value);
      this.renderer.setAttribute(this.el.nativeElement, 'value', String(value));
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Reflect to property as well for custom element parity
    this.renderer.setProperty(this.el.nativeElement, 'disabled', !!isDisabled);
    // Add or remove the disabled attribute to match the state
    if (isDisabled) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    }
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
 * - Supports button appearance (replaces wa-radio-button)
 */
@Directive({
  selector: 'wa-radio',
  standalone: true
})
export class WaRadioDirective implements OnInit {
  // Core input attributes
  @Input() value?: string;
  @Input() form?: string | null;
  @Input() checked?: boolean | string;
  @Input() disabled?: boolean | string;
  @Input() appearance?: 'button' | string;
  @Input() withPrefix?: boolean | string;
  @Input() withSuffix?: boolean | string;

  // Event outputs
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();

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
  @Input() styleIndicatorColor?: string;
  @Input() styleIndicatorWidth?: string;
  @Input() styleDisplay?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set string attributes
    this.setAttr('value', this.value);
    this.setAttr('form', this.form);
    this.setAttr('appearance', this.appearance);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('checked', this.checked);
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('with-prefix', this.withPrefix);
    this.setBooleanAttr('with-suffix', this.withSuffix);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.blur.emit(event);
    });
    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => {
      this.focus.emit(event);
    });

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

    // Button appearance style attributes
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

/**
 * @deprecated Use WaRadioDirective with appearance="button" instead
 *
 * This directive is kept for backward compatibility but will be removed in a future version.
 * Please migrate to <wa-radio appearance="button"> as per the changelog.
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
    console.warn('DEPRECATED: <wa-radio-button> is deprecated. Please use <wa-radio appearance="button"> instead.');

    // Create a wa-radio element with appearance="button"
    const radioEl = document.createElement('wa-radio');
    radioEl.setAttribute('appearance', 'button');

    // Copy attributes
    if (this.value) radioEl.setAttribute('value', this.value);
    if (this.checked === true || this.checked === 'true') radioEl.setAttribute('checked', '');
    if (this.disabled === true || this.disabled === 'true') radioEl.setAttribute('disabled', '');
    if (this.withPrefix === true || this.withPrefix === 'true') radioEl.setAttribute('with-prefix', '');
    if (this.withSuffix === true || this.withSuffix === 'true') radioEl.setAttribute('with-suffix', '');

    // Copy styles
    if (this.styleIndicatorColor) radioEl.style.setProperty('--indicator-color', this.styleIndicatorColor);
    if (this.styleIndicatorWidth) radioEl.style.setProperty('--indicator-width', this.styleIndicatorWidth);
    if (this.styleDisplay) radioEl.style.setProperty('--display', this.styleDisplay);

    // Copy children
    while (this.el.nativeElement.firstChild) {
      radioEl.appendChild(this.el.nativeElement.firstChild);
    }

    // Replace the element
    this.el.nativeElement.parentNode.replaceChild(radioEl, this.el.nativeElement);
  }
}
