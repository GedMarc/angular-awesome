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
  @Input() tooltip?: 'top' | 'bottom' | 'none' | string;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() name?: string;
  @Input() form?: string;
  @Input() withLabel?: boolean | string;
  @Input() withHint?: boolean | string;

  // Style inputs
  @Input() trackColorActive?: string;
  @Input() trackColorInactive?: string;
  @Input() trackHeight?: string;
  @Input() trackActiveOffset?: string;
  @Input() thumbColor?: string;
  @Input() thumbGap?: string;
  @Input() thumbShadow?: string;
  @Input() thumbSize?: string;
  @Input() tooltipOffset?: string;

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

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set numeric attributes
    this.setNumericAttr('min', this.min);
    this.setNumericAttr('max', this.max);
    this.setNumericAttr('step', this.step);

    // Set string attributes
    this.setAttr('tooltip', this.tooltip);
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setAttr('name', this.name);
    this.setAttr('form', this.form);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('with-label', this.withLabel);
    this.setBooleanAttr('with-hint', this.withHint);

    // Set style attributes
    this.setCssVar('--track-color-active', this.trackColorActive);
    this.setCssVar('--track-color-inactive', this.trackColorInactive);
    this.setCssVar('--track-height', this.trackHeight);
    this.setCssVar('--track-active-offset', this.trackActiveOffset);
    this.setCssVar('--thumb-color', this.thumbColor);
    this.setCssVar('--thumb-gap', this.thumbGap);
    this.setCssVar('--thumb-shadow', this.thumbShadow);
    this.setCssVar('--thumb-size', this.thumbSize);
    this.setCssVar('--tooltip-offset', this.tooltipOffset);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'input', (event: Event) => {
      this.inputEvent.emit(event);
      const target = event.target as HTMLInputElement;
      this.onChange(target.value !== '' ? parseFloat(target.value) : null);
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
      this.setAttr('value', value?.toString());
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
