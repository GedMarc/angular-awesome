# `waVariant` Angular Integration Rules

`waVariant` is a small Angular helper directive that applies Web Awesome Color Variant utility classes to any element.

## Overview

- Purpose: make it easy to toggle color variants on arbitrary elements, mirroring component `variant` behavior.
- Variants supported: `brand`, `neutral`, `success`, `warning`, `danger`.
- The directive ensures only one variant class is present at a time.

## Selector and Inputs

- Selector: `[waVariant],[waBrand],[waNeutral],[waSuccess],[waWarning],[waDanger]`
- Primary input: `waVariant: 'brand'|'neutral'|'success'|'warning'|'danger'|'wa-brand'|'wa-neutral'|'wa-success'|'wa-warning'|'wa-danger'|null`
- Boolean shorthands: `waBrand`, `waNeutral`, `waSuccess`, `waWarning`, `waDanger`
  - Shorthands accept boolean or presence-only usage (`waBrand`)
  - Priority when multiple shorthands are true: brand > neutral > success > warning > danger
  - Explicit `waVariant` overrides shorthands

## Usage Examples

```html
<!-- Primary API -->
<p [waVariant]="'brand'">Brand text</p>
<p [waVariant]="'success'">Success text</p>
<p [waVariant]="condition ? 'warning' : 'neutral'">Dynamic</p>

<!-- Shorthand booleans / presence-only -->
<p waBrand>Brand via shorthand</p>
<p [waDanger]="isError">Danger via conditional shorthand</p>
```

## Styling Model

Using these variant classes is a two-way handshake: the classes do not directly apply styles, but set the generic variant context so your CSS can consume generic tokens (without the group identifier), e.g. `--wa-color-fill-loud` instead of `--wa-color-brand-fill-loud`.

Example:

```html
<p class="callout">This is a callout.</p>
<p class="callout" waBrand>This is a callout.</p>
<p class="callout" [waVariant]="'success'">This is a callout.</p>
<p class="callout" [waVariant]="'warning'">This is a callout.</p>
<p class="callout" [waVariant]="'danger'">This is a callout.</p>

<style>
  .callout {
    background-color: var(--wa-color-fill-quiet);
    border: 1px solid var(--wa-color-border-quiet);
    color: var(--wa-color-on-quiet);
    padding: var(--wa-space-m) var(--wa-space-l);
  }
</style>
```

## Notes

- This directive is standalone and can be imported directly in test components or declared in feature modules as needed.
- The directive is exported from the library public API: `export * from '.../variant/variant.directive'`.
