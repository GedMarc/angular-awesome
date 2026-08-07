## OTP Input Rules

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

The `wa-otp-input` Web Awesome component is wrapped as a standalone Angular directive with full binding, form-control, and validation support. It was introduced in Web Awesome 3.11.

### Selector

`wa-otp-input`

### Overview

OTP inputs collect one-time passcodes, PINs, and other fixed-length codes, one character per segment. Use them for SMS verification, two-factor authentication, and invite codes.

### Description

The directive implements `ControlValueAccessor` and `Validator`, so it round-trips values through `[(ngModel)]` and reactive forms and reports validity to Angular. A partially-filled field is always treated as invalid (`incomplete`) regardless of the `required` attribute, matching the web component's behaviour. Set `format` to derive the segment count and insert literal separators, or set `length` for a plain run of segments.

### Inputs

| Input                  | Type                                                       | Binding Required | Description                                                                             |
| ---------------------- | ---------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------- |
| `value`                | `string`                                                   | No               | The current value of the OTP field.                                                     |
| `length`               | `number`                                                   | No               | Number of segments to display. Overridden by `format`. Default `6`.                     |
| `appearance`           | `'outlined' \| 'filled' \| 'filled-outlined' \| 'contained'` | No             | Visual appearance of the segments. Default `outlined`.                                  |
| `type`                 | `'numeric' \| 'alpha' \| 'alphanumeric'`                   | No               | Allowed character class. Default `numeric`.                                             |
| `mask`                 | `boolean`                                                   | No               | Display entered characters as `--mask-char` instead of their real value.                |
| `case`                 | `'preserve' \| 'upper' \| 'lower'`                         | No               | Case transformation applied to entered characters. Default `preserve`.                  |
| `size`                 | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'small' \| 'medium' \| 'large'` | No     | The size of each segment. Default `m`.                                                  |
| `label`                | `string`                                                   | No               | A label shown above the segments. Use the `label` slot for HTML content.                |
| `hint`                 | `string`                                                   | No               | Hint text shown below the segments. Use the `hint` slot for HTML content.               |
| `format`               | `string`                                                   | No               | Segment format using `#` as a placeholder; other characters are literal separators. Overrides `length`. |
| `autocomplete`         | `string`                                                   | No               | The `autocomplete` attribute forwarded to the underlying input. Default `one-time-code`. |
| `required`             | `boolean`                                                   | No               | Makes the field required. A partially-filled field is always invalid regardless.        |
| `readonly`             | `boolean`                                                   | No               | Makes the field readonly.                                                               |
| `autosubmit`           | `boolean`                                                   | No               | Submits the form automatically once all segments are filled.                            |
| `autofocus`            | `boolean`                                                   | No               | Automatically focuses the field on load.                                                |
| `withMask`             | `boolean`                                                   | No               | Show `--mask-char` as a hint in empty segments. Maps to `with-mask`.                     |
| `name`                 | `string`                                                   | No               | The form field name.                                                                    |
| `disabled`             | `boolean`                                                   | No               | Disables the form control.                                                              |
| `form`                 | `string`                                                   | No               | Associates the control with a form by id.                                               |
| `segmentSize`          | `string`                                                   | No               | Maps to the `--segment-size` CSS custom property.                                       |
| `segmentGap`           | `string`                                                   | No               | Maps to the `--segment-gap` CSS custom property.                                        |
| `segmentBorderRadius`  | `string`                                                   | No               | Maps to the `--segment-border-radius` CSS custom property.                              |
| `maskChar`             | `string`                                                   | No               | Maps to the `--mask-char` CSS custom property.                                          |

### Outputs

| Output        | Event Payload | Description                                                                                     |
| ------------- | ------------- | ----------------------------------------------------------------------------------------------- |
| `waInput`     | `Event`       | Emitted when a character is entered or removed. Also bindable as `(input)` / `(wa-input)`.       |
| `waChange`    | `Event`       | Emitted when the value changes and the field loses focus. Also bindable as `(change)`.           |
| `waFocus`     | `FocusEvent`  | Emitted when the control gains focus.                                                            |
| `waBlur`      | `FocusEvent`  | Emitted when the control loses focus.                                                            |
| `waComplete`  | `CustomEvent` | Emitted once when all segments are filled. Cancelable to stop `autosubmit`. Also `(wa-complete)`. |
| `waClear`     | `CustomEvent` | Emitted when the control's value is cleared. Also `(wa-clear)`.                                   |
| `waInvalid`   | `CustomEvent` | Emitted when the constraints aren't satisfied. Also `(wa-invalid)`.                              |
| `valueChange` | `string`      | Emitted with the current value on input/change, enabling `[(value)]` two-way binding.            |

### Methods

| Method                     | Returns | Description                                                     |
| -------------------------- | ------- | ------------------------------------------------------------- |
| `clear()`                  | `void`  | Clears the value and returns focus to the field.               |
| `focus(options?)`          | `void`  | Focuses the field.                                             |
| `blur()`                   | `void`  | Removes focus from the field.                                  |
| `select()`                 | `void`  | Selects all entered characters.                                |
| `setCustomValidity(msg)`   | `void`  | Sets a custom validity message.                                |
| `resetValidity()`          | `void`  | Removes manual custom errors and native validation.            |

### Slots

* `label`: An optional label for HTML content. When the `label` attribute is set it takes priority.
* `hint`: Optional hint text for HTML content. When the `hint` attribute is set it takes priority.

### Styling

Use the following CSS custom properties (available as inputs) to fine-tune the segments:

```css
--segment-size           /* Width and height of each segment cell. Default 2.5em. */
--segment-gap            /* Gap between segments. Default var(--wa-space-xs). */
--segment-border-radius  /* Corner radius of each segment. */
--mask-char              /* Character shown when masking. Default '•'. */
```

CSS parts include `label`, `hint`, `segments`, `segment`, and `segment-literal`. The component exposes the `--blank`, `--filled`, `disabled`, `readonly`, and `user-invalid` custom states.

### Examples

```html
<wa-otp-input [(ngModel)]="code" [length]="6" required></wa-otp-input>
```

### Notes

* A partially-filled field always reports the `incomplete` validation error, even without `required`.
* Setting `format` overrides `length`; the segment count is derived from the number of `#` characters.
* Cancel the `waComplete` event with `preventDefault()` to stop `autosubmit` from submitting the form.

---

See related components like [Input](../input/input.rules.md) for general-purpose text entry.

