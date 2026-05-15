# WaChartDirective Usage Examples
## Basic Usage
```html
<wa-chart label="Advanced Chart">
  <script type="application/json">
  {
    "data": {
      "labels": ["Jan", "Feb", "Mar", "Apr", "May"],
      "datasets": [{
        "label": "Sales",
        "data": [65, 59, 80, 81, 56]
      }]
    }
  }
  </script>
</wa-chart>
```
## With Angular Bindings
```html
<wa-chart
  [label]="chartLabel"
  [config]="chartConfig"
  [withoutAnimation]="true"
  legendPosition="bottom">
</wa-chart>
```
## Custom Styling
```html
<wa-chart
  label="Styled Chart"
  [fillColor1]="'rgba(59, 130, 246, 0.5)'"
  [borderColor1]="'rgb(59, 130, 246)'"
  [config]="chartConfig">
</wa-chart>
```
