import { Directive, DoCheck, ElementRef, EventEmitter, forwardRef, Injector, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, inject } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { SizeToken } from '../../types/tokens';
import { syncFormValidationState } from '../shared/form-validation-state';

/**
 * WaOtpInputDirective
 *
 * Angular wrapper for the `<wa-otp-input>` Web Awesome component (added in Web Awesome 3.11).
 *
 * OTP inputs collect one-time passcodes, PINs, and other fixed-length codes, one character per
 * segment. Use them for SMS verification, two-factor authentication, and invite codes.
 *
 * Features:
 * - Binds all supported attributes as `@Input()` properties
 * - Implements `ControlValueAccessor` and `Validator` for `[(ngModel)]` / reactive forms support
 * - Treats a partially-filled field as invalid (`incomplete`), matching the component's behaviour
 * - Emits `input`, `change`, `focus`, `blur`, `wa-complete`, `wa-clear`, and `wa-invalid`, each
 *   exposed both as a camelCase output and a hyphenated alias
 * - Exposes `clear()`, `focus()`, `blur()`, `select()`, `setCustomValidity()`, and `resetValidity()`
 * - Supports styling the segments through CSS custom property inputs
 */
@Directive({
  selector: 'wa-otp-input',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaOtpInputDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WaOtpInputDirective),
      multi: true
    }
  ]
})
export class WaOtpInputDirective implements OnInit, OnChanges, OnDestroy, DoCheck, ControlValueAccessor, Validator {
  /** The current value of the OTP field. */
  @Input() value?: string | null;
  /** Number of character segments to display. Overridden by `format`. Default `6`. */
  @Input() length?: number | string;
  /** Visual appearance of the segments. Default `outlined`. */
  @Input() appearance?: 'outlined' | 'filled' | 'filled-outlined' | 'contained' | string;
  /** Allowed character class. Default `numeric`. */
  @Input() type?: 'numeric' | 'alpha' | 'alphanumeric' | string;
  /** When true, entered characters are displayed as `--mask-char` instead of their real value. */
  @Input() mask?: boolean | string;
  /** Case transformation applied to entered characters. Default `preserve`. */
  @Input() case?: 'preserve' | 'upper' | 'lower' | string;
  /** The size of each segment. Default `m`. */
  @Input() size?: SizeToken | string;
  /** A label shown above the segments. */
  @Input() label?: string;
  /** Hint text shown below the segments. */
  @Input() hint?: string;
  /** Segment format string using `#` as a placeholder. Setting `format` overrides `length`. */
  @Input() format?: string;
  /** The `autocomplete` attribute forwarded to the underlying input. Default `one-time-code`. */
  @Input() autocomplete?: string;
  /** Makes the field required. A partially-filled field is always invalid regardless. */
  @Input() required?: boolean | string;
  /** Makes the field readonly. */
  @Input() readonly?: boolean | string;
  /** When true, the form is submitted automatically once all segments are filled. */
  @Input() autosubmit?: boolean | string;
  /** Automatically focuses the field when the page loads. */
  @Input() autofocus?: boolean | string;
  /** When true, empty segments show `--mask-char` as a hint. Maps to `with-mask`. */
  @Input() withMask?: boolean | string;
  /** The name of the input, submitted as a name/value pair with form data. */
  @Input() name?: string | null;
  /** Disables the form control. */
  @Input() disabled?: boolean | string;
  /** Associates the control with a form by id when placed outside a `<form>`. */
  @Input() form?: string | null;

  // Style inputs (CSS custom properties)
  /** Width and height of each segment cell. Maps to `--segment-size`. */
  @Input() segmentSize?: string;
  /** Gap between segments. Maps to `--segment-gap`. */
  @Input() segmentGap?: string;
  /** Corner radius of each segment. Maps to `--segment-border-radius`. */
  @Input() segmentBorderRadius?: string;
  /** Character shown in place of entered values when masking. Maps to `--mask-char`. */
  @Input() maskChar?: string;

