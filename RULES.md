### 📘 `webawesome.base.rules.md`

**Angular 19 Library Wrapping & Binding Rules for the Web Awesome (`wa-*`) Component Kit**

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
<link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-beta.4/dist/styles/themes/default.css" />
<link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-beta.4/dist/styles/webawesome.css" />
<script type="module" src="https://early.webawesome.com/webawesome@3.0.0-beta.4/dist/webawesome.loader.js"></script>
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

Web Awesome includes classes to set the align-items property of flex and grid containers. They can be used with cluster, stack, split, flank, and grid to align children on the container's cross axis.

Classes and values:
- `wa-align-items-start` → `align-items: flex-start`
- `wa-align-items-end` → `align-items: flex-end`
- `wa-align-items-center` → `align-items: center`
- `wa-align-items-stretch` → `align-items: stretch`
- `wa-align-items-baseline` → `align-items: baseline`

What's a Cross Axis?
The cross axis runs perpendicular to a flex container's content direction. For containers where `flex-direction: row` and content flows inline, the cross axis runs in the block direction (vertical). For containers where `flex-direction: column` and content flows in the block direction, the cross axis runs in the inline direction (horizontal).

### Gap Classes

Web Awesome includes classes to set the `gap` property of flex and grid containers. They can be used alongside other Web Awesome layout utilities, like cluster and stack, to change the space between items — or even by themselves. All gap utilities also set `display: flex` with a specificity of 0 so they can be trivially overridden.

Classes and values:
- `wa-gap-0` → `gap: 0`
- `wa-gap-3xs` → `gap: var(--wa-space-3xs)`
- `wa-gap-2xs` → `gap: var(--wa-space-2xs)`
- `wa-gap-xs` → `gap: var(--wa-space-xs)`
- `wa-gap-s` → `gap: var(--wa-space-s)`
- `wa-gap-m` → `gap: var(--wa-space-m)`
- `wa-gap-l` → `gap: var(--wa-space-l)`
- `wa-gap-xl` → `gap: var(--wa-space-xl)`
- `wa-gap-2xl` → `gap: var(--wa-space-2xl)`
- `wa-gap-3xl` → `gap: var(--wa-space-3xl)`

Examples:
```html
<!-- Standalone gap on a generic container -->
<div class="wa-gap-m">
  <div>Item A</div>
  <div>Item B</div>
  <div>Item C</div>
</div>

<!-- With a cluster -->
<div class="wa-cluster wa-gap-s">
  <wa-button size="s">One</wa-button>
  <wa-button size="s" variant="filled">Two</wa-button>
  <wa-button size="s" variant="outlined">Three</wa-button>
</div>
```

### Appearance Classes

* `.wa-accent`, `.wa-outlined`, `.wa-filled`, `.wa-plain`

  * These utilities set tokens such as:

    * `--background-color`, `--border-color`, `--text-color`

### Color Variant Classes

* `.wa-brand`, `.wa-neutral`, `.wa-success`, `.wa-warning`, `.wa-danger`

  * Tokens are semantic, consumed via `--wa-color-fill-*` and related

---

## 📦 Layout Primitives

These layout primitives are implemented as CSS utility classes you apply to regular HTML containers. They are intentionally lightweight and composable. Unless stated otherwise, they respect the global gap and alignment utilities.

### `wa-cluster`

Align items in a row with consistent spacing, wrapping when needed. By default, cluster centers items on the block (cross) axis and uses the theme medium spacing (`--wa-space-m`) for gaps.

Options (apply as classes or CSS custom properties on the same element):
- Direction: `wa-cluster:row` (default), `wa-cluster:column`
- Wrap: `wa-wrap` (default), `wa-nowrap`
- Alignment: `wa-align-items-start|center|end|stretch|baseline`
- Justify: `wa-justify-start|center|end|between|around|evenly`
- Gap: any `wa-gap-*` class (or use the Angular helper directives `[waGap]` and `[waAlignItems]`)
- Responsive: pair with media variants like `md:wa-gap-m` when your build supports variant prefixes

### `wa-stack`
 
Arrange items in a column with spacing.
 
Options:
- Direction: `wa-stack:column` (default), `wa-stack:row`
- Alignment: `wa-align-items-start|center|end|stretch|baseline`
- Distribute: `wa-justify-start|center|end`
- Gap: any `wa-gap-*`
- Dividers: add `wa-dividers` to render 1px separators between children (uses theme tokens)

