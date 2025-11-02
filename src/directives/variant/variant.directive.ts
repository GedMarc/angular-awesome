import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { VariantToken } from '../../types/tokens';

export type WaVariantClass = 'wa-brand' | 'wa-neutral' | 'wa-success' | 'wa-warning' | 'wa-danger';
export type WaVariantInput = Exclude<VariantToken, 'inherit'> | WaVariantClass | null;

/**
 * [waVariant] — Angular helper to apply Web Awesome color variant utility classes
 * to any element (`.wa-brand`, `.wa-neutral`, `.wa-success`, `.wa-warning`, `.wa-danger`).
 *
 * Usage:
 *  - <div [waVariant]="'brand'"></div>
 *  - <div waBrand></div>
 *  - <div [waBrand]="true"></div>
 *  - <div [waVariant]="'wa-success'"></div>
 *
 * The directive ensures that only one variant class is applied at a time.
 */
@Directive({
  selector: '[waVariant],[waBrand],[waNeutral],[waSuccess],[waWarning],[waDanger]',
  standalone: true
})
export class WaVariantDirective implements OnChanges {
  // Primary API: one-of variant
  @Input() waVariant: WaVariantInput = null;

  // Boolean shorthands
  @Input() waBrand?: boolean | '' | null;
  @Input() waNeutral?: boolean | '' | null;
  @Input() waSuccess?: boolean | '' | null;
  @Input() waWarning?: boolean | '' | null;
  @Input() waDanger?: boolean | '' | null;

  private applied: WaVariantClass | null = null;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(_: SimpleChanges): void {
    this.sync();
  }

  private sync(): void {
    // Determine desired variant in priority order: explicit waVariant, then boolean shorthands
    const desired = this.normalizeVariant(
      this.waVariant ?? (this.isTruthy(this.waBrand) ? 'brand'
        : this.isTruthy(this.waNeutral) ? 'neutral'
        : this.isTruthy(this.waSuccess) ? 'success'
        : this.isTruthy(this.waWarning) ? 'warning'
        : this.isTruthy(this.waDanger) ? 'danger'
        : null)
    );

    // Remove previously applied class if different
    if (this.applied && this.applied !== desired) {
      this.renderer.removeClass(this.el.nativeElement, this.applied);
      this.applied = null;
    }

    // Apply new class
    if (desired) {
      this.renderer.addClass(this.el.nativeElement, desired);
      this.applied = desired;
    }
  }

  private normalizeVariant(v: WaVariantInput): WaVariantClass | null {
    if (!v) return null;
    const str = String(v);
    if (str === 'brand' || str === 'wa-brand') return 'wa-brand';
    if (str === 'neutral' || str === 'wa-neutral') return 'wa-neutral';
    if (str === 'success' || str === 'wa-success') return 'wa-success';
    if (str === 'warning' || str === 'wa-warning') return 'wa-warning';
    if (str === 'danger' || str === 'wa-danger') return 'wa-danger';
    // Unknown: do not apply
    return null;
  }

  private isTruthy(v: any): boolean {
    // Support presence-only boolean inputs (empty string) and true boolean
    return v === '' || v === true || v === 'true';
  }
}
