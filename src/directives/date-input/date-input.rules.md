## Angular Wrapper: Date Input (`wa-date-input`)

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

### Selector

```ts
wa-date-input
```

### Description

Wraps the `<wa-date-input>` Web Awesome component. Date inputs let users enter a date through a segmented field or select one visually from a popup calendar. They support locale-aware segment order, min/max constraints, single and range modes, and form validation. Implements `ControlValueAccessor` for `[(ngModel)]` and reactive forms.

### Inputs

| Input                | Type                                                  | Description                                                       |
| -------------------- | ----------------------------------------------------- | ---------------------------------------------------------------- |
| `name`               | `string`                                              | Name submitted with form data.                                   |
| `value`              | `string`                                              | ISO `YYYY-MM-DD` (single) or `YYYY-MM-DD/YYYY-MM-DD` (range).     |
| `mode`               | `'single' \| 'range'`                                 | Selection mode. Default `'single'`.                              |
| `disabled`           | `boolean`                                             | Disables the date input.                                         |
| `required`           | `boolean`                                             | Makes the field required for form submission.                    |
| `readonly`           | `boolean`                                             | Makes the input non-editable; the popup still opens for browsing.|
| `size`               | `'small' \| 'medium' \| 'large'` (or `xs`–`xl`)       | The date input's size. Default `'m'`.                            |
| `appearance`         | `'filled' \| 'outlined' \| 'filled-outlined'`         | The visual appearance. Default `'outlined'`.                     |
| `pill`               | `boolean`                                             | Draws a pill-style input with rounded edges.                     |
| `label`              | `string`                                              | The label. Use the `label` slot for HTML.                        |
| `hint`               | `string`                                              | The hint. Use the `hint` slot for HTML.                          |
| `autocomplete`       | `string`                                              | Forwarded to the hidden form input for autofill.                 |
| `withClear`          | `boolean`                                             | Shows a clear button when there is a value.                      |
| `withLabel`          | `boolean`                                             | SSR only — set when slotting a `label` element.                  |
| `withHint`           | `boolean`                                             | SSR only — set when slotting a `hint` element.                   |
| `min` / `max`        | `string`                                              | Earliest/latest selectable date as `YYYY-MM-DD`.                 |
| `today`              | `string`                                              | Override "today" as `YYYY-MM-DD`.                                |
| `firstDayOfWeek`     | `string`                                              | First day of week in the popup calendar. Default `'auto'`.       |
| `disabledDates`      | `string`                                              | Whitespace-separated ISO dates that cannot be selected.          |
| `disabledDaysOfWeek` | `string`                                              | Space-separated three-letter weekday names to disable.           |
| `disablePast`        | `boolean`                                             | Disable all dates before today.                                  |
| `disableFuture`      | `boolean`                                             | Disable all dates after today.                                   |
| `minRange`/`maxRange`| `number`                                              | Min/max range length in days (range mode). `0` disables.         |
| `months`             | `1 \| 2`                                              | Number of months rendered in the popup. Default `1`.             |
| `pageBy`             | `'months' \| 'single'`                                | Paging behavior. Default `'months'`.                             |
| `withOutsideDays`    | `boolean`                                             | Show leading/trailing days from adjacent months.                 |
| `withWeekNumbers`    | `boolean`                                             | Show ISO 8601 week numbers.                                      |
| `weekdayFormat`      | `'narrow' \| 'short' \| 'long'`                       | Weekday header format. Default `'short'`.                        |
| `open`               | `boolean`                                             | Whether the popup calendar is open.                              |
| `placement`          | `string`                                              | Preferred popup placement. Default `'bottom-start'`.             |
| `distance`           | `number`                                              | Distance in pixels between the popup and the input.              |

### Outputs

| Output         | Description                                                       |
| -------------- | ---------------------------------------------------------------- |
| `waInput`      | Emitted on every segment edit, step, calendar interaction, clear.|
| `waChange`     | Emitted on every committed value transition.                     |
| `waFocus`      | Emitted when the control receives focus.                         |
| `waBlur`       | Emitted when the control loses focus.                            |
| `waClear`      | Emitted when the clear button is activated.                      |
| `waShow`/`waAfterShow` | Popup opening lifecycle events.                          |
| `waHide`/`waAfterHide` | Popup closing lifecycle events.                          |
| `waInvalid`    | Emitted when constraint validation fails.                        |
| `valueChange`  | Emits the new value string for two-way binding convenience.      |

### Slots

* `label`, `hint`, `start`, `end`, `clear-icon`, `expand-icon`, `footer`, `previous-icon`, `next-icon`, and dynamic `day-YYYY-MM-DD` slots.

### Methods

| Method      | Description                          |
| ----------- | ------------------------------------ |
| `focus()`   | Focuses the first empty/first segment.|
| `blur()`    | Removes focus from the date input.   |
| `show()`    | Opens the popup calendar.            |
| `hide()`    | Closes the popup calendar.           |
| `clear()`   | Clears the current value.            |

### CSS Custom Properties (as Inputs)

```
showDuration?: string;  // -> --show-duration
hideDuration?: string;  // -> --hide-duration
```

### Example Usage

```html
<wa-date-input
  label="Departure"
  hint="Pick a date"
  [(ngModel)]="departure"
  min="2026-01-01"
  max="2026-12-31"
  withClear>
</wa-date-input>
```

### Notes

* Unlike `<wa-input>`, `change` fires on every committed value transition (matching native `<input type="date">`), not on blur.
* In range mode bind `value` as `YYYY-MM-DD/YYYY-MM-DD`.
* The component automatically adapts to right-to-left languages.

