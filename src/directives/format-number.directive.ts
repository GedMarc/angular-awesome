import { Directive, ElementRef, input, model, output, HostListener } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'wa-format-number',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: WaFormatNumberDirective
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: WaFormatNumberDirective
    }
  ]
})
export class WaFormatNumberDirective implements ControlValueAccessor, Validator {
  // Two-way bindable value using model()
  value = model<number>(0);

  // Input properties using input()
  type = input<'currency' | 'decimal' | 'percent'>('decimal');

  // No grouping option
  noGrouping = input<boolean>(false);

  // Currency code
  currency = input<string>('ZAR');

  // Currency display format
  currencyDisplay = input<'symbol' | 'narrowSymbol' | 'code' | 'name'>('symbol');

  // Digit configuration
  minimumIntegerDigits = input<number | undefined>(undefined);
  minimumFractionDigits = input<number | undefined>(undefined);
  maximumFractionDigits = input<number | undefined>(undefined);
  minimumSignificantDigits = input<number | undefined>(undefined);
  maximumSignificantDigits = input<number | undefined>(undefined);

  // Language
  lang = input<string>('en');

  // Output event
  inputChange = output<any>();

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    // Convert string to number
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      this.value.apply(numValue);
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
      this.value.apply(numValue);
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
      this.value.apply(value);
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
    this.value.subscribe((value) => {
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

    // Additional validation based on type
    if (this.type() === 'percent' && (value < 0 || value > 1)) {
      return { 'percent': true };
    }

    return null;
  }
}
