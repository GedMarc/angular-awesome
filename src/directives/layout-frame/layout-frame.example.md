# Frame Directive Examples

Frames are well-suited for images and image placeholders. Use `[waFrame]` to get typed hints and convenient options.

## Basic frame
```html
<div waFrame style="max-inline-size: 20rem;">
  <div></div>
</div>
```

## Media card using flank + frame
```html
<div class="wa-flank" style="--flank-size: 8rem;">
  <div class="wa-frame wa-border-radius-m">
    <img src="https://images.unsplash.com/photo-1523593288094-3ccfb6b2c192?q=20" alt="" />
  </div>
  <div class="wa-flank:end" style="--content-percentage: 70%">
    <div class="wa-stack wa-gap-xs">
      <h3>The Lord of the Rings: The Fellowship of the Ring</h3>
      <span>J.R.R. Tolkien</span>
    </div>
    <wa-button id="options-menu" appearance="plain">
      <wa-icon name="ellipsis" label="Options"></wa-icon>
    </wa-button>
    <wa-tooltip for="options-menu">Options</wa-tooltip>
  </div>
</div>
```

## Grid of pet cards (landscape frames)
```html
<div class="wa-grid" style="--min-column-size: 25ch;">
  <wa-card>
    <div class="wa-frame:landscape" slot="media">
      <img src="https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?q=20" alt="Grey and white tabby kitten" />
    </div>
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-s">White-socks</h3>
      <span class="wa-body-s">Kitten &bull; Male</span>
      <div class="wa-flank:end wa-gap-xs">
        <wa-button size="small" appearance="filled" variant="brand">Adopt this pet</wa-button>
        <wa-button id="fav-whitesocks" appearance="plain" size="small">
          <wa-icon name="heart" variant="regular" label="Favorite"></wa-icon>
        </wa-button>
        <wa-tooltip for="fav-whitesocks">Favorite</wa-tooltip>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-frame:landscape" slot="header">
      <div class="wa-stack wa-align-items-center wa-gap-xs wa-caption-m">
        <wa-icon name="paw"></wa-icon>
        <span>Photo coming soon</span>
      </div>
    </div>
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-s">Bumpkin</h3>
      <span class="wa-body-s">Adult &bull; Male</span>
      <div class="wa-flank:end wa-gap-xs">
        <wa-button size="small" appearance="filled" variant="brand">Adopt this pet</wa-button>
        <wa-button id="fav-bumpkin" appearance="plain" size="small">
          <wa-icon name="heart" variant="regular" label="Favorite"></wa-icon>
        </wa-button>
        <wa-tooltip for="fav-bumpkin">Favorite</wa-tooltip>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-frame:landscape" slot="media">
      <img src="https://images.unsplash.com/photo-1445499348736-29b6cdfc03b9?q=20" alt="Diluted calico kitten" />
    </div>
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-s">Swish-tail</h3>
      <span class="wa-body-s">Kitten &bull; Female</span>
      <div class="wa-flank:end wa-gap-xs">
        <wa-button size="small" appearance="filled" variant="brand">Adopt this pet</wa-button>
        <wa-button id="fav-swishtail" appearance="plain" size="small">
          <wa-icon name="heart" variant="regular" label="Favorite"></wa-icon>
        </wa-button>
        <wa-tooltip for="fav-swishtail">Favorite</wa-tooltip>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-frame:landscape" slot="media">
      <img src="https://images.unsplash.com/photo-1517451330947-7809dead78d5?q=20" alt="Short-haired tabby cat" />
    </div>
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-s">Sharp-ears</h3>
      <span class="wa-body-s">Adult &bull; Female</span>
      <div class="wa-flank:end wa-gap-xs">
        <wa-button size="small" appearance="filled" variant="brand">Adopt this pet</wa-button>
        <wa-button id="fav-sharpears" appearance="plain" size="small">
          <wa-icon name="heart" variant="regular" label="Favorite"></wa-icon>
        </wa-button>
        <wa-tooltip for="fav-sharpears">Favorite</wa-tooltip>
      </div>
    </div>
  </wa-card>
</div>
```

## Aspect Ratio
```html
<div class="wa-grid">
  <div class="wa-frame:landscape">
    <div></div>
  </div>
  <div class="wa-frame:portrait">
    <div></div>
  </div>
  <div class="wa-frame" style="aspect-ratio: 4 / 3;">
    <div></div>
  </div>
</div>
```

## Border Radius
```html
<div class="wa-grid">
  <div class="wa-frame wa-border-radius-l">
    <div></div>
  </div>
  <div class="wa-frame wa-border-radius-circle">
    <div></div>
  </div>
  <div class="wa-frame" style="border-radius: 50% 0%;">
    <div></div>
  </div>
</div>
```
