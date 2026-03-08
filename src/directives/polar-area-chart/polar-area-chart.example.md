# WaPolarAreaChartDirective Usage Examples
## Basic Usage
```html
<wa-polar-area-chart label="Polar Area Chart">
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
</wa-polar-area-chart>
```
## With Angular Bindings
```html
<wa-polar-area-chart
  [label]="chartLabel"
  [config]="chartConfig"
  [withoutAnimation]="true"
  legendPosition="bottom">
</wa-polar-area-chart>
```
## Custom Styling
```html
<wa-polar-area-chart
  label="Styled Chart"
  [fillColor1]="'rgba(59, 130, 246, 0.5)'"
  [borderColor1]="'rgb(59, 130, 246)'"
  [config]="chartConfig">
</wa-polar-area-chart>
```
