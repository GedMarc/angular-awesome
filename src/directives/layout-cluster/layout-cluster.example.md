# Cluster Directive Examples

Use the `[waCluster]` directive to turn any container into a Web Awesome cluster. Combine it with `[waGap]` for spacing and `[waAlignItems]` for alignment.

## Basic cluster
```html
<div waCluster [waGap]="'s'">
  <wa-button size="s">One</wa-button>
  <wa-button size="s" variant="outlined">Two</wa-button>
  <wa-button size="s" variant="filled">Three</wa-button>
</div>
```

## Direction and wrap options
```html
<div waCluster [waClusterDirection]="'row'" [waClusterWrap]="true" [waGap]="'xs'">
  <div class="demo-box">A</div>
  <div class="demo-box">B</div>
  <div class="demo-box">C</div>
  <div class="demo-box">D</div>
</div>
```

## Justification
```html
<div waCluster [waClusterJustify]="'between'" [waGap]="'m'" [waAlignItems]="'center'">
  <span class="wa-heading-s">Title</span>
  <div class="wa-cluster" [waGap]="'xs'">
    <wa-button size="s">Cancel</wa-button>
    <wa-button size="s" variant="filled">Save</wa-button>
  </div>
</div>
```
