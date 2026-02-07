import { Directive, ElementRef, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, OnDestroy, Output, Renderer2, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { SizeToken } from '../../types/tokens';

/**
 * WaCheckboxDirective
 *
 * Angular wrapper for the <wa-checkbox> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported checkbox attributes as @Input() properties
 * - Supports boolean attributes like checked, disabled, required, indeterminate
 * - Emits checkbox events (change, input, blurNative, focusNative, waInvalid); also re-emits checkedChange for compatibility
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for label and hint content
 * - Supports custom styling via CSS variables
 * - Provides accessibility support through aria attributes
 * - Implements ControlValueAccessor for ngModel support
 */
@Directive({
  selector: 'wa-checkbox',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaCheckboxDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WaCheckboxDirective),
      multi: true
    }
  ]
})
export class WaCheckboxDirective implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, Validator {
  // Dialog integration
  private _dataDialog: string | null | undefined;
  @Input('data-dialog') set dataDialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input('dialog') set dialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input() set dataDialog(val: string | null | undefined) { this._dataDialog = val ?? null; }
  // Value inputs
  @Input() checked?: boolean | string;
  @Input() value?: string | null;
  @Input() name?: string;
  @Input() form?: string;
  @Input() hint?: string;

  // State inputs
  @Input() disabled?: boolean | string;
  @Input() required?: boolean | string;
  @Input() indeterminate?: boolean | string;

  // Appearance inputs
  @Input() size?: SizeToken | string;

  // CSS custom property inputs
  @Input() backgroundColor?: string;
  @Input() backgroundColorChecked?: string;
  @Input() borderColor?: string;
  @Input() borderColorChecked?: string;
  @Input() borderRadius?: string;
  @Input() borderStyle?: string;
  @Input() borderWidth?: string;
  @Input() boxShadow?: string;
  @Input() checkedIconColor?: string;
  @Input() checkedIconScale?: string;
  @Input() toggleSize?: string;

  // Event outputs
  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() waInput = new EventEmitter<Event>();
  @Output('wa-input') waInputHyphen = this.waInput;
  @Output() waBlur = new EventEmitter<Event>();
  @Output('wa-blur') waBlurHyphen = this.waBlur;
  @Output() waFocus = new EventEmitter<Event>();
  @Output('wa-focus') waFocusHyphen = this.waFocus;
  @Output() waChange = new EventEmitter<Event>();
  @Output('wa-change') waChangeHyphen = this.waChange;
  @Output() waInvalid = new EventEmitter<Event>();
  @Output('wa-invalid') waInvalidHyphen = this.waInvalid;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  /**
   * Internal flag to suppress model updates when we are writing programmatically
   * to the underlying element (prevents feedback loops with MutationObserver/events).
   */
  private isWriting = false;
  private attrObserver?: MutationObserver;
  private validatorChange?: () => void;

  /**
   * Safely determine the current checked state by preferring the property and
   * falling back to attributes some environments/components use.
   */
  private getCurrentChecked(): boolean {
    const el = this.el.nativeElement as HTMLElement & { checked?: boolean };
    // Prefer native/WebComponent property
    if (typeof (el as any).checked === 'boolean') {
      return !!(el as any).checked;
    }
    // Fallbacks: boolean attribute, aria-checked, value="true"
    if (el.hasAttribute('checked')) {
      return true;
    }
    const ariaChecked = el.getAttribute('aria-checked');
    if (ariaChecked === 'true') {
      return true;
    }
    const valueAttr = el.getAttribute('value');
    if (valueAttr != null && valueAttr.toLowerCase() === 'true') {
      return true;
    }
    return false;
  }

  /**
   * Safely derive the checked value from a change/input CustomEvent if available.
   */
  private getCheckedFromEvent(event: any): boolean | undefined {
    // Direct boolean detail
    if (event && typeof event.detail === 'boolean') {
      return !!event.detail;
    }
    // Detail object with checked property
    if (event && event.detail && typeof event.detail.checked === 'boolean') {
      return !!event.detail.checked;
    }
    return undefined;
  }

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    this.applyInputs();

    // Set up event listeners
    this.renderer.listen(nativeEl, 'checkedChange', (event: CustomEvent<boolean>) => {
      this.checkedChange.emit(event.detail);
      this.onChange(event.detail);
    });

    // Standard DOM events
    this.renderer.listen(nativeEl, 'input', (event) => {
      this.waInput.emit(event);
      // Update model on input to reflect current checked state
      const currentChecked = this.getCurrentChecked();
      this.onChange(currentChecked);
      this.checkedChange.emit(currentChecked);
      this.validatorChange?.();
    });
    this.renderer.listen(nativeEl, 'change', (event) => {
      this.waChange.emit(event);
      // Update model on change to reflect current checked state
      const currentChecked = this.getCurrentChecked();
      this.onChange(currentChecked);
      this.checkedChange.emit(currentChecked);
      this.validatorChange?.();
    });

