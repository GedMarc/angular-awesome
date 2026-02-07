import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';

/**
 * WaSkeletonDirective
 *
 * Angular wrapper for the <wa-skeleton> Web Component that allows declarative usage
 * and styling of skeleton loading placeholders.
 *
 * Features:
 * - Applied as an attribute to placeholder elements
 * - Supports animation effects: none, sheen, pulse
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 */
@Directive({
  selector: '[waSkeleton]',
  standalone: true
})
export class WaSkeletonDirective implements OnInit {
  // Core input attributes
  @Input() effect?: 'none' | 'sheen' | 'pulse' | string;

  // Style inputs
  @Input() borderRadius?: string;
  @Input() color?: string;
  @Input() sheenColor?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // If the element is not a wa-skeleton tag, ensure it has the role="presentation"
    if (nativeEl.tagName.toLowerCase() !== 'wa-skeleton') {
      this.renderer.setAttribute(nativeEl, 'role', 'presentation');
      this.renderer.setAttribute(nativeEl, 'aria-hidden', 'true');
    }

    // Set string attributes
    this.setAttr('effect', this.effect);

    // Set style attributes
    this.setCssVar('--border-radius', this.borderRadius);
    this.setCssVar('--color', this.color);
    this.setCssVar('--sheen-color', this.sheenColor);
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
}
