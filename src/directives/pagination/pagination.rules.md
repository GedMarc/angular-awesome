## Pagination Rules

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

The `wa-pagination` Web Awesome component is wrapped as a standalone Angular directive with full binding and integration support. It was introduced in Web Awesome 3.11.

### Selector

`wa-pagination`

### Overview

Pagination splits long lists of content into pages, letting users navigate between them. Use it to keep large result sets manageable in tables, search results, product listings, and galleries.

### Description

The component derives its page list from `total` and `pageSize`. The `standard` format shows the full page list with ellipses, while `compact` collapses it into a short "1 of 5" label flanked by the previous and next buttons. Set `hrefTemplate` to render page items as links for SSR/SEO/no-JS support.

### Inputs

| Input             | Type                                    | Binding Required | Description                                                                                       |
| ----------------- | --------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------- |
| `total`           | `number`                                | No               | The total number of items to paginate. Default `0`.                                               |
| `pageSize`        | `number`                                | No               | The number of items shown per page. Maps to `page-size`. Default `10`.                            |
| `page`            | `number`                                | No               | The current page, starting at 1. Default `1`.                                                     |
| `siblingCount`    | `number`                                | No               | The number of pages to show on each side of the current page. Maps to `sibling-count`. Default `2`. |
| `boundaryCount`   | `number`                                | No               | The number of pages to always show at the start and end. Maps to `boundary-count`. Default `1`.   |
| `withoutNav`      | `boolean`                               | No               | Hides the previous and next buttons. Maps to `without-nav`.                                        |
| `withEdges`       | `boolean`                               | No               | Shows buttons that jump to the first and last pages. Maps to `with-edges`.                         |
| `withSummary`     | `boolean`                               | No               | Shows a summary of the items on the current page. Maps to `with-summary`.                          |
| `format`          | `'standard' \| 'compact'`               | No               | The pagination's layout. Default `standard`.                                                       |
| `hrefTemplate`    | `string \| ((page: number) => string)` | No               | Renders page items as links. Use `{page}` in a string template, or supply a function. Maps to `href-template`. |
| `hideSinglePage`  | `boolean`                               | No               | Renders nothing when there's only one page. Maps to `hide-single-page`.                            |
| `label`           | `string`                                | No               | An accessible label announced by screen readers.                                                  |
| `appearance`      | `'outlined' \| 'filled' \| 'plain'`     | No               | The pagination's visual appearance. Default `outlined`.                                            |
| `disabled`        | `boolean`                               | No               | Disables the pagination.                                                                           |

### Outputs

| Output               | Event Payload | Description                                                                                                          |
| -------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------ |
| `waBeforePageChange` | `CustomEvent` | Emitted when the page is about to change but before it does. Cancel with `event.preventDefault()`. Also bindable as `(wa-before-page-change)`. |
| `waPageChange`       | `CustomEvent` | Emitted after the page changes. Also bindable as `(wa-page-change)`.                                                |

### Properties

| Property     | Returns  | Description                                                        |
| ------------ | -------- | ----------------------------------------------------------------- |
| `totalPages` | `number` | Read-only. The total number of pages, derived from `total` and `pageSize`. |

### Slots

* `previous-icon`: An icon to use in lieu of the default previous icon.
* `next-icon`: An icon to use in lieu of the default next icon.
* `first-icon`: An icon to use in lieu of the default first icon.
* `last-icon`: An icon to use in lieu of the default last icon.

### Styling

The component exposes numerous CSS parts for styling, including `pagination`, `button`, `previous-button`, `next-button`, `first-button`, `last-button`, `pages`, `page`, `page-current`, `ellipsis`, `summary`, and `label`.

> **Deprecation:** The `base` CSS part is deprecated. Use the `pagination` part instead.

### Examples

```html
<wa-pagination [total]="237" [pageSize]="10" [page]="1" with-summary></wa-pagination>
```

### Notes

* Pages are 1-based (`page="1"` is the first page).
* Use the `compact` format inside tight spaces such as toolbars and cards.
* When `hrefTemplate` is a function it is assigned as a DOM property; string templates reflect to the `href-template` attribute.

---

See related components like [Data Grid](../data-grid/data-grid.rules.md), which embeds a `<wa-pagination>` in its footer.

