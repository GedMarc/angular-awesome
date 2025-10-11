# Stack Directive Examples

Use the `[waStack]` directive to arrange items in a column (or row) with consistent spacing. Combine with `[waGap]` for spacing and `[waAlignItems]` for alignment.

## Basic stack
```html
<div waStack [waGap]="'m'">
  <div></div>
  <div></div>
  <div></div>
</div>
```

## Form stack
```html
<div waStack [waGap]="'m'">
  <wa-input label="Email">
    <wa-icon slot="start" name="envelope" variant="regular"></wa-icon>
  </wa-input>
  <wa-input label="Password" type="password">
    <wa-icon slot="start" name="lock" variant="regular"></wa-icon>
  </wa-input>
  <wa-checkbox>Remember me on this device</wa-checkbox>
  <wa-button>Log In</wa-button>
</div>
```

## Text content with large gap
```html
<div waStack [waGap]="'2xl'">
  <h3>Aragorn's Squash</h3>
  <p>
    Altogether unleash weasel mainly well-protected hiding Farthing excuse. Falling pits oil em Hasufel levels weight
    rides vagabonds? Gamgee hard-won thunder merrier forests treasury. Past birthday lasts lowly there'd woe Woodland pa
    sun's slaying most handling.
  </p>
  <p>
    Even the smallest person can change the course of the future. They tempted completely other caves cloven wisest
    draught scrumptious cook Undómiel friends. Dory crunchy huge sleepless. Unmade took nerves liquor defeated Arathorn.
  </p>
</div>
```

## Align Items in a stack
```html
<div class="wa-grid">
  <div class="wa-stack wa-align-items-start">
    <div style="min-inline-size: 4rem;"></div>
    <div style="min-inline-size: 8rem;"></div>
    <div style="min-inline-size: 6rem;"></div>
  </div>
  <div class="wa-stack wa-align-items-center">
    <div style="min-inline-size: 4rem;"></div>
    <div style="min-inline-size: 8rem;"></div>
    <div style="min-inline-size: 6rem;"></div>
  </div>
  <div class="wa-stack wa-align-items-end">
    <div style="min-inline-size: 4rem;"></div>
    <div style="min-inline-size: 8rem;"></div>
    <div style="min-inline-size: 6rem;"></div>
  </div>
</div>
```

## Gap variations
```html
<div class="wa-grid">
  <div class="wa-stack wa-gap-2xs">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="wa-stack wa-gap-2xl">
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
```
