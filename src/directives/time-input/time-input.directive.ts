import { Directive, DoCheck, ElementRef, EventEmitter, forwardRef, Injector, Input, OnInit, OnChanges, SimpleChanges, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors, NgControl } from '@angular/forms';
import { Appearance, normalizeAppearance, SizeToken } from '../../types/tokens';
import { syncFormValidationState } from '../shared/form-validation-state';

/**
 * WaTimeInputDirective
 *
 * Angular wrapper for the <wa-time-input> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported time-input attributes as @Input() properties
 * - Supports 12/24-hour formats, optional seconds, and min/max constraints
 * - Emits events for input, change, focus, blur, clear, show/hide
 * - Allows slot projection for label, hint, start, end, and popup icons
 * - Provides programmatic control through focus(), blur(), show(), and hide() methods
 * - Implements ControlValueAccessor for ngModel and reactive form support
 */
@Directive({
  selector: 'wa-time-input',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaTimeInputDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WaTimeInputDirective),
      multi: true
    }
  ]
})
export class WaTimeInputDirective implements OnInit, OnChanges, DoCheck, ControlValueAccessor, Validator {
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
  @Input() withClear?: boolean | string;
  @Input() withNow?: boolean | string;
  @Input() withLabel?: boolean | string;
  @Input() withHint?: boolean | string;

  // Time configuration
  @Input() min?: string;
  @Input() max?: string;
  @Input() step?: number | 'any' | string;
  @Input() hourFormat?: 'auto' | '12' | '24' | string;
  @Input() open?: boolean | string;
  @Input() placement?: string;
  @Input() distance?: number | string;

  // CSS custom property inputs
  @Input() showDuration?: string;
  @Input() hideDuration?: string;
  @Input() columnItemHeight?: string;
  @Input() columnWidth?: string;

  // Event outputs
  @Output() waInput = new EventEmitter<Event>();
  @Output('wa-input') waInputHyphen = this.waInput;
  @Output() waChange = new EventEmitter<Event>();
  @Output('wa-change') waChangeHyphen = this.waChange;
  @Output() waFocus = new EventEmitter<FocusEvent>();
  @Output('wa-focus') waFocusHyphen = this.waFocus;
  @Output() waBlur = new EventEmitter<FocusEvent>();
  @Output('wa-blur') waBlurHyphen = this.waBlur;
  @Output() waClear = new EventEmitter<CustomEvent>();
  @Output('wa-clear') waClearHyphen = this.waClear;
  @Output() waShow = new EventEmitter<Event>();
  @Output('wa-show') waShowHyphen = this.waShow;
  @Output() waAfterShow = new EventEmitter<Event>();
  @Output('wa-after-show') waAfterShowHyphen = this.waAfterShow;
  @Output() waHide = new EventEmitter<Event>();
  @Output('wa-hide') waHideHyphen = this.waHide;
  @Output() waAfterHide = new EventEmitter<Event>();
  @Output('wa-after-hide') waAfterHideHyphen = this.waAfterHide;
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

    this.renderer.listen(nativeEl, 'wa-clear', (event: CustomEvent) => {
      this.waClear.emit(event);
      this.onChange('');
      this.valueChange.emit('');
    });

    this.renderer.listen(nativeEl, 'wa-show', (event) => this.waShow.emit(event));
    this.renderer.listen(nativeEl, 'wa-after-show', (event) => this.waAfterShow.emit(event));
    this.renderer.listen(nativeEl, 'wa-hide', (event) => this.waHide.emit(event));
    this.renderer.listen(nativeEl, 'wa-after-hide', (event) => this.waAfterHide.emit(event));

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
    this.setAttr('hour-format', this.hourFormat);
    this.setAttr('placement', this.placement);

    if (this.step === 'any') {
      this.setAttr('step', 'any');
    } else {
      this.setNumericAttr('step', this.step);
    }
    this.setNumericAttr('distance', this.distance);

    this.setBooleanAttr('pill', this.pill);
    this.setBooleanAttr('readonly', this.readonly);
    this.setBooleanAttr('required', this.required);
    this.setBooleanAttr('with-clear', this.withClear);
    this.setBooleanAttr('with-now', this.withNow);
    this.setBooleanAttr('with-label', this.withLabel);
    this.setBooleanAttr('with-hint', this.withHint);
    this.setBooleanAttr('open', this.open);

    this.setCssVar('--show-duration', this.showDuration);
    this.setCssVar('--hide-duration', this.hideDuration);
    this.setCssVar('--column-item-height', this.columnItemHeight);
    this.setCssVar('--column-width', this.columnWidth);
  }

  /**
   * Exposes the native time-input element for direct interaction
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

  public show(): void {
    if (typeof this.el.nativeElement.show === 'function') {
      this.el.nativeElement.show();
    }
  }

  public hide(): void {
    if (typeof this.el.nativeElement.hide === 'function') {
      this.el.nativeElement.hide();
    }
  }

  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  private setNumericAttr(name: string, value: number | string | null | undefined) {
    if (value != null && value !== '') {
      const numericValue = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(numericValue)) {
        this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
      }
    }
  }

  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.el.nativeElement.style.setProperty(name, value);
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

    return Object.keys(errors).length > 0 ? errors : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validatorChange = fn;
  }
}

