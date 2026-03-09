### 🎨 `wa-animated-image.rules.md`

**Angular 20 Directive Rules for `<wa-animated-image>` Web Component**

---

> ℹ️ This is a standalone component rule file for `wa-animated-image`.
> It references the shared [Web Awesome Base Rules](../webawesome.base.rules.md) and assumes global assets are preconfigured.

---

## 🎯 Purpose

Provide Angular directive support for the `wa-animated-image` Web Component with:

* Native `wa-animated-image` selector
* Bindings for `src`, `alt`, and `play`
* Projection of play/pause icons using slots
* Style customization via CSS variables and parts
* Support for responsive sizing via native styles or `--icon-size` / `--control-box-size`
* Custom control box positioning via `::part`

---

## ✅ Supported `@Input()` Bindings

| Input            | Type      | HTML Attribute | Notes                                        |
| ---------------- | --------- | -------------- | -------------------------------------------- |
| `src`            | `string`  | `src`          | Required, points to GIF or WEBP              |
| `alt`            | `string`  | `alt`          | Required for accessibility                   |
| `play`           | `boolean` | `play`         | When true, animation plays; otherwise paused |
| `iconSize`       | `string`  | *CSS variable* | Used to set `--icon-size`                    |
| `controlBoxSize` | `string`  | *CSS variable* | Used to set `--control-box-size`             |

---

## 💪 Styling Support

Support the following custom properties:

```html
<wa-animated-image
  [style.--control-box-size]="'2rem'"
  [style.--icon-size]="'1.5rem'"
  style="width: 160px; height: 160px"
></wa-animated-image>
```

You may also apply `::part(control-box)` styles globally or via class selectors.

---

## 📂 Slots

| Slot Name    | Description                                |
| ------------ | ------------------------------------------ |
| `play-icon`  | Optional replacement icon for play action  |
| `pause-icon` | Optional replacement icon for pause action |

Example:

```html
<wa-animated-image src="img.gif" alt="Demo">
  <wa-icon slot="play-icon" name="play"></wa-icon>
  <wa-icon slot="pause-icon" name="pause"></wa-icon>
</wa-animated-image>
```

---

## 🔧 Directive Implementation

Use `Renderer2` and `ElementRef` to imperatively apply attributes and styles:

```ts
this.setAttr('src', this.src);
this.setAttr('alt', this.alt);
if (this.play) this.renderer.setAttribute(nativeEl, 'play', '');
this.setStyle('--icon-size', this.iconSize);
this.setStyle('--control-box-size', this.controlBoxSize);
```

> This directive is `standalone: true` and must be declared with `CUSTOM_ELEMENTS_SCHEMA`.

---

## 🔄 Events

| Event Name | Description                           |
| ---------- | ------------------------------------- |
| `wa-load`  | Emitted when image loads successfully |
| `wa-error` | Emitted if loading fails              |

---

## 🔗 Dependencies

Requires `<wa-icon>` component for slot support.

---

## 🔍 Examples

```html
<wa-animated-image
  src="/assets/walk.gif"
  alt="Shoes walking animation"
  [play]="true"
  [style.--icon-size]="'1.25rem'"
></wa-animated-image>

<wa-animated-image src="tie.webp" alt="Shoe being tied">
  <wa-icon slot="play-icon" name="play"></wa-icon>
  <wa-icon slot="pause-icon" name="pause"></wa-icon>
</wa-animated-image>
```

---

## ✅ Status

**Stable** for Angular 20+ integration with declarative usage and shadow DOM compatibility.

---

📌 Place alongside the `wa-animated-image.directive.ts` file as a complete usage README.
