# WaPieChartDirective Usage Examples
## Basic Usage
```html
<wa-pie-chart label="Pie Chart">
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
</wa-pie-chart>
```
## With Angular Bindings
```html
<wa-pie-chart
  [label]="chartLabel"
  [config]="chartConfig"
  [withoutAnimation]="true"
  legendPosition="bottom">
</wa-pie-chart>
```
## Custom Styling
```html
<wa-pie-chart
  label="Styled Chart"
  [fillColor1]="'rgba(59, 130, 246, 0.5)'"
  [borderColor1]="'rgb(59, 130, 246)'"
  [config]="chartConfig">
</wa-pie-chart>
```
