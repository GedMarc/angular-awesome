## Angular Wrapper: Known Date (`wa-known-date`)

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

### Selector

```ts
wa-known-date
```

### Description

Wraps the `<wa-known-date>` Web Awesome component. Known dates let users enter dates they already know — birthdays, expirations, document dates — through three separate day, month, and year fields shown in the locale's natural order. Implements `ControlValueAccessor` for `[(ngModel)]` and reactive forms.

### Inputs

| Input          | Type                                            | Description                                                 |
| -------------- | ----------------------------------------------- | ----------------------------------------------------------- |
| `name`         | `string`                                        | Name submitted with form data.                              |
| `value`        | `string`                                        | Committed value as an ISO `YYYY-MM-DD` string.              |
| `disabled`     | `boolean`                                        | Disables the known date.                                    |
| `required`     | `boolean`                                        | Makes the field required for form submission.               |
| `readonly`     | `boolean`                                        | Makes the fields non-editable.                              |
| `size`         | `'small' \| 'medium' \| 'large'` (or `xs`–`xl`) | The known date's size. Default `'m'`.                       |
| `appearance`   | `'filled' \| 'outlined' \| 'filled-outlined'`   | The visual appearance. Default `'outlined'`.                |
| `pill`         | `boolean`                                        | Draws pill-style fields with rounded edges.                 |
| `label`        | `string`                                         | The group label. Use the `label` slot for HTML.            |
| `hint`         | `string`                                         | The hint. Use the `hint` slot for HTML.                    |
| `autocomplete` | `string`                                         | Browser autofill family (e.g. `bday`).                     |
| `min` / `max`  | `string`                                         | Earliest/latest selectable date as `YYYY-MM-DD`.           |
| `locale`       | `string`                                         | BCP-47 locale override for field order.                    |
| `withLabel`    | `boolean`                                         | SSR only — set when slotting a `label` element.            |
| `withHint`     | `boolean`                                         | SSR only — set when slotting a `hint` element.             |

### Outputs

| Output        | Description                                                  |
| ------------- | ----------------------------------------------------------- |
| `waInput`     | Emitted as the user types in any field.                     |
| `waChange`    | Emitted when the committed value transitions to a new date. |
| `waFocus`     | Emitted when the control gains focus.                       |
| `waBlur`      | Emitted when the control loses focus.                       |
| `waInvalid`   | Emitted when constraint validation fails.                   |
| `valueChange` | Emits the new value string for two-way binding convenience. |

### Slots

* `label`: The group label (alternative to the `label` attribute).
* `hint`: Text that describes how to use the known date.

### Methods

| Method    | Description                                                |
| --------- | --------------------------------------------------------- |
| `focus()` | Focuses the first empty field, or the first when all filled.|
| `blur()`  | Removes focus from the known date.                        |

### Example Usage

```html
<wa-known-date
  label="Date of birth"
  hint="Enter your birthday"
  autocomplete="bday"
  [(ngModel)]="dob">
</wa-known-date>
```

### Notes

* Reading `value` returns an empty string when any field is only partially filled.
* The three fields render in the locale's natural order; override with `locale`.
* Unlike `<wa-date-input>` / `<wa-time-input>`, validation messages surface in an inline `error` region.
* The component automatically adapts to right-to-left languages.

