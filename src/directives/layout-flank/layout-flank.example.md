# Flank Directive Examples

Use the `[waFlank]` directive to turn any container into a Web Awesome flank. Combine it with `[waGap]` for spacing and `[waAlignItems]` for alignment.

## Basic flank
```html
<div waFlank>
  <div></div>
  <div></div>
</div>
```

## Inputs with adjacent button (end flank)
```html
<div waFlank [waFlankPosition]="'end'" [waGap]="'xs'">
  <wa-input>
    <wa-icon slot="start" name="magnifying-glass"></wa-icon>
  </wa-input>
  <wa-button>Search</wa-button>
</div>
```

## Comments list using flank with avatars
```html
<div class="wa-stack wa-gap-xl">
  <div waFlank [waAlignItems]="'start'">
    <wa-avatar image="https://images.unsplash.com/photo-1553284966-19b8815c7817?q=20" label="Gandalf's avatar"></wa-avatar>
    <div class="wa-stack wa-gap-3xs">
      <strong>Gandalf</strong>
      <p class="wa-body-s">All we have to decide is what to do with the time that is given to us. There are other forces at work in this world, Frodo, besides the will of evil.</p>
    </div>
  </div>
  <div waFlank [waAlignItems]="'start'">
    <wa-avatar image="https://images.unsplash.com/photo-1542403764-c26462c4697e?q=20" label="Boromir's avatar"></wa-avatar>
    <div class="wa-stack wa-gap-3xs">
      <strong>Boromir</strong>
      <p class="wa-body-s">One does not simply walk into Mordor. Its Black Gates are guarded by more than just Orcs. There is evil there that does not sleep, and the Great Eye is ever watchful.</p>
    </div>
  </div>
  <div waFlank [waAlignItems]="'start'">
    <wa-avatar image="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=20" label="Galadriel's avatar"></wa-avatar>
    <div class="wa-stack wa-gap-3xs">
      <strong>Galadriel</strong>
      <p class="wa-body-s">The world is changed. I feel it in the water. I feel it in the earth. I smell it in the air. Much that once was is lost, for none now live who remember it.</p>
    </div>
  </div>
</div>
```

## Position start vs end
```html
<div class="wa-stack">
  <div waFlank [waFlankPosition]="'start'">
    <div></div>
    <div></div>
  </div>
  <div waFlank [waFlankPosition]="'end'">
    <div></div>
    <div></div>
  </div>
</div>
```

## Content percentage
```html
<div class="wa-stack">
  <div waFlank [contentPercentage]="'70%'">
    <div></div>
    <div></div>
  </div>
  <div waFlank [contentPercentage]="'85%'">
    <div></div>
    <div></div>
  </div>
</div>
```

## Alignment options
```html
<div class="wa-stack">
  <div waFlank [waAlignItems]="'start'" style="min-height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div waFlank [waAlignItems]="'end'" style="min-height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div waFlank [waAlignItems]="'center'" style="min-height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div waFlank [waAlignItems]="'stretch'" style="min-height: 8rem;">
    <div></div>
    <div></div>
  </div>
</div>
```

## Gap options
```html
<div class="wa-stack">
  <div waFlank [waGap]="'2xs'">
    <div></div>
    <div></div>
  </div>
  <div waFlank [waGap]="'2xl'">
    <div></div>
    <div></div>
  </div>
</div>
```
