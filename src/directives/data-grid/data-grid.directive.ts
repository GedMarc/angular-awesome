import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, inject } from '@angular/core';

/** A single row object rendered by the grid. */
export type DataGridRow = Record<string, unknown>;

/** A column definition for the data grid. Mirrors the web component's `DataGridColumn`. */
export interface DataGridColumn {
  id?: string;
  field?: string;
  header?: string;
  [key: string]: unknown;
}

/** A single sort descriptor. */
export interface DataGridSort {
  id: string;
  desc: boolean;
}

/** The grid's sorting state. */
export type SortingState = DataGridSort[];

/** A single column filter descriptor. */
export interface DataGridFilter {
  id: string;
  value: unknown;
}

/** The request payload passed to a `dataSource` callback or emitted with `wa-data-request`. */
export interface DataGridRequest {
  sort: SortingState;
  filters: DataGridFilter[];
  searchTerm: string;
  page: number;
  pageSize: number;
  [key: string]: unknown;
}

/** The response a `dataSource` callback resolves to. */
export interface DataGridResponse {
  rows: DataGridRow[];
  total: number;
}

/** A serializable snapshot of the grid's view state. */
export type DataGridState = Record<string, unknown>;

/**
 * WaDataGridDirective
 *
 * Angular wrapper for the `<wa-data-grid>` Web Awesome component (added in Web Awesome 3.11).
 *
 * Data grids display tabular data with sorting, selection, pagination, and virtualization for
 * large datasets.
 *
 * Features:
 * - Simple, reflected configuration (`selectable`, `paginate`, `page-size`, sizing, etc.) is bound
 *   as HTML attributes
 * - Rich data and callbacks (`data`, `columns`, `dataSource`, `rowDetail`, `sort`, `selectedKeys`,
 *   ...) are assigned as DOM properties so objects, arrays, and functions pass through intact
 * - Emits every documented event (sort, selection, paging, filtering, expansion, server data,
 *   column move/resize/visibility/pin, and cell click/contextmenu), each exposed as a camelCase
 *   output plus a hyphenated alias
 * - Exposes the full method surface (pinning, expansion, sizing, CSV export, clipboard, state)
 * - Supports styling every themeable token through CSS custom property inputs
 */
@Directive({
  selector: 'wa-data-grid',
  standalone: true
})
export class WaDataGridDirective implements OnInit, OnChanges, OnDestroy {
  // Property inputs (objects / arrays / functions / dynamic state) — assigned as DOM properties
  /** The row objects to display. In client mode this is the full set. */
  @Input() data?: DataGridRow[];
  /** The column definitions. */
  @Input() columns?: DataGridColumn[];
  /** A predicate deciding whether a row can be selected. */
  @Input() selectableRows?: ((row: DataGridRow) => boolean) | null;
  /** The page sizes offered by the pager's page-size selector. */
  @Input() pageSizeOptions?: number[];
  /** The current page index (0-based). */
  @Input() page?: number;
  /** The current global search term. */
  @Input() searchTerm?: string;
  /** Renders an expandable detail panel for a row. */
  @Input() rowDetail?: ((row: DataGridRow) => unknown) | null;
  /** Returns extra CSS class names for a row. */
  @Input() rowClass?: ((row: DataGridRow) => string | null | undefined) | null;
  /** Provides each row's child rows for tree data — a field name or a function. */
  @Input() childRows?: string | ((row: DataGridRow) => DataGridRow[] | undefined) | null;
  /** Groups rows by column id — a single id, a delimited list, or an array. */
  @Input() groupBy?: string | string[] | null;
  /** An async function that loads data from a server. Switches the grid to manual mode. */
  @Input() dataSource?: ((request: DataGridRequest) => Promise<DataGridResponse>) | null;
  /** A custom predicate for the global search box. */
  @Input() searchFn?: ((value: unknown, searchTerm: string, row: DataGridRow) => boolean) | null;
  /** The total row count in server mode. */
  @Input() total?: number;
  /** Whether a `dataSource` request is in flight. */
  @Input() loading?: boolean;
  /** The sort state, e.g. `[{ id: 'name', desc: false }]`. */
  @Input() sort?: SortingState;
  /** The column display order as an array of column ids. */
  @Input() columnOrder?: string[];
  /** The `rowKey` values of the currently selected rows. */
  @Input() selectedKeys?: (string | number)[];
  /** The selected row objects. */
  @Input() selectedRows?: DataGridRow[];
  /** The row keys of the currently expanded rows. */
  @Input() expandedKeys?: (string | number)[];
  /** The column filters, e.g. `[{ id: 'category', value: 'Lighting' }]`. */
  @Input() filters?: DataGridFilter[];

