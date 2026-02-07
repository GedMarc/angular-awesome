import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, inject } from '@angular/core';

/**
 * WaDialogDirective
 *
 * Angular wrapper for the <wa-dialog> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported dialog attributes as @Input() properties
 * - Supports string inputs like label
 * - Supports boolean attributes like open, withoutHeader, lightDismiss
 * - Emits events for dialog lifecycle: waShow, waAfterShow, waHide, waAfterHide
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, footer, and header-actions
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control: show() and hide()
 */
@Directive({
  selector: 'wa-dialog',
  standalone: true
})
export class WaDialogDirective implements OnInit, OnChanges, OnDestroy {
  /**
   * When dialog is closed, we move all child nodes into this fragment so that
   * the dialog has no content in the DOM. When it opens again, we re-attach
   * the nodes back to the host element.
   */
  private contentFragment: DocumentFragment | null = null;
  // Boolean inputs
  @Input() open?: boolean | string;
  @Input() withoutHeader?: boolean | string;

  // Support both camelCase, kebab-case, and no-dash forms for lightDismiss
  private _lightDismiss?: boolean | string;
  @Input() set lightDismiss(val: boolean | string | undefined) { this._lightDismiss = val; }
  @Input('light-dismiss') set lightDismissKebab(val: boolean | string | undefined) { this._lightDismiss = val; }
  @Input('lightdismiss') set lightDismissNoDash(val: boolean | string | undefined) { this._lightDismiss = val; }

  // String inputs
  @Input() label?: string;

  // Style inputs
  @Input() backgroundColor?: string;
  @Input() borderRadius?: string;
  @Input() boxShadow?: string;
  @Input() spacing?: string;
  @Input() width?: string;
  @Input() showDuration?: string;
  @Input() hideDuration?: string;

  // Event outputs
  @Output() openChange = new EventEmitter<boolean>();
  @Output() waShow = new EventEmitter<void>();
  @Output('wa-show') waShowHyphen = this.waShow;
  @Output() waAfterShow = new EventEmitter<void>();
  @Output('wa-after-show') waAfterShowHyphen = this.waAfterShow;
  @Output() waHide = new EventEmitter<{ source: HTMLElement | 'overlay' | 'escape' | 'programmatic' }>();
  @Output('wa-hide') waHideHyphen = this.waHide;
  @Output() waAfterHide = new EventEmitter<void>();
  @Output('wa-after-hide') waAfterHideHyphen = this.waAfterHide;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  /**
   * Internal flag to prevent feedback loops when we programmatically write to attributes/properties
   */
  private isWriting = false;

  /** Observe attribute changes (e.g., 'open') to drive two-way binding */
  private attrObserver?: MutationObserver;

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    this.applyInputs();

    // Ensure initial content visibility matches open state once, without reacting to mid-transition changes
    if (this.isDialogOpen()) {
      this.attachProjectedContentIfNeeded();
    } else {
      this.detachProjectedContentIfNeeded();
    }

    // Set up event listeners
    this.renderer.listen(nativeEl, 'wa-show', () => {
      // Restore content as soon as dialog starts to open so internal logic sees correct DOM
      this.attachProjectedContentIfNeeded();
      this.waShow.emit();
    });
    this.renderer.listen(nativeEl, 'wa-after-show', () => {
      // Content should already be present; just emit events and sync two-way binding
      this.waAfterShow.emit();
      this.openChange.emit(true);
    });
    this.renderer.listen(nativeEl, 'wa-hide', (event: CustomEvent<{ source: HTMLElement | 'overlay' | 'escape' | 'programmatic' }>) => {
      this.waHide.emit(event.detail);
    });
    this.renderer.listen(nativeEl, 'wa-after-hide', () => {
      // Remove content only after it fully hides to avoid interfering with open/close sequence
      this.detachProjectedContentIfNeeded();
      this.waAfterHide.emit();
      this.openChange.emit(false);
    });

    // Observe 'open' attribute changes to support [(open)] two-way binding including light-dismiss close.
    try {
      this.attrObserver = new MutationObserver((mutations) => {
        if (this.isWriting) { return; }
        for (const m of mutations) {
          if (m.type === 'attributes' && m.attributeName === 'open') {
            const isOpen = (nativeEl as any).open === true || nativeEl.hasAttribute('open');
            this.openChange.emit(!!isOpen);
          }
        }
      });
      this.attrObserver.observe(nativeEl, { attributes: true, attributeFilter: ['open'] });
    } catch {}

