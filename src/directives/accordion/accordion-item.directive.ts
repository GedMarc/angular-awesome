import { Directive, ElementRef, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, Output, Renderer2, inject } from '@angular/core';

/**
 * WaAccordionItemDirective
 *
 * Angular wrapper for the <wa-accordion-item> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported accordion-item attributes as @Input() properties
 * - Supports label, expanded, and disabled customization
 * - Emits an openChange event when the expanded state changes
 * - Allows slot projection for label, icon, and default content
 * - Supports custom styling via CSS variables
 * - Provides programmatic control through expand(), collapse(), and toggle() methods
 */
@Directive({
  selector: 'wa-accordion-item',
  standalone: true
})
export class WaAccordionItemDirective implements OnInit, OnChanges {
  // Accordion item inputs
  @Input() label?: string;
  @Input() expanded?: boolean | string;
  @Input() disabled?: boolean | string;

  // CSS custom property inputs
  @Input() spacing?: string;
  @Input() showDuration?: string;
  @Input() hideDuration?: string;
  @Input() easing?: string;
  @Input() dividerColor?: string;

  // Event outputs
  @Output() openChange = new EventEmitter<boolean>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    this.applyInputs();

    this.renderer.listen(nativeEl, 'wa-after-expand', () => this.openChange.emit(true));
    this.renderer.listen(nativeEl, 'wa-after-collapse', () => this.openChange.emit(false));
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs() {
    this.setAttr('label', this.label);
    this.setBooleanAttr('expanded', this.expanded);
    this.setBooleanAttr('disabled', this.disabled);

    this.setCssVar('--spacing', this.spacing);
    this.setCssVar('--show-duration', this.showDuration);
    this.setCssVar('--hide-duration', this.hideDuration);
    this.setCssVar('--easing', this.easing);
    this.setCssVar('--wa-accordion-divider-color', this.dividerColor);
  }

  /**
   * Exposes the native accordion-item element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Expands the accordion item with animation.
   */
  public expand(): void {
    if (typeof this.el.nativeElement.expand === 'function') {
      this.el.nativeElement.expand();
    }
  }

  /**
   * Collapses the accordion item with animation.
   */
  public collapse(): void {
    if (typeof this.el.nativeElement.collapse === 'function') {
      this.el.nativeElement.collapse();
    }
  }

  /**
   * Toggles the accordion item's expanded state.
   */
  public toggle(): void {
    if (typeof this.el.nativeElement.toggle === 'function') {
      this.el.nativeElement.toggle();
    }
  }

  /**
   * Focuses the accordion item's trigger button.
   */
  public focus(options?: FocusOptions): void {
    if (typeof this.el.nativeElement.focus === 'function') {
      this.el.nativeElement.focus(options);
    }
  }

  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.el.nativeElement.style.setProperty(name, value);
    }
  }
}

