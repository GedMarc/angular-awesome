# Toasts Examples

This page shows how to use the Toasts system built on top of `wa-callout` via the `WaToastService` and the `wa-toast-container` component.

## Basic Setup

Add the container once near the application root (e.g., in `app.component.html`). It will position the stack and render incoming toasts.

```html
<!-- app.component.html -->
<wa-toast-container position="top-right"></wa-toast-container>
```

Optionally configure defaults during bootstrap:

```ts
// main.ts (bootstrapApplication)
import { provideWaToasts } from 'angular-awesome';

bootstrapApplication(AppComponent, {
  providers: [
    ...provideWaToasts({ position: 'bottom-left', max: 3, duration: 4000, newestOnTop: true, gap: 12, zIndex: 10000 })
  ]
});
```

## Showing Toasts

Inject `WaToastService` and call `show` or convenience helpers like `success`, `warning`, `danger`, `brand`, or `neutral`.

```ts
import { Component } from '@angular/core';
import { WaToastService } from 'angular-awesome';

@Component({
  selector: 'demo-toasts',
  template: `
    <button (click)="saved()">Save</button>
    <button (click)="sync()">Sync</button>
  `
})
export class DemoToastsComponent {
  constructor(private toasts: WaToastService) {}

  saved() {
    this.toasts.success('Profile saved', { closable: true });
  }

  sync() {
    const id = this.toasts.show('Sync in progress…', { variant: 'neutral', duration: 0 });
    // simulate later update
    setTimeout(() => this.toasts.update(id, { message: 'Sync complete', variant: 'success', duration: 3000 }), 1500);
  }
}
```

## Positioning

Change where the container renders on the screen with the `position` input:

```html
<wa-toast-container position="bottom-center"></wa-toast-container>
```

Supported positions: `top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-center`, `bottom-center`.

## Closable and Auto-dismiss

- By default, toasts are closable and auto-dismiss after the configured `duration` (default 5000ms).
- Set `duration: 0` or a negative value to make a toast sticky until it is explicitly closed.

```ts
this.toasts.show('Sticky notice', { duration: 0 });
```

## Max Visible and Queueing

Control concurrent visibility via `max`. Excess toasts are queued FIFO and shown when space frees up.

```ts
// Provide defaults
...provideWaToasts({ max: 2 });

// Enqueue several toasts quickly
this.toasts.success('T1');
this.toasts.success('T2');
this.toasts.success('T3 (queued)');
```

## Appearance and Size

Toast visuals reuse `wa-callout` tokens:

```ts
this.toasts.show('Filled outlined large', {
  appearance: 'filled-outlined',
  size: 'large'
});
```
