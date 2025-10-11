# Grid Directive Examples

Use `[waGrid]` to apply the Web Awesome grid primitive with typed options for sizing. Combine with `[waGap]` for spacing. Use `[waGridSpan]` on a child to span all columns.

## Basic Grid
```html
<div waGrid>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

## Flower cards
```html
<div waGrid>
  <div class="wa-stack wa-gap-s">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1520763185298-1b434c919102?q=20" alt="" />
    </div>
    <h3 class="wa-heading-s">Tulip</h3>
    <em>Tulipa gesneriana</em>
  </div>
  <div class="wa-stack wa-gap-s">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1591767134492-338e62f7b5a2?q=20" alt="" />
    </div>
    <h3 class="wa-heading-s">Peony</h3>
    <em>Paeonia officinalis</em>
  </div>
  <div class="wa-stack wa-gap-s">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1590872000386-4348c6393115?q=20" alt="" />
    </div>
    <h3 class="wa-heading-s">Poppy</h3>
    <em>Papaver rhoeas</em>
  </div>
  <div class="wa-stack wa-gap-s">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1516723338795-324c7c33f700?q=20" alt="" />
    </div>
    <h3 class="wa-heading-s">Sunflower</h3>
    <em>Helianthus annuus</em>
  </div>
  <div class="wa-stack wa-gap-s">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1563601841845-74a0a8ab7c8a?q=20" alt="" />
    </div>
    <h3 class="wa-heading-s">Daisy</h3>
    <em>Bellis perennis</em>
  </div>
</div>
```

## Metrics cards (custom min column size)
```html
<div waGrid [minColumnSize]="'30ch'">
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="globe"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-caption-s">Population (Zion)</span>
        <span class="wa-cluster wa-gap-xs">
          <span class="wa-heading-xl">251,999</span>
          <wa-badge variant="danger">-3%&nbsp;<wa-icon name="arrow-trend-down"></wa-icon></wa-badge>
        </span>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="brain-circuit"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-caption-s">Minds Freed</span>
        <span class="wa-cluster wa-gap-xs">
          <span class="wa-heading-xl">0.36%</span>
          <wa-badge variant="success">+0.03%&nbsp;<wa-icon name="arrow-trend-up"></wa-icon></wa-badge>
        </span>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="robot"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-caption-s">Agents Discovered</span>
        <span class="wa-cluster wa-gap-xs">
          <span class="wa-heading-xl">3</span>
          <wa-badge variant="neutral">±0%&nbsp;<wa-icon name="wave-triangle"></wa-icon></wa-badge>
        </span>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="spaghetti-monster-flying"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-caption-s">Sentinels Controlled</span>
        <span class="wa-cluster wa-gap-xs">
          <span class="wa-heading-xl">208</span>
          <wa-badge variant="success">+1%&nbsp;<wa-icon name="arrow-trend-up"></wa-icon></wa-badge>
        </span>
      </div>
    </div>
  </wa-card>
</div>

<style>
  wa-badge > wa-icon { color: color-mix(in oklab, currentColor, transparent 40%); }
</style>
```

## Sizing
```html
<div class="wa-stack">
  <div waGrid [minColumnSize]="'200px'">
    <div></div><div></div><div></div><div></div><div></div><div></div>
  </div>
  <div waGrid [minColumnSize]="'6rem'">
    <div></div><div></div><div></div><div></div><div></div><div></div>
  </div>
</div>
```

## Gap
```html
<div class="wa-stack">
  <div waGrid [waGap]="'2xs'">
    <div></div><div></div><div></div><div></div><div></div><div></div>
  </div>
  <div waGrid [waGap]="'2xl'">
    <div></div><div></div><div></div><div></div><div></div><div></div>
  </div>
</div>
```

## Span Grid
```html
<div waGrid>
  <div></div>
  <div></div>
  <div waGridSpan></div>
  <div></div>
  <div></div>
</div>
```
