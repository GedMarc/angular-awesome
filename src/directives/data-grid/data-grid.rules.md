## Data Grid Rules

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

The `wa-data-grid` Web Awesome component is wrapped as a standalone Angular directive with full binding and integration support. It was introduced in Web Awesome 3.11.

### Selector

`wa-data-grid`

### Overview

Data grids display tabular data with sorting, selection, pagination, and virtualization for large datasets. They support client-side and server-side data, tree/grouped rows, column pinning/reordering/resizing, filtering, and CSV export.

### Description

The directive splits its inputs into two groups:

* **Reflected configuration** (`rowKey`, `selectable`, `paginate`, `pageSize`, sizing, appearance, etc.) is applied as HTML attributes.
* **Rich data and callbacks** (`data`, `columns`, `dataSource`, `rowDetail`, `rowClass`, `sort`, `selectedKeys`, `filters`, ...) are assigned as DOM properties so objects, arrays, and functions pass through intact.

### Inputs — Data & Callbacks (bound as DOM properties)

| Input             | Type                                                              | Description                                                              |
| ----------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `data`            | `DataGridRow[]`                                                   | The row objects to display (full set in client mode).                    |
| `columns`         | `DataGridColumn[]`                                                | The column definitions.                                                  |
| `selectableRows`  | `(row) => boolean`                                               | A predicate deciding whether a row can be selected.                      |
| `pageSizeOptions` | `number[]`                                                        | Page sizes offered by the pager's page-size selector. Default `[10,20,50,100]`. |
| `page`            | `number`                                                         | The current page index (0-based). Also set programmatically as `grid.page`. |
| `searchTerm`      | `string`                                                         | The current global search term.                                          |
| `rowDetail`       | `(row) => string \| TemplateResult \| Node`                     | Renders an expandable detail panel for a row.                            |
| `rowClass`        | `(row) => string \| null`                                       | Returns extra CSS class names for a row.                                 |
| `childRows`       | `string \| ((row) => Row[])`                                    | Provides each row's child rows for tree data. Maps to `child-rows`.      |
| `groupBy`         | `string \| string[]`                                            | Groups rows by column id. Maps to `group-by`.                            |
| `dataSource`      | `(request) => Promise<DataGridResponse>`                        | Loads data from a server; switches the grid to manual mode.             |
| `searchFn`        | `(value, term, row) => boolean`                                | A custom predicate for the global search box (client mode only).        |
| `total`           | `number`                                                         | The total row count in server mode. Default `-1`.                        |
| `loading`         | `boolean`                                                        | Whether a `dataSource` request is in flight.                            |
| `sort`            | `SortingState`                                                   | Get/set the sort state, e.g. `[{ id: 'name', desc: false }]`.           |
| `columnOrder`     | `string[]`                                                       | Get/set the column display order.                                       |
| `selectedKeys`    | `(string \| number)[]`                                          | The `rowKey` values of the currently selected rows.                     |
| `selectedRows`    | `DataGridRow[]`                                                  | The selected row objects, resolved by key.                              |
| `expandedKeys`    | `(string \| number)[]`                                          | The row keys of the currently expanded rows.                            |
| `filters`         | `{ id: string; value: unknown }[]`                             | Get/set the column filters.                                             |

### Inputs — Reflected Configuration (bound as attributes)

| Input               | Type                                    | HTML Attribute            | Description                                                       |
| ------------------- | --------------------------------------- | ------------------------- | ---------------------------------------------------------------- |
| `rowKey`            | `string`                                | `row-key`                 | The field used as a stable row id for selection.                 |
| `selectable`        | `'' \| 'single' \| 'multiple' \| 'none'` | `selectable`             | Enables row selection. A bare/`true` value means `multiple`. Default `none`. |
| `paginate`          | `boolean`                               | `paginate`                | Enables client-side pagination and the pager footer.             |
| `pageSize`          | `number`                                | `page-size`               | Rows per page. Default `20`.                                     |
| `withoutSortRemoval`| `boolean`                               | `without-sort-removal`    | Keeps a sorted column always sorted.                             |
| `sortDescFirst`     | `boolean`                               | `sort-desc-first`         | First sort click sorts descending.                              |
| `maxMultiSort`      | `number`                                | `max-multi-sort`          | Max columns in a multi-column sort. `0` = no limit.             |
| `withSearch`        | `boolean`                               | `with-search`             | Shows a global search box.                                      |
| `resizable`         | `boolean`                               | `resizable`               | Enables drag-to-resize for columns.                            |
| `reorderable`       | `boolean`                               | `reorderable`             | Enables drag-to-reorder for columns.                          |
| `pinnable`          | `boolean`                               | `pinnable`                | Enables column pinning.                                        |
| `withColumnMenu`    | `boolean`                               | `with-column-menu`        | Shows a per-column header menu.                               |
| `withColumnsMenu`   | `boolean`                               | `with-columns-menu`       | Shows a toolbar menu for toggling column visibility.         |
| `striped`           | `boolean`                               | `striped`                 | Renders alternating row background colors.                    |
| `filterFromLeafRows`| `boolean`                               | `filter-from-leaf-rows`   | Keeps a parent visible when a descendant matches.            |
| `server`            | `boolean`                               | `server`                  | Switches the grid to server mode.                            |
| `filterDebounce`    | `number`                                | `filter-debounce`         | Debounce (ms) before requesting data in server mode. Default `250`. |
| `label`             | `string`                                | `label`                   | An accessible label for the grid.                            |
| `appearance`        | `'outlined' \| 'plain'`                 | `appearance`              | The grid's visual appearance. Default `outlined`.           |
| `size`              | `SizeToken`                             | `size`                    | The grid's size. Default `m`.                               |

