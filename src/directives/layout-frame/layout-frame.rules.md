# Frame Directive Rules

The `[waFrame]` attribute directive provides a typed, ergonomic way to apply the Web Awesome `wa-frame` layout primitive to any container. Frames are well-suited for images and placeholders and support common aspect ratios and border radii.

## Overview
- Base behavior: toggles `wa-frame` on the host element when enabled.
- Aspect Ratio options:
  - Token: `square | landscape | portrait` (adds `wa-frame:square|landscape|portrait`).
  - Custom: provide `aspectRatio` string to set CSS `aspect-ratio` (e.g., `4 / 3`).
- Border Radius options:
  - Token: `s | m | l | pill | circle | square` (adds `wa-border-radius-*`).
  - Custom: provide `borderRadius` string to set style `border-radius`.
- Object Fit: optional `objectFit` sets the CSS custom property `--object-fit` (consumed by Web Awesome CSS for media inside frames).

## Usage
```html
<!-- Minimal square frame with fixed max inline size -->
<div waFrame [waFrameRatio]="'square'" style="max-inline-size: 20rem;">
  <div></div>
</div>

<!-- Frame used inside a flank layout with border radius and image -->
<div waFlank style="--flank-size: 8rem;">
  <div waFrame [waFrameRadius]="'m'">
    <img src="https://images.unsplash.com/photo-1523593288094-3ccfb6b2c192?q=20" alt="" />
  </div>
  <div class="wa-flank:end" style="--content-percentage: 70%">
    <div class="wa-stack wa-gap-xs">
      <h3>The Lord of the Rings: The Fellowship of the Ring</h3>
      <span>J.R.R. Tolkien</span>
    </div>
    <wa-button id="options-menu" appearance="plain">
      <wa-icon name="ellipsis" label="Options"></wa-icon>
    </wa-button>
    <wa-tooltip for="options-menu">Options</wa-tooltip>
  </div>
</div>

<!-- Aspect ratio variants -->
<div class="wa-grid">
  <div waFrame [waFrameRatio]="'landscape'">
    <div></div>
  </div>
  <div waFrame [waFrameRatio]="'portrait'">
    <div></div>
  </div>
  <div waFrame [aspectRatio]="'4 / 3'">
    <div></div>
  </div>
</div>

<!-- Border radius variants -->
<div class="wa-grid">
  <div waFrame [waFrameRadius]="'l'">
    <div></div>
  </div>
  <div waFrame [waFrameRadius]="'circle'">
    <div></div>
  </div>
  <div waFrame [borderRadius]="'50% 0%'">
    <div></div>
  </div>
</div>
```

## API Reference
- Selector: `[waFrame]`
- Inputs:
  - `waFrame: boolean | string | null` (enables the directive; attribute presence is treated as true)
  - `waFrameRatio?: 'square' | 'landscape' | 'portrait' | 'wa-frame:square' | 'wa-frame:landscape' | 'wa-frame:portrait' | null`
  - `aspectRatio?: string | null` (sets CSS `aspect-ratio` on host)
  - `waFrameRadius?: 's' | 'm' | 'l' | 'pill' | 'circle' | 'square' | 'wa-border-radius-s' | 'wa-border-radius-m' | 'wa-border-radius-l' | 'wa-border-radius-pill' | 'wa-border-radius-circle' | 'wa-border-radius-square' | null`
  - `borderRadius?: string | null` (sets `border-radius` on host)
  - `objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' | string | null` (sets `--object-fit`)

## Styling
The directive adds `wa-frame` and optional ratio/radius classes while setting optional CSS variables/styles. Visual behavior is provided by the Web Awesome CSS bundle as described in RULES.md under "Global Requirements (for Consumers)".
