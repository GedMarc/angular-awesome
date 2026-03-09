# Toasts

The Toasts feature provides transient, non-blocking notifications using the official `<wa-toast>` and `<wa-toast-item>` web components, wrapped by `WaToastDirective`, `WaToastItemDirective`, and the `WaToastContainerComponent`. The `WaToastService` provides a programmatic API for managing toast notifications.

## Overview

Toasts are small, contextual notifications that appear on the screen and disappear automatically or can be dismissed by the user. This implementation uses the official Web Awesome toast components and supports:

- Configurable placement: `top-start`, `top-center`, `top-end`, `bottom-start`, `bottom-center`, `bottom-end`
- Max visible with FIFO queueing
- Auto-dismiss timers per toast, including sticky toasts (duration = 0)
- Built-in close button and progress ring from the native `<wa-toast-item>` component
- Variant-based styling: `brand`, `success`, `warning`, `danger`, `neutral`
- Size options: `small`, `medium`, `large`
- Programmatic API via `WaToastService` for show/update/close/clearAll and runtime configuration
- Direct access to the native `<wa-toast>` element's `create()` method via `WaToastDirective`

## Getting Started

Add a single container once in your app shell (e.g., `app.component.html`). Then inject `WaToastService` to display notifications from anywhere.

```html
<wa-toast-container placement="top-end"></wa-toast-container>
```

Optionally provide defaults during bootstrap:

```ts
import { provideWaToasts } from 'angular-awesome';

bootstrapApplication(AppComponent, {
  providers: [
    ...provideWaToasts({ placement: 'bottom-start', max: 3, duration: 4000, newestOnTop: true })
  ]
});
```

## API Reference

### WaToastDirective (standalone directive)

- selector: `wa-toast`
- purpose: Angular wrapper for the official `<wa-toast>` Web Component.

Inputs
- `placement: ToastPlacement` — where to position the toast stack. Default `'top-end'`.

Methods
- `create(message: string, options?: ToastCreateOptions)` — delegates to the native element's `create()` method.

Properties
- `nativeElement` — provides direct access to the underlying `<wa-toast>` element.

### WaToastItemDirective (standalone directive)

- selector: `wa-toast-item`
- purpose: Angular wrapper for the official `<wa-toast-item>` Web Component.

Inputs
- `variant: 'brand' | 'success' | 'warning' | 'danger' | 'neutral'` — the visual variant. Default `'neutral'`.
- `size: 'small' | 'medium' | 'large'` — the size. Default `'medium'`.
- `duration: number` — auto-dismiss duration in ms. Set to 0 for sticky. Default `5000`.

Outputs
- `(waShow)` / `(wa-show)` — emitted when the toast item begins to show.
- `(waAfterShow)` / `(wa-after-show)` — emitted after the toast item has finished showing.
- `(waHide)` / `(wa-hide)` — emitted when the toast item begins to hide.
- `(waAfterHide)` / `(wa-after-hide)` — emitted after the toast item has finished hiding.

Methods
- `hide()` — hides the toast item with animation and removes it from the DOM.

Slots
- `(default)` — the toast item's message content.
- `icon` — an optional icon to show at the start of the toast item.

### WaToastContainerComponent (standalone component)

- selector: `wa-toast-container`
- purpose: Renders the on-screen stack of toasts using `<wa-toast>` and `<wa-toast-item>` elements. Subscribes to `WaToastService.toasts$`.

Inputs
- `placement: ToastPlacement` — where to anchor the stack. Defaults to value from `WaToastService.config.placement` (default `'top-end'`).

### WaToastService

Provided in root. Use to manage toasts programmatically.

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
- `variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral' | string`
- `size?: 'small' | 'medium' | 'large' | string`
- `duration?: number` — ms; 0 means sticky
- `title?: string`
- `createdAt: number` — timestamp

`ToastConfig`
- `placement?: ToastPlacement` — default `'top-end'`
- `max?: number` — default 5
- `duration?: number` — default 5000ms
- `newestOnTop?: boolean` — default true

`ToastPlacement`
- `'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'`

`ToastCreateOptions` (for direct native API usage)
- `variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral'`
- `size?: 'small' | 'medium' | 'large'`
- `duration?: number`
- `icon?: string`

### Providers

`provideWaToasts(config?: ToastConfig): Provider[]`
- Returns providers to configure defaults application-wide.

## Styling

Toasts use the official `<wa-toast>` and `<wa-toast-item>` web components and inherit all built-in design tokens.

CSS Custom Properties for `<wa-toast>`
- `--gap`: The gap between stacked toast items (default `var(--wa-space-s)`)
- `--width`: The width of the toast stack (default `28rem`)

CSS Custom Properties for `<wa-toast-item>`
- `--accent-width`: The width of the accent line (default `4px`)
- `--show-duration`: The animation duration when showing (default `200ms`)
- `--hide-duration`: The animation duration when hiding (default `200ms`)

CSS Parts for `<wa-toast>`
- `stack`: The container that holds the toast items.

CSS Parts for `<wa-toast-item>`
- `toast-item`: The toast item's main container.
- `accent`: The colored accent line on the start side.
- `icon`: The icon container.
- `content`: The message content container.
- `close-button`: The close button element.
- `progress-ring`: The progress ring component.

Example overrides

```css
/* Increase spacing between toasts */
wa-toast { --gap: 16px; }

/* Widen the toast stack */
wa-toast { --width: 32rem; }

/* Customize accent line width */
wa-toast-item { --accent-width: 6px; }

/* Adjust animation speed */
wa-toast-item { --show-duration: 300ms; --hide-duration: 150ms; }
```
