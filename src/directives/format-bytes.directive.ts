import { Directive, ElementRef, HostListener, input, model, output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'wa-format-bytes',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: WaFormatBytesDirective
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: WaFormatBytesDirective
    }
  ]
})
export class WaFormatBytesDirective implements ControlValueAccessor, Validator {
  // Two-way bindable value using model()
  value = model<number>(0);

  // Unit type: byte or bit
  unit = input<'byte' | 'bit'>('byte');

  // Display format
  display = input<'long' | 'short' | 'narrow'>('short');

  // Language
  lang = input<string>('en');

  // Output event
  valueChange = output<any>();

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    // Convert string to number
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      this.value.set(numValue);
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
      this.value.set(numValue);
      this.valueChange.emit(event);
      this.onModelChange(numValue);
    }
  }

  // ControlValueAccessor implementation
  private onModelChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number): void {
    if (value !== undefined && value !== null) {
      this.value.set(value);
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
