import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, forwardRef, Provider } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// Define providers separately to avoid circular reference issues
export const WA_FORMAT_BYTES_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WaFormatBytesDirective),
  multi: true
};

export const WA_FORMAT_BYTES_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => WaFormatBytesDirective),
  multi: true
};

@Directive({
  selector: 'wa-format-bytes',
  standalone: true,
  providers: [WA_FORMAT_BYTES_VALUE_ACCESSOR, WA_FORMAT_BYTES_VALIDATOR]
})
export class WaFormatBytesDirective implements ControlValueAccessor, Validator {
  // Two-way bindable value
  private _value: number = 0;
  @Input()
  get value(): number {
    return this._value;
  }
  set value(val: number) {
    this._value = val;
    this.valueChange.emit(val);
  }
  @Output() valueChange = new EventEmitter<any>();

  // Unit type: byte or bit
  @Input() unit: 'byte' | 'bit' = 'byte';

  // Display format
  @Input() display: 'long' | 'short' | 'narrow' = 'short';

  // Language
  @Input() lang: string = 'en';

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    // Convert string to number
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      this.value = numValue;
      this.valueChange.emit(event);
      this.onModelChange(numValue);
    }
  }

  @HostListener('change', ['$event'])
  onChange(event: any) {
    const value = event.target.value;
    // Convert string to number
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      this.value = numValue;
      this.valueChange.emit(event);
      this.onModelChange(numValue);
    }
  }

  // ControlValueAccessor implementation
  private onModelChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number): void {
    if (value !== undefined && value !== null) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: number) => void): void {
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

  // Update the model value when the signal changes
  constructor(private el: ElementRef) {
    this.valueChange.subscribe((value) => {
      this.onModelChange(value);
    });
  }

  // Validator implementation
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null; // Empty values are handled by required validator
    }

    if (isNaN(Number(value))) {
      return { 'number': true };
    }

    return null;
  }
}
