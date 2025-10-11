# Split Directive Rules

The `[waSplit]` attribute directive provides a typed, ergonomic way to apply the Web Awesome `wa-split` layout primitive to any container. Splits are helpful for navigation, headers, and footer layouts and respect alignment and gap utilities.

## Overview
- Base behavior: toggles `wa-split` on the host element when enabled.
- Direction: `row | column` (adds `wa-split:row | wa-split:column`). Defaults to row when unspecified.
- Collapse: set `splitCollapse` to a CSS length (e.g., `40rem`) to map to `--wa-split-collapse` which can stack content when the container is narrow.
- Use with `[waGap]` for spacing and `[waAlignItems]` for cross-axis alignment.

## Usage
```html
<!-- Basic split across a row -->
<div waSplit [waGap]="'m'">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Column split inside a flank -->
<div class="wa-flank">
  <div class="wa-split:column">
    <div class="wa-stack">
      <wa-button appearance="plain"><wa-icon name="house" label="Home"></wa-icon></wa-button>
      <wa-button appearance="plain"><wa-icon name="calendar" label="Calendar"></wa-icon></wa-button>
      <wa-button appearance="plain"><wa-icon name="envelope" label="Mail"></wa-icon></wa-button>
    </div>
    <div class="wa-stack">
      <wa-divider></wa-divider>
      <wa-button appearance="plain"><wa-icon name="right-from-bracket" label="Sign Out"></wa-icon></wa-button>
    </div>
  </div>
  <div class="placeholder"></div>
</div>

<!-- Header-style row split with controls -->
<div class="wa-stack">
  <div waSplit [waGap]="'m'" [waAlignItems]="'center'">
    <wa-icon name="web-awesome" label="Web Awesome" style="font-size: 1.5rem;"></wa-icon>
    <div class="wa-cluster">
      <wa-button>Sign Up</wa-button>
      <wa-button appearance="outlined">Log In</wa-button>
    </div>
  </div>
  <div class="placeholder"></div>
</div>

<!-- Direction examples -->
<div class="wa-flank wa-align-items-start" style="block-size: 16rem;">
  <div class="wa-split:column">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split:row">
    <div></div>
    <div></div>
  </div>
</div>

<!-- Align items examples (block direction for row, inline for column) -->
<div class="wa-stack">
  <div class="wa-split wa-align-items-start" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-end" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-center" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-stretch" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
</div>

<!-- Gap examples -->
<div class="wa-stack">
  <div class="wa-split wa-gap-3xs">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-gap-3xl">
    <div></div>
    <div></div>
  </div>
</div>
```

## API Reference
- Selector: `[waSplit]`
- Inputs:
  - `waSplit: boolean | string | null` (enables the directive; attribute presence is treated as true)
  - `waSplitDirection?: 'row' | 'column' | 'wa-split:row' | 'wa-split:column' | null`
  - `splitCollapse?: string | null` (sets `--wa-split-collapse`)

## Styling
The directive only adds `wa-split` and optional direction class while setting an optional CSS variable. Visual behavior is provided by the Web Awesome CSS bundle as described in RULES.md under "Global Requirements (for Consumers)".
