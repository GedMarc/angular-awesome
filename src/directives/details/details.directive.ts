import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, inject } from '@angular/core';

/**
 * WaDetailsDirective
 *
 * Angular wrapper for the <wa-details> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported details attributes as @Input() properties
 * - Supports summary, disabled, appearance, and open customization
 * - Emits details events (waShow, waAfterShow, waHide, waAfterHide)
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for summary, expand-icon, collapse-icon, and default content
 * - Supports custom styling via CSS variables
 * - Provides programmatic control through show() and hide() methods
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
@Directive({
  selector: 'wa-details',
  standalone: true
})
export class WaDetailsDirective implements OnInit {
  // Details inputs
  @Input() summary?: string;
  @Input() disabled?: boolean | string;
  @Input() appearance?: 'filled' | 'outlined' | 'plain' | string;
  @Input() open?: boolean | string;

  // CSS custom property inputs

  @Input() iconColor?: string;
  @Input() spacing?: string;
  @Input() showDuration?: string;
  @Input() hideDuration?: string;
  @Input() display?: string;

  // Event outputs
  @Output() waShow = new EventEmitter<Event>();
  @Output() waAfterShow = new EventEmitter<Event>();
  @Output() waHide = new EventEmitter<Event>();
  @Output() waAfterHide = new EventEmitter<Event>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set standard attributes
    this.setAttr('summary', this.summary);
    this.setAttr('appearance', this.appearance);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('open', this.open);

    // Set CSS custom properties
    if (this.iconColor) nativeEl.style.setProperty('--icon-color', this.iconColor);
    if (this.spacing) nativeEl.style.setProperty('--spacing', this.spacing);
    if (this.showDuration) nativeEl.style.setProperty('--show-duration', this.showDuration);
    if (this.hideDuration) nativeEl.style.setProperty('--hide-duration', this.hideDuration);
    if (this.display) nativeEl.style.setProperty('--display', this.display);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'show', (event) => this.waShow.emit(event));
    this.renderer.listen(nativeEl, 'aftershow', (event) => this.waAfterShow.emit(event));
    this.renderer.listen(nativeEl, 'hide', (event) => this.waHide.emit(event));
    this.renderer.listen(nativeEl, 'afterhide', (event) => this.waAfterHide.emit(event));
  }

  /**
   * Exposes the native details element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Opens the details programmatically
   */
  public show(): void {
    if (this.el.nativeElement.show) {
      this.el.nativeElement.show();
    }
  }

  /**
   * Closes the details programmatically
   */
  public hide(): void {
    if (this.el.nativeElement.hide) {
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
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    }
  }
}
