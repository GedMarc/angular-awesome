---
name: angular-awesome-migration
description: "Migrate Angular Awesome component wrappers when the upstream Web Awesome API changes. Use when replacing custom implementations with official web components, updating property names or types, removing deprecated fields, aligning placement/position values, updating tests for new APIs, and updating docs/changelog for breaking changes."
metadata:
  short-description: Migrate Angular Awesome components to updated Web Awesome APIs
---

# Angular Awesome — Migration

Workflow for migrating wrapper implementations when the upstream Web Awesome component API changes.

## When to Use

- A Web Awesome component goes from missing/custom to officially supported (e.g., toast)
- Property names or types change upstream (e.g., `position` → `placement`)
- New properties/events/slots are added to an existing component
- Deprecated properties need removal

## Migration Workflow

1. **Identify changes** — compare `llms.txt` API with current directive implementation.
2. **Update types** — modify `src/types/tokens.ts` or component-local types.
3. **Create new directives** (if new web components) — follow `$angular-awesome-new-component`.
4. **Update existing directive** — add/remove/rename inputs, update `applyInputs()`.
5. **Update container/service** (if applicable) — swap internal rendering.
6. **Update tests** — fix all specs to use new API; add tests for new behavior.
7. **Use official names only** — do not create deprecated aliases; use the upstream property and type names directly.
8. **Update documentation** — rules.md, example.md, CHANGELOG.md.
9. **Build + test** — `npx ng build` && scoped test run.
10. **Regenerate docs** — `node docs/generate-docs.js`.

## Example: Toast Migration (Custom → Official)

**Before:** Custom `wa-toast-container` rendering `<wa-callout>` elements with manual CSS positioning.

**After:** Official `<wa-toast>` + `<wa-toast-item>` web components.

Changes made:
- Created `WaToastDirective` (new, wraps `<wa-toast>`)
- Created `WaToastItemDirective` (new, wraps `<wa-toast-item>`)
- Updated `WaToastContainerComponent` template from `<wa-callout>` to `<wa-toast>` + `<wa-toast-item>`
- Renamed `ToastConfig.position` → `ToastConfig.placement` with new values (`top-start`/`top-end` instead of `top-left`/`top-right`)
- Removed `appearance`, `closable`, `gap`, `zIndex` from types (handled natively)
- Removed legacy `ToastPosition` type — use `ToastPlacement` instead
- Updated all tests and docs

## Backwards Compatibility Checklist

- [ ] Use only official upstream property and type names — do not create deprecated aliases
- [ ] Document breaking changes clearly in CHANGELOG.md Notes section
- [ ] List removed properties and their replacements
- [ ] Note which service methods remain compatible
- [ ] Update version badge in docs template if major alignment version changes

## Property Mapping Table Template

| Old Property | New Property | Notes |
|-------------|-------------|-------|
| `position` | `placement` | Values also changed: `top-right` → `top-end` |
| `closable` | *(removed)* | Handled by native `<wa-toast-item>` close button |
| `appearance` | *(removed)* | Not supported by official `<wa-toast-item>` |
| `gap` | `--gap` CSS var | Set via CSS custom property on `<wa-toast>` |
| `zIndex` | *(removed)* | Managed by native component stacking |