    // WebAwesome custom events (some environments emit wa-input/wa-change)
    this.renderer.listen(nativeEl, 'wa-input', (event: CustomEvent) => {
      this.waInput.emit(event as unknown as Event);
      const currentChecked = this.getCurrentChecked();
      this.onChange(currentChecked);
      this.checkedChange.emit(currentChecked);
      this.validatorChange?.();
    });
    this.renderer.listen(nativeEl, 'wa-change', (event: CustomEvent) => {
      this.waChange.emit(event as unknown as Event);
      const currentChecked = this.getCurrentChecked();
      this.onChange(currentChecked);
      this.checkedChange.emit(currentChecked);
      this.validatorChange?.();
    });

    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => {
      this.waFocus.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-focus', (event: CustomEvent) => {
      this.waFocus.emit(event as unknown as FocusEvent);
    });

    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.waBlur.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'wa-blur', (event: CustomEvent) => {
      this.waBlur.emit(event as unknown as FocusEvent);
      this.onTouched();
    });

    this.renderer.listen(nativeEl, 'wa-invalid', (event) => {
      this.waInvalid.emit(event);
      this.validatorChange?.();
    });

    // Fallback: ensure model sync on click toggle
    this.renderer.listen(nativeEl, 'click', () => {
      const currentChecked = this.getCurrentChecked();
      this.onChange(currentChecked);
      this.checkedChange.emit(currentChecked);
      this.validatorChange?.();
    });

    // Observe 'checked' attribute changes to sync when WC toggles via attributes
    try {
      this.attrObserver = new MutationObserver((mutations) => {
        if (this.isWriting) { return; }
        for (const m of mutations) {
          if (m.type === 'attributes' && m.attributeName === 'checked') {
            const currentChecked = (this.el.nativeElement as any).checked === true || this.el.nativeElement.hasAttribute('checked');
            this.onChange(!!currentChecked);
            this.checkedChange.emit(!!currentChecked);
            this.validatorChange?.();
          }
        }
      });
      this.attrObserver.observe(nativeEl, { attributes: true, attributeFilter: ['checked'] });
    } catch {}
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs() {
    // Set standard attributes
    this.setAttr('value', this.value);
    this.setAttr('name', this.name);
    this.setAttr('form', this.form);
    this.setAttr('hint', this.hint);
    this.setAttr('size', this.size);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('checked', this.checked);
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('required', this.required);
    this.setBooleanAttr('indeterminate', this.indeterminate);

    // Set CSS custom properties
    this.setCssVar('--background-color', this.backgroundColor);
    this.setCssVar('--background-color-checked', this.backgroundColorChecked);
    this.setCssVar('--border-color', this.borderColor);
    this.setCssVar('--border-color-checked', this.borderColorChecked);
    this.setCssVar('--border-radius', this.borderRadius);
    this.setCssVar('--border-style', this.borderStyle);
    this.setCssVar('--border-width', this.borderWidth);
    this.setCssVar('--box-shadow', this.boxShadow);
    this.setCssVar('--checked-icon-color', this.checkedIconColor);
    this.setCssVar('--checked-icon-scale', this.checkedIconScale);
    this.setCssVar('--toggle-size', this.toggleSize);

    // Dialog attribute
    this.setAttr('data-dialog', this._dataDialog);
  }

  ngOnDestroy(): void {
    try {
      this.attrObserver?.disconnect();
    } catch {}
  }

  // Validator implementation to participate in Angular forms validity (e.g., required)
  validate(control: AbstractControl): ValidationErrors | null {
    const host: any = this.el?.nativeElement;
    if (!host) return null;
    // Disabled controls are considered valid
    if (host.disabled || host.hasAttribute?.('disabled')) return null;

    const isRequired = this.required === true || this.required === '' || this.required === 'true';
    if (!isRequired) return null;

    // For a single checkbox, validity means it must be checked when required
    const value = control?.value;
    const isChecked = !!value;
    return isChecked ? null : { required: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validatorChange = fn;
  }

  /**
   * Exposes the native checkbox element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Programmatically clicks the checkbox
   */
  public click(): void {
    this.el.nativeElement.click();
  }

  /**
   * Sets focusNative on the checkbox
   */
  public focus(): void {
    this.el.nativeElement.focus();
  }

  /**
   * Removes focusNative from the checkbox
   */
  public blur(): void {
    this.el.nativeElement.blur();
  }

  /**
   * Sets custom validity message for the checkbox
   */
  public setCustomValidity(message: string): void {
    if (typeof this.el.nativeElement.setCustomValidity === 'function') {
      this.el.nativeElement.setCustomValidity(message);
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
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    }
  }

  /**
   * Toggles a boolean attribute based on a boolean value (adds when true, removes when false)
   */
  private toggleBooleanAttr(name: string, isOn: boolean | null | undefined) {
    if (isOn) {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
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

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value !== undefined) {
      const isChecked = !!value;
      this.isWriting = true;
      try {
        this.renderer.setProperty(this.el.nativeElement, 'checked', isChecked);
        // Ensure attribute reflects current state for Web Components relying on attributes
        this.toggleBooleanAttr('checked', isChecked);
      } finally {
        // Use a microtask to allow MutationObserver to settle without emitting back
        Promise.resolve().then(() => (this.isWriting = false));
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Reflect disabled in both property and attribute space
    this.renderer.setProperty(this.el.nativeElement, 'disabled', !!isDisabled);
    this.toggleBooleanAttr('disabled', !!isDisabled);
  }
}
