import { Directive, DoCheck, ElementRef, EventEmitter, forwardRef, Injector, Input, OnInit, OnChanges, SimpleChanges, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { SizeToken } from '../../types/tokens';
import { syncFormValidationState } from '../shared/form-validation-state';

/**
 * WaDatePickerDirective
 *
 * Angular wrapper for the <wa-date-picker> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported date-picker attributes as @Input() properties
 * - Displays an inline month grid for selecting a single date or a date range
 * - Emits events for input, change, focus-day, and view-change
 * - Allows slot projection for navigation icons, header, and footer
 * - Provides programmatic control through focus(), goToDate(), goToToday(), and clear() methods
 * - Implements ControlValueAccessor for ngModel and reactive form support
 */
@Directive({
  selector: 'wa-date-picker',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaDatePickerDirective),
      multi: true
    }
  ]
})
export class WaDatePickerDirective implements OnInit, OnChanges, DoCheck, ControlValueAccessor {
  // Core attributes
  @Input() mode?: 'single' | 'range' | string;
  @Input() value?: string;
  @Input() min?: string;
  @Input() max?: string;
  @Input() today?: string;
  @Input() focusedDate?: string;
  @Input() view?: 'days' | 'months' | 'years' | string;
  @Input() months?: number | string;
  @Input() pageBy?: 'months' | 'single' | string;
  @Input() firstDayOfWeek?: string;
  @Input() withOutsideDays?: boolean | string;
  @Input() withWeekNumbers?: boolean | string;
  @Input() weekdayFormat?: 'narrow' | 'short' | 'long' | string;
  @Input() disabled?: boolean | string;
  @Input() readonly?: boolean | string;
  @Input() disabledDates?: string;
  @Input() disabledDaysOfWeek?: string;
  @Input() disablePast?: boolean | string;
  @Input() disableFuture?: boolean | string;
  @Input() minRange?: number | string;
  @Input() maxRange?: number | string;
  @Input() size?: SizeToken | string;
  @Input() locale?: string;

  // Event outputs
  @Output() waInput = new EventEmitter<Event>();
  @Output('wa-input') waInputHyphen = this.waInput;
  @Output() waChange = new EventEmitter<Event>();
  @Output('wa-change') waChangeHyphen = this.waChange;
  @Output() waFocusDay = new EventEmitter<CustomEvent>();
  @Output('wa-focus-day') waFocusDayHyphen = this.waFocusDay;
  @Output() waViewChange = new EventEmitter<CustomEvent>();
  @Output('wa-view-change') waViewChangeHyphen = this.waViewChange;
  @Output() valueChange = new EventEmitter<string>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private injector = inject(Injector);
  private ngControl: NgControl | null = null;
  private ngControlResolved = false;

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    this.applyInputs();
    this.syncValidationState();

    const forwardInput = (event: Event) => {
      this.waInput.emit(event);
      const val = (event.target as any).value;
      this.onChange(val);
      this.valueChange.emit(val);
    };

    const forwardChange = (event: Event) => {
      this.waChange.emit(event);
      const val = (event.target as any).value;
      this.onChange(val);
      this.onTouched();
      this.valueChange.emit(val);
    };

    this.renderer.listen(nativeEl, 'input', forwardInput);
    this.renderer.listen(nativeEl, 'change', forwardChange);
    this.renderer.listen(nativeEl, 'wa-focus-day', (event: CustomEvent) => this.waFocusDay.emit(event));
    this.renderer.listen(nativeEl, 'wa-view-change', (event: CustomEvent) => this.waViewChange.emit(event));
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  ngDoCheck(): void {
    this.syncValidationState();
  }

  private syncValidationState(): void {
    syncFormValidationState(this.el, this.renderer, this.getNgControl());
  }

  private getNgControl(): NgControl | null {
    if (!this.ngControlResolved) {
      this.ngControlResolved = true;
      this.ngControl = this.injector.get(NgControl, null, { optional: true, self: true });
    }
    return this.ngControl;
  }

  private applyInputs() {
    this.setAttr('mode', this.mode);
    this.setAttr('value', this.value);
    this.setAttr('min', this.min);
    this.setAttr('max', this.max);
    this.setAttr('today', this.today);
    this.setAttr('focused-date', this.focusedDate);
    this.setAttr('view', this.view);
    this.setAttr('page-by', this.pageBy);
    this.setAttr('first-day-of-week', this.firstDayOfWeek);
    this.setAttr('weekday-format', this.weekdayFormat);
    this.setAttr('disabled-dates', this.disabledDates);
    this.setAttr('disabled-days-of-week', this.disabledDaysOfWeek);
    this.setAttr('size', this.size);
    this.setAttr('locale', this.locale);

    this.setNumericAttr('months', this.months);
    this.setNumericAttr('min-range', this.minRange);
    this.setNumericAttr('max-range', this.maxRange);

    this.setBooleanAttr('with-outside-days', this.withOutsideDays);
    this.setBooleanAttr('with-week-numbers', this.withWeekNumbers);
    this.setBooleanAttr('readonly', this.readonly);
    this.setBooleanAttr('disable-past', this.disablePast);
    this.setBooleanAttr('disable-future', this.disableFuture);
  }

  /**
   * Exposes the native date-picker element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  public focus(options?: FocusOptions): void {
    if (typeof this.el.nativeElement.focus === 'function') {
      this.el.nativeElement.focus(options);
    }
  }

  public goToDate(date: string | Date): void {
    if (typeof this.el.nativeElement.goToDate === 'function') {
      this.el.nativeElement.goToDate(date);
    }
  }

  public goToToday(): void {
    if (typeof this.el.nativeElement.goToToday === 'function') {
      this.el.nativeElement.goToToday();
    }
  }

  public clear(): void {
    if (typeof this.el.nativeElement.clear === 'function') {
      this.el.nativeElement.clear();
    }
  }

  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  private setNumericAttr(name: string, value: number | string | null | undefined) {
    if (value != null && value !== '') {
      const numericValue = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(numericValue)) {
        this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
      }
    }
  }

  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
      this.setAttr('value', value == null ? undefined : String(value));
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

