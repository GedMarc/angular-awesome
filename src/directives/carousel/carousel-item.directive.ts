import { Directive, ElementRef, OnInit, Renderer2, inject } from '@angular/core';

/**
 * WaCarouselItemDirective
 *
 * Angular wrapper for the <wa-carousel-item> Web Component that allows declarative usage
 * and integration with Angular templates.
 *
 * Features:
 * - Enables Angular-style class and style bindings
 * - Allows content projection for slide content
 * - Supports custom styling via CSS variables
 * - Integrates with parent WaCarouselDirective
 */
@Directive({
  selector: 'wa-carousel-item',
  standalone: true
})
export class WaCarouselItemDirective implements OnInit {
  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    // No specific attributes to set for carousel items
    // They inherit properties from the parent carousel
  }

  /**
   * Exposes the native carousel item element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }
}