  // Attribute inputs (primitive, reflected configuration)
  /** The field used as a stable row id for selection. Maps to `row-key`. */
  @Input() rowKey?: string | null;
  /** Enables row selection. A bare attribute means `multiple`. Default `none`. */
  @Input() selectable?: '' | 'single' | 'multiple' | 'none' | boolean | string;
  /** Enables client-side pagination and the pager footer. */
  @Input() paginate?: boolean | string;
  /** The number of rows per page. Maps to `page-size`. Default `20`. */
  @Input() pageSize?: number | string;
  /** Keeps a sorted column always sorted. Maps to `without-sort-removal`. */
  @Input() withoutSortRemoval?: boolean | string;
  /** First sort click sorts descending. Maps to `sort-desc-first`. */
  @Input() sortDescFirst?: boolean | string;
  /** Max columns in a multi-column sort. `0` means no limit. Maps to `max-multi-sort`. */
  @Input() maxMultiSort?: number | string;
  /** Shows a global search box. Maps to `with-search`. */
  @Input() withSearch?: boolean | string;
  /** Enables drag-to-resize for columns. */
  @Input() resizable?: boolean | string;
  /** Enables drag-to-reorder for columns. */
  @Input() reorderable?: boolean | string;
  /** Enables column pinning. */
  @Input() pinnable?: boolean | string;
  /** Shows a per-column header menu. Maps to `with-column-menu`. */
  @Input() withColumnMenu?: boolean | string;
  /** Shows a toolbar menu for toggling column visibility. Maps to `with-columns-menu`. */
  @Input() withColumnsMenu?: boolean | string;
  /** Renders alternating row background colors. */
  @Input() striped?: boolean | string;
  /** Keeps a parent visible when a descendant matches. Maps to `filter-from-leaf-rows`. */
  @Input() filterFromLeafRows?: boolean | string;
  /** Switches the grid to server mode. */
  @Input() server?: boolean | string;
  /** Debounce (ms) before requesting data in server mode. Maps to `filter-debounce`. Default `250`. */
  @Input() filterDebounce?: number | string;
  /** An accessible label for the grid. */
  @Input() label?: string | null;
  /** The grid's visual appearance. Default `outlined`. */
  @Input() appearance?: 'outlined' | 'plain' | string;
  /** The grid's size. Default `m`. */
  @Input() size?: string;

  // Style inputs (CSS custom properties)
  @Input() set accentColor(v: string | undefined) { this.setCssVar('--accent-color', v); }
  @Input() set backgroundColor(v: string | undefined) { this.setCssVar('--background-color', v); }
  @Input() set textColor(v: string | undefined) { this.setCssVar('--text-color', v); }
  @Input() set borderColor(v: string | undefined) { this.setCssVar('--border-color', v); }
  @Input() set borderWidth(v: string | undefined) { this.setCssVar('--border-width', v); }
  @Input() set borderRadius(v: string | undefined) { this.setCssVar('--border-radius', v); }
  @Input() set maxHeight(v: string | undefined) { this.setCssVar('--max-height', v); }
  @Input() set rowHeight(v: string | undefined) { this.setCssVar('--row-height', v); }
  @Input() set headerRowHeight(v: string | undefined) { this.setCssVar('--header-row-height', v); }
  @Input() set cellPadding(v: string | undefined) { this.setCssVar('--cell-padding', v); }
  @Input() set headerBackground(v: string | undefined) { this.setCssVar('--header-background', v); }
  @Input() set headerTextColor(v: string | undefined) { this.setCssVar('--header-text-color', v); }
  @Input() set rowHoverBackground(v: string | undefined) { this.setCssVar('--row-hover-background', v); }
  @Input() set stripeBackground(v: string | undefined) { this.setCssVar('--stripe-background', v); }
  @Input() set selectedBackground(v: string | undefined) { this.setCssVar('--selected-background', v); }
  @Input() set focusRing(v: string | undefined) { this.setCssVar('--focus-ring', v); }
  @Input() set transitionDuration(v: string | undefined) { this.setCssVar('--transition-duration', v); }
  @Input() set indentSize(v: string | undefined) { this.setCssVar('--indent-size', v); }