    this.setupLabelSlotObserver();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
    // Avoid touching content presence during generic input changes; lifecycle events handle it.
  }

  ngOnDestroy(): void {
    if (this.labelSlotObserver) {
      this.labelSlotObserver.disconnect();
    }
    if (this.attrObserver) {
      try { this.attrObserver.disconnect(); } catch {}
    }
  }

  /**
   * Exposes the native dialog element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Programmatically opens the dialog
   */
  public show(): void {
    if (typeof this.el.nativeElement.show === 'function') {
      this.el.nativeElement.show();
    }
  }

  /**
   * Programmatically closes the dialog
   */
  public hide(): void {
    if (typeof this.el.nativeElement.hide === 'function') {
      this.el.nativeElement.hide();
    }
  }

  // Observe slot changes for label content
  private labelSlotObserver?: MutationObserver;

  private applyInputs(): void {
    this.isWriting = true;
    try {
      // String attribute + property for label
      if (this.label != null) {
        this.setAttr('label', this.label);
        this.setPropertySafe('label', this.label);
      }

      // Boolean attributes (add/remove) and properties
      const openBool = this.parseBool(this.open);
      const withoutHeaderBool = this.parseBool(this.withoutHeader);
      const lightDismissBool = this.parseBool(this._lightDismiss);

      this.setBooleanAttr('open', openBool);
      this.setBooleanAttr('without-header', withoutHeaderBool);
      this.setBooleanAttr('light-dismiss', lightDismissBool);

      this.setPropertySafe('open', openBool);
      this.setPropertySafe('withoutHeader', withoutHeaderBool);
      this.setPropertySafe('lightDismiss', lightDismissBool);

      // Style CSS variables
      this.setCssVar('--background-color', this.backgroundColor);
      this.setCssVar('--border-radius', this.borderRadius);
      this.setCssVar('--box-shadow', this.boxShadow);
      this.setCssVar('--spacing', this.spacing);
      this.setCssVar('--width', this.width);
      this.setCssVar('--show-duration', this.showDuration);
      this.setCssVar('--hide-duration', this.hideDuration);
    } finally {
      // Allow MutationObserver to react to external changes again
      this.isWriting = false;
    }
  }

  private setupLabelSlotObserver(): void {
    const host = this.el.nativeElement as HTMLElement;
    const target = host.querySelector('[slot="label"]') as HTMLElement | null;
    if (!target) return;

    // Initialize label from current slot content
    this.updateLabelFromSlot(target);

    this.labelSlotObserver = new MutationObserver(() => {
      this.updateLabelFromSlot(target);
    });
    this.labelSlotObserver.observe(target, {
      characterData: true,
      childList: true,
      subtree: true
    });
  }

  private updateLabelFromSlot(target: HTMLElement): void {
    const text = (target.textContent || '').trim();
    if (text) {
      this.setAttr('label', text);
      this.setPropertySafe('label', text);
    }
  }

  private setPropertySafe(name: string, value: any): void {
    try {
      this.renderer.setProperty(this.el.nativeElement as any, name, value);
    } catch {
      (this.el.nativeElement as any)[name] = value;
    }
  }

  private parseBool(v: boolean | string | null | undefined): boolean {
    return v === true || v === 'true' || v === '';
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
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
    }
  }

  /**
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    const truthy = value === true || value === 'true' || value === '';
    if (truthy) {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  /** Determine whether the dialog is currently open */
  private isDialogOpen(): boolean {
    const host = this.el.nativeElement as any;
    return host?.open === true || (host as HTMLElement).hasAttribute('open');
  }

  /**
   * Ensure that projected children exist only when dialog is open.
   * Moves children into a DocumentFragment when closed, and restores when opened.
   */
  private updateProjectedContentVisibility(): void {
    const host = this.el.nativeElement as HTMLElement;
    const shouldHaveContent = this.isDialogOpen();

    if (shouldHaveContent) {
      this.attachProjectedContentIfNeeded();
      return;
    }

    // Only detach in explicit calls (e.g., on wa-after-hide or initial setup), not on random input changes
    this.detachProjectedContentIfNeeded();
  }

  /** Explicitly attach content if it was previously detached */
  private attachProjectedContentIfNeeded(): void {
    const host = this.el.nativeElement as HTMLElement;
    if (this.contentFragment) {
      host.appendChild(this.contentFragment);
      this.contentFragment = null;
      // Reconnect label slot observer now that content is back
      this.setupLabelSlotObserver();
    }
  }

  /** Explicitly detach content if dialog is closed and content is present */
  private detachProjectedContentIfNeeded(): void {
    const host = this.el.nativeElement as HTMLElement;
    if (!this.contentFragment && !this.isDialogOpen()) {
      // Disconnect label observer since the slot content will be removed
      if (this.labelSlotObserver) {
        try { this.labelSlotObserver.disconnect(); } catch {}
        this.labelSlotObserver = undefined;
      }
      const frag = document.createDocumentFragment();
      const nodes = Array.from(host.childNodes);
      for (const node of nodes) {
        frag.appendChild(node);
      }
      this.contentFragment = frag;
    }
  }
}
