import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnInit, OnDestroy, Output, Renderer2, inject, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { SizeToken } from '../../types/tokens';

/**ple
 * WaColorPickerDirective
 *
 * Angular wrapper for the <wa-color-picker> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported color-picker attributes as @Input() properties
 * - Supports label, hint, value, format, opacity, and other customization
 * - Emits color-picker events (change, input, focusNative, blurNative, waInvalid)
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for label and hint content
 * - Supports custom styling via CSS variables
 * - Provides programmatic control through focusNative(), blurNative(), and other methods
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
@Directive({
  selector: 'wa-color-picker',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaColorPickerDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WaColorPickerDirective),
      multi: true
    }
  ]
})
export class WaColorPickerDirective implements OnInit, AfterViewInit, OnDestroy, OnChanges, ControlValueAccessor, Validator {
  // Color picker inputs
  @Input() label?: string;
  @Input() hint?: string;
  @Input() value?: string | null;
  @Input() format?: 'hex' | 'rgb' | 'hsl' | 'hsv' | string;
  @Input() withoutFormatToggle?: boolean | string;
  @Input() opacity?: boolean | string;
  @Input() uppercase?: boolean | string;
  @Input() size?: SizeToken | string;
  @Input() disabled?: boolean | string;
  @Input() required?: boolean | string;
  // Angular validation-related attributes
  @Input() pattern?: string | RegExp | null;
  @Input() minlength?: number | string | null;
  @Input() maxlength?: number | string | null;
  @Input() name?: string | null;
  @Input() form?: string | null;
  @Input() swatches?: string | string[];

  // Direct styling inputs (apply to host element styles)
  @Input() color?: string;
  @Input() backgroundColor?: string;
  @Input() fontSize?: string;

  // CSS custom property inputs
  @Input() swatchSize?: string;
  @Input() swatchSpacing?: string;
  @Input() borderRadius?: string;
  @Input() dropdownWidth?: string;
  @Input() dropdownHeight?: string;

  // Event outputs
  // change and input map 1:1 to native events
  @Output() waChange = new EventEmitter<Event>();
  @Output('wa-change') waChangeHyphen = this.waChange;
  @Output() waInput = new EventEmitter<Event>();
  @Output('wa-input') waInputHyphen = this.waInput;
  // Backwards-compatible outputs plus aliases that match native event names
  @Output() waFocus = new EventEmitter<Event>();
  @Output('wa-focus') waFocusHyphen = this.waFocus;
  @Output() waBlur = new EventEmitter<Event>();
  @Output('wa-blur') waBlurHyphen = this.waBlur;
  // Web Awesome lifecycle/validation events: keep camelCase for BC and add hyphenated aliases
  @Output() waInvalid = new EventEmitter<Event>();
  @Output('wa-invalid') waInvalidHyphen = this.waInvalid;
  @Output() waShow = new EventEmitter<CustomEvent>();
  @Output('wa-show') waShowHyphen = this.waShow;
  @Output() waAfterShow = new EventEmitter<CustomEvent>();
  @Output('wa-after-show') waAfterShowHyphen = this.waAfterShow;
  @Output() waHide = new EventEmitter<CustomEvent>();
  @Output('wa-hide') waHideHyphen = this.waHide;
  @Output() waAfterHide = new EventEmitter<CustomEvent>();
  @Output('wa-after-hide') waAfterHideHyphen = this.waAfterHide;
  @Output() valueChange = new EventEmitter<any>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor callbacks
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  // Prevent feedback loops when writing programmatically to the element
  private isWriting = false;
  private attrObserver?: MutationObserver;
  private validatorChange?: () => void;
  /**
   * Extracts the most up-to-date value from an event or from the element.
   * Prefers CustomEvent.detail when available as many Web Components include
   * the new value there before attributes/properties reflect.
   */
  private readCurrentValueFromEvent(evt?: Event): any {
    // 1) If CustomEvent with detail, prefer it
    const asCustom = evt as CustomEvent<any> | undefined;
    if (asCustom && asCustom.detail !== undefined) {
      const d = asCustom.detail;
      if (d != null) {
        // Some components emit { value: string } while others emit the value directly
        if (typeof d === 'object' && 'value' in d) {
          return (d as any).value;
        }
        return d;
      }
    }

    // 2) Fallback to property first, then attribute
    const el: any = this.el.nativeElement;
    let current = el?.value;
    if (current == null || current === '') {
      current = el?.getAttribute?.('value') ?? null;
    }
    return current;
  }

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Apply all inputs on init
    this.applyInputs();

    // Set up event listeners
    this.renderer.listen(nativeEl, 'change', (event: Event) => {
      this.waChange.emit(event);
      const current = this.readCurrentValueFromEvent(event);
      this.value = current;
      this.onChange(current);
      this.valueChange.emit(current);
    });
    // Also listen for custom web component events
    this.renderer.listen(nativeEl, 'wa-change', (event: CustomEvent) => {
      this.waChange.emit(event as any);
      const current = this.readCurrentValueFromEvent(event);
      this.value = current;
      this.onChange(current);
      this.valueChange.emit(current);
    });
    this.renderer.listen(nativeEl, 'input', (event: Event) => {
      this.waInput.emit(event);
      const current = this.readCurrentValueFromEvent(event);
      this.value = current;
      this.onChange(current);
      this.valueChange.emit(current);
    });
    this.renderer.listen(nativeEl, 'wa-input', (event: CustomEvent) => {
      this.waInput.emit(event as any);
      const current = this.readCurrentValueFromEvent(event);
      this.value = current;
      this.onChange(current);
      this.valueChange.emit(current);
    });
    this.renderer.listen(nativeEl, 'focus', (event: Event) => {
      this.waFocus.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-focus', (event: CustomEvent) => {
      this.waFocus.emit(event as any);
    });
    this.renderer.listen(nativeEl, 'blur', (event: Event) => {
      this.waBlur.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'wa-blur', (event: CustomEvent) => {
      this.waBlur.emit(event as any);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'waInvalid', (event: Event) => {
      this.waInvalid.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-invalid', (event: Event) => {
      this.waInvalid.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-show', (event: CustomEvent) => {
      this.waShow.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-after-show', (event: CustomEvent) => {
      this.waAfterShow.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-hide', (event: CustomEvent) => {
      this.waHide.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-after-hide', (event: CustomEvent) => {
      this.waAfterHide.emit(event);
    });

    // Observe 'value' attribute changes to keep model in sync when WC reflects updates via attributes
    try {
      this.attrObserver = new MutationObserver((mutations) => {
        if (this.isWriting) { return; }
        for (const m of mutations) {
          if (m.type === 'attributes' && m.attributeName === 'value') {
            const el: any = this.el.nativeElement;
            let current = el?.getAttribute?.('value');
            if (current == null) {
              current = el?.value ?? null;
            }
            this.value = current;
            this.onChange(current);
            this.valueChange.emit(current);
          }
        }
      });
      this.attrObserver.observe(nativeEl, { attributes: true, attributeFilter: ['value'] });
    } catch {}
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reflect changed inputs to the underlying element to keep it in sync with Angular bindings
    // This is important for [(ngModel)] + dynamic [format], etc.
    this.applyInputs(changes);

    // If any validator-related inputs changed, notify Angular forms
    if (changes['required'] || changes['pattern'] || changes['minlength'] || changes['maxlength'] || changes['disabled']) {
      this.validatorChange?.();
    }
  }

  ngAfterViewInit() {
    // Any post-initialization logic can go here
  }

  ngOnDestroy(): void {
    try {
      this.attrObserver?.disconnect();
    } catch {}
  }

  /**
   * Exposes the native color-picker element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Sets focusNative on the color-picker
   */
  public focusNative(): void {
    if (this.el.nativeElement.focus) {
      this.el.nativeElement.focus();
    }
  }

  /**
   * Removes focusNative from the color-picker
   */
  public blurNative(): void {
    if (this.el.nativeElement.blur) {
      this.el.nativeElement.blur();
    }
  }

  /**
   * Returns the color value in the specified format
   */
  public getFormattedValue(format: 'hex' | 'rgb' | 'hsl' | 'hsv'): string {
    if (this.el.nativeElement.getFormattedValue) {
      return this.el.nativeElement.getFormattedValue(format);
    }
    return '';
  }

  /**
   * Triggers form validation UI
   */
  public reportValidity(): boolean {
    if (this.el.nativeElement.reportValidity) {
      return this.el.nativeElement.reportValidity();
    }
    return true;
  }

  /**
   * Converts HSV to hex string
   */
  public getHexString(h: number, s: number, v: number, a?: number): string {
    if (this.el.nativeElement.getHexString) {
      return this.el.nativeElement.getHexString(h, s, v, a);
    }
    return '';
  }

  /**
   * Sets an attribute on the native element if the value is not null or undefined
   */
  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    } else {
      // remove when null/undefined to reflect cleared state
      try { this.el.nativeElement.removeAttribute(name); } catch {}
    }
  }

  /**
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    const truthy = value === true || value === 'true' || value === '';
    if (truthy) {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      try { this.el.nativeElement.removeAttribute(name); } catch {}
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
    if (this.value === value) {
      return;
    }
    this.value = value;
    this.isWriting = true;
    try {
      const el: any = this.el.nativeElement;
      // Reflect to property first if available
      this.renderer.setProperty(el, 'value', value ?? '');
      if (value == null || value === '') {
        // remove attribute if null/empty to clear
        this.renderer.removeAttribute(el, 'value');
      } else {
        this.setAttr('value', String(value));
      }
    } finally {
      // Use a slightly longer delay or ensure it happens after microtasks to avoid immediate feedback
      setTimeout(() => (this.isWriting = false), 0);
    }
  }

  /**
   * Applies current @Input values to the underlying <wa-color-picker> element.
   * When changes are provided, only updates those that changed.
   */
  private applyInputs(changes?: SimpleChanges): void {
    const el = this.el.nativeElement as HTMLElement & { style: CSSStyleDeclaration };

    const set = (name: string, val: any) => this.setAttr(name, val as any);
    const setBool = (name: string, val: any) => this.setBooleanAttr(name, val as any);

    const should = (prop: string) => !changes || !!changes[prop];

    // Standard attributes
    if (should('label')) set('label', this.label);
    if (should('hint')) set('hint', this.hint);
    // Note: value is primarily driven by CVA; only reflect if [value] is used explicitly
    if (should('value')) set('value', this.value as any);
    if (should('format')) set('format', this.format as any);
    if (should('name')) set('name', this.name as any);
    if (should('form')) set('form', this.form as any);
    if (should('size')) set('size', this.size as any);
    // Validation attributes
    if (should('pattern')) {
      let p: any = this.pattern as any;
      if (p instanceof RegExp) {
        p = p.source;
      }
      set('pattern', p);
    }
    if (should('minlength')) set('minlength', this.minlength as any);
    if (should('maxlength')) set('maxlength', this.maxlength as any);

    // Boolean attributes
    if (should('withoutFormatToggle')) setBool('without-format-toggle', this.withoutFormatToggle);
    if (should('opacity')) setBool('opacity', this.opacity);
    if (should('uppercase')) setBool('uppercase', this.uppercase);
    if (should('disabled')) setBool('disabled', this.disabled);
    if (should('required')) setBool('required', this.required);

    // Swatches
    if (should('swatches')) {
      if (this.swatches) {
        const v = Array.isArray(this.swatches) ? this.swatches.join(';') : this.swatches;
        set('swatches', v as any);
      } else {
        this.setAttr('swatches', null as any);
      }
    }

    // Direct styles
    if (should('color')) this.renderer.setStyle(el, 'color', this.color ?? null);
    if (should('backgroundColor')) this.renderer.setStyle(el, 'background-color', this.backgroundColor ?? null);
    if (should('fontSize')) this.renderer.setStyle(el, 'font-size', this.fontSize ?? null);

    // CSS vars
    if (should('swatchSize')) this.setCssVar('--swatch-size', this.swatchSize);
    if (should('swatchSpacing')) this.setCssVar('--swatch-spacing', this.swatchSpacing);
    if (should('borderRadius')) this.setCssVar('--border-radius', this.borderRadius);
    if (should('dropdownWidth')) this.setCssVar('--dropdown-width', this.dropdownWidth);
    if (should('dropdownHeight')) this.setCssVar('--dropdown-height', this.dropdownHeight);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.setBooleanAttr('disabled', '');
    } else {
      this.el.nativeElement.removeAttribute('disabled');
    }
  }

  // Validator implementation
  validate(control: { value: any }): ValidationErrors | null {
    // If control disabled, do not validate
    const disabled = this.disabled === true || this.disabled === 'true' || this.disabled === '';
    if (disabled) return null;

    const value: any = control?.value;

    // Required
    const isRequired = this.required === true || this.required === 'true' || this.required === '';
    if (isRequired && (value == null || value === '')) {
      return { required: true };
    }

    if (value == null) return null;
    const str = String(value);

    // minlength
    if (this.minlength != null && this.minlength !== '') {
      const req = Number(this.minlength);
      const actual = str.length;
      if (!isNaN(req) && actual < req) {
        return { minlength: { requiredLength: req, actualLength: actual } } as any;
      }
    }

    // maxlength
    if (this.maxlength != null && this.maxlength !== '') {
      const req = Number(this.maxlength);
      const actual = str.length;
      if (!isNaN(req) && actual > req) {
        return { maxlength: { requiredLength: req, actualLength: actual } } as any;
      }
    }

    // pattern
    if (this.pattern != null && this.pattern !== '') {
      let regex: RegExp | null = null;
      if (this.pattern instanceof RegExp) {
        regex = this.pattern;
      } else {
        const pat = String(this.pattern);
        try {
          regex = new RegExp('^' + pat + '$');
        } catch {
          // invalid pattern: consider as no-op
          regex = null;
        }
      }
      if (regex && !regex.test(str)) {
        return { pattern: { requiredPattern: regex.toString(), actualValue: str } } as any;
      }
    }

    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validatorChange = fn;
  }
}
