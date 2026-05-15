# Align Items Directive Examples

This page shows how to use the `[waAlignItems]` directive together with Web Awesome layout utilities.

## Center items in a cluster
```html
<div class="wa-cluster wa-gap-s" [waAlignItems]="'center'">
  <wa-avatar style="--size: 28px"></wa-avatar>
  <span class="wa-body-s">User name</span>
  <wa-button size="s" variant="filled">Follow</wa-button>
</div>
```

## End align on split
```html
<div class="wa-split:row wa-gap-m" [waAlignItems]="'end'">
  <div>
    <div class="wa-heading-m">Project</div>
    <p class="wa-body-s wa-color-quiet">Align controls to bottom</p>
  </div>
  <div class="wa-cluster wa-gap-xs">
    <wa-button size="s">Cancel</wa-button>
    <wa-button size="s" variant="filled">Save</wa-button>
  </div>
</div>
```

## Baseline alignment in a stack
```html
<div class="wa-stack wa-gap-xs" [waAlignItems]="'baseline'">
  <div class="wa-heading-m">Heading</div>
  <div class="wa-body-s">Smaller text aligns on baseline</div>
</div>
```
