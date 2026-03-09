import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, Renderer2, inject } from '@angular/core';

/**
 * WaResizeObserverDirective
 *
 * Angular wrapper for the <wa-resize-observer> Web Component.
 * The Resize Observer component offers a thin, declarative interface to the ResizeObserver API.
 *
 * Features:
 * - Binds disabled input
 * - Native wa-resize events are available via (wa-resize) template binding
 * - Supports default slot projection (observed content)
 *
 * Event binding:
 * Consumers bind directly to the native DOM event: `(wa-resize)="onResize($event)"`.
 * Angular handles this as a standard custom-element event binding — no @Output wrapper
 * is needed, which avoids double-emission issues when an @Output alias matches a DOM event name.
 */
@Directive({
  selector: 'wa-resize-observer',
  standalone: true
})
export class WaResizeObserverDirective implements OnInit, OnChanges {
  // Inputs
  @Input() disabled?: boolean | string;

  // Services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    this.applyInputs();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs() {
    this.setBooleanAttr('disabled', this.disabled);
  }

  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else if (value === false || value === 'false') {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }
}
