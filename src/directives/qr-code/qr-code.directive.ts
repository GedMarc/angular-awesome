import { Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * WaQrCodeDirective
 *
 * Angular wrapper for the <wa-qr-code> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds value, label, size, fill, background, radius, and errorCorrection attributes
 * - Emits focus and blur events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content and prefix
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
@Directive({
  selector: 'wa-qr-code',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaQrCodeDirective),
      multi: true
    }
  ]
})
export class WaQrCodeDirective implements OnInit, ControlValueAccessor {
  // Core input attributes
  @Input() value?: string;
  @Input() label?: string;
  @Input() size?: number | string;
  @Input() fill?: string;
  @Input() background?: string;
  @Input() radius?: number | string;
  @Input() errorCorrection?: 'L' | 'M' | 'Q' | 'H' | string;

  // Style inputs
  @Input() styleSize?: string;
  @Input() styleFill?: string;
  @Input() styleBackground?: string;
  @Input() styleRadius?: string;
  @Input() styleColor?: string;
  @Input() styleDisplay?: string;

  // Event outputs
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set attributes
    this.setAttr('value', this.value);
    this.setAttr('label', this.label);
    this.setNumericAttr('size', this.size);
    this.setAttr('fill', this.fill);
    this.setAttr('background', this.background);
    this.setNumericAttr('radius', this.radius);
    this.setAttr('error-correction', this.errorCorrection);

    // Set style attributes
    this.setCssVar('--size', this.styleSize);
    this.setCssVar('--fill', this.styleFill);
    this.setCssVar('--background', this.styleBackground);
    this.setCssVar('--radius', this.styleRadius);
    this.setCssVar('--color', this.styleColor);
    this.setCssVar('--display', this.styleDisplay);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => {
      this.focusEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.blurEvent.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.onChange(target.value);
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
    if (isDisabled) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    }
  }
}
