# Gap Directive Rules

The `[waGap]` attribute directive provides a typed, ergonomic way to apply Web Awesome gap utility classes to any container (divs, sections, or layout primitives like clusters, stacks, splits, flanks, and grids).

## Overview
- Shorthand values accepted: `0 | 3xs | 2xs | xs | s | m | l | xl | 2xl | 3xl`.
- Alternatively, pass full class names: `wa-gap-0 | wa-gap-3xs | wa-gap-2xs | wa-gap-xs | wa-gap-s | wa-gap-m | wa-gap-l | wa-gap-xl | wa-gap-2xl | wa-gap-3xl`.
- Each class sets the CSS `gap` property using theme spacing tokens. Besides `wa-gap-0` which sets `gap: 0`, each corresponds to a `--wa-space-*` token in your theme.
- Gap utilities also set `display: flex` with a specificity of 0 so they can be trivially overridden.

## Usage
```html
<!-- Standalone usage -->
<div [waGap]="'m'">
  <div>Item A</div>
  <div>Item B</div>
</div>

<!-- With layout primitives -->
<div class="wa-cluster" [waGap]="'s'">
  <wa-button size="s">One</wa-button>
  <wa-button size="s" variant="filled">Two</wa-button>
</div>

<div class="wa-grid" [waGap]="'wa-gap-xl'" style="--min-column-size: 16rem">
  <wa-card>Card 1</wa-card>
  <wa-card>Card 2</wa-card>
  <wa-card>Card 3</wa-card>
</div>
```

## API Reference
- Selector: `[waGap]`
- Input: `waGap: WaGapToken | null`
- Type: `export type WaGapToken = '0' | '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | 'wa-gap-0' | 'wa-gap-3xs' | 'wa-gap-2xs' | 'wa-gap-xs' | 'wa-gap-s' | 'wa-gap-m' | 'wa-gap-l' | 'wa-gap-xl' | 'wa-gap-2xl' | 'wa-gap-3xl'`

## Styling
The directive only adds the corresponding `wa-gap-*` class. Styling comes from the Web Awesome CSS bundle as described in RULES.md under "Global Requirements (for Consumers)".
