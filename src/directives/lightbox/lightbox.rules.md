# Lightbox

Open a full-screen gallery of images and videos from their thumbnails.

## Overview

Import `WaLightboxDirective` and `WaLightboxItemDirective` from `angular-awesome`. Place one or more lightbox items inside the gallery.

## API Reference

| Input | Purpose |
| --- | --- |
| `index` | Zero-based starting or current item index. |
| `open` | Controls whether the lightbox is open. |
| `label` | Accessible gallery name. |
| `loop`, `withThumbnails` | Enable wraparound navigation and a thumbnail strip. |
| `withoutNavigation`, `withoutCounter`, `withoutZoom` | Hide gallery controls or disable zoom. |

Call `next()`, `previous()`, `zoomIn()`, or `zoomOut()` on the directive. Read `items` and `currentItem` to implement custom actions.

Both camelCase and native output names are available. `waShow` and `waHide` are cancelable. `waAfterShow` and `waAfterHide` fire after transitions. `waItemChange` carries the current and previous indices and items.

Use the `actions` slot for toolbar buttons. Override the built-in icons with the `close-icon`, `previous-icon`, `next-icon`, `zoom-in-icon`, and `zoom-out-icon` slots.

## Styling

Style inputs include `backdropColor`, `backdropFilter`, `mediaBorderRadius`, `controlsColor`, `controlsBackground`, `showDuration`, `hideDuration`, `spacing`, `slideGap`, and `thumbnailSize`.

Use the `toolbar`, `caption`, `image`, `video`, and `thumbnail` parts for targeted styling.

[Web Awesome lightbox](https://webawesome.com/docs/components/lightbox/)
