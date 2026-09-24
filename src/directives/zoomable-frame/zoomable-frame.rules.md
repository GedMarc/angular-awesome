# Zoomable Frame (`wa-zoomable-frame`)

`WaZoomableFrameDirective` binds iframe content and zoom controls to Web Awesome's zoomable frame.

## Inputs

`src`, `srcdoc`, `loading`, `referrerpolicy`, `sandbox`, `allowfullscreen`, `zoom`, `zoomLevels`, `withoutControls`, `withoutInteraction`, and `withThemeSync` retain their existing meanings. Web Awesome 3.14 adds `allow` for iframe Permissions Policy, `name` for link and form targets, and `label` for an accessible iframe name. Set `allow` and `sandbox` before the frame loads; updates affect the next navigation.

## Outputs

`load` fires when the internal iframe finishes loading; `error` forwards the error event. The directive exposes the native host element through Angular's element reference if additional Web Awesome APIs are needed.
