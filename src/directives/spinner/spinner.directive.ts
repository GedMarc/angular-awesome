import { Component, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';

/**
 * WaSpinnerDirective
 *
 * Angular wrapper for the <wa-spinner> Web Component that allows declarative usage
 * and input binding for styling.
 *
 * Features:
 * - Binds all supported spinner attributes as @Input() properties
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 */
@Component({
  selector: 'wa-spinner',
  standalone: true,
  template: '<ng-content></ng-content>'
})
export class WaSpinnerDirective implements OnInit {
  // Style inputs
  @Input() fontSize?: string;
  @Input() trackWidth?: string;
  @Input() trackColor?: string;
  @Input() indicatorColor?: string;
  @Input() speed?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    // Set style attributes directly on the host element
    this.setStyle('font-size', this.fontSize);

    // Set CSS custom properties
    this.setCssVar('--track-width', this.trackWidth);
    this.setCssVar('--track-color', this.trackColor);
    this.setCssVar('--indicator-color', this.indicatorColor);
    this.setCssVar('--speed', this.speed);
  }

  /**
   * Exposes the native element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Sets a style property on the native element if the value is not null or undefined
   */
  private setStyle(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
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
