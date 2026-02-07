# Textarea Directive Rules

The `wa-textarea` wraps the `<wa-textarea>` Web Awesome component. Textareas collect data from the user and allow multiple lines of text.

## Overview
- Selector: `wa-textarea` (native tag selector)
- Works with standard `<form>` elements and supports template-driven forms via `[(ngModel)]`.

## Usage
```html
<!-- Basic -->
<wa-textarea label="Type something', will ya"></wa-textarea>
```

## Slots
- label — The textarea's label. Alternatively, you can use the `label` attribute.
- hint — Text that describes how to use the input. Alternatively, you can use the `hint` attribute.

## Attributes & Properties
- name: string | null — The name of the textarea, submitted with form data. Default null
- value: string — The current value of the input, submitted with form data.
- defaultValue: string — The default value of the form control. Primarily used for resetting the form control.
- size: 'small' | 'medium' | 'large' — The textarea's size. Default 'medium'
- appearance: 'filled' | 'outlined' — Visual appearance. Default 'outlined'
- label: string — The textarea's label. If you need to display HTML, use the label slot instead.
- hint: string — The textarea's hint. If you need to display HTML, use the hint slot instead.
- placeholder: string — Placeholder text to show as a hint when the input is empty.
- rows: number — The number of rows to display by default. Default 4
- resize: 'none' | 'vertical' | 'horizontal' | 'both' | 'auto' — Controls how the textarea can be resized. Default 'vertical'
- disabled: boolean — Disables the textarea.
- readonly: boolean — Makes the textarea readonly.
- form: string | null — Associate the control to a form by id when outside a form. Default null
- required: boolean — Makes the textarea a required field.
- minlength: number — The minimum length of input that will be considered valid.
- maxlength: number — The maximum length of input that will be considered valid.
- autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' — Auto-capitalization mode.
- autocorrect: string — Browser autocorrect hint.
- autocomplete: string — Browser autocomplete hint (see MDN for values).
- autofocus: boolean — Focus on load.
- enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' — Enter key hint for virtual keyboards.
- spellcheck: boolean — Enables spell checking. Default true
- inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' — Virtual keyboard type.
- withLabel: boolean — SSR helper when a label element is slotted.
- withHint: boolean — SSR helper when hint is slotted.

## Methods
- focus(options?: FocusOptions) — Sets focus on the textarea.
- blur() — Removes focus from the textarea.
- select() — Selects all the text in the textarea.
- scrollPosition(position?: { top?: number; left?: number }) — Gets or sets the textarea's scroll position.
- setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection: 'forward' | 'backward' | 'none') — Sets selection range.
- setRangeText(replacement: string, start: number, end: number, selectMode: 'select' | 'start' | 'end' | 'preserve') — Replaces a range of text.

## Events
- blur — Emitted when the control loses focus.
- change — Emitted when an alteration to the control's value is committed by the user.
- focus — Emitted when the control gains focus.
- input — Emitted when the control receives input.
- wa-invalid — Emitted when validity is checked and constraints aren't satisfied.

## Custom States
- blank — The textarea is empty. CSS selector: `:state(blank)`

## CSS parts
- label — The label
- form-control-input — The input's wrapper.
- hint — The hint's wrapper.
- textarea — The internal `<textarea>` control.
- base — The wrapper around the `<textarea>` control.
