import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnInit, OnDestroy, Output, Renderer2, inject, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**ple
 * WaColorPickerDirective
 *
 * Angular wrapper for the <wa-color-picker> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported color-picker attributes as @Input() properties
 * - Supports label, hint, value, format, opacity, and other customization
 * - Emits color-picker events (change, input, focus, blur, waInvalid)
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for label and hint content
 * - Supports custom styling via CSS variables
 * - Provides programmatic control through focus(), blur(), and other methods
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
    }
  ]
})
export class WaColorPickerDirective implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  // Color picker inputs
  @Input() label?: string;
  @Input() hint?: string;
  @Input() value?: string | null;
  @Input() format?: 'hex' | 'rgb' | 'hsl' | 'hsv' | string;
  @Input() withoutFormatToggle?: boolean | string;
  @Input() opacity?: boolean | string;
  @Input() uppercase?: boolean | string;
  @Input() size?: 'small' | 'medium' | 'large' | 'inherit' | string;
  @Input() disabled?: boolean | string;
  @Input() required?: boolean | string;
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
  @Output() change = new EventEmitter<Event>();
  @Output() input = new EventEmitter<Event>();
  @Output() focusEvent = new EventEmitter<Event>();
  @Output() blurEvent = new EventEmitter<Event>();
  @Output() waInvalid = new EventEmitter<Event>();
  @Output() waShow = new EventEmitter<CustomEvent>();
  @Output() waAfterShow = new EventEmitter<CustomEvent>();
  @Output() waHide = new EventEmitter<CustomEvent>();
  @Output() waAfterHide = new EventEmitter<CustomEvent>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor callbacks
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  // Prevent feedback loops when writing programmatically to the element
  private isWriting = false;
  private attrObserver?: MutationObserver;

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set standard attributes
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setAttr('value', this.value);
    this.setAttr('format', this.format);
    this.setAttr('name', this.name);
    this.setAttr('form', this.form);
    this.setAttr('size', this.size);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('without-format-toggle', this.withoutFormatToggle);
    this.setBooleanAttr('opacity', this.opacity);
    this.setBooleanAttr('uppercase', this.uppercase);
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('required', this.required);

    // Set swatches
    if (this.swatches) {
      if (Array.isArray(this.swatches)) {
        this.setAttr('swatches', this.swatches.join(';'));
      } else {
        this.setAttr('swatches', this.swatches);
      }
    }

    // Apply direct styles
    if (this.color) this.renderer.setStyle(nativeEl, 'color', this.color);
    if (this.backgroundColor) this.renderer.setStyle(nativeEl, 'background-color', this.backgroundColor);
    if (this.fontSize) this.renderer.setStyle(nativeEl, 'font-size', this.fontSize);

    // Set CSS custom properties
    if (this.swatchSize) this.setCssVar('--swatch-size', this.swatchSize);
    if (this.swatchSpacing) this.setCssVar('--swatch-spacing', this.swatchSpacing);
    if (this.borderRadius) this.setCssVar('--border-radius', this.borderRadius);
    if (this.dropdownWidth) this.setCssVar('--dropdown-width', this.dropdownWidth);
    if (this.dropdownHeight) this.setCssVar('--dropdown-height', this.dropdownHeight);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'change', (event: Event) => {
      this.change.emit(event);
      // Sync Angular model to current value of the WC
      const el: any = this.el.nativeElement;
      // Prefer attribute if present; fallback to property
      let current = el?.getAttribute?.('value');
      if (current == null) {
        current = el?.value ?? null;
      }
      this.onChange(current);
    });
    this.renderer.listen(nativeEl, 'input', (event: Event) => {
      this.input.emit(event);
      // Prefer reading attribute first (WC often reflects to attr), then property
      const el: any = this.el.nativeElement;
      let current = el?.getAttribute?.('value');
      if (current == null) {
        current = el?.value ?? null;
      }
      this.onChange(current);
    });
    this.renderer.listen(nativeEl, 'focus', (event: Event) => this.focusEvent.emit(event));
    this.renderer.listen(nativeEl, 'blur', (event: Event) => {
      this.blurEvent.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'waInvalid', (event: Event) => this.waInvalid.emit(event));
    this.renderer.listen(nativeEl, 'wa-invalid', (event: Event) => this.waInvalid.emit(event));
    this.renderer.listen(nativeEl, 'wa-show', (event: CustomEvent) => this.waShow.emit(event));
    this.renderer.listen(nativeEl, 'wa-after-show', (event: CustomEvent) => this.waAfterShow.emit(event));
    this.renderer.listen(nativeEl, 'wa-hide', (event: CustomEvent) => this.waHide.emit(event));
    this.renderer.listen(nativeEl, 'wa-after-hide', (event: CustomEvent) => this.waAfterHide.emit(event));

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
            this.onChange(current);
          }
        }
      });
      this.attrObserver.observe(nativeEl, { attributes: true, attributeFilter: ['value'] });
    } catch {}
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
   * Sets focus on the color-picker
   */
  public focus(): void {
    if (this.el.nativeElement.focus) {
      this.el.nativeElement.focus();
    }
  }

  /**
   * Removes focus from the color-picker
   */
  public blur(): void {
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
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
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
      Promise.resolve().then(() => (this.isWriting = false));
    }
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
}
