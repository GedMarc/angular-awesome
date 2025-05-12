import { Directive, ElementRef, HostListener, input, model, output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'wa-select',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: WaSelectDirective
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: WaSelectDirective
    }
  ]
})
export class WaSelectDirective implements ControlValueAccessor, Validator {
  // Basic select properties
  name = input<string>('');
  label = input<string>('');
  hint = input<string>('');
  placeholder = input<string>('');
  size = input<'small' | 'medium' | 'large' | 'inherit'>('inherit');

  // Two-way bindable value using model()
  value = model<string | string[]>('');

  // Appearance and style properties
  appearance = input<'filled' | 'outlined'>('outlined');
  placement = input<'top' | 'bottom'>('bottom');

  // Boolean properties
  multiple = input<boolean | string>(false);

  disabled = input<boolean | string>(false);

  clearable = input<boolean | string>(false);

  pill = input<boolean | string>(false);

  required = input<boolean | string>(false);

  // Numeric properties
  maxOptionsVisible = input<number>(3);

  // Open state
  open = input<boolean>(false);

  // Form association
  form = input<string | null>(null);

  // Output events
  inputEvent = output<undefined>();
  changeEvent = output<string|string[]>();
  focusEvent = output<undefined>();
  blurEvent = output<undefined>();
  clearEvent = output<undefined>();
  showEvent = output<undefined>();
  afterShowEvent = output<undefined>();
  hideEvent = output<undefined>();
  afterHideEvent = output<undefined>();
  invalidEvent = output<undefined>();

  // Helper methods for boolean attributes
  isMultiple(): boolean {
    const multipleValue = this.multiple();
    return multipleValue === true ||
           multipleValue === '' ||
           multipleValue === 'true';
  }

  isDisabled(): boolean {
    const disabledValue = this.disabled();
    return disabledValue === true ||
           disabledValue === '' ||
           disabledValue === 'true';
  }

  isClearable(): boolean {
    const clearableValue = this.clearable();
    return clearableValue === true ||
           clearableValue === '' ||
           clearableValue === 'true';
  }

  isPill(): boolean {
    const pillValue = this.pill();
    return pillValue === true ||
           pillValue === '' ||
           pillValue === 'true';
  }

  isRequired(): boolean {
    const requiredValue = this.required();
    return requiredValue === true ||
           requiredValue === '' ||
           requiredValue === 'true';
  }

  // Methods
  show(): void {
    if (!this.isDisabled()) {
      this.open.apply(true);
      this.showEvent.emit(undefined);
      // After animation would complete
      setTimeout(() => {
        this.afterShowEvent.emit(undefined);
      }, 300); // Assuming 300ms for animation
    }
  }

  hide(): void {
    this.open.apply(false);
    this.hideEvent.emit(undefined);
    // After animation would complete
    setTimeout(() => {
      this.afterHideEvent.emit(undefined);
    }, 300); // Assuming 300ms for animation
  }

  focus(options?: FocusOptions): void {
    if (!this.isDisabled()) {
      this.el.nativeElement.focus(options);
      this.focusEvent.emit(undefined);
    }
  }

  blur(): void {
    this.el.nativeElement.blur();
    this.blurEvent.emit(undefined);
  }

  clear(): void {
    if (this.isClearable() && !this.isDisabled()) {
      const newValue = this.isMultiple() ? [] : '';
      this.value.apply(newValue);
      this.onModelChange(newValue);
      this.updateValueAttribute(newValue);
      this.clearEvent.emit(undefined);
    }
  }

  // Event listeners
  @HostListener('click')
  onClick() {
    if (!this.isDisabled()) {
      this.open() ? this.hide() : this.show();
    }
  }

  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.isDisabled()) {
      event.preventDefault();
      this.open() ? this.hide() : this.show();
    }
  }

  @HostListener('keydown.escape')
  onEscape() {
    if (this.open()) {
      this.hide();
    }
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched();
    // Don't hide immediately to allow for selecting an option
    setTimeout(() => {
      // Check if focus is still outside the select
      if (!this.el.nativeElement.contains(document.activeElement)) {
        this.hide();
      }
    }, 100);
  }

  // ControlValueAccessor implementation
  private onModelChange: (value: string | string[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | string[]): void {
    if (value !== undefined && value !== null) {
      this.value.apply(value);
      this.updateValueAttribute(value);
    }
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.apply(isDisabled);
  }

  constructor(private el: ElementRef) {
    this.value.subscribe((value) => {
      this.onModelChange(value);
      this.changeEvent.emit(value);
      this.updateValueAttribute(value);
    });
  }

  // Update the value attribute in the DOM
  private updateValueAttribute(value: string | string[]): void {
    if (this.isMultiple() && Array.isArray(value)) {
      // For multiple selections, join the array values with spaces
      this.el.nativeElement.setAttribute('value', value.join(' '));
    } else {
      // For single selection or empty value
      this.el.nativeElement.setAttribute('value', value || '');
    }
  }

  // Validator implementation
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (this.isRequired() && (value === null || value === undefined || value === '' ||
        (Array.isArray(value) && value.length === 0))) {
      return { 'required': true };
    }

    return null;
  }
}
