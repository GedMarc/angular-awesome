# Toasts Examples

This page shows how to use the official `<wa-toast>` and `<wa-toast-item>` web components via the `WaToastService` and the `<waa-toast-container>` component.

## Basic Setup

Add the container once near the application root (e.g., in `app.component.html`). It renders `<wa-toast>` with `<wa-toast-item>` elements for each notification.

```html
<!-- app.component.html -->
<waa-toast-container placement="top-end"></waa-toast-container>
```

Optionally configure defaults during bootstrap:

```ts
// main.ts (bootstrapApplication)
import { provideWaToasts } from 'angular-awesome';

bootstrapApplication(AppComponent, {
  providers: [
    ...provideWaToasts({ placement: 'bottom-start', max: 3, duration: 4000, newestOnTop: true })
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
    this.toasts.success('Profile saved');
  }

  sync() {
    const id = this.toasts.show('Sync in progress…', { variant: 'neutral', duration: 0 });
    // simulate later update
    setTimeout(() => this.toasts.update(id, { message: 'Sync complete', variant: 'success', duration: 3000 }), 1500);
  }
}
```

## Icons and interactive content

Service toasts show a variant icon by default. Pass `icon` to replace it, or `icon: null` to hide it.
For links, buttons, and other Angular content, pass a `TemplateRef` to `showContent`.
The template keeps its bindings and click handlers; HTML strings are displayed as text.

```html
<ng-template #uploadActions>
  <strong>Upload complete</strong><br />
  <a href="/files">View file</a> · <button (click)="share()">Share</button>
</ng-template>
```

```ts
import { TemplateRef, ViewChild } from '@angular/core';

@ViewChild('uploadActions') uploadActions!: TemplateRef<unknown>;

uploaded() {
  this.toasts.showContent(this.uploadActions, { variant: 'success', icon: 'cloud-arrow-up' });
}
```

`WaToastDataService.showContent(template, options)` exposes the same call in JWebMP-generated Angular code.

## Placement

Change where the toast stack renders on the screen with the `placement` input, using the official `<wa-toast>` placement values:

```html
<waa-toast-container placement="bottom-center"></waa-toast-container>
```

Supported placements: `top-start`, `top-center`, `top-end`, `bottom-start`, `bottom-center`, `bottom-end`.

## Using the Directive Directly

You can also use the `<wa-toast>` directive directly for full control:

```html
<wa-toast placement="top-end">
  <wa-toast-item variant="success" duration="5000">
    Record saved successfully!
  </wa-toast-item>
</wa-toast>
```

## Programmatic Creation via Native API

The `WaToastDirective` exposes the native `create()` method:

```ts
import { Component, ViewChild } from '@angular/core';
import { WaToastDirective } from 'angular-awesome';

@Component({
  selector: 'demo-native-toast',
  template: `
    <wa-toast #toast placement="top-end"></wa-toast>
    <button (click)="showToast()">Show Toast</button>
  `
})
export class DemoNativeToastComponent {
  @ViewChild('toast') toast!: WaToastDirective;

  showToast() {
    this.toast.create('Hello from native API!', { variant: 'success', duration: 3000 });
  }
}
```

## Auto-dismiss and Sticky Toasts

- By default, toasts auto-dismiss after the configured `duration` (default 5000ms).
- Set `duration: 0` to make a toast sticky until it is explicitly closed.

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

## Size

Toast items support three sizes via the official `<wa-toast-item>` size property:

```ts
this.toasts.show('Small toast', { size: 'small' });
this.toasts.show('Medium toast', { size: 'medium' });
this.toasts.show('Large toast', { size: 'large' });
```
