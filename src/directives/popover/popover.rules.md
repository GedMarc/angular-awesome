## Popover Component Rules

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

### Component: `<wa-popover>`

Popover is a utility that lets you declaratively anchor "popover" containers to another element. It uses Floating UI under the hood to provide a well-tested, lightweight, and fully declarative positioning utility for tooltips, dropdowns, and more.

Popover doesn't provide any styles — just positioning! The popover's preferred placement, distance, and skidding (offset) can be configured using attributes. An arrow that points to the anchor can be shown and customized to your liking.

Popover is a low-level utility built specifically for positioning elements. Do not mistake it for a tooltip or similar because it does not facilitate an accessible experience! Almost every correct usage of `<wa-popover>` will involve building other components. It should rarely, if ever, occur directly in your HTML.

---

### Angular Directive Selector

`waPopover`

---

### Inputs

| Input                    | Type      | Description                                                                                                       |
| ------------------------ | --------- | ----------------------------------------------------------------------------------------------------------------- |
| `anchor`                 | `string`  | The element the popover will be anchored to. If the anchor lives outside of the popover, you can provide the anchor element id. |
| `active`                 | `boolean` | Activates the positioning logic and shows the popover. When this attribute is removed, the positioning logic is torn down and the popover will be hidden. |
| `placement`              | \`'top'   | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end'\` | The preferred placement of the popover. Note that the actual placement will vary as configured to keep the panel inside of the viewport. |
| `boundary`               | `string`  | Which bounding box to use for flipping, shifting, and auto-sizing? Options: 'viewport' or 'scroll'. Default is 'viewport'. |
| `distance`               | `number`  | The distance in pixels from which to offset the panel away from its anchor. Default is 0. |
| `skidding`               | `number`  | The distance in pixels from which to offset the panel along its anchor. Default is 0. |
| `arrow`                  | `boolean` | Attaches an arrow to the popover. The arrow's size and color can be customized using the --arrow-size and --arrow-color custom properties. |
| `arrowPlacement`         | `string`  | The placement of the arrow. Options: 'start', 'end', 'center', 'anchor'. Default is 'anchor'. |
| `arrowPadding`           | `number`  | The amount of padding between the arrow and the edges of the popover. Default is 10. |
| `flip`                   | `boolean` | When set, placement of the popover will flip to the opposite site to keep it in view. |
| `flipFallbackPlacements` | `string`  | If the preferred placement doesn't fit, popover will be tested in these fallback placements until one fits. Must be a string of any number of placements separated by a space. |
| `flipFallbackStrategy`   | `string`  | When neither the preferred placement nor the fallback placements fit, this value will be used to determine whether the popover should be positioned using the best available fit based on available space or as it was initially preferred. Options: 'best-fit' or 'initial'. Default is 'best-fit'. |
| `flipPadding`            | `number`  | The amount of padding, in pixels, to exceed before the flip behavior will occur. Default is 0. |
| `shift`                  | `boolean` | Moves the popover along the axis to keep it in view when clipped. |
| `shiftPadding`           | `number`  | The amount of padding, in pixels, to exceed before the shift behavior will occur. Default is 0. |
| `autoSize`               | `string`  | When set, this will cause the popover to automatically resize itself to prevent it from overflowing. Options: 'horizontal', 'vertical', 'both'. |
| `autoSizePadding`        | `number`  | The amount of padding, in pixels, to exceed before the auto-size behavior will occur. Default is 0. |
| `sync`                   | `string`  | Syncs the popover's width or height to that of the anchor element. Options: 'width', 'height', 'both'. |
| `hoverBridge`            | `boolean` | When a gap exists between the anchor and the popover element, this option will add a "hover bridge" that fills the gap using an invisible element. This makes listening for events such as mouseenter and mouseleave more sane because the pointer never technically leaves the element. The hover bridge will only be drawn when the popover is active. |

---

### Events

| Event           | Description                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `waReposition`  | Emitted when the popover is repositioned. This event can fire a lot, so avoid putting expensive operations in your listener or consider debouncing it. |

---

### CSS Custom Properties

| Property                        | Description                                                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `--arrow-size`                  | The size of the arrow. Note that an arrow won't be shown unless the arrow attribute is used. Default is 6px.      |
| `--arrow-color`                 | The color of the arrow. Default is black.                                                                         |
| `--auto-size-available-width`   | A read-only custom property that determines the amount of width the popover can be before overflowing. Useful for positioning child elements that need to overflow. This property is only available when using auto-size. |
| `--auto-size-available-height`  | A read-only custom property that determines the amount of height the popover can be before overflowing. Useful for positioning child elements that need to overflow. This property is only available when using auto-size. |
| `--show-duration`               | The show duration to use when applying built-in animation classes. Default is 100ms.                              |
| `--hide-duration`               | The hide duration to use when applying built-in animation classes. Default is 100ms.                              |

---

### CSS Parts

| Part            | Description                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `arrow`         | The arrow's container. Avoid setting top|bottom|left|right properties, as these values are assigned dynamically as the popover moves. This is most useful for applying a background color to match the popover, and maybe a border or box shadow. |
| `popover`       | The popover's container. Useful for setting a background color, box shadow, etc.                                             |
| `hover-bridge`  | The hover bridge element. Only available when the hover-bridge option is enabled.                                          |

---

### Methods

| Method          | Description                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `reposition()`  | Forces the popover to recalculate and reposition itself.                                                                     |

---

### Built-in Animations

The following classes can be applied to the popover's popover part to animate it in or out programmatically. You can control the animation duration with the `--show-duration` and `--hide-duration` custom properties.

- `show` / `hide` - Shows or hides the popover with a fade
- `show-with-scale` / `hide-with-scale` - Shows or hides the popover with a fade and subtle scale effect

---

### Slots

| Name            | Description                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| (default)       | The popover's content.                                                                                                       |
| `anchor`        | The element the popover will be anchored to. If the anchor lives outside of the popover, you can use the anchor attribute or property instead. |

---

### Notes

* A popover's anchor should not be styled with `display: contents` since the coordinates will not be eligible for calculation. However, if the anchor is a `<slot>` element, popover will use the first assigned element as the anchor. This behavior allows other components to pass anchors through more easily via composition.
* When using virtual elements, you must provide a function called `getBoundingClientRect()` that returns a DOMRect object.
* The popover component is a low-level utility that should typically be used to build other components rather than being used directly in your HTML.
* When using the `flip` attribute, you can observe the popover's current placement when it's active by looking at the `data-current-placement` attribute.

---

### Spec + Index + Example files

Ensure the Angular generator also creates:

* `wa-popover.directive.ts`
* `wa-popover.directive.spec.ts`
* `index.ts` export barrel
* `README.md` referencing this `rules.md`
* `examples.md` with placement, distance, skidding, arrow, flip, shift, auto-size, sync, and hover-bridge samples.
