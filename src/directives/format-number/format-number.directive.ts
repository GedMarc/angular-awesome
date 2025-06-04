import { Directive, ElementRef, forwardRef, Input, OnInit, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * WaFormatNumberDirective
 *
 * Angular wrapper for the <wa-format-number> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported format-number attributes as @Input() properties
 * - Supports string inputs for number formatting options
 * - Implements ControlValueAccessor for ngModel support
 * - Enables Angular-style class and style bindings
 * - Supports styling inputs via CSS custom properties
 */
@Directive({
  selector: 'wa-format-number',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaFormatNumberDirective),
      multi: true
    }
  ]
})
export class WaFormatNumberDirective implements OnInit, ControlValueAccessor {
  // Value input
  @Input() value?: number;

  // Format inputs
  @Input() type?: 'currency' | 'decimal' | 'percent';
  @Input() currency?: string;
  @Input() currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  @Input() lang?: string;
  @Input() noGrouping?: boolean | string;
  @Input() minimumIntegerDigits?: number | string;
  @Input() minimumFractionDigits?: number | string;
  @Input() maximumFractionDigits?: number | string;
  @Input() minimumSignificantDigits?: number | string;
  @Input() maximumSignificantDigits?: number | string;

  // Style inputs
  @Input() color?: string;
  @Input() fontSize?: string;
  @Input() fontWeight?: string;
  @Input() display?: string;
  @Input() textAlign?: string;
  @Input() padding?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set numeric attributes
    this.setNumericAttr('value', this.value);
    this.setNumericAttr('minimum-integer-digits', this.minimumIntegerDigits);
    this.setNumericAttr('minimum-fraction-digits', this.minimumFractionDigits);
    this.setNumericAttr('maximum-fraction-digits', this.maximumFractionDigits);
    this.setNumericAttr('minimum-significant-digits', this.minimumSignificantDigits);
    this.setNumericAttr('maximum-significant-digits', this.maximumSignificantDigits);

    // Set string attributes
    this.setAttr('type', this.type);
    this.setAttr('currency', this.currency);
    this.setAttr('currency-display', this.currencyDisplay);
    this.setAttr('lang', this.lang);

    // Set boolean attributes
    this.setBooleanAttr('no-grouping', this.noGrouping);

    // Set style attributes
    this.setCssVar('--color', this.color);
    this.setCssVar('--font-size', this.fontSize);
    this.setCssVar('--font-weight', this.fontWeight);
    this.setCssVar('--display', this.display);
    this.setCssVar('--text-align', this.textAlign);
    this.setCssVar('--padding', this.padding);
  }

  /**
   * Exposes the native format-number element for direct interaction
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
    if (value !== undefined && value !== null) {
      this.value = value;
      this.setNumericAttr('value', value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setAttribute(this.el.nativeElement, 'disabled', isDisabled ? 'true' : 'false');
  }
}
