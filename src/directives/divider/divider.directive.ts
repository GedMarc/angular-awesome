import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, Renderer2, inject } from '@angular/core';

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
export class WaDividerDirective implements OnInit, OnChanges {
  // Boolean inputs
  @Input() orientation?: 'vertical' | 'horizontal';
  @Input() vertical?: boolean | string; // @deprecated Use orientation="vertical" instead

  // Style inputs
  @Input() color?: string;
  @Input() width?: string;
  @Input() spacing?: string;

  // Injected services
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  ngOnInit() {
    this.applyInputs();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs() {
    const el = this.el.nativeElement;

    // When an explicit orientation is provided, set it directly and clear the
    // deprecated vertical boolean attribute.  This covers both 'horizontal'
    // and 'vertical' (as well as any future value the WC may support).
    if (this.orientation != null) {
      this.renderer.setAttribute(el, 'orientation', this.orientation);
      this.renderer.removeAttribute(el, 'vertical');
    } else if (this.vertical === true || this.vertical === 'true' || this.vertical === '') {
      // Fall back to the deprecated vertical boolean attribute when
      // orientation is not provided.
      this.renderer.setAttribute(el, 'vertical', '');
      this.renderer.removeAttribute(el, 'orientation');
    } else {
      this.renderer.removeAttribute(el, 'vertical');
      this.renderer.removeAttribute(el, 'orientation');
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
      this.el.nativeElement.style.setProperty(name, value);
    }
  }

}
