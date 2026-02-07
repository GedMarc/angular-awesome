import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

// Union for better IDE hints
export type WaAlignItemsValue = 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  | 'wa-align-items-start' | 'wa-align-items-end' | 'wa-align-items-center' | 'wa-align-items-stretch' | 'wa-align-items-baseline';

/**
 * Attribute directive to conveniently apply Web Awesome align-items utility classes.
 *
 * Usage:
 * <div [waAlignItems]="'center'" class="wa-cluster">...</div>
 * <div [waAlignItems]="'wa-align-items-baseline'" class="wa-stack">...</div>
 */
@Directive({
  selector: '[waAlignItems]'
})
export class WaLayoutAlignItemsDirective implements OnChanges {
  private previousClass?: string;

  @Input('waAlignItems') alignItems?: WaAlignItemsValue | null;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('alignItems' in changes) {
      this.applyClass();
    }
  }

  private applyClass(): void {
    const host = this.el.nativeElement;
    // remove previous
    if (this.previousClass) {
      this.renderer.removeClass(host, this.previousClass);
      this.previousClass = undefined;
    }

    const cls = this.toClassName(this.alignItems);
    if (cls) {
      this.renderer.addClass(host, cls);
      this.previousClass = cls;
    }
  }

  private toClassName(value?: WaAlignItemsValue | null): string | undefined {
    if (!value) return undefined;
    // Accept both raw class name and shorthand tokens
    switch (value) {
      case 'start':
      case 'wa-align-items-start':
        return 'wa-align-items-start';
      case 'end':
      case 'wa-align-items-end':
        return 'wa-align-items-end';
      case 'center':
      case 'wa-align-items-center':
        return 'wa-align-items-center';
      case 'stretch':
      case 'wa-align-items-stretch':
        return 'wa-align-items-stretch';
      case 'baseline':
      case 'wa-align-items-baseline':
        return 'wa-align-items-baseline';
      default:
        return undefined;
    }
  }
}
