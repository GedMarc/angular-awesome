import { Directive, ElementRef, forwardRef, Input, OnInit, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * WaFormatBytesDirective
 *
 * Angular wrapper for the <wa-format-bytes> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported format-bytes attributes as @Input() properties
 * - Supports string inputs like unit, display, and lang
 * - Supports numeric input for value
 * - Implements ControlValueAccessor for ngModel support
 * - Enables Angular-style class and style bindings
 */
@Directive({
  selector: 'wa-format-bytes',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaFormatBytesDirective),
      multi: true
    }
  ]
})
export class WaFormatBytesDirective implements OnInit, ControlValueAccessor {
  // Inputs
  @Input() value?: number;
  @Input() unit?: 'byte' | 'bit';
  @Input() display?: 'long' | 'short' | 'narrow';
  @Input() lang?: string;

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

    // Set string attributes
    this.setAttr('unit', this.unit);
    this.setAttr('display', this.display);
    this.setAttr('lang', this.lang);
  }

  /**
   * Exposes the native format-bytes element for direct interaction
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
  private setNumericAttr(name: string, value: number | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value.toString());
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
