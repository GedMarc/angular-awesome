# WaPaginationDirective Usage Examples

## Basic Usage

Derive the page list from the total item count and page size.

```html
<wa-pagination [total]="237" [pageSize]="10"></wa-pagination>
```

## Current Page and Summary

```html
<wa-pagination [total]="237" [pageSize]="10" [page]="3" withSummary></wa-pagination>
```

## Compact Layout

Collapse the full page list into a short "1 of N" label for tight spaces.

```html
<wa-pagination [total]="120" [pageSize]="20" format="compact"></wa-pagination>
```

## Edge Buttons and Hidden Nav

```html
<wa-pagination [total]="500" [pageSize]="25" withEdges></wa-pagination>
<wa-pagination [total]="500" [pageSize]="25" withoutNav></wa-pagination>
```

## Link-Based Pagination (SSR / SEO)

Render each page item as an `<a>` element using a string template with `{page}`.

```html
<wa-pagination [total]="200" [pageSize]="20" hrefTemplate="/products?page={page}"></wa-pagination>
```

Or supply a function in TypeScript:

```html
<wa-pagination #pager [total]="200" [pageSize]="20" [hrefTemplate]="hrefFn"></wa-pagination>
```

```ts
hrefFn = (page: number) => `/products/${page}`;
```

## Reacting to Page Changes

```html
<wa-pagination
  [total]="237"
  [pageSize]="10"
  [page]="page"
  (waPageChange)="onPageChange($event)"
  (waBeforePageChange)="onBeforePageChange($event)"
></wa-pagination>
```

```ts
page = 1;

onBeforePageChange(event: CustomEvent) {
  // Cancel navigation if there are unsaved changes
  if (this.hasUnsavedChanges) {
    event.preventDefault();
  }
}

onPageChange(event: CustomEvent) {
  this.page = (event.target as any).page;
  this.loadPage(this.page);
}
```

## Custom Navigation Icons

```html
<wa-pagination [total]="80" [pageSize]="10" withEdges>
  <wa-icon slot="first-icon" name="angles-left"></wa-icon>
  <wa-icon slot="previous-icon" name="chevron-left"></wa-icon>
  <wa-icon slot="next-icon" name="chevron-right"></wa-icon>
  <wa-icon slot="last-icon" name="angles-right"></wa-icon>
</wa-pagination>
```

