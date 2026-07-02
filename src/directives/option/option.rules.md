### `wa-option.rules.md`

**Angular 20 Directive Rules for `<wa-option>` Web Component**

---

## Overview

Angular directive support for the `wa-option` Web Component. Options define the selectable items within various form controls such as `<wa-select>` and `<wa-combobox>`.

## Supported `@Input()` Bindings

| Input | Type | HTML Attribute | Notes |
| --- | --- | --- | --- |
| `value` | `string` | `value` | The option's value; must be unique within the group |
| `disabled` | `boolean` | `disabled` | Prevents selection |
| `selected` | `boolean` | `selected` | Initially selects the option |
| `label` | `string` | `label` | Plain text label override |
| `currentTextColor` | `string` | `--current-text-color` (CSS var) | The text color of the current (highlighted) option, paired with `--wa-form-control-activated-color`. Added in Web Awesome 3.10. |

## Slots

| Slot | Description |
| --- | --- |
| `(default)` | The option's label |
| `start` | Element placed before the label (e.g., `<wa-icon>`) |
| `end` | Element placed after the label (e.g., `<wa-icon>`) |

## CSS Custom Properties

- `--current-text-color` — The text color of the current (highlighted) option, paired with `--wa-form-control-activated-color`. Bindable via the `currentTextColor` input. Added in Web Awesome 3.10.

## CSS Parts

- `checked-icon` — The checked icon
- `label` — The option's label
- `start` — Container wrapping the `start` slot
- `end` — Container wrapping the `end` slot