Examples:
```
<div class="wa-stack">
  <div></div>
  <div></div>
  <div></div>
</div>

<div class="wa-stack wa-gap-2xl">
  <h3>Aragorn's Squash</h3>
  <p>
    Altogether unleash weasel mainly well-protected hiding Farthing excuse. Falling pits oil em Hasufel levels weight
    rides vagabonds? Gamgee hard-won thunder merrier forests treasury. Past birthday lasts lowly there'd woe Woodland pa
    sun's slaying most handling.
  </p>
  <p>
    Even the smallest person can change the course of the future. They tempted completely other caves cloven wisest
    draught scrumptious cook Undómiel friends. Dory crunchy huge sleepless. Unmade took nerves liquor defeated Arathorn.
  </p>
</div>

<div class="wa-grid">
  <div class="wa-stack wa-align-items-start">
    <div style="min-inline-size: 4rem;"></div>
    <div style="min-inline-size: 8rem;"></div>
    <div style="min-inline-size: 6rem;"></div>
  </div>
  <div class="wa-stack wa-align-items-center">
    <div style="min-inline-size: 4rem;"></div>
    <div style="min-inline-size: 8rem;"></div>
    <div style="min-inline-size: 6rem;"></div>
  </div>
  <div class="wa-stack wa-align-items-end">
    <div style="min-inline-size: 4rem;"></div>
    <div style="min-inline-size: 8rem;"></div>
    <div style="min-inline-size: 6rem;"></div>
  </div>
</div>
```

### `wa-flank`

Two items side-by-side with one stretching to fill space. Wraps when needed.

Options:
- Position: append `:start` (default) or `:end` to control which item flanks the content (`wa-flank:start`, `wa-flank:end`).
- Gap: any `wa-gap-*`
- Alignment: `wa-align-items-*`
- No-wrap: add `wa-nowrap`
- Sizing: set `--flank-size` to target a preferred inline size for the flank; when wrapping, it will stretch to container width.
- Content minimum: set `--content-percentage` (default ~50%) to control when wrapping occurs based on main content's minimum share (e.g., `70%`, `85%`).
- Switch order on small screens with `wa-reverse` (the stretch item precedes the other)

### `wa-split`

Distribute items across available space. Append `:column` or `:row` to control direction.

Options:
- Direction: `wa-split:row` (default), `wa-split:column`
- Alignment: `wa-align-items-*`
- Gap: `wa-gap-*`
- Collapse breakpoint: set `--wa-split-collapse` (e.g., `40rem`) to stack when container is narrow

Examples:
```html
<div class="wa-flank">
  <div class="wa-split:column">
    <div class="wa-stack">
      <wa-button appearance="plain">
        <wa-icon name="house" label="Home"></wa-icon>
      </wa-button>
      <wa-button appearance="plain">
        <wa-icon name="calendar" label="Calendar"></wa-icon>
      </wa-button>
      <wa-button appearance="plain">
        <wa-icon name="envelope" label="Mail"></wa-icon>
      </wa-button>
    </div>
    <div class="wa-stack">
      <wa-divider></wa-divider>
      <wa-button appearance="plain">
        <wa-icon name="right-from-bracket" label="Sign Out"></wa-icon>
      </wa-button>
    </div>
  </div>
  <div class="placeholder"></div>
</div>

<div class="wa-stack">
  <div class="wa-split">
    <wa-icon name="web-awesome" label="Web Awesome" style="font-size: 1.5rem;"></wa-icon>
    <div class="wa-cluster">
      <wa-button>Sign Up</wa-button>
      <wa-button appearance="outlined">Log In</wa-button>
    </div>
  </div>
  <div class="placeholder"></div>
</div>

<div class="wa-flank wa-align-items-start" style="block-size: 16rem;">
  <div class="wa-split:column">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split:row">
    <div></div>
    <div></div>
  </div>
</div>

<div class="wa-stack">
  <div class="wa-split wa-align-items-start" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-end" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-center" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-stretch" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
</div>

<div class="wa-stack">
  <div class="wa-split wa-gap-3xs">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-gap-3xl">
    <div></div>
    <div></div>
  </div>
</div>
```

### `wa-frame`

Responsive container with consistent proportions. Ideal for wrapping images or visuals.

Aspect Ratio:
- Default is square (1 / 1). Append `:square`, `:landscape` (16 / 9), or `:portrait` (9 / 16) to the `wa-frame` class to set a preset ratio, e.g., `wa-frame:landscape`.
- Alternatively, set a custom CSS `aspect-ratio` on the element (e.g., `aspect-ratio: 4 / 3`).

Border Radius:
- Add any `wa-border-radius-*` class to control rounding:
  - `wa-border-radius-s`, `wa-border-radius-m`, `wa-border-radius-l`, `wa-border-radius-pill`, `wa-border-radius-circle`, `wa-border-radius-square`.
- Alternatively, set a custom `border-radius` style (e.g., `border-radius: 50% 0%`).

Other options:
- Object fit: set `--object-fit` to `cover | contain | fill | none | scale-down` to influence media behavior inside the frame.

### `wa-grid`

Responsive grid layout.

