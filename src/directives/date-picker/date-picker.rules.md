## Angular Wrapper: Date Picker (`wa-date-picker`)

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

### Selector

```ts
wa-date-picker
```

### Description

Wraps the `<wa-date-picker>` Web Awesome component. Date pickers display a month grid for selecting a single date or a date range inline. Use them when dates need to remain visible, such as in scheduling interfaces or embedded inside another form control. Implements `ControlValueAccessor` for `[(ngModel)]` and reactive forms.

### Inputs

| Input                | Type                                            | Description                                                  |
| -------------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| `mode`               | `'single' \| 'range'`                           | Selection mode. Default `'single'`.                          |
| `value`              | `string`                                        | ISO `YYYY-MM-DD` (single) or `YYYY-MM-DD/YYYY-MM-DD` (range). |
| `min` / `max`        | `string`                                        | Earliest/latest selectable date as `YYYY-MM-DD`.             |
| `today`              | `string`                                        | Override the date considered "today".                        |
| `focusedDate`        | `string`                                        | The currently focused date as `YYYY-MM-DD`.                  |
| `view`               | `'days' \| 'months' \| 'years'`                 | The current view. Default `'days'`.                          |
| `months`             | `1 \| 2`                                        | Number of months rendered side-by-side. Default `1`.         |
| `pageBy`             | `'months' \| 'single'`                          | Paging behavior. Default `'months'`.                         |
| `firstDayOfWeek`     | `string`                                        | First day of week. Default `'auto'`.                         |
| `withOutsideDays`    | `boolean`                                        | Show leading/trailing days from adjacent months.            |
| `withWeekNumbers`    | `boolean`                                        | Show an ISO week-number column.                             |
| `weekdayFormat`      | `'narrow' \| 'short' \| 'long'`                 | Weekday header format. Default `'short'`.                    |
| `disabled`           | `boolean`                                        | Disables the entire picker.                                  |
| `readonly`           | `boolean`                                        | Displays the value without allowing changes.                |
| `disabledDates`      | `string`                                        | Whitespace-separated ISO dates to disable.                  |
| `disabledDaysOfWeek` | `string`                                        | Space-separated three-letter weekday names to disable.      |
| `disablePast`        | `boolean`                                        | Disable all dates before today.                             |
| `disableFuture`      | `boolean`                                        | Disable all dates after today.                              |
| `minRange`/`maxRange`| `number`                                        | Min/max range length in days (range mode). `0` disables.    |
| `size`               | `'small' \| 'medium' \| 'large'` (or `xs`–`xl`) | Visual size. Default `'m'`.                                  |
| `locale`             | `string`                                        | BCP-47 locale override.                                     |

### Outputs

| Output         | Description                                                  |
| -------------- | ----------------------------------------------------------- |
| `waInput`      | Emitted when the value changes during interaction.          |
| `waChange`     | Emitted when the user commits a new value.                  |
| `waFocusDay`   | Emitted when the focused day changes. `detail: { date }`.   |
| `waViewChange` | Emitted when switching day/month/year views.                |
| `valueChange`  | Emits the new value string for two-way binding convenience. |

### Slots

* `previous-icon`, `next-icon`, `header`, `footer`, and dynamic `day-YYYY-MM-DD` slots.

### Methods

| Method            | Description                                          |
| ----------------- | --------------------------------------------------- |
| `focus()`         | Focuses the calendar at the currently focused day.  |
| `goToDate(date)`  | Scrolls the view to show the given date.            |
| `goToToday()`     | Equivalent to `goToDate(today)`.                    |
| `clear()`         | Clears the current selection.                       |

### Example Usage

```html
<wa-date-picker
  [(ngModel)]="selected"
  min="2026-01-01"
  max="2026-12-31"
  withWeekNumbers>
</wa-date-picker>
```

### Notes

* In range mode, `waInput` fires after the first click of a new range; `waChange` fires when the range commits.
* Set `months` to `2` to see both ends of a range at once.
* The component automatically adapts to right-to-left languages.

