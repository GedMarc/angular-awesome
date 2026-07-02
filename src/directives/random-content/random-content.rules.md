## Random Content Rules

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

The `wa-random-content` Web Awesome component is wrapped as a standalone Angular directive with full binding and integration support. It was introduced in Web Awesome 3.10.

### Selector

`wa-random-content`

### Overview

Selects one or more child elements at random and displays them, hiding the rest. Use it for rotating banners, testimonials, tips, or featured content where the exact item shown does not matter.

### Description

Only direct element children are eligible for selection; unselected children are hidden with the `hidden` attribute. The directive can rotate content automatically with `autoplay`, apply an entrance `animation`, and be shuffled programmatically through the `randomize()` method.

### Inputs

| Input                | Type                                                                                | Binding Required | Description                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------- |
| `items`              | `number`                                                                            | No               | Number of children to show simultaneously. Clamped to `[1, childCount]`. Default `1`.       |
| `mode`               | `'random' \| 'unique' \| 'sequence'`                                                | No               | Selection strategy. Default `unique`.                                                       |
| `autoplay`           | `boolean`                                                                            | No               | Rotate the content automatically. Set the cadence with `autoplayInterval`. Default `false`. |
| `autoplayInterval`   | `number`                                                                             | No               | Autoplay cadence in milliseconds. Maps to `autoplay-interval`. Default `3000`.              |
| `animation`          | `'none' \| 'fade' \| 'fade-up' \| 'fade-down' \| 'fade-left' \| 'fade-right'`        | No               | Entrance animation for newly shown children. Default `none`.                                |
| `animationDuration`  | `string`                                                                             | No               | Duration of the entrance animation. Maps to the `--animation-duration` CSS custom property. |
| `animationEasing`    | `string`                                                                             | No               | Easing of the entrance animation. Maps to the `--animation-easing` CSS custom property.     |
| `animationTranslate` | `string`                                                                             | No               | Translation distance for directional animations. Maps to `--animation-translate`.           |

### Outputs

| Output            | Event Payload | Description                                                                                                      |
| ----------------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| `waContentChange` | `CustomEvent` | Emitted whenever the displayed selection changes, including on first render, on `randomize()`, and each autoplay tick. Also bindable as `(wa-content-change)`. |

### Methods

| Method        | Returns          | Description                                                          |
| ------------- | ---------------- | ------------------------------------------------------------------- |
| `randomize()` | `Element[]`      | Selects a new set of children using the current mode and returns the elements now shown. |

### Slots

* `(default)`: The pool of children to choose from. Only direct element children are eligible; unselected children are hidden with the `hidden` attribute.

### Styling

Use the following CSS custom properties (available as inputs) to fine-tune the entrance animation:

```css
--animation-duration   /* Duration of the entrance animation. Default 300ms. */
--animation-easing     /* Easing function for the entrance animation. Default ease. */
--animation-translate  /* Translation distance for directional animations. Default 0.5em. */
```

### Examples

```html
<wa-random-content autoplay [autoplayInterval]="5000" animation="fade-up">
  <blockquote>Tip #1</blockquote>
  <blockquote>Tip #2</blockquote>
  <blockquote>Tip #3</blockquote>
</wa-random-content>
```

### Notes

* Only direct element children participate in the selection pool.
* Prefer `unique` mode to avoid showing the same item twice in a row until the pool is exhausted.
* Calling `randomize()` emits a `wa-content-change` event just like an autoplay tick.

---

See related components like [Carousel](../carousel/carousel.rules.md) for sequential content presentation.

