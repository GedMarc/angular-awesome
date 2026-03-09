### `wa-resize-observer.rules.md`

**Angular 20 Directive Rules for `<wa-resize-observer>` Web Component**

---

## Overview

Angular directive support for the `wa-resize-observer` Web Component. The Resize Observer component offers a thin, declarative interface to the ResizeObserver API.

## Supported `@Input()` Bindings

| Input | Type | HTML Attribute | Notes |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `disabled` | Disables the observer |

## Events

| Output | Event | Description |
| --- | --- | --- |
| `waResize` | `wa-resize` | Emitted when the element is resized |

## Slots

| Slot | Description |
| --- | --- |
| `(default)` | One or more elements to watch for resizing |

