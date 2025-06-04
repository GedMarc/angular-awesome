📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

# Checkbox Rules (`wa-checkbox`)

This directive wraps the `<wa-checkbox>` Web Component, integrating it with Angular forms and change detection.

## Selector

```ts
waCheckbox
```

## Angular Inputs

| Input           | Type                                                    | Description                                                               |
| --------------- | ------------------------------------------------------- | ------------------------------------------------------------------------- |
| `checked`       | `boolean \| string`                                     | Whether the checkbox is checked. Prefer `[checked]` binding for booleans. |
| `indeterminate` | `boolean \| string`                                     | Displays indeterminate state.                                             |
| `disabled`      | `boolean \| string`                                     | Disables the checkbox.                                                    |
| `required`      | `boolean \| string`                                     | Marks checkbox as required.                                               |
| `size`          | `'small' \| 'medium' \| 'large' \| 'inherit' \| string` | Sets checkbox size.                                                       |
| `name`          | `string`                                                | Checkbox name (used in form submissions).                                 |
| `value`         | `string \| null`                                        | Value sent when checked (for forms).                                      |
| `hint`          | `string`                                                | Optional description text.                                                |
| `form`          | `string`                                                | ID of the associated form (if outside `<form>` tag).                      |

All boolean and enum-like attributes support both native and string input for template convenience.

## Angular Outputs

| Output          | Description                                             |
| --------------- | ------------------------------------------------------- |
| `checkedChange` | Fires when the checkbox's checked state changes.        |
| `input`         | Mirrors the native input event.                         |
| `blur`          | Fired when the checkbox loses focus.                    |
| `focus`         | Fired when the checkbox gains focus.                    |
| `change`        | Fires when the state changes (checked/unchecked).       |
| `waInvalid`     | Fires when the form control fails validity constraints. |

## Two-Way Binding

This directive supports Angular's two-way binding syntax via `[(checked)]`.

```html
<wa-checkbox [(checked)]="formValue.myCheckbox">Subscribe</wa-checkbox>
```

## Slots

| Slot    | Purpose                                         |
| ------- | ----------------------------------------------- |
| default | The checkbox label (text or HTML).              |
| `hint`  | Used to display more complex hint HTML content. |

## Methods

You may access the native element using `@ViewChild(WaCheckboxDirective)` to call methods like:

* `setCustomValidity(message: string)`
* `click()`
* `focus()` / `blur()`

## Styling Hooks

All styling should be done through the Web Awesome CSS custom properties or parts.
Refer to the base component for these:

* `--background-color`, `--border-radius`, `--box-shadow`, etc.
* Parts: `base`, `control`, `checked-icon`, `label`, `hint`

## Notes

* Integrates with Angular's `ControlValueAccessor`.
* Supports form validation (`required`, `setCustomValidity`).
* Angular should use bound boolean inputs for accurate behavior, but plain strings like `"true"` also work.

## Related

* For form support, see the [Form Field Rules](../../form-field/form-field.rules.md) if using with labels or layout wrappers.
* For toggle-like behavior, consider [`wa-switch`](../switch/switch.rules.md).
