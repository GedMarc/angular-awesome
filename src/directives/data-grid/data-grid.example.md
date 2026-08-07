# WaDataGridDirective Usage Examples

## Basic Client-Side Grid

Bind rows and columns as properties. Simple configuration is set with attributes.

```html
<wa-data-grid [data]="rows" [columns]="columns" rowKey="id"></wa-data-grid>
```

```ts
rows = [
  { id: 1, name: 'Widget', price: 9.99 },
  { id: 2, name: 'Gadget', price: 14.5 }
];

columns = [
  { id: 'name', field: 'name', header: 'Name' },
  { id: 'price', field: 'price', header: 'Price' }
];
```

## Selection and Pagination

```html
<wa-data-grid
  [data]="rows"
  [columns]="columns"
  rowKey="id"
  selectable="multiple"
  paginate
  [pageSize]="10"
  [(selectedKeys)]="selectedKeys"
  (waRowSelect)="onRowSelect($event)"
></wa-data-grid>
```

```ts
selectedKeys: (string | number)[] = [];

onRowSelect(event: CustomEvent) {
  this.selectedKeys = (event.target as any).selectedKeys;
}
```

## Search, Sorting, and Striping

```html
<wa-data-grid
  [data]="rows"
  [columns]="columns"
  rowKey="id"
  withSearch
  striped
  resizable
  [sort]="sort"
  (waSortChange)="onSortChange($event)"
></wa-data-grid>
```

```ts
sort = [{ id: 'name', desc: false }];

onSortChange(event: CustomEvent) {
  this.sort = (event.target as any).sort;
}
```

## Server-Side Data

Provide a `dataSource` callback; the grid switches to manual mode automatically.

```html
<wa-data-grid [columns]="columns" rowKey="id" paginate [pageSize]="25" [dataSource]="loadRows"></wa-data-grid>
```

```ts
loadRows = async (request: DataGridRequest) => {
  const res = await this.api.query(request);
  return { rows: res.items, total: res.total };
};
```

## Tree Data and Row Detail

```html
<wa-data-grid [data]="tree" [columns]="columns" rowKey="id" childRows="children"></wa-data-grid>

<wa-data-grid [data]="rows" [columns]="columns" rowKey="id" [rowDetail]="renderDetail"></wa-data-grid>
```

```ts
renderDetail = (row: DataGridRow) => `Notes for ${row['name']}`;
```

## Empty and No-Results Slots

```html
<wa-data-grid [data]="rows" [columns]="columns" rowKey="id" withSearch>
  <div slot="empty">No records yet.</div>
  <div slot="no-results">Nothing matches your search.</div>
</wa-data-grid>
```

## Programmatic Control and CSV Export

```html
<wa-data-grid #grid [data]="rows" [columns]="columns" rowKey="id" selectable="multiple"></wa-data-grid>

<wa-button (click)="grid.expandAllRows()">Expand all</wa-button>
<wa-button (click)="grid.exportDataAsCsv({ fileName: 'export.csv' })">Export CSV</wa-button>
```

## Styling

```html
<wa-data-grid
  [data]="rows"
  [columns]="columns"
  rowKey="id"
  striped
  accentColor="var(--wa-color-brand-fill-loud)"
  maxHeight="30rem"
  rowHeight="3rem"
></wa-data-grid>
```

