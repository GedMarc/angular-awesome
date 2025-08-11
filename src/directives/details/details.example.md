# Details Examples

## Basic Usage

```html
<wa-details summary="Toggle Me">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</wa-details>
```

## Disabled

```html
<wa-details summary="Disabled" [disabled]="true">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</wa-details>
```

## Customizing the Summary Icon

```html
<wa-details summary="Toggle Me" class="custom-icons">
  <wa-icon name="square-plus" slot="expand-icon" variant="regular"></wa-icon>
  <wa-icon name="square-minus" slot="collapse-icon" variant="regular"></wa-icon>

  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</wa-details>

<style>
  /* Disable the expand/collapse animation */
  wa-details.custom-icons::part(icon) {
    rotate: none;
  }
</style>
```

## Icon Position

```html
<div class="wa-stack">
  <wa-details summary="Start" iconPosition="start">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>
  <wa-details summary="End" iconPosition="end">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>
</div>
```

## HTML in Summary

```html
<wa-details>
  <span slot="summary">
    Some text
    <a href="https://webawesome.com" target="_blank">a link</a>
    more text
  </span>

  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</wa-details>
```

## Right-to-Left Languages

```html
<div class="wa-stack">
  <wa-details summary="تبديلني" lang="ar" dir="rtl">
    استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن
  </wa-details>
  <wa-details summary="تبديلني" lang="ar" dir="rtl" iconPosition="start">
    استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن
  </wa-details>
</div>
```

## Appearance

```html
<div class="wa-stack">
  <wa-details summary="Outlined (default)">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>
  <wa-details summary="Filled + Outlined" appearance="filled outlined">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>
  <wa-details summary="Filled" appearance="filled">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>
  <wa-details summary="Plain" appearance="plain">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>
</div>
```

## Grouping Details

```html
<div class="wa-stack">
  <wa-details name="group-1" summary="Section 1" [open]="true">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>

  <wa-details name="group-1" summary="Section 2">
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
    eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
  </wa-details>

  <wa-details name="group-1" summary="Section 3">
    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
    corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
  </wa-details>
</div>
```

## Using with Angular Bindings

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-details-demo',
  template: `
    <div class="controls">
      <wa-button (click)="toggleOpen()">Toggle Open</wa-button>
      <wa-button (click)="toggleDisabled()">Toggle Disabled</wa-button>
      <wa-select [(ngModel)]="iconPosition" label="Icon Position">
        <wa-option value="start">Start</wa-option>
        <wa-option value="end">End</wa-option>
      </wa-select>
      <wa-select [(ngModel)]="appearance" label="Appearance">
        <wa-option value="outlined">Outlined</wa-option>
        <wa-option value="filled">Filled</wa-option>
        <wa-option value="plain">Plain</wa-option>
      </wa-select>
    </div>
    
    <wa-details
      [summary]="summary"
      [open]="isOpen"
      [disabled]="isDisabled"
      [iconPosition]="iconPosition"
      [appearance]="appearance"
      (waShow)="onShow()"
      (waAfterShow)="onAfterShow()"
      (waHide)="onHide()"
      (waAfterHide)="onAfterHide()">
      
      <p>This is the content of the details component.</p>
      <p>You can include any HTML or Angular components here.</p>
      
    </wa-details>
  `,
  styles: [`
    .controls {
      margin-bottom: 20px;
      display: flex;
      gap: 16px;
    }
  `]
})
export class DetailsDemoComponent {
  summary = 'Click to Toggle';
  isOpen = false;
  isDisabled = false;
  iconPosition = 'end';
  appearance = 'outlined';
  
  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }
  
  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }
  
  onShow(): void {
    console.log('Details showing');
  }
  
  onAfterShow(): void {
    console.log('Details shown');
  }
  
  onHide(): void {
    console.log('Details hiding');
  }
  
  onAfterHide(): void {
    console.log('Details hidden');
  }
}
```

## Programmatic Control

```typescript
import { Component, ViewChild } from '@angular/core';
import { WaDetailsDirective } from 'angular-awesome';

@Component({
  selector: 'app-details-programmatic',
  template: `
    <div class="controls">
      <wa-button (click)="showDetails()">Show</wa-button>
      <wa-button (click)="hideDetails()">Hide</wa-button>
    </div>
    
    <wa-details #detailsElement summary="Programmatically Controlled">
      This details element is controlled programmatically using the show() and hide() methods.
    </wa-details>
  `
})
export class DetailsProgrammaticComponent {
  @ViewChild('detailsElement') details!: WaDetailsDirective;
  
  showDetails(): void {
    this.details.show();
  }
  
  hideDetails(): void {
    this.details.hide();
  }
}
```

## Custom Styling

```html
<wa-details 
  summary="Custom Styled Details"
  [spacing]="'1.5rem'"
  [showDuration]="'300ms'"
  [hideDuration]="'300ms'"
  [iconColor]="'#2196f3'">
  
  <p>This details element has custom styling applied through Angular inputs.</p>
  
</wa-details>

<style>
  wa-details::part(base) {
    border-color: #2196f3;
  }
  
  wa-details::part(header) {
    background-color: #e3f2fd;
  }
  
  wa-details::part(content) {
    padding: 1.5rem;
    background-color: #f5f5f5;
  }
</style>
```
