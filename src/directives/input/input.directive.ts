import { Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Appearance, normalizeAppearance } from '../../types/tokens';

/**
 * WaInputDirective
 *
 * Angular wrapper for the <wa-input> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported input attributes as @Input() properties
 * - Supports string inputs like type, label, placeholder, etc.
 * - Supports numeric inputs like minlength, maxlength, min, max, etc.
 * - Supports boolean attributes like required, readonly, clearable, etc.
 * - Emits events for input, change, focusNative, blurNative, etc.
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for label, hint, start, end, etc.
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control: focusNative(), blurNative(), select(), etc.
 * - Implements ControlValueAccessor for ngModel support
 */
@Directive({
  selector: 'wa-input',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaInputDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WaInputDirective),
      multi: true
    }
  ]
})
export class WaInputDirective implements OnInit, ControlValueAccessor, Validator {
  // Core input attributes
  @Input() type?: string;
  @Input() value?: string | number | null;
  @Input() size?: 'small' | 'medium' | 'large' | 'inherit' | string;
  @Input() appearance?: Appearance | string;
  @Input() pill?: boolean | string;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() withClear?: boolean | string;
  @Input() placeholder?: string;
  @Input() readonly?: boolean | string;
  @Input() passwordToggle?: boolean | string;
  @Input() passwordVisible?: boolean | string;
  @Input() withoutSpinButtons?: boolean | string;
  @Input() form?: string | null;
  @Input() required?: boolean | string;
  @Input() pattern?: string;
  @Input() minlength?: number | string;
  @Input() maxlength?: number | string;
  @Input() min?: number | string;
  @Input() max?: number | string;
  @Input() step?: number | 'any' | string;
  @Input() autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' | string;
  @Input() autocorrect?: 'on' | 'off' | string;
  @Input() autocomplete?: string;
  @Input() autofocus?: boolean | string;
  @Input() enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | string;
  @Input() spellcheck?: boolean | string;
  @Input() inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' | string;
  @Input() withLabel?: boolean | string;
  @Input() withHint?: boolean | string;

  // Style inputs
  @Input() backgroundColor?: string;
  @Input() borderColor?: string;
  @Input() borderWidth?: string;
  @Input() boxShadow?: string;

  // Event outputs
  @Output() input = new EventEmitter<Event>();
  @Output() change = new EventEmitter<Event>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() waClear = new EventEmitter<CustomEvent>();
  @Output() waInvalid = new EventEmitter<CustomEvent>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private validatorChange?: () => void;

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set string attributes
    this.setAttr('type', this.type);
    this.setAttr('value', this.value?.toString());
    this.setAttr('size', this.size);
    this.setAttr('appearance', normalizeAppearance(this.appearance));
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setAttr('placeholder', this.placeholder);
    this.setAttr('form', this.form);
    this.setAttr('pattern', this.pattern);
    this.setAttr('autocapitalize', this.autocapitalize);
    this.setAttr('autocorrect', this.autocorrect);
    this.setAttr('autocomplete', this.autocomplete);
    this.setAttr('enterkeyhint', this.enterkeyhint);
    this.setAttr('inputmode', this.inputmode);

    // Set numeric attributes
    this.setNumericAttr('minlength', this.minlength);
    this.setNumericAttr('maxlength', this.maxlength);
    this.setNumericAttr('min', this.min);
    this.setNumericAttr('max', this.max);
    if (this.step !== 'any') {
      this.setNumericAttr('step', this.step);
    } else if (this.step === 'any') {
      this.setAttr('step', 'any');
    }

    // Set boolean attributes (only if true)
    this.setBooleanAttr('pill', this.pill);
    this.setBooleanAttr('with-clear', this.withClear);
    this.setBooleanAttr('readonly', this.readonly);
    this.setBooleanAttr('password-toggle', this.passwordToggle);
    this.setBooleanAttr('password-visible', this.passwordVisible);
    this.setBooleanAttr('without-spin-buttons', this.withoutSpinButtons);
    this.setBooleanAttr('required', this.required);
    this.setBooleanAttr('autofocus', this.autofocus);
    this.setBooleanAttr('spellcheck', this.spellcheck);
    this.setBooleanAttr('with-label', this.withLabel);
    this.setBooleanAttr('with-hint', this.withHint);

