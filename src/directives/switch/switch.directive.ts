import { Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { SizeToken } from '../../types/tokens';

/**
 * WaSwitchDirective
 *
 * Angular wrapper for the <wa-switch> Web Component that allows declarative usage,
 * input binding, and integration with Angular forms.
 *
 * Features:
 * - Binds all supported switch attributes as @Input() properties
 * - Emits events for input, change, focusNative, blurNative
 * - Enables Angular-style class and style bindings
 * - Supports ngModel for form integration
 */
@Directive({
  selector: 'wa-switch[waSwitch]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaSwitchDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WaSwitchDirective),
      multi: true
    }
  ]
})
export class WaSwitchDirective implements OnInit, ControlValueAccessor, Validator {
  // Dialog integration: support both kebab-case and camelCase bindings
  private _dataDialog: string | null | undefined;
  @Input('data-dialog') set dataDialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input('dialog') set dialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input() set dataDialog(val: string | null | undefined) { this._dataDialog = val ?? null; }
  // Core input attributes
  @Input() disabled?: boolean | string;
  @Input() required?: boolean | string;
  @Input() hint?: string;
  @Input() size?: SizeToken | string;

  // Style inputs
  @Input() backgroundColor?: string;
  @Input() backgroundColorChecked?: string;
  @Input() borderColor?: string;
  @Input() borderColorChecked?: string;
  @Input() borderStyle?: string;
  @Input() borderWidth?: string;
  @Input() boxShadow?: string;
  @Input() height?: string;
  @Input() thumbColor?: string;
  @Input() thumbColorChecked?: string;
  @Input() thumbShadow?: string;
  @Input() thumbSize?: string;
  @Input() width?: string;

  // Event outputs
  @Output('wa-change') changeEvent = new EventEmitter<Event>();
  @Output('wa-input') inputEvent = new EventEmitter<Event>();
  @Output('wa-focus') focusEvent = new EventEmitter<FocusEvent>();
  @Output('wa-blur') blurEvent = new EventEmitter<FocusEvent>();
  @Output() checkedChange = new EventEmitter<boolean>();

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
    this.setAttr('hint', this.hint);
    this.setAttr('size', this.size);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('required', this.required);

    // Set style attributes
    this.setCssVar('--background-color', this.backgroundColor);
    this.setCssVar('--background-color-checked', this.backgroundColorChecked);
    this.setCssVar('--border-color', this.borderColor);
    this.setCssVar('--border-color-checked', this.borderColorChecked);
    this.setCssVar('--border-style', this.borderStyle);
    this.setCssVar('--border-width', this.borderWidth);
    this.setCssVar('--box-shadow', this.boxShadow);
    this.setCssVar('--height', this.height);
    this.setCssVar('--thumb-color', this.thumbColor);
    this.setCssVar('--thumb-color-checked', this.thumbColorChecked);
    this.setCssVar('--thumb-shadow', this.thumbShadow);
    this.setCssVar('--thumb-size', this.thumbSize);
    this.setCssVar('--width', this.width);

    // Dialog attribute
    this.setAttr('data-dialog', this._dataDialog);

    // Set up event listeners
    const forwardInput = (event: Event) => {
      this.inputEvent.emit(event);
      const target = event.target as HTMLInputElement;
      this.onChange(target.checked);
      this.checkedChange.emit(target.checked);
      this.validatorChange?.();
    };
    this.renderer.listen(nativeEl, 'input', forwardInput);
    this.renderer.listen(nativeEl, 'wa-input', forwardInput);

    const forwardChange = (event: Event) => {
      this.changeEvent.emit(event);
      const target = event.target as HTMLInputElement;
      this.onChange(!!target.checked);
      this.checkedChange.emit(!!target.checked);
      this.validatorChange?.();
    };
    this.renderer.listen(nativeEl, 'change', forwardChange);
    this.renderer.listen(nativeEl, 'wa-change', forwardChange);

    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => {
      this.focusEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-focus', (event: CustomEvent) => {
      this.focusEvent.emit(event as unknown as FocusEvent);
    });

    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.blurEvent.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'wa-blur', (event: CustomEvent) => {
      this.blurEvent.emit(event as unknown as FocusEvent);
      this.onTouched();
    });
  }

  /**
   * Exposes the native element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
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
      this.renderer.setProperty(this.el.nativeElement, 'checked', !!value);
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
    const host: any = this.el?.nativeElement;
    if (!host) return null;
    if (host.disabled || host.hasAttribute?.('disabled')) return null;

    // We mirror the Checkbox semantics: if marked required, value must be truthy
    const isRequired = this.required === true || this.required === '' || this.required === 'true' || (host.hasAttribute && host.hasAttribute('required'));
    if (!isRequired) return null;
    const val = control?.value;
    return !!val ? null : { required: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validatorChange = fn;
  }
}