Options:
- Auto-fit columns by minimum size via `--min-column-size` (e.g., `12ch`, `16rem`).
- Explicit columns via `--columns` (number) and `--gap` (fallback to `wa-gap-*`).
- Row sizing via `--row-size`.
- Full-span helper: add `wa-span-grid` to a child to make it span all columns.
- Named areas: set `--areas` with CSS grid-template-areas string; children can use `style="grid-area: header"` etc.
- Breakpoints: provide responsive overrides using container queries or variant prefixes if available (e.g., `lg:wa-gap-l`).

Examples:
```html
<div class="wa-grid" style="--min-column-size: 16rem;" >
  <div>Card 1</div>
  <div class="wa-span-grid">Full-width banner</div>
  <div>Card 2</div>
</div>
```

Sizing
By default, grid items will wrap when the grid's column size is less than 20ch, but you can set a custom minimum column size using the `--min-column-size` property.

```html
<div class="wa-stack">
  <div class="wa-grid" style="--min-column-size: 200px;">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="wa-grid" style="--min-column-size: 6rem;">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
```

Gap
By default, the gap between grid items uses `--wa-space-m` from your theme. You can add any of the following `wa-gap-*` classes to an element with `wa-grid` to specify the gap between items:

- wa-gap-0
- wa-gap-3xs
- wa-gap-2xs
- wa-gap-xs
- wa-gap-s
- wa-gap-m
- wa-gap-l
- wa-gap-xl
- wa-gap-2xl
- wa-gap-3xl

```html
<div class="wa-stack">
  <div class="wa-grid wa-gap-2xs">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="wa-grid wa-gap-2xl">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
```

Span Grid
You can add `wa-span-grid` to any grid item to allow it to span all grid columns. With this, the grid item occupies its own grid row.

```html
<div class="wa-grid">
  <div></div>
  <div></div>
  <div class="wa-span-grid"></div>
  <div></div>
  <div></div>
</div>
```

---

## 🧩 Using Layout with Components and Sizes

The layout utilities work with any Web Awesome component (`wa-button`, `wa-card`, `wa-input`, etc.). Combine classes and CSS variables to achieve responsive, consistent UIs.

Guidelines:
- Prefer container-based spacing using `wa-gap-*` on `wa-cluster`, `wa-stack`, or `wa-grid` rather than adding margins to individual components.
- Use component `size` attributes consistently inside a layout (e.g., all buttons in a cluster share the same `size`).
- Override layout via CSS custom properties on the container when needed.

Examples:

Cluster of buttons with consistent gaps and shared size:
```html
<div class="wa-cluster wa-align-items-center wa-gap-s">
  <wa-button size="m" variant="filled">Primary</wa-button>
  <wa-button size="m" variant="outlined">Secondary</wa-button>
  <wa-button size="m" variant="plain">Tertiary</wa-button>
</div>
```

Responsive grid of cards with a full-span element and custom gap:
```html
<div class="wa-grid wa-gap-m" style="--min-column-size: 18rem">
  <wa-card>Card 1</wa-card>
  <div class="wa-span-grid">
    <wa-banner>Full width update</wa-banner>
  </div>
  <wa-card>Card 2</wa-card>
  <wa-card>Card 3</wa-card>
</div>
```

Split layout collapsing to a stack under 40rem:
```html
<div class="wa-split:row wa-align-items-center wa-gap-m" style="--wa-split-collapse: 40rem">
  <div class="wa-stack wa-gap-xs">
    <h3 class="wa-heading-m">Section title</h3>
    <p class="wa-body-s wa-color-quiet">Descriptive text.</p>
  </div>
  <wa-button size="s" variant="filled">Action</wa-button>
</div>
```

Tip: Utilize theme tokens to tune layout density: `--gap`, `--min-column-size`, and radius/typography tokens referenced in this file.

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

### 🗨️ Dialog Integration

* Any directive that represents a clickable/interactive control MUST pass through the `data-dialog` attribute to the underlying Web Awesome element so it can participate in dialog behaviors (e.g., `data-dialog="close"`).
* Supported wrappers include: `wa-button`, `wa-copy-button`, `wa-dropdown-item`, `wa-icon`, `wa-breadcrumb-item`, `wa-progress-bar`, `wa-progress-ring`, `wa-rating`, `wa-checkbox`, and `wa-switch`.
* For Angular bindings, you may use any of the following input aliases: `[data-dialog]`, `[dialog]`, or `[dataDialog]`.

### ⚛️ Custom Event Support

* Angular wrappers must allow users to bind to custom events emitted by Web Awesome components (e.g. `(wa-start)`, `(wa-finish)`, etc.).
* For components that emit events, document all event names and map them in the directive/component.
* Events can be passed through natively using `(eventName)="handler()"`, or explicitly exposed via `@Output()` as needed for type safety.

---

