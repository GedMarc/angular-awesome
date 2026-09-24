
All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project adheres to Semantic Versioning.

## [3.14.0] - 2026-09-25

### Added
- `WaStepDirective` and `WaStepperDirective` for Web Awesome's experimental step navigation, including status and orientation inputs, cancelable change events, `activeChange`, and navigation methods.
- `wa-page` CSP `nonce` binding for its injected media-query style.
- `wa-combobox` server options: `dataSource`, `server`, `loading`, `filterDebounce`, `reload()`, and request/error events.
- `wa-divider` slotted labels, SSR `withLabel`, label placement, and label styling inputs.
- SSR `withLabel` binding for `wa-dialog` and `wa-drawer`.
- `wa-zoomable-frame` `allow`, `name`, and accessible `label` bindings.

### Changed
- Aligned compatibility guidance and generated docs with the 90-component Web Awesome 3.14 API.


## [3.13.0] - 2026-09-18
### Added
- **wa-tag-input:** New `WaTagInputDirective` wrapping the Web Awesome 3.13 `<wa-tag-input>` component for entering removable lists of tags.
- Complete bindings for the array-valued `value`, reset `defaultValue`, pending `inputValue`, delimiters, tag limits, duplicate/clear behavior, appearance, browser text-entry hints, form association, custom validators, and validation target.
- Angular template-driven and reactive forms support through `ControlValueAccessor`, with live `string[]` property writes and no synthetic input/change events during programmatic model updates.
- Angular validation for `required`, `minTags`, and `maxTags`, including Web Awesome's optional-empty behavior for `minTags`.
- Outputs for input, change, focus, blur, cancelable `wa-create`, `wa-clear`, and `wa-invalid`, plus `valueChange` for direct two-way binding.
- Delegates for `focus()`, `blur()`, `setCustomValidity()`, `formStateRestoreCallback()`, and `resetValidity()`.
- Unit tests, usage rules, examples, generated documentation support, package export, component catalog entry, and form-control listing.

### Changed
- Aligned package metadata and compatibility documentation with Web Awesome 3.13.x.
- Updated the Web Awesome API reference from 3.12.0 to 3.13.0. The 3.13 specification adds one component and does not change any existing component API.

### Fixed
- **wa-skeleton:** The wrapper now matches the native `<wa-skeleton>` element directly while retaining `[waSkeleton]` for applying skeleton behavior to other elements.
- Corrected the npm package's legacy `main` and `es2022` entry points so they resolve to the bundled `fesm2022/angular-awesome.mjs` file included in the published package.

### Notes
- This release covers all 88 components in the Web Awesome 3.13.0 specification.
- No breaking changes to existing Angular APIs.


## [3.12.1] - 2026-09-04
### Fixed
- **wa-checkbox:** `[checked]` is now a controlled runtime binding. Updating an Angular expression from `true` to `false` updates the live `wa-checkbox.checked` property as well as the reflected attribute, so existing checkboxes visibly clear without being recreated.
- **wa-checkbox:** Programmatic `[checked]` and Angular forms writes do not emit synthetic `change` or `wa-change` events. Native and Web Awesome change events remain user-interaction events and retain their live `target.checked` / `currentTarget.checked` values.
- Added regression coverage for a dynamic `@for` list through manual selection, Clear, All, Clear, and a derived missing-station selection. The checks verify that the existing checkbox elements are reused while their live checked state changes.

### Notes
- This is a patch release with no Angular API changes. Applications may bind `[checked]` directly to derived selection state; re-keying checkbox rows to force a visual refresh is no longer needed.


## [3.12.0] - 2026-08-22
### Added
- **wa-dropdown-item:** Link support — a dropdown item can now navigate when selected, matching the new Web Awesome 3.12 dropdown item API:
  - `href` — When set, selecting the item navigates to this URL. The item remains a menu item for assistive devices, so make sure the label describes where the link goes. Ignored when the item has a submenu.
  - `target` (`'_blank' | '_parent' | '_self' | '_top'`) — Tells the browser where to open the link. Only used when `href` is present.
  - `rel` — Maps to the underlying link's `rel` attribute. Only used when `href` is present.
  - `download` — Tells the browser to download the linked file under this filename. Only used when `href` is present. An empty string keeps the server-provided filename.
  - `target`, `rel`, and `download` are only written to the DOM while `href` is set, and all four attributes are removed when `href` is cleared, so no orphaned link attributes remain on the element.
