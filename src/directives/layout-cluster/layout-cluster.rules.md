# Cluster Directive Rules

The `[waCluster]` attribute directive provides a typed, ergonomic way to apply the Web Awesome `wa-cluster` layout primitive to any container. It simply adds `wa-cluster` and, optionally, direction/wrap/justify utility classes when inputs are provided.

## Overview
- Base behavior: toggles `wa-cluster` on the host element when enabled.
- Optional inputs map to utility classes:
  - `waClusterDirection`: `row | column` (or `wa-cluster:row | wa-cluster:column`).
  - `waClusterWrap`: boolean (truthy → `wa-wrap`, falsy → `wa-nowrap`). Accepts boolean or string (e.g., `"true"`).
  - `waClusterJustify`: `start | center | end | between | around | evenly` (or the corresponding `wa-justify-*` class).
- Use with `[waGap]` for spacing and `[waAlignItems]` for cross-axis alignment.

## Usage
```html
<!-- Minimal usage: enable cluster -->
<div waCluster>
  <wa-button size="s">One</wa-button>
  <wa-button size="s" variant="outlined">Two</wa-button>
</div>

<!-- With options -->
<div waCluster [waClusterDirection]="'row'" [waClusterWrap]="true" [waClusterJustify]="'between'" [waGap]="'s" [waAlignItems]="'center'">
  <wa-tag size="small">Alpha</wa-tag>
  <wa-tag size="small">Beta</wa-tag>
  <wa-tag size="small">Gamma</wa-tag>
</div>
```

## API Reference
- Selector: `[waCluster]`
- Inputs:
  - `waCluster: boolean | string | null` (enables the directive; attribute presence is treated as true)
  - `waClusterDirection?: 'row' | 'column' | 'wa-cluster:row' | 'wa-cluster:column'`
  - `waClusterWrap?: boolean | string | null` (truthy → `wa-wrap`, falsy → `wa-nowrap`)
  - `waClusterJustify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'wa-justify-start' | 'wa-justify-center' | 'wa-justify-end' | 'wa-justify-between' | 'wa-justify-around' | 'wa-justify-evenly'`

## Styling
The directive only adds `wa-cluster` and optional layout utility classes. Styles are provided by the Web Awesome CSS bundle as described in RULES.md under "Global Requirements (for Consumers)".
