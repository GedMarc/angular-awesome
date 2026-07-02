import { Directive, DoCheck, ElementRef, EventEmitter, forwardRef, Injector, Input, OnInit, OnChanges, SimpleChanges, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors, NgControl } from '@angular/forms';
import { SizeToken } from '../../types/tokens';
import { syncFormValidationState } from '../shared/form-validation-state';

/**
 * WaNumberInputDirective
 *
 * Angular wrapper for the <wa-number-input> Web Awesome component.
 *
 * Features:
 * - Binds all supported attributes as @Input() properties
 * - Emits events for input, change, focus, blur and wa-invalid. Each event is
 *   exposed both as a camelCase output (waInput) and as a hyphenated alias
 *   (wa-input) so templates can bind with either convention.
 * - Listens to both the native DOM events emitted by the component
 *   (input/change/focus/blur) and any wa-prefixed custom events, so bindings
 *   like (wa-input) and (wa-change) work as expected.
 * - Implements ControlValueAccessor for ngModel / reactive forms support
 * - Provides programmatic control: focus(), blur(), select(), stepUp(), stepDown()
 */
@Directive({
  selector: 'wa-number-input',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaNumberInputDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WaNumberInputDirective),
      multi: true
    }
  ]
})
export class WaNumberInputDirective implements OnInit, OnChanges, DoCheck, ControlValueAccessor, Validator {
  // Properties (mapped from llms.txt)
  @Input() value?: string | number | null;
  @Input() defaultValue?: string | null;
  @Input() size: SizeToken | string = 'medium';
  @Input() appearance: 'filled' | 'outlined' | 'filled-outlined' | string = 'outlined';
  @Input() pill?: boolean | string;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() placeholder?: string;
  @Input() readonly?: boolean | string;
  @Input() required?: boolean | string;
  @Input() min?: number | string;
  @Input() max?: number | string;
  @Input() step: number | 'any' | string = 1 as any;
  @Input() withoutSteppers?: boolean | string;
  @Input() autocomplete?: string;
  @Input() autofocus?: boolean | string;
  @Input() enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | string;
  @Input() inputmode: 'numeric' | 'decimal' | string = 'numeric';
  @Input() withLabel?: boolean | string;
  @Input() withHint?: boolean | string;
  @Input() form?: string | null;

  // Events - exposed both as camelCase outputs and hyphenated aliases
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
  @Output() valueChange = new EventEmitter<string | number | null>();

  // Injected services
  private host = inject(ElementRef) as ElementRef<HTMLElement>;
  private renderer = inject(Renderer2);
  private injector = inject(Injector);
  private ngControl: NgControl | null = null;
  private ngControlResolved = false;

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

    this.renderer.listen(el, 'input', forwardInput);
    this.renderer.listen(el, 'wa-input', forwardInput);

    this.renderer.listen(el, 'change', forwardChange);
    this.renderer.listen(el, 'wa-change', forwardChange);

    this.renderer.listen(el, 'focus', (event: FocusEvent) => this.waFocus.emit(event));
    this.renderer.listen(el, 'wa-focus', (event: CustomEvent) => this.waFocus.emit(event as unknown as FocusEvent));

    this.renderer.listen(el, 'blur', (event: FocusEvent) => {
      this.waBlur.emit(event);
      this.onTouched();
    });
    this.renderer.listen(el, 'wa-blur', (event: CustomEvent) => {
      this.waBlur.emit(event as unknown as FocusEvent);
      this.onTouched();
    });

    this.renderer.listen(el, 'wa-invalid', (event: CustomEvent) => {
      this.waInvalid.emit(event);
      this.validatorChange?.();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyInputs();
    if ('required' in changes || 'min' in changes || 'max' in changes || 'step' in changes) {
      this.validatorChange?.();
    }
  }

  ngDoCheck(): void {
    this.syncValidationState();
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
    this.setAttr('size', this.size);
    this.setAttr('appearance', this.appearance);
    this.setBooleanAttr('pill', this.pill);
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setAttr('placeholder', this.placeholder);
    this.setAttr('form', this.form);
    this.setBooleanAttr('readonly', this.readonly);
    this.setBooleanAttr('required', this.required);
    this.setNumericAttr('min', this.min);
    this.setNumericAttr('max', this.max);
    if (this.step === 'any') {
      this.setAttr('step', 'any');
    } else {
      this.setAttr('step', this.step);
    }
    this.setBooleanAttr('without-steppers', this.withoutSteppers);
    this.setAttr('autocomplete', this.autocomplete);
    this.setBooleanAttr('autofocus', this.autofocus);
    this.setAttr('enterkeyhint', this.enterkeyhint);
    this.setAttr('inputmode', this.inputmode);
    this.setBooleanAttr('with-label', this.withLabel);
    this.setBooleanAttr('with-hint', this.withHint);
  }

  /**
   * Exposes the native input element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.host.nativeElement;
  }

  /** Programmatically focuses the input */
  public focus(options?: FocusOptions): void {
    if (typeof (this.host.nativeElement as any).focus === 'function') {
      (this.host.nativeElement as any).focus(options);
    }
  }

  /** Programmatically blurs the input */
  public blur(): void {
    if (typeof (this.host.nativeElement as any).blur === 'function') {
      (this.host.nativeElement as any).blur();
    }
  }

  /** Programmatically selects all text in the input */
  public select(): void {
    if (typeof (this.host.nativeElement as any).select === 'function') {
      (this.host.nativeElement as any).select();
    }
  }

  /** Increments the value by the step amount */
  public stepUp(): void {
    if (typeof (this.host.nativeElement as any).stepUp === 'function') {
      (this.host.nativeElement as any).stepUp();
    }
  }

  /** Decrements the value by the step amount */
  public stepDown(): void {
    if (typeof (this.host.nativeElement as any).stepDown === 'function') {
      (this.host.nativeElement as any).stepDown();
    }
  }

  private setAttr(name: string, value: any) {
    if (value !== undefined && value !== null && value !== '') {
      this.renderer.setAttribute(this.host.nativeElement, name, String(value));
    } else {
      this.renderer.removeAttribute(this.host.nativeElement, name);
    }
  }

  private setNumericAttr(name: string, value: number | string | null | undefined) {
    if (value !== undefined && value !== null && value !== '') {
      const n = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(n as number)) {
        this.renderer.setAttribute(this.host.nativeElement, name, String(n));
      }
    } else {
      this.renderer.removeAttribute(this.host.nativeElement, name);
    }
  }

  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.host.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.host.nativeElement, name);
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

    const isRequired = this.required === true || this.required === '' || this.required === 'true';
    if (isRequired) {
      const isEmpty = val === null || val === undefined || val === '';
      if (isEmpty) {
        errors['required'] = true;
      }
    }

    if (val != null && val !== '') {
      const numVal = parseFloat(String(val));

      if (this.min != null) {
        const minNum = typeof this.min === 'string' ? parseFloat(this.min) : this.min;
        if (!isNaN(numVal) && !isNaN(minNum) && numVal < minNum) {
          errors['min'] = { min: minNum, actual: numVal };
        }
      }

      if (this.max != null) {
        const maxNum = typeof this.max === 'string' ? parseFloat(this.max) : this.max;
        if (!isNaN(numVal) && !isNaN(maxNum) && numVal > maxNum) {
          errors['max'] = { max: maxNum, actual: numVal };
        }
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validatorChange = fn;
  }
}