- Unit tests covering `wa-dropdown-item` link attributes: default absence, `href` reflection, `target`/`rel`/`download` gating on `href`, attribute removal when `href` is cleared, empty `download`, every documented `target` value, reactive `href` updates, and coexistence with the other item attributes.
- Rules and example documentation for dropdown item links, including new-tab, download, `*ngFor`-bound, and `:state(link)` styling examples.

### Changed
- Updated `llms.txt` to Web Awesome 3.12.0. The previous specification is retained as `llms_3.11.0.txt`.

### Deprecated
- **wa-color-picker (upstream CSS parts):** The `base` part is now deprecated in favor of the new `color-picker` part, which targets the dropdown panel that holds the grid, sliders, and swatches. `form-control-input` now targets the color picker's trigger button, and the `form-control` and `hint` parts are newly exposed. These are shadow-DOM styling hooks accessed via `::part()`; the Angular wrapper inputs are unchanged. Update any `::part(base)` selectors to `::part(color-picker)`.

### Removed
- **CSS parts (upstream):** The following shadow-DOM styling hooks were removed or renamed in Web Awesome 3.12. No Angular input changes are required — only `::part()` style selectors need updating:
  - **wa-radio-group:** the `radios` part was replaced by `form-control-input`, which now wraps the grouped radios and is styled as a flex container by default.
  - **wa-textarea:** the `form-control-input` part was removed. Style the `textarea-wrapper` part (the outer wrapper) or the `textarea` part (the internal control) instead.
  - **wa-slider:** the `tooltip__content` part was renamed to `tooltip__body`.
  - **wa-page:** the `dialog-wrapper` part was removed. The Angular `[waPageDialogWrapper]` projection slot is unaffected and continues to work.
  - **wa-video:** the `progress` part was removed.

### Notes
- This release aligns Angular Awesome with the **Web Awesome 3.12.0** component specification.
- 0 new components. 3.12 adds no components to the 87-component spec surface — `wa-data-grid`, `wa-otp-input`, and `wa-pagination` were the new components in **3.11** and already shipped in `angular-awesome@3.11.0`.
- 7 component specifications changed: `wa-dropdown-item` (the only Angular API change), plus `wa-color-picker`, `wa-page`, `wa-radio-group`, `wa-slider`, `wa-textarea`, and `wa-video` (upstream CSS part renames/removals only).
- No breaking changes to the Angular API.
- Web Awesome 3.12 also adds documented CSS custom states to `wa-dropdown-item` (`active`, `checked`, `disabled`, `has-submenu`, `link`, `submenu-open`), targetable via the `:state()` selector.


