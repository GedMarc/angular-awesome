
All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project adheres to Semantic Versioning.


## [3.5.0] - 2026-04-03
### Added
- **wa-button:** New `withStart` and `withEnd` SSR boolean inputs (render `with-start` / `with-end` attributes).
- **wa-color-picker:** New `placement` input for popup positioning, plus `withLabel` and `withHint` SSR boolean inputs.
- **wa-dialog:** New `withFooter` SSR boolean input (renders `with-footer` attribute).
- **wa-drawer:** New `withFooter` SSR boolean input (renders `with-footer` attribute).
- **wa-toast-item:** New `withIcon` SSR boolean input (renders `with-icon` attribute).
- **wa-textarea:** New `withCount` SSR boolean input (renders `with-count` attribute).
- **wa-rating:** Promoted to a form control — new `name`, `defaultValue`, `required`, and `form` inputs; new `wa-invalid` event output; new `setCustomValidity()` and `resetValidity()` methods.
- **wa-markdown:** New `WaMarkdownDirective` wrapping the `<wa-markdown>` web component with `tabSize` input and `getMarked()`, `updateAll()`, `renderMarkdown()` methods. Exported from the public API.
- **wa-page:** Promoted from Web Awesome Pro to Free — now available in the standard distribution.

### Changed
- **wa-textarea:** `autocorrect` input type widened from `string` to `boolean | string` to match the updated Web Awesome spec.
- Updated `llms.txt` to Web Awesome 3.5.0.

### Removed
- **wa-rating:** Removed deprecated `focus()` and `blur()` methods (replaced by `setCustomValidity()` / `resetValidity()`).

### Tests
- Updated `rating.directive.spec.ts` to cover new form-control methods and remove references to deleted `focus()`/`blur()` methods.
- Total test count: **929 specs, 0 failures**.

### Notes
- This release aligns Angular Awesome with the **Web Awesome 3.5.0** component specification.
- 8 components updated, 1 new component (`wa-markdown`), 1 component promoted to free (`wa-page`), ~15 new/updated properties, 1 new event (`wa-invalid` on rating), 2 removed methods.


## [3.4.0] - 2026-03-25
### Added
- **wa-badge:** New `attention` input (`'none' | 'pulse' | 'bounce'`) to control attention-drawing animation style.
- **wa-card:** New `withMedia` boolean input (renders `with-media` attribute) and `orientation` input (`'horizontal' | 'vertical'`).
- **wa-combobox:** Eight new inputs aligned with Web Awesome 3.4.1 spec:
  - `inputValue` (string — maps to `input-value` attribute)
  - `open` (boolean)
  - `allowCreate` (boolean — maps to `allow-create`)
  - `autocapitalize`, `autocorrect`, `inputmode`, `enterkeyhint`, `spellcheck` (text input behavior attributes)
  - New `waCreate` / `wa-create` event output — fires when the user creates a new option via `allowCreate`.
- **wa-dropdown:** New `open` boolean input and `size` input (`'small' | 'medium' | 'large'`).
- **wa-dropdown-item:** New `submenuOpen` boolean input (renders `submenu-open` attribute); `variant` type expanded to include `'default'`.
- **wa-icon:** Five new inputs:
  - `autoWidth` (boolean — renders `auto-width`)
  - `swapOpacity` (boolean — renders `swap-opacity`)
  - `rotate` (number — degrees)
  - `flip` (`'x' | 'y' | 'both'`)
  - `animation` (string)
- **wa-intersection-observer:** New `root` (string), `intersectClass` (string — renders `intersect-class`), and `once` (boolean) inputs.
- **wa-mutation-observer:** New `attr` (string), `attrOldValue` (boolean — renders `attr-old-value`), `charData` (boolean — renders `char-data`), `charDataOldValue` (boolean — renders `char-data-old-value`), and `childList` (boolean — renders `child-list`) inputs.
- **wa-popover:** New `open` (boolean) and `withoutArrow` (boolean — renders `without-arrow`) inputs.
- **wa-page:** New `disableNavigationToggle` boolean input (renders `disable-navigation-toggle`).
- **wa-select:** New `name` (string), `open` (boolean), `withLabel` (boolean — renders `with-label`), and `withHint` (boolean — renders `with-hint`) inputs.
- **wa-switch:** New `name` (string), `value` (string), `checked` (boolean), `required` (boolean), and `withHint` (boolean — renders `with-hint`) inputs.
- **wa-relative-time:** New `date` input (`Date | string`) — renders the `date` attribute as an ISO 8601 string.
- **wa-zoomable-frame:** New `withThemeSync` boolean input (renders `with-theme-sync`).