  // Event outputs
  @Output() request = new EventEmitter<CustomEvent>();
  @Output() waSortChange = new EventEmitter<CustomEvent>();
  @Output('wa-sort-change') waSortChangeHyphen = this.waSortChange;
  @Output() waRowSelect = new EventEmitter<CustomEvent>();
  @Output('wa-row-select') waRowSelectHyphen = this.waRowSelect;
  @Output() waPageChange = new EventEmitter<CustomEvent>();
  @Output('wa-page-change') waPageChangeHyphen = this.waPageChange;
  @Output() waFilterChange = new EventEmitter<CustomEvent>();
  @Output('wa-filter-change') waFilterChangeHyphen = this.waFilterChange;
  @Output() waRowExpand = new EventEmitter<CustomEvent>();
  @Output('wa-row-expand') waRowExpandHyphen = this.waRowExpand;
  @Output() waRowCollapse = new EventEmitter<CustomEvent>();
  @Output('wa-row-collapse') waRowCollapseHyphen = this.waRowCollapse;
  @Output() waDataRequest = new EventEmitter<CustomEvent>();
  @Output('wa-data-request') waDataRequestHyphen = this.waDataRequest;
  @Output() waDataError = new EventEmitter<CustomEvent>();
  @Output('wa-data-error') waDataErrorHyphen = this.waDataError;
  @Output() waColumnMove = new EventEmitter<CustomEvent>();
  @Output('wa-column-move') waColumnMoveHyphen = this.waColumnMove;
  @Output() waColumnResize = new EventEmitter<CustomEvent>();
  @Output('wa-column-resize') waColumnResizeHyphen = this.waColumnResize;
  @Output() waColumnVisibilityChange = new EventEmitter<CustomEvent>();
  @Output('wa-column-visibility-change') waColumnVisibilityChangeHyphen = this.waColumnVisibilityChange;
  @Output() waColumnPin = new EventEmitter<CustomEvent>();
  @Output('wa-column-pin') waColumnPinHyphen = this.waColumnPin;
  @Output() waCellClick = new EventEmitter<CustomEvent>();
  @Output('wa-cell-click') waCellClickHyphen = this.waCellClick;
  @Output() waCellContextmenu = new EventEmitter<CustomEvent>();
  @Output('wa-cell-contextmenu') waCellContextmenuHyphen = this.waCellContextmenu;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private eventCleanups: (() => void)[] = [];

