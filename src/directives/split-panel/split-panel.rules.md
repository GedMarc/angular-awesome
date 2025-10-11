# Split Panel Directive Rules

The `wa-split-panel` directive wraps the `<wa-split-panel>` Web Awesome component. Split panels display two adjacent panels, allowing the user to reposition them.

## Overview
- Selector: `wa-split-panel` (native tag selector)
- Purpose: two resizable panels (start/end) with a draggable divider; supports horizontal and vertical orientations, snapping, primary panel, and size constraints.

## Usage

### Basic
```html
<wa-split-panel>
  <div slot="start" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">Start</div>
  <div slot="end" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">End</div>
</wa-split-panel>
```

### Initial Position (percentage)
```html
<wa-split-panel position="75">
  <div slot="start" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">Start</div>
  <div slot="end" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">End</div>
</wa-split-panel>
```

### Initial Position (pixels)
```html
<wa-split-panel position-in-pixels="150">
  <div slot="start" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">Start</div>
  <div slot="end" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">End</div>
</wa-split-panel>
```

### Orientation (vertical)
```html
<wa-split-panel orientation="vertical" style="height: 400px;">
  <div slot="start" style="height: 100%; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">Start</div>
  <div slot="end" style="height: 100%; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">End</div>
</wa-split-panel>
```

### Snapping
```html
<div class="split-panel-snapping" style="position: relative;">
  <wa-split-panel snap="100px 50%">
    <div slot="start" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">Start</div>
    <div slot="end" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">End</div>
  </wa-split-panel>
  <div class="split-panel-snapping-dots"></div>
</div>

<style>
  .split-panel-snapping-dots::before,
  .split-panel-snapping-dots::after { content: ''; position: absolute; bottom: -12px; width: 6px; height: 6px; border-radius: 50%; background: var(--wa-color-neutral-fill-loud); transform: translateX(-3px); }
  .split-panel-snapping-dots::before { left: 100px; }
  .split-panel-snapping-dots::after { left: 50%; }
</style>
```

### Disabled
```html
<wa-split-panel disabled>
  <div slot="start" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">Start</div>
  <div slot="end" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">End</div>
</wa-split-panel>
```

### Primary Panel demo
```html
<div class="split-panel-primary">
  <wa-split-panel>
    <div slot="start" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">Start</div>
    <div slot="end" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">End</div>
  </wa-split-panel>

  <wa-select label="Primary Panel" value="" style="max-width: 200px; margin-top: 1rem;">
    <wa-option value="">None</wa-option>
    <wa-option value="start">Start</wa-option>
    <wa-option value="end">End</wa-option>
  </wa-select>
</div>

<script>
  const container = document.querySelector('.split-panel-primary');
  const splitPanel = container.querySelector('wa-split-panel');
  const select = container.querySelector('wa-select');
  select.addEventListener('change', () => (splitPanel.primary = select.value));
</script>
```

### Min & Max
```html
<wa-split-panel style="--min: 150px; --max: calc(100% - 150px);">
  <div slot="start" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">Start</div>
  <div slot="end" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">End</div>
</wa-split-panel>
```

### Nested Split Panels
```html
<wa-split-panel>
  <div slot="start" style="height: 400px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden">Start</div>
  <div slot="end">
    <wa-split-panel orientation="vertical" style="height: 400px;">
      <div slot="start" style="height: 100%; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden">Top</div>
      <div slot="end" style="height: 100%; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden">Bottom</div>
    </wa-split-panel>
  </div>
</wa-split-panel>
```

### Customizing the Divider
```html
<wa-split-panel style="--divider-width: 20px;">
  <wa-icon slot="divider" name="grip-vertical" variant="solid"></wa-icon>
  <div slot="start" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">Start</div>
  <div slot="end" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">End</div>
</wa-split-panel>

<div class="split-panel-divider">
  <wa-split-panel>
    <wa-icon slot="divider" name="grip-vertical" variant="solid"></wa-icon>
    <div slot="start" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">Start</div>
    <div slot="end" style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;">End</div>
  </wa-split-panel>
</div>

<style>
  .split-panel-divider wa-split-panel { --divider-width: 4px; }
  .split-panel-divider wa-split-panel::part(divider) { background-color: var(--wa-color-red-50); }
  .split-panel-divider wa-icon { position: absolute; border-radius: var(--wa-border-radius-l); background: var(--wa-color-red-50); color: white; padding: 0.5rem 0.25rem; }
  .split-panel-divider wa-split-panel::part(divider):focus-visible { background-color: var(--wa-color-blue-50); }
  .split-panel-divider wa-split-panel:focus-within wa-icon { background-color: var(--wa-color-blue-50); color: white; }
</style>
```

## API Reference

### Slots
- start — Content to place in the start panel.
- end — Content to place in the end panel.
- divider — The divider. Useful for slotting in a custom icon that renders as a handle.

### Inputs/Attributes
- position: number — Percent 0–100. Defaults to 50.
- positionInPixels: number — Pixels from primary edge.
- orientation: 'horizontal' | 'vertical' — Default 'horizontal'.
- disabled: boolean — Prevents resizing; position may still change with host resize.
- primary: 'start' | 'end' | undefined — Designates a primary panel.
- snap: string | undefined — Space-separated px or % snap points.
- snapThreshold: number — Proximity in px to snap. Default 12.

### Events
- wa-reposition — Emitted when the divider's position changes.

### CSS Custom Properties
- --divider-width — Width of the visible divider. Default 4px.
- --divider-hit-area — Invisible region around divider for dragging. Default 12px.
- --min — Minimum allowed size of the primary panel. Default 0.
- --max — Maximum allowed size of the primary panel. Default 100%.

### CSS Parts
- start — The start panel.
- end — The end panel.
- panel — Targets both start and end panels.
- divider — The divider that separates the start and end panels.
