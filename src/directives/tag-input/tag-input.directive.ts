import {
  Directive,
  DoCheck,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges
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
import { Appearance, normalizeAppearance, SizeToken } from '../../types/tokens';
import { syncFormValidationState } from '../shared/form-validation-state';

/** Event detail emitted before text is converted into a tag. */
export interface WaTagInputCreateDetail {
  inputValue: string;
}

/** State accepted by the form-associated custom-element restore callback. */
export type WaTagInputRestoreState = string | File | FormData | null;

/**
 * Angular wrapper for Web Awesome's `<wa-tag-input>` component, added in 3.13.
 *
 * The directive keeps the component's array-valued `value` as a live DOM property, supports
 * template-driven and reactive forms, and exposes every documented event and public method.
 */
@Directive({
  selector: 'wa-tag-input',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaTagInputDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WaTagInputDirective),
      multi: true
    }
  ]
})
export class WaTagInputDirective implements OnInit, OnChanges, OnDestroy, DoCheck, ControlValueAccessor, Validator {
  /** The current tags. This is assigned as a DOM property so the array remains intact. */
  @Input() value?: string[] | null;
  /** Initial/reset value represented as a delimiter-separated string. */
  @Input() defaultValue?: string | null;
  /** Text currently entered but not yet converted into a tag. */
  @Input() inputValue?: string;
  /** Characters that convert entered text into tags. Default `,`. */
  @Input() delimiter?: string;
  /** Maximum number of tags that can be added. */
  @Input() maxTags?: number | string;
  /** Minimum number of tags required when the control is non-empty. */
  @Input() minTags?: number | string;
  /** Allows duplicate tag values. */
  @Input() allowDuplicates?: boolean | string;
  /** Shows a button that clears all tags. */
  @Input() withClear?: boolean | string;
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() hint?: string;
  /** Enables correct SSR markup when the label slot is used. */
  @Input() withLabel?: boolean | string;
  /** Enables correct SSR markup when the hint slot is used. */
  @Input() withHint?: boolean | string;
  @Input() size?: SizeToken | string;
  @Input() appearance?: Appearance | string;
  @Input() pill?: boolean | string;
  @Input() readonly?: boolean | string;
  @Input() required?: boolean | string;
  @Input() autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' | string;
  @Input() autocorrect?: boolean | string;
  @Input() autocomplete?: string;
  @Input() enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | string;
  @Input() spellcheck?: boolean | string;
  @Input() inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' | string;
  @Input() name?: string | null;
  @Input() disabled?: boolean | string;
  /** Id of a form to associate with when the control is outside the form. */
  @Input() form?: string | null;
  /** Optional custom validators consumed directly by the Web Awesome element. */
  @Input() validators?: readonly unknown[];
  /** Element used to anchor native constraint-validation popups. */
  @Input() validationTarget?: HTMLElement;

  @Output() waInput = new EventEmitter<Event>();
  @Output('wa-input') waInputHyphen = this.waInput;
  @Output() waChange = new EventEmitter<Event>();
  @Output('wa-change') waChangeHyphen = this.waChange;
  @Output() waFocus = new EventEmitter<FocusEvent>();
  @Output('wa-focus') waFocusHyphen = this.waFocus;
  @Output() waBlur = new EventEmitter<FocusEvent>();
  @Output('wa-blur') waBlurHyphen = this.waBlur;
  @Output() waCreate = new EventEmitter<CustomEvent<WaTagInputCreateDetail>>();
  @Output('wa-create') waCreateHyphen = this.waCreate;
  @Output() waClear = new EventEmitter<CustomEvent>();
  @Output('wa-clear') waClearHyphen = this.waClear;
  @Output() waInvalid = new EventEmitter<CustomEvent>();
  @Output('wa-invalid') waInvalidHyphen = this.waInvalid;
  @Output() valueChange = new EventEmitter<string[]>();

