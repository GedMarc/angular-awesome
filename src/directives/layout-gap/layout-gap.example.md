# Gap Directive Examples

This page shows how to use the `[waGap]` directive and the underlying `wa-gap-*` classes with Web Awesome layout utilities.

## Standalone container gap
```html
<div [waGap]="'m'">
  <div class="demo-box">A</div>
  <div class="demo-box">B</div>
  <div class="demo-box">C</div>
</div>
```

## Cluster spacing
```html
<div class="wa-cluster" [waGap]="'s'">
  <wa-button size="s">One</wa-button>
  <wa-button size="s" variant="outlined">Two</wa-button>
  <wa-button size="s" variant="filled">Three</wa-button>
</div>
```

## Grid spacing
```html
<div class="wa-grid" [waGap]="'xl'" style="--min-column-size: 16rem">
  <wa-card>Card 1</wa-card>
  <wa-card>Card 2</wa-card>
  <wa-card>Card 3</wa-card>
  <wa-card>Card 4</wa-card>
</div>
```

## Using full class names
```html
<div class="wa-stack" [waGap]="'wa-gap-2xs'">
  <div>Line 1</div>
  <div>Line 2</div>
  <div>Line 3</div>
</div>
```
