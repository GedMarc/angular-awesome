import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, inject } from '@angular/core';

/**
 * WaDrawerDirective
 *
 * Angular wrapper for the <wa-drawer> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported drawer attributes as @Input() properties
 * - Supports string inputs like label and placement
 * - Supports boolean attributes like open, withoutHeader, lightDismiss
 * - Emits events for drawer lifecycle: showEvent, afterShowEvent, hideEvent, afterHideEvent
 * - Emits native focusNative and blurNative events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, label, header-actions, and footer
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control: show() and hide()
 */
@Directive({
  selector: 'wa-drawer',
  standalone: true
})
export class WaDrawerDirective implements OnInit {
  // Boolean inputs
  @Input() open?: boolean | string;
  @Input() withoutHeader?: boolean | string;
  @Input() lightDismiss?: boolean | string;

  // String inputs
  @Input() label?: string;
  @Input() placement?: 'top' | 'end' | 'bottom' | 'start' | string;

  // Style inputs
  @Input() backgroundColor?: string;
  @Input() boxShadow?: string;
  @Input() spacing?: string;
  @Input() size?: string;
  @Input() showDuration?: string;
  @Input() hideDuration?: string;

  // Event outputs
  @Output() showEvent = new EventEmitter<CustomEvent>();
  @Output() afterShowEvent = new EventEmitter<CustomEvent>();
  @Output() hideEvent = new EventEmitter<CustomEvent>();
  @Output() afterHideEvent = new EventEmitter<CustomEvent>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set string attributes
    this.setAttr('label', this.label);
    this.setAttr('placement', this.placement);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('open', this.open);
    this.setBooleanAttr('without-header', this.withoutHeader);
    this.setBooleanAttr('light-dismiss', this.lightDismiss);

    // Set style attributes
    this.setCssVar('--background-color', this.backgroundColor);
    this.setCssVar('--box-shadow', this.boxShadow);
    this.setCssVar('--spacing', this.spacing);
    this.setCssVar('--size', this.size);
    this.setCssVar('--show-duration', this.showDuration);
    this.setCssVar('--hide-duration', this.hideDuration);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'wa-show', (event: CustomEvent) => this.showEvent.emit(event));
    this.renderer.listen(nativeEl, 'wa-after-show', (event: CustomEvent) => this.afterShowEvent.emit(event));
    this.renderer.listen(nativeEl, 'wa-hide', (event: CustomEvent) => this.hideEvent.emit(event));
    this.renderer.listen(nativeEl, 'wa-after-hide', (event: CustomEvent) => this.afterHideEvent.emit(event));
    this.renderer.listen(nativeEl, 'focusNative', (event: FocusEvent) => this.focusEvent.emit(event));
    this.renderer.listen(nativeEl, 'blurNative', (event: FocusEvent) => this.blurEvent.emit(event));
  }

  /**
   * Exposes the native drawer element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Programmatically opens the drawer
   */
  public show(): void {
    if (typeof this.el.nativeElement.show === 'function') {
      this.el.nativeElement.show();
    }
  }

  /**
   * Programmatically closes the drawer
   */
  public hide(): void {
    if (typeof this.el.nativeElement.hide === 'function') {
      this.el.nativeElement.hide();
    }
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
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
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