📌 These global rules are inherited by all component-specific `.rules.md` files in this library ecosystem.

👌 Updated with support for native tag selectors, event bindings, boolean and number coercion, and directive-based render control for stable Angular 19 integration.


---

## 🔁 Binding Rules & Patterns (applies to all wa-* wrappers)

These rules standardize how every Angular wrapper should bind to its underlying Web Awesome Web Component so we can implement them all consistently.

1. ControlValueAccessor for value-like components
   - Implement ControlValueAccessor for any component that represents a form control: input, textarea, select, checkbox, radio group, color picker, switch, slider, rating, etc.
   - Required callbacks: writeValue, registerOnChange, registerOnTouched, setDisabledState.
   - Event sources to update Angular model:
     - Always listen to native 'input' and 'change' events on the host element (not event.target from inside shadow DOM).
     - When reading the current value from the Web Component, prefer attribute first then property:
       - const el = this.el.nativeElement as any;
       - let v = el?.getAttribute?.('value');
       - if (v == null) v = el?.value ?? null;
     - For boolean controls (e.g., checkbox/switch): derive current state from el.checked property or the presence of the attribute (e.g., hasAttribute('checked')).
   - writeValue implementation:
     - Set both property and attribute to reflect the value, using a feedback-loop guard (see below).
     - For empty/null, remove the attribute (e.g., removeAttribute('value') or removeAttribute('checked')).
     - For arrays (multi-select), set property to an array when supported and set 'value' attribute to a space-delimited string.
   - setDisabledState:
     - Always reflect disabled to both property and attribute for better interop: el.disabled = true/false and set/removeAttribute('disabled').

2. Feedback-loop guard and observers
   - Maintain an internal isWriting flag that is set to true in writeValue and reset in a microtask (Promise.resolve().then(() => (isWriting = false))).
   - Add a MutationObserver to watch relevant attributes and sync Angular's model when the WC changes itself:
     - Value-like controls: observe attribute 'value'.
     - Boolean controls: observe attribute 'checked'.
   - In the observer callback, if (isWriting) return; then read current state as described above and call onChange(current).

3. Boolean attributes coercion (inputs)
   - All boolean @Input()s should accept boolean | string types (true | false | 'true' | '').
   - Only render boolean attributes when the value is truthy: setAttribute(name, '').
   - Remove the attribute when falsy; do not render name="false".

4. Name requirement for template-driven forms
   - When using [(ngModel)] on custom elements, the name attribute is required for form association. Document this in component rules and examples.

5. Event naming and mapping
   - Web Component custom events are usually kebab-case (e.g., 'wa-after-show'). In Angular, you can expose them directly or via camelCase @Output() aliases (e.g., waAfterShow: EventEmitter) that re-emit the native event.
   - For validity events, normalize both 'waInvalid' and 'wa-invalid' if both variants may appear.

6. Prefer attribute-first reads
   - Many Web Components reflect their value to an attribute. To ensure stable interop in tests and in SSR/hydration scenarios, prefer reading the attribute first and then fallback to the property when handling 'input'/'change' and observer callbacks.

7. Multiple selection pattern
   - For components supporting multiple selection, standardize on:
     - Model type: string[] in Angular.
     - Attribute reflection: space-delimited value string (e.g., 'one two three').
     - writeValue: if array is empty, remove 'value'; otherwise, property gets array; attribute gets joined string.
     - Native event handling: if a string is received, split(' ') into an array; if array is received, use as-is.

8. Click fallback
   - For boolean toggles that may not always emit 'input'/'change' in some environments, add a 'click' listener that reads el.checked/hasAttribute('checked') and calls onChange.

9. CSS custom properties
   - Style-related @Input()s should set CSS custom properties on the host via Renderer2.setStyle(el, '--prop-name', value) rather than setting inline style tokens on internal parts.

10. Dialog integration
   - All interactive wrappers must pass through data-dialog (accept aliases: [data-dialog], [dialog], [dataDialog]) to participate in dialog behaviors.

11. Initialization
   - If a component requires it, defer interactions until customElements.whenDefined('wa-xyz') resolves. For most wrappers setting attributes up-front is sufficient, but avoid calling shadow internals before definition.

12. Testing contract
   - Provide a BrowserStack-style spec per form-capable component to validate [(ngModel)] updates from native 'input'/'change' and attribute MutationObserver sync. Prefer attribute-first reads in specs as well.

## 📂 Docs Directory Policy

- The docs directory is for generating documentation only. Do not use files under docs as a source of truth for implementation details or API reference. They may be incomplete, transformed, or out of date.
- The authoritative references for usage are:
  - This RULES.md (global binding and implementation rules).
  - Each component’s local *.rules.md file next to its directive.
  - The Web Awesome upstream component documentation.
- Examples under examples/ are samples and can deviate during development; verify against the rules files before changing wrappers.
