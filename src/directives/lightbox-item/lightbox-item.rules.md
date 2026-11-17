# Lightbox Item

Describe an image or video and provide the thumbnail that opens it in a lightbox.

## Overview

Import `WaLightboxItemDirective` from `angular-awesome` and nest the item in a `wa-lightbox`. Supply the thumbnail in the default slot or use the `thumbnail` input to populate the thumbnail strip without an inline thumbnail.

## API Reference

Use `type` to choose an image or video. Set `src`, optional responsive `srcset` and `sizes`, accessible `alt`, and a plain text `caption`. Set both `width` and `height` when intrinsic media dimensions are known.

Use the `play-icon` slot to replace the video thumbnail's play icon. Call `focus(options?)` to focus the thumbnail trigger. A `template` in the default slot can provide custom lightbox content.

## Styling

Use the `trigger` and `play-button` parts to customize the thumbnail controls.

[Web Awesome lightbox item](https://webawesome.com/docs/components/lightbox-item/)
