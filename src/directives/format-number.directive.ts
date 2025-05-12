import { Directive, ElementRef, Input, Output, EventEmitter, HostListener, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'wa-format-number',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => WaFormatNumberDirective)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => WaFormatNumberDirective)
    }
  ]
})
export class WaFormatNumberDirective implements ControlValueAccessor, Validator {
  // Two-way bindable value
  private _value: number = 0;
  @Input()
  get value(): number {
    return this._value;
  }
  set value(val: number) {
    this._value = val;
    this.inputChange.emit(val);
  }

  // Input properties
  @Input() type: 'currency' | 'decimal' | 'percent' = 'decimal';

  // No grouping option
  @Input() noGrouping: boolean = false;

  // Currency code
  @Input() currency: string = 'ZAR';

  // Currency display format
  @Input() currencyDisplay: 'symbol' | 'narrowSymbol' | 'code' | 'name' = 'symbol';

  // Digit configuration
  @Input() minimumIntegerDigits: number | undefined = undefined;
  @Input() minimumFractionDigits: number | undefined = undefined;
  @Input() maximumFractionDigits: number | undefined = undefined;
  @Input() minimumSignificantDigits: number | undefined = undefined;
  @Input() maximumSignificantDigits: number | undefined = undefined;

  // Language
  @Input() lang: string = 'en';

  // Output event
  @Output() inputChange = new EventEmitter<any>();

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    // Convert string to number
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      this.value = numValue;
      this.inputChange.emit(event);
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
      this.inputChange.emit(event);
      this.onModelChange(numValue);
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: any) {
    // Handle validation on blur if needed
    this.inputChange.emit(event);
    this.onTouched();
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

  constructor(private el: ElementRef) {
    // No need for subscription as we're using getter/setter
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

    // Additional validation based on type
    if (this.type === 'percent' && (value < 0 || value > 1)) {
      return { 'percent': true };
    }

    return null;
  }
}
