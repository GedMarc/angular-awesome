📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

# wa-checkbox-group: Rules, API, and Usage

This file documents Angular integration for the `<wa-checkbox-group>` web component, aligning with the
provided component documentation. It complements the global rules in ../../../RULES.md.

## Overview

Checkbox groups give a set of related `<wa-checkbox>` or `<wa-switch>` elements a shared label, hint, and
grouping semantics. The group itself does not own a value — each child checkbox/switch continues to manage
its own `[(ngModel)]`, `formControlName`, or `formControl` binding.

## Component Selector

`<wa-checkbox-group>` → `WaCheckboxGroupDirective`

## Usage

```html
<wa-checkbox-group label="Choose your toppings" hint="Select all that apply">
  <wa-checkbox [(ngModel)]="cheese" name="cheese" value="cheese">Cheese</wa-checkbox>
  <wa-checkbox [(ngModel)]="pepperoni" name="pepperoni" value="pepperoni">Pepperoni</wa-checkbox>
  <wa-checkbox [(ngModel)]="mushrooms" name="mushrooms" value="mushrooms">Mushrooms</wa-checkbox>
</wa-checkbox-group>
```

## API Reference

### Inputs

| Name          | Type                                                              | Binding Required | Notes                                                                                          |
| ------------- | ---------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------- |
| `label`       | `string`                                                         | No               | The group's label. Required for proper accessibility. Use the `label` slot for HTML labels.    |
| `hint`        | `string`                                                         | No               | Descriptive hint text. Use the `hint` slot for HTML hints.                                     |
| `orientation` | `'horizontal' \| 'vertical'`                                     | No               | The orientation in which grouped checkboxes are shown. Defaults to `vertical`.                 |
| `size`        | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'small' \| 'medium' \| 'large'` | No          | Applied to all `<wa-checkbox>` and `<wa-switch>` items inside the group.                        |
| `required`    | `boolean \| string`                                             | Yes              | Adds a visual required indicator to the label. Enforce on individual checkboxes via `required`. |
| `withLabel`   | `boolean \| string`                                             | Yes              | SSR only — set when slotting in a `label` element.                                              |
| `withHint`    | `boolean \| string`                                             | Yes              | SSR only — set when slotting in a `hint` element.                                               |

### Slots

| Slot        | Description                                                            |
| ----------- | --------------------------------------------------------------------- |
| `(default)` | Where `<wa-checkbox>` or `<wa-switch>` elements are placed.            |
| `label`     | The group's label. Alternatively, use the `label` attribute.          |
| `hint`      | Text describing how to use the group. Alternatively, use `hint`.      |

### Methods

| Method          | Description                                  |
| --------------- | -------------------------------------------- |
| `nativeElement` | Getter exposing the underlying DOM element.  |

## Styling

### Styling Inputs

These Angular-style inputs map to the CSS custom properties exposed by the underlying component:

* `styleGap` → `--gap` (the gap between grouped checkboxes, default `0.5em`)

### CSS Custom Properties

| Name    | Description                          | Default  |
| ------- | ------------------------------------ | -------- |
| `--gap` | The gap between grouped checkboxes.  | `0.5em`  |

### CSS Parts

| Part                  | Description                                                            |
| --------------------- | --------------------------------------------------------------------- |
| `form-control`        | The form control that wraps the label, group, and hint.               |
| `form-control-label`  | The label's wrapper.                                                  |
| `form-control-input`  | The element wrapping the grouped checkboxes (`role="group"`).         |
| `hint`                | The hint's wrapper.                                                   |

## Notes

* The group does not implement `ControlValueAccessor`; bind values on the individual `<wa-checkbox>` /
  `<wa-switch>` elements instead.
* `required` on the group only renders a visual indicator. To enforce a minimum selection, set `required`
  on the relevant child checkboxes and/or use their `setCustomValidity()` method.
* Always provide a `label` (attribute or slot) for accessibility.

