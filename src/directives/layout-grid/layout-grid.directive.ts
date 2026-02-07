import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

/**
 * [waGrid] — Angular helper to apply the wa-grid layout primitive and common options.
 *
 * Responsibilities:
 *  - Toggle the `wa-grid` class on the host
 *  - Support sizing via CSS custom properties commonly used by WA grid:
 *    - minColumnSize -> --min-column-size (e.g., 20ch, 16rem, 200px)
 *    - columns -> --columns (number)
 *    - rowSize -> --row-size
 *  - Provide a convenient boolean input to add/remove `wa-span-grid` on a child when the directive is applied to that child via [waGridSpan]
 *
 * Use with [waGap] for spacing and [waAlignItems] for cross-axis alignment.
 */
@Directive({
  selector: '[waGrid]'
})
export class WaLayoutGridDirective implements OnChanges {
  @Input('waGrid') enable: boolean | string | null = '';
  @Input() minColumnSize?: string | null;
  @Input() columns?: number | string | null;
  @Input() rowSize?: string | null;

  private appliedBase = false;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(_: SimpleChanges): void {
    this.sync();
  }

  private sync(): void {
    const host = this.el.nativeElement;

    // Base class toggle
    if (!this.isTruthy(this.enable)) {
      if (this.appliedBase) {
        this.renderer.removeClass(host, 'wa-grid');
        this.appliedBase = false;
      }
      // Clear managed styles
      this.clearStyles(host);
      return;
    }

    if (!this.appliedBase) {
      this.renderer.addClass(host, 'wa-grid');
      this.appliedBase = true;
    }

    // Re-apply managed styles
    this.clearStyles(host);
    if (this.minColumnSize) this.renderer.setStyle(host, '--min-column-size', this.minColumnSize);
    if (this.columns != null && this.columns !== '') this.renderer.setStyle(host, '--columns', String(this.columns));
    if (this.rowSize) this.renderer.setStyle(host, '--row-size', this.rowSize);
  }

  private clearStyles(host: HTMLElement) {
    this.renderer.removeStyle(host, '--min-column-size');
    this.renderer.removeStyle(host, '--columns');
    this.renderer.removeStyle(host, '--row-size');
  }

  private isTruthy(v: any): boolean {
    return !(v === false || v === 'false' || v == null);
  }
}

/**
 * [waGridSpan] — helper directive to mark a grid child as full-span (adds `wa-span-grid`).
 */
@Directive({
  selector: '[waGridSpan]'
})
export class WaLayoutGridSpanDirective implements OnChanges {
  @Input('waGridSpan') span: boolean | string | null = '';
  private applied = false;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(_: SimpleChanges): void {
    const host = this.el.nativeElement;
    const truthy = !(this.span === false || this.span === 'false' || this.span == null);
    if (truthy && !this.applied) {
      this.renderer.addClass(host, 'wa-span-grid');
      this.applied = true;
    } else if (!truthy && this.applied) {
      this.renderer.removeClass(host, 'wa-span-grid');
      this.applied = false;
    }
  }
}