  // Event outputs
  @Output() waInput = new EventEmitter<Event>();
  @Output('wa-input') waInputHyphen = this.waInput;
  @Output() waChange = new EventEmitter<Event>();
  @Output('wa-change') waChangeHyphen = this.waChange;
  @Output() waFocus = new EventEmitter<FocusEvent>();
  @Output('wa-focus') waFocusHyphen = this.waFocus;
  @Output() waBlur = new EventEmitter<FocusEvent>();
  @Output('wa-blur') waBlurHyphen = this.waBlur;
  /** Emitted once when all segments are filled. Cancelable to stop `autosubmit`. */
  @Output() waComplete = new EventEmitter<CustomEvent>();
  @Output('wa-complete') waCompleteHyphen = this.waComplete;
  /** Emitted when the control's value is cleared. */
  @Output() waClear = new EventEmitter<CustomEvent>();
  @Output('wa-clear') waClearHyphen = this.waClear;
  @Output() waInvalid = new EventEmitter<CustomEvent>();
  @Output('wa-invalid') waInvalidHyphen = this.waInvalid;
  @Output() valueChange = new EventEmitter<string | null>();

  // Injected services
  private host = inject(ElementRef) as ElementRef<HTMLElement>;
  private renderer = inject(Renderer2);
  private injector = inject(Injector);
  private ngControl: NgControl | null = null;
  private ngControlResolved = false;
  private eventCleanups: (() => void)[] = [];

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private validatorChange?: () => void;