## [3.11.0] - 2026-08-07
### Added
- **wa-data-grid:** New `WaDataGridDirective` wrapping the new `<wa-data-grid>` web component — data grids with sorting, selection, pagination, filtering, grouping, tree data, column pinning/reordering/resizing, virtualization, and CSV export:
  - **Property bindings** (assigned as DOM properties so objects/arrays/functions pass through intact): `data`, `columns`, `selectableRows`, `pageSizeOptions`, `page`, `searchTerm`, `rowDetail`, `rowClass`, `childRows`, `groupBy`, `dataSource`, `searchFn`, `total`, `loading`, `sort`, `columnOrder`, `selectedKeys`, `selectedRows`, `expandedKeys`, `filters`.
  - **Attribute bindings** (reflected configuration): `rowKey` (`row-key`), `selectable`, `paginate`, `pageSize` (`page-size`), `withoutSortRemoval`, `sortDescFirst`, `maxMultiSort`, `withSearch`, `resizable`, `reorderable`, `pinnable`, `withColumnMenu`, `withColumnsMenu`, `striped`, `filterFromLeafRows`, `server`, `filterDebounce`, `label`, `appearance`, `size`.
  - **Events** (each with a camelCase output plus hyphenated alias): `request`, `waSortChange`, `waRowSelect`, `waPageChange`, `waFilterChange`, `waRowExpand`, `waRowCollapse`, `waDataRequest`, `waDataError`, `waColumnMove`, `waColumnResize`, `waColumnVisibilityChange`, `waColumnPin`, `waCellClick`, `waCellContextmenu`.
  - **Methods:** `pinColumn`, `getColumnPin`, `focus`, `expandRow`, `collapseRow`, `expandAllRows`, `collapseAllRows`, `getVisibleRows`, `getProcessedRows`, `getColumnFacets`, `reload`, `toggleColumn`, `autoSizeColumn`, `autoSizeColumns`, `sizeColumnsToFit`, `scrollToIndex`, `getDataAsCsv`, `exportDataAsCsv`, `copySelectedRows`, `getState`, `setState`, `resetState`, `resetColumns`, plus `handlePageChange`, `handleSearchTermChange`, `handleColumnsChange`.
  - **Read-only getters:** `pageCount`, `filteredCount`. Style inputs for all 18 grid CSS custom properties (`--accent-color` … `--indent-size`). Exported the `DataGridColumn`, `DataGridRow`, `DataGridSort`, `SortingState`, `DataGridFilter`, `DataGridRequest`, `DataGridResponse`, and `DataGridState` types.
- **wa-otp-input:** New `WaOtpInputDirective` wrapping the new `<wa-otp-input>` web component:
  - Inputs: `value`, `length`, `appearance` (`'outlined' | 'filled' | 'filled-outlined' | 'contained'`), `type` (`'numeric' | 'alpha' | 'alphanumeric'`), `mask`, `case`, `size`, `label`, `hint`, `format`, `autocomplete`, `required`, `readonly`, `autosubmit`, `autofocus`, `withMask` (`with-mask`), `name`, `disabled`, `form`.
  - Style inputs: `segmentSize` → `--segment-size`, `segmentGap` → `--segment-gap`, `segmentBorderRadius` → `--segment-border-radius`, `maskChar` → `--mask-char`.
  - Implements `ControlValueAccessor` and `Validator`. A partially-filled field always reports an `incomplete` error (segment count derived from `format` `#` count or `length`), matching the component's behavior.
  - Events: `waInput`/`input`, `waChange`/`change`, `waFocus`, `waBlur`, `waComplete`/`wa-complete`, `waClear`/`wa-clear`, `waInvalid`/`wa-invalid`, plus `valueChange`. Methods: `clear()`, `focus()`, `blur()`, `select()`, `setCustomValidity()`, `resetValidity()`.
- **wa-pagination:** New `WaPaginationDirective` wrapping the new `<wa-pagination>` web component:
  - Inputs: `total`, `pageSize` (`page-size`), `page`, `siblingCount` (`sibling-count`), `boundaryCount` (`boundary-count`), `withoutNav` (`without-nav`), `withEdges` (`with-edges`), `withSummary` (`with-summary`), `format` (`'standard' | 'compact'`), `hrefTemplate` (string template or function), `hideSinglePage` (`hide-single-page`), `label`, `appearance` (`'outlined' | 'filled' | 'plain'`), `disabled`.
  - Events: `waBeforePageChange`/`wa-before-page-change` (cancelable) and `waPageChange`/`wa-page-change`. Read-only `totalPages` getter.
- Exported `WaDataGridDirective`, `WaOtpInputDirective`, and `WaPaginationDirective` from the public API surface.
- Unit tests, rules, and example documentation for all three new components.
- **wa-carousel:** New `addSlide(slide)` and `removeSlide(index)` methods matching the new Web Awesome 3.11 carousel API.
- **wa-toast-item:** New `padding` style input mapping to the new `--padding` CSS custom property.

