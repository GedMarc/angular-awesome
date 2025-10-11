import { Directive, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, inject } from '@angular/core';
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
export class WaProgressRingDirective implements OnInit, ControlValueAccessor, OnChanges {
  // Core input attributes
  @Input() value?: number;
  @Input() label?: string;

  // Dialog integration: support both kebab-case and camelCase bindings
  private _dataDialog: string | null | undefined;
  @Input('data-dialog') set dataDialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input('dialog') set dialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input() set dataDialog(val: string | null | undefined) { this._dataDialog = val ?? null; }

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

  // Internal: track last applied percent to avoid redundant style writes
  private _lastPercentApplied: number | null = null;

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;
    this.applyInputs();

    // Set up event listeners
    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => {
      this.focusEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.blurEvent.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'input', (event: Event) => {
      const target = event.target as any;
      const val = (target?.value ?? '').toString();
      const newValue = parseFloat(val);
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

    // Style CSS variables
    this.setCssVar('--size', this.size);
    this.setCssVar('--track-width', this.trackWidth);
    this.setCssVar('--track-color', this.trackColor);
    this.setCssVar('--indicator-width', this.indicatorWidth);
    this.setCssVar('--indicator-color', this.indicatorColor);
    this.setCssVar('--indicator-transition-duration', this.indicatorTransitionDuration);

    // Update percentage CSS variable used by the underlying component
    this.applyPercentageVar();

    // Dialog attribute
    this.setAttr('data-dialog', this._dataDialog);
  }

  private clampPercent(val: number): number {
    if (isNaN(val)) return 0;
    return Math.max(0, Math.min(100, val));
  }

  private applyPercentageVar(): void {
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
        // Set attribute for SSR/initial hydration and general compatibility
        this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
        // Also set the property so the Web Component reacts to changes after initialization
        try {
          this.renderer.setProperty(this.el.nativeElement as any, name, numericValue);
        } catch {
          // no-op: some renderers/environments may not support setProperty
          (this.el.nativeElement as any)[name] = numericValue;
        }
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
      // Ensure property is set explicitly for robustness
      try {
        this.renderer.setProperty(this.el.nativeElement as any, 'value', typeof value === 'string' ? parseFloat(value) : value);
      } catch {
        (this.el.nativeElement as any)['value'] = typeof value === 'string' ? parseFloat(value) : value;
      }
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
