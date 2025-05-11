import { Directive, ElementRef, HostListener, input, model, output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'wa-format-date',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: WaFormatDateDirective
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: WaFormatDateDirective
    }
  ]
})
export class WaFormatDateDirective implements ControlValueAccessor, Validator {
  // Two-way bindable date using model()
  date = model<Date | string>(new Date());

  // Formatting options
  weekday = input<'narrow' | 'short' | 'long' | undefined>(undefined);
  era = input<'narrow' | 'short' | 'long' | undefined>(undefined);
  year = input<'numeric' | '2-digit' | undefined>(undefined);
  month = input<'numeric' | '2-digit' | 'narrow' | 'short' | 'long' | undefined>(undefined);
  day = input<'numeric' | '2-digit' | undefined>(undefined);
  hour = input<'numeric' | '2-digit' | undefined>(undefined);
  minute = input<'numeric' | '2-digit' | undefined>(undefined);
  second = input<'numeric' | '2-digit' | undefined>(undefined);
  timeZoneName = input<'short' | 'long' | undefined>(undefined);
  timeZone = input<string | undefined>(undefined);
  lang = input<string>('en');

  // Hour format
  hourFormat = input<'12' | '24' | 'auto'>('auto');

  // Output event
  dateChange = output<any>();

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    this.date.set(value);
    this.dateChange.emit(event);
    this.onModelChange(value);
  }

  @HostListener('change', ['$event'])
  onChange(event: any) {
    const value = event.target.value;
    this.date.set(value);
    this.dateChange.emit(event);
    this.onModelChange(value);
  }

  // ControlValueAccessor implementation
  private onModelChange: (value: Date | string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: Date | string): void {
    if (value !== undefined && value !== null) {
      this.date.set(value);
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
