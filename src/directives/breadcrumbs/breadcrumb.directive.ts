import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';

/**
 * WaBreadcrumbDirective
 *
 * Angular wrapper for the <wa-breadcrumb> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds label attribute for accessibility
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for breadcrumb items and custom separators
 * - Supports custom styling via CSS variables
 */
@Directive({
  selector: 'wa-breadcrumb',
  standalone: true
})
export class WaBreadcrumbDirective implements OnInit {
  @Input() label?: string;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    this.setAttr('label', this.label);
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
