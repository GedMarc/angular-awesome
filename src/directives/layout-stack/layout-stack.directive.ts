import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

export type WaStackDirection = 'column' | 'row' | 'wa-stack:column' | 'wa-stack:row';
export type WaStackJustify = 'start' | 'center' | 'end'
  | 'wa-justify-start' | 'wa-justify-center' | 'wa-justify-end';

/**
 * [waStack] — Angular helper to apply the wa-stack layout primitive with typed options.
 *
 * Responsibilities:
 *  - Toggle the `wa-stack` class on the host
 *  - Optional direction token adds `wa-stack:column` or `wa-stack:row`
 *  - Optional justify maps to `wa-justify-start|center|end`
 *  - Optional dividers boolean adds `wa-dividers`
 *
 * Use together with [waGap] for spacing and [waAlignItems] for cross-axis alignment.
 */
@Directive({
  selector: '[waStack]'
})
export class WaLayoutStackDirective implements OnChanges {
  @Input('waStack') enable: boolean | string | null = '';
  @Input() waStackDirection?: WaStackDirection | null;
  @Input() waStackJustify?: WaStackJustify | null;
  @Input() waStackDividers?: boolean | string | null;

  private applied = new Set<string>();

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(_: SimpleChanges): void {
    this.sync();
  }

  private sync(): void {
    const host = this.el.nativeElement;

    // Remove previously added classes
    for (const cls of Array.from(this.applied)) {
      this.renderer.removeClass(host, cls);
      this.applied.delete(cls);
    }

    if (!this.isTruthy(this.enable)) {
      return;
    }

    // Base class
    this.addClass('wa-stack');

    // Direction
    const dir = this.normalizeDirection(this.waStackDirection);
    if (dir) this.addClass(dir);

    // Justify
    const just = this.normalizeJustify(this.waStackJustify);
    if (just) this.addClass(just);

    // Dividers
    if (this.isTruthy(this.waStackDividers)) {
      this.addClass('wa-dividers');
    }
  }

  private addClass(cls: string): void {
    this.renderer.addClass(this.el.nativeElement, cls);
    this.applied.add(cls);
  }

  private isTruthy(v: any): boolean {
    return !(v === false || v === 'false' || v == null);
  }

  private normalizeDirection(v?: WaStackDirection | null): string | undefined {
    if (!v) return undefined;
    switch (v) {
      case 'column':
      case 'wa-stack:column':
        return 'wa-stack:column';
      case 'row':
      case 'wa-stack:row':
        return 'wa-stack:row';
      default:
        return undefined;
    }
  }

  private normalizeJustify(v?: WaStackJustify | null): string | undefined {
    if (!v) return undefined;
    switch (v) {
      case 'start':
      case 'wa-justify-start':
        return 'wa-justify-start';
      case 'center':
      case 'wa-justify-center':
        return 'wa-justify-center';
      case 'end':
      case 'wa-justify-end':
        return 'wa-justify-end';
      default:
        return undefined;
    }
  }
}
