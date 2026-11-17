# Rich Text Editor

Edit formatted content and bind HTML or Markdown to an Angular form.

## Overview

Import `WaRichTextEditorDirective` from `angular-awesome` and load the Web Awesome Pro 3.15 editor in your application. The wrapper supports `formControl`, `formControlName`, `ngModel`, and direct `[(value)]` binding.

## API Reference

| Inputs | Purpose |
| --- | --- |
| `value`, `defaultValue`, `format` | Live content, native form-reset value, and HTML or Markdown serialization. |
| `label`, `hint`, `withLabel`, `withHint`, `placeholder` | Labels, instructions, and SSR flags for the named slots. |
| `name`, `form`, `disabled`, `readonly`, `required`, `minLength`, `maxLength`, `validationTarget` | Native form association and validation. |
| `size`, `appearance`, `withCount` | Visual appearance and character count. |
| `toolbar`, `toolbarPlacement`, `iconLibrary`, `disabledFeatures`, `headingLevels` | Toolbar and editing features. |
| `textColors`, `highlightColors`, `linkTarget`, `linkRel` | Color palettes and link behavior. |
| `withoutSmartPunctuation`, `withoutMarkdownShortcuts`, `withoutAutolink` | Automatic formatting controls. |
| `autocapitalize`, `autocorrect`, `enterkeyhint`, `spellcheck`, `inputmode` | Browser text entry options. |
| `imageProvider`, `embedProvider`, `suggestions` | Custom image and embed resolution and typeahead sources. |

The directive emits `valueChange`, `waInput`, `waChange`, `waFocus`, `waBlur`, `selectionChange`, `waInvalid` / `wa-invalid`, and `waSuggestionsError` / `wa-suggestions-error`. You can also listen to the native `input`, `change`, `focus`, `blur`, and `selectionchange` events.

Use the `label`, `hint`, and `actions` slots for custom label, hint, and toolbar content. The default slot provides initial content when no reset value is specified.

Use `runCommand()`, `isActive()`, `insertHtml()`, `insertText()`, `deleteSelection()`, `selectAll()`, `undo()`, `redo()`, `getSelection()`, `focus()`, and `blur()` for custom toolbar interactions. The directive exposes `textValue`, `selectedText`, `canUndo`, `canRedo`, `dirty`, and the native ProseMirror `view`. Advanced consumers can use the actual ProseMirror type with the Web Awesome Pro package.

Use `minLength` and `maxLength` with Angular forms so the editor can count visible text. Angular’s lowercase `minlength` and `maxlength` validators count the serialized value, including markup.

Use the native component class for static validators. Use the directive's `setCustomValidity()`, `resetValidity()`, or `formStateRestoreCallback()` to delegate to the live element.

## Styling

Bind `contentMinHeight`, `contentMaxHeight`, `showDuration`, `hideDuration`, `shadowColor`, or `shadowSize` to set the corresponding CSS custom properties. Use the `toolbar`, `content`, and `count` parts to style the editor.

[Web Awesome Pro rich text editor](https://webawesome.com/docs/components/rich-text-editor/)
