# Combobox Component Rules

The native `<wa-combobox>` Web Awesome component combines a filterable text input with a listbox so users can search, select, or enter custom values. Use the `wa-combobox` tag directly so the Web Awesome runtime upgrades it.

📌 Follows the base [Web Awesome Angular Rules](../../../RULES.md).

## Overview
- Selector: `wa-combobox`
- Purpose: hybrid text input/listbox that supports filtering, custom tags, and multi-select chips.
- Angular: exposes ControlValueAccessor via `[(ngModel)]` for single and multiple selection.

## Inputs

| Input | Type | Description |
| --- | --- | --- |
| `value` | `string \| string[]` | Bound via `[(ngModel)]`. Single returns string, multiple returns array. |
| `name` | `string` | Submitted with form data. |
| `label` | `string` | Accessible label. Slot alternative available. |
| `hint` | `string` | Helper text shown below control. |
| `placeholder` | `string` | Hint text when empty. |
| `appearance` | `'filled' \| 'outlined' \| 'filled-outlined'` | Visual style. |
| `pill` | `boolean` | Rounds the edges. |
| `withClear` | `boolean` | Adds clear button when not empty. |
| `disabled` | `boolean` | Disables input. |
| `multiple` | `boolean` | Enables tag-based multi-select. |
| `size` | `'small' \| 'medium' \| 'large'` | Control size. |
| `placement` | `'top' \| 'bottom'` | Preferred panel placement. |
| `required` | `boolean` | Participates in native validation. |
| `maxOptionsVisible` | `number` | For multi-select, cap visible tags before `+n`. |
| `withLabel` | `boolean` | SSR hint for label slot. |
| `withHint` | `boolean` | SSR hint for hint slot. |
| `allowCustomValue` | `boolean` | When true, accept text not matching any option (single select only). |
| `autocomplete` | `'list' \| 'none'` | Controls default filtering strategy. |
| `validationTarget` | `string` | Anchor native constraint tooltips. |
| `filter` | `(option: WaOption, query: string) => boolean` | Custom filter predicate. Assign via property binding. |
| `getTag` | `(option: WaOption, index: number) => TemplateResult \| string \| HTMLElement` | Custom renderer for multiselect tags. |
| `valueField` | `string` | When binding objects, property to use as key. |
| `trackBy` | `(item: any) => string` | Custom key generator for object values. |
| `backgroundColor` | CSS | Maps to `--background-color`. |
| `borderColor` | CSS | Maps to `--border-color`. |
| `borderWidth` | CSS | Maps to `--border-width`. |
| `boxShadow` | CSS | Maps to `--box-shadow`. |
| `backgroundColorCurrent` | CSS | Maps to `--background-color-current`. |
| `backgroundColorHover` | CSS | Maps to `--background-color-hover`. |
| `textColorCurrent` | CSS | Maps to `--text-color-current`. |
| `textColorHover` | CSS | Maps to `--text-color-hover`. |

## Outputs

| Output | Description |
| --- | --- |
| `inputEvent` | Fires on user input (`input`, `wa-input`). |
| `changeEvent` | Fires when selection changes (`change`, `wa-change`). |
| `focusEvent` | Emits native `focusNative`. |
| `blurEvent` | Emits `blurNative` and calls `onTouched`. |
| `clearEvent` | Mirrors `wa-clear`. |
| `showEvent` / `afterShowEvent` | Panel lifecycle events (`wa-show`, `wa-after-show`). |
| `hideEvent` / `afterHideEvent` | Panel lifecycle events (`wa-hide`, `wa-after-hide`). |
| `invalidEvent` | Mirrors `wa-invalid` for Angular validators. |

## Usage

```html
<wa-combobox
  [(ngModel)]="favorite"
  label="Favorite Fruit"
  placeholder="Start typing"
  with-clear
>
  <wa-option value="apple">Apple</wa-option>
  <wa-option value="banana">Banana</wa-option>
  <wa-option value="cherry">Cherry</wa-option>
</wa-combobox>
```

For multiple selections:

```html
<wa-combobox [(ngModel)]="selected" multiple with-clear>
  <wa-option value="email" selected>Email</wa-option>
  <wa-option value="phone">Phone</wa-option>
</wa-combobox>
```

## Notes
- In multiple mode, the text field is only for filtering; after selecting an option it clears automatically.
- When binding objects, use `valueField` or `trackBy` so tags remain stable across rerenders.
- `allowCustomValue` only works for single select. Multiple requires matching `<wa-option>` values.
- `filter` and `getTag` must be assigned to the underlying element via property bindings (`[filter]`, `[getTag]`).

## Slots
- default: `<wa-option>` list, with optional `<wa-divider>` separators.
- `label`: custom label content.
- `start` / `end`: icons or adornments inside the control.
- `clear-icon`: override default clear icon.
- `expand-icon`: swap dropdown chevron.
- `hint`: rich helper content.

## Attributes & Properties
- `name`: posted form name.
- `value`: string or `string[]` (when multiple).
- `inputValue`: current text input value (read-only) for filtering scenarios.
- `max-options-visible`: numeric limit for visible tags.
- `open`: reflects expanded state; can be toggled programmatically.
- `appearance`: `'filled' | 'outlined' | 'filled-outlined'` (default `outlined`).
- `pill`: custom rounded variant.
- `placement`: `'top' | 'bottom'` (default `bottom`).
- `hint`: attribute alternative to slot.
- `with-label` / `with-hint`: SSR helpers.
- `required`: native HTML required flag.
- `autocomplete`: `'list' | 'none'` (default `list`).
- `allow-custom-value`: allow arbitrary strings.
- `filter`: custom match function.
- `getTag`: custom tag renderer.

## Methods
- `show()` / `hide()` — programmatically open or close the listbox.
- `focus(options?)` — focus the control.
- `blur()` — remove focus.

## Events
- `input`, `change`, `focus`, `blur`, `wa-clear`, `wa-show`, `wa-after-show`, `wa-hide`, `wa-after-hide`, `wa-invalid`.

## Styling
Use the exposed CSS parts to customize visuals:

- `::part(form-control)`, `::part(label)`, `::part(combobox)`, `::part(start)`, `::part(end)`,
  `::part(combobox-input)`, `::part(listbox)`, `::part(tags)`, `::part(tag)`,
  `::part(tag__remove-button)`, `::part(clear-button)`, `::part(expand-icon)`.

CSS custom properties of interest:

- `--show-duration`, `--hide-duration` for transition timing.
- `--tag-max-size` to truncate tag content.

## Accessibility
- Always provide a label via `label` or the `label` slot.
- Hint text should complement the label and describe filtering/selection rules.
- Screen readers announce results via live region announcements provided by Web Awesome.

## Testing Strategy
- Verify single and multiple binding via `[(ngModel)]`.
- Confirm `wa-clear` resets the model.
- Simulate custom filtering by assigning `[filter]`.
- Ensure validators (required) reflect Angular form state.

