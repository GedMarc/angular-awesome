# Flank Directive Rules

The `[waFlank]` attribute directive provides a typed, ergonomic way to apply the Web Awesome `wa-flank` layout primitive to any container. It adds `wa-flank` and supports position, wrapping, and sizing via inputs.

## Overview
- Base behavior: toggles `wa-flank` on the host element when enabled.
- Optional inputs map to utilities and CSS vars:
  - `waFlankPosition`: `start | end` (or `wa-flank:start | wa-flank:end`). Controls which item flanks the content.
  - `waFlankNowrap`: boolean (truthy → `wa-nowrap`). When omitted or falsy, the layout can wrap.
  - `flankSize`: string mapped to `--flank-size` (e.g., `12rem`, `40px`)
  - `contentPercentage`: string mapped to `--content-percentage` (e.g., `70%`, `85%`)
- Use with `[waGap]` for spacing and `[waAlignItems]` for cross-axis alignment.

## Usage
```html
<!-- Basic flank: first item flanks by default -->
<div waFlank>
  <div></div>
  <div></div>
</div>

<!-- End position with gap (input + button) -->
<div waFlank [waFlankPosition]="'end'" [waGap]="'xs'">
  <wa-input>
    <wa-icon slot="start" name="magnifying-glass"></wa-icon>
  </wa-input>
  <wa-button>Search</wa-button>
</div>

<!-- Content min percentage override -->
<div waFlank [contentPercentage]="'70%'">
  <div></div>
  <div></div>
</div>
```

## API Reference
- Selector: `[waFlank]`
- Inputs:
  - `waFlank: boolean | string | null` (enables the directive; attribute presence is treated as true)
  - `waFlankPosition?: 'start' | 'end' | 'wa-flank:start' | 'wa-flank:end' | null`
  - `waFlankNowrap?: boolean | string | null` (truthy → `wa-nowrap`)
  - `flankSize?: string | null` (sets `--flank-size`)
  - `contentPercentage?: string | null` (sets `--content-percentage`)

## Styling
The directive only adds `wa-flank` and optional classes/variables. All visual behavior is provided by the Web Awesome CSS bundle as described in RULES.md under "Global Requirements (for Consumers)".
