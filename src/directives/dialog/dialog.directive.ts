import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, inject } from '@angular/core';

/**
 * WaDialogDirective
 *
 * Angular wrapper for the <wa-dialog> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported dialog attributes as @Input() properties
 * - Supports string inputs like label
 * - Supports boolean attributes like open, withoutHeader, lightDismiss
 * - Emits events for dialog lifecycle: waShow, waAfterShow, waHide, waAfterHide
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, footer, and header-actions
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control: show() and hide()
 */
@Directive({
  selector: 'wa-dialog',
  standalone: true
})
export class WaDialogDirective implements OnInit {
  // Boolean inputs
  @Input() open?: boolean | string;
  @Input() withoutHeader?: boolean | string;
  @Input() lightDismiss?: boolean | string;

  // String inputs
  @Input() label?: string;

  // Style inputs
  @Input() backgroundColor?: string;
  @Input() borderRadius?: string;
  @Input() boxShadow?: string;
  @Input() spacing?: string;
  @Input() width?: string;
  @Input() showDuration?: string;
  @Input() hideDuration?: string;

  // Event outputs
  @Output() waShow = new EventEmitter<void>();
  @Output() waAfterShow = new EventEmitter<void>();
  @Output() waHide = new EventEmitter<{ source: HTMLElement | 'overlay' | 'escape' | 'programmatic' }>();
  @Output() waAfterHide = new EventEmitter<void>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set string attributes
    this.setAttr('label', this.label);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('open', this.open);
    this.setBooleanAttr('without-header', this.withoutHeader);
    this.setBooleanAttr('light-dismiss', this.lightDismiss);

    // Set style attributes
    this.setCssVar('--background-color', this.backgroundColor);
    this.setCssVar('--border-radius', this.borderRadius);
    this.setCssVar('--box-shadow', this.boxShadow);
    this.setCssVar('--spacing', this.spacing);
    this.setCssVar('--width', this.width);
    this.setCssVar('--show-duration', this.showDuration);
    this.setCssVar('--hide-duration', this.hideDuration);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'waShow', () => this.waShow.emit());
    this.renderer.listen(nativeEl, 'waAfterShow', () => this.waAfterShow.emit());
    this.renderer.listen(nativeEl, 'waHide', (event: CustomEvent<{ source: HTMLElement | 'overlay' | 'escape' | 'programmatic' }>) =>
      this.waHide.emit(event.detail));
    this.renderer.listen(nativeEl, 'waAfterHide', () => this.waAfterHide.emit());
  }

  /**
   * Exposes the native dialog element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Programmatically opens the dialog
   */
  public show(): void {
    if (typeof this.el.nativeElement.show === 'function') {
      this.el.nativeElement.show();
    }
  }

  /**
   * Programmatically closes the dialog
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
