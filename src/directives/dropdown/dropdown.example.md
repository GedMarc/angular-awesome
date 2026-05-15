# Dropdown Examples

## Basic Usage

```html
<wa-dropdown>
  <wa-button slot="trigger">Dropdown</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>Item 2</wa-dropdown-item>
  <wa-dropdown-item>Item 3</wa-dropdown-item>
</wa-dropdown>
```

## With Different Placements

```html
<!-- Bottom placement (default) -->
<wa-dropdown placement="bottom">
  <wa-button slot="trigger">Bottom</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>Item 2</wa-dropdown-item>
</wa-dropdown>

<!-- Bottom-start placement -->
<wa-dropdown placement="bottom-start">
  <wa-button slot="trigger">Bottom Start</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>Item 2</wa-dropdown-item>
</wa-dropdown>

<!-- Bottom-end placement -->
<wa-dropdown placement="bottom-end">
  <wa-button slot="trigger">Bottom End</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>Item 2</wa-dropdown-item>
</wa-dropdown>

<!-- Top placement -->
<wa-dropdown placement="top">
  <wa-button slot="trigger">Top</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>Item 2</wa-dropdown-item>
</wa-dropdown>

<!-- Left placement -->
<wa-dropdown placement="left">
  <wa-button slot="trigger">Left</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>Item 2</wa-dropdown-item>
</wa-dropdown>

<!-- Right placement -->
<wa-dropdown placement="right">
  <wa-button slot="trigger">Right</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>Item 2</wa-dropdown-item>
</wa-dropdown>
```

## Disabled Dropdown

```html
<wa-dropdown disabled>
  <wa-button slot="trigger">Disabled Dropdown</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>Item 2</wa-dropdown-item>
</wa-dropdown>
```

## Stay Open On Select

```html
<wa-dropdown stayOpenOnSelect>
  <wa-button slot="trigger">Stay Open On Select</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>Item 2</wa-dropdown-item>
  <wa-dropdown-item>Item 3</wa-dropdown-item>
</wa-dropdown>
```

## With Distance and Skidding

```html
<wa-dropdown [distance]="10" [skidding]="5">
  <wa-button slot="trigger">Custom Offset</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>Item 2</wa-dropdown-item>
</wa-dropdown>
```

## Sync Width with Trigger

```html
<wa-dropdown sync="width">
  <wa-button slot="trigger">Sync Width</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>Item 2</wa-dropdown-item>
</wa-dropdown>
```

## Custom Styling

```html
<wa-dropdown [boxShadow]="'0 4px 8px rgba(0,0,0,0.2)'">
  <wa-button slot="trigger">Custom Styling</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>Item 2</wa-dropdown-item>
</wa-dropdown>
```

## With ngModel Binding

```html
<wa-dropdown [(ngModel)]="selectedItem">
  <wa-button slot="trigger">{{ selectedItem || 'Select an item' }}</wa-button>
  <wa-dropdown-item value="item1">Item 1</wa-dropdown-item>
  <wa-dropdown-item value="item2">Item 2</wa-dropdown-item>
  <wa-dropdown-item value="item3">Item 3</wa-dropdown-item>
</wa-dropdown>
```

```typescript
// In your component
export class DropdownExampleComponent {
  selectedItem: string;
}
```

## Event Handling

```html
<wa-dropdown
  (showEvent)="onShow()"
  (afterShowEvent)="onAfterShow()"
  (hideEvent)="onHide()"
  (afterHideEvent)="onAfterHide()"
  (selectEvent)="onSelect($event)">
  <wa-button slot="trigger">Event Handling</wa-button>
  <wa-dropdown-item value="item1">Item 1</wa-dropdown-item>
  <wa-dropdown-item value="item2">Item 2</wa-dropdown-item>
  <wa-dropdown-item value="item3">Item 3</wa-dropdown-item>
</wa-dropdown>
```

```typescript
// In your component
export class DropdownExampleComponent {
  onShow() {
    console.log('Dropdown is opening');
  }

  onAfterShow() {
    console.log('Dropdown has opened');
  }

  onHide() {
    console.log('Dropdown is closing');
  }

  onAfterHide() {
    console.log('Dropdown has closed');
  }

  onSelect(event: { item: HTMLElement }) {
    console.log('Selected item:', event.item.textContent);
    console.log('Selected value:', event.item.getAttribute('value'));
  }
}
```