### Changed
- **wa-details:** Renamed `iconPosition` to `iconPlacement` (attribute `icon-placement`). The old `iconPosition` input is preserved as a deprecated backwards-compatible alias.
- **wa-rating:** Updated `getSymbol` input signature from `(value: number) => string` to `(value: number, isSelected: boolean) => string` to match the Web Awesome 3.4.1 API.
- Updated `llms.txt` version reference from 3.4.0 to 3.4.1.
- Updated package version from 3.3.2 to 3.4.0.
- Updated package description to reference Web Awesome 3.4.x.
- Updated docs template version badge to "synced with Web Awesome 3.4.x".

### Tests
- Updated existing test suites for all 16 affected components to cover new inputs, events, boolean attribute coercion, and attribute name mappings.
- Created five new spec files for components that previously lacked tests:
  - `details.directive.spec.ts` — full coverage including `iconPlacement`, deprecated `iconPosition` alias, events, CSS vars, and programmatic `show()`/`hide()`.
  - `dropdown-item.directive.spec.ts` — full coverage including `submenuOpen`, `variant` values, ControlValueAccessor.
  - `intersection-observer.directive.spec.ts` — full coverage including `root`, `intersectClass`, `once`, threshold arrays.
  - `mutation-observer.directive.spec.ts` — full coverage including `attr`, `attrOldValue`, `charData`, `charDataOldValue`, `childList`.
  - `zoomable-frame.directive.spec.ts` — full coverage including `withThemeSync`, `zoom`, `srcdoc`, boolean attributes.
- Total test count: **929 specs, 0 failures**.

### Documentation
- Updated Angular Awesome rules files for combobox, details, icon, badge, popover, dropdown, and switch.
- Created `PROMPT_JWEBMP_341_SYNC.md` — a ready-to-execute prompt for downstream JWebMP Java wrapper consumers detailing all 16 component changes with Java code examples and enum patterns.

### Notes
- This release aligns Angular Awesome with the **Web Awesome 3.4.1** component specification (`llms.txt`).
- 16 components updated, ~40 new/updated properties, 1 new event (`wa-create`), 1 property rename (`iconPosition` → `iconPlacement`).
- The `iconPosition` → `iconPlacement` rename includes a deprecated backwards-compatible alias setter to avoid breaking existing consumers.
- The `getSymbol` signature change on `wa-rating` is a **minor breaking change** for consumers passing a custom symbol function — update to `(value: number, isSelected: boolean) => string`.


## [3.3.2] - 2026-03-10
### Fixed
- Exported shared type tokens (`VariantToken`, `SizeToken`, `AppearanceToken`, `Appearance`, `BooleanLike`) and the `normalizeAppearance` utility function from the public API surface. Previously, these types were used internally by directive inputs (e.g., `WaBadgeDirective.variant: VariantToken`) but were not importable by consumers of the library, causing TypeScript compilation errors when trying to reference them.

## [3.3.1] - 2026-03-08
### Added
- Angular wrappers and exports for new Web Awesome 3.3.1 components:
  - wa-chart (base chart component for advanced Chart.js configuration)
  - wa-bar-chart (bar/column chart visualization)
  - wa-bubble-chart (bubble chart visualization)
  - wa-doughnut-chart (doughnut chart visualization)
  - wa-line-chart (line chart visualization)
  - wa-pie-chart (pie chart visualization)
  - wa-polar-area-chart (polar area chart visualization)
  - wa-radar-chart (radar/spider chart visualization)
  - wa-scatter-chart (scatter plot visualization)
  - wa-option (selectable items for select/combobox controls)
  - wa-resize-observer (declarative ResizeObserver API wrapper)
