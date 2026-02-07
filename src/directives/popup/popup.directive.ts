import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, inject } from '@angular/core';

/**
 * WaPopupDirective
 *
 * Angular wrapper for the <wa-popup> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Popup is a utility that lets you declaratively anchor "popup" containers to another element.
 * It uses Floating UI under the hood to provide a well-tested, lightweight, and fully
 * declarative positioning utility for tooltips, dropdowns, and more.
 *
 * Features:
 * - Binds all supported popup attributes as @Input() properties
 * - Supports anchoring to elements via ID or slot
 * - Supports various placement options (top, bottom, left, right, etc.)
 * - Supports customization of distance, skidding, arrows, etc.
 * - Supports advanced positioning features like flip, shift, and auto-size
 * - Emits reposition events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for popup content and anchor
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control (reposition)
 */
@Directive({
  selector: 'wa-popup',
  standalone: true
})
export class WaPopupDirective implements OnInit {
  // String inputs
  @Input() anchor?: string;
  @Input() placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end' | string;
  @Input() boundary?: 'viewport' | 'scroll' | string;
  @Input() flipFallbackPlacements?: string;
  @Input() flipFallbackStrategy?: 'best-fit' | 'initial' | string;
  @Input() autoSize?: 'horizontal' | 'vertical' | 'both' | string;
  @Input() sync?: 'width' | 'height' | 'both' | string;
  @Input() arrowPlacement?: 'start' | 'end' | 'center' | 'anchor' | string;

  // Boolean inputs
  @Input() active?: boolean | string;
  @Input() arrow?: boolean | string;
  @Input() flip?: boolean | string;
  @Input() shift?: boolean | string;
  @Input() hoverBridge?: boolean | string;

  // Numeric inputs
  @Input() distance?: number | string;
  @Input() skidding?: number | string;
  @Input() arrowPadding?: number | string;
  @Input() flipPadding?: number | string;
  @Input() shiftPadding?: number | string;
  @Input() autoSizePadding?: number | string;

  // Event outputs
  @Output() waReposition = new EventEmitter<CustomEvent>();
  @Output('wa-reposition') waRepositionHyphen = this.waReposition;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set string attributes
    this.setAttr('anchor', this.anchor);
    this.setAttr('placement', this.placement);
    this.setAttr('boundary', this.boundary);
    this.setAttr('flip-fallback-placements', this.flipFallbackPlacements);
    this.setAttr('flip-fallback-strategy', this.flipFallbackStrategy);
    this.setAttr('auto-size', this.autoSize);
    this.setAttr('sync', this.sync);
    this.setAttr('arrow-placement', this.arrowPlacement);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('active', this.active);
    this.setBooleanAttr('arrow', this.arrow);
    this.setBooleanAttr('flip', this.flip);
    this.setBooleanAttr('shift', this.shift);
    this.setBooleanAttr('hover-bridge', this.hoverBridge);

    // Set numeric attributes
    this.setNumericAttr('distance', this.distance);
    this.setNumericAttr('skidding', this.skidding);
    this.setNumericAttr('arrow-padding', this.arrowPadding);
    this.setNumericAttr('flip-padding', this.flipPadding);
    this.setNumericAttr('shift-padding', this.shiftPadding);
    this.setNumericAttr('auto-size-padding', this.autoSizePadding);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'reposition', (event: CustomEvent) => {
      this.waReposition.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-reposition', (event: CustomEvent) => {
      this.waReposition.emit(event);
    });
  }

  /**
   * Exposes the native popup element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Forces the popup to recalculate and reposition itself
   */
  public reposition(): void {
    (this.el.nativeElement as any).reposition();
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
