# Popup Directive

An Angular directive wrapper for the `<wa-popup>` Web Component that provides a utility for anchoring popup containers to other elements.

## Overview

The popup directive is a low-level utility built specifically for positioning elements. It uses Floating UI under the hood to provide a well-tested, lightweight, and fully declarative positioning utility for tooltips, dropdowns, and more.

Popup doesn't provide any styles — just positioning! The popup's preferred placement, distance, and skidding (offset) can be configured using attributes. An arrow that points to the anchor can be shown and customized to your liking.

## Usage

```html
<button id="popup-trigger">Open Popup</button>
<wa-popup anchor="popup-trigger" active>
  <div class="popup-content">
    This is a popup anchored to the button.
  </div>
</wa-popup>
```

## Documentation

For detailed documentation on inputs, outputs, CSS custom properties, and more, please refer to the [Popup Component Rules](./popup.rules.md).

## Examples

For usage examples, including placement, distance, skidding, arrows, and more, please refer to the [Popup Examples](./popup.example.md).

## Important Notes

- Popup is a low-level utility that should typically be used to build other components rather than being used directly in your HTML.
- When using the `flip` attribute, you can observe the popup's current placement when it's active by looking at the `data-current-placement` attribute.
- A popup's anchor should not be styled with `display: contents` since the coordinates will not be eligible for calculation.
