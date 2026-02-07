import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  ContentChild,
  ViewContainerRef,
  AfterContentInit
} from '@angular/core';
import { WaTabContent } from './tab-content.directive';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'wa-tab-panel',
  template: `
    <ng-content *ngIf="!lazyContent"></ng-content>
    <ng-container *ngIf="isActive() && lazyContent">
      <ng-container [ngTemplateOutlet]="lazyContent.templateRef"></ng-container>
    </ng-container>
  `,
  standalone: true,
  imports: [NgIf, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.name]': 'name',
    '[attr.active]': 'active ? "" : null'
  }
})
export class WaTabPanelComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  @Input() name!: string;
  @Input() active = false;
  /**
   * When true (and no <ng-template waTabContent> is provided), the panel will lazily attach/detach
   * its projected DOM based on active state. Note this does NOT prevent Angular component
   * instantiation; for true deferred instantiation use <ng-template waTabContent>.
   */
  @Input() lazy = false;

  @ContentChild(WaTabContent) lazyContent?: WaTabContent;

  /**
   * When the panel is inactive and no lazy content is used, we keep all child nodes in this fragment
   * so that there is no DOM footprint. When it becomes active, we append the nodes back.
   * NOTE: For modern Angular use, the [waTabContent] directive is preferred.
   */
  private contentFragment: DocumentFragment | null = null;
  private unlistenShow?: () => void;
  private unlistenWaShow?: () => void;
  private mutationObserver?: MutationObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterContentInit(): void {
    // If we have lazy content, we don't need the manual DOM manipulation
  }

  ngAfterViewInit(): void {
    const host = this.el.nativeElement as HTMLElement;

    // Only run manual DOM toggling when lazy is enabled and no dedicated lazy template is used
    if (!this.lazyContent && this.lazy) {
      // Always start by capturing any projected content; visibility handled below
      this.captureAllChildrenIntoFragment();

      // Ensure initial state reflects current active status
      this.updateProjectedContentVisibility();
    }

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

  isActive(): boolean {
    const host = this.el.nativeElement as HTMLElement;
    return host.hasAttribute('active') || !!this.active;
  }

  // Move all current child nodes into a fragment (closed/inactive state)
  private captureAllChildrenIntoFragment(): void {
    if (this.lazyContent || !this.lazy) return;
    const host = this.el.nativeElement as HTMLElement;
    if (!this.contentFragment) this.contentFragment = document.createDocumentFragment();

    const nodes: ChildNode[] = Array.from(host.childNodes);
    if (nodes.length > 0) {
      nodes.forEach(n => this.contentFragment!.appendChild(n));
    }
  }

  // Toggle children presence based on active state
  private updateProjectedContentVisibility(): void {
    if (this.lazyContent) {
      // For lazy content, we rely on Angular's change detection and the template's *ngIf
      return;
    }
    if (!this.lazy) {
      // Not in lazy mode for projected content; leave DOM as-is
      return;
    }

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
