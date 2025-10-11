# Select Component Rules

This is the native `<wa-select>` Web Awesome component wrapper. It must be used with the tag name `wa-select` so that the Web Awesome library detects and upgrades it.

📌 Follows the general [Web Awesome Angular Rules](../../../RULES.md).

## Overview
- Selector: `wa-select` (native tag selector)
- Purpose: a combobox/select that supports single and multiple selection, works with forms, and exposes rich slots and events.
- Angular: supports template-driven forms via ControlValueAccessor ([(ngModel)]).

## Inputs

| Input Name          | Type                             | Description                                                          |
| ------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `value`             | `string \| string[]`             | Bound via `ngModel`, corresponds to the `value` attribute.           |
| `label`             | `string`                         | Sets the label of the select.                                        |
| `hint`              | `string`                         | Provides additional guidance to the user.                            |
| `placeholder`       | `string`                         | Placeholder when no option is selected.                              |
| `appearance`        | `'outlined' \| 'filled'`         | Changes visual style.                                                |
| `pill`              | `boolean`                        | Applies pill-style rounded borders.                                  |
| `withClear`         | `boolean`                        | Shows a clear button when an option is selected.                     |
| `disabled`          | `boolean`                        | Disables the select control.                                         |
| `multiple`          | `boolean`                        | Enables multiple selection.                                          |
| `size`              | `'small' \| 'medium' \| 'large'` | Sets size variant.                                                   |
| `placement`         | `'top' \| 'bottom'`              | Preferred dropdown position.                                         |
| `required`          | `boolean`                        | Enables HTML form validation.                                        |
| `maxOptionsVisible` | `number`                         | Controls how many selected tags are visible when `multiple` is true. |
| `form`              | `string`                         | Form association when outside a `<form>`.                            |

### Style Inputs (CSS Custom Properties)

| Input Name               | Maps To CSS Custom Property  |
| ------------------------ | ---------------------------- |
| `backgroundColor`        | `--background-color`         |
| `borderColor`            | `--border-color`             |
| `borderWidth`            | `--border-width`             |
| `boxShadow`              | `--box-shadow`               |
| `backgroundColorCurrent` | `--background-color-current` |
| `backgroundColorHover`   | `--background-color-hover`   |
| `textColorCurrent`       | `--text-color-current`       |
| `textColorHover`         | `--text-color-hover`         |

## Outputs

| Output Name      | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| `inputEvent`     | Fires when the user selects an option (maps `input`).       |
| `changeEvent`    | Fires when the value changes (maps `change`).               |
| `focusEvent`     | Fires on focus (renamed from `focus`).                      |
| `blurEvent`      | Fires on blur (renamed from `blur`).                        |
| `clearEvent`     | Emitted when the clear button is clicked (maps `wa-clear`). |
| `showEvent`      | Emitted when the dropdown opens (maps `wa-show`).           |
| `afterShowEvent` | After the dropdown is fully opened (maps `wa-after-show`).  |
| `hideEvent`      | Emitted when the dropdown closes (maps `wa-hide`).          |
| `afterHideEvent` | After the dropdown is fully closed (maps `wa-after-hide`).  |
| `invalidEvent`   | When constraint validation fails (maps `wa-invalid`).       |

## Notes

* Always bind to `[(ngModel)]="model"` for both single and multiple selection.
* When using `multiple`, bind `[(ngModel)]` to a space-delimited `string`, or convert `string[]` to/from space-delimited form internally.
* This wrapper does **not** support Angular reactive forms or signal-based binding.

## Example

```html
<wa-select
  [(ngModel)]="selectedOption"
  label="Select one"
  placeholder="Choose an option"
  with-clear
  [disabled]="false"
  (changeEvent)="onChange($event)"
  style.backgroundColor="white"
  style.borderColor="gray"
>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

## Custom Tags for Multi-Select

When `multiple` is true, you can customize rendered tags by assigning a function to the element’s `getTag` property. Your function receives the `<wa-option>` element and the tag index and must return a string of HTML or an HTMLElement.

```html
<wa-select multiple with-clear class="custom-tag">
  <wa-option value="email" selected>
    <wa-icon slot="start" name="envelope" variant="solid"></wa-icon>
    Email
  </wa-option>
  <wa-option value="phone" selected>
    <wa-icon slot="start" name="phone" variant="solid"></wa-icon>
    Phone
  </wa-option>
