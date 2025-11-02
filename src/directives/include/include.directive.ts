import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, inject } from '@angular/core';

/**
 * WaIncludeDirective
 *
 * Angular wrapper for the <wa-include> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported include attributes as @Input() properties
 * - Supports string inputs like src and mode
 * - Supports boolean attributes like allowScripts
 * - Emits load and error events
 * - Enables Angular-style class and style bindings
 */
@Directive({
  selector: 'wa-include',
  standalone: true
})
export class WaIncludeDirective implements OnInit {
  // String inputs
  @Input() src?: string;
  @Input() mode?: 'cors' | 'no-cors' | 'same-origin' | string;

  // Boolean inputs
  @Input() allowScripts?: boolean | string;

  // Event outputs
  @Output() waLoad = new EventEmitter<void>();
  @Output() waError = new EventEmitter<{ status: number }>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set string attributes
    this.setAttr('src', this.src);
    this.setAttr('mode', this.mode);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('allow-scripts', this.allowScripts);

    // Set up event listeners (use hyphenated custom events per WebAwesome)
    this.renderer.listen(nativeEl, 'wa-load', () => this.waLoad.emit());
    this.renderer.listen(nativeEl, 'wa-error', (event: CustomEvent<{ status: number }>) => this.waError.emit(event.detail));
    // Backwards compatibility with legacy camelCase events
    this.renderer.listen(nativeEl, 'waLoad', () => this.waLoad.emit());
    this.renderer.listen(nativeEl, 'waError', (event: CustomEvent<{ status: number }>) => this.waError.emit(event.detail));
  }

  /**
   * Exposes the native include element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Sets an attribute on the native element if the value is not null or undefined
   */
  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    }
  }

  /**
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    }
  }
}
