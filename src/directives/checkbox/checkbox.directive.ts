import { Directive, ElementRef, EventEmitter, Input, OnInit, OnDestroy, Output, Renderer2, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
 * - Emits checkbox events (change, input, blur, focus, waInvalid); also re-emits checkedChange for compatibility
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
    }
  ]
})
export class WaCheckboxDirective implements OnInit, OnDestroy, ControlValueAccessor {
  // Dialog integration: support both kebab-case and camelCase bindings
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
  @Output() input = new EventEmitter<Event>();
  @Output() blurEvent = new EventEmitter<Event>();
  @Output() focusEvent = new EventEmitter<Event>();
  @Output() change = new EventEmitter<Event>();
  @Output() waInvalid = new EventEmitter<Event>();

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

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

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

    // Set up event listeners
    this.renderer.listen(nativeEl, 'checkedChange', (event: CustomEvent<boolean>) => {
      this.checkedChange.emit(event.detail);
      this.onChange(event.detail);
    });
    this.renderer.listen(nativeEl, 'input', (event) => {
      this.input.emit(event);
      // Update model on input to reflect current checked state
      const currentChecked = (this.el.nativeElement as any).checked === true || this.el.nativeElement.hasAttribute('checked');
      this.onChange(!!currentChecked);
    });
    this.renderer.listen(nativeEl, 'blur', (event) => {
      this.blurEvent.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'focus', (event) => this.focusEvent.emit(event));
    this.renderer.listen(nativeEl, 'change', (event) => {
      this.change.emit(event);
      // Update model on change to reflect current checked state
      const currentChecked = (this.el.nativeElement as any).checked === true || this.el.nativeElement.hasAttribute('checked');
      this.onChange(!!currentChecked);
    });
    this.renderer.listen(nativeEl, 'wa-invalid', (event) => this.waInvalid.emit(event));

    // Fallback: ensure model sync on click toggle
    this.renderer.listen(nativeEl, 'click', () => {
      const currentChecked = (this.el.nativeElement as any).checked === true || this.el.nativeElement.hasAttribute('checked');
      this.onChange(!!currentChecked);
    });

    // Observe 'checked' attribute changes to sync when WC toggles via attributes
    try {
      this.attrObserver = new MutationObserver((mutations) => {
        if (this.isWriting) { return; }
        for (const m of mutations) {
          if (m.type === 'attributes' && m.attributeName === 'checked') {
            const currentChecked = (this.el.nativeElement as any).checked === true || this.el.nativeElement.hasAttribute('checked');
            this.onChange(!!currentChecked);
          }
        }
      });
      this.attrObserver.observe(nativeEl, { attributes: true, attributeFilter: ['checked'] });
    } catch {}
  }

  ngOnDestroy(): void {
    try {
      this.attrObserver?.disconnect();
    } catch {}
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
   * Sets focus on the checkbox
   */
  public focus(): void {
    this.el.nativeElement.focus();
  }

  /**
   * Removes focus from the checkbox
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
