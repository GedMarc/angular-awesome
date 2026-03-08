import { Directive, ElementRef, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, Output, Renderer2, inject } from '@angular/core';

/**
 * WaResizeObserverDirective
 *
 * Angular wrapper for the <wa-resize-observer> Web Component.
 * The Resize Observer component offers a thin, declarative interface to the ResizeObserver API.
 *
 * Features:
 * - Binds disabled input
 * - Re-emits wa-resize events
 * - Supports default slot projection (observed content)
 */
@Directive({
  selector: 'wa-resize-observer',
  standalone: true
})
export class WaResizeObserverDirective implements OnInit, OnChanges {
  // Inputs
  @Input() disabled?: boolean | string;

  // Events
  @Output('wa-resize') waResize = new EventEmitter<CustomEvent>();

  // Services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    this.applyInputs();

    // Events
    this.renderer.listen(this.el.nativeElement, 'wa-resize', (event: CustomEvent) => this.waResize.emit(event));
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

