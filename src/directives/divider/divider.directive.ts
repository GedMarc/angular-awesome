import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';

/**
 * WaDividerDirective
 *
 * Angular wrapper for the <wa-divider> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds the vertical boolean attribute
 * - Supports style inputs for color, width, and spacing
 * - Maps style inputs to CSS custom properties
 * - Enables Angular-style class and style bindings
 */
@Directive({
  selector: 'wa-divider',
  standalone: true
})
export class WaDividerDirective implements OnInit {
  // Boolean inputs
  @Input() orientation?: 'vertical' | 'horizontal' | string;
  @Input() vertical?: boolean | string; // @deprecated Use orientation="vertical" instead

  // Style inputs
  @Input() color?: string;
  @Input() width?: string;
  @Input() spacing?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set boolean attributes (only if true)
    if (this.orientation === 'vertical') {
      this.renderer.setAttribute(this.el.nativeElement, 'orientation', 'vertical');
    } else {
      this.setBooleanAttr('vertical', this.vertical);
    }

    // Set style attributes
    this.setCssVar('--color', this.color);
    this.setCssVar('--width', this.width);
    this.setCssVar('--spacing', this.spacing);
  }

  /**
   * Exposes the native divider element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
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
