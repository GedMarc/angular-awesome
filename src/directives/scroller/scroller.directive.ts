import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, inject } from '@angular/core';

/**
 * WaScrollerDirective
 *
 * Angular directive that attaches directly to the <wa-scroller> Web Component,
 * aligning with how other components are wrapped in this library.
 *
 * Features:
 * - Binds orientation, withoutScrollbar, and withoutShadow attributes
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 */
@Directive({
  selector: 'wa-scroller',
  standalone: true
})
export class WaScrollerDirective implements OnInit, OnChanges {
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
    this.applyInputs();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs(): void {
    // Set string attributes
    this.setAttr('orientation', this.orientation);

    // Set boolean attributes (toggle on/off)
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
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  /**
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
    } else {
      this.renderer.removeStyle(this.el.nativeElement, name);
    }
  }

  /**
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    const truthy = value === '' || value === true || value === 'true';
    if (truthy) {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }
}
