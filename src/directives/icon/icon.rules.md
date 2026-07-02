## Icon Rules

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

The `wa-icon` Web Awesome component is wrapped as a standalone Angular component with full binding and integration support. This component renders icons from various libraries and supports styling, accessibility, and advanced configuration.

### Selector

`wa-icon`

### Description

Use the icon component to render visual symbols. These can be semantic (e.g., action indicators), decorative, or accessible. Icons support families, variants, custom sources, styling, fixed dimensions, and accessibility labeling.

### Inputs

| Input             | Type      | Binding Required | Description                                         |
| ----------------- | --------- | ---------------- | --------------------------------------------------- |
| `name`            | `string`  | Yes              | The name of the icon.                               |
| `family`          | `string`  | No               | Font Awesome family (e.g., `classic`, `brands`).    |
| `variant`         | `string`  | No               | Variant within a family (e.g., `regular`, `solid`). |
| `library`         | `string`  | No               | Name of a registered icon library.                  |
| `src`             | `string`  | No               | URL to an SVG resource for custom icons.            |
| `label`           | `string`  | No               | Accessible label for assistive technologies.        |
| `withFixedWidth`  | `boolean` | No               | If true, forces a fixed 1em width.                  |
| `autoWidth`       | `boolean` | No               | Sets width to match cropped SVG viewBox (like `fa-width-auto`). |
| `swapOpacity`     | `boolean` | No               | Swaps the opacity of duotone icons.                 |
| `rotate`          | `number`  | No               | Sets the rotation degree of the icon.               |
| `flip`            | `'x' \| 'y' \| 'both'` | No   | Flips the icon along the specified axis.            |
| `animation`       | `string`  | No               | Sets the animation (e.g., `spin`, `beat`, `fade`).  |
| `canvas`          | `'fixed' \| 'auto' \| 'square' \| 'roomy'` | No | Sets the icon canvas (the box the icon is centered within). Unset renders as `fixed` (1.25em × 1em); `auto` hugs the icon's width; `square` is 1.25em × 1.25em; `roomy` is 1.5em × 1.5em. Added in Web Awesome 3.10. |
| `color`           | `string`  | No               | Sets the icon's text color directly.                |
| `backgroundColor` | `string`  | No               | Sets the icon's background color.                   |
| `fontSize`        | `string`  | No               | Adjusts the icon's font size.                       |

### Styling Rules

* Font size determines the rendered size of the icon.
* Text color is inherited unless explicitly overridden.
* Use `withFixedWidth` for aligning icons in lists or button groups.
* The directive supports native Angular-style inputs for `color`, `backgroundColor`, and `fontSize`, which apply styles directly to the `<wa-icon>` element.

### Shortcut Styles for Consumers


> ✅ These variables allow external styling of the `wa-icon` through its parent, avoiding the need for inline styles or direct DOM access.


```css 
--primary-color	: Sets a duotone icons primary color. Default currentColor
--primary-opacity	Sets a duotone icons primary opacity. Default 1
--secondary-color	: Sets a duotone icons secondary color. Default currentColor
--secondary-opacity	Sets a duotone iconss secondary opacity. Default 0.4
```

### Animation CSS Custom Properties (Web Awesome 3.10)

Fine-tune the built-in animations by setting these CSS custom properties on the `<wa-icon>` element (e.g. via a `[style.--flip-angle]` binding or a stylesheet). The `flip` animation now also supports a `flip-360` variant.

```css
--flip-angle             /* Rotation angle for `flip` / `flip-360`. */
--flip-x                 /* X-coordinate of the flip rotation axis (0–1). */
--flip-y                 /* Y-coordinate of the flip rotation axis (0–1). */
--flip-z                 /* Z-coordinate of the flip rotation axis (0–1). */
--flip-anticipation-scale /* Scale of the wind-up before a flip rotates. */
--flip-overshoot         /* How far past the final angle a flip rotates before settling. */
--beat-scale             /* Scale multiplier for `beat` (multiplies the 1.25× base pulse). */
--bounce-anticipation    /* Downward squash distance before a `bounce` jumps. */
--buzz-distance          /* Horizontal travel of a `buzz` animation. */
--wag-angle              /* Peak rotation of a `wag` animation. */
--swing-angle            /* Peak rotation of a `swing` animation. */
--jello-scale-x          /* Horizontal stretch of a `jello` animation. */
--jello-scale-y          /* Vertical stretch of a `jello` animation. */
--float-height           /* Rise height of a `float` animation. */
--float-drift            /* Horizontal drift of a `float` animation. */
--float-tilt             /* Rotation of a `float` animation. */
--float-squash-x         /* Horizontal squash of a `float` animation at rest. */
--float-squash-y         /* Vertical squash of a `float` animation at rest. */
--float-stretch-x        /* Horizontal stretch of a `float` animation at its peak. */
--float-stretch-y        /* Vertical stretch of a `float` animation at its peak. */
```

### Accessibility

* If the icon conveys semantic meaning, a `label` should be provided.
* Purely decorative icons should omit the `label` attribute.

### Slot Support

* May be used in named slots, such as `<wa-icon slot="icon">`.

### CSS Custom Properties

These can be used at any ancestor level to define default icon settings:

```css
wa-callout {
  --wa-icon-name: info-circle;
  --wa-icon-variant: regular;
  &[variant="warning"] { --wa-icon-name: triangle-exclamation; }
  &[variant="danger"]  { --wa-icon-name: circle-exclamation; }
  &[variant="success"] { --wa-icon-name: circle-check; }
}
```

### Custom Icon Libraries

To register a custom icon library:

```ts
registerIconLibrary('my-icons', {
  resolver: (name, family, variant) => `/assets/icons/${name}.svg`,
  mutator: svg => svg.setAttribute('fill', 'currentColor')
});
```

Use with:

```html
<wa-icon library="my-icons" name="smile"></wa-icon>
```

### Examples

```html
<wa-icon name="github" family="brands"></wa-icon>
<wa-icon name="star" variant="regular" label="Favorite"></wa-icon>
<wa-icon src="/assets/icons/cat.svg" style="font-size: 3rem;"></wa-icon>
<div style="font-size: 2em; color: #4a90e2;">
  <wa-icon name="bell"></wa-icon>
</div>
<wa-icon withFixedWidth name="truck"></wa-icon>
<wa-icon name="heart" [color]="'#ff0000'" [fontSize]="'24px'" [backgroundColor]="'transparent'"></wa-icon>
```

### Notes

* Avoid using icon `name` without `family` or `variant` if the desired icon requires it.
* Dynamic CSS custom property changes can be used for hover effects or theming.
* Icons loaded via `src` must be accessible via CORS or local paths.

---

See related components like [Button](../button/button.rules.md) or [Callout](../callout/callout.rules.md) for examples of icon integration.