### Changed
- **Chart components:** Web Awesome 3.11 makes the `x-label` / `y-label` attribute names explicit for `xLabel` / `yLabel`. The Angular chart directives (`wa-bar-chart`, `wa-bubble-chart`, `wa-chart`, `wa-doughnut-chart`, `wa-line-chart`, `wa-pie-chart`, `wa-polar-area-chart`, `wa-radar-chart`, `wa-scatter-chart`) already reflect these to `x-label` / `y-label`, so no API change was needed — documentation only.
- Updated `llms.txt` to Web Awesome 3.11.0.

### Deprecated
- **CSS parts (upstream):** Web Awesome 3.11 deprecates the generic `base` CSS part across many components in favor of a named outer-wrapper part (e.g. `accordion-item`, `badge`, `breadcrumb`, `button`, `checkbox`, `carousel`, `color-picker`, `comparison`, `date-input`, `date-picker`, `details`, `file-input`, `input-wrapper`, `known-date`, `number-input`, `page`, `progress-bar`, `progress-ring`, `qr-code`, `rating`, `sparkline`, `spinner`, `switch`, `tab`, `tab-group`, `textarea-wrapper`, `time-input`, `tooltip`, `tree`, `tree-item`, `video-wrapper`, `video-playlist`). For `wa-callout`, `wa-dropdown`, `wa-text`, and `wa-tag`, `base` is deprecated in favor of styling the host element directly. These are shadow-DOM styling hooks accessed via `::part()`; the Angular wrapper inputs are unchanged. Update any `::part(base)` selectors to the new named parts.
- **wa-page:** The `skip-links` and `skip-link` CSS parts were removed upstream and replaced with a single `skip-to-content` part; new `navigation-desktop`, `drawer`, and `main` parts were added. These are CSS parts only — no Angular input changes.

### Notes
- This release aligns Angular Awesome with the **Web Awesome 3.11.0** component specification.
- 3 new components added (`wa-data-grid`, `wa-otp-input`, `wa-pagination`), 2 components updated (`wa-carousel`, `wa-toast-item`). No breaking changes to the Angular API — the CSS-part deprecations are upstream shadow-DOM styling hooks only.


## [3.10.0] - 2026-07-01
### Added
- **wa-random-content:** New `WaRandomContentDirective` wrapping the new `<wa-random-content>` web component:
  - Inputs: `items` (`number`), `mode` (`'random' | 'unique' | 'sequence'`), `autoplay` (`boolean`), `autoplayInterval` (`autoplay-interval`, `number`), `animation` (`'none' | 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right'`)
  - Style inputs: `animationDuration` → `--animation-duration`, `animationEasing` → `--animation-easing`, `animationTranslate` → `--animation-translate`
  - Method: `randomize()` — selects a new set of children using the current mode and returns the elements now shown
  - Event output: `waContentChange` / `wa-content-change` — emitted whenever the displayed selection changes
  - Slot: `(default)` for the pool of children to choose from
  - Exposes `nativeElement` for direct DOM access
- Exported `WaRandomContentDirective` from the public API surface.
- Unit tests, rules, and example documentation for `wa-random-content`.
- **wa-icon:** New `canvas` input (`'fixed' | 'auto' | 'square' | 'roomy'`) mapping to the new `canvas` attribute that sets the box the icon is centered within.
- **wa-option:** New `currentTextColor` input mapping to the new `--current-text-color` CSS custom property (the text color of the current/highlighted option).

### Fixed
- **wa-number-input:** Fixed handling of string values on the number input. `WaNumberInputDirective` now:
  - Accepts `value` as `string | number | null` and reflects string-typed values to the `value` attribute correctly (numeric-looking strings are no longer dropped or mangled).
  - Implements `ControlValueAccessor` and `Validator`, so `[(ngModel)]` / reactive forms round-trip string values and expose `required` / `min` / `max` validation errors.
  - Emits `waInput` / `waChange` (plus hyphenated `wa-input` / `wa-change` aliases), `waFocus`, `waBlur`, `waInvalid`, and `valueChange`, listening to both native and `wa-`prefixed events.
  - Handles `step="any"` and removes numeric attributes when cleared, and adds `focus()`, `blur()`, `select()`, `stepUp()`, `stepDown()` methods plus `form` support and `nativeElement` access.
