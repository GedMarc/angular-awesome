
All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project adheres to Semantic Versioning.


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
