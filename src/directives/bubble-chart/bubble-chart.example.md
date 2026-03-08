# WaBubbleChartDirective Usage Examples
## Basic Usage
```html
<wa-bubble-chart label="Bubble Chart">
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
</wa-bubble-chart>
```
## With Angular Bindings
```html
<wa-bubble-chart
  [label]="chartLabel"
  [config]="chartConfig"
  [withoutAnimation]="true"
  legendPosition="bottom">
</wa-bubble-chart>
```
## Custom Styling
```html
<wa-bubble-chart
  label="Styled Chart"
  [fillColor1]="'rgba(59, 130, 246, 0.5)'"
  [borderColor1]="'rgb(59, 130, 246)'"
  [config]="chartConfig">
</wa-bubble-chart>
```
