import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * WaSelectWrapperComponent
 *
 * Angular wrapper for the <wa-select> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported select attributes as @Input() properties
 * - Emits events for input, change, focus, blur, etc.
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for wa-option elements
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
@Component({
  selector: 'wa-select-wrapper',
  standalone: true,
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaSelectWrapperComponent),
      multi: true
    }
  ]
})
export class WaSelectWrapperComponent implements OnInit, ControlValueAccessor {
  // Core input attributes
  @Input() value?: string | string[];
  @Input() label?: string;
  @Input() hint?: string;
  @Input() placeholder?: string;
  @Input() appearance?: 'outlined' | 'filled' | string;
  @Input() pill?: boolean | string;
  @Input() clearable?: boolean | string;
  @Input() disabled?: boolean | string;
  @Input() multiple?: boolean | string;
  @Input() size?: 'small' | 'medium' | 'large' | string;
  @Input() placement?: 'top' | 'bottom' | string;
  @Input() required?: boolean | string;
  @Input() maxOptionsVisible?: number | string;
  @Input() form?: string;

  // Style inputs
  @Input() backgroundColor?: string;
  @Input() borderColor?: string;
  @Input() borderWidth?: string;
  @Input() boxShadow?: string;
  @Input() backgroundColorCurrent?: string;
  @Input() backgroundColorHover?: string;
  @Input() textColorCurrent?: string;
  @Input() textColorHover?: string;

  // Event outputs
  @Output() inputEvent = new EventEmitter<Event>();
  @Output() changeEvent = new EventEmitter<Event>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() clearEvent = new EventEmitter<CustomEvent>();
  @Output() showEvent = new EventEmitter<CustomEvent>();
  @Output() afterShowEvent = new EventEmitter<CustomEvent>();
  @Output() hideEvent = new EventEmitter<CustomEvent>();
  @Output() afterHideEvent = new EventEmitter<CustomEvent>();
  @Output() invalidEvent = new EventEmitter<CustomEvent>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set string attributes
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setAttr('placeholder', this.placeholder);
    this.setAttr('appearance', this.appearance);
    this.setAttr('size', this.size);
    this.setAttr('placement', this.placement);
    this.setAttr('form', this.form);
    this.setNumericAttr('max-options-visible', this.maxOptionsVisible);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('pill', this.pill);
    this.setBooleanAttr('clearable', this.clearable);
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('multiple', this.multiple);
    this.setBooleanAttr('required', this.required);

    // Set style attributes
    this.setCssVar('--background-color', this.backgroundColor);
    this.setCssVar('--border-color', this.borderColor);
    this.setCssVar('--border-width', this.borderWidth);
    this.setCssVar('--box-shadow', this.boxShadow);
    this.setCssVar('--background-color-current', this.backgroundColorCurrent);
    this.setCssVar('--background-color-hover', this.backgroundColorHover);
    this.setCssVar('--text-color-current', this.textColorCurrent);
    this.setCssVar('--text-color-hover', this.textColorHover);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'input', (event: Event) => {
      this.inputEvent.emit(event);
      const target = event.target as HTMLSelectElement;
      let newValue: string | string[] = target.value;

      // Handle multiple selection
      if (this.multiple === true || this.multiple === 'true' || this.multiple === '') {
        newValue = target.value.split(' ').filter(v => v !== '');
      }

      this.onChange(newValue);
    });
    this.renderer.listen(nativeEl, 'change', (event: Event) => {
      this.changeEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => {
      this.focusEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.blurEvent.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'wa-clear', (event: CustomEvent) => {
      this.clearEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-show', (event: CustomEvent) => {
      this.showEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-after-show', (event: CustomEvent) => {
      this.afterShowEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-hide', (event: CustomEvent) => {
      this.hideEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-after-hide', (event: CustomEvent) => {
      this.afterHideEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-invalid', (event: CustomEvent) => {
      this.invalidEvent.emit(event);
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

      // Handle multiple selection
      if (this.multiple === true || this.multiple === 'true' || this.multiple === '') {
        if (Array.isArray(value)) {
          this.setAttr('value', value.join(' '));
        } else {
          this.setAttr('value', value);
        }
      } else {
        this.setAttr('value', value);
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
    this.setBooleanAttr('disabled', isDisabled);
  }
}

/**
 * WaOptionDirective
 *
 * Angular wrapper for the <wa-option> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds value, label, and disabled attributes
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content
 * - Supports custom styling via CSS variables
 */
@Component({
  selector: 'wa-option',
  standalone: true,
  template: '<ng-content></ng-content>'
})
export class WaOptionComponent implements OnInit {
  @Input() value?: string;
  @Input() label?: string;
  @Input() disabled?: boolean | string;

  // Style inputs
  @Input() backgroundColorCurrent?: string;
  @Input() backgroundColorHover?: string;
  @Input() textColorCurrent?: string;
  @Input() textColorHover?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    // Set string attributes
    this.setAttr('value', this.value);
    this.setAttr('label', this.label);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('disabled', this.disabled);

    // Set style attributes
    this.setCssVar('--background-color-current', this.backgroundColorCurrent);
    this.setCssVar('--background-color-hover', this.backgroundColorHover);
    this.setCssVar('--text-color-current', this.textColorCurrent);
    this.setCssVar('--text-color-hover', this.textColorHover);
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
}
