### `wa-scatter-chart.rules.md`
**Angular 20 Directive Rules for `<wa-scatter-chart>` Web Component**
---
## Overview
Angular directive support for the `wa-scatter-chart` Web Component. Scatter charts are ideal for identifying correlations, clusters, and outliers in datasets.
## Supported `@Input()` Bindings
| Input | Type | HTML Attribute | Notes |
| --- | --- | --- | --- |
| `label` | `string` | `label` | Accessibility label |
| `description` | `string` | `description` | Accessibility description |
| `xLabel` | `string` | `x-label` | X-axis label |
| `yLabel` | `string` | `y-label` | Y-axis label |
| `legendPosition` | `string` | `legend-position` | Legend placement |
| `stacked` | `boolean` | `stacked` | Stack datasets |
| `indexAxis` | `string` | `index-axis` | Base axis |
| `grid` | `string` | `grid` | Grid line visibility |
| `min` | `number` | `min` | Min value axis |
| `max` | `number` | `max` | Max value axis |
| `withoutAnimation` | `boolean` | `without-animation` | Disable animations |
| `withoutLegend` | `boolean` | `without-legend` | Hide legend |
| `withoutTooltip` | `boolean` | `without-tooltip` | Hide tooltips |
| `config` | `object` | *property* | Chart.js config object |
| `plugins` | `array` | *property* | Chart.js plugins |
## Styling Support
CSS custom properties `--fill-color-1` through `--fill-color-6`, `--border-color-1` through `--border-color-6`, `--grid-color`, `--border-width`, `--border-radius`, `--grid-border-width`, `--line-border-width`, and `--point-radius` are supported via input setters.
