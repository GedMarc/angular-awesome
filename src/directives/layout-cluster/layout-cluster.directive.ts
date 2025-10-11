import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

export type WaClusterDirection = 'row' | 'column' | 'wa-cluster:row' | 'wa-cluster:column';
export type WaClusterJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  | 'wa-justify-start' | 'wa-justify-center' | 'wa-justify-end' | 'wa-justify-between' | 'wa-justify-around' | 'wa-justify-evenly';

/**
 * [waCluster] — Angular helper to apply the wa-cluster layout primitive with optional typed options.
 *
 * Minimal responsibility: toggle the `wa-cluster` class on the host.
 * Optional inputs map to utility classes when provided:
 *  - direction: row | column (maps to wa-cluster:row / wa-cluster:column)
 *  - wrap: boolean (true => wa-wrap, false => wa-nowrap)
 *  - justify: start|center|end|between|around|evenly (maps to wa-justify-*)
 *
 * Use together with [waGap] and [waAlignItems] for spacing and cross-axis alignment.
 */
@Directive({
  selector: '[waCluster]'
})
export class WaLayoutClusterDirective implements OnChanges {
  @Input('waCluster') enable: boolean | string | null = '';
  @Input() waClusterDirection?: WaClusterDirection | null;
  @Input() waClusterWrap?: boolean | string | null; // truthy => wrap, falsy => nowrap
  @Input() waClusterJustify?: WaClusterJustify | null;

  private applied: Set<string> = new Set<string>();

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(_: SimpleChanges): void {
    this.sync();
  }

  private sync(): void {
    const host = this.el.nativeElement;

    // First, remove all classes we may have added previously
    for (const cls of Array.from(this.applied)) {
      this.renderer.removeClass(host, cls);
      this.applied.delete(cls);
    }

    // Only apply when enabled (default enabled when attribute present without binding)
    if (!this.isTruthy(this.enable)) {
      return;
    }

    // Always add base class
    this.addClass('wa-cluster');

    // Direction mapping
    const dir = this.normalizeDirection(this.waClusterDirection);
    if (dir) this.addClass(dir);

    // Wrap mapping
    const wrap = this.normalizeWrap(this.waClusterWrap);
    if (wrap) this.addClass(wrap);

    // Justify mapping
    const just = this.normalizeJustify(this.waClusterJustify);
    if (just) this.addClass(just);
  }

  private addClass(cls: string): void {
    this.renderer.addClass(this.el.nativeElement, cls);
    this.applied.add(cls);
  }

  private isTruthy(v: any): boolean {
    return !(v === false || v === 'false' || v == null);
  }

  private normalizeDirection(v?: WaClusterDirection | null): string | undefined {
    if (!v) return undefined;
    switch (v) {
      case 'row':
      case 'wa-cluster:row':
        return 'wa-cluster:row';
      case 'column':
      case 'wa-cluster:column':
        return 'wa-cluster:column';
      default:
        return undefined;
    }
  }

  private normalizeWrap(v?: boolean | string | null): string | undefined {
    if (v == null) return undefined;
    const truthy = this.isTruthy(v);
    return truthy ? 'wa-wrap' : 'wa-nowrap';
  }

  private normalizeJustify(v?: WaClusterJustify | null): string | undefined {
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
      case 'between':
      case 'wa-justify-between':
        return 'wa-justify-between';
      case 'around':
      case 'wa-justify-around':
        return 'wa-justify-around';
      case 'evenly':
      case 'wa-justify-evenly':
        return 'wa-justify-evenly';
      default:
        return undefined;
    }
  }
}
