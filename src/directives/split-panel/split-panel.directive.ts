import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, inject } from '@angular/core';

/**
 * WaSplitPanelDirective
 *
 * Angular wrapper for the <wa-split-panel> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported split panel attributes as @Input() properties
 * - Emits events for repositioning
 * - Enables Angular-style class and style bindings
 * - Supports slot projection for start, end, and divider content
 */
@Component({
  selector: 'wa-split-panel',
  standalone: true,
  template: `
    <ng-content select="[slot=start]"></ng-content>
    <ng-content select="[slot=end]"></ng-content>
    <ng-content select="[slot=divider]"></ng-content>
  `
})
export class WaSplitPanelDirective implements OnInit {
  // Core input attributes
  @Input() position?: number;
  @Input() positionInPixels?: number;
  @Input() orientation?: 'vertical' | 'horizontal' | string;
  @Input() vertical?: boolean | string; // @deprecated Use orientation="vertical" instead
  @Input() disabled?: boolean | string;
  @Input() primary?: 'start' | 'end' | string;
  @Input() snap?: string;
  @Input() snapThreshold?: number;

  // Style inputs
  @Input() dividerColor?: string;
  @Input() dividerWidth?: string;
  @Input() dividerHitArea?: string;
  @Input() min?: string;
  @Input() max?: string;

  // Event outputs
  @Output() repositionEvent = new EventEmitter<CustomEvent>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set numeric attributes
    this.setNumericAttr('position', this.position);
    this.setNumericAttr('position-in-pixels', this.positionInPixels);
    this.setNumericAttr('snap-threshold', this.snapThreshold);

    // Set string attributes
    this.setAttr('primary', this.primary);
    this.setAttr('snap', this.snap);

    // Set boolean attributes (only if true)
    if (this.orientation === 'vertical') {
      this.renderer.setAttribute(this.el.nativeElement, 'orientation', 'vertical');
    } else {
      this.setBooleanAttr('vertical', this.vertical);
    }
    this.setBooleanAttr('disabled', this.disabled);

    // Set style attributes
    this.setCssVar('--divider-color', this.dividerColor);
    this.setCssVar('--divider-width', this.dividerWidth);
    this.setCssVar('--divider-hit-area', this.dividerHitArea);
    this.setCssVar('--min', this.min);
    this.setCssVar('--max', this.max);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'wa-reposition', (event: CustomEvent) => {
      this.repositionEvent.emit(event);
    });
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