- Rules and example documentation files for all new components.
- CSS custom property input setters on all chart directives for theming (fill colors, border colors, grid, etc.).
- **Toasts: Official Web Awesome `<wa-toast>` and `<wa-toast-item>` integration:**
  - `WaToastDirective` — Angular wrapper for `<wa-toast>`, supporting `placement` input and programmatic `create()` method.
  - `WaToastItemDirective` — Angular wrapper for `<wa-toast-item>`, supporting `variant`, `size`, `duration` inputs and lifecycle event outputs (`wa-show`, `wa-after-show`, `wa-hide`, `wa-after-hide`).
  - New unit tests for both directives (`toast.directive.spec.ts`, `toast-item.directive.spec.ts`).

### Changed
- Updated package version from 3.2.1 to 3.3.1.
- Updated package description to reference Web Awesome 3.3.x.
- Public API surface updated to export all new directives.
- **Toasts: Migrated from custom `wa-callout`-based implementation to official `<wa-toast>` / `<wa-toast-item>` web components:**
  - `WaToastContainerComponent` now renders `<wa-toast>` with `<wa-toast-item>` elements instead of custom callout-based markup with manual CSS positioning.
  - `ToastConfig.position` renamed to `ToastConfig.placement` using official placement values (`top-start`, `top-center`, `top-end`, `bottom-start`, `bottom-center`, `bottom-end`). The legacy `ToastPosition` type has been removed — use `ToastPlacement` instead.
  - Removed `appearance`, `closable`, `gap`, and `zIndex` from `Toast` and `ToastConfig` types — these are now handled natively by the `<wa-toast>` and `<wa-toast-item>` web components via CSS custom properties (`--gap`, `--width`, `--accent-width`, etc.).
  - Container no longer depends on `WaCalloutDirective`; imports `WaToastDirective` and `WaToastItemDirective` instead.
  - Updated all toast service and container tests to align with the new API.
  - Regenerated toast documentation (`toast.rules.md`, `toast.example.md`, `docs/components/toast.html`).

### Notes
- All chart components share a common API surface with inputs for label, description, axes labels, legend position, stacking, grid, min/max, animation control, and Chart.js config/plugins.
- The wa-option directive complements the existing wa-select and wa-combobox wrappers.
- The wa-resize-observer follows the same pattern as wa-intersection-observer and wa-mutation-observer.
- The toast migration is a **breaking change** for consumers using `position` (now `placement`), `closable`, `appearance`, `gap`, or `zIndex` properties. The `WaToastService` API (`show`, `success`, `warning`, `danger`, `brand`, `neutral`, `update`, `close`, `clearAll`) remains fully compatible.


## [3.2.1] - 2026-02-07
### Added
- Angular wrappers and exports for new Web Awesome components introduced in 3.2.x:
  - wa-file-input (experimental pro)
  - wa-sparkline (experimental pro)
  - wa-number-input (experimental)
  - wa-zoomable-frame
- Enterprise rules repository updates for new components:
  - rules/generative/frontend/webawesome/file-input.rules.md
  - rules/generative/frontend/webawesome/number-input.rules.md
  - rules/generative/frontend/webawesome/sparkline.rules.md
  - Updated rules/generative/frontend/webawesome/README.md to index the above.

### Changed
- Public API surface updated to export the new directives.

### Fixed
- Tooltip directive path corrected from src/directives/tooltitp/ to src/directives/tooltip/ and public exports aligned.

### Notes
- Per request, no edits were made to llms.txt and no tests/build were run as part of this changelog update.


