import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';

/**
 * WaCardDirective
 *
 * Angular wrapper for the <wa-card> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported card attributes as @Input() properties
 * - Supports appearance and size customization
 * - Supports boolean attributes for header, image, and footer
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for header, footer, image, and default content
 * - Supports custom styling via CSS variables
 * - Supports direct styling through color, backgroundColor, fontSize inputs
 */
@Directive({
  selector: 'wa-card',
  standalone: true
})
export class WaCardDirective implements OnInit {
  // Appearance inputs
  @Input() appearance?: 'accent' | 'filled' | 'outlined' | 'plain' | string;

  // Boolean inputs
  @Input() withHeader?: boolean | string;
  @Input() withImage?: boolean | string;
  @Input() withFooter?: boolean | string;

  // Direct styling inputs
  @Input() color?: string;
  @Input() backgroundColor?: string;
  @Input() fontSize?: string;

  // CSS custom property inputs
  @Input() borderRadius?: string;
  @Input() borderColor?: string;
  @Input() innerBorderColor?: string;
  @Input() borderWidth?: string;
  @Input() spacing?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set standard attributes
    this.setAttr('appearance', this.appearance);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('with-header', this.withHeader);
    this.setBooleanAttr('with-image', this.withImage);
    this.setBooleanAttr('with-footer', this.withFooter);

    // Apply direct styling inputs
    if (this.color) nativeEl.style.color = this.color;
    if (this.backgroundColor) nativeEl.style.backgroundColor = this.backgroundColor;
    if (this.fontSize) nativeEl.style.fontSize = this.fontSize;

    // Set CSS custom properties
    if (this.borderRadius) nativeEl.style.setProperty('--border-radius', this.borderRadius);
    if (this.borderColor) nativeEl.style.setProperty('--border-color', this.borderColor);
    if (this.innerBorderColor) nativeEl.style.setProperty('--inner-border-color', this.innerBorderColor);
    if (this.borderWidth) nativeEl.style.setProperty('--border-width', this.borderWidth);
    if (this.spacing) nativeEl.style.setProperty('--spacing', this.spacing);
  }

  /**
   * Exposes the native card element for direct interaction
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
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    }
  }
}
