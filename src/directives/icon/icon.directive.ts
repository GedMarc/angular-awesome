import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';

/**
 * WaIconDirective
 *
 * Angular wrapper for the <wa-icon> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported icon attributes as @Input() properties
 * - Supports name, family, variant, library, src, label, and fixedWidth customization
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
  @Input() fixedWidth?: boolean | string;

  // Direct styling inputs
  @Input() color?: string;
  @Input() backgroundColor?: string;
  @Input() fontSize?: string;

  // CSS custom properties inputs
  @Input() iconName?: string;
  @Input() iconVariant?: string;
  @Input() iconFamily?: string;
  @Input() iconLibrary?: string;
  @Input() iconSize?: string;
  @Input() iconColor?: string;
  @Input() iconBackgroundColor?: string;

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
    this.setBooleanAttr('fixed-width', this.fixedWidth);

    // Apply direct styling inputs
    if (this.color) nativeEl.style.color = this.color;
    if (this.backgroundColor) nativeEl.style.backgroundColor = this.backgroundColor;
    if (this.fontSize) nativeEl.style.fontSize = this.fontSize;

    // Set CSS custom properties
    if (this.iconName) nativeEl.style.setProperty('--wa-icon-name', this.iconName);
    if (this.iconVariant) nativeEl.style.setProperty('--wa-icon-variant', this.iconVariant);
    if (this.iconFamily) nativeEl.style.setProperty('--wa-icon-family', this.iconFamily);
    if (this.iconLibrary) nativeEl.style.setProperty('--wa-icon-library', this.iconLibrary);
    if (this.iconSize) nativeEl.style.setProperty('--wa-icon-size', this.iconSize);
    if (this.iconColor) nativeEl.style.setProperty('--wa-icon-color', this.iconColor);
    if (this.iconBackgroundColor) nativeEl.style.setProperty('--wa-icon-background-color', this.iconBackgroundColor);
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
}
