## Dropdown Rules

📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

### Selector

`wa-dropdown`

### Description

Wraps a `<wa-dropdown>` element that exposes additional content in a popover panel, often triggered by a button. Dropdown content usually includes `<wa-dropdown-item>` elements. The Angular directive facilitates interaction, layout management, two-way binding via `ngModel`, and input/output bindings.

### Inputs

#### Structural Inputs

* `placement: DropdownPlacement` – Preferred placement of the dropdown. Options: `'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end'`.
* `open: boolean | string` – Whether the dropdown panel is open. Can be toggled programmatically.
* `size: 'small' | 'medium' | 'large'` – The dropdown's size.
* `disabled: boolean | string` – Disables the dropdown trigger.
* `stayOpenOnSelect: boolean | string` – Prevents dropdown from closing on item selection.
* `containingElement: HTMLElement` – Custom element that controls close-on-outside-click behavior.
* `distance: number | string` – Pixel distance offset between trigger and panel.
* `skidding: number | string` – Pixel offset along the trigger.
* `sync: 'width' | 'height' | 'both' | undefined` – Syncs dropdown panel dimensions with the trigger.

#### Angular-Style Styling Inputs (CSS custom properties)

The following style inputs apply to the host element:

* `boxShadow: string` → maps to `--box-shadow`

> ℹ️ Styling inputs should reflect the CSS custom properties documented in the base Web Awesome component.

### Two-Way Binding

This component supports template-driven forms using `[(ngModel)]` on the selected value from the dropdown.

* The dropdown item's `value` attribute is used to bind the model.
* Selection updates the `ngModel` value.
* Only standard `<wa-dropdown-item>`s with values are eligible for this.

### Outputs

#### Event Emitters

* `showEvent: Event` → `(wa-show)` – Fires when the dropdown opens.
* `afterShowEvent: Event` → `(wa-after-show)` – Fires after dropdown animations finish.
* `hideEvent: Event` → `(wa-hide)` – Fires when the dropdown begins closing.
* `afterHideEvent: Event` → `(wa-after-hide)` – Fires after dropdown is fully closed.
* `selectEvent: CustomEvent` → `(wa-select)` – Fires when a dropdown item is selected. Emits `{ item: HTMLElement }` in `event.detail`.

### Methods

* `show(): void` – Programmatically open the dropdown.
* `hide(): void` – Programmatically close the dropdown.
* `reposition(): void` – Force realignment of the dropdown, typically used if the trigger's layout changes.

---

## Dropdown Item (`wa-dropdown-item`)

Selector: `wa-dropdown-item`

### Inputs

* `type: 'normal' | 'checkbox'` – Set to `checkbox` to make the item a checkbox. Default `'normal'`.
* `checked: boolean | string` – Checks the item. Only valid when `type` is `checkbox`.
* `value: string` – Optional value used to identify the item in the dropdown's `wa-select` event.
* `loading: boolean | string` – Shows a loading indicator on the item.
* `disabled: boolean | string` – Disables the item.
* `label: string` – Optional label attribute.
* `variant: 'default' | 'danger'` – The type of menu item to render. Default `'default'`.
* `submenuOpen: boolean | string` – Whether the item's submenu is currently open (maps to `submenu-open`).

#### Link Inputs (Web Awesome 3.12+)

A dropdown item can act as a link. When `href` is set the item renders as an anchor internally while
remaining a menu item for assistive devices.

* `href: string` – When set, selecting the item navigates to this URL. **Ignored when the item has a submenu.**
* `target: '_blank' | '_parent' | '_self' | '_top'` – Where to open the link. Only used when `href` is present.
* `rel: string` – Maps to the underlying link's `rel` attribute. Only used when `href` is present.
* `download: string` – Tells the browser to download the linked file under this filename. Only used when `href` is present.

> ℹ️ The directive only writes `target`, `rel`, and `download` to the DOM while `href` is set. Clearing
> `href` removes all four attributes, so no orphaned link attributes are left on the element.

> ♿ Because the item stays a menu item for assistive technology, make sure the visible label describes
> where the link goes (e.g. "Open documentation" rather than "Click here").

### Style Inputs

* `backgroundColorHover: string` → `--background-color-hover`
* `textColorHover: string` → `--text-color-hover`
* `padding: string` → `--padding`
* `margin: string` → `--margin`
* `fontSize: string` → `--font-size`

### Outputs

* `blurEvent: FocusEvent` – Fires when the item loses focus.
* `focusEvent: FocusEvent` – Fires when the item gains focus.

### CSS Parts

`checkmark`, `icon`, `label`, `details`, `submenu-icon`, `submenu`.

### CSS States (Web Awesome 3.12+)

Target these with the `:state()` selector:

| State          | Applied when                                  |
|----------------|-----------------------------------------------|
| `active`       | The item is the active item in the menu.      |
| `checked`      | The item is checked.                          |
| `disabled`     | The item is disabled.                         |
| `has-submenu`  | The item has a submenu.                       |
| `link`         | The item is a link (i.e. `href` is set).      |
| `submenu-open` | The item's submenu is open.                   |

```css
wa-dropdown-item:state(link) {
  font-style: italic;
}
```

---

### Features & Behavior

* Slots: `trigger`, default (panel contents).
* Submenus are supported via `<wa-dropdown slot="submenu">`.
* You can listen for `(click)` on individual `<wa-dropdown-item>`, but it will fire even for `disabled` items.
* You may use `[value]` attributes on dropdown items to simplify logic.

### Accessibility

* The trigger button must provide an accessible label.
* `<wa-dropdown>` manages focus and dismissal automatically. Submenus require careful keyboard handling if customized.

### Dependencies

* Automatically imports:

  * `<wa-popup>`
  * `<wa-dropdown-item>`
  * `<wa-divider>`
  * `<wa-icon>` (if used for slot content)

Also depends on the rules of:

* [Button](../button/button.rules.md) (for trigger)

### Usage Example

```html
<wa-dropdown
  [(ngModel)]="selectedAction"
  [placement]="'bottom-start'"
  [stayOpenOnSelect]="true"
  (selectEvent)="onSelect($event)"
  style="--box-shadow: 0 2px 6px rgba(0,0,0,0.1);"
>
  <wa-button slot="trigger" caret>Dropdown</wa-button>
  <wa-dropdown-item value="cut">Cut</wa-dropdown-item>
  <wa-dropdown-item value="copy">Copy</wa-dropdown-item>
  <wa-dropdown-item value="paste">Paste</wa-dropdown-item>
</wa-dropdown>
```

### Notes for Code Generation

* Inputs of type `boolean` and `number` should support both native and string binding.
* Outputs must be aliased to avoid conflicts with method names: e.g., `focus` → `focusEvent`, `blur` → `blurEvent`.
* Always expose the `wa-select` event as `selectEvent`, not as a standard Angular `valueChange`.
* This component **must** support `[(ngModel)]` for the selected dropdown item value.
* Never use reactive forms APIs.

### Testing

Use test ID selectors on the `wa-dropdown` host to simulate user interaction. For example:

```ts
fixture.debugElement.query(By.css('[data-testid="my-dropdown"]')).triggerEventHandler('wa-show', {});
```
