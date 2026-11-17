### Photo gallery

```html
<wa-lightbox label="Product gallery" with-thumbnails (waItemChange)="currentIndex = $event.detail.index">
  <wa-lightbox-item src="/images/front.jpg" alt="Front of the product">
    <img src="/images/front-thumb.jpg" alt="Front of the product">
  </wa-lightbox-item>
  <wa-lightbox-item src="/images/back.jpg" alt="Back of the product">
    <img src="/images/back-thumb.jpg" alt="Back of the product">
  </wa-lightbox-item>
</wa-lightbox>
```
