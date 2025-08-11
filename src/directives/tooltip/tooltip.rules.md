## Tooltip Component Rules

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

### Component: `<wa-tooltip>`

Tooltips display contextual information when hovering, focusing, clicking, or programmatically toggling visibility on a target element. The tooltip is bound via the `for` attribute to the `id` of another element.

### Angular Directive Selector

`waTooltip`

### Inputs

| Input          | Type      | Description                                                                                                       |
| -------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| `for`          | `string`  | The `id` of the target element this tooltip is attached to. Required.                                             |
| `placement`    | `string`  | Preferred placement of the tooltip. Options include 'top', 'top-start', 'top-end', 'right', etc. Default is 'top'.|
| `disabled`     | `boolean` | If `true`, disables tooltip display.                                                                              |
| `distance`     | `number`  | Distance in pixels to offset the tooltip. Default is `8`.                                                         |
| `skidding`     | `number`  | Skidding offset in pixels along the target. Default is `0`.                                                       |
| `open`         | `boolean` | Programmatically control tooltip visibility. Must be used with `trigger='manual'`.                                |
| `showDelay`    | `number`  | Delay before showing (ms). Default `150`.                                                                         |
| `hideDelay`    | `number`  | Delay before hiding (ms). Default `0`.                                                                            |
| `trigger`      | `string`  | Trigger method: `click`, `hover`, `focus`, `manual`, or space-separated combinations. Default is `'hover focus'`. |
| `withoutArrow` | `boolean` | If `true`, removes the arrow from the tooltip.                                                                    |

### Outputs

| Output        | Description                                |
| ------------- | ------------------------------------------ |
| `waShow`      | Emitted when the tooltip starts showing.   |
| `waAfterShow` | Emitted after the tooltip is fully shown.  |
| `waHide`      | Emitted when the tooltip starts hiding.    |
| `waAfterHide` | Emitted after the tooltip is fully hidden. |

### Styling Inputs (CSS Custom Properties)

Set directly on the host element:

```
backgroundColor: string; // maps to --background-color
borderRadius: string;    // maps to --border-radius
maxWidth: string;        // maps to --max-width
padding: string;         // maps to --padding
arrowSize: string;       // maps to --wa-tooltip-arrow-size
```

### Methods

| Method   | Description                      |
| -------- | -------------------------------- |
| `show()` | Shows the tooltip programmatically. |
| `hide()` | Hides the tooltip programmatically. |

### Notes

* The `for` input must match the `id` of the element receiving the tooltip.
* Avoid putting interactive content (e.g., buttons) inside tooltips.
* Use `trigger="manual"` with the `open` property for programmatic control.
* The tooltip automatically positions itself to stay within the viewport.
