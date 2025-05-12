import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'wa-format-date',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => WaFormatDateDirective)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => WaFormatDateDirective)
    }
  ]
})
export class WaFormatDateDirective implements ControlValueAccessor, Validator {
  // Two-way bindable date
  private _date: Date | string = new Date();
  @Input()
  get date(): Date | string {
    return this._date;
  }
  set date(value: Date | string) {
    this._date = value;
    this.dateChange.emit(value);
  }
  @Output() dateChange = new EventEmitter<any>();

  // Formatting options
  @Input() weekday: 'narrow' | 'short' | 'long' | undefined = undefined;
  @Input() era: 'narrow' | 'short' | 'long' | undefined = undefined;
  @Input() year: 'numeric' | '2-digit' | undefined = undefined;
  @Input() month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long' | undefined = undefined;
  @Input() day: 'numeric' | '2-digit' | undefined = undefined;
  @Input() hour: 'numeric' | '2-digit' | undefined = undefined;
  @Input() minute: 'numeric' | '2-digit' | undefined = undefined;
  @Input() second: 'numeric' | '2-digit' | undefined = undefined;
  @Input() timeZoneName: 'short' | 'long' | undefined = undefined;
  @Input() timeZone: string | undefined = undefined;
  @Input() lang: string = 'en';

  // Hour format
  @Input() hourFormat: '12' | '24' | 'auto' = 'auto';

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    this.date = value;
    this.dateChange.emit(event);
    this.onModelChange(value);
  }

  @HostListener('change', ['$event'])
  onChange(event: any) {
    const value = event.target.value;
    this.date = value;
    this.dateChange.emit(event);
    this.onModelChange(value);
  }

  // ControlValueAccessor implementation
  private onModelChange: (value: Date | string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: Date | string): void {
    if (value !== undefined && value !== null) {
      this.date = value;
    }
  }

  registerOnChange(fn: (value: Date | string) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement if needed
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched();
  }

  constructor(private el: ElementRef) {
    this.dateChange.subscribe((value) => {
      this.onModelChange(value);
    });
  }

  // Validator implementation
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null; // Empty values are handled by required validator
    }

    if (value instanceof Date) {
      if (isNaN(value.getTime())) {
        return { 'date': true };
      }
    } else if (typeof value === 'string') {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return { 'date': true };
      }
    } else {
      return { 'date': true };
    }

    return null;
  }
}
