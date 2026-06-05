## Angular Wrapper: Accordion (`wa-accordion`)

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

### Selector

```ts
wa-accordion
```

### Description

Wraps the `<wa-accordion>` Web Awesome component, a vertically stacked set of interactive headings that each contain a title representing a section of content. Use it together with `<wa-accordion-item>` children.

### Inputs

| Input          | Type                                                  | Description                                                                 |
| -------------- | ----------------------------------------------------- | --------------------------------------------------------------------------- |
| `mode`         | `'single' \| 'single-collapsible' \| 'multiple'`      | Controls how items expand. Default `'multiple'`.                            |
| `iconPlacement`| `'start' \| 'end'`                                    | Location of the expand/collapse icon in child items. Default `'end'`.       |
| `headingLevel` | `string \| number`                                    | The heading level for child item triggers (1–6) or `'none'`. Default `'3'`. |
| `appearance`   | `'filled' \| 'outlined' \| 'filled-outlined' \| 'plain'` | The accordion's visual appearance. Default `'outlined'`.                 |

### Outputs

| Output            | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `waExpand`        | Emitted before an item expands. Cancelable.          |
| `waAfterExpand`   | Emitted after an item finishes expanding.            |
| `waCollapse`      | Emitted before an item collapses. Cancelable.        |
| `waAfterCollapse` | Emitted after an item finishes collapsing.           |

### Slots

* `(default)`: One or more `<wa-accordion-item>` elements.

### Methods

| Method          | Description                                                            |
| --------------- | --------------------------------------------------------------------- |
| `expandAll()`   | Expands all accordion items. No-op when `mode` is single/single-collapsible. |
| `collapseAll()` | Collapses all accordion items.                                        |

### Example Usage

```html
<wa-accordion mode="single" appearance="filled" (waExpand)="onExpand($event)">
  <wa-accordion-item label="Section 1" [expanded]="true">Content 1</wa-accordion-item>
  <wa-accordion-item label="Section 2">Content 2</wa-accordion-item>
  <wa-accordion-item label="Section 3">Content 3</wa-accordion-item>
</wa-accordion>
```

### Notes

* `single` keeps at least one item open; `single-collapsible` allows zero open items; `multiple` (default) allows any number open.
* Use `expandAll()` / `collapseAll()` for programmatic control in `multiple` mode.
* The component automatically adapts to right-to-left languages.

---

## Angular Wrapper: Accordion Item (`wa-accordion-item`)

### Selector

```ts
wa-accordion-item
```

### Description

Wraps the `<wa-accordion-item>` Web Awesome component, used inside `<wa-accordion>` to create expandable sections with accessible headers.

### Inputs

| Input       | Type      | Description                                                  |
| ----------- | --------- | ----------------------------------------------------------- |
| `label`     | `string`  | The text label shown in the header. Use the `label` slot for HTML. |
| `expanded`  | `boolean` | Expands the accordion item. Default `false`.                |
| `disabled`  | `boolean` | Disables the item so it can't be toggled. Default `false`.  |

### Outputs

| Output       | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| `openChange` | Emits `true`/`false` after the item expands/collapses.       |

### Slots

* `(default)`: The accordion item's body content.
* `label`: The accordion item's label (alternative to the `label` attribute).
* `icon`: Optional expand/collapse icon. Works best with `<wa-icon>`.

### Methods

| Method       | Description                                       |
| ------------ | ------------------------------------------------- |
| `expand()`   | Expands the accordion item with animation.        |
| `collapse()` | Collapses the accordion item with animation.      |
| `toggle()`   | Toggles the accordion item's expanded state.      |
| `focus()`    | Focuses the accordion item's trigger button.      |

### CSS Custom Properties (as Inputs)

```
spacing?: string;       // -> --spacing
showDuration?: string;  // -> --show-duration
hideDuration?: string;  // -> --hide-duration
easing?: string;        // -> --easing
dividerColor?: string;  // -> --wa-accordion-divider-color
```



