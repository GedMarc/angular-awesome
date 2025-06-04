import { Directive, ElementRef, forwardRef, Input, OnInit, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * WaFormatDateDirective
 *
 * Angular wrapper for the <wa-format-date> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported format-date attributes as @Input() properties
 * - Supports string inputs for date formatting options
 * - Implements ControlValueAccessor for ngModel support
 * - Enables Angular-style class and style bindings
 * - Supports styling inputs via CSS custom properties
 */
@Directive({
  selector: 'wa-format-date',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaFormatDateDirective),
      multi: true
    }
  ]
})
export class WaFormatDateDirective implements OnInit, ControlValueAccessor {
  // Date input
  @Input() date?: Date | string;

  // Format inputs
  @Input() weekday?: 'narrow' | 'short' | 'long';
  @Input() era?: 'narrow' | 'short' | 'long';
  @Input() year?: 'numeric' | '2-digit';
  @Input() month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
  @Input() day?: 'numeric' | '2-digit';
  @Input() hour?: 'numeric' | '2-digit';
  @Input() minute?: 'numeric' | '2-digit';
  @Input() second?: 'numeric' | '2-digit';
  @Input() timeZoneName?: 'short' | 'long';
  @Input() timeZone?: string;
  @Input() hourFormat?: 'auto' | '12' | '24';
  @Input() lang?: string;

  // Style inputs
  @Input() color?: string;
  @Input() fontSize?: string;
  @Input() fontWeight?: string;
  @Input() backgroundColor?: string;
  @Input() padding?: string;
  @Input() margin?: string;
  @Input() display?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set date attribute
    this.setDateAttr('date', this.date);

    // Set format attributes
    this.setAttr('weekday', this.weekday);
    this.setAttr('era', this.era);
    this.setAttr('year', this.year);
    this.setAttr('month', this.month);
    this.setAttr('day', this.day);
    this.setAttr('hour', this.hour);
    this.setAttr('minute', this.minute);
    this.setAttr('second', this.second);
    this.setAttr('time-zone-name', this.timeZoneName);
    this.setAttr('time-zone', this.timeZone);
    this.setAttr('hour-format', this.hourFormat);
    this.setAttr('lang', this.lang);

    // Set style attributes
    this.setCssVar('--color', this.color);
    this.setCssVar('--font-size', this.fontSize);
    this.setCssVar('--font-weight', this.fontWeight);
    this.setCssVar('--background-color', this.backgroundColor);
    this.setCssVar('--padding', this.padding);
    this.setCssVar('--margin', this.margin);
    this.setCssVar('--display', this.display);
  }

  /**
   * Exposes the native format-date element for direct interaction
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
   * Sets a date attribute on the native element if the value is not null or undefined
   */
  private setDateAttr(name: string, value: Date | string | null | undefined) {
    if (value != null) {
      const dateValue = value instanceof Date ? value.toISOString() : value;
      this.renderer.setAttribute(this.el.nativeElement, name, dateValue);
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

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.date = value;
      this.setDateAttr('date', value);
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
