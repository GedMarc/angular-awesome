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

  /**
   * When the panel is inactive, we keep all child nodes in this fragment so that
   * there is no DOM footprint. When it becomes active, we append the nodes back.
   */
  private contentFragment: DocumentFragment | null = null;
  private unlistenShow?: () => void;
  private unlistenWaShow?: () => void;
  private mutationObserver?: MutationObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const host = this.el.nativeElement as HTMLElement;

    // Always start by capturing any projected content; visibility handled below
    this.captureAllChildrenIntoFragment();

    // Ensure initial state reflects current active status
    this.updateProjectedContentVisibility();

    // Listen for possible show events emitted by the web component (defensive)
    this.unlistenShow = this.renderer.listen(host, 'show', () => this.updateProjectedContentVisibility());
    this.unlistenWaShow = this.renderer.listen(host, 'wa-show', () => this.updateProjectedContentVisibility());

    // Observe the "active" attribute to toggle content presence on changes
    this.mutationObserver = new MutationObserver(mutations => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'active') {
          this.updateProjectedContentVisibility();
        }
      }
    });
    this.mutationObserver.observe(host, { attributes: true, attributeFilter: ['active'] });
  }

  ngOnDestroy(): void {
    if (this.unlistenShow) this.unlistenShow();
    if (this.unlistenWaShow) this.unlistenWaShow();
    if (this.mutationObserver) this.mutationObserver.disconnect();
    // Allow GC of detached nodes
    this.contentFragment = null;
  }

  @Input() set padding(value: string) {
    if (value) {
      this.renderer.setStyle(this.el.nativeElement, '--padding', value);
    }
  }

  private isActive(): boolean {
    const host = this.el.nativeElement as HTMLElement;
    return host.hasAttribute('active') || !!this.active;
  }

  // Move all current child nodes into a fragment (closed/inactive state)
  private captureAllChildrenIntoFragment(): void {
    const host = this.el.nativeElement as HTMLElement;
    if (!this.contentFragment) this.contentFragment = document.createDocumentFragment();

    const nodes: ChildNode[] = Array.from(host.childNodes);
    if (nodes.length > 0) {
      nodes.forEach(n => this.contentFragment!.appendChild(n));
    }
  }

  // Toggle children presence based on active state
  private updateProjectedContentVisibility(): void {
    const host = this.el.nativeElement as HTMLElement;
    const shouldHaveContent = this.isActive();

    if (shouldHaveContent) {
      if (this.contentFragment && this.contentFragment.childNodes.length > 0) {
        host.appendChild(this.contentFragment);
        // Keep fragment instance; it becomes empty after append and can be reused
      }
      return;
    }

    // Inactive: ensure children are removed into fragment
    this.captureAllChildrenIntoFragment();
  }
}
