## Angular Wrapper: Time Input (`wa-time-input`)

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

### Selector

```ts
wa-time-input
```

### Description

Wraps the `<wa-time-input>` Web Awesome component. Time pickers let users enter a time through a segmented field or select one visually from a popup column picker. They support 12- and 24-hour formats, optional seconds, and locale-aware segment order. Implements `ControlValueAccessor` for `[(ngModel)]` and reactive forms.

### Inputs

| Input          | Type                                            | Description                                                       |
| -------------- | ----------------------------------------------- | ---------------------------------------------------------------- |
| `name`         | `string`                                        | Name submitted with form data.                                   |
| `value`        | `string`                                        | Wire format `HH:mm`, `HH:mm:ss`, or `HH:mm:ss.sss` (24-hour).    |
| `disabled`     | `boolean`                                        | Disables the time picker.                                        |
| `required`     | `boolean`                                        | Makes the field required for form submission.                    |
| `readonly`     | `boolean`                                        | Makes the input non-editable; the popup still opens.             |
| `size`         | `'small' \| 'medium' \| 'large'` (or `xs`–`xl`) | The time picker's size. Default `'m'`.                           |
| `appearance`   | `'filled' \| 'outlined' \| 'filled-outlined'`   | The visual appearance. Default `'outlined'`.                     |
| `pill`         | `boolean`                                        | Draws a pill-style input with rounded edges.                     |
| `label`        | `string`                                         | The label. Use the `label` slot for HTML.                        |
| `hint`         | `string`                                         | The hint. Use the `hint` slot for HTML.                          |
| `autocomplete` | `string`                                         | Forwarded to the hidden form input for autofill.                 |
| `withClear`    | `boolean`                                         | Shows a clear button when there is a value.                      |
| `withNow`      | `boolean`                                         | Renders a "Now" button in the popup footer.                      |
| `withLabel`    | `boolean`                                         | SSR only — set when slotting a `label` element.                  |
| `withHint`     | `boolean`                                         | SSR only — set when slotting a `hint` element.                   |
| `min` / `max`  | `string`                                         | Earliest/latest selectable time in wire format.                  |
| `step`         | `number \| 'any'`                                | Granularity in seconds. Default `60` (hides seconds).            |
| `hourFormat`   | `'auto' \| '12' \| '24'`                         | 12- or 24-hour clock. `auto` follows the locale.                 |
| `open`         | `boolean`                                         | Whether the popup is open.                                       |
| `placement`    | `string`                                          | Preferred popup placement. Default `'bottom-start'`.             |
| `distance`     | `number`                                          | Distance in pixels between the popup and the input.              |

### Outputs

| Output         | Description                                                  |
| -------------- | ----------------------------------------------------------- |
| `waInput`      | Emitted as the user types or interacts with popup columns.  |
| `waChange`     | Emitted when the committed value changes.                   |
| `waFocus`      | Emitted when the control receives focus.                    |
| `waBlur`       | Emitted when the control loses focus.                       |
| `waClear`      | Emitted when the clear button is activated.                 |
| `waShow`/`waAfterShow` | Popup opening lifecycle events.                     |
| `waHide`/`waAfterHide` | Popup closing lifecycle events.                     |
| `waInvalid`    | Emitted when constraint validation fails.                   |
| `valueChange`  | Emits the new value string for two-way binding convenience. |

### Slots

* `label`, `hint`, `start`, `end`, `clear-icon`, `expand-icon`, `footer`.

### Methods

| Method    | Description                            |
| --------- | ------------------------------------- |
| `focus()` | Focuses the first empty/first segment.|
| `blur()`  | Removes focus from the time picker.   |
| `show()`  | Opens the popup.                      |
| `hide()`  | Closes the popup.                     |

### CSS Custom Properties (as Inputs)

```
showDuration?: string;     // -> --show-duration
hideDuration?: string;     // -> --hide-duration
columnItemHeight?: string; // -> --column-item-height
columnWidth?: string;      // -> --column-width
```

### Example Usage

```html
<wa-time-input
  label="Alarm"
  hint="Pick a time"
  [(ngModel)]="alarm"
  hourFormat="24"
  withNow
  withClear>
</wa-time-input>
```

### Notes

* `value` is always wire format (24-hour), regardless of `hourFormat` display.
* Set `step` below 60 to reveal the seconds segment; `'any'` disables `stepMismatch` enforcement.
* `change` fires on every committed value change (matching native `<input type="time">`).
* The component automatically adapts to right-to-left languages.

