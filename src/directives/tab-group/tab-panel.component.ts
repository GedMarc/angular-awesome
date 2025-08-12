import { Component, Input, ElementRef, Renderer2, ChangeDetectionStrategy, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'wa-tab-panel',
  template: `<ng-content></ng-content>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.name]': 'name',
    '[attr.active]': 'active ? "" : null'
  }
})
export class WaTabPanelComponent implements AfterViewInit, OnDestroy {
  @Input() name!: string;
  @Input() active = false;

  private contentFragment: DocumentFragment | null = null;
  private contentRendered = false;
  private unlistenShow?: () => void;
  private mutationObserver?: MutationObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const host = this.el.nativeElement as HTMLElement;
    // Prepare lazy content: move all child nodes into a fragment initially
    this.captureContentIntoFragment();

    // If panel starts active, render content immediately
    if (host.hasAttribute('active') || this.active) {
      this.renderContentFromFragment();
    }

    // Listen for possible show events emitted by the web component (defensive)
    this.unlistenShow = this.renderer.listen(host, 'show', () => this.renderContentFromFragment());
    const unlistenShowWa = this.renderer.listen(host, 'wa-show', () => this.renderContentFromFragment());
    (this as any)._unlistenShowWa = unlistenShowWa;

    // Observe the "active" attribute so we can render when it becomes active
    this.mutationObserver = new MutationObserver(mutations => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'active') {
          if ((host as HTMLElement).hasAttribute('active')) {
            this.renderContentFromFragment();
          }
        }
      }
    });
    this.mutationObserver.observe(host, { attributes: true, attributeFilter: ['active'] });
  }

  ngOnDestroy(): void {
    if (this.unlistenShow) this.unlistenShow();
    if ((this as any)._unlistenShowWa) (this as any)._unlistenShowWa();
    if (this.mutationObserver) this.mutationObserver.disconnect();
    // Ensure we don't leak detached nodes
    this.contentFragment = null;
  }

  @Input() set padding(value: string) {
    if (value) {
      this.renderer.setStyle(this.el.nativeElement, '--padding', value);
    }
  }

  // Move all slotted child nodes into a fragment (to prevent initial render)
  private captureContentIntoFragment() {
    const host = this.el.nativeElement as HTMLElement;
    if (!this.contentFragment) this.contentFragment = document.createDocumentFragment();

    // If content already captured (not rendered), do nothing
    if (!this.contentRendered && this.contentFragment.childNodes.length > 0) {
      return;
    }

    const nodesToMove: ChildNode[] = [];
    host.childNodes.forEach(node => {
      nodesToMove.push(node);
    });

    if (nodesToMove.length > 0) {
      nodesToMove.forEach(n => this.contentFragment!.appendChild(n));
      this.contentRendered = false;
    }
  }

  // Render captured content back into the host when showing (only once)
  private renderContentFromFragment() {
    const host = this.el.nativeElement as HTMLElement;
    if (this.contentRendered) return;
    if (this.contentFragment && this.contentFragment.childNodes.length > 0) {
      host.appendChild(this.contentFragment);
      // contentFragment becomes empty after append; no need to recreate because we render only once
      this.contentRendered = true;
    }
  }
}
