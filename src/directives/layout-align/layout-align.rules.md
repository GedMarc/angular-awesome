# Align Items Directive Rules

The `[waAlignItems]` attribute directive provides a typed, ergonomic way to apply Web Awesome align-items utility classes to any container (divs, sections, or Web Awesome layout primitives like clusters, stacks, splits, flanks, and grids).

## Overview
- Shorthand values accepted: `start | end | center | stretch | baseline`.
- Alternatively, pass full class names: `wa-align-items-start | wa-align-items-end | wa-align-items-center | wa-align-items-stretch | wa-align-items-baseline`.
- The directive toggles the appropriate utility class on the host element, enabling strong IDE autocomplete via the exported `WaAlignItemsValue` type.

## Usage
```html
<!-- Cluster example -->
<div class="wa-cluster wa-gap-s" [waAlignItems]="'center'">
  <wa-button>One</wa-button>
  <wa-button>Two</wa-button>
  <wa-button>Three</wa-button>
</div>

<!-- Stack with baseline alignment -->
<div class="wa-stack wa-gap-xs" [waAlignItems]="'baseline'">
  <h3 class="wa-heading-m">Title</h3>
  <p class="wa-body-s">Description</p>
</div>
```

## API Reference
- Selector: `[waAlignItems]`
- Input: `waAlignItems: WaAlignItemsValue | null`
- Type: `export type WaAlignItemsValue = 'start' | 'end' | 'center' | 'stretch' | 'baseline' | 'wa-align-items-start' | 'wa-align-items-end' | 'wa-align-items-center' | 'wa-align-items-stretch' | 'wa-align-items-baseline'`

## Styling
The directive only adds the corresponding `wa-align-items-*` class. Styling comes from the Web Awesome CSS bundle shipped by the consumer as described in RULES.md under "Global Requirements (for Consumers)".
