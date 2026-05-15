import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

// Union for better IDE hints
export type WaGapToken = '0' | '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl'
  | 'wa-gap-0' | 'wa-gap-3xs' | 'wa-gap-2xs' | 'wa-gap-xs' | 'wa-gap-s' | 'wa-gap-m' | 'wa-gap-l' | 'wa-gap-xl' | 'wa-gap-2xl' | 'wa-gap-3xl';

/**
 * Attribute directive to apply Web Awesome gap utility classes to any container.
 * It also sets display:flex via the utility and can be overridden since the utility has low specificity.
 *
 * Usage:
 * <div [waGap]="'m'" class="wa-cluster">...</div>
 * <section [waGap]="'wa-gap-xl'" class="wa-grid">...</section>
 */
@Directive({
  selector: '[waGap]'
})
export class WaLayoutGapDirective implements OnChanges {
  private previousClass?: string;

  @Input('waGap') gap?: WaGapToken | null;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('gap' in changes) {
      this.applyClass();
    }
  }

  private applyClass(): void {
    const host = this.el.nativeElement;
    if (this.previousClass) {
      this.renderer.removeClass(host, this.previousClass);
      this.previousClass = undefined;
    }
    const cls = this.toClassName(this.gap);
    if (cls) {
      this.renderer.addClass(host, cls);
      this.previousClass = cls;
    }
  }

  private toClassName(value?: WaGapToken | null): string | undefined {
    if (!value) return undefined;
    switch (value) {
      case '0':
      case 'wa-gap-0':
        return 'wa-gap-0';
      case '3xs':
      case 'wa-gap-3xs':
        return 'wa-gap-3xs';
      case '2xs':
      case 'wa-gap-2xs':
        return 'wa-gap-2xs';
      case 'xs':
      case 'wa-gap-xs':
        return 'wa-gap-xs';
      case 's':
      case 'wa-gap-s':
        return 'wa-gap-s';
      case 'm':
      case 'wa-gap-m':
        return 'wa-gap-m';
      case 'l':
      case 'wa-gap-l':
        return 'wa-gap-l';
      case 'xl':
      case 'wa-gap-xl':
        return 'wa-gap-xl';
      case '2xl':
      case 'wa-gap-2xl':
        return 'wa-gap-2xl';
      case '3xl':
      case 'wa-gap-3xl':
        return 'wa-gap-3xl';
      default:
        return undefined;
    }
  }
}
