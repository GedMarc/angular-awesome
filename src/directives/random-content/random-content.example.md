# WaRandomContentDirective Usage Examples

## Basic Usage

Shows one randomly selected child at a time and hides the rest.

```html
<wa-random-content>
  <p>“Design is not just what it looks like and feels like. Design is how it works.”</p>
  <p>“Simplicity is the ultimate sophistication.”</p>
  <p>“Good design is obvious. Great design is transparent.”</p>
</wa-random-content>
```

## Showing Multiple Items

Use `items` to display more than one child simultaneously.

```html
<wa-random-content [items]="2">
  <wa-card>Featured A</wa-card>
  <wa-card>Featured B</wa-card>
  <wa-card>Featured C</wa-card>
  <wa-card>Featured D</wa-card>
</wa-random-content>
```

## Selection Modes

`unique` (default) avoids repeats until the pool is exhausted, `random` allows repeats, and `sequence` cycles in order.

```html
<wa-random-content mode="sequence">
  <img src="/assets/slide-1.jpg" alt="Slide 1" />
  <img src="/assets/slide-2.jpg" alt="Slide 2" />
  <img src="/assets/slide-3.jpg" alt="Slide 3" />
</wa-random-content>
```

## Autoplay with an Entrance Animation

```html
<wa-random-content autoplay [autoplayInterval]="5000" animation="fade-up">
  <blockquote>Tip #1</blockquote>
  <blockquote>Tip #2</blockquote>
  <blockquote>Tip #3</blockquote>
</wa-random-content>
```

## Reacting to Changes and Randomizing Programmatically

```html
<wa-random-content #banner (waContentChange)="onBannerChange($event)">
  <div>Promo A</div>
  <div>Promo B</div>
  <div>Promo C</div>
</wa-random-content>

<wa-button (click)="banner.randomize()">Shuffle</wa-button>
```

```ts
onBannerChange(event: CustomEvent) {
  console.log('Now showing', event.target);
}
```

## Styling the Entrance Animation

```html
<wa-random-content
  animation="fade-left"
  animationDuration="400ms"
  animationEasing="ease-in-out"
  animationTranslate="1em"
>
  <span>Alpha</span>
  <span>Bravo</span>
  <span>Charlie</span>
</wa-random-content>
```

