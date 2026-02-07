import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

export type WaSizeToken = '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl'
  | `wa-body-${string}` | `wa-heading-${string}` | `wa-caption-${string}` | `wa-longform-${string}`
  | `wa-font-size-${string}`;

export type WaFormControlTextRole = 'label' | 'value' | 'placeholder' | 'hint'
  | 'wa-form-control-label' | 'wa-form-control-value' | 'wa-form-control-placeholder' | 'wa-form-control-hint';

export type WaFontWeight = 'light' | 'normal' | 'semibold' | 'bold'
  | 'wa-font-weight-light' | 'wa-font-weight-normal' | 'wa-font-weight-semibold' | 'wa-font-weight-bold';

export type WaTextColor = 'quiet' | 'normal' | 'link'
  | 'wa-color-text-quiet' | 'wa-color-text-normal' | 'wa-color-text-link'
  | 'wa-color-quiet' | 'wa-color-normal' | 'wa-color-link';

/**
 * [waText] — Angular helper to apply Web Awesome Text Utility classes with typed options.
 *
 * Responsibilities:
 *  - Apply body/heading/caption/longform typography tokens
 *  - Apply link styles, list reset, form control text roles
 *  - Apply single-purpose font-size, font-weight, text color
 *  - Apply truncation utility
 *
 * Notes:
 *  - Inputs accept short tokens (e.g., 's', '2xl') or full class tokens (e.g., 'wa-body-s').
 *  - Directive maintains and replaces previously applied classes when inputs change.
 */
@Directive({
  selector: '[waText]'
})
export class WaTextDirective implements OnChanges {
  // Grouped text styles (choose one size per group)
  @Input() waBody?: WaSizeToken | 'wa-body' | null;
  @Input() waHeading?: WaSizeToken | 'wa-heading' | null;
  @Input() waCaption?: WaSizeToken | 'wa-caption' | null;
  @Input() waLongform?: WaSizeToken | 'wa-longform' | null;

  // Link styles
  @Input() waLink?: boolean | 'link' | 'plain' | 'wa-link' | 'wa-link-plain' | null;

  // Lists
  @Input() waListPlain?: boolean | string | null;

  // Form control text roles
  @Input() waFormControlText?: WaFormControlTextRole | null;

  // Single-purpose utilities
  @Input() waFontSize?: WaSizeToken | null;
  @Input() waFontWeight?: WaFontWeight | null;
  @Input() waColorText?: WaTextColor | null;

  // Truncation
  @Input() waTextTruncate?: boolean | string | null;

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

    // Grouped styles
    this.applyGrouped('body', this.waBody);
    this.applyGrouped('heading', this.waHeading);
    this.applyGrouped('caption', this.waCaption);
    this.applyGrouped('longform', this.waLongform);

    // Link styles
    const linkClass = this.normalizeLink(this.waLink);
    if (linkClass) this.addClass(linkClass);

    // List reset
    if (this.isTruthy(this.waListPlain)) this.addClass('wa-list-plain');

    // Form control text
    const fc = this.normalizeFormControlText(this.waFormControlText);
    if (fc) this.addClass(fc);

    // Single-purpose utilities
    const fs = this.normalizeFontSize(this.waFontSize);
    if (fs) this.addClass(fs);

    const fw = this.normalizeFontWeight(this.waFontWeight);
    if (fw) this.addClass(fw);

    const color = this.normalizeColorText(this.waColorText);
    if (color) this.addClass(color);

    // Truncate
    if (this.isTruthy(this.waTextTruncate)) this.addClass('wa-text-truncate');
  }

  private applyGrouped(kind: 'body' | 'heading' | 'caption' | 'longform', value?: WaSizeToken | `wa-${string}` | null): void {
    const cls = this.normalizeGrouped(kind, value);
    if (cls) this.addClass(cls);
  }

  private normalizeGrouped(kind: 'body' | 'heading' | 'caption' | 'longform', value?: any): string | undefined {
    if (!value) return undefined;
    const v = String(value).trim();

    // Exact passthrough for full class names
    if (v === `wa-${kind}` || v.startsWith(`wa-${kind}-`)) return v;

    // Accept short size tokens
    switch (v) {
      case '2xs':
      case 'xs':
      case 's':
      case 'm':
      case 'l':
      case 'xl':
      case '2xl':
      case '3xl':
      case '4xl':
        return `wa-${kind}-${v}`;
      default:
        return undefined;
    }
  }

  private normalizeLink(v?: boolean | string | null): string | undefined {
    if (v == null) return undefined;
    if (v === true) return 'wa-link';
    if (v === false || v === 'false') return undefined;
    const s = String(v).trim();
    if (!s) return undefined;
    switch (s) {
      case 'link':
      case 'wa-link':
        return 'wa-link';
      case 'plain':
      case 'wa-link-plain':
        return 'wa-link-plain';
      default:
        return undefined;
    }
  }

  private normalizeFormControlText(v?: WaFormControlTextRole | null): string | undefined {
    if (!v) return undefined;
    switch (v) {
      case 'label':
      case 'wa-form-control-label':
        return 'wa-form-control-label';
      case 'value':
      case 'wa-form-control-value':
        return 'wa-form-control-value';
      case 'placeholder':
      case 'wa-form-control-placeholder':
        return 'wa-form-control-placeholder';
      case 'hint':
      case 'wa-form-control-hint':
        return 'wa-form-control-hint';
      default:
        return undefined;
    }
  }

  private normalizeFontSize(v?: WaSizeToken | null): string | undefined {
    if (!v) return undefined;
    const s = String(v).trim();
    if (s.startsWith('wa-font-size-')) return s;
    switch (s) {
      case '2xs':
      case 'xs':
      case 's':
      case 'm':
      case 'l':
      case 'xl':
      case '2xl':
      case '3xl':
      case '4xl':
        return `wa-font-size-${s}`;
      default:
        return undefined;
    }
  }

  private normalizeFontWeight(v?: WaFontWeight | null): string | undefined {
    if (!v) return undefined;
    const s = String(v).trim();
    switch (s) {
      case 'light':
      case 'wa-font-weight-light':
        return 'wa-font-weight-light';
      case 'normal':
      case 'wa-font-weight-normal':
        return 'wa-font-weight-normal';
      case 'semibold':
      case 'wa-font-weight-semibold':
        return 'wa-font-weight-semibold';
      case 'bold':
      case 'wa-font-weight-bold':
        return 'wa-font-weight-bold';
      default:
        return undefined;
    }
  }

  private normalizeColorText(v?: WaTextColor | null): string | undefined {
    if (!v) return undefined;
    const s = String(v).trim();
    switch (s) {
      case 'quiet':
      case 'wa-color-text-quiet':
      case 'wa-color-quiet': // support legacy token used in examples
        return 'wa-color-text-quiet';
      case 'normal':
      case 'wa-color-text-normal':
      case 'wa-color-normal':
        return 'wa-color-text-normal';
      case 'link':
      case 'wa-color-text-link':
      case 'wa-color-link':
        return 'wa-color-text-link';
      default:
        return undefined;
    }
  }

  private isTruthy(v: any): boolean {
    return !(v === false || v === 'false' || v == null);
  }

  private addClass(cls: string): void {
    this.renderer.addClass(this.el.nativeElement, cls);
    this.applied.add(cls);
  }
}
