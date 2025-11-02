import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, inject } from '@angular/core';

/**
 * WaMutationObserverDirective
 *
 * Angular wrapper for the <wa-mutation-observer> WebAwesome component.
 *
 * Features:
 * - Binds target and options inputs
 * - Re-emits wa-mutation events
 * - Supports default slot projection (observed content)
 */
@Directive({
  selector: 'wa-mutation-observer',
  standalone: true
})
export class WaMutationObserverDirective implements OnInit {
  // Inputs
  /** Element id or HTMLElement to observe. If not provided, the default slot content is observed. */
  @Input() target?: string | HTMLElement;
  /** Options bag or JSON string (attributes, childList, subtree, characterData, attributeFilter). */
  @Input() options?: any;
  @Input() disabled?: boolean | string;

  // Events
  @Output() waMutation = new EventEmitter<CustomEvent>();

  // Services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Map inputs
    if (typeof this.target === 'string') {
      this.setAttr('target', this.target);
    } else if (this.target instanceof HTMLElement) {
      (nativeEl as any).target = this.target;
    }

    if (this.options != null) {
      // Pass complex options as property to avoid stringifying
      (nativeEl as any).options = this.options;
    }
    this.setBooleanAttr('disabled', this.disabled);

    // Events
    this.renderer.listen(nativeEl, 'wa-mutation', (event: CustomEvent) => this.waMutation.emit(event));
  }

  private setAttr(name: string, value: string | null | undefined) {
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
