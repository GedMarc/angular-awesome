---
name: angular-awesome
description: "Use Angular Awesome wrapper directives for Web Awesome web components in Angular 19+ projects. Trigger when tasks mention wa-* components (wa-button, wa-input, wa-dialog, wa-toast, wa-select, wa-checkbox, etc.), Angular Awesome directives, Web Awesome Angular integration, component variants/appearance/size tokens, slot projection, form control binding, or angular-awesome imports. Covers component usage, layout utilities, services (toast), theming, and accessibility."
metadata:
  short-description: Use Angular Awesome web component wrappers
---

# Angular Awesome

Angular 19+ standalone directives wrapping Web Awesome 3.3.x web components. Every `<wa-*>` tag has a corresponding `Wa*Directive` or `Wa*Component` that binds attributes as `@Input()` properties, emits custom events as `@Output()`, and exposes `nativeElement` for direct access.

## Quick Start

```ts
import { WaButtonDirective } from 'angular-awesome';

@Component({
  standalone: true,
  imports: [WaButtonDirective],
  template: `<wa-button variant="brand" (wa-click)="save()">Save</wa-button>`
})
export class MyComponent { save() {} }
```

## Directive Pattern (all components follow this)

1. `selector: 'wa-<name>'`, standalone, no template (directive on the native element).
2. `@Input()` for every attribute — typed union with `| string` for template compatibility.
3. `@Output()` for custom events — both camelCase (`waClick`) and hyphenated (`wa-click`) aliases.
4. `inject(ElementRef)` + `inject(Renderer2)` for attribute application in `ngOnInit`/`ngOnChanges`.
5. `nativeElement` getter for direct DOM access.

## Shared Tokens (`src/types/tokens.ts`)

```ts
type VariantToken = 'brand' | 'neutral' | 'success' | 'warning' | 'danger' | 'inherit';
type SizeToken    = 'small' | 'medium' | 'large' | 'inherit';
type Appearance   = 'accent' | 'filled' | 'outlined' | 'plain' | 'filled-outlined';
```

Use `normalizeAppearance()` to convert legacy space-delimited values.

## Key Patterns

### Slot Projection
Angular content projection maps directly to web component slots:
```html
<wa-card>
  <span slot="header">Title</span>
  Default slot content here
  <span slot="footer">Footer</span>
</wa-card>
```

### Boolean Attributes
Bind with Angular syntax; never use string `"true"`:
```html
<wa-button [disabled]="isDisabled" [loading]="isLoading">Go</wa-button>
```

### Form Controls (ControlValueAccessor)
`wa-input`, `wa-select`, `wa-checkbox`, `wa-switch`, `wa-slider`, `wa-textarea`, `wa-combobox`, `wa-color-picker`, `wa-number-input`, `wa-radio` support `[(ngModel)]` and reactive forms.

### Events
Listen to web component custom events via `(wa-*)` outputs:
```html
<wa-input (wa-input)="onInput($event)" (wa-change)="onChange($event)"></wa-input>
```

### Toast Service
```ts
import { WaToastService, provideWaToasts } from 'angular-awesome';
// In providers: ...provideWaToasts({ placement: 'top-end', max: 5 })
// In component: this.toasts.success('Saved!');
```
Container: `<wa-toast-container placement="top-end"></wa-toast-container>` — once in app root.

### Layout Utilities
`wa-layout-gap`, `wa-layout-align`, `wa-layout-cluster`, `wa-layout-stack`, `wa-layout-grid`, `wa-layout-flank`, `wa-layout-frame`, `wa-layout-split` — structural layout directives.

## File Structure (per component)

```
src/directives/<name>/
├── <name>.directive.ts        # Angular directive
├── <name>.directive.spec.ts   # Unit tests
├── <name>.rules.md            # Usage rules & API reference
└── <name>.example.md          # Code examples for docs
```

Exports go in `src/public-api.ts`. Docs auto-generate from rules + example markdown via `node docs/generate-docs.js`.

## References
- Component API catalog (official): `references/component-catalog.md`
- Directive authoring patterns: `references/directive-patterns.md`
- Testing conventions: `references/testing-conventions.md`

