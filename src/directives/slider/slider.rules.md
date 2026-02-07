# Slider Component Rules for Angular Wrapper

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

## Component Overview

`<wa-slider>` is a range input component that supports single and dual-thumb range selection, vertical orientation, markers, tooltips, reference labels, and custom styling.

## Angular Wrapper Requirements

### Selector

`wa-slider`

### Module Declaration

```ts
import { WaSliderDirective } from './slider.directive';
```

### Inputs

| Input Name        | Type                                | Description                                      |
| ----------------- | ----------------------------------- | ------------------------------------------------ |
| `min`             | `number`                            | Minimum value allowed                            |
| `max`             | `number`                            | Maximum value allowed                            |
| `step`            | `number`                            | Step size                                        |
| `disabled`        | `boolean`                           | Whether the slider is disabled                   |
| `readonly`        | `boolean`                           | Makes the slider read-only                       |
| `required`        | `boolean`                           | Makes the slider a required field                |
| `label`           | `string`                            | Label text (or use label slot)                   |
| `hint`            | `string`                            | Hint text (or use hint slot)                     |
| `name`            | `string`                            | Form name                                        |
| `form`            | `string`                            | Form association (by id)                         |
| `withLabel`       | `boolean`                           | SSR optimization for label slot                  |
| `withHint`        | `boolean`                           | SSR optimization for hint slot                   |
| `range`           | `boolean`                           | Enables dual-thumb range selection               |
| `minValue`        | `number`                            | Min value for range selection                    |
| `maxValue`        | `number`                            | Max value for range selection                    |
| `orientation`     | `'horizontal' \| 'vertical'`        | Slider orientation                               |
| `size`            | `'small' \| 'medium' \| 'large'`    | Slider size                                      |
| `indicatorOffset` | `number`                            | Starting value for the filled indicator          |
| `withMarkers`     | `boolean`                           | Shows markers at each step                       |
| `withTooltip`     | `boolean`                           | Shows tooltip with current value                 |
| `tooltipDistance` | `number`                            | Distance of tooltip from thumb                   |
| `tooltipPlacement`| `'top' \| 'right' \| 'bottom' \| 'left'` | Tooltip placement                          |
| `autofocus`       | `boolean`                           | Autofocus the slider when page loads             |
| `style.*`         | `string`                            | Set custom properties as Angular-style inputs    |

Use camelCase Angular inputs to bind CSS custom properties:

* `trackSize` → `--track-size`
* `markerWidth` → `--marker-width`
* `markerHeight` → `--marker-height`
* `thumbWidth` → `--thumb-width`
* `thumbHeight` → `--thumb-height`

### Outputs

| Output Name    | Description                       |
| -------------- | --------------------------------- |
| `blurEvent`    | Emits when the slider loses focus |
| `focusEvent`   | Emits when the slider gains focus |
| `changeEvent`  | Emits when the value is committed |
| `inputEvent`   | Emits on value change (real-time) |
| `invalidEvent` | Emits when validity check fails   |

### Forms Compatibility

✅ Supports `ngModel`

```html
<!-- Single value slider -->
<wa-slider [(ngModel)]="value" [min]="0" [max]="100" label="Volume"></wa-slider>

<!-- Range slider -->
<wa-slider [(ngModel)]="priceRange" [range]="true" [min]="0" [max]="1000" label="Price Range"></wa-slider>
```

For range sliders, the model value should be an object with `min` and `max` properties:

```typescript
// In your component
priceRange = { min: 200, max: 800 };
```

🔁 Reactive forms **not supported**.

### Slots

| Slot Name    | Description                                                |
| ------------ | ---------------------------------------------------------- |
| `label`      | Optional slot for HTML content in the label                |
| `hint`       | Optional slot for HTML content in the hint                 |
| `reference`  | Reference labels to show below the slider (multiple allowed) |

### Methods

| Method Name | Description                                      | Arguments |
| ----------- | ------------------------------------------------ | --------- |
| `focus()`   | Sets focus to the slider                         | None      |
| `blur()`    | Removes focus from the slider                    | None      |
| `stepUp()`  | Increases the slider's value by step             | None      |
| `stepDown()`| Decreases the slider's value by step             | None      |

### Value Formatting

The slider supports custom value formatting for tooltips and screen readers:

```javascript
const slider = document.getElementById('my-slider');
slider.valueFormatter = (value) => `$${value.toFixed(2)}`;
```

In Angular, you can use the `setValueFormatter` method after getting a reference to the slider element:

```javascript
// After getting a reference to the slider element
sliderElement.valueFormatter = (value) => `$${value.toFixed(2)}`;
// Or use the helper method
sliderElement.setValueFormatter((value) => `$${value.toFixed(2)}`);
```

### Styling

Use Angular-style inputs that directly map to CSS custom properties on the host element:

```html
<!-- Example of styling inputs -->
<wa-slider
  [trackSize]="'0.75em'"
  [markerWidth]="'0.1875em'"
  [markerHeight]="'0.1875em'"
  [thumbWidth]="'1.25em'"
  [thumbHeight]="'1.25em'">
</wa-slider>
```

### Example Usage

```html
<!-- Basic slider -->
<wa-slider
  [(ngModel)]="volume"
  [min]="0"
  [max]="100"
  [step]="5"
  [withTooltip]="true"
  label="Volume"
  hint="Controls the volume of the current song."
  [trackSize]="'0.75em'"
  [thumbWidth]="'1.25em'"
  [thumbHeight]="'1.25em'">
</wa-slider>

<!-- Range slider -->
<wa-slider
  [(ngModel)]="priceRange"
  [range]="true"
  [min]="0"
  [max]="1000"
  [minValue]="200"
  [maxValue]="800"
  [withTooltip]="true"
  [withMarkers]="true"
  label="Price Range">
  <span slot="reference">$0</span>
  <span slot="reference">$500</span>
  <span slot="reference">$1000</span>
</wa-slider>

<!-- Vertical slider -->
<wa-slider
  [(ngModel)]="brightness"
  orientation="vertical"
  [min]="0"
  [max]="100"
  [withTooltip]="true"
  tooltipPlacement="right"
  label="Brightness"
  style="height: 200px; width: 80px;">
</wa-slider>
```

---

Refer to the base [Web Awesome Angular Rules](../../../RULES.md) for shared conventions and binding behaviors.
