import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, inject } from '@angular/core';

/**
 * WaPopoverDirective
 *
 * Angular wrapper for the <wa-popover> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Popover is a utility that lets you declaratively anchor "popover" containers to another element.
 * It uses Floating UI under the hood to provide a well-tested, lightweight, and fully
 * declarative positioning utility for tooltips, dropdowns, and more.
 *
 * Features:
 * - Binds all supported popover attributes as @Input() properties
 * - Supports anchoring to elements via ID or slot
 * - Supports various placement options (top, bottom, left, right, etc.)
 * - Supports customization of distance, skidding, arrows, etc.
 * - Supports advanced positioning features like flip, shift, and auto-size
 * - Emits reposition events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for popover content and anchor
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control (reposition)
 */
@Directive({
  selector: 'wa-popover',
  standalone: true
})
export class WaPopoverDirective implements OnInit, OnDestroy {
  // String inputs
  @Input() anchor?: string;
  // Allow using HTML's label-like API: for/htmlFor. We alias to properties that map to `anchor`.
  @Input('for') forAttr?: string;
  @Input() htmlFor?: string;
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

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // Lazy rendering state
  private contentFragment: DocumentFragment | null = null;
  private contentRendered = false;
  private unlistenShow?: () => void;
  private unlistenHide?: () => void;

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Prepare lazy content FIRST so we control when it appears
    // This avoids a race where the component opens before Angular-projected content exists
    this.captureContentIntoFragment();

    // Set string attributes
    const resolvedAnchor = this.anchor ?? this.forAttr ?? this.htmlFor;
    this.setAttr('anchor', resolvedAnchor);
    this.setAttr('placement', this.placement);
    this.setAttr('boundary', this.boundary);
    this.setAttr('flip-fallback-placements', this.flipFallbackPlacements);
    this.setAttr('flip-fallback-strategy', this.flipFallbackStrategy);
    this.setAttr('auto-size', this.autoSize);
    this.setAttr('sync', this.sync);
    this.setAttr('arrow-placement', this.arrowPlacement);

    // Set boolean attributes (only if true) — DO NOT set `active` yet
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

    // Listen for show/hide from the web component to toggle content rendering
    // Support both generic and Web Awesome-prefixed events for compatibility
    this.unlistenShow = this.renderer.listen(nativeEl, 'show', () => {
      this.renderContentFromFragment();
    });
    const unlistenShowWa = this.renderer.listen(nativeEl, 'wa-show', () => {
      this.renderContentFromFragment();
    });

    this.unlistenHide = this.renderer.listen(nativeEl, 'hide', () => {
      this.captureContentIntoFragment();
    });
    const unlistenHideWa = this.renderer.listen(nativeEl, 'wa-hide', () => {
      this.captureContentIntoFragment();
    });

    // If the popover starts active or `active` input is set, render content BEFORE enabling active
    const wantsActive = (this.active === true || this.active === 'true' || this.active === '');
    if (nativeEl.hasAttribute('active') || wantsActive) {
      this.renderContentFromFragment();
      // Now set active if requested via input so the component opens with content already present
      if (wantsActive && !nativeEl.hasAttribute('active')) {
        this.setBooleanAttr('active', true);
      }
    }

    // Store additional unlisten handlers on the element to clean up in ngOnDestroy
    (this as any)._unlistenShowWa = unlistenShowWa;
    (this as any)._unlistenHideWa = unlistenHideWa;
  }

  ngOnChanges(changes: any): void {
    if (changes['anchor'] || changes['forAttr'] || changes['htmlFor']) {
      const resolvedAnchor = this.anchor ?? this.forAttr ?? this.htmlFor;
      this.setAttr('anchor', resolvedAnchor);
    }
  }

  ngOnDestroy(): void {
    if (this.unlistenShow) this.unlistenShow();
    if (this.unlistenHide) this.unlistenHide();
    if ((this as any)._unlistenShowWa) (this as any)._unlistenShowWa();
    if ((this as any)._unlistenHideWa) (this as any)._unlistenHideWa();
    // Ensure we don't leak detached nodes
    this.contentFragment = null;
  }

  /**
   * Exposes the native popover element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Forces the popover to recalculate and reposition itself
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

  // Move all non-anchor slotted child nodes into a fragment (to prevent initial render)
  private captureContentIntoFragment() {
    const host = this.el.nativeElement as HTMLElement;
    if (!this.contentFragment) this.contentFragment = document.createDocumentFragment();

    // If content already captured (not rendered), do nothing
    if (!this.contentRendered && this.contentFragment.childNodes.length > 0) {
      return;
    }

    // Detach all nodes except those with slot="anchor"
    const nodesToMove: ChildNode[] = [];
    host.childNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        if (el.getAttribute('slot') === 'anchor') {
          return; // keep anchor
        }
      }
      // Text, comments, and non-anchor elements are considered popover content
      nodesToMove.push(node);
    });

    if (nodesToMove.length > 0) {
      nodesToMove.forEach(n => this.contentFragment!.appendChild(n));
      this.contentRendered = false;
    }
  }

  // Render captured content back into the host when showing
  private renderContentFromFragment() {
    const host = this.el.nativeElement as HTMLElement;
    if (this.contentFragment && this.contentFragment.childNodes.length > 0) {
      host.appendChild(this.contentFragment);
      // contentFragment becomes empty after append; recreate for future hides
      this.contentFragment = document.createDocumentFragment();
      this.contentRendered = true;
    }
  }
}
