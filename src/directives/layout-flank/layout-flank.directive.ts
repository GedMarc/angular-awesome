import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

export type WaFlankPosition = 'start' | 'end' | 'wa-flank:start' | 'wa-flank:end' | null;

/**
 * [waFlank] — Angular helper to apply the wa-flank layout primitive with optional typed options.
 *
 * Responsibilities:
 *  - Toggle the `wa-flank` class on the host
 *  - Optionally append `wa-flank:start` or `wa-flank:end` to control which item flanks
 *  - Optionally add `wa-nowrap` when `waFlankNowrap` is truthy
 *  - Optionally set CSS custom properties `--flank-size` and `--content-percentage`
 *
 * Use together with [waGap] for spacing and [waAlignItems] for cross-axis alignment.
 */
@Directive({
  selector: '[waFlank]'
})
export class WaLayoutFlankDirective implements OnChanges {
  @Input('waFlank') enable: boolean | string | null = '';
  @Input() waFlankPosition?: WaFlankPosition;
  @Input() waFlankNowrap?: boolean | string | null;
  @Input() flankSize?: string | null; // maps to --flank-size
  @Input() contentPercentage?: string | null; // maps to --content-percentage (e.g., "70%")

  private appliedClasses: Set<string> = new Set<string>();

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(_: SimpleChanges): void {
    this.sync();
  }

  private sync(): void {
    const host = this.el.nativeElement;

    // Remove prior classes we added
    for (const cls of Array.from(this.appliedClasses)) {
      this.renderer.removeClass(host, cls);
      this.appliedClasses.delete(cls);
    }

    // Clear CSS vars we manage before re-applying
    this.renderer.removeStyle(host, '--flank-size');
    this.renderer.removeStyle(host, '--content-percentage');

    if (!this.isTruthy(this.enable)) {
      return;
    }

    // Base class
    this.addClass('wa-flank');

    // Position
    const pos = this.normalizePosition(this.waFlankPosition);
    if (pos) this.addClass(pos);

    // No-wrap
    if (this.isTruthy(this.waFlankNowrap)) {
      this.addClass('wa-nowrap');
    }

    // CSS variables
    if (this.flankSize) {
      this.renderer.setStyle(host, '--flank-size', this.flankSize);
    }
    if (this.contentPercentage) {
      this.renderer.setStyle(host, '--content-percentage', this.contentPercentage);
    }
  }

  private addClass(cls: string): void {
    this.renderer.addClass(this.el.nativeElement, cls);
    this.appliedClasses.add(cls);
  }

  private isTruthy(v: any): boolean {
    return !(v === false || v === 'false' || v == null);
  }

  private normalizePosition(v?: WaFlankPosition): string | undefined {
    if (!v) return undefined;
    switch (v) {
      case 'start':
      case 'wa-flank:start':
        return 'wa-flank:start';
      case 'end':
      case 'wa-flank:end':
        return 'wa-flank:end';
      default:
        return undefined;
    }
  }
}
