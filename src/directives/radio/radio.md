# Radio

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

## Selector

```ts
waRadio
```

## Description

The `waRadio` Angular wrapper enables binding and interaction with the `<wa-radio>` Web Component, which allows users to select a single option from a group. This component must be used as a child of `<wa-radio-group>`.

## Inputs

| Input          | Type                  | Description                                                          |
| -------------- | --------------------- | -------------------------------------------------------------------- |
| `value`        | `string`              | The radio's value. When selected, the radio group will receive this value. |
| `form`         | `string \| null`      | The string pointing to a form's id.                                  |
| `appearance`   | `'default' \| 'button'` | The radio's appearance. Use 'button' for button-style radios.        |
| `size`         | `'small' \| 'medium' \| 'large'` | The radio's size. When used inside a radio group, the size will be determined by the radio group's size. |
| `disabled`     | `boolean`             | Disables the radio.                                                  |
| `checked`      | `boolean`             | Whether the radio is checked.                                        |
| `withPrefix`   | `boolean`             | Used for SSR. If true, will show slotted prefix content on initial render. |
| `withSuffix`   | `boolean`             | Used for SSR. If true, will show slotted suffix content on initial render. |

## Outputs

| Output       | Description                           |
| ------------ | ------------------------------------- |
| `blur`       | Emitted when the control loses focus. |
| `focus`      | Emitted when the control gains focus. |

## Styling Inputs (CSS Custom Properties)

| Input name                   | Maps to CSS custom property      |
| ---------------------------- | -------------------------------- |
| `styleBackgroundColor`       | `--background-color`             |
| `styleBackgroundColorChecked`| `--background-color-checked`     |
| `styleBorderColor`           | `--border-color`                 |
| `styleBorderColorChecked`    | `--border-color-checked`         |
| `styleBorderStyle`           | `--border-style`                 |
| `styleBorderWidth`           | `--border-width`                 |
| `styleBoxShadow`             | `--box-shadow`                   |
| `styleCheckedIconColor`      | `--checked-icon-color`           |
| `styleCheckedIconScale`      | `--checked-icon-scale`           |
| `styleToggleSize`            | `--toggle-size`                  |

For `appearance="button"`:

| Input name              | Maps to CSS custom property |
| ----------------------- | --------------------------- |
| `styleIndicatorColor`   | `--indicator-color`         |
| `styleIndicatorWidth`   | `--indicator-width`         |
| `styleDisplay`          | `--display`                 |

## Slots

| Slot Name | Description                                                                       |
| --------- | --------------------------------------------------------------------------------- |
| (default) | The radio's label.                                                                |
| `start`   | For content to be placed before the radio (when using `appearance="button"`).     |
| `end`     | For content to be placed after the radio (when using `appearance="button"`).      |

## Custom States

| State     | Description                      | CSS selector        |
| --------- | -------------------------------- | ------------------- |
| `checked` | Applied when the control is checked. | `:state(checked)`  |
| `disabled`| Applied when the control is disabled.| `:state(disabled)` |

## CSS Parts

| Part name      | Description                                        |
| -------------- | -------------------------------------------------- |
| `control`      | The circular container that wraps the radio's checked state. |
| `checked-icon` | The checked icon.                                  |
| `label`        | The container that wraps the radio's label.        |

## Example Usage

```html
<!-- Basic usage within a radio group -->
<wa-radio-group [(ngModel)]="selectedValue" label="Select an option">
  <wa-radio value="option1">Option 1</wa-radio>
  <wa-radio value="option2" [disabled]="true">Option 2 (Disabled)</wa-radio>
  <wa-radio value="option3">Option 3</wa-radio>
</wa-radio-group>

<!-- Button appearance with custom styling -->
<wa-radio-group [(ngModel)]="selectedValue" orientation="horizontal">
  <wa-radio 
    appearance="button" 
    value="option1"
    [styleCheckedIconScale]="'0.8'"
    [styleCheckedIconColor]="'#4caf50'">
    Option 1
  </wa-radio>
  <wa-radio appearance="button" value="option2">Option 2</wa-radio>
</wa-radio-group>

<!-- With icons (button appearance) -->
<wa-radio appearance="button" value="home" [withPrefix]="true">
  <wa-icon name="home" slot="start"></wa-icon>
  Home
</wa-radio>
```

## Notes

* This component must be used as a child of `<wa-radio-group>`.
* Use `appearance="button"` to create button-style radios (replaces the deprecated `<wa-radio-button>`).
* The `size` attribute is typically inherited from the parent radio group.
* The `--checked-icon-scale` property can be used to adjust the size of the checked icon relative to the radio.
