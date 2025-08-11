import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, inject } from '@angular/core';

/**
 * WaButtonDirective
 *
 * Angular wrapper for the <wa-button> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported button attributes as @Input() properties
 * - Supports boolean attributes like pill, caret, disabled, loading
 * - Emits button events (blur, focus, waInvalid)
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for start, end, and default content
 * - Supports custom styling via CSS variables
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
@Directive({
  selector: 'wa-button',
  standalone: true
})
export class WaButtonDirective implements OnInit {
  // Appearance inputs
  @Input() variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'inherit' | string;
  @Input() appearance?: 'accent' | 'filled' | 'outlined' | 'plain' | string;
  @Input() size?: 'small' | 'medium' | 'large' | 'inherit' | string;

  // Boolean inputs
  @Input() pill?: boolean | string;
  @Input() withCaret?: boolean | string;
  @Input() disabled?: boolean | string;
  @Input() loading?: boolean | string;

  // Button type inputs
  @Input() type?: 'button' | 'submit' | 'reset' | string;
  @Input() name?: string;
  @Input() value?: string;

  // Link inputs (when button acts as an anchor)
  @Input() href?: string;
  @Input() target?: '_blank' | '_self' | '_parent' | '_top' | string;
  @Input() rel?: string;
  @Input() download?: string;

  // Form inputs
  @Input() form?: string;
  @Input() formAction?: string;
  @Input() formEnctype?: string;
  @Input() formMethod?: string;
  @Input() formNoValidate?: boolean | string;
  @Input() formTarget?: string;

  // Direct styling inputs
  @Input() color?: string;
  @Input() backgroundColor?: string;
  @Input() fontSize?: string;

  // Event outputs
  @Output() blurEvent = new EventEmitter<Event>();
  @Output() focusEvent = new EventEmitter<Event>();
  @Output() waInvalid = new EventEmitter<Event>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set standard attributes
    this.setAttr('variant', this.variant);
    this.setAttr('appearance', this.appearance);
    this.setAttr('size', this.size);
    this.setAttr('type', this.type);
    this.setAttr('name', this.name);
    this.setAttr('value', this.value);

    // Set link attributes
    this.setAttr('href', this.href);
    this.setAttr('target', this.target);
    this.setAttr('rel', this.rel);
    this.setAttr('download', this.download);

    // Set form attributes
    this.setAttr('form', this.form);
    this.setAttr('formaction', this.formAction);
    this.setAttr('formenctype', this.formEnctype);
    this.setAttr('formmethod', this.formMethod);
    this.setAttr('formtarget', this.formTarget);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('pill', this.pill);
    this.setBooleanAttr('with-caret', this.withCaret);
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('loading', this.loading);
    this.setBooleanAttr('formnovalidate', this.formNoValidate);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'blur', (event) => this.blurEvent.emit(event));
    this.renderer.listen(nativeEl, 'focus', (event) => this.focusEvent.emit(event));
    this.renderer.listen(nativeEl, 'waInvalid', (event) => this.waInvalid.emit(event));

    // Apply direct styling inputs
    if (this.color) nativeEl.style.color = this.color;
    if (this.backgroundColor) nativeEl.style.backgroundColor = this.backgroundColor;
    if (this.fontSize) nativeEl.style.fontSize = this.fontSize;
  }

  /**
   * Exposes the native button element for direct interaction
   */
  public get nativeButton(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Programmatically triggers click on the button
   */
  public click(): void {
    this.el.nativeElement.click();
  }

  /**
   * Sets focus on the button
   */
  public focus(): void {
    this.el.nativeElement.focus();
  }

  /**
   * Removes focus from the button
   */
  public blur(): void {
    this.el.nativeElement.blur();
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
}
