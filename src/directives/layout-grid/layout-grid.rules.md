# Grid Directive Rules

The `[waGrid]` attribute directive provides a typed, ergonomic way to apply the Web Awesome `wa-grid` layout primitive to any container. It also exposes common sizing options via CSS custom properties. Use `[waGridSpan]` on a child to make it span all columns.

## Overview
- Base behavior: toggles `wa-grid` on the host element when enabled.
- Options via inputs map to CSS variables:
  - `minColumnSize` → `--min-column-size` (e.g., `20ch`, `16rem`, `200px`). Controls the minimum column size for auto-fit grids.
  - `columns` → `--columns` (number). When provided, can be used by your theme to set an explicit number of columns.
  - `rowSize` → `--row-size`. Custom row sizing when supported by your theme.
- Full-span helper: `[waGridSpan]` on a child adds `wa-span-grid` so it spans all columns.
- Works great together with `[waGap]` and `[waAlignItems]`.

## Usage
```html
<!-- Basic grid with default min column size (theme default ~20ch) -->
<div waGrid>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>

<!-- Grid of cards with custom min column size -->
<div waGrid [minColumnSize]="'25ch'">
  <div class="wa-stack wa-gap-s">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1520763185298-1b434c919102?q=20" alt="" />
    </div>
    <h3 class="wa-heading-s">Tulip</h3>
    <em>Tulipa gesneriana</em>
  </div>
  <div class="wa-stack wa-gap-s">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1591767134492-338e62f7b5a2?q=20" alt="" />
    </div>
    <h3 class="wa-heading-s">Peony</h3>
    <em>Paeonia officinalis</em>
  </div>
  <div class="wa-stack wa-gap-s">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1590872000386-4348c6393115?q=20" alt="" />
    </div>
    <h3 class="wa-heading-s">Poppy</h3>
    <em>Papaver rhoeas</em>
  </div>
</div>

<!-- Dashboard-style cards with larger min column size -->
<div waGrid [minColumnSize]="'30ch'">
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="globe"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-caption-s">Population (Zion)</span>
        <span class="wa-cluster wa-gap-xs">
          <span class="wa-heading-xl">251,999</span>
          <wa-badge variant="danger">-3%&nbsp;<wa-icon name="arrow-trend-down"></wa-icon></wa-badge>
        </span>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="brain-circuit"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-caption-s">Minds Freed</span>
        <span class="wa-cluster wa-gap-xs">
          <span class="wa-heading-xl">0.36%</span>
          <wa-badge variant="success">+0.03%&nbsp;<wa-icon name="arrow-trend-up"></wa-icon></wa-badge>
        </span>
      </div>
    </div>
  </wa-card>
</div>

<!-- Sizing examples -->
<div class="wa-stack">
  <div waGrid [minColumnSize]="'200px'">
    <div></div><div></div><div></div><div></div><div></div><div></div>
  </div>
  <div waGrid [minColumnSize]="'6rem'">
    <div></div><div></div><div></div><div></div><div></div><div></div>
  </div>
</div>

<!-- Gap examples -->
<div class="wa-stack">
  <div waGrid [waGap]="'2xs'">
    <div></div><div></div><div></div><div></div><div></div><div></div>
  </div>
  <div waGrid [waGap]="'2xl'">
    <div></div><div></div><div></div><div></div><div></div><div></div>
  </div>
</div>

<!-- Span Grid -->
<div waGrid>
  <div></div>
  <div></div>
  <div waGridSpan></div>
  <div></div>
  <div></div>
</div>
```

## API Reference
- Selector: `[waGrid]`
- Inputs:
  - `waGrid: boolean | string | null` (enables the directive; attribute presence is treated as true)
  - `minColumnSize?: string | null` (sets `--min-column-size`)
  - `columns?: number | string | null` (sets `--columns`)
  - `rowSize?: string | null` (sets `--row-size`)

- Full-span child helper:
  - Selector: `[waGridSpan]`
  - Input: `waGridSpan: boolean | string | null` (adds or removes `wa-span-grid`)

## Styling
This directive only adds `wa-grid` and sets common CSS custom properties used by the Web Awesome grid utilities. All layout behavior is provided by the Web Awesome CSS bundle as described in RULES.md under "Global Requirements (for Consumers)".
