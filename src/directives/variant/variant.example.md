# Color Variants Utility

Some Web Awesome components, like `<wa-button>`, allow you to change the color by using a `variant` attribute. You can create the same effect on any element by using the color variant utility classes, or via the Angular helper directive:

- `.wa-brand`
- `.wa-neutral`
- `.wa-success`
- `.wa-warning`
- `.wa-danger`

With Angular, prefer the `waVariant` directive for a type-safe API:

```html
<p [waVariant]="'brand'">Brand variant via directive</p>
<p [waVariant]="'success'">Success variant via directive</p>
<p waWarning>Warning variant via shorthand</p>
```

These classes define generic color tokens modeled after Semantic Colors without the group identifier (brand, neutral, success, warning, danger). Styles can use the generic tokens like `--wa-color-fill-loud` instead of `--wa-color-brand-fill-loud`.

For example, a custom `.callout` class with color variants can be written as:

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
