### 📘 `webawesome.base.rules.md`

**Angular 19 Library Wrapping Rules for the Web Awesome (`wa-*`) Component Kit**

---

## 📝 Purpose

Create Angular components/directives to wrap Web Awesome web components and:

* Use Angular **template-driven** forms primarily (avoid Reactive Forms)
* Enable `ngModel` binding, `[(value)]` support, and template interactivity
* Bridge `@Input()`/`@Output()` with web component props/events
* Support named slot projection using `<ng-content select>`
* Simplify styling for Angular users (inputs become CSS vars on host)
* Ensure lazy initialization with `customElements.whenDefined()`
* Enable slot layout rendering for `wa-page` and related patterns
* Ensure boolean attributes are rendered only when true (omit otherwise)
* Use **native tag selectors** for all components (`wa-button`, `wa-badge`, etc.)
* Avoid Signals for inputs/outputs in Angular libraries (due to scope issues)

---

## 📁 Component Categories

### 1. **Input Components**

* Web Components: `wa-input`, `wa-select`, `wa-textarea`
* Responsibilities:

  * Provide `[(ngModel)]` or `value + (valueChange)` support
  * Wait for component load before syncing props/events
  * Allow `placeholder`, `size`, `variant`, etc. as `@Input()`
  * Apply component style via individual `@Input()` properties that are bound to CSS custom properties
  * Project `wa-icon` and other `slot="prefix"/"suffix"` elements

### 2. **UI Components**

* Examples: `wa-badge`, `wa-tag`, `wa-button`, `wa-icon`, `wa-avatar`
* Responsibilities:

  * Use **directive wrappers** with `@Directive({ selector: 'wa-*' })`
  * Map known attributes as `@Input()`
  * Use individual `@Input()` properties for CSS custom properties, which are then applied via `[style.--property]="value"` bindings
  * Ensure boolean inputs render as `attr.name=""` only when true
  * Booleans must be assignable with boolean or strings
  * Avoid wrapping in `<ng-template>` or using `TemplateRef`
  * Use `ngOnInit` lifecycle for setup

### 3. **Pattern Components**

* Example: `wa-page`
* Responsibilities:

  * Project child content to named slots (e.g., `slot="header"`, `slot="aside"`)
  * Expose `mobileBreakpoint`, `view`, and theming attributes
  * Declare individual style inputs as `@Input()` properties that bind to CSS custom properties on the host element
  * Support `wa-dark`, `wa-light`, etc. mode switching via attribute

---

## 🌐 Global Requirements (for Consumers)

### Required Assets (CDN Defaults)

```html
<link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/styles/themes/default.css" />
<link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/styles/webawesome.css" />
<script type="module" src="https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/webawesome.loader.js"></script>
```

* Optional: Add `data-fa-kit-code` if integrating with Font Awesome Kit.
* For cherry-picking or bundling:

```js
import { setBasePath } from 'webawesome.js';
setBasePath('/path')
```

---

## 🎨 Layout and Styling Utilities

### Alignment Classes

* `wa-align-items-start`, `wa-align-items-end`, `wa-align-items-center`, `wa-align-items-stretch`, `wa-align-items-baseline`

### Gap Classes (for clusters, stacks, and splits)

* `wa-gap-0`, `wa-gap-3xs`, `wa-gap-2xs`, `wa-gap-xs`, `wa-gap-s`, `wa-gap-m`, `wa-gap-l`, `wa-gap-xl`, `wa-gap-2xl`, `wa-gap-3xl`

### Appearance Classes

* `.wa-accent`, `.wa-outlined`, `.wa-filled`, `.wa-plain`

  * These utilities set tokens such as:

    * `--background-color`, `--border-color`, `--text-color`

### Color Variant Classes

* `.wa-brand`, `.wa-neutral`, `.wa-success`, `.wa-warning`, `.wa-danger`

  * Tokens are semantic, consumed via `--wa-color-fill-*` and related

