import { Directive, ElementRef, HostListener, effect, input, model, output } from '@angular/core';
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
  size = input<'small' | 'medium' | 'large' | 'inherit'>('inherit');
  type = input<'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'>('text');

  // Two-way bindable value using model()
  value = model<string | number>('');

  // Input properties with both property binding and attribute support
  clearable = input<boolean | string>('');
  required = input<boolean | string>(false);
  passwordToggle = input<boolean | string>(false);

  // Separate input for the standalone attribute (kebab-case)
  passwordToggleAttr = input<string | boolean>('', { alias: 'password-toggle' });


  // Additional input properties
  defaultValue = input<string | null>(null);
  appearance = input<'filled' | 'outlined'>('outlined');
  pill = input<boolean | string>(false);
  readonly = input<boolean | string>(false);
  passwordVisible = input<boolean | string>(false);
  passwordVisibleAttr = input<string | boolean>('', { alias: 'password-visible' });
  noSpinButtons = input<boolean | string>(false);
  noSpinButtonsAttr = input<string | boolean>('', { alias: 'no-spin-buttons' });
  form = input<string | null>(null);

  pattern = input<string>('');
  minlength = input<number | undefined>(undefined);
  maxlength = input<number | undefined>(undefined);
  min = input<number | string | undefined>(undefined);
  max = input<number | string | undefined>(undefined);
  step = input<number | string | undefined>(undefined);
  autocapitalize = input<''|'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' | undefined>(undefined);
  autocorrect = input<'off' | 'on' | undefined>(undefined);
  autocomplete = input<string | undefined>(undefined);
  autofocus = input<boolean | string>(false);
  enterkeyhint = input<'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined>(undefined);
  spellcheck = input<boolean | string>(true);
  inputmode = input<'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' | undefined>(undefined);
  withLabel = input<boolean | string>(false);
  withLabelAttr = input<string | boolean>('', { alias: 'with-label' });
  withHint = input<boolean | string>(false);
  withHintAttr = input<string | boolean>('', { alias: 'with-hint' });

  // Output events
  inputChange = output<any>();
  change = output<any>();
  blur = output<any>();
  focus = output<any>();
  waClear = output<any>();
  waInvalid = output<any>();

  // Helper method to determine if clearable is enabled
  isClearableEnabled(): boolean {
    const clearableValue = this.clearable();
    return clearableValue === true || clearableValue === '' || clearableValue === 'true';
  }

  // Helper method to determine if password toggle is enabled
  isPasswordToggleEnabled(): boolean {
    const passwordToggleValue = this.passwordToggle();
    const passwordToggleAttrValue = this.passwordToggleAttr();

    return passwordToggleValue === true ||
           passwordToggleValue === '' ||
           passwordToggleValue === 'true' ||
           passwordToggleAttrValue === '' ||
           passwordToggleAttrValue === 'true' ||
           passwordToggleAttrValue === true;
  }

  // Helper method to get the effective size
  getEffectiveSize(): 'small' | 'medium' | 'large' | 'inherit' {
    const sizeValue = this.size();
    if (sizeValue === 'small' || sizeValue === 'medium' || sizeValue === 'large' || sizeValue === 'inherit') {
      return sizeValue as 'small' | 'medium' | 'large' | 'inherit';
    }
    return 'inherit';
  }

  // Helper method to determine if pill is enabled
  isPillEnabled(): boolean {
    const pillValue = this.pill();
    return pillValue === true || pillValue === '' || pillValue === 'true';
  }

  // Helper method to determine if readonly is enabled
  isReadonlyEnabled(): boolean {
    const readonlyValue = this.readonly();
    return readonlyValue === true || readonlyValue === '' || readonlyValue === 'true';
  }

  // Helper method to determine if password is visible
  isPasswordVisible(): boolean {
    const passwordVisibleValue = this.passwordVisible();
    const passwordVisibleAttrValue = this.passwordVisibleAttr();

    return passwordVisibleValue === true ||
           passwordVisibleValue === '' ||
           passwordVisibleValue === 'true' ||
           passwordVisibleAttrValue === '' ||
           passwordVisibleAttrValue === 'true' ||
           passwordVisibleAttrValue === true;
  }

  // Helper method to determine if no-spin-buttons is enabled
  isNoSpinButtonsEnabled(): boolean {
    const noSpinButtonsValue = this.noSpinButtons();
    const noSpinButtonsAttrValue = this.noSpinButtonsAttr();

    return noSpinButtonsValue === true ||
           noSpinButtonsValue === '' ||
           noSpinButtonsValue === 'true' ||
           noSpinButtonsAttrValue === '' ||
           noSpinButtonsAttrValue === 'true' ||
           noSpinButtonsAttrValue === true;
  }

  // Helper method to determine if required is enabled
  isRequiredEnabled(): boolean {
    const requiredValue = this.required();
    return requiredValue === true ||
           requiredValue === '' ||
           requiredValue === 'true';
  }

  // Helper method to determine if autofocus is enabled
  isAutofocusEnabled(): boolean {
    const autofocusValue = this.autofocus();
    return autofocusValue === true ||
           autofocusValue === '' ||
           autofocusValue === 'true';
  }

  // Helper method to determine if spellcheck is enabled
  isSpellcheckEnabled(): boolean {
    const spellcheckValue = this.spellcheck();
    return spellcheckValue === true ||
           spellcheckValue === '' ||
           spellcheckValue === 'true';
  }

  // Helper method to determine if withLabel is enabled
  isWithLabelEnabled(): boolean {
    const withLabelValue = this.withLabel();
    const withLabelAttrValue = this.withLabelAttr();

    return withLabelValue === true ||
           withLabelValue === '' ||
           withLabelValue === 'true' ||
           withLabelAttrValue === '' ||
           withLabelAttrValue === 'true' ||
           withLabelAttrValue === true;
  }

  // Helper method to determine if withHint is enabled
  isWithHintEnabled(): boolean {
    const withHintValue = this.withHint();
    const withHintAttrValue = this.withHintAttr();

    return withHintValue === true ||
           withHintValue === '' ||
           withHintValue === 'true' ||
           withHintAttrValue === '' ||
           withHintAttrValue === 'true' ||
           withHintAttrValue === true;
  }

  // Helper method to get the effective min value
  getEffectiveMin(): number | string | undefined {
    const minValue = this.min();
    if (minValue === '' || minValue === 'true') {
      return '0'; // Default to 0 if min is used as a standalone attribute
    } else if (typeof minValue === 'string' && minValue !== 'false') {
      return minValue;
    }
    return minValue;
  }

  // Helper method to get the effective max value
  getEffectiveMax(): number | string | undefined {
    const maxValue = this.max();
    if (maxValue === '' || maxValue === 'true') {
      return ''; // Default to empty if max is used as a standalone attribute
    } else if (typeof maxValue === 'string' && maxValue !== 'false') {
      return maxValue;
    }
    return maxValue;
  }

  // Helper method to get the effective step value
  getEffectiveStep(): number | string | undefined {
    const stepValue = this.step();
    if (stepValue === '' || stepValue === 'true') {
      return '1'; // Default to 1 if step is used as a standalone attribute
    } else if (typeof stepValue === 'string' && stepValue !== 'false') {
      return stepValue;
    }
    return stepValue;
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    this.value.apply(value);
    this.inputChange.emit(event);
    this.onModelChange(value);
  }

  @HostListener('change', ['$event'])
  onChange(event: any) {
    this.change.emit(event);
  }

  @HostListener('focus', ['$event'])
  onFocusEvent(event: any) {
    this.focus.emit(event);
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
      this.waClear.emit(true);
    }
  }

  // JavaScript methods
  focusElement(options?: FocusOptions) {
    this.el.nativeElement.focus(options);
  }

  blurElement() {
    this.el.nativeElement.blur();
  }

  select() {
    this.el.nativeElement.select();
  }

  setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection: 'forward' | 'backward' | 'none' = 'none') {
    this.el.nativeElement.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }

  setRangeText(replacement: string, start: number, end: number, selectMode: 'select' | 'start' | 'end' | 'preserve' = 'preserve') {
    this.el.nativeElement.setRangeText(replacement, start, end, selectMode);
  }

  showPicker() {
    if ('showPicker' in this.el.nativeElement) {
      this.el.nativeElement.showPicker();
    }
  }

  stepUp(n?: number) {
    if (this.type() === 'number') {
      this.el.nativeElement.stepUp(n);
    }
  }

  stepDown(n?: number) {
    if (this.type() === 'number') {
      this.el.nativeElement.stepDown(n);
    }
  }

  // Method to toggle password visibility if passwordToggle is true
  togglePassword() {
    if (this.isPasswordToggleEnabled()) {
      const inputEl = this.el.nativeElement;
      const newVisibility = !this.isPasswordVisible();
      inputEl.type = newVisibility ? 'text' : 'password';
      this.passwordVisible.apply(newVisibility);
    }
  }

  // ControlValueAccessor implementation
  private onModelChange: (value: string | number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | number): void {
    if (value !== undefined && value !== null) {
      this.value.apply(value);
    } else if (this.defaultValue() !== null) {
      // Use defaultValue if provided and no value is set
      this.value.apply(this.defaultValue()!);
    }
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  @HostListener('blur', ['$event'])
  onBlur(event: any) {
    this.onTouched();
    this.blur.emit(event);
  }

  constructor(private el: ElementRef) {
    effect(() => {
      this.onModelChange(this.value());
    });

    // Initialize input element based on attributes
    const inputEl = this.el.nativeElement;

    // Set up attribute watchers
    effect(() => {
      inputEl.type = this.type();
    });

    effect(() => {
      const defaultValue = this.defaultValue();
      if (defaultValue !== null) {
        inputEl.defaultValue = defaultValue;
      }
    });

    effect(() => {
      this.readonly(); // Read the signal to track changes
      inputEl.readOnly = this.isReadonlyEnabled();
    });

    effect(() => {
      this.required(); // Read the signal to track changes
      inputEl.required = this.isRequiredEnabled();
    });

    effect(() => {
      const pattern = this.pattern();
      if (pattern) {
        inputEl.pattern = pattern;
      }
    });

    effect(() => {
      const minlength = this.minlength();
      if (minlength !== undefined) {
        inputEl.minLength = minlength;
      }
    });

    effect(() => {
      const maxlength = this.maxlength();
      if (maxlength !== undefined) {
        inputEl.maxLength = maxlength;
      }
    });

    effect(() => {
      this.min(); // Read the signal to track changes
      const effectiveMin = this.getEffectiveMin();
      if (effectiveMin !== undefined) {
        inputEl.min = effectiveMin;
      }
    });

    effect(() => {
      this.max(); // Read the signal to track changes
      const effectiveMax = this.getEffectiveMax();
      if (effectiveMax !== undefined) {
        inputEl.max = effectiveMax;
      }
    });

    effect(() => {
      this.step(); // Read the signal to track changes
      const effectiveStep = this.getEffectiveStep();
      if (effectiveStep !== undefined) {
        inputEl.step = effectiveStep;
      }
    });

    effect(() => {
      const autocapitalize = this.autocapitalize();
      if (autocapitalize === '') {
        // Default to 'words' when used as a standalone attribute
        inputEl.autocapitalize = 'words';
      } else if (autocapitalize !== undefined) {
        inputEl.autocapitalize = autocapitalize;
      }
    });

    effect(() => {
      const autocorrect = this.autocorrect();
      if (autocorrect !== undefined) {
        inputEl.autocorrect = autocorrect;
      }
    });

    effect(() => {
      const autocomplete = this.autocomplete();
      if (autocomplete !== undefined) {
        inputEl.autocomplete = autocomplete;
      }
    });

    effect(() => {
      this.autofocus(); // Read the signal to track changes
      inputEl.autofocus = this.isAutofocusEnabled();
    });

    effect(() => {
      const enterkeyhint = this.enterkeyhint();
      if (enterkeyhint !== undefined) {
        inputEl.enterKeyHint = enterkeyhint;
      }
    });

    effect(() => {
      this.spellcheck(); // Read the signal to track changes
      inputEl.spellcheck = this.isSpellcheckEnabled();
    });

    effect(() => {
      const inputmode = this.inputmode();
      if (inputmode !== undefined) {
        inputEl.inputMode = inputmode;
      }
    });

    effect(() => {
      const form = this.form();
      if (form !== null) {
        inputEl.form = form;
      }
    });

    effect(() => {
      this.passwordVisible(); // Read the signal to track changes
      this.passwordVisibleAttr(); // Read the signal to track changes
      if (this.type() === 'password' && this.isPasswordToggleEnabled()) {
        inputEl.type = this.isPasswordVisible() ? 'text' : 'password';
      }
    });

    effect(() => {
      this.noSpinButtons(); // Read the signal to track changes
      this.noSpinButtonsAttr(); // Read the signal to track changes
      if (this.type() === 'number') {
        inputEl.classList.toggle('no-spin-buttons', this.isNoSpinButtonsEnabled());
      }
    });

    // Apply appearance
    effect(() => {
      const appearance = this.appearance();
      inputEl.classList.remove('filled', 'outlined');
      inputEl.classList.add(appearance);
    });

    // Apply pill style
    effect(() => {
      this.pill(); // Read the signal to track changes
      inputEl.classList.toggle('pill', this.isPillEnabled());
    });

    // Apply size class
    effect(() => {
      const size = this.size();
      inputEl.classList.remove('small', 'medium', 'large', 'inherit');
      if (size !== 'inherit') {
        inputEl.classList.add(size);
      }
    });
  }

  // Validator implementation
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const type = this.type();
    let errors: ValidationErrors = {};

    // Check required
    if (this.isRequiredEnabled() && (value === null || value === undefined || value === '')) {
      errors = { ...errors, 'required': true };
      this.waInvalid.emit({ error: 'required', control });
      return errors;
    }

    // Skip other validations if value is empty
    if (value === null || value === undefined || value === '') {
      return null;
    }

    // Type-specific validations
    switch (type) {
      case 'number':
        if (isNaN(Number(value))) {
          errors = { ...errors, 'number': true };
          this.waInvalid.emit({ error: 'number', control });
        } else {
          const numValue = Number(value);
          // Check min/max for number type
          const effectiveMin = this.getEffectiveMin();
          if (effectiveMin !== undefined && numValue < Number(effectiveMin)) {
            errors = { ...errors, 'min': { min: effectiveMin, actual: numValue } };
            this.waInvalid.emit({ error: 'min', control });
          }
          const effectiveMax = this.getEffectiveMax();
          if (effectiveMax !== undefined && effectiveMax !== '' && numValue > Number(effectiveMax)) {
            errors = { ...errors, 'max': { max: effectiveMax, actual: numValue } };
            this.waInvalid.emit({ error: 'max', control });
          }
        }
        break;
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(String(value))) {
          errors = { ...errors, 'email': true };
          this.waInvalid.emit({ error: 'email', control });
        }
        break;
      case 'url':
        try {
          new URL(String(value));
        } catch (_) {
          errors = { ...errors, 'url': true };
          this.waInvalid.emit({ error: 'url', control });
        }
        break;
      case 'date':
      case 'datetime-local':
        if (isNaN(Date.parse(String(value)))) {
          errors = { ...errors, 'date': true };
          this.waInvalid.emit({ error: 'date', control });
        } else {
          const dateValue = new Date(String(value));
          // Check min/max for date types
          const effectiveMin = this.getEffectiveMin();
          if (effectiveMin !== undefined && dateValue < new Date(String(effectiveMin))) {
            errors = { ...errors, 'min': { min: effectiveMin, actual: value } };
            this.waInvalid.emit({ error: 'min', control });
          }
          const effectiveMax = this.getEffectiveMax();
          if (effectiveMax !== undefined && effectiveMax !== '' && dateValue > new Date(String(effectiveMax))) {
            errors = { ...errors, 'max': { max: effectiveMax, actual: value } };
            this.waInvalid.emit({ error: 'max', control });
          }
        }
        break;
      case 'time':
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
        if (!timeRegex.test(String(value))) {
          errors = { ...errors, 'time': true };
          this.waInvalid.emit({ error: 'time', control });
        }
        break;
      case 'tel':
        const telRegex = /^[0-9+\-() ]+$/;
        if (!telRegex.test(String(value))) {
          errors = { ...errors, 'tel': true };
          this.waInvalid.emit({ error: 'tel', control });
        }
        break;
    }

    // Pattern validation
    if (this.pattern() && !new RegExp(this.pattern()).test(String(value))) {
      errors = { ...errors, 'pattern': { requiredPattern: this.pattern(), actualValue: value } };
      this.waInvalid.emit({ error: 'pattern', control });
    }

    // Length validations
    const strValue = String(value);
    if (this.minlength() !== undefined && strValue.length < this.minlength()!) {
      errors = { ...errors, 'minlength': { requiredLength: this.minlength(), actualLength: strValue.length } };
      this.waInvalid.emit({ error: 'minlength', control });
    }
    if (this.maxlength() !== undefined && strValue.length > this.maxlength()!) {
      errors = { ...errors, 'maxlength': { requiredLength: this.maxlength(), actualLength: strValue.length } };
      this.waInvalid.emit({ error: 'maxlength', control });
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }
}
