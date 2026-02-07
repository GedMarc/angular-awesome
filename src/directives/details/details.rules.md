## Angular Wrapper: Details (`wa-details`)

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

### Selector

```ts
waDetails
```

### Description

Wraps the `<wa-details>` Web Awesome component, which displays a collapsible section with a summary and expandable content. This wrapper provides Angular binding for details configuration.

### Inputs

| Input          | Type                                    | Description                                                                    |
| -------------- | --------------------------------------- | ------------------------------------------------------------------------------ |
| `summary`      | `string`                                | Text to display in the summary. Use the summary slot for HTML content.         |
| `disabled`     | `boolean`                               | Prevents the details from expanding when true.                                 |
| `appearance`   | `'filled' \| 'outlined' \| 'plain'`     | The visual appearance of the details element.                                  |
| `open`         | `boolean`                               | Whether the details is expanded.                                               |
| `iconPosition` | `'start' \| 'end'`                      | Position of the expand/collapse icon. Default is 'end'.                        |
| `name`         | `string`                                | Groups related details elements. When one opens, others with the same name close. |

### Outputs

| Output         | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| `waShow`       | Emits when the details starts to open. Maps to `show` event.     |
| `waAfterShow`  | Emits after the details has opened. Maps to `aftershow` event.   |
| `waHide`       | Emits when the details starts to close. Maps to `hide` event.    |
| `waAfterHide`  | Emits after the details has closed. Maps to `afterhide` event.   |

### Slots

* `(default)`: The content to show when expanded.
* `summary`: For HTML content in the summary.
* `expand-icon`: Optional expand icon to use instead of the default. Works best with `<wa-icon>`.
* `collapse-icon`: Optional collapse icon to use instead of the default. Works best with `<wa-icon>`.

### CSS Custom Properties (as Inputs)

Use Angular-style inputs to control style via CSS custom properties directly on the host element:

```
iconColor?: string;      // -> --icon-color
spacing?: string;        // -> --spacing
showDuration?: string;   // -> --show-duration
hideDuration?: string;   // -> --hide-duration
display?: string;        // -> --display
```

These are written to the host element as style properties.

### Methods

| Method  | Description                                |
| ------- | ------------------------------------------ |
| `show()`| Opens the details programmatically.        |
| `hide()`| Closes the details programmatically.       |

### CSS Parts

The following CSS parts can be styled using `::part()` selectors:

* `base`: The inner `<details>` element.
* `header`: The header that wraps both the summary and the expand/collapse icon.
* `summary`: The container that wraps the summary.
* `icon`: The container that wraps the expand/collapse icons.
* `content`: The details content.

### Example Usage

```html
<wa-details
  summary="Click to expand"
  [open]="isOpen"
  [disabled]="isDisabled"
  iconPosition="start"
  appearance="filled"
  name="group-1"
  [spacing]="'1rem'"
  (waShow)="onShow()"
  (waAfterShow)="onAfterShow()">
  
  <p>This is the expandable content.</p>
  
  <wa-icon name="plus" slot="expand-icon"></wa-icon>
  <wa-icon name="minus" slot="collapse-icon"></wa-icon>
</wa-details>
```

### Notes

* Use the `summary` attribute for simple text summaries, or the `summary` slot for HTML content.
* The `name` attribute creates accordion-like behavior where only one details with the same name can be open at a time.
* Use the `show()` and `hide()` methods for programmatic control.
* The component automatically adapts to right-to-left languages.
* Custom icons can be provided using the `expand-icon` and `collapse-icon` slots.
* The `iconPosition` attribute controls whether the icon appears at the start or end of the summary.
* The component emits events during the opening and closing process, both at the start and after animations complete.
