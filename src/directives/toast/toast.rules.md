# Toasts

The Toasts feature provides transient, non-blocking notifications using a fixed-position stack rendered by `<wa-toast-container>` and controlled via the `WaToastService`. It builds on the existing `<wa-callout>` visuals to ensure consistent variants, appearance, and sizes across the design system.

## Overview

Toasts are small, contextual notifications that appear in a corner of the screen and disappear automatically or can be dismissed by the user. This implementation supports:

- Configurable screen position: `top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-center`, `bottom-center`
- Max visible with FIFO queueing
- Auto-dismiss timers per toast, including sticky toasts (duration <= 0)
- Closable toasts with a close button
- Reuse of Callout tokens for visual styling: `variant`, `appearance`, `size`
- Programmatic API via `WaToastService` for show/update/close/clearAll and runtime configuration

## Getting Started

Add a single container once in your app shell (e.g., `app.component.html`). Then inject `WaToastService` to display notifications from anywhere.

```html
<wa-toast-container position="top-right"></wa-toast-container>
```

Optionally provide defaults during bootstrap:

```ts
import { provideWaToasts } from 'angular-awesome';

bootstrapApplication(AppComponent, {
  providers: [
    ...provideWaToasts({ position: 'bottom-left', max: 3, duration: 4000, newestOnTop: true })
  ]
});
```

## API Reference

### wa-toast-container (standalone component)

- selector: `wa-toast-container`
- purpose: Renders the on-screen stack of toasts and handles positioning/ordering.

Inputs
- `position: ToastPosition` — where to anchor the stack. Defaults to value from `WaToastService.config.position` (default `top-right`).

Host attributes
- `data-pos` — reflects `position` for CSS-based anchoring.

Accessibility
- Inner stack uses `role="region"` + `aria-live="polite"`. Each toast has `role="status"`.

### WaToastService

Provided in root. Use to manage toasts.

Properties
- `toasts$: Observable<Toast[]>` — list of currently visible toasts.
- `config: Readonly<Required<ToastConfig>>` — effective configuration.

Methods
- `setConfig(partial: ToastConfig): void` — merge and apply new defaults at runtime.
- `show(message: string, options?: Partial<Omit<Toast, 'id'|'message'|'createdAt'>>): string` — show a toast and return its id.
- `success(message: string, options?: ...)` — convenience wrapper for `variant: 'success'`.
- `warning(message: string, options?: ...)` — wrapper for `variant: 'warning'`.
- `danger(message: string, options?: ...)` — wrapper for `variant: 'danger'`.
- `brand(message: string, options?: ...)` — wrapper for `variant: 'brand'`.
- `neutral(message: string, options?: ...)` — wrapper for `variant: 'neutral'`.
- `update(id: string, changes: Partial<Omit<Toast, 'id'|'createdAt'>>): void` — update a visible or queued toast.
- `close(id: string): void` — close a toast (visible or queued).
- `clearAll(): void` — remove all toasts and clear timers.

### Types

`Toast`
- `id: string`
- `message: string`
- `variant?: VariantToken | string`
- `appearance?: Appearance | string`
- `size?: SizeToken | string`
- `closable?: boolean` — default true
- `duration?: number` — ms; 0 or negative means sticky
- `title?: string`
- `createdAt: number` — timestamp

`ToastConfig`
- `position?: ToastPosition` — default `top-right`
- `max?: number` — default 5
- `duration?: number` — default 5000ms
- `newestOnTop?: boolean` — default true
- `gap?: number` — default 12 (px)
- `zIndex?: number` — default 10000

`ToastPosition`
- `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'`

### Providers

`provideWaToasts(config?: ToastConfig): Provider[]`
- Returns providers to configure defaults application-wide.

## Styling

Toasts reuse the `wa-callout` web component and inherit design tokens for visual consistency. You can theme via Callout attributes and CSS variables.

- Appearance tokens: `accent | filled | outlined | plain | filled-outlined`
- Sizes: `small | medium | large | inherit`

Container CSS hooks
- Host attribute `data-pos` controls anchoring; positions are implemented with fixed offsets (e.g., `top: 16px; right: 16px`).
- Stack element has `[data-position]` attribute reflecting the same value for directional layout.

Example overrides

```css
/* Increase spacing and bump z-index */
wa-toast-container { --wa-toast-gap: 16px; z-index: 11000; }

/* Target individual callouts in the stack */
wa-toast-container .wa-toast[variant="danger"] { box-shadow: 0 0 0 2px rgba(220, 38, 38, .25); }
```
