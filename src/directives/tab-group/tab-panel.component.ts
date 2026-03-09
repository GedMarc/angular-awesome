import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  ContentChild,
  AfterContentInit
} from '@angular/core';
import { WaTabContent } from './tab-content.directive';
import { NgIf, NgTemplateOutlet } from '@angular/common';

/**
 * WaTabPanelComponent
 *
 * Content rendering and lazy behavior
 * - Projected content (default): If you place elements directly inside <wa-tab-panel>,
 *   Angular will instantiate those child components eagerly at initial render. With
 *   [lazy] = true (default), this component removes the projected DOM from inactive
 *   panels and re-attaches it for the active one. This optimizes DOM size but does NOT
 *   defer Angular component instantiation or lifecycle hooks (OnInit/AfterViewInit will
 *   run at initial render for all projected children).
 *
 * - Template-based lazy content: To truly defer component instantiation until a panel
 *   becomes active, wrap the content in <ng-template waTabContent>. In this mode,
 *   only the active panel's template is instantiated; switching tabs destroys the
 *   previous instance and creates the new one. Lifecycle hooks fire on tab activation.
 *
 * Usage examples
 * 1) Projected (DOM-lazy by default, eager component instantiation):
 *   <wa-tab-panel name="tab1">
 *     <expensive-child></expensive-child>
 *   </wa-tab-panel>
 *
 * 2) True lazy instantiation (recommended for expensive children):
 *   <wa-tab-panel name="tab1">
 *     <ng-template waTabContent>
 *       <expensive-child></expensive-child>
 *     </ng-template>
 *   </wa-tab-panel>
 */
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
  // Lazy-loading of projected content is enabled by default. To render all
  // panels' projected DOM upfront, explicitly set [lazy]="false".
  @Input() lazy = true;

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
      this.el.nativeElement.style.setProperty('--padding', value);
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
