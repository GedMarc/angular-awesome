import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DataGridColumn, DataGridRow, WaDataGridDirective } from './data-grid.directive';

@Component({
  template: `
    <wa-data-grid
      [data]="data"
      [columns]="columns"
      [rowKey]="rowKey"
      [selectable]="selectable"
      [paginate]="paginate"
      [pageSize]="pageSize"
      [pageSizeOptions]="pageSizeOptions"
      [page]="page"
      [withSearch]="withSearch"
      [searchTerm]="searchTerm"
      [resizable]="resizable"
      [reorderable]="reorderable"
      [pinnable]="pinnable"
      [striped]="striped"
      [maxMultiSort]="maxMultiSort"
      [filterDebounce]="filterDebounce"
      [appearance]="appearance"
      [size]="size"
      [label]="label"
      [sort]="sort"
      [selectedKeys]="selectedKeys"
      [accentColor]="accentColor"
      [maxHeight]="maxHeight"
      (waRowSelect)="onRowSelect($event)"
      (waSortChange)="onSortChange($event)"
      (waCellClick)="onCellClick($event)"
    ></wa-data-grid>
  `,
  standalone: true,
  imports: [WaDataGridDirective]
})
class TestHostComponent {
  data?: DataGridRow[];
  columns?: DataGridColumn[];
  rowKey?: string;
  selectable?: '' | 'single' | 'multiple' | 'none' | boolean | string;
  paginate?: boolean | string;
  pageSize?: number | string;
  pageSizeOptions?: number[];
  page?: number;
  withSearch?: boolean | string;
  searchTerm?: string;
  resizable?: boolean | string;
  reorderable?: boolean | string;
  pinnable?: boolean | string;
  striped?: boolean | string;
  maxMultiSort?: number | string;
  filterDebounce?: number | string;
  appearance?: string;
  size?: string;
  label?: string;
  sort?: { id: string; desc: boolean }[];
  selectedKeys?: (string | number)[];
  accentColor?: string;
  maxHeight?: string;

  lastRowSelect?: CustomEvent;
  lastSortChange?: CustomEvent;
  lastCellClick?: CustomEvent;
  onRowSelect(event: CustomEvent) { this.lastRowSelect = event; }
  onSortChange(event: CustomEvent) { this.lastSortChange = event; }
  onCellClick(event: CustomEvent) { this.lastCellClick = event; }
}

