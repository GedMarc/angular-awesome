# Split Directive Examples

Use the `[waSplit]` directive to create split layouts that distribute items across available space. Combine with `[waGap]` and `[waAlignItems]` and reference other primitives like flank and cluster.

## Basic split
```html
<div waSplit>
  <div></div>
  <div></div>
</div>
```

## Sidebar + content using flank and split:column
```html
<div class="wa-flank">
  <div class="wa-split:column">
    <div class="wa-stack">
      <wa-button appearance="plain"><wa-icon name="house" label="Home"></wa-icon></wa-button>
      <wa-button appearance="plain"><wa-icon name="calendar" label="Calendar"></wa-icon></wa-button>
      <wa-button appearance="plain"><wa-icon name="envelope" label="Mail"></wa-icon></wa-button>
    </div>
    <div class="wa-stack">
      <wa-divider></wa-divider>
      <wa-button appearance="plain"><wa-icon name="right-from-bracket" label="Sign Out"></wa-icon></wa-button>
    </div>
  </div>
  <div class="placeholder"></div>
</div>

<style>
  .placeholder {
    min-block-size: 300px;
    background-color: #f3f4f6;
    border: 2px dashed #d1d5db;
    border-radius: 0.75rem;
  }
</style>
```

## Header with brand and actions
```html
<div class="wa-stack">
  <div waSplit [waAlignItems]="'center'">
    <wa-icon name="web-awesome" label="Web Awesome" style="font-size: 1.5rem;"></wa-icon>
    <div class="wa-cluster">
      <wa-button>Sign Up</wa-button>
      <wa-button appearance="outlined">Log In</wa-button>
    </div>
  </div>
  <div class="placeholder"></div>
</div>

<style>
  .placeholder {
    min-block-size: 300px;
    background-color: #f3f4f6;
    border: 2px dashed #d1d5db;
    border-radius: 0.75rem;
  }
</style>
```

## Direction
```html
<div class="wa-flank wa-align-items-start" style="block-size: 16rem;">
  <div class="wa-split:column">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split:row">
    <div></div>
    <div></div>
  </div>
</div>
```

## Align Items
```html
<div class="wa-stack">
  <div class="wa-split wa-align-items-start" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-end" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-center" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-stretch" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
</div>
```

## Gap
```html
<div class="wa-stack">
  <div class="wa-split wa-gap-3xs">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-gap-3xl">
    <div></div>
    <div></div>
  </div>
</div>
```

## Collapse at 40rem
```html
<div class="wa-split:row wa-align-items-center wa-gap-m" style="--wa-split-collapse: 40rem">
  <div class="wa-stack wa-gap-xs">
    <h3 class="wa-heading-m">Section title</h3>
    <p class="wa-body-s wa-color-quiet">Descriptive text.</p>
  </div>
  <wa-button size="s" variant="filled">Action</wa-button>
</div>
```
