# Stack Directive Rules

The `[waStack]` attribute directive provides a typed, ergonomic way to apply the Web Awesome `wa-stack` layout primitive to any container. Stacks are ideal for forms, text blocks, and ensuring consistent spacing between elements in the document flow.

## Overview
- Base behavior: toggles `wa-stack` on the host element when enabled.
- Optional inputs map to utility classes:
  - `waStackDirection`: `column | row` (or `wa-stack:column | wa-stack:row`). Default is column.
  - `waStackJustify`: `start | center | end` (or the corresponding `wa-justify-*` class).
  - `waStackDividers`: boolean (truthy → `wa-dividers`) to show 1px separators between children when supported by your theme.
- Use with `[waGap]` for spacing and `[waAlignItems]` for inline-axis alignment within the stack.

## Usage
```html
<!-- Basic stack -->
<div waStack [waGap]="'m'">
  <div></div>
  <div></div>
  <div></div>
</div>

<!-- Form example -->
<div waStack [waGap]="'m'">
  <wa-input label="Email">
    <wa-icon slot="start" name="envelope" variant="regular"></wa-icon>
  </wa-input>
  <wa-input label="Password" type="password">
    <wa-icon slot="start" name="lock" variant="regular"></wa-icon>
  </wa-input>
  <wa-checkbox>Remember me on this device</wa-checkbox>
  <wa-button>Log In</wa-button>
</div>

<!-- Text content with large spacing -->
<div waStack [waGap]="'2xl'">
  <h3>Aragorn's Squash</h3>
  <p>Altogether unleash weasel mainly well-protected hiding Farthing excuse...</p>
  <p>Even the smallest person can change the course of the future...</p>
</div>
```

## API Reference
- Selector: `[waStack]`
- Inputs:
  - `waStack: boolean | string | null` (enables the directive; attribute presence is treated as true)
  - `waStackDirection?: 'column' | 'row' | 'wa-stack:column' | 'wa-stack:row' | null`
  - `waStackJustify?: 'start' | 'center' | 'end' | 'wa-justify-start' | 'wa-justify-center' | 'wa-justify-end' | null`
  - `waStackDividers?: boolean | string | null` (truthy → `wa-dividers`)

## Styling
This directive only adds `wa-stack` and optional utility classes; visual behavior is provided by the Web Awesome CSS bundle as described in RULES.md under "Global Requirements (for Consumers)".
