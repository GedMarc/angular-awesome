import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Injector,
  inject,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { SizeToken, Appearance, normalizeAppearance } from '../../types/tokens';
import { syncFormValidationState } from '../shared/form-validation-state';

@Component({
  selector: 'wa-textarea',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaTextareaComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WaTextareaComponent),
      multi: true
    }
  ],
  host: {
    '[attr.label]': 'label',
    '[attr.hint]': 'hint',
    '[attr.placeholder]': 'placeholder',
    '[attr.rows]': 'rows',
    '[attr.resize]': 'resize',
    '[attr.size]': 'size',
    '[attr.appearance]': 'normalizedAppearance',
    '[attr.name]': 'name',
    '[attr.required]': 'required || null',
    '[attr.minlength]': 'minlength',
    '[attr.maxlength]': 'maxlength',
    '[attr.autocapitalize]': 'autocapitalize',
    '[attr.autocorrect]': 'autocorrect',
    '[attr.autocomplete]': 'autocomplete',
    '[attr.autofocus]': 'autofocus || null',
    '[attr.enterkeyhint]': 'enterkeyhint',
    '[attr.spellcheck]': 'spellcheck',
    '[attr.inputmode]': 'inputmode',
    '[attr.with-label]': 'withLabel ? true : null',
    '[attr.with-hint]': 'withHint ? true : null',
    '[attr.readonly]': 'readonly || null',
    '[attr.disabled]': 'disabled || null',

    '[style.--background-color]': 'backgroundColor',
    '[style.--border-color]': 'borderColor',
    '[style.--border-width]': 'borderWidth',
    '[style.--box-shadow]': 'boxShadow',

    '(focus)': 'onFocus($event)',
    '(wa-focus)': 'onFocus($event)',
    '(blur)': 'onBlur($event)',
    '(wa-blur)': 'onBlur($event)',
    '(input)': 'handleInput($event)',
    '(wa-input)': 'handleInput($event)',
    '(change)': 'handleChange($event)',
    '(wa-change)': 'handleChange($event)',
    '(wa-invalid)': 'waInvalid.emit($event)'
  }
})
export class WaTextareaComponent implements ControlValueAccessor, Validator, OnChanges, DoCheck {
  get normalizedAppearance(): string | undefined {
    return normalizeAppearance(this.appearance as any);
  }
  @Input() label?: string;
  @Input() hint?: string;
  @Input() placeholder?: string;
  @Input() rows?: number;
  @Input() resize?: 'none' | 'vertical' | 'horizontal' | 'both' | 'auto';
  @Input() size?: SizeToken | string;
  @Input() appearance?: Appearance | string;
  @Input() name?: string;
  @Input() required?: boolean;
  @Input() minlength?: number;
  @Input() maxlength?: number;
  @Input() autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
  @Input() autocorrect?: string;
  @Input() autocomplete?: string;
  @Input() autofocus?: boolean;
  @Input() enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  @Input() spellcheck?: boolean;
  @Input() inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  @Input() readonly?: boolean;
  @Input() disabled?: boolean;
  @Input() withLabel?: boolean;
  @Input() withHint?: boolean;

  // CSS custom properties
  @Input() backgroundColor?: string;
  @Input() borderColor?: string;
  @Input() borderWidth?: string;
  @Input() boxShadow?: string;

  @Output() waFocus = new EventEmitter<FocusEvent>();
  @Output() waBlur = new EventEmitter<FocusEvent>();
  @Output() waInput = new EventEmitter<Event>();
  @Output() waChange = new EventEmitter<Event>();
  @Output() waInvalid = new EventEmitter<CustomEvent>();
  @Output() valueChange = new EventEmitter<string>();

  private _value = '';
  onChange = (_: any) => {};
  onTouched = () => {};
  private validatorChange?: () => void;
  private renderer = inject(Renderer2);
  private injector = inject(Injector);
  private ngControl: NgControl | null = null;
  private ngControlResolved = false;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('required' in changes || 'minlength' in changes || 'maxlength' in changes || 'disabled' in changes) {
      this.validatorChange?.();
    }
  }

  ngDoCheck(): void {
    syncFormValidationState(this.host, this.renderer, this.getNgControl());
  }

  private getNgControl(): NgControl | null {
    if (!this.ngControlResolved) {
      this.ngControlResolved = true;
      this.ngControl = this.injector.get(NgControl, null, { optional: true, self: true });
    }
    return this.ngControl;
  }

  writeValue(val: any): void {
    this._value = val ?? '';
    this.host.nativeElement.setAttribute('value', this._value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.host.nativeElement.toggleAttribute('disabled', isDisabled);
    this.validatorChange?.();
  }

  handleInput(event: Event): void {
    const target = event.target as any;
    this._value = target.value;
    this.onChange(this._value);
    this.valueChange.emit(this._value);
    this.waInput.emit(event);
  }

  handleChange(event: Event): void {
    const target = event.target as any;
    this._value = target.value;
    this.onChange(this._value);
    this.valueChange.emit(this._value);
    this.waChange.emit(event);
  }

  onFocus(event: FocusEvent) {
    this.waFocus.emit(event);
  }

  onBlur(event: FocusEvent) {
    this.onTouched();
    this.waBlur.emit(event);
  }

  // Validator implementation: expose validation errors to Angular forms
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.disabled) return null;

    const errors: ValidationErrors = {};
    const val = control?.value;

    // Required
    const isRequired = this.required === true;
    if (isRequired) {
      const isEmpty = val === null || val === undefined || val === '';
      if (isEmpty) {
        errors['required'] = true;
      }
    }

    // Only run remaining validations when there is a non-empty value
    if (val != null && val !== '') {
      const strVal = String(val);

      // Minlength
      if (this.minlength != null) {
        const min = typeof this.minlength === 'string' ? parseInt(this.minlength as any, 10) : this.minlength;
        if (!isNaN(min) && strVal.length < min) {
          errors['minlength'] = { requiredLength: min, actualLength: strVal.length };
        }
      }

      // Maxlength
      if (this.maxlength != null) {
        const max = typeof this.maxlength === 'string' ? parseInt(this.maxlength as any, 10) : this.maxlength;
        if (!isNaN(max) && strVal.length > max) {
          errors['maxlength'] = { requiredLength: max, actualLength: strVal.length };
        }
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validatorChange = fn;
  }
}
