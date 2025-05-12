import { Directive, ElementRef, HostListener, input, model, output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'wa-input',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: WaInputDirective
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: WaInputDirective
    }
  ]
})
export class WaInputDirective implements ControlValueAccessor, Validator {
  // Basic input properties
  label = input<string>('');
  hint = input<string>('');
  placeholder = input<string>('');
  size = input<'medium' | 'large'>('medium');
  // Separate input for the size attribute
  sizeAttr = input<string>('', { alias: 'size' });
  type = input<'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'>('text');

  // Two-way bindable value using model()
  value = model<string | number>('');

  // Regular input for property binding
  clearable = input<any>(false);

  // Separate input for the standalone attribute (kebab-case)
  clearableAttr = input<string | boolean>('', { alias: 'clearable' });



  // Regular input for property binding
  passwordToggle = input<boolean>(false);

  // Separate input for the standalone attribute (kebab-case)
  passwordToggleAttr = input<string | boolean>('', { alias: 'password-toggle' });

  // Separate input for the camelCase attribute
  passwordToggleAttrCamel = input<string | boolean>('', { alias: 'passwordToggle' });


  // Output event
  inputChange = output<any>();

  // Helper method to determine if clearable is enabled
  isClearableEnabled(): boolean {
    return this.clearable() ||
           this.clearableAttr() === '' ||
           this.clearableAttr() === 'true';
  }

  // Helper method to determine if password toggle is enabled
  isPasswordToggleEnabled(): boolean {
    return this.passwordToggle() ||
           this.passwordToggleAttr() === '' ||
           this.passwordToggleAttr() === 'true' ||
           this.passwordToggleAttrCamel() === '' ||
           this.passwordToggleAttrCamel() === 'true';
  }

  // Helper method to get the effective size
  getEffectiveSize(): 'medium' | 'large' {
    // If sizeAttr is set, use it, otherwise use the size input
    if (this.sizeAttr() === 'large') {
      return 'large';
    }
    return this.size();
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    this.value.apply(value);
    this.inputChange.emit(event);
    this.onModelChange(value);
  }

  @HostListener('keyup.enter')
  onEnterPress() {
    // Handle enter key press if needed
  }

  // Method to clear input if clearable is true
  clear() {
    if (this.isClearableEnabled()) {
      this.value.apply('');
      this.inputChange.emit({ target: { value: '' } });
    }
  }

  // Method to toggle password visibility if passwordToggle is true
  togglePassword() {
    if (this.isPasswordToggleEnabled()) {
      const inputEl = this.el.nativeElement;
      inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    }
  }

  // ControlValueAccessor implementation
  private onModelChange: (value: string | number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | number): void {
    if (value !== undefined && value !== null) {
      this.value.apply(value);
    }
  }

  registerOnChange(fn: (value: string | number) => void): void {
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
    this.value.subscribe((value) => {
      this.onModelChange(value);
    });
  }

  // Validator implementation
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const type = this.type();

    if (value === null || value === undefined || value === '') {
      return null; // Empty values are handled by required validator
    }

    switch (type) {
      case 'number':
        if (isNaN(Number(value))) {
          return { 'number': true };
        }
        break;
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(String(value))) {
          return { 'email': true };
        }
        break;
      case 'url':
        try {
          new URL(String(value));
        } catch (_) {
          return { 'url': true };
        }
        break;
      case 'date':
      case 'datetime-local':
        if (isNaN(Date.parse(String(value)))) {
          return { 'date': true };
        }
        break;
      case 'time':
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
        if (!timeRegex.test(String(value))) {
          return { 'time': true };
        }
        break;
      case 'tel':
        const telRegex = /^[0-9+\-() ]+$/;
        if (!telRegex.test(String(value))) {
          return { 'tel': true };
        }
        break;
    }

    return null;
  }
}
