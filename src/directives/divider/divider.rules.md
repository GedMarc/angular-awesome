📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

# Divider Rules (`wa-divider`)

Dividers visually separate or group elements. The Angular wrapper for `wa-divider` provides attribute binding, style control, and vertical/horizontal orientation support.

---

## Selector

```ts
wa-divider
```

## Inputs

| Input         | Type                           | Description                                                      |
| ------------- | ------------------------------ | ---------------------------------------------------------------- |
| `orientation` | `'vertical' \| 'horizontal'`   | Sets the orientation of the divider. Default is `'horizontal'`.   |
| `vertical`    | boolean                        | **Deprecated.** Use `orientation="vertical"` instead.             |
| `withLabel`   | boolean                        | Include the default-slot label in server-rendered markup.         |
| `labelPlacement` | `'start' \| 'center' \| 'end'` | Position of the default-slot label.                 |

### Style Inputs

All CSS custom properties from the Web Awesome component are supported as Angular-style inputs applied to the host:

| Input     | Maps to     | Description                         |
| --------- | ----------- | ----------------------------------- |
| `color`   | `--color`   | The color of the divider.           |
| `width`   | `--width`   | The thickness/width of the divider. |
| `spacing` | `--spacing` | Space around the divider.           |
| `labelSpacing` | `--label-spacing` | Space around the label. |
| `labelOffset` | `--label-offset` | Edge line length for start/end labels. |

The default slot accepts an optional label. The label container is exposed as the `label` CSS part.

These can be passed as strings, e.g.,

```html
<wa-divider [width]="'4px'" [color]="'tomato'" [spacing]="'2rem'"></wa-divider>
```

---

## Outputs

None.

---

## Angular Usage Examples

### Horizontal Divider with Custom Width

```html
<wa-divider [width]="'4px'"></wa-divider>
```

### Vertical Divider Inside a Flex Container

```html
<div style="display: flex; align-items: center; height: 2rem;">
  First
  <wa-divider orientation="vertical" [spacing]="'1rem'"></wa-divider>
  Middle
  <wa-divider orientation="vertical" [spacing]="'1rem'"></wa-divider>
  Last
</div>
```

### Dropdown with Divider

```html
<wa-dropdown style="max-width: 200px;">
  <wa-button slot="trigger">Options</wa-button>
  <wa-dropdown-item value="1">Option 1</wa-dropdown-item>
  <wa-dropdown-item value="2">Option 2</wa-dropdown-item>
  <wa-dropdown-item value="3">Option 3</wa-dropdown-item>
  <wa-divider></wa-divider>
  <wa-dropdown-item value="4">Option 4</wa-dropdown-item>
</wa-dropdown>
```

---

## Notes

* `orientation` accepts string values `'vertical'` or `'horizontal'` and can be used as a direct attribute (e.g., `orientation="vertical"`) or bound (e.g., `[orientation]="'vertical'"`).
* The `vertical` attribute is deprecated but still supported for backward compatibility.
* The directive does not emit events.
* All style inputs support both binding and string literals.

---

## Related

* [Menu Rules](../menu/menu.rules.md)
