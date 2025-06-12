import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, inject } from '@angular/core';

/**
 * WaIconButtonDirective
 *
 * Angular wrapper for the <wa-icon-button> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported icon-button attributes as @Input() properties
 * - Supports icon attributes (name, family, variant, library, src)
 * - Supports link attributes (href, target, download)
 * - Supports boolean attributes like disabled
 * - Emits button events (blur, focus)
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 * - Provides accessibility support through label attribute
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
@Directive({
  selector: 'wa-icon-button',
  standalone: true
})
export class WaIconButtonDirective implements OnInit {
  // Icon inputs
  @Input() name?: string;
  @Input() family?: string;
  @Input() variant?: string;
  @Input() library?: string;
  @Input() src?: string;
  @Input() label?: string;

  // Link inputs (when button acts as an anchor)
  @Input() href?: string;
  @Input() target?: '_blank' | '_self' | '_parent' | '_top' | string;
  @Input() download?: string;

  // Boolean inputs
  @Input() disabled?: boolean | string;

  // Styling inputs
  @Input() color?: string;
  @Input() backgroundColor?: string;
  @Input() fontSize?: string;

  // Event outputs
  @Output() blurEvent = new EventEmitter<Event>();
  @Output() focusEvent = new EventEmitter<Event>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);


  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set icon attributes
    this.setAttr('name', this.name);
    this.setAttr('family', this.family);
    this.setAttr('variant', this.variant);
    this.setAttr('library', this.library);
    this.setAttr('src', this.src);
    this.setAttr('label', this.label);

    // Set link attributes
    this.setAttr('href', this.href);
    this.setAttr('target', this.target);
    this.setAttr('download', this.download);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('disabled', this.disabled);

    // Set style attributes
    this.setCssStyle('color', this.color);
    this.setCssStyle('background-color', this.backgroundColor);
    this.setCssStyle('font-size', this.fontSize);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'blur', (event) => this.blurEvent.emit(event));
    this.renderer.listen(nativeEl, 'focus', (event) => this.focusEvent.emit(event));
  }

  /**
   * Exposes the native icon-button element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Programmatically triggers click on the icon-button
   */
  public click(): void {
    this.el.nativeElement.click();
  }

  /**
   * Sets focus on the icon-button
   */
  public focus(options?: FocusOptions): void {
    this.el.nativeElement.focus(options);
  }

  /**
   * Removes focus from the icon-button
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

    /**
   * Sets a CSS custom property on the native element if the value is truthy
   */
  private setCssStyle(name: string, value: string | null | undefined) {
    if (value) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    }
  }

  /**
   * Sets a CSS custom property on the native element if the value is truthy
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
    }
  }
}