    // Set style attributes
    this.setCssVar('--background-color', this.backgroundColor);
    this.setCssVar('--border-color', this.borderColor);
    this.setCssVar('--border-width', this.borderWidth);
    this.setCssVar('--box-shadow', this.boxShadow);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'input', (event: Event) => {
      this.input.emit(event);
      this.onChange((event.target as HTMLInputElement).value);
    });
    this.renderer.listen(nativeEl, 'change', (event: Event) => {
      this.change.emit(event);
      this.onChange((event.target as HTMLInputElement).value);
    });
    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => {
      this.focusEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.blurEvent.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'wa-clear', (event: CustomEvent) => {
      this.waClear.emit(event);
      this.onChange('');
    });
    this.renderer.listen(nativeEl, 'wa-invalid', (event: CustomEvent) => {
      this.waInvalid.emit(event);
      this.validatorChange?.();
    });
  }

  /**
   * Exposes the native input element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Programmatically focuses the input
   */
  public focus(options?: FocusOptions): void {
    if (typeof this.el.nativeElement.focus === 'function') {
      this.el.nativeElement.focus(options);
    }
  }

  /**
   * Programmatically blurs the input
   */
  public blur(): void {
    if (typeof this.el.nativeElement.blur === 'function') {
      this.el.nativeElement.blur();
    }
  }

  /**
   * Programmatically selects all text in the input
   */
  public select(): void {
    if (typeof this.el.nativeElement.select === 'function') {
      this.el.nativeElement.select();
    }
  }

  /**
   * Programmatically sets the selection range
   */
  public setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none'): void {
    if (typeof this.el.nativeElement.setSelectionRange === 'function') {
      this.el.nativeElement.setSelectionRange(start, end, direction);
    }
  }

  /**
   * Programmatically sets the range text
   */
  public setRangeText(replacement: string, start: number, end: number, selectMode?: 'select' | 'start' | 'end' | 'preserve'): void {
    if (typeof this.el.nativeElement.setRangeText === 'function') {
      this.el.nativeElement.setRangeText(replacement, start, end, selectMode);
    }
  }

  /**
   * Programmatically shows the picker (for date, color, etc. inputs)
   */
  public showPicker(): void {
    if (typeof this.el.nativeElement.showPicker === 'function') {
      this.el.nativeElement.showPicker();
    }
  }

  /**
   * Programmatically steps up the value (for number inputs)
   */
  public stepUp(): void {
    if (typeof this.el.nativeElement.stepUp === 'function') {
      this.el.nativeElement.stepUp();
    }
  }

  /**
   * Programmatically steps down the value (for number inputs)
   */
  public stepDown(): void {
    if (typeof this.el.nativeElement.stepDown === 'function') {
      this.el.nativeElement.stepDown();
    }
  }

  /**
   * Sets an attribute on the native element if the value is not null or undefined
   */
  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    }
  }

  /**
   * Sets a numeric attribute on the native element if the value is not null or undefined
   */
  private setNumericAttr(name: string, value: number | string | null | undefined) {
    if (value != null) {
      const numericValue = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(numericValue)) {
        this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
      }
    }
  }

  /**
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
    }
  }

  /**
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
      this.setAttr('value', value?.toString());
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

  // Validator implementation: expose required error to Angular forms
  validate(control: AbstractControl): ValidationErrors | null {
    // If the underlying element is disabled, treat as valid
    const el: any = this.el?.nativeElement;
    if (!el || el.disabled) return null;

    const isRequired = this.required === true || this.required === '' || this.required === 'true';
    if (!isRequired) return null;

    const val = control?.value;
    const isEmpty = val === null || val === undefined || val === '';
    return isEmpty ? { required: true } : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validatorChange = fn;
  }
}