</wa-select>
<script type="module">
  await customElements.whenDefined('wa-select');
  const el = document.querySelector('.custom-tag');
  if (el && 'updateComplete' in el) await el.updateComplete;
  el.getTag = (option) => `<wa-tag with-remove>${option.label || option.textContent?.trim() || ''}</wa-tag>`;
</script>
```

## Slots
- (default) — The listbox options. Must be `<wa-option>` elements. You can use `<wa-divider>` to group items visually.
- label — The input’s label. Alternatively, use the `label` attribute.
- start — Presentational element placed at the start of the combobox (e.g., `<wa-icon>`).
- end — Presentational element placed at the end.
- clear-icon — Icon used instead of the default clear icon.
- expand-icon — The icon that rotates when the control opens/closes.
- hint — Text that describes how to use the input. Alternatively, use the `hint` attribute.

## Attributes & Properties
- name: string — Control name submitted with form data.
- value: string | string[] — The select’s value (string for single, array for multi).
- size: 'small' | 'medium' | 'large' — Size of the control. Default 'medium'.
- placeholder: string — Placeholder when the select is empty.
- multiple: boolean — Allows more than one option to be selected.
- max-options-visible: number — Max number of tags to show when `multiple`. 0 to remove limit. Default 3.
- disabled: boolean — Disables the control.
- with-clear: boolean — Shows a clear button when not empty.
- open: boolean — Reflects whether the menu is open.
- appearance: 'filled' | 'outlined' — Visual appearance. Default 'outlined'.
- pill: boolean — Draw rounded edges.
- label: string — Accessible label (or use slot).
- placement: 'top' | 'bottom' — Preferred placement. Default 'bottom'.
- hint: string — Hint (or use slot).
- with-label: boolean — SSR aid when label is slotted. Shows label on first render.
- with-hint: boolean — SSR aid when hint is slotted. Shows hint on first render.
- form: string — Associate control to a form by id when outside.
- required: boolean — Native required attribute.
- getTag: Function — Custom tag renderer for multiselect.

## Methods
- show(): void — Opens the listbox.
- hide(): void — Closes the listbox.
- focus(options?: FocusOptions): void — Sets focus.
- blur(): void — Removes focus.

## Events
- input — Emitted when the control receives input.
- change — Emitted when the control’s value changes.
- focus — Emitted when the control gains focus.
- blur — Emitted when the control loses focus.
- wa-clear — Emitted when the value is cleared.
- wa-show / wa-after-show — When the menu opens / after animations.
- wa-hide / wa-after-hide — When the menu closes / after animations.
- wa-invalid — When validity checks fail.

## CSS custom properties
- --tag-max-size — When using multiple, the max size of tags before content truncates. Default 10ch.

## Custom states
- :state(blank) — The select is empty.

## CSS parts
- form-control — Wrapper around label, input, and hint.
- form-control-label — Label wrapper.
- form-control-input — Select wrapper.
- hint — Hint wrapper.
- combobox — Container that wraps start, end, value, clear icon, and expand button.
- start — Start slot container.
- end — End slot container.
- display-input — Element that displays the selected label.
- listbox — Listbox container where options are slotted.
- tags — Container that houses option tags when multiselect is used.
- tag — Individual tag.
- tag__content — Tag content part.
- tag__remove-button — Tag remove button.
- tag__remove-button__base — Tag remove button base part.
- clear-button — Clear button.
- expand-icon — Expand icon container.

## Option Support

* `<wa-option>` elements must be placed inside the wrapper content.
* Option-specific attributes like `value`, `label`, and `disabled` are supported natively.
* Option styling via the following mapped inputs is available:

| Input Name               | Maps To CSS Custom Property  |
| ------------------------ | ---------------------------- |
| `backgroundColorCurrent` | `--background-color-current` |
| `backgroundColorHover`   | `--background-color-hover`   |
| `textColorCurrent`       | `--text-color-current`       |
| `textColorHover`         | `--text-color-hover`         |
