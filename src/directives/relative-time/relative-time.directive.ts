import { Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * WaRelativeTimeDirective
 *
 * Angular wrapper for the <wa-relative-time> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds date attribute via ngModel (ISO 8601 string or Date)
 * - Supports format, numeric, lang, and sync inputs
 * - Emits focusNative and blurNative events
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
@Directive({
  selector: 'wa-relative-time[ngModel]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaRelativeTimeDirective),
      multi: true
    }
  ]
})
export class WaRelativeTimeDirective implements OnInit, ControlValueAccessor {
  // Core input attributes
  @Input() format?: 'long' | 'short' | 'narrow' | string;
  @Input() numeric?: 'auto' | 'always' | string;
  @Input() lang?: string;
  @Input() sync?: boolean | string;

  // Style inputs
  @Input() display?: string;

  // Event outputs
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set string attributes
    this.setAttr('format', this.format);
    this.setAttr('numeric', this.numeric);
    this.setAttr('lang', this.lang);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('sync', this.sync);

    // Set style attributes
    this.setCssVar('--display', this.display);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'focusNative', (event: FocusEvent) => {
      this.focusEvent.emit(event);
    });
    this.renderer.listen(nativeEl, 'blurNative', (event: FocusEvent) => {
      this.blurEvent.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.onChange(target.value);
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
      // Convert Date objects to ISO string
      const dateValue = value instanceof Date ? value.toISOString() : value;
      this.setAttr('date', dateValue);
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
