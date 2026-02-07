import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';
import { Appearance, VariantToken, SizeToken, normalizeAppearance } from '../../types/tokens';

/**
 * WaCalloutDirective
 *
 * Angular wrapper for the <wa-callout> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported callout attributes as @Input() properties
 * - Supports variant, appearance, and size customization
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for icon and default content
 * - Supports custom styling via CSS variables
 */
@Directive({
  selector: 'wa-callout',
  standalone: true
})
export class WaCalloutDirective implements OnInit {
  // Appearance inputs
  @Input() variant?: VariantToken | string;
  @Input() appearance?: Appearance | string;
  @Input() size?: SizeToken | string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set standard attributes
    this.setAttr('variant', this.variant);
    this.setAttr('appearance', normalizeAppearance(this.appearance));
    this.setAttr('size', this.size);
  }

  /**
   * Exposes the native callout element for direct interaction
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
}
