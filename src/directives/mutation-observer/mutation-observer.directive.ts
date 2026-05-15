import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, Renderer2, inject } from '@angular/core';

/**
 * WaMutationObserverDirective
 *
 * Angular wrapper for the <wa-mutation-observer> WebAwesome component.
 *
 * Features:
 * - Binds target and options inputs
 * - Native wa-mutation events are available via (wa-mutation) template binding
 * - Supports default slot projection (observed content)
 *
 * Event binding:
 * Consumers bind directly to the native DOM event: `(wa-mutation)="onMutation($event)"`.
 * Angular handles this as a standard custom-element event binding.
 */
@Directive({
  selector: 'wa-mutation-observer',
  standalone: true
})
export class WaMutationObserverDirective implements OnInit, OnChanges {
  // Inputs
  /** Element id or HTMLElement to observe. If not provided, the default slot content is observed. */
  @Input() target?: string | HTMLElement;
  /** Options bag or JSON string (attributes, childList, subtree, characterData, attributeFilter). */
  @Input() options?: any;
  /** Watches for changes to attributes. Use '*' to watch all or space-separated list for specific ones. */
  @Input() attr?: string;
  /** Whether to record the previous value of changed attributes. */
  @Input() attrOldValue?: boolean | string;
  /** Watches for changes to the character data contained within the node. */
  @Input() charData?: boolean | string;
  /** Whether to record the previous value of the node's text. */
  @Input() charDataOldValue?: boolean | string;
  /** Watches for the addition or removal of new child nodes. */
  @Input() childList?: boolean | string;
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
    this.setAttr('attr', this.attr);
    this.setBooleanAttr('attr-old-value', this.attrOldValue);
    this.setBooleanAttr('char-data', this.charData);
    this.setBooleanAttr('char-data-old-value', this.charDataOldValue);
    this.setBooleanAttr('child-list', this.childList);
    this.setBooleanAttr('disabled', this.disabled);
  }

  private setAttr(name: string, value: string | null | undefined) {
    if (value != null && value !== '') {
      this.renderer.setAttribute(this.el.nativeElement, name, String(value));
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
}
