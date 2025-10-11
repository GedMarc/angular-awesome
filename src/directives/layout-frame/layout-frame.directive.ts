import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

export type WaFrameRatioToken = 'square' | 'landscape' | 'portrait' | 'wa-frame:square' | 'wa-frame:landscape' | 'wa-frame:portrait';
export type WaFrameRadiusToken = 's' | 'm' | 'l' | 'pill' | 'circle' | 'square'
  | 'wa-border-radius-s' | 'wa-border-radius-m' | 'wa-border-radius-l' | 'wa-border-radius-pill' | 'wa-border-radius-circle' | 'wa-border-radius-square';

/**
 * [waFrame] — Angular helper to apply the wa-frame layout primitive with typed options.
 *
 * Responsibilities:
 *  - Toggle the `wa-frame` class on the host
 *  - Optional ratio token adds `wa-frame:square|landscape|portrait`
 *  - Optional custom aspectRatio string sets CSS `aspect-ratio` on host
 *  - Optional border radius token adds `wa-border-radius-*`
 *  - Optional custom borderRadius string sets style `border-radius` on host
 *  - Optional objectFit sets CSS custom property `--object-fit` (consumed by Web Awesome CSS)
 */
@Directive({
  selector: '[waFrame]'
})
export class WaLayoutFrameDirective implements OnChanges {
  @Input('waFrame') enable: boolean | string | null = '';
  @Input() waFrameRatio?: WaFrameRatioToken | null;
  @Input() aspectRatio?: string | null; // e.g., "16 / 9", "4/3"
  @Input() waFrameRadius?: WaFrameRadiusToken | null;
  @Input() borderRadius?: string | null; // e.g., "12px", "50% 0%"
  @Input() objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' | (string & {} ) | null;

  private appliedClasses = new Set<string>();

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(_: SimpleChanges): void {
    this.sync();
  }

  private sync(): void {
    const host = this.el.nativeElement;

    // Remove classes we previously added
    for (const cls of Array.from(this.appliedClasses)) {
      this.renderer.removeClass(host, cls);
      this.appliedClasses.delete(cls);
    }

    // Clear managed styles
    this.renderer.removeStyle(host, 'aspect-ratio');
    this.renderer.removeStyle(host, 'border-radius');
    this.renderer.removeStyle(host, '--object-fit');

    if (!this.isTruthy(this.enable)) {
      return;
    }

    // Base class
    this.addClass('wa-frame');

    // Ratio token
    const ratioCls = this.normalizeRatio(this.waFrameRatio);
    if (ratioCls) this.addClass(ratioCls);

    // Custom aspect ratio
    if (this.aspectRatio) {
      this.renderer.setStyle(host, 'aspect-ratio', this.aspectRatio);
    }

    // Border radius token
    const radiusCls = this.normalizeRadius(this.waFrameRadius);
    if (radiusCls) this.addClass(radiusCls);

    // Custom border radius
    if (this.borderRadius) {
      this.renderer.setStyle(host, 'border-radius', this.borderRadius);
    }

    // Object fit via CSS custom property (consumed by WA styles)
    if (this.objectFit) {
      this.renderer.setStyle(host, '--object-fit', String(this.objectFit));
    }
  }

  private addClass(cls: string): void {
    this.renderer.addClass(this.el.nativeElement, cls);
    this.appliedClasses.add(cls);
  }

  private isTruthy(v: any): boolean {
    return !(v === false || v === 'false' || v == null);
  }

  private normalizeRatio(v?: WaFrameRatioToken | null): string | undefined {
    if (!v) return undefined;
    switch (v) {
      case 'square':
      case 'wa-frame:square':
        return 'wa-frame:square';
      case 'landscape':
      case 'wa-frame:landscape':
        return 'wa-frame:landscape';
      case 'portrait':
      case 'wa-frame:portrait':
        return 'wa-frame:portrait';
      default:
        return undefined;
    }
  }

  private normalizeRadius(v?: WaFrameRadiusToken | null): string | undefined {
    if (!v) return undefined;
    switch (v) {
      case 's':
      case 'wa-border-radius-s':
        return 'wa-border-radius-s';
      case 'm':
      case 'wa-border-radius-m':
        return 'wa-border-radius-m';
      case 'l':
      case 'wa-border-radius-l':
        return 'wa-border-radius-l';
      case 'pill':
      case 'wa-border-radius-pill':
        return 'wa-border-radius-pill';
      case 'circle':
      case 'wa-border-radius-circle':
        return 'wa-border-radius-circle';
      case 'square':
      case 'wa-border-radius-square':
        return 'wa-border-radius-square';
      default:
        return undefined;
    }
  }
}
