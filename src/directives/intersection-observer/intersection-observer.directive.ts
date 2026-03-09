import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, Renderer2, inject } from '@angular/core';

/**
 * WaIntersectionObserverDirective
 *
 * Angular wrapper for the <wa-intersection-observer> WebAwesome component.
 *
 * Features:
 * - Binds threshold and rootMargin inputs
 * - Native wa-change events are available via (wa-change) template binding
 * - Supports default slot projection (observed content)
 *
 * Event binding:
 * Consumers bind directly to the native DOM event: `(wa-change)="onChange($event)"`.
 * Angular handles this as a standard custom-element event binding.
 */
@Directive({
  selector: 'wa-intersection-observer',
  standalone: true
})
export class WaIntersectionObserverDirective implements OnInit, OnChanges {
  // Inputs
  @Input() threshold?: number | number[] | string;
  @Input() rootMargin?: string;
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
    // Map inputs
    if (Array.isArray(this.threshold)) {
      this.setAttr('threshold', this.threshold.join(','));
    } else {
      this.setAttr('threshold', this.threshold as any);
    }
    this.setAttr('root-margin', this.rootMargin);
    this.setBooleanAttr('disabled', this.disabled);
  }

  private setAttr(name: string, value: string | number | null | undefined) {
    if (value != null && value !== '') {
      this.renderer.setAttribute(this.el.nativeElement, name, String(value));
    }
  }

  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else if (value === false || value === 'false') {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }
}
