import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';
import { SizeToken, VariantToken } from '../../types/tokens';

/**
 * WaButtonGroupDirective
 *
 * Angular wrapper for the <wa-button-group> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Container component for grouping related <wa-button> elements
 * - Supports shared attributes (size, variant, orientation)
 * - Provides accessibility features via label attribute
 * - Allows slot projection for buttons and compatible components
 *
 * Usage:
 * ```html
 * <!-- As an element -->
 * <wa-button-group label="Alignment">
 *   <wa-button>Left</wa-button>
 *   <wa-button>Center</wa-button>
 *   <wa-button>Right</wa-button>
 * </wa-button-group>
 *
 * <!-- As an attribute -->
 * <div waButtonGroup label="Alignment">
 *   <button waButton>Left</button>
 *   <button waButton>Center</button>
 *   <button waButton>Right</button>
 * </div>
 * ```
 *
 * Slots:
 * - (default): Buttons and controls inside the group
 *
 * CSS Parts:
 * - base: The wrapper of the group
 */
@Directive({
  selector: 'wa-button-group, [waButtonGroup]',
  standalone: true
})
export class WaButtonGroupDirective implements OnInit {
  // Required input for accessibility
  @Input() label?: string;

  // Appearance inputs that are inherited by contained buttons
  @Input() size?: SizeToken | string;
  @Input() variant?: VariantToken | string;
  @Input() orientation?: 'horizontal' | 'vertical' | string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set standard attributes
    this.setAttr('label', this.label);
    this.setAttr('size', this.size);
    this.setAttr('variant', this.variant);
    this.setAttr('orientation', this.orientation);

    // If label is provided, set aria-label for accessibility
    if (this.label) {
      this.setAttr('aria-label', this.label);
    }
  }

  /**
   * Exposes the native button group element for direct interaction
   */
  public get nativeButtonGroup(): HTMLElement {
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
}
