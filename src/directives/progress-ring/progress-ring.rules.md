# Progress Ring Directive Rules

The `wa-progress-ring` directive wraps the `<wa-progress-ring>` Web Awesome component. It displays determinate progress (0–100) in a circular ring and supports Angular bindings plus theming via CSS custom properties.

## Overview
- Selector: `wa-progress-ring` (native tag selector)
- Purpose: determinate circular progress display
- Supports: template-driven forms via ControlValueAccessor ([(ngModel)])

## Usage
```html
<!-- Basic -->
<wa-progress-ring value="25"></wa-progress-ring>

<!-- With a visible label projected into the center -->
<wa-progress-ring value="50">50%</wa-progress-ring>

<!-- Size via CSS variable -->
<wa-progress-ring value="50" style="--size: 200px;"></wa-progress-ring>

<!-- Track and indicator widths via CSS variables -->
<wa-progress-ring value="50" style="--track-width: 6px; --indicator-width: 12px;"></wa-progress-ring>

<!-- Colors via CSS variables -->
<wa-progress-ring value="50" style="--track-color: pink; --indicator-color: deeppink;"></wa-progress-ring>
```

## Angular Inputs
- `value?: number` — current progress (0–100). Also binds to [(ngModel)].
- `label?: string` — accessibility label for assistive tech.

### Style Inputs mapped to CSS custom properties
- `size?: string` → `--size`
- `trackWidth?: string` → `--track-width`
- `trackColor?: string` → `--track-color`
- `indicatorWidth?: string` → `--indicator-width`
- `indicatorColor?: string` → `--indicator-color`
- `indicatorTransitionDuration?: string` → `--indicator-transition-duration`

Examples:
```html
<wa-progress-ring value="50" [size]="'160px'" [trackWidth]="'6px'" [indicatorWidth]="'10px'" [trackColor]="'pink'" [indicatorColor]="'deeppink'"></wa-progress-ring>
```

## Outputs
- `(focusEvent)` — fires on focus
- `(blurEvent)` — fires on blur

## Slots
- `(default)` — A label to show inside the ring (projected content)

## Attributes & Properties
- `value: number = 0` — The current progress (0–100)
- `label: string = ''` — A custom label for assistive devices

## CSS Custom Properties
- `--size` — The diameter of the progress ring (cannot be a percentage)
- `--track-width` — The width of the track
- `--track-color` — The color of the track
- `--indicator-width` — The width of the indicator; defaults to the track width
- `--indicator-color` — The color of the indicator
- `--indicator-transition-duration` — Duration of the indicator's transition when the value changes

## CSS Parts
- `base` — The component's base wrapper
- `label` — The progress ring label

## Interactive Example (Angular)
```html
<wa-progress-ring [(ngModel)]="value" class="progress-ring-values" style="margin-bottom: .5rem;">{{value}}%</wa-progress-ring>
<br />
<wa-button circle (click)="value = Math.max(0, value - 10)"><wa-icon name="minus" variant="solid" label="Decrease"></wa-icon></wa-button>
<wa-button circle (click)="value = Math.min(100, value + 10)"><wa-icon name="plus" variant="solid" label="Increase"></wa-icon></wa-button>
```
