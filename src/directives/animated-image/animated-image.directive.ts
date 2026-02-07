import {Input, ElementRef, OnInit, inject, EventEmitter, Output} from '@angular/core';

/**
 * WaAnimatedImageDirective
 *
 * Angular wrapper for the <wa-animated-image> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds attributes: src, alt, play
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for play/pause icons
 * - Supports custom styling via CSS variables (--icon-size, --control-box-size)
 * - Emits events for image load and error
 */
import { Directive, Renderer2 } from '@angular/core';

@Directive({
  selector: 'wa-animated-image',
  standalone: true
})
export class WaAnimatedImageDirective implements OnInit {
  @Input() src!: string;
  @Input() alt!: string;
  @Input() play?: boolean | string | null;
  @Input() iconSize?: string;
  @Input() controlBoxSize?: string;

  // Event outputs
  @Output('wa-load') load = new EventEmitter<Event>();
  @Output('wa-error') error = new EventEmitter<Event>();

  el = inject(ElementRef);
  renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    this.setAttr('src', this.src);
    this.setAttr('alt', this.alt);
    this.setBooleanAttr('play', this.play);

    this.setStyle('--icon-size', this.iconSize);
    this.setStyle('--control-box-size', this.controlBoxSize);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'wa-load', (event) => this.load.emit(event));
    this.renderer.listen(nativeEl, 'wa-error', (event) => this.error.emit(event));
  }

  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    }
  }

  private setStyle(name: string, value: string | null | undefined) {
    if (value != null) {
      this.el.nativeElement.style.setProperty(name, value);
    }
  }

  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    }
  }
}