## [3.0.3] - 2025-11-04
### Added
- Toasts: Introduced WaToastService with provideWaToasts() and WaToastContainerComponent for lightweight toast notifications (success, info, warning, danger) with queuing, positions, durations, and configuration.
- wa-select: Introduced `maxSelected` input (number | string) to limit the maximum number of selected options when `multiple` is enabled.
  - The wrapper enforces the limit consistently across all update paths:
    - User interaction (input/change events): if the selection exceeds the limit, it immediately clamps the selection and updates the Angular model.
    - MutationObserver on the `value` attribute: if external changes exceed the limit, it clamps and writes back the limited selection.
    - ControlValueAccessor `writeValue`: incoming arrays are clamped before reflecting to the DOM.
    - During input changes (`applyInputs`): ensures current selection respects the limit.
- wa-tree-item: Boolean inputs (`expanded`, `selected`, `disabled`, `lazy`) now accept boolean or string values so plain attribute syntax works (e.g., `<wa-tree-item expanded>`).

### Documentation
- Added docs and examples for the Toasts service and container (see docs/components/toast.html).
- Added tests covering the new `maxSelected` behavior.

### Fixed
- wa-scroller: Corrected Angular integration to attach directly to the underlying <wa-scroller> web component (no extra wrapper), aligning with other components. The directive now uses selector `wa-scroller`.
- wa-dialog: Projected content now only exists in the DOM while the dialog is open. When closed, children are detached into an internal DocumentFragment and restored on open. Behavior stays in sync across lifecycle events, attribute mutations, and input changes, preserving two-way binding and label slot updates.
- wa-dialog: Fixed an immediate-close issue (wa-hide firing right after wa-show) when Angular updated header/body bindings during open. Content attach/detach now happens strictly on dialog lifecycle events (attach on wa-show, detach on wa-after-hide), removing the need for a setTimeout workaround and stabilizing dynamic updates while open.
- wa-tab-panel: Panel content now exists in the DOM only when the panel is active. Children are removed when inactive and reattached on activation; synchronized with the active attribute and related events to avoid DOM footprint for inactive panels.
- wa-color-picker: Aligned two-way binding to update on both input and change events. Added output aliases so templates can bind to native names (focus, blur) and hyphenated WC events (wa-show, wa-after-show, wa-hide, wa-after-hide, wa-invalid) in addition to existing camelCase outputs. This ensures immediate model updates on input and compatibility with documented event names.

### Tests
- Added comprehensive unit tests for wa-dialog content lifecycle and tab panel content toggling.
- Updated tsconfig.spec.json to include the new specs and a broader discovery pattern.
  - Added a spec ensuring that changing bound content while the dialog is opening/open does not cause an immediate close and content remains present.
  - Added wa-color-picker specs validating [(ngModel)] with dynamic [format] derived from the model to prevent regressions in two-way binding scenarios.
  - Added wa-color-picker Angular forms specs ensuring required/pattern validators and form state (pristine/dirty/touched) work correctly with the directive.

## [3.0.2] - 2025-11-02
### Changed
- Minor internal refactors and documentation updates to support upcoming 3.0.3 features.
- Examples refreshed and small styling tweaks.

[3.0.3]: https://github.com/GedMarc/angular-awesome/compare/3.0.2...3.0.3


## [3.0.4] - 2025-12-30
### Added
- wa-tab-panel: Introduced optional `[lazy]` input to lazily attach/detach projected DOM based on active state. Keeps default behavior unchanged; for true deferred instantiation continue to use `<ng-template waTabContent>`.

### Documentation
- Updated tab-group rules and examples to document both lazy modes (template-based true lazy vs DOM-only `[lazy]`).
- Updated docs/components/tab-group.html with a dedicated Lazy Loading section and corrected `withoutScrollControls` input name.

[3.0.4]: https://github.com/GedMarc/angular-awesome/compare/3.0.3...3.0.4
[3.2.1]: https://github.com/GedMarc/angular-awesome/compare/3.0.4...3.2.1
[3.3.1]: https://github.com/GedMarc/angular-awesome/compare/3.2.1...3.3.1
[3.3.2]: https://github.com/GedMarc/angular-awesome/compare/3.3.1...3.3.2
[3.4.0]: https://github.com/GedMarc/angular-awesome/compare/3.3.2...3.4.0
[3.5.0]: https://github.com/GedMarc/angular-awesome/compare/3.4.0...3.5.0
