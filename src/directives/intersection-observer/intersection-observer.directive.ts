import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, inject } from '@angular/core';

/**
 * WaIntersectionObserverDirective
 *
 * Angular wrapper for the <wa-intersection-observer> WebAwesome component.
 *
 * Features:
 * - Binds threshold and rootMargin inputs
 * - Re-emits wa-change events
 * - Supports default slot projection (observed content)
 */
@Directive({
  selector: 'wa-intersection-observer',
  standalone: true
})
export class WaIntersectionObserverDirective implements OnInit {
  // Inputs
  @Input() threshold?: number | number[] | string;
  @Input() rootMargin?: string;
  @Input() disabled?: boolean | string;

  // Events
  @Output() waChange = new EventEmitter<CustomEvent>();

  // Services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Map inputs
    if (Array.isArray(this.threshold)) {
      this.setAttr('threshold', this.threshold.join(','));
    } else {
      this.setAttr('threshold', this.threshold as any);
    }
    this.setAttr('root-margin', this.rootMargin);
    this.setBooleanAttr('disabled', this.disabled);

    // Events (hyphenated custom event)
    this.renderer.listen(nativeEl, 'wa-change', (event: CustomEvent) => this.waChange.emit(event));
  }

  private setAttr(name: string, value: string | number | null | undefined) {
    if (value != null && value !== '') {
      this.renderer.setAttribute(this.el.nativeElement, name, String(value));
    }
  }

  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    }
  }
}
