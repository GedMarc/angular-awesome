import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';

/**
 * WaIconDirective
 *
 * Angular wrapper for the <wa-icon> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported icon attributes as @Input() properties
 * - Supports name, family, variant, library, src, label, and withFixedWidth customization
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 * - Provides accessibility support through label attribute
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
@Directive({
  selector: 'wa-icon',
  standalone: true
})
export class WaIconDirective implements OnInit {
  // Icon inputs
  @Input() name?: string;
  @Input() family?: string;
  @Input() variant?: string;
  @Input() library?: string;
  @Input() src?: string;
  @Input() label?: string;
  @Input() withFixedWidth?: boolean | string;

  // Direct styling inputs
  @Input() color?: string;
  @Input() backgroundColor?: string;
  @Input() fontSize?: string;

  // Duotone icon inputs
  @Input() primaryColor?: string;
  @Input() primaryOpacity?: string;
  @Input() secondaryColor?: string;
  @Input() secondaryOpacity?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set standard attributes
    this.setAttr('name', this.name);
    this.setAttr('family', this.family);
    this.setAttr('variant', this.variant);
    this.setAttr('library', this.library);
    this.setAttr('src', this.src);
    this.setAttr('label', this.label);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('with-fixed-width', this.withFixedWidth);

    // Apply styling inputs using CSS custom properties
    this.setCssStyle('text-color', this.color);
    this.setCssStyle('background-color', this.backgroundColor);
    this.setCssStyle('font-size', this.fontSize);

    // Set duotone icon CSS custom properties
    this.setCssVar('--primary-color', this.primaryColor);
    this.setCssVar('--primary-opacity', this.primaryOpacity);
    this.setCssVar('--secondary-color', this.secondaryColor);
    this.setCssVar('--secondary-opacity', this.secondaryOpacity);
  }

  /**
   * Exposes the native icon element for direct interaction
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

    /**
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
    }
  }

  /**
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
  private setCssStyle(name: string, value: string | null | undefined) {
    if (value) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
    }
  }
}
