# Checkbox Group Examples

## Basic Usage

Group related checkboxes under a shared label and hint.

```html
<wa-checkbox-group label="Choose your toppings" hint="Select all that apply">
  <wa-checkbox value="cheese">Cheese</wa-checkbox>
  <wa-checkbox value="pepperoni">Pepperoni</wa-checkbox>
  <wa-checkbox value="mushrooms">Mushrooms</wa-checkbox>
</wa-checkbox-group>
```

## Orientation

The default orientation is vertical. Set `orientation="horizontal"` to lay items out on a single row.

```html
<wa-checkbox-group label="Choose your toppings" orientation="horizontal">
  <wa-checkbox value="cheese">Cheese</wa-checkbox>
  <wa-checkbox value="pepperoni">Pepperoni</wa-checkbox>
  <wa-checkbox value="mushrooms">Mushrooms</wa-checkbox>
</wa-checkbox-group>
```

## Sizing

The group's `size` is applied to every `<wa-checkbox>` and `<wa-switch>` inside it.

```html
<wa-checkbox-group label="Choose your toppings" size="large">
  <wa-checkbox value="cheese">Cheese</wa-checkbox>
  <wa-checkbox value="pepperoni">Pepperoni</wa-checkbox>
  <wa-checkbox value="mushrooms">Mushrooms</wa-checkbox>
</wa-checkbox-group>
```

## Grouping Switches

Checkbox groups also work with `<wa-switch>` elements.

```html
<wa-checkbox-group label="Notifications" hint="Pick the alerts you want to receive">
  <wa-switch value="email">Email</wa-switch>
  <wa-switch value="sms">SMS</wa-switch>
  <wa-switch value="push">Push</wa-switch>
</wa-checkbox-group>
```

## Two-Way Binding

The group does not own a value — bind `[(ngModel)]` on the individual checkboxes.

```html
<wa-checkbox-group label="Choose your toppings">
  <wa-checkbox [(ngModel)]="cheese" name="cheese" value="cheese">Cheese</wa-checkbox>
  <wa-checkbox [(ngModel)]="pepperoni" name="pepperoni" value="pepperoni">Pepperoni</wa-checkbox>
  <wa-checkbox [(ngModel)]="mushrooms" name="mushrooms" value="mushrooms">Mushrooms</wa-checkbox>
</wa-checkbox-group>
```

## Custom Gap

Adjust the space between grouped checkboxes with the `styleGap` input (maps to the `--gap` CSS variable).

```html
<wa-checkbox-group label="Choose your toppings" [styleGap]="'1rem'">
  <wa-checkbox value="cheese">Cheese</wa-checkbox>
  <wa-checkbox value="pepperoni">Pepperoni</wa-checkbox>
  <wa-checkbox value="mushrooms">Mushrooms</wa-checkbox>
</wa-checkbox-group>
```

## Label and Hint Slots

Use the `label` and `hint` slots when you need HTML content.

```html
<wa-checkbox-group [withLabel]="true" [withHint]="true">
  <span slot="label">Choose your <strong>toppings</strong></span>
  <span slot="hint">Select <em>all</em> that apply</span>
  <wa-checkbox value="cheese">Cheese</wa-checkbox>
  <wa-checkbox value="pepperoni">Pepperoni</wa-checkbox>
</wa-checkbox-group>
```