- Added unit tests covering `wa-number-input` string-value binding, validation, and event forwarding.

### Changed
- **wa-icon:** Documented the new animation CSS custom properties added in Web Awesome 3.10 (`--flip-anticipation-scale`, `--flip-overshoot`, `--bounce-anticipation`, `--buzz-distance`, `--wag-angle`, `--swing-angle`, `--jello-scale-x/y`, `--float-*`) and the updated `flip`/`flip-360` and `--beat-scale` behavior. These are upstream additions set via style bindings; no new Angular inputs are required.
- Updated `llms.txt` to Web Awesome 3.10.0.

### Notes
- This release aligns Angular Awesome with the **Web Awesome 3.10.0** component specification.
- 1 new component added (`wa-random-content`), 2 components updated (`wa-icon`, `wa-option`), and 1 bug fix (`wa-number-input` string-value handling). No breaking changes to the Angular API.


## [3.9.0] - 2026-06-18
### Added
- **wa-checkbox-group:** New `WaCheckboxGroupDirective` wrapping the new `<wa-checkbox-group>` web component:
  - String inputs: `label`, `hint`, `orientation` (`'horizontal' | 'vertical'`), `size` (`'xs' | 's' | 'm' | 'l' | 'xl' | 'small' | 'medium' | 'large'`)
  - Boolean inputs: `required`, `withLabel` (`with-label`), `withHint` (`with-hint`)
  - Style input: `styleGap` → `--gap`
  - Slots: `(default)` for `<wa-checkbox>` / `<wa-switch>` items, `label`, and `hint`
  - Exposes `nativeElement` for direct DOM access
  - The group is a labeling/grouping container only and does not own a value — bind `[(ngModel)]` / `formControlName` on the individual checkboxes/switches.
- Exported `WaCheckboxGroupDirective` from the public API surface.
- Unit tests, rules, and example documentation for `wa-checkbox-group`.

### Changed
- **wa-tree:** `selection` input now accepts `'leaf-multiple'` in addition to `'single' | 'multiple' | 'leaf'`. `leaf-multiple` allows multiple leaf nodes to be selected while parent nodes only expand and collapse.
- **wa-accordion-item / wa-popover / wa-popup:** Documented CSS animation defaults updated to match Web Awesome 3.9.0 — `--show-duration` / `--hide-duration` now default to `var(--wa-transition-normal)` (accordion) and `var(--wa-transition-fast)` (popover/popup), and the accordion `--easing` default is `var(--wa-transition-easing)`. These are upstream default value changes only; the Angular inputs are unchanged.
- Updated `llms.txt` to Web Awesome 3.9.0.

### Notes
- This release aligns Angular Awesome with the **Web Awesome 3.9.0** component specification.
- 1 new component added (`wa-checkbox-group`), 1 component updated (`wa-tree`). No breaking changes to the Angular API.


## [3.7.0] - 2026-05-17
### Added
- **wa-video:** New `WaVideoDirective` wrapping the `<wa-video>` web component with full playback control:
  - String inputs: `controls` (`'none' | 'standard' | 'full'`), `src`, `poster`, `title`, `thumbnails`, `preload`, `iconLibrary`
  - Boolean inputs: `playing`, `muted`, `autoplay`, `loop`, `autoplayMuted`, `autoplayOnVisible`
  - Numeric inputs: `volume`, `duration`, `currentTime`
  - Event outputs: `waPlay` / `play`, `waPause` / `pause`, `waTimeupdate` / `timeupdate`, `waVolumechange` / `volumechange`, `waError` / `error`, `waEnded` / `ended`, `waLoadedmetadata` / `loadedmetadata`
  - Methods: `play()`, `pause()`, `togglePlay()`, `toggleMute()`, `seek(time)`, `setVolume(volume)`, `setPlaybackRate(rate)`, `requestFullscreen()`, `exitFullscreen()`, `getVideoElement()`, `getState()`
