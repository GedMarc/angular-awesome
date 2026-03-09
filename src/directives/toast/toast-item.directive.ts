import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, Renderer2, inject } from '@angular/core';

/**
 * WaToastItemDirective
 *
 * Angular wrapper for the <wa-toast-item> Web Component.
 * Toast items are individual notifications displayed within a <wa-toast> container.
 *
 * Features:
 * - Binds all supported toast item attributes as @Input() properties
 * - Supports variant, size, and duration configuration
 * - Emits lifecycle events (wa-show, wa-after-show, wa-hide, wa-after-hide)
 * - Provides programmatic hide() method
 * - Allows slot projection for message content and icon
 * - Supports custom styling via CSS variables
 */
@Directive({
  selector: 'wa-toast-item',
  standalone: true
})
export class WaToastItemDirective implements OnInit, OnChanges, OnDestroy {
  /** The toast item's variant. */
  @Input() variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral' | string;

  /** The toast item's size. */
  @Input() size?: 'small' | 'medium' | 'large' | string;

  /**
   * The length of time in milliseconds before the toast item is automatically dismissed.
   * Set to 0 to keep the toast item open until the user dismisses it.
   */
  @Input() duration?: number | string;

  // Event outputs
  @Output() waShow = new EventEmitter<Event>();
  @Output('wa-show') waShowHyphen = this.waShow;
  @Output() waAfterShow = new EventEmitter<Event>();
  @Output('wa-after-show') waAfterShowHyphen = this.waAfterShow;
  @Output() waHide = new EventEmitter<Event>();
  @Output('wa-hide') waHideHyphen = this.waHide;
  @Output() waAfterHide = new EventEmitter<Event>();
  @Output('wa-after-hide') waAfterHideHyphen = this.waAfterHide;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private eventCleanups: (() => void)[] = [];

  ngOnInit() {
    this.applyInputs();
    this.setupEventListeners();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs() {
    this.setAttr('variant', this.variant);
    this.setAttr('size', this.size);
    this.setAttr('duration', this.duration != null ? String(this.duration) : null);
  }

  private setupEventListeners() {
    const native = this.el.nativeElement;

    const showCleanup = this.renderer.listen(native, 'wa-show', (e: Event) => this.waShow.emit(e));
    const afterShowCleanup = this.renderer.listen(native, 'wa-after-show', (e: Event) => this.waAfterShow.emit(e));
    const hideCleanup = this.renderer.listen(native, 'wa-hide', (e: Event) => this.waHide.emit(e));
    const afterHideCleanup = this.renderer.listen(native, 'wa-after-hide', (e: Event) => this.waAfterHide.emit(e));

    this.eventCleanups.push(showCleanup, afterShowCleanup, hideCleanup, afterHideCleanup);
  }

  /**
   * Hides the toast item with animation and removes it from the DOM.
   */
  public hide(): void {
    const native = this.el.nativeElement;
    if (typeof native.hide === 'function') {
      native.hide();
    }
  }

  /**
   * Exposes the native toast item element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Sets an attribute on the native element if the value is not null or undefined
   */
  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  ngOnDestroy() {
    this.eventCleanups.forEach(fn => fn());
  }
}