## Programmatic Control

```html
<wa-dropdown #myDropdown>
  <wa-button slot="trigger">Programmatic Control</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>Item 2</wa-dropdown-item>
</wa-dropdown>

<wa-button (click)="openDropdown()">Open Dropdown</wa-button>
<wa-button (click)="closeDropdown()">Close Dropdown</wa-button>
<wa-button (click)="repositionDropdown()">Reposition Dropdown</wa-button>
```

```typescript
// In your component
export class DropdownExampleComponent {
  @ViewChild('myDropdown') dropdownRef: ElementRef;

  openDropdown() {
    this.dropdownRef.nativeElement.show();
  }

  closeDropdown() {
    this.dropdownRef.nativeElement.hide();
  }

  repositionDropdown() {
    this.dropdownRef.nativeElement.reposition();
  }
}
```

## With Divider

```html
<wa-dropdown>
  <wa-button slot="trigger">With Divider</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>Item 2</wa-dropdown-item>
  <wa-divider></wa-divider>
  <wa-dropdown-item>Item 3</wa-dropdown-item>
</wa-dropdown>
```

## With Icons

```html
<wa-dropdown>
  <wa-button slot="trigger">With Icons</wa-button>
  <wa-dropdown-item>
    <wa-icon name="cut" slot="start"></wa-icon>
    Cut
  </wa-dropdown-item>
  <wa-dropdown-item>
    <wa-icon name="copy" slot="start"></wa-icon>
    Copy
  </wa-dropdown-item>
  <wa-dropdown-item>
    <wa-icon name="paste" slot="start"></wa-icon>
    Paste
  </wa-dropdown-item>
</wa-dropdown>
```

## With Submenu

```html
<wa-dropdown>
  <wa-button slot="trigger">With Submenu</wa-button>
  <wa-dropdown-item>Item 1</wa-dropdown-item>
  <wa-dropdown-item>
    More Options
    <wa-dropdown slot="submenu">
      <wa-dropdown-item>Submenu Item 1</wa-dropdown-item>
      <wa-dropdown-item>Submenu Item 2</wa-dropdown-item>
    </wa-dropdown>
  </wa-dropdown-item>
  <wa-dropdown-item>Item 3</wa-dropdown-item>
</wa-dropdown>
```

## With Custom Containing Element

```html
<div #container class="dropdown-container">
  <wa-dropdown [containingElement]="container">
    <wa-button slot="trigger">Custom Containing Element</wa-button>
    <wa-dropdown-item>Item 1</wa-dropdown-item>
    <wa-dropdown-item>Item 2</wa-dropdown-item>
  </wa-dropdown>
</div>
```

```typescript
// In your component
export class DropdownExampleComponent {
  @ViewChild('container') containerRef: ElementRef;
}
```

## Dropdown in a Form

```html
<form>
  <div class="form-group">
    <label for="country">Select Country</label>
    <wa-dropdown [(ngModel)]="selectedCountry" name="country">
      <wa-button slot="trigger">{{ selectedCountry || 'Select a country' }}</wa-button>
      <wa-dropdown-item value="us">United States</wa-dropdown-item>
      <wa-dropdown-item value="ca">Canada</wa-dropdown-item>
      <wa-dropdown-item value="mx">Mexico</wa-dropdown-item>
      <wa-dropdown-item value="uk">United Kingdom</wa-dropdown-item>
    </wa-dropdown>
  </div>
  
  <div class="form-group">
    <label for="language">Select Language</label>
    <wa-dropdown [(ngModel)]="selectedLanguage" name="language">
      <wa-button slot="trigger">{{ selectedLanguage || 'Select a language' }}</wa-button>
      <wa-dropdown-item value="en">English</wa-dropdown-item>
      <wa-dropdown-item value="fr">French</wa-dropdown-item>
      <wa-dropdown-item value="es">Spanish</wa-dropdown-item>
      <wa-dropdown-item value="de">German</wa-dropdown-item>
    </wa-dropdown>
  </div>
  
  <wa-button type="submit">Submit</wa-button>
</form>
```

```typescript
// In your component
export class DropdownExampleComponent {
  selectedCountry: string;
  selectedLanguage: string;
}
```
