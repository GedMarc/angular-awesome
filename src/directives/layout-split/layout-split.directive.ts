import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

export type WaSplitDirection = 'row' | 'column' | 'wa-split:row' | 'wa-split:column';

/**
 * [waSplit] — Angular helper to apply the wa-split layout primitive with typed options.
 *
 * Responsibilities:
 *  - Toggle the `wa-split` class on the host
 *  - Optional direction token adds `wa-split:row` or `wa-split:column`
 *  - Optional collapse value sets CSS var `--wa-split-collapse` (e.g., `40rem`)
 *  - Works with [waGap] and [waAlignItems]
 */
@Directive({
  selector: '[waSplit]'
})
export class WaLayoutSplitDirective implements OnChanges {
  @Input('waSplit') enable: boolean | string | null = '';
  @Input() waSplitDirection?: WaSplitDirection | null;
  @Input() splitCollapse?: string | null; // maps to --wa-split-collapse

  private applied = new Set<string>();

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(_: SimpleChanges): void {
    this.sync();
  }

  private sync(): void {
    const host = this.el.nativeElement;

    // Remove classes we added previously
    for (const cls of Array.from(this.applied)) {
      this.renderer.removeClass(host, cls);
      this.applied.delete(cls);
    }

    // Clear managed styles
    this.renderer.removeStyle(host, '--wa-split-collapse');

    if (!this.isTruthy(this.enable)) {
      return;
    }

    // Base class
    this.addClass('wa-split');

    // Direction
    const dir = this.normalizeDirection(this.waSplitDirection);
    if (dir) this.addClass(dir);

    // Collapse
    if (this.splitCollapse) {
      this.renderer.setStyle(host, '--wa-split-collapse', this.splitCollapse);
    }
  }

  private addClass(cls: string): void {
    this.renderer.addClass(this.el.nativeElement, cls);
    this.applied.add(cls);
  }

  private isTruthy(v: any): boolean {
    return !(v === false || v === 'false' || v == null);
  }

  private normalizeDirection(v?: WaSplitDirection | null): string | undefined {
    if (!v) return undefined;
    switch (v) {
      case 'row':
      case 'wa-split:row':
        return 'wa-split:row';
      case 'column':
      case 'wa-split:column':
        return 'wa-split:column';
      default:
        return undefined;
    }
  }
}
