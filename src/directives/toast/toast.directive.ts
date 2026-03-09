import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, Renderer2, inject } from '@angular/core';

/**
 * WaToastDirective
 *
 * Angular wrapper for the <wa-toast> Web Component.
 * Toasts display brief, non-blocking notifications that appear temporarily above the page content.
 *
 * Features:
 * - Binds all supported toast attributes as @Input() properties
 * - Supports placement configuration
 * - Provides programmatic access to the native element's create() method
 * - Allows slot projection for toast items
 * - Supports custom styling via CSS variables (--gap, --width)
 */
@Directive({
  selector: 'wa-toast',
  standalone: true
})
export class WaToastDirective implements OnInit, OnChanges {
  /**
   * The placement of the toast stack on the screen.
   * Supported values: 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'
   */
  @Input() placement?: 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end' | string;

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
    this.setAttr('placement', this.placement);
  }

  /**
   * Exposes the native toast element for direct interaction.
   * Use nativeElement.create() to programmatically create toast items.
   */
  public get nativeElement(): WaToastNativeElement {
    return this.el.nativeElement;
  }

  /**
   * Programmatically creates a toast notification and adds it to the stack.
   * Delegates to the native <wa-toast> element's create() method.
   */
  public create(message: string, options?: ToastCreateOptions): HTMLElement {
    return this.nativeElement.create(message, options);
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

/**
 * Typed interface for the native <wa-toast> element, providing type-safe access
 * to the create() method and other native properties.
 */
export interface WaToastNativeElement extends HTMLElement {
  /** Programmatically creates a toast notification and adds it to the stack. */
  create(message: string, options?: ToastCreateOptions): HTMLElement;
}

/**
 * Options for programmatically creating a toast item via the create() method.
 */
export interface ToastCreateOptions {
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  duration?: number;
  icon?: string;
}

