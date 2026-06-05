# Accordion Examples

## Basic Usage

```html
<wa-accordion>
  <wa-accordion-item label="First">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </wa-accordion-item>
  <wa-accordion-item label="Second">
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
  </wa-accordion-item>
  <wa-accordion-item label="Third">
    Duis aute irure dolor in reprehenderit in voluptate velit esse.
  </wa-accordion-item>
</wa-accordion>
```

## Single Mode

Only one item can be open at a time.

```html
<wa-accordion mode="single">
  <wa-accordion-item label="Account" [expanded]="true">Account settings</wa-accordion-item>
  <wa-accordion-item label="Privacy">Privacy settings</wa-accordion-item>
  <wa-accordion-item label="Notifications">Notification settings</wa-accordion-item>
</wa-accordion>
```

## Single Collapsible Mode

Like `single`, but the open item can also be collapsed (zero open is valid).

```html
<wa-accordion mode="single-collapsible">
  <wa-accordion-item label="Step 1">First step</wa-accordion-item>
  <wa-accordion-item label="Step 2">Second step</wa-accordion-item>
</wa-accordion>
```

## Appearance

```html
<wa-accordion appearance="filled">
  <wa-accordion-item label="Filled item">Content</wa-accordion-item>
</wa-accordion>

<wa-accordion appearance="plain">
  <wa-accordion-item label="Plain item">Content</wa-accordion-item>
</wa-accordion>
```

## Icon Placement

```html
<wa-accordion iconPlacement="start">
  <wa-accordion-item label="Icon at start">Content</wa-accordion-item>
</wa-accordion>
```

## Custom Icons

```html
<wa-accordion>
  <wa-accordion-item label="With custom icon">
    <wa-icon slot="icon" name="chevron-right"></wa-icon>
    Content goes here
  </wa-accordion-item>
</wa-accordion>
```

## Programmatic Control

```typescript
import { Component, ViewChild } from '@angular/core';
import { WaAccordionDirective } from 'angular-awesome';

@Component({
  selector: 'app-accordion-demo',
  template: `
    <div class="controls">
      <wa-button (click)="expandAll()">Expand All</wa-button>
      <wa-button (click)="collapseAll()">Collapse All</wa-button>
    </div>
    <wa-accordion #accordion>
      <wa-accordion-item label="Item 1">Content 1</wa-accordion-item>
      <wa-accordion-item label="Item 2">Content 2</wa-accordion-item>
    </wa-accordion>
  `
})
export class AccordionDemoComponent {
  @ViewChild('accordion') accordion!: WaAccordionDirective;

  expandAll(): void {
    this.accordion.expandAll();
  }

  collapseAll(): void {
    this.accordion.collapseAll();
  }
}
```

