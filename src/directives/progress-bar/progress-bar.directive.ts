import { Directive, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * WaProgressBarDirective
 *
 * Angular wrapper for the <wa-progress-bar> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds value, indeterminate, and label attributes
 * - Emits focusNative and blurNative events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content and prefix
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
@Directive({
  selector: 'wa-progress-bar',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaProgressBarDirective),
      multi: true
    }
  ]
})
export class WaProgressBarDirective implements OnInit, OnChanges, ControlValueAccessor {
  // Core input attributes
  @Input() value?: number;
  @Input() indeterminate?: boolean | string;
  @Input() label?: string;

  /**
   * Internal: track last applied percent to CSS var to avoid redundant writes
   */
  private _lastPercentApplied: number | null = null;

  // Dialog integration: support both kebab-case and camelCase bindings
  private _dataDialog: string | null | undefined;
  @Input('data-dialog') set dataDialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input('dialog') set dialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input() set dataDialog(val: string | null | undefined) { this._dataDialog = val ?? null; }

  // Style inputs
  @Input() indicatorColor?: string;
  @Input() display?: string;
  @Input() trackHeight?: string;

  // Event outputs
  @Output() waFocus = new EventEmitter<FocusEvent>();
  @Output('wa-focus') waFocusHyphen = this.waFocus;
  @Output() waBlur = new EventEmitter<FocusEvent>();
  @Output('wa-blur') waBlurHyphen = this.waBlur;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Apply all inputs (attributes and styles)
    this.applyInputs();

    // Set up event listeners
    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => {
      this.waFocus.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-focus', (event: FocusEvent) => {
      this.waFocus.emit(event);
    });
    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.waBlur.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'wa-blur', (event: FocusEvent) => {
      this.waBlur.emit(event);
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

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs(): void {
    // Attributes
    this.setNumericAttr('value', this.value);
    this.setAttr('label', this.label);
    this.setBooleanAttr('indeterminate', this.indeterminate);

    // Style attributes
    this.setCssVar('--indicator-color', this.indicatorColor);
    this.setCssVar('--display', this.display);
    this.setCssVar('--track-height', this.trackHeight);

    // Update percentage CSS variable for the underlying component styling
    this.applyPercentageVar();

    // Dialog attribute
    this.setAttr('data-dialog', this._dataDialog);
  }

  private clampPercent(val: number): number {
    if (isNaN(val)) return 0;
    return Math.max(0, Math.min(100, val));
  }

  private applyPercentageVar(): void {
    // Do not set percentage when indeterminate
    if (this.indeterminate === true || this.indeterminate === 'true' || this.indeterminate === '') {
      this._lastPercentApplied = null;
      this.renderer.removeStyle(this.el.nativeElement, '--percentage');
      return;
    }

    const raw = typeof this.value === 'string' ? parseFloat(this.value as any) : this.value ?? 0;
    const clamped = this.clampPercent(raw as number);

    if (this._lastPercentApplied === clamped) {
      return;
    }
    this._lastPercentApplied = clamped;
    this.renderer.setStyle(this.el.nativeElement, '--percentage', `${clamped}%`);
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
      this.value = value;
      this.setNumericAttr('value', value);
      this.applyPercentageVar();
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
