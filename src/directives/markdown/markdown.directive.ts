import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, Renderer2, inject } from '@angular/core';

/**
 * WaMarkdownDirective
 *
 * Angular wrapper for the <wa-markdown> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported markdown attributes as @Input() properties
 * - Supports tabSize configuration for whitespace normalization
 * - Provides access to the shared Marked instance
 * - Allows programmatic re-rendering of markdown content
 */
@Directive({
  selector: 'wa-markdown',
  standalone: true
})
export class WaMarkdownDirective implements OnInit, OnChanges {
  /** The tab stop width used when converting leading tabs to spaces during whitespace normalization. */
  @Input() tabSize?: number | string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    this.applyInputs();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs() {
    this.setNumericAttr('tab-size', this.tabSize);
  }

  /**
   * Exposes the native markdown element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Returns the shared Marked instance used by all <wa-markdown> components.
   */
  public getMarked(): any {
    const native = this.el.nativeElement as any;
    if (typeof native.constructor?.getMarked === 'function') {
      return native.constructor.getMarked();
    }
    return native.marked;
  }

  /**
   * Re-renders all connected <wa-markdown> instances.
   * Call this after changing the Marked configuration.
   */
  public updateAll(): void {
    const native = this.el.nativeElement as any;
    if (typeof native.constructor?.updateAll === 'function') {
      native.constructor.updateAll();
    }
  }

  /**
   * Reads the script content, normalizes whitespace, parses markdown, and injects the result.
   */
  public renderMarkdown(): void {
    const native = this.el.nativeElement as any;
    if (typeof native.renderMarkdown === 'function') {
      native.renderMarkdown();
    }
  }

  private setNumericAttr(name: string, value: number | string | null | undefined) {
    if (value == null) {
      this.renderer.removeAttribute(this.el.nativeElement, name);
      return;
    }

    const numericValue = typeof value === 'string'
      ? (value.trim() === '' ? NaN : parseFloat(value))
      : value;

    if (isNaN(numericValue)) {
      this.renderer.removeAttribute(this.el.nativeElement, name);
      return;
    }

    this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
  }
}
