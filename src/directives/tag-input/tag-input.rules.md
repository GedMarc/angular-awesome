# Tag Input Rules

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

## Overview

Tag inputs collect a list of short values, such as keywords, email addresses, or labels, as removable tags. Web Awesome added tag inputs in 3.13.0.

The standalone `WaTagInputDirective` uses a `string[]` model and implements `ControlValueAccessor` and `Validator`, so it works with `[(ngModel)]`, reactive forms, `required`, `minTags`, and `maxTags`. The array is assigned to the element's live `value` property rather than serialized into an HTML attribute.

## Selector

`wa-tag-input`

## API Reference

### Inputs

| Input | Type | Description |
| --- | --- | --- |
| `value` | `string[] \| null` | Current tags. Assigned as a live DOM property. |
| `defaultValue` | `string \| null` | Delimiter-separated initial/reset value. Maps to the `value` attribute and `defaultValue` property. |
| `inputValue` | `string` | Text currently typed but not yet converted into a tag. |
| `delimiter` | `string` | Characters that create tags. Each character is a delimiter. Default `,`; use an empty string for Enter-only creation. |
| `maxTags` | `number` | Maximum number of tags. Maps to `max-tags`. |
| `minTags` | `number` | Minimum number of tags when non-empty. Maps to `min-tags`. |
| `allowDuplicates` | `boolean` | Allows duplicate values. Maps to `allow-duplicates`. |
| `withClear` | `boolean` | Shows a button that removes all tags. Maps to `with-clear`. |
| `placeholder` | `string` | Placeholder shown while more tags can be added. |
| `label` | `string` | Plain-text label. Use the `label` slot for HTML. |
| `hint` | `string` | Plain-text hint. Use the `hint` slot for HTML. |
| `withLabel` | `boolean` | SSR hint that a label is supplied through the slot. Maps to `with-label`. |
| `withHint` | `boolean` | SSR hint that a hint is supplied through the slot. Maps to `with-hint`. |
| `size` | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'small' \| 'medium' \| 'large'` | Control and tag size. Default `m`. |
| `appearance` | `'filled' \| 'outlined' \| 'filled-outlined'` | Visual appearance. Default `outlined`. |
| `pill` | `boolean` | Uses rounded edges for the control and its tags. |
| `readonly` | `boolean` | Keeps tags visible and submitted while preventing changes. |
| `required` | `boolean` | Requires at least one tag. |
| `autocapitalize` | `'off' \| 'none' \| 'on' \| 'sentences' \| 'words' \| 'characters'` | Controls automatic capitalization. |
| `autocorrect` | `boolean` | Enables or disables browser autocorrect. |
| `autocomplete` | `string` | Browser autocomplete permission. Default `off`. |
| `enterkeyhint` | `'enter' \| 'done' \| 'go' \| 'next' \| 'previous' \| 'search' \| 'send'` | Virtual-keyboard Enter-key hint. |
| `spellcheck` | `boolean` | Enables spell checking. Default `true`. |
| `inputmode` | `'none' \| 'text' \| 'decimal' \| 'numeric' \| 'tel' \| 'search' \| 'email' \| 'url'` | Selects an appropriate virtual keyboard. |
| `name` | `string \| null` | Form field name. Each tag is submitted under this name. |
| `disabled` | `boolean` | Disables the control. Also managed by Angular forms. |
| `form` | `string \| null` | Id of an associated form when the control is outside it. |
| `validators` | `readonly unknown[]` | Custom validator objects assigned directly to the Web Awesome element. |
| `validationTarget` | `HTMLElement` | Element that anchors native constraint-validation popups. |

### Outputs

| Output | Payload | Description |
| --- | --- | --- |
| `waInput` / `wa-input` | `Event` | Emitted when text changes or a tag is added or removed. Updates the Angular form value. |
| `waChange` / `wa-change` | `Event` | Emitted when a tag is added, removed, or all tags are cleared. Updates the Angular form value. |
| `waFocus` / `wa-focus` | `FocusEvent` | Emitted when the control gains focus. |
| `waBlur` / `wa-blur` | `FocusEvent` | Emitted when the control loses focus and marks the Angular control touched. |
| `waCreate` / `wa-create` | `CustomEvent<{ inputValue: string }>` | Cancelable event emitted before typed text becomes a tag. |
| `waClear` / `wa-clear` | `CustomEvent` | Emitted when the clear button removes all tags. |
| `waInvalid` / `wa-invalid` | `CustomEvent` | Emitted after failed constraint validation. |
| `valueChange` | `string[]` | Current tags after input, change, or clear, enabling `[(value)]`. |

### Methods

| Method | Description |
| --- | --- |
| `focus(options?)` | Focuses the internal text box. |
| `blur()` | Removes focus from the internal text box. |
| `setCustomValidity(message)` | Sets a manual validity message. |
| `formStateRestoreCallback(state, reason)` | Delegates browser form-state restoration to the custom element. |
| `resetValidity()` | Clears manual and native validation errors. |

### Validation

The Angular validator reports:

- `required` when `required` is true and the array is empty.
- `minTags` when a non-empty array contains fewer than `minTags` entries. Like the Web Awesome control, `minTags` alone does not invalidate an empty optional value.
- `maxTags` when the model contains more than `maxTags` entries.

## Slots

| Slot | Description |
| --- | --- |
| `label` | HTML label content. |
| `start` | Content at the start of the control, such as an icon. |
| `end` | Content at the end of the control. |
| `clear-icon` | Replaces the default clear icon. |
| `hint` | HTML hint content. |

## Styling

The component exposes these CSS parts:

| Part | Description |
| --- | --- |
| `form-control-label` | Label wrapper. |
| `tag-input` | Bordered outer control. |
| `start` | Start-slot container. |
| `tags` | Tag-list container. |
| `tag` | Each generated `<wa-tag>`. |
| `tag__content` | Content exported from each generated tag. |
| `tag__remove-button` | Remove button exported from each generated tag. |
| `tag__remove-button__base` | Base part exported from each generated tag's remove button. |
| `input` | Internal text input. |
| `clear-button` | Clear-all button. |
| `end` | End-slot container. |
| `hint` | Hint wrapper. |

CSS custom states are `blank` when no tags exist and `readonly` while the control is read-only.

## Notes

- Use `[(ngModel)]` or a reactive form control for the `string[]` value. Use `defaultValue` only for the delimiter-separated initial/reset attribute.
- Cancel `waCreate` with `event.preventDefault()` to reject or validate a proposed tag before creation.
- Programmatic Angular model writes update the live value without emitting input or change events.