### Outputs

Every output is bindable both as camelCase and hyphenated: `waSortChange` / `(wa-sort-change)`, etc.

| Output                     | Description                                                                    |
| -------------------------- | ------------------------------------------------------------------------------ |
| `request`                  | Low-level data request event.                                                  |
| `waSortChange`             | The sort order changed.                                                         |
| `waRowSelect`              | The row selection changed.                                                      |
| `waPageChange`             | The current page or page size changed.                                          |
| `waFilterChange`           | The global search or a column filter changed.                                   |
| `waRowExpand`              | A row expanded (a detail panel or a tree row's children).                        |
| `waRowCollapse`            | A row collapsed.                                                                 |
| `waDataRequest`            | Server mode: the grid needs data for the current sort, filters, and page.        |
| `waDataError`              | Server mode: a `dataSource` request rejected.                                    |
| `waColumnMove`             | A column was reordered (check `detail.finished`).                               |
| `waColumnResize`           | A column was resized (check `detail.finished`).                                  |
| `waColumnVisibilityChange` | The user showed or hid a column via the built-in menus.                         |
| `waColumnPin`              | The user pinned or unpinned a column via the built-in controls.                 |
| `waCellClick`              | A data cell was clicked, or Enter was pressed on the active cell.               |
| `waCellContextmenu`        | A data cell was right-clicked (cancel to suppress the native menu).             |

### Properties (read-only)

| Property        | Returns  | Description                                                     |
| --------------- | -------- | -------------------------------------------------------------- |
| `pageCount`     | `number` | The number of pages in the current result set.                 |
| `filteredCount` | `number` | The number of rows after filtering and search, across pages.   |

### Methods

`pinColumn(columnId, side)`, `getColumnPin(columnId)`, `focus(options?)`, `expandRow(key)`, `collapseRow(key)`, `expandAllRows()`, `collapseAllRows()`, `getVisibleRows()`, `getProcessedRows()`, `getColumnFacets(columnId)`, `reload()`, `toggleColumn(columnId, visible?)`, `autoSizeColumn(columnId)`, `autoSizeColumns()`, `sizeColumnsToFit()`, `scrollToIndex(index, options?)`, `getDataAsCsv(options?)`, `exportDataAsCsv(options?)`, `copySelectedRows(options?)`, `getState()`, `setState(state)`, `resetState()`, `resetColumns()`, plus `handlePageChange()`, `handleSearchTermChange()`, and `handleColumnsChange()`.

### Slots

* `empty`: Content shown when there are no rows to display.
* `no-results`: Content shown when an active search or filter matches no rows.
* `loading`: Content shown in the loading overlay (server mode).

### Styling

Numerous CSS custom properties are available as inputs, including `accentColor` (`--accent-color`), `backgroundColor`, `textColor`, `borderColor`, `borderWidth`, `borderRadius`, `maxHeight`, `rowHeight`, `headerRowHeight`, `cellPadding`, `headerBackground`, `headerTextColor`, `rowHoverBackground`, `stripeBackground`, `selectedBackground`, `focusRing`, `transitionDuration`, and `indentSize`.

The component exposes a large CSS-part surface (`data-grid`, `toolbar`, `table`, `header`, `header-cell`, `row`, `cell`, `footer`, `pager`, etc.).

### Examples

```html
<wa-data-grid
  [data]="rows"
  [columns]="columns"
  rowKey="id"
  selectable="multiple"
  paginate
  [pageSize]="20"
  withSearch
  striped
></wa-data-grid>
```

### Notes

* Set `rowKey` whenever `selectable` is used so selection has a stable id.
* Objects, arrays, and functions must be bound (`[data]`, `[columns]`, `[dataSource]`); they are assigned as DOM properties, not attributes.
* Setting `dataSource` implies server mode; `client-side` sorting/filtering/pagination are then disabled.

---

See related components like [Pagination](../pagination/pagination.rules.md), which the grid embeds in its footer.