- **wa-video-playlist:** New `WaVideoPlaylistDirective` wrapping the `<wa-video-playlist>` web component:
  - String inputs: `controls` (`'none' | 'standard' | 'full'`), `iconLibrary`
  - Event output: `waVideoChange` / `wa-video-change` — emitted when the active video changes
  - Methods: `next()`, `previous()`, `goTo(index)`
- **wa-copy-button:** New `tooltip` input (`'full' | 'copy' | 'none'`, default `'full'`) — controls built-in tooltip behavior. `full` shows on hover/focus and during feedback; `copy` only shows during feedback; `none` disables tooltip entirely.
- Both video directives exported from the public API surface.
- Unit tests for both video directives and updated copy-button tests.
- Rules and example documentation for both video components.

### Changed
- **wa-copy-button:** CSS parts updated — removed deprecated `tooltip__base`, `tooltip__base__popup`, `tooltip__base__arrow`, `tooltip__body` parts; replaced with single `feedback` part.
- Updated `llms.txt` to Web Awesome 3.7.0.

### Notes
- This release aligns Angular Awesome with the **Web Awesome 3.7.0** component specification.
- 2 new components added (`wa-video`, `wa-video-playlist`), 1 component updated (`wa-copy-button`). No breaking changes to the Angular API.


## [3.6.0] - 2026-05-01
### Changed
- **SizeToken:** Expanded size type to include shorthand tokens `'xs' | 's' | 'm' | 'l' | 'xl'` alongside the existing `'small' | 'medium' | 'large'`, matching Web Awesome 3.6.0. This affects all components with a `size` property: `wa-button`, `wa-callout`, `wa-checkbox`, `wa-color-picker`, `wa-combobox`, `wa-dropdown`, `wa-file-input`, `wa-input`, `wa-number-input`, `wa-radio`, `wa-radio-group`, `wa-rating`, `wa-select`, `wa-slider`, `wa-switch`, `wa-tag`, `wa-textarea`, `wa-toast-item`.
- **Default size:** Web Awesome 3.6.0 changed the default size from `'medium'` to `'m'`. Angular wrappers pass through whatever value is set; unset inputs continue to use the web component's built-in default.

### Notes
- The legacy size values (`small`, `medium`, `large`) remain supported for backwards compatibility.
- This is a minor release aligned with Web Awesome 3.6.0. No breaking changes.


## [3.5.2] - 2026-04-05
### Fixed
- **wa-switch:** Changed directive selector from `wa-switch[waSwitch]` to `wa-switch`, matching the convention used by all other component directives (e.g. `wa-checkbox`, `wa-button`). Previously, consumers had to add the `waSwitch` attribute for the directive to activate; without it, Angular could not bind `@Input()` properties like `[checked]`, causing `NG8002: Can't bind to 'checked' since it isn't a known property of 'wa-switch'`.
- **wa-switch:** Added `WaSwitchEvent` typed event interface. The `(wa-change)` and `(wa-input)` outputs now emit `WaSwitchEvent` instead of plain `Event`, giving consumers type-safe access to `$event.target.checked` and `$event.target.value` in templates without `TS2339` errors.

### Notes
- This is a patch release. Existing usages with `waSwitch` continue to work; the attribute is simply no longer required.
- `WaSwitchEvent` is exported from the public API for consumers who need the type explicitly.


## [3.5.1] - 2026-04-05
### Fixed
- **Peer dependencies:** Widened `@angular/common`, `@angular/core`, and `@angular/forms` peer dependency ranges from `^20.3.17` (which only accepted Angular 20.x) to `>=20.0.0`, allowing the library to install and work correctly on Angular 21+ and future Angular versions. The library uses only stable Angular APIs and `compilationMode: "partial"`, so it is fully forward-compatible.

### Notes
- This is a patch release addressing installation failures when consumers use Angular versions newer than 20.x.


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
[3.5.1]: https://github.com/GedMarc/angular-awesome/compare/3.5.0...3.5.1
[3.6.0]: https://github.com/GedMarc/angular-awesome/compare/3.5.1...3.6.0
[3.7.0]: https://github.com/GedMarc/angular-awesome/compare/3.6.0...3.7.0