  private host = inject(ElementRef) as ElementRef<HTMLElement>;
  private renderer = inject(Renderer2);
  private injector = inject(Injector);
  private ngControl: NgControl | null = null;
  private ngControlResolved = false;
  private controlDisabled?: boolean;
  private eventCleanups: (() => void)[] = [];
  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};
  private validatorChange?: () => void;

  ngOnInit(): void {
    const element = this.host.nativeElement;
    this.applyInputs();
    this.syncValidationState();

    const forwardValue = (event: Event, emitter: EventEmitter<Event>) => {
      emitter.emit(event);
      const value = this.readValue();
      this.onChange(value);
      this.valueChange.emit(value);
      this.validatorChange?.();
    };

    this.eventCleanups.push(
      this.renderer.listen(element, 'input', (event: Event) => forwardValue(event, this.waInput)),
      this.renderer.listen(element, 'wa-input', (event: Event) => forwardValue(event, this.waInput)),
      this.renderer.listen(element, 'change', (event: Event) => forwardValue(event, this.waChange)),
      this.renderer.listen(element, 'wa-change', (event: Event) => forwardValue(event, this.waChange)),
      this.renderer.listen(element, 'focus', (event: FocusEvent) => this.waFocus.emit(event)),
      this.renderer.listen(element, 'wa-focus', (event: CustomEvent) => this.waFocus.emit(event as unknown as FocusEvent)),
      this.renderer.listen(element, 'blur', (event: FocusEvent) => {
        this.waBlur.emit(event);
        this.onTouched();
      }),
      this.renderer.listen(element, 'wa-blur', (event: CustomEvent) => {
        this.waBlur.emit(event as unknown as FocusEvent);
        this.onTouched();
      }),
      this.renderer.listen(element, 'wa-create', (event: CustomEvent<WaTagInputCreateDetail>) => this.waCreate.emit(event)),
      this.renderer.listen(element, 'wa-clear', (event: CustomEvent) => {
        this.waClear.emit(event);
        const value = this.readValue();
        this.onChange(value);
        this.valueChange.emit(value);
        this.validatorChange?.();
      }),
      this.renderer.listen(element, 'wa-invalid', (event: CustomEvent) => {
        this.waInvalid.emit(event);
        this.validatorChange?.();
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyInputs();
    if ('value' in changes && this.value === undefined) {
      this.setProperty('value', []);
    }
    if ('defaultValue' in changes && this.defaultValue === undefined) {
      this.setProperty('defaultValue', null);
    }
    if ('inputValue' in changes && this.inputValue === undefined) {
      this.setProperty('inputValue', '');
    }
    if ('validators' in changes && this.validators === undefined) {
      this.setProperty('validators', []);
    }
    if ('validationTarget' in changes && this.validationTarget === undefined) {
      this.setProperty('validationTarget', undefined);
    }
    if ('required' in changes || 'minTags' in changes || 'maxTags' in changes || 'disabled' in changes) {
      this.validatorChange?.();
    }
  }

  ngDoCheck(): void {
    this.syncValidationState();
  }

  ngOnDestroy(): void {
    this.eventCleanups.forEach(cleanup => cleanup());
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
    if (this.value !== undefined) {
      this.setProperty('value', this.normalizeValue(this.value));
    }
    this.setAttr('value', this.defaultValue);
    if (this.defaultValue !== undefined) {
      this.setProperty('defaultValue', this.defaultValue);
    }
    if (this.inputValue !== undefined) {
      this.setProperty('inputValue', this.inputValue);
    }

    this.setAttr('delimiter', this.delimiter);
    this.setNumericAttr('max-tags', this.maxTags);
    this.setNumericAttr('min-tags', this.minTags);
    this.setBooleanAttr('allow-duplicates', 'allowDuplicates', this.allowDuplicates);
    this.setBooleanAttr('with-clear', 'withClear', this.withClear);
    this.setAttr('placeholder', this.placeholder);
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setBooleanAttr('with-label', 'withLabel', this.withLabel);
    this.setBooleanAttr('with-hint', 'withHint', this.withHint);
    this.setAttr('size', this.size);
    this.setAttr('appearance', normalizeAppearance(this.appearance));
    this.setBooleanAttr('pill', 'pill', this.pill);
    this.setBooleanAttr('readonly', 'readonly', this.readonly);
    this.setBooleanAttr('required', 'required', this.required);
    this.setAttr('autocapitalize', this.autocapitalize);
    this.setEnumeratedBooleanAttr('autocorrect', 'autocorrect', this.autocorrect, 'on', 'off');
    this.setAttr('autocomplete', this.autocomplete);
    this.setAttr('enterkeyhint', this.enterkeyhint);
    this.setEnumeratedBooleanAttr('spellcheck', 'spellcheck', this.spellcheck, 'true', 'false');
    this.setAttr('inputmode', this.inputmode);
    this.setAttr('name', this.name);

    const disabled = this.controlDisabled ?? this.toBoolean(this.disabled);
    if (disabled !== undefined) {
      this.setBooleanAttr('disabled', 'disabled', disabled);
    } else {
      this.renderer.removeAttribute(this.host.nativeElement, 'disabled');
    }

    this.setAttr('form', this.form);
    if (this.validators !== undefined) {
      this.setProperty('validators', this.validators);
    }
    if (this.validationTarget !== undefined) {
      this.setProperty('validationTarget', this.validationTarget);
    }
  }

  private readValue(): string[] {
    return this.normalizeValue((this.host.nativeElement as any).value);
  }

  private normalizeValue(value: unknown): string[] {
    return Array.isArray(value) ? value.map(tag => String(tag)) : [];
  }

  private toBoolean(value: boolean | string | null | undefined): boolean | undefined {
    if (value == null) return undefined;
    return value === true || value === '' || value === 'true' || value === 'on';
  }

  private toNumber(value: number | string | null | undefined): number | undefined {
    if (value == null || value === '') return undefined;
    const number = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(number) ? number : undefined;
  }

  private setProperty(name: string, value: unknown): void {
    this.renderer.setProperty(this.host.nativeElement, name, value);
  }

  private setAttr(name: string, value: string | null | undefined): void {
    if (value != null) {
      this.renderer.setAttribute(this.host.nativeElement, name, value);
    } else {
      this.renderer.removeAttribute(this.host.nativeElement, name);
    }
  }

  private setNumericAttr(name: string, value: number | string | null | undefined): void {
    const number = this.toNumber(value);
    if (number !== undefined) {
      this.renderer.setAttribute(this.host.nativeElement, name, String(number));
    } else {
      this.renderer.removeAttribute(this.host.nativeElement, name);
    }
  }

  private setBooleanAttr(
    attribute: string,
    property: string,
    value: boolean | string | null | undefined
  ): void {
    const boolean = this.toBoolean(value);
    const resolved = boolean ?? false;
    this.setProperty(property, resolved);
    if (resolved) {
      this.renderer.setAttribute(this.host.nativeElement, attribute, '');
    } else {
      this.renderer.removeAttribute(this.host.nativeElement, attribute);
    }
  }

  private setEnumeratedBooleanAttr(
    attribute: string,
    property: string,
    value: boolean | string | null | undefined,
    trueValue: string,
    falseValue: string
  ): void {
    const boolean = this.toBoolean(value);
    if (boolean === undefined) {
      this.renderer.removeAttribute(this.host.nativeElement, attribute);
      return;
    }
    this.setProperty(property, boolean);
    this.renderer.setAttribute(this.host.nativeElement, attribute, boolean ? trueValue : falseValue);
  }

  /** Exposes the native tag-input element. */
  public get nativeElement(): HTMLElement {
    return this.host.nativeElement;
  }

  public focus(options?: FocusOptions): void {
    const element: any = this.host.nativeElement;
    if (typeof element.focus === 'function') element.focus(options);
  }

  public blur(): void {
    const element: any = this.host.nativeElement;
    if (typeof element.blur === 'function') element.blur();
  }

  public setCustomValidity(message: string): void {
    const element: any = this.host.nativeElement;
    if (typeof element.setCustomValidity === 'function') element.setCustomValidity(message);
  }

  public formStateRestoreCallback(
    state: WaTagInputRestoreState,
    reason: 'autocomplete' | 'restore'
  ): void {
    const element: any = this.host.nativeElement;
    if (typeof element.formStateRestoreCallback === 'function') {
      element.formStateRestoreCallback(state, reason);
    }
  }

  public resetValidity(): void {
    const element: any = this.host.nativeElement;
    if (typeof element.resetValidity === 'function') element.resetValidity();
  }

  writeValue(value: string[] | null | undefined): void {
    const tags = this.normalizeValue(value);
    this.value = tags;
    this.setProperty('value', tags);
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.controlDisabled = isDisabled;
    this.setBooleanAttr('disabled', 'disabled', isDisabled);
    this.validatorChange?.();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if ((this.host.nativeElement as any).disabled) return null;

    const tags = this.normalizeValue(control?.value);
    const errors: ValidationErrors = {};
    const required = this.toBoolean(this.required) === true;
    const minimum = this.toNumber(this.minTags);
    const maximum = this.toNumber(this.maxTags);

    if (required && tags.length === 0) {
      errors['required'] = true;
    }
    if (tags.length > 0 && minimum !== undefined && tags.length < minimum) {
      errors['minTags'] = { minTags: minimum, actual: tags.length };
    }
    if (maximum !== undefined && tags.length > maximum) {
      errors['maxTags'] = { maxTags: maximum, actual: tags.length };
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validatorChange = fn;
  }
}
