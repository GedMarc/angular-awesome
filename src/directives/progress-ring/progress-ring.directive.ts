import { Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * WaProgressRingDirective
 *
 * Angular wrapper for the <wa-progress-ring> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds value and label attributes
 * - Emits focus and blur events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content and prefix
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
@Directive({
  selector: 'wa-progress-ring',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaProgressRingDirective),
      multi: true
    }
  ]
})
export class WaProgressRingDirective implements OnInit, ControlValueAccessor {
  // Core input attributes
  @Input() value?: number;
  @Input() label?: string;

  // Style inputs
  @Input() size?: string;
  @Input() trackWidth?: string;
  @Input() trackColor?: string;
  @Input() indicatorWidth?: string;
  @Input() indicatorColor?: string;
  @Input() indicatorTransitionDuration?: string;

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
    this.setNumericAttr('value', this.value);
    this.setAttr('label', this.label);

    // Set style attributes
    this.setCssVar('--size', this.size);
    this.setCssVar('--track-width', this.trackWidth);
    this.setCssVar('--track-color', this.trackColor);
    this.setCssVar('--indicator-width', this.indicatorWidth);
    this.setCssVar('--indicator-color', this.indicatorColor);
    this.setCssVar('--indicator-transition-duration', this.indicatorTransitionDuration);

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
      const newValue = parseFloat(target.value);
      if (!isNaN(newValue)) {
        this.onChange(newValue);
      }
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
    if (isDisabled) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    }
  }
}