---

## 📦 Layout Primitives

### `wa-cluster`

Align items in a row with consistent spacing, wrapping when needed. Supports `wa-align-items-*` and `wa-gap-*`.

### `wa-stack`

Arrange items in a column with spacing.

### `wa-flank`

Two items side-by-side with one stretching to fill space. Wraps when needed.

### `wa-split`

Distribute items across available space. Append `:column` or `:row` to control direction.

* Directional: `wa-split:row`, `wa-split:column`
* Alignment: `wa-align-items-*`
* Gap support: `wa-gap-*`

### `wa-frame`

Responsive container with consistent proportions. Ideal for wrapping images or visuals.

### `wa-grid`

Responsive grid layout. Use `--min-column-size` to control columns. `wa-span-grid` spans full row.

---

## 🔤 Text Utilities

### Body Text

* `wa-body-xs` → `--wa-font-size-xs`
* `wa-body-s` → `--wa-font-size-s`
* `wa-body-m` → `--wa-font-size-m`
* `wa-body-l` → `--wa-font-size-l`
* `wa-body-xl` → `--wa-font-size-xl`

### Headings

* `wa-heading-xs` → `--wa-font-size-s`
* `wa-heading-s` → `--wa-font-size-m`
* `wa-heading-m` → `--wa-font-size-l`
* `wa-heading-l` → `--wa-font-size-xl`
* `wa-heading-xl` → `--wa-font-size-2xl`
* `wa-heading-2xl` → `--wa-font-size-3xl`
* `wa-heading-3xl` → `--wa-font-size-4xl`

### Captions

* `wa-caption-xs` → `--wa-font-size-2xs`
* `wa-caption-s` → `--wa-font-size-xs`
* `wa-caption-m` → `--wa-font-size-s`
* `wa-caption-l` → `--wa-font-size-m`
* `wa-caption-xl` → `--wa-font-size-l`

All tokens include theme-aware variables like:

* `--wa-font-family-body`, `--wa-font-weight-body`
* `--wa-line-height-normal`, `--wa-color-text-quiet`, etc.

---

## 🔧 Angular Implementation Guidelines

* Use native Web Component tag selectors (`wa-*`) as Angular directive selectors
* Wrap UI components like badges, icons, buttons using `@Directive()` (not `@Component()`)
* Use `@Input()` for properties; bind via `Renderer2` in `ngOnInit`
* Output event bindings for animation lifecycle and other custom web component events
* Boolean inputs: render `attr.name=""` if true, omit otherwise
* Avoid using Signals inside libraries
* Avoid TemplateRef or `<ng-template>` unless required by slotting patterns
* Use individual `@Input()` properties for CSS custom properties that are applied via `[style.--property]="value"` bindings
* Always ensure the module declares `CUSTOM_ELEMENTS_SCHEMA`

---

### ⚠️ Attribute Coercion Rules

To support template usage without `[]` bindings:

* All `@Input()`s should accept `string` or the native type (`number | string`, `boolean | string`) to ensure Angular doesn’t reject unbound literal inputs.
* Boolean inputs must render as `attr.name=""` only when the value is truthy — this includes the string `"true"`.
* Number inputs passed as strings (e.g., `duration="300"`) should be converted to numbers in the directive/component logic before assigning to properties or attributes.
* Avoid relying on native type inference — always normalize input types manually.

---

### ⚛️ Custom Event Support

* Angular wrappers must allow users to bind to custom events emitted by Web Awesome components (e.g. `(wa-start)`, `(wa-finish)`, etc.).
* For components that emit events, document all event names and map them in the directive/component.
* Events can be passed through natively using `(eventName)="handler()"`, or explicitly exposed via `@Output()` as needed for type safety.

---

📌 These global rules are inherited by all component-specific `.rules.md` files in this library ecosystem.

👌 Updated with support for native tag selectors, event bindings, boolean and number coercion, and directive-based render control for stable Angular 19 integration.
