---
name: angular-awesome-theming
description: "Theme and style Angular Awesome components using Web Awesome design tokens, CSS custom properties, CSS parts, variant/appearance/size tokens, and layout utilities. Use when customizing component appearance, applying brand colors, overriding default styles, using CSS shadow parts, or configuring layout directives (cluster, stack, grid, gap, align, flank, frame, split)."
metadata:
  short-description: Theme and style Angular Awesome components
---

# Angular Awesome — Theming & Layout

Apply consistent visual styling and layout using Web Awesome's design token system.

## Design Tokens

All components use a shared token vocabulary:

```html
<!-- Variant: semantic color intent -->
<wa-button variant="brand">Brand</wa-button>
<wa-button variant="success">Success</wa-button>
<wa-button variant="warning">Warning</wa-button>
<wa-button variant="danger">Danger</wa-button>
<wa-button variant="neutral">Neutral</wa-button>

<!-- Appearance: visual treatment -->
<wa-button appearance="accent">Accent</wa-button>
<wa-button appearance="filled">Filled</wa-button>
<wa-button appearance="outlined">Outlined</wa-button>
<wa-button appearance="plain">Plain</wa-button>
<wa-button appearance="filled-outlined">Filled Outlined</wa-button>

<!-- Size: physical scale -->
<wa-button size="small">Small</wa-button>
<wa-button size="medium">Medium</wa-button>
<wa-button size="large">Large</wa-button>
```

## CSS Custom Properties

Override component internals via CSS custom properties (documented per-component in rules.md):

```css
/* Toast spacing and width */
wa-toast { --gap: 16px; --width: 32rem; }

/* Toast item accent and animation */
wa-toast-item { --accent-width: 6px; --show-duration: 300ms; }

/* Progress bar height */
wa-progress-bar { --height: 8px; --indicator-color: var(--wa-color-brand-600); }
```

## CSS Parts (::part)

Style shadow DOM internals via exported CSS parts:

```css
wa-button::part(base) { border-radius: 9999px; }
wa-toast-item::part(close-button) { opacity: 0.6; }
wa-input::part(input) { font-family: monospace; }
```

Each component's rules.md lists available parts.

## Layout Utilities

Layout utilities are CSS-class-based attribute directives. Apply them to any host element.

### Stack (vertical)
```html
<div waStack class="wa-stack wa-gap-m">
  <wa-button>First</wa-button>
  <wa-button>Second</wa-button>
</div>
```

### Cluster (horizontal)
```html
<div waCluster class="wa-cluster wa-gap-s" style="justify-content: center; align-items: center;">
  <wa-tag>One</wa-tag>
  <wa-tag>Two</wa-tag>
</div>
```

### Grid
```html
<div waGrid class="wa-grid wa-gap-m" style="--min-column-size: 15rem;">
  <wa-card>A</wa-card>
  <wa-card>B</wa-card>
  <wa-card>C</wa-card>
</div>
```

### Split (sidebar + content)
```html
<div waSplit class="wa-split wa-split:row wa-gap-l">
  <nav>Sidebar</nav>
  <main>Content</main>
</div>
```

### Flank (icon + text)
```html
<div waFlank class="wa-flank wa-gap-s">
  <wa-icon name="star"></wa-icon>
  <span>Flanked content</span>
</div>
```

### Frame (aspect ratio)
```html
<div waFrame class="wa-frame" style="aspect-ratio: 16 / 9;">
  <img src="hero.jpg" alt="Hero" />
</div>
```

### Gap (spacing utility)
```html
<div waGap class="wa-gap-l">
  <div>Spaced content</div>
</div>
```

### Align
```html
<div waAlignItems class="wa-align-items-center">
  <wa-spinner></wa-spinner>
</div>
```

## Variant Directive

Apply variant to a container and all children:
```html
<wa-variant variant="danger">
  <wa-button>Danger button</wa-button>
  <wa-callout>Danger callout</wa-callout>
</wa-variant>
```

## Normalize Appearance

Use `normalizeAppearance()` from `src/types/tokens.ts` to handle legacy space-delimited values:
```ts
import { normalizeAppearance } from 'angular-awesome';
// 'filled outlined' → 'filled-outlined'
// 'outlined filled' → 'filled-outlined'
```

