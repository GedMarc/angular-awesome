import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, inject } from '@angular/core';

/**
 * WaCarouselDirective
 *
 * Angular wrapper for the <wa-carousel> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported carousel attributes as @Input() properties
 * - Supports boolean attributes like loop, navigation, pagination, autoplay, mouseDragging
 * - Supports numeric attributes like autoplayInterval, slidesPerPage, slidesPerMove
 * - Supports string attributes like orientation
 * - Emits slide change events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for carousel items and navigation icons
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control (next, previous, goToSlide)
 */
@Directive({
  selector: 'wa-carousel',
  standalone: true
})
export class WaCarouselDirective implements OnInit {
  // Boolean inputs
  @Input() loop?: boolean | string;
  @Input() navigation?: boolean | string;
  @Input() pagination?: boolean | string;
  @Input() autoplay?: boolean | string;
  @Input() mouseDragging?: boolean | string;

  // Numeric inputs
  @Input() autoplayInterval?: number | string;
  @Input() slidesPerPage?: number | string;
  @Input() slidesPerMove?: number | string;

  // String inputs
  @Input() orientation?: 'horizontal' | 'vertical' | string;

  // Event outputs
  @Output() waSlideChange = new EventEmitter<{ index: number }>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set boolean attributes (only if true)
    this.setBooleanAttr('loop', this.loop);
    this.setBooleanAttr('navigation', this.navigation);
    this.setBooleanAttr('pagination', this.pagination);
    this.setBooleanAttr('autoplay', this.autoplay);
    this.setBooleanAttr('mouse-dragging', this.mouseDragging);

    // Set numeric attributes
    this.setNumericAttr('autoplay-interval', this.autoplayInterval);
    this.setNumericAttr('slides-per-page', this.slidesPerPage);
    this.setNumericAttr('slides-per-move', this.slidesPerMove);

    // Set string attributes
    this.setAttr('orientation', this.orientation);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'slideChange', (event: CustomEvent<{ index: number }>) => {
      this.waSlideChange.emit(event.detail);
    });
  }

  /**
   * Exposes the native carousel element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Scrolls to the next slide
   */
  public next(): void {
    (this.el.nativeElement as any).next();
  }

  /**
   * Scrolls to the previous slide
   */
  public previous(): void {
    (this.el.nativeElement as any).previous();
  }

  /**
   * Scrolls to the slide at the specified index
   */
  public goToSlide(index: number): void {
    (this.el.nativeElement as any).goToSlide(index);
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
   * Sets a numeric attribute on the native element if the value is not null or undefined
   */
  private setNumericAttr(name: string, value: number | string | null | undefined) {
    if (value != null) {
      const numericValue = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(numericValue)) {
        this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
      }
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
