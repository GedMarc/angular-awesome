import { Directive, ElementRef, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, Output, Renderer2, inject } from '@angular/core';

/**
 * WaComparisonDirective
 *
 * Angular wrapper for the <wa-comparison> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds position attribute as @Input() property
 * - Emits change events when the divider position changes
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for before, after, and handle content
 * - Supports custom styling via CSS variables
 */
@Directive({
  selector: 'wa-comparison',
  standalone: true
})
export class WaComparisonDirective implements OnInit, OnChanges {
  // Position input
  @Input() position?: number | string;

  // CSS custom property inputs
  @Input() dividerColor?: string;
  @Input() dividerWidth?: string;
  @Input() handleColor?: string;
  @Input() handleSize?: string;

  // Event outputs
  @Output('wa-change') change = new EventEmitter<number>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    this.applyInputs();

    // Set up event listeners
    this.renderer.listen(nativeEl, 'change', (event: CustomEvent<number>) => {
      this.change.emit(event.detail);
    });
    this.renderer.listen(nativeEl, 'wa-change', (event: CustomEvent<number>) => {
      this.change.emit(event.detail);
    });
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs() {
    // Set position attribute
    this.setNumericAttr('position', this.position);

    // Set CSS custom properties
    this.setCssVar('--divider-color', this.dividerColor);
    this.setCssVar('--divider-width', this.dividerWidth);
    this.setCssVar('--handle-color', this.handleColor);
    this.setCssVar('--handle-size', this.handleSize);
  }

  /**
   * Exposes the native comparison element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
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
}
