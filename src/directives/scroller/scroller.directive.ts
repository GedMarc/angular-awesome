import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';

/**
 * WaScrollerWrapperDirective
 *
 * Angular wrapper for the <wa-scroller> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds orientation, withoutScrollbar, and withoutShadow attributes
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content
 * - Supports custom styling via CSS variables
 */
@Directive({
  selector: 'wa-scroller-wrapper',
  standalone: true
})
export class WaScrollerWrapperDirective implements OnInit {
  // Core input attributes
  @Input() orientation?: 'horizontal' | 'vertical' | string;
  @Input() withoutScrollbar?: boolean | string;
  @Input() withoutShadow?: boolean | string;

  // Style inputs
  @Input() shadowColor?: string;
  @Input() shadowSize?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    // Set string attributes
    this.setAttr('orientation', this.orientation);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('without-scrollbar', this.withoutScrollbar);
    this.setBooleanAttr('without-shadow', this.withoutShadow);

    // Set style attributes
    this.setCssVar('--shadow-color', this.shadowColor);
    this.setCssVar('--shadow-size', this.shadowSize);
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
}
