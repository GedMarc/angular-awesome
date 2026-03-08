# WaResizeObserverDirective Usage Examples

## Basic Usage

```html
<wa-resize-observer (wa-resize)="onResize($event)">
  <div>Resize me!</div>
</wa-resize-observer>
```

## Disabled Observer

```html
<wa-resize-observer [disabled]="true">
  <div>Not being observed</div>
</wa-resize-observer>
```

## Tracking Container Size

```html
<wa-resize-observer (wa-resize)="handleResize($event)">
  <div class="responsive-container" [style.width.%]="containerWidth">
    Content that responds to size changes
  </div>
</wa-resize-observer>
```

