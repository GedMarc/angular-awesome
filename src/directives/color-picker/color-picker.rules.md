📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

# `wa-color-picker` Angular Integration Rules

## Component Selector

`<wa-color-picker>` → `waColorPicker`

## Inputs

| Name                 | Type                                          | Binding Required | Notes                                                                                     |
| -------------------- | --------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------- |
| `label`              | `string`                                      | No               | Always set for accessibility. Supports `slot` alternative.                                |
| `hint`               | `string`                                      | No               | Descriptive hint; use `slot="hint"` for HTML hints.                                       |
| `value`              | `string \| null`                              | Yes              | Format depends on `format`/`opacity`. Binds via `ngModel`; do not use custom `[(value)]`. |
| `defaultValue`       | `string \| null`                              | No               | Default/reset value of the control.                                                       |
| `format`             | `'hex' \| 'rgb' \| 'hsl' \| 'hsv'`            | No               | Affects the internal format and toggle behavior.                                          |
| `withoutFormatToggle`| `boolean`                                     | Yes              | Removes the format toggle button.                                                         |
| `opacity`            | `boolean`                                     | Yes              | Enables alpha slider.                                                                     |
| `uppercase`          | `boolean`                                     | Yes              | Outputs uppercase color strings.                                                          |
| `size`               | `'small' \| 'medium' \| 'large' \| 'inherit'` | No               | Trigger button sizing.                                                                    |
| `disabled`           | `boolean`                                     | Yes              | Disables picker.                                                                          |
| `required`           | `boolean`                                     | Yes              | Marks input as required.                                                                  |
| `name`               | `string \| null`                              | No               | Used in form submissions.                                                                 |
| `form`               | `string \| null`                              | No               | Link to external form by ID.                                                              |
| `swatches`           | `string \| string[]`                          | Yes if dynamic   | Semicolon-separated string or JS array of color values.                                   |

## Outputs

| Event          | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| `change`       | Emitted when the color picker's value changes.                |
| `input`        | Emitted when the color picker receives input.                 |
| `wa-show`      | Fired when the color picker panel starts to open.             |
| `wa-after-show`| Fired after the color picker panel has opened.                |
| `wa-hide`      | Fired when the color picker panel starts to close.            |
| `wa-after-hide`| Fired after the color picker panel has closed.                |
| `focus`        | Emitted when the color picker receives focus.                 |
| `blur`         | Emitted when the color picker loses focus.                    |
| `wa-invalid`   | Emitted when the control is checked for validity and fails.   |

## Two-Way Binding (Template-Driven)

Use `[(ngModel)]` for binding form values in Angular template-driven forms. Do not use custom `[(value)]` syntax.

```html
<wa-color-picker [(ngModel)]="selectedColor" name="color" label="Pick a color"></wa-color-picker>
```

The `name` attribute is required for `ngModel` in forms.

## Methods

| Method                      | Description                      |
| --------------------------- | -------------------------------- |
| `focus()`                   | Programmatically focuses picker. |
| `blur()`                    | Removes focus from picker.       |
| `getFormattedValue(format)` | Returns formatted color string.  |
| `reportValidity()`          | Triggers form validation UI.     |
| `getHexString(h,s,v,a)`     | Converts HSV to hex string.      |

## Slot Support

| Slot    | Purpose                 |
| ------- | ----------------------- |
| `label` | Alternate label markup. |
| `hint`  | Alternate hint markup.  |

## Styling

CSS custom properties and parts supported by the underlying component:

CSS custom properties
- --grid-width: The width of the color grid.
- --grid-height: The height of the color grid.
- --grid-handle-size: The size of the color grid's handle.
- --slider-height: The height of the hue and alpha sliders.
- --slider-handle-size: The diameter of the slider's handle.

CSS parts
- base: The component's base wrapper.
- trigger: The color picker's dropdown trigger.
- swatches: The container that holds the swatches.
- swatch: Each individual swatch.
- grid: The color grid.
- grid-handle: The color grid's handle.
- slider: Hue and opacity sliders.
- slider-handle: Hue and opacity slider handles.
- hue-slider: The hue slider.
- hue-slider-handle: The hue slider's handle.
- opacity-slider: The opacity slider.
- opacity-slider-handle: The opacity slider's handle.
- preview: The preview color.
- input: The text input.
- eyedropper-button: The eye dropper button.
- eyedropper-button__base: The eye dropper button's exported button part.
- eyedropper-button__start: The eye dropper button's exported start part.
- eyedropper-button__label: The eye dropper button's exported label part.
- eyedropper-button__end: The eye dropper button's exported end part.
- eyedropper-button__caret: The eye dropper button's exported caret part.
- format-button: The format button.
- format-button__base: The format button's exported button part.
- format-button__start: The format button's exported start part.
- format-button__label: The format button's exported label part.
- format-button__end: The format button's exported end part.
- format-button__caret: The format button's exported caret part.

## Child Dependencies

Declare and import Angular wrappers for the following Web Awesome components:

* [`wa-button`](../button/button.rules.md)
* [`wa-button-group`](../button-group/button-group.rules.md)
* [`wa-dropdown`](../dropdown/dropdown.rules.md)
* [`wa-icon`](../icon/icon.rules.md)
* [`wa-input`](../input/input.rules.md)
* [`wa-popup`](../popup/popup.rules.md)
* [`wa-spinner`](../spinner/spinner.rules.md)
* [`wa-visually-hidden`](../visually-hidden/visually-hidden.rules.md)

Ensure these are registered or available in your module if not using autoloader.

## Form Integration

Supports **template-driven forms only** using `ngModel`. Reactive forms are not supported. Ensure `name` is set when using `ngModel`.

## Notes

* Always use property binding for boolean and array-based inputs (e.g. `[opacity]="true"`, `[swatches]="swatchArray"`).
* Use `@ViewChild()` to access public methods like `getFormattedValue()`.
* Internally handles a native `<input>` for form submission.
* Enforce consistent format output if format toggle is disabled.
* Use `[(ngModel)]` only — avoid custom binding aliases like `[(value)]`.
