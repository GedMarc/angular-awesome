import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, inject } from '@angular/core';

/**
 * WaPaginationDirective
 *
 * Angular wrapper for the `<wa-pagination>` Web Awesome component (added in Web Awesome 3.11).
 *
 * Pagination splits long lists of content into pages, letting users navigate between them.
 *
 * Features:
 * - Binds all supported attributes as `@Input()` properties
 * - Supports the `standard` and `compact` layout formats
 * - Supports link-based rendering through `hrefTemplate` (string template or function)
 * - Emits `wa-before-page-change` (cancelable) and `wa-page-change`, each exposed both as a
 *   camelCase output and a hyphenated alias
 * - Exposes the read-only `totalPages` value and the native element for direct DOM access
 */
@Directive({
  selector: 'wa-pagination',
  standalone: true
})
export class WaPaginationDirective implements OnInit, OnChanges, OnDestroy {
  /** The total number of items to paginate. Default `0`. */
  @Input() total?: number | string;
  /** The number of items shown per page. Maps to `page-size`. Default `10`. */
  @Input() pageSize?: number | string;
  /** The current page, starting at 1. Default `1`. */
  @Input() page?: number | string;
  /** The number of pages to show on each side of the current page. Maps to `sibling-count`. Default `2`. */
  @Input() siblingCount?: number | string;
  /** The number of pages to always show at the start and end. Maps to `boundary-count`. Default `1`. */
  @Input() boundaryCount?: number | string;
  /** Hides the previous and next buttons. Maps to `without-nav`. */
  @Input() withoutNav?: boolean | string;
  /** Shows buttons that jump to the first and last pages. Maps to `with-edges`. */
  @Input() withEdges?: boolean | string;
  /** Shows a summary of the items on the current page, e.g. "1–10 of 237". Maps to `with-summary`. */
  @Input() withSummary?: boolean | string;
  /** The pagination's layout. Default `standard`. */
  @Input() format?: 'standard' | 'compact' | string;
  /**
   * A URL template used to render page items as links instead of buttons. Provide a string with
   * `{page}` as a placeholder, or a function that receives the page number and returns the URL.
   * Maps to `href-template`.
   */
  @Input() hrefTemplate?: string | ((page: number) => string);
  /** Renders nothing when there's only one page. Maps to `hide-single-page`. */
  @Input() hideSinglePage?: boolean | string;
  /** A label that describes the pagination to assistive devices. */
  @Input() label?: string;
  /** The pagination's visual appearance. Default `outlined`. */
  @Input() appearance?: 'outlined' | 'filled' | 'plain' | string;
  /** Disables the pagination. */
  @Input() disabled?: boolean | string;

  // Event outputs
  /** Emitted when the page is about to change but before it does. Cancel with `preventDefault()`. */
  @Output() waBeforePageChange = new EventEmitter<CustomEvent>();
  @Output('wa-before-page-change') waBeforePageChangeHyphen = this.waBeforePageChange;
  /** Emitted after the page changes. */
  @Output() waPageChange = new EventEmitter<CustomEvent>();
  @Output('wa-page-change') waPageChangeHyphen = this.waPageChange;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private eventCleanups: (() => void)[] = [];

  ngOnInit(): void {
    this.applyInputs();
    const n = this.el.nativeElement;
    this.eventCleanups.push(
      this.renderer.listen(n, 'wa-before-page-change', (e: CustomEvent) => this.waBeforePageChange.emit(e)),
      this.renderer.listen(n, 'wa-page-change', (e: CustomEvent) => this.waPageChange.emit(e))
    );
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  ngOnDestroy(): void {
    this.eventCleanups.forEach(fn => fn());
  }

  private applyInputs(): void {
    this.setNumericAttr('total', this.total);
    this.setNumericAttr('page-size', this.pageSize);
    this.setNumericAttr('page', this.page);
    this.setNumericAttr('sibling-count', this.siblingCount);
    this.setNumericAttr('boundary-count', this.boundaryCount);
    this.setBooleanAttr('without-nav', this.withoutNav);
    this.setBooleanAttr('with-edges', this.withEdges);
    this.setBooleanAttr('with-summary', this.withSummary);
    this.setAttr('format', this.format);
    this.setBooleanAttr('hide-single-page', this.hideSinglePage);
    this.setAttr('label', this.label);
    this.setAttr('appearance', this.appearance);
    this.setBooleanAttr('disabled', this.disabled);

    // hrefTemplate accepts a string (reflected as an attribute) or a function (set as a property)
    if (typeof this.hrefTemplate === 'function') {
      (this.el.nativeElement as any).hrefTemplate = this.hrefTemplate;
      this.renderer.removeAttribute(this.el.nativeElement, 'href-template');
    } else {
      this.setAttr('href-template', this.hrefTemplate);
    }
  }

  /** The total number of pages, derived from `total` and `pageSize`. Read-only. */
  public get totalPages(): number | undefined {
    return (this.el.nativeElement as any).totalPages;
  }

  /** Exposes the native pagination element for direct interaction. */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  private setAttr(name: string, value: string | number | null | undefined): void {
    if (value != null && value !== '') {
      this.renderer.setAttribute(this.el.nativeElement, name, String(value));
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  private setNumericAttr(name: string, value: number | string | null | undefined): void {
    if (value != null && value !== '') {
      const n = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(n)) {
        this.renderer.setAttribute(this.el.nativeElement, name, String(n));
        return;
      }
    }
    this.renderer.removeAttribute(this.el.nativeElement, name);
  }

  private setBooleanAttr(name: string, value: boolean | string | null | undefined): void {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }
}