describe('WaDataGridDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let gridElement: HTMLElement;
  let directive: WaDataGridDirective;

  beforeEach(async () => {
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    gridElement = hostFixture.nativeElement.querySelector('wa-data-grid');
    directive = hostFixture.debugElement
      .query(sel => sel.nativeElement === gridElement)
      .injector.get(WaDataGridDirective);
  });

  it('should create the directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(gridElement).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should reflect primitive configuration as attributes', () => {
    hostComponent.rowKey = 'id';
    hostComponent.paginate = true;
    hostComponent.pageSize = 25;
    hostComponent.withSearch = true;
    hostComponent.resizable = true;
    hostComponent.striped = true;
    hostComponent.maxMultiSort = 3;
    hostComponent.filterDebounce = 500;
    hostComponent.appearance = 'plain';
    hostComponent.size = 'l';
    hostFixture.detectChanges();

    expect(gridElement.getAttribute('row-key')).toBe('id');
    expect(gridElement.hasAttribute('paginate')).toBeTrue();
    expect(gridElement.getAttribute('page-size')).toBe('25');
    expect(gridElement.hasAttribute('with-search')).toBeTrue();
    expect(gridElement.hasAttribute('resizable')).toBeTrue();
    expect(gridElement.hasAttribute('striped')).toBeTrue();
    expect(gridElement.getAttribute('max-multi-sort')).toBe('3');
    expect(gridElement.getAttribute('filter-debounce')).toBe('500');
    expect(gridElement.getAttribute('appearance')).toBe('plain');
    expect(gridElement.getAttribute('size')).toBe('l');
  });

  it('should render a bare selectable attribute for multiple selection', () => {
    hostComponent.selectable = true;
    hostFixture.detectChanges();
    expect(gridElement.getAttribute('selectable')).toBe('');

    hostComponent.selectable = 'single';
    hostFixture.detectChanges();
    expect(gridElement.getAttribute('selectable')).toBe('single');

    hostComponent.selectable = false;
    hostFixture.detectChanges();
    expect(gridElement.hasAttribute('selectable')).toBeFalse();
  });

  it('should assign objects and arrays as DOM properties', () => {
    const data = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
    const columns = [{ id: 'name', field: 'name', header: 'Name' }];
    const pageSizeOptions = [5, 10, 25];
    const sort = [{ id: 'name', desc: false }];
    const selectedKeys = [1];

    hostComponent.data = data;
    hostComponent.columns = columns;
    hostComponent.pageSizeOptions = pageSizeOptions;
    hostComponent.sort = sort;
    hostComponent.selectedKeys = selectedKeys;
    hostComponent.searchTerm = 'foo';
    hostComponent.page = 2;
    hostFixture.detectChanges();

    expect((gridElement as any).data).toBe(data);
    expect((gridElement as any).columns).toBe(columns);
    expect((gridElement as any).pageSizeOptions).toBe(pageSizeOptions);
    expect((gridElement as any).sort).toBe(sort);
    expect((gridElement as any).selectedKeys).toBe(selectedKeys);
    expect((gridElement as any).searchTerm).toBe('foo');
    expect((gridElement as any).page).toBe(2);
    // Complex values must not leak into attributes
    expect(gridElement.hasAttribute('data')).toBeFalse();
    expect(gridElement.hasAttribute('columns')).toBeFalse();
  });

  it('should set CSS custom properties', () => {
    hostComponent.accentColor = 'rebeccapurple';
    hostComponent.maxHeight = '40rem';
    hostFixture.detectChanges();
    expect(gridElement.style.getPropertyValue('--accent-color')).toBe('rebeccapurple');
    expect(gridElement.style.getPropertyValue('--max-height')).toBe('40rem');
  });

  it('should expose read-only getters from the native element', () => {
    (gridElement as any).pageCount = 4;
    (gridElement as any).filteredCount = 42;
    expect(directive.pageCount).toBe(4);
    expect(directive.filteredCount).toBe(42);
  });

  it('should delegate methods to the native element', () => {
    (gridElement as any).expandAllRows = jasmine.createSpy('expandAllRows');
    (gridElement as any).pinColumn = jasmine.createSpy('pinColumn');
    (gridElement as any).getDataAsCsv = jasmine.createSpy('getDataAsCsv').and.returnValue('a,b');

    directive.expandAllRows();
    directive.pinColumn('name', 'left');
    const csv = directive.getDataAsCsv({ includeHeaders: true });

    expect((gridElement as any).expandAllRows).toHaveBeenCalled();
    expect((gridElement as any).pinColumn).toHaveBeenCalledWith('name', 'left');
    expect(csv).toBe('a,b');
  });

  it('should return undefined from methods when the native method is unavailable', () => {
    expect(directive.getVisibleRows()).toBeUndefined();
    expect(directive.getState()).toBeUndefined();
  });

  it('should forward selection, sort, and cell events', () => {
    const rowSelect = new CustomEvent('wa-row-select', { detail: {} });
    const sortChange = new CustomEvent('wa-sort-change', { detail: {} });
    const cellClick = new CustomEvent('wa-cell-click', { detail: {} });

    gridElement.dispatchEvent(rowSelect);
    gridElement.dispatchEvent(sortChange);
    gridElement.dispatchEvent(cellClick);

    expect(hostComponent.lastRowSelect).toBe(rowSelect);
    expect(hostComponent.lastSortChange).toBe(sortChange);
    expect(hostComponent.lastCellClick).toBe(cellClick);
  });

  it('should expose the native element', () => {
    expect(directive.nativeElement).toBe(gridElement);
  });
});