  ngOnInit(): void {
    this.applyInputs();

    const n = this.el.nativeElement;
    const listen = (name: string, emitter: EventEmitter<CustomEvent>) =>
      this.eventCleanups.push(this.renderer.listen(n, name, (e: CustomEvent) => emitter.emit(e)));

    listen('request', this.request);
    listen('wa-sort-change', this.waSortChange);
    listen('wa-row-select', this.waRowSelect);
    listen('wa-page-change', this.waPageChange);
    listen('wa-filter-change', this.waFilterChange);
    listen('wa-row-expand', this.waRowExpand);
    listen('wa-row-collapse', this.waRowCollapse);
    listen('wa-data-request', this.waDataRequest);
    listen('wa-data-error', this.waDataError);
    listen('wa-column-move', this.waColumnMove);
    listen('wa-column-resize', this.waColumnResize);
    listen('wa-column-visibility-change', this.waColumnVisibilityChange);
    listen('wa-column-pin', this.waColumnPin);
    listen('wa-cell-click', this.waCellClick);
    listen('wa-cell-contextmenu', this.waCellContextmenu);
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  ngOnDestroy(): void {
    this.eventCleanups.forEach(fn => fn());
  }

  private applyInputs(): void {
    // Reflected attribute configuration
    this.setAttr('row-key', this.rowKey);
    this.setSelectable();
    this.setBooleanAttr('paginate', this.paginate);
    this.setNumericAttr('page-size', this.pageSize);
    this.setBooleanAttr('without-sort-removal', this.withoutSortRemoval);
    this.setBooleanAttr('sort-desc-first', this.sortDescFirst);
    this.setNumericAttr('max-multi-sort', this.maxMultiSort);
    this.setBooleanAttr('with-search', this.withSearch);
    this.setBooleanAttr('resizable', this.resizable);
    this.setBooleanAttr('reorderable', this.reorderable);
    this.setBooleanAttr('pinnable', this.pinnable);
    this.setBooleanAttr('with-column-menu', this.withColumnMenu);
    this.setBooleanAttr('with-columns-menu', this.withColumnsMenu);
    this.setBooleanAttr('striped', this.striped);
    this.setBooleanAttr('filter-from-leaf-rows', this.filterFromLeafRows);
    this.setBooleanAttr('server', this.server);
    this.setNumericAttr('filter-debounce', this.filterDebounce);
    this.setAttr('label', this.label);
    this.setAttr('appearance', this.appearance);
    this.setAttr('size', this.size);

    // Property (object / array / function / dynamic state) bindings
    this.setProp('data', this.data);
    this.setProp('columns', this.columns);
    this.setProp('selectableRows', this.selectableRows);
    this.setProp('pageSizeOptions', this.pageSizeOptions);
    this.setProp('page', this.page);
    this.setProp('searchTerm', this.searchTerm);
    this.setProp('rowDetail', this.rowDetail);
    this.setProp('rowClass', this.rowClass);
    this.setProp('childRows', this.childRows);
    this.setProp('groupBy', this.groupBy);
    this.setProp('dataSource', this.dataSource);
    this.setProp('searchFn', this.searchFn);
    this.setProp('total', this.total);
    this.setProp('loading', this.loading);
    this.setProp('sort', this.sort);
    this.setProp('columnOrder', this.columnOrder);
    this.setProp('selectedKeys', this.selectedKeys);
    this.setProp('selectedRows', this.selectedRows);
    this.setProp('expandedKeys', this.expandedKeys);
    this.setProp('filters', this.filters);
  }

  private setSelectable(): void {
    const v = this.selectable;
    if (v === true || v === '') {
      // A bare attribute means `multiple`
      this.renderer.setAttribute(this.el.nativeElement, 'selectable', '');
    } else if (v === false || v == null) {
      this.renderer.removeAttribute(this.el.nativeElement, 'selectable');
    } else {
      this.renderer.setAttribute(this.el.nativeElement, 'selectable', String(v));
    }
  }

  // Read-only getters
  /** The number of pages in the current result set. Read-only. */
  public get pageCount(): number | undefined {
    return (this.el.nativeElement as any).pageCount;
  }
  /** The number of rows after filtering and search, across every page. Read-only. */
  public get filteredCount(): number | undefined {
    return (this.el.nativeElement as any).filteredCount;
  }

  /** Exposes the native data-grid element for direct interaction. */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  // Method surface — delegated to the native element when available
  private call<T>(method: string, args: unknown[] = []): T | undefined {
    const el: any = this.el.nativeElement;
    if (typeof el[method] === 'function') {
      return el[method](...args);
    }
    return undefined;
  }

  public pinColumn(columnId: string, side: 'left' | 'right' | false): void { this.call('pinColumn', [columnId, side]); }
  public getColumnPin(columnId: string): 'left' | 'right' | false | undefined { return this.call('getColumnPin', [columnId]); }
  public focus(options?: FocusOptions): void { this.call('focus', [options]); }
  public handlePageChange(): void { this.call('handlePageChange'); }
  public handleSearchTermChange(): void { this.call('handleSearchTermChange'); }
  public handleColumnsChange(): void { this.call('handleColumnsChange'); }
  public expandRow(key: string | number): void { this.call('expandRow', [key]); }
  public collapseRow(key: string | number): void { this.call('collapseRow', [key]); }
  public expandAllRows(): void { this.call('expandAllRows'); }
  public collapseAllRows(): void { this.call('collapseAllRows'); }
  public getVisibleRows(): DataGridRow[] | undefined { return this.call('getVisibleRows'); }
  public getProcessedRows(): DataGridRow[] | undefined { return this.call('getProcessedRows'); }
  public getColumnFacets(columnId: string): unknown { return this.call('getColumnFacets', [columnId]); }
  public reload(): void { this.call('reload'); }
  public toggleColumn(columnId: string, visible?: boolean): void { this.call('toggleColumn', [columnId, visible]); }
  public autoSizeColumn(columnId: string): void { this.call('autoSizeColumn', [columnId]); }
  public autoSizeColumns(): void { this.call('autoSizeColumns'); }
  public sizeColumnsToFit(): void { this.call('sizeColumnsToFit'); }
  public scrollToIndex(index: number, options?: { align?: 'start' | 'center' | 'end' }): void { this.call('scrollToIndex', [index, options]); }
  public getDataAsCsv(options?: Record<string, unknown>): string | undefined { return this.call('getDataAsCsv', [options]); }
  public exportDataAsCsv(options?: Record<string, unknown>): void { this.call('exportDataAsCsv', [options]); }
  public copySelectedRows(options?: Record<string, unknown>): number | undefined { return this.call('copySelectedRows', [options]); }
  public getState(): DataGridState | undefined { return this.call('getState'); }
  public setState(state: DataGridState): void { this.call('setState', [state]); }
  public resetState(): void { this.call('resetState'); }
  public resetColumns(): void { this.call('resetColumns'); }

  private setProp(name: string, value: unknown): void {
    if (value !== undefined) {
      (this.el.nativeElement as any)[name] = value;
    }
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

  private setCssVar(name: string, value: string | null | undefined): void {
    if (value != null && value !== '') {
      this.el.nativeElement.style.setProperty(name, value);
    } else {
      this.el.nativeElement.style.removeProperty(name);
    }
  }
}

