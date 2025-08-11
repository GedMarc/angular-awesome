import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * WaSliderDirective
 *
 * Angular wrapper for the <wa-slider> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported slider attributes as @Input() properties
 * - Supports range sliders with dual thumbs
 * - Supports vertical orientation
 * - Supports markers at each step
 * - Supports reference labels
 * - Supports tooltips for current values
 * - Emits events for input, change, focus, blur, etc.
 * - Enables Angular-style class and style bindings
 * - Supports ngModel for form integration
 * - Allows access to native methods via ViewChild
 */
@Component({
  selector: 'wa-slider',
  standalone: true,
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaSliderDirective),
      multi: true
    }
  ]
})
export class WaSliderDirective implements OnInit, ControlValueAccessor {
  // Core input attributes
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;
  @Input() disabled?: boolean | string;
  @Input() readonly?: boolean | string;
  @Input() required?: boolean | string;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() name?: string;
  @Input() form?: string;
  @Input() withLabel?: boolean | string;
  @Input() withHint?: boolean | string;

  // New attributes from the updated specification
  @Input() range?: boolean | string;
  @Input() minValue?: number;
  @Input() maxValue?: number;
  @Input() orientation?: 'horizontal' | 'vertical' | string;
  @Input() size?: 'small' | 'medium' | 'large' | string;
  @Input() indicatorOffset?: number;
  @Input() withMarkers?: boolean | string;
  @Input() withTooltip?: boolean | string;
  @Input() tooltipDistance?: number;
  @Input() tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left' | string;
  @Input() autofocus?: boolean | string;

  // Style inputs
  @Input() trackSize?: string;
  @Input() markerWidth?: string;
  @Input() markerHeight?: string;
  @Input() thumbWidth?: string;
  @Input() thumbHeight?: string;

  // Event outputs
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() changeEvent = new EventEmitter<Event>();
  @Output() inputEvent = new EventEmitter<Event>();
  @Output() invalidEvent = new EventEmitter<CustomEvent>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private valueFormatter?: (value: number) => string;

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set numeric attributes
    this.setNumericAttr('min', this.min);
    this.setNumericAttr('max', this.max);
    this.setNumericAttr('step', this.step);
    this.setNumericAttr('min-value', this.minValue);
    this.setNumericAttr('max-value', this.maxValue);
    this.setNumericAttr('indicator-offset', this.indicatorOffset);
    this.setNumericAttr('tooltip-distance', this.tooltipDistance);

    // Set string attributes
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setAttr('name', this.name);
    this.setAttr('form', this.form);
    this.setAttr('orientation', this.orientation);
    this.setAttr('size', this.size);
    this.setAttr('tooltip-placement', this.tooltipPlacement);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('readonly', this.readonly);
    this.setBooleanAttr('required', this.required);
    this.setBooleanAttr('with-label', this.withLabel);
    this.setBooleanAttr('with-hint', this.withHint);
    this.setBooleanAttr('range', this.range);
    this.setBooleanAttr('with-markers', this.withMarkers);
    this.setBooleanAttr('with-tooltip', this.withTooltip);
    this.setBooleanAttr('autofocus', this.autofocus);

    // Set style attributes
    this.setCssVar('--track-size', this.trackSize);
    this.setCssVar('--marker-width', this.markerWidth);
    this.setCssVar('--marker-height', this.markerHeight);
    this.setCssVar('--thumb-width', this.thumbWidth);
    this.setCssVar('--thumb-height', this.thumbHeight);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'input', (event: Event) => {
      this.inputEvent.emit(event);
      const target = event.target as HTMLInputElement;

      // Handle range slider with dual thumbs
      if (this.range === true || this.range === 'true' || this.range === '') {
        const minValue = parseFloat((target as any).minValue);
        const maxValue = parseFloat((target as any).maxValue);
        this.onChange({ min: minValue, max: maxValue });
      } else {
        // Regular slider
        this.onChange(target.value !== '' ? parseFloat(target.value) : null);
      }
    });

    this.renderer.listen(nativeEl, 'change', (event: Event) => {
      this.changeEvent.emit(event);
    });

    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => {
      this.focusEvent.emit(event);
    });

    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.blurEvent.emit(event);
      this.onTouched();
    });

    this.renderer.listen(nativeEl, 'wa-invalid', (event: CustomEvent) => {
      this.invalidEvent.emit(event);
    });
  }

  /**
   * Sets the value formatter function
   * @param formatter A function that takes a number and returns a formatted string
   */
  public setValueFormatter(formatter: (value: number) => string): void {
    this.valueFormatter = formatter;
    (this.el.nativeElement as any).valueFormatter = formatter;
  }

  /**
   * Exposes the native element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Focuses the slider
   */
  public focus(): void {
    if (typeof this.el.nativeElement.focus === 'function') {
      this.el.nativeElement.focus();
    }
  }

  /**
   * Removes focus from the slider
   */
  public blur(): void {
    if (typeof this.el.nativeElement.blur === 'function') {
      this.el.nativeElement.blur();
    }
  }

  /**
   * Decreases the slider's value by step
   */
  public stepDown(): void {
    if (typeof this.el.nativeElement.stepDown === 'function') {
      this.el.nativeElement.stepDown();
    }
  }

  /**
   * Increases the slider's value by step
   */
  public stepUp(): void {
    if (typeof this.el.nativeElement.stepUp === 'function') {
      this.el.nativeElement.stepUp();
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
    if (value !== undefined) {
      if (this.range === true || this.range === 'true' || this.range === '') {
        // Handle range slider with dual thumbs
        if (typeof value === 'object' && value !== null) {
          if ('min' in value) {
            this.setNumericAttr('min-value', value.min);
          }
          if ('max' in value) {
            this.setNumericAttr('max-value', value.max);
          }
        }
      } else {
        // Regular slider
        this.setAttr('value', value?.toString());
      }
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
