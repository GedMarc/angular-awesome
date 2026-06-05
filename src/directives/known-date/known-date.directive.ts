import { Directive, DoCheck, ElementRef, EventEmitter, forwardRef, Injector, Input, OnInit, OnChanges, SimpleChanges, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors, NgControl } from '@angular/forms';
import { Appearance, normalizeAppearance, SizeToken } from '../../types/tokens';
import { syncFormValidationState } from '../shared/form-validation-state';

/**
 * WaKnownDateDirective
 *
 * Angular wrapper for the <wa-known-date> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported known-date attributes as @Input() properties
 * - Presents three separate day, month, and year fields in the locale's natural order
 * - Emits events for input, change, focus, and blur
 * - Allows slot projection for label and hint
 * - Provides programmatic control through focus() and blur() methods
 * - Implements ControlValueAccessor for ngModel and reactive form support
 */
@Directive({
  selector: 'wa-known-date',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaKnownDateDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WaKnownDateDirective),
      multi: true
    }
  ]
})
export class WaKnownDateDirective implements OnInit, OnChanges, DoCheck, ControlValueAccessor, Validator {
  // Core attributes
  @Input() name?: string | null;
  @Input() value?: string;
  @Input() form?: string | null;
  @Input() disabled?: boolean | string;
  @Input() required?: boolean | string;
  @Input() readonly?: boolean | string;
  @Input() size?: SizeToken | string;
  @Input() appearance?: Appearance | string;
  @Input() pill?: boolean | string;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() autocomplete?: string;
  @Input() min?: string;
  @Input() max?: string;
  @Input() locale?: string;
  @Input() withLabel?: boolean | string;
  @Input() withHint?: boolean | string;

  // Event outputs
  @Output() waInput = new EventEmitter<Event>();
  @Output('wa-input') waInputHyphen = this.waInput;
  @Output() waChange = new EventEmitter<Event>();
  @Output('wa-change') waChangeHyphen = this.waChange;
  @Output() waFocus = new EventEmitter<FocusEvent>();
  @Output('wa-focus') waFocusHyphen = this.waFocus;
  @Output() waBlur = new EventEmitter<FocusEvent>();
  @Output('wa-blur') waBlurHyphen = this.waBlur;
  @Output() waInvalid = new EventEmitter<CustomEvent>();
  @Output('wa-invalid') waInvalidHyphen = this.waInvalid;
  @Output() valueChange = new EventEmitter<string>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private injector = inject(Injector);
  private ngControl: NgControl | null = null;
  private ngControlResolved = false;

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private validatorChange?: () => void;

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

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

    this.renderer.listen(nativeEl, 'input', forwardInput);
    this.renderer.listen(nativeEl, 'change', forwardChange);

    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => this.waFocus.emit(event));
    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.waBlur.emit(event);
      this.onTouched();
    });

    this.renderer.listen(nativeEl, 'wa-invalid', (event: CustomEvent) => {
      this.waInvalid.emit(event);
      this.validatorChange?.();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyInputs();
    if ('required' in changes || 'min' in changes || 'max' in changes || 'disabled' in changes) {
      this.validatorChange?.();
    }
  }

  ngDoCheck(): void {
    this.syncValidationState();
  }

  private syncValidationState(): void {
    syncFormValidationState(this.el, this.renderer, this.getNgControl());
  }

  private getNgControl(): NgControl | null {
    if (!this.ngControlResolved) {
      this.ngControlResolved = true;
      this.ngControl = this.injector.get(NgControl, null, { optional: true, self: true });
    }
    return this.ngControl;
  }

  private applyInputs() {
    this.setAttr('name', this.name);
    this.setAttr('value', this.value);
    this.setAttr('form', this.form);
    this.setAttr('size', this.size);
    this.setAttr('appearance', normalizeAppearance(this.appearance));
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setAttr('autocomplete', this.autocomplete);
    this.setAttr('min', this.min);
    this.setAttr('max', this.max);
    this.setAttr('locale', this.locale);

    this.setBooleanAttr('pill', this.pill);
    this.setBooleanAttr('readonly', this.readonly);
    this.setBooleanAttr('required', this.required);
    this.setBooleanAttr('with-label', this.withLabel);
    this.setBooleanAttr('with-hint', this.withHint);
  }

  /**
   * Exposes the native known-date element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  public focus(options?: FocusOptions): void {
    if (typeof this.el.nativeElement.focus === 'function') {
      this.el.nativeElement.focus(options);
    }
  }

  public blur(): void {
    if (typeof this.el.nativeElement.blur === 'function') {
      this.el.nativeElement.blur();
    }
  }

  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
      this.setAttr('value', value == null ? undefined : String(value));
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

  // Validator implementation
  validate(control: AbstractControl): ValidationErrors | null {
    const el: any = this.el?.nativeElement;
    if (!el || el.disabled) return null;

    const errors: ValidationErrors = {};
    const val = control?.value;

    const isRequired = this.required === true || this.required === '' || this.required === 'true';
    if (isRequired) {
      const isEmpty = val === null || val === undefined || val === '';
      if (isEmpty) {
        errors['required'] = true;
      }
    }

    if (val != null && val !== '') {
      const strVal = String(val);
      if (this.min && strVal < this.min) {
        errors['min'] = { min: this.min, actual: strVal };
      }
      if (this.max && strVal > this.max) {
        errors['max'] = { max: this.max, actual: strVal };
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validatorChange = fn;
  }
}

