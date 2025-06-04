import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, inject } from '@angular/core';

/**
 * WaAnimationDirective
 *
 * Angular wrapper for the <wa-animation> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported animation attributes as @Input() properties
 * - Supports JavaScript-only properties like keyframes and currentTime
 * - Emits animation lifecycle events (start, finish, cancel)
 * - Enables Angular-style class and style bindings
 * - Allows projection of a single child element
 * - Supports custom styling via CSS variables
 */
@Directive({
  selector: 'wa-animation',
  standalone: true
})
export class WaAnimationDirective implements OnInit {
  // Standard animation inputs
  @Input() name?: string;
  @Input() play?: boolean | string;
  @Input() delay?: number;
  @Input() duration?: number;
  @Input() easing?: string;
  @Input() direction?: string;
  @Input() iterations?: number;
  @Input() iterationStart?: number;
  @Input() endDelay?: number;
  @Input() fill?: string;
  @Input() playbackRate?: number;

  // JavaScript-only properties
  @Input() keyframes?: Keyframe[];
  @Input() currentTime?: any; // CSSNumberish type

  // Styling inputs
  @Input() controlBoxSize?: string;
  @Input() iconSize?: string;

  // Event outputs
  @Output('wa-start') start = new EventEmitter<Event>();
  @Output('wa-finish') finish = new EventEmitter<Event>();
  @Output('wa-cancel') cancel = new EventEmitter<Event>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set standard attributes
    this.setAttr('name', this.name);
    if (this.play) this.renderer.setAttribute(nativeEl, 'play', '');
    this.setAttr('delay', this.delay?.toString());
    this.setAttr('duration', this.duration?.toString());
    this.setAttr('easing', this.easing);
    this.setAttr('direction', this.direction);
    this.setAttr('iterations', this.iterations?.toString());
    this.setAttr('iteration-start', this.iterationStart?.toString());
    this.setAttr('end-delay', this.endDelay?.toString());
    this.setAttr('fill', this.fill);
    this.setAttr('playback-rate', this.playbackRate?.toString());

    // Set CSS custom properties
    this.setStyle('--control-box-size', this.controlBoxSize);
    this.setStyle('--icon-size', this.iconSize);

    // Set JavaScript-only properties
    if (this.keyframes) {
      (nativeEl as any).keyframes = this.keyframes;
    }
    if (this.currentTime !== undefined) {
      (nativeEl as any).currentTime = this.currentTime;
    }

    // Set up event listeners
    this.renderer.listen(nativeEl, 'wa-start', (event) => this.start.emit(event));
    this.renderer.listen(nativeEl, 'wa-finish', (event) => this.finish.emit(event));
    this.renderer.listen(nativeEl, 'wa-cancel', (event) => this.cancel.emit(event));
  }

  /**
   * Exposes the native animation element for direct interaction
   */
  public get nativeAnimation(): HTMLElement {
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
   * Sets a style property on the native element if the value is not null or undefined
   */
  private setStyle(name: string, value: string | null | undefined) {
    if (value != null) {
      this.el.nativeElement.style.setProperty(name, value);
    }
  }
}
