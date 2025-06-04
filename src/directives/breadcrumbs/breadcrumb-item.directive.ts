import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';

/**
 * WaBreadcrumbItemDirective
 *
 * Angular wrapper for the <wa-breadcrumb-item> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds attributes: href, target, rel
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, prefix, suffix, and custom separators
 * - Supports custom styling via CSS variables and ::part() selectors
 */
@Directive({
  selector: 'wa-breadcrumb-item',
  standalone: true
})
export class WaBreadcrumbItemDirective implements OnInit {
  @Input() href?: string;
  @Input() target?: '_blank' | '_parent' | '_self' | '_top';
  @Input() rel: string = 'noreferrer noopener';

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    this.setAttr('href', this.href);
    this.setAttr('target', this.target);
    this.setAttr('rel', this.rel);
  }

  /**
   * Sets an attribute on the native element if the value is not null or undefined
   */
  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    }
  }
}