  ngOnInit(): void {
    const el = this.host.nativeElement;

    this.applyInputs();
    this.syncValidationState();

    const forwardInput = (event: Event) => {
      this.waInput.emit(event);
      const val = (event.target as any).value;
      this.onChange(val);
      this.valueChange.emit(val);
    };

    const forwardChange = (event: Event) => {
      this.waChange.emit(event);
      const val = (event.target as any).value;
      this.onChange(val);
      this.valueChange.emit(val);
    };

    this.eventCleanups.push(
      this.renderer.listen(el, 'input', forwardInput),
      this.renderer.listen(el, 'wa-input', forwardInput),
      this.renderer.listen(el, 'change', forwardChange),
      this.renderer.listen(el, 'wa-change', forwardChange),
      this.renderer.listen(el, 'focus', (event: FocusEvent) => this.waFocus.emit(event)),
      this.renderer.listen(el, 'wa-focus', (event: CustomEvent) => this.waFocus.emit(event as unknown as FocusEvent)),
      this.renderer.listen(el, 'blur', (event: FocusEvent) => {
        this.waBlur.emit(event);
        this.onTouched();
      }),
      this.renderer.listen(el, 'wa-blur', (event: CustomEvent) => {
        this.waBlur.emit(event as unknown as FocusEvent);
        this.onTouched();
      }),
      this.renderer.listen(el, 'wa-complete', (event: CustomEvent) => this.waComplete.emit(event)),
      this.renderer.listen(el, 'wa-clear', (event: CustomEvent) => {
        this.waClear.emit(event);
        this.onChange('');
        this.valueChange.emit('');
      }),
      this.renderer.listen(el, 'wa-invalid', (event: CustomEvent) => {
        this.waInvalid.emit(event);
        this.validatorChange?.();
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyInputs();
    if ('required' in changes || 'length' in changes || 'format' in changes) {
      this.validatorChange?.();
    }
  }

  ngDoCheck(): void {
    this.syncValidationState();
  }

  ngOnDestroy(): void {
    this.eventCleanups.forEach(fn => fn());
  }

  private syncValidationState(): void {
    syncFormValidationState(this.host, this.renderer, this.getNgControl());
  }

  private getNgControl(): NgControl | null {
    if (!this.ngControlResolved) {
      this.ngControlResolved = true;
      this.ngControl = this.injector.get(NgControl, null, { optional: true, self: true });
    }
    return this.ngControl;
  }

  private applyInputs(): void {
    this.setAttr('value', this.value);
    this.setNumericAttr('length', this.length);
    this.setAttr('appearance', this.appearance);
    this.setAttr('type', this.type);
    this.setBooleanAttr('mask', this.mask);
    this.setAttr('case', this.case);
    this.setAttr('size', this.size);
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setAttr('format', this.format);
    this.setAttr('autocomplete', this.autocomplete);
    this.setBooleanAttr('required', this.required);
    this.setBooleanAttr('readonly', this.readonly);
    this.setBooleanAttr('autosubmit', this.autosubmit);
    this.setBooleanAttr('autofocus', this.autofocus);
    this.setBooleanAttr('with-mask', this.withMask);
    this.setAttr('name', this.name);
    this.setBooleanAttr('disabled', this.disabled);
    this.setAttr('form', this.form);

    this.setCssVar('--segment-size', this.segmentSize);
    this.setCssVar('--segment-gap', this.segmentGap);
    this.setCssVar('--segment-border-radius', this.segmentBorderRadius);
    this.setCssVar('--mask-char', this.maskChar);
  }

  /** The number of segments derived from `format` (count of `#`) or `length`. */
  private get effectiveLength(): number {
    if (this.format && this.format.includes('#')) {
      return (this.format.match(/#/g) || []).length;
    }
    const len = typeof this.length === 'string' ? parseInt(this.length, 10) : this.length;
    return !len || isNaN(len) ? 6 : len;
  }

  /** Exposes the native OTP input element for direct interaction. */
  public get nativeElement(): HTMLElement {
    return this.host.nativeElement;
  }

  /** Clears the current value and returns focus to the field. */
  public clear(): void {
    const el: any = this.host.nativeElement;
    if (typeof el.clear === 'function') { el.clear(); }
  }

  /** Programmatically focuses the field. */
  public focus(options?: FocusOptions): void {
    const el: any = this.host.nativeElement;
    if (typeof el.focus === 'function') { el.focus(options); }
  }

  /** Programmatically blurs the field. */
  public blur(): void {
    const el: any = this.host.nativeElement;
    if (typeof el.blur === 'function') { el.blur(); }
  }

  /** Selects all entered characters in the hidden input. */
  public select(): void {
    const el: any = this.host.nativeElement;
    if (typeof el.select === 'function') { el.select(); }
  }

  /** Sets a custom validity message on the underlying control. */
  public setCustomValidity(message: string): void {
    const el: any = this.host.nativeElement;
    if (typeof el.setCustomValidity === 'function') { el.setCustomValidity(message); }
  }

  /** Removes manual custom errors and native validation. */
  public resetValidity(): void {
    const el: any = this.host.nativeElement;
    if (typeof el.resetValidity === 'function') { el.resetValidity(); }
  }

  private setAttr(name: string, value: string | number | null | undefined): void {
    if (value != null && value !== '') {
      this.renderer.setAttribute(this.host.nativeElement, name, String(value));
    } else {
      this.renderer.removeAttribute(this.host.nativeElement, name);
    }
  }

  private setNumericAttr(name: string, value: number | string | null | undefined): void {
    if (value != null && value !== '') {
      const n = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(n)) {
        this.renderer.setAttribute(this.host.nativeElement, name, String(n));
        return;
      }
    }
    this.renderer.removeAttribute(this.host.nativeElement, name);
  }

  private setBooleanAttr(name: string, value: boolean | string | null | undefined): void {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.host.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.host.nativeElement, name);
    }
  }

  private setCssVar(name: string, value: string | null | undefined): void {
    if (value != null && value !== '') {
      this.host.nativeElement.style.setProperty(name, value);
    } else {
      this.host.nativeElement.style.removeProperty(name);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
      this.setAttr('value', value);
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
    this.validatorChange?.();
  }

  // Validator implementation: expose validation errors to Angular forms
  validate(control: AbstractControl): ValidationErrors | null {
    const el: any = this.host?.nativeElement;
    if (!el || el.disabled) return null;

    const errors: ValidationErrors = {};
    const val = control?.value;
    const strVal = val == null ? '' : String(val);
    const isEmpty = strVal === '';

    const isRequired = this.required === true || this.required === '' || this.required === 'true';
    if (isRequired && isEmpty) {
      errors['required'] = true;
    }

    // A partially-filled field is always invalid, regardless of `required`.
    if (!isEmpty && strVal.length !== this.effectiveLength) {
      errors['incomplete'] = { requiredLength: this.effectiveLength, actualLength: strVal.length };
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validatorChange = fn;
  }
}

