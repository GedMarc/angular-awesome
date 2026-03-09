# WaOptionDirective Usage Examples

## Basic Usage with Select

```html
<wa-select label="Choose a color">
  <wa-option value="red">Red</wa-option>
  <wa-option value="green">Green</wa-option>
  <wa-option value="blue">Blue</wa-option>
</wa-select>
```

## With Icons

```html
<wa-select label="Framework">
  <wa-option value="angular">
    <wa-icon slot="start" name="code"></wa-icon>
    Angular
  </wa-option>
  <wa-option value="react">
    <wa-icon slot="start" name="code"></wa-icon>
    React
  </wa-option>
</wa-select>
```

## Disabled Options

```html
<wa-select label="Availability">
  <wa-option value="available">Available</wa-option>
  <wa-option value="unavailable" disabled>Unavailable</wa-option>
</wa-select>
```

## Pre-selected Option

```html
<wa-select label="Size">
  <wa-option value="small">Small</wa-option>
  <wa-option value="medium" selected>Medium</wa-option>
  <wa-option value="large">Large</wa-option>
</wa-select>
```

