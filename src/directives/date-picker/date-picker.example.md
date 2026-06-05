# Date Picker Examples

## Basic Usage

```html
<wa-date-picker></wa-date-picker>
```

## With ngModel

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-date-picker-demo',
  template: `
    <wa-date-picker [(ngModel)]="selected"></wa-date-picker>
    <p>Selected: {{ selected }}</p>
  `
})
export class DatePickerDemoComponent {
  selected = '2026-05-25';
}
```

## Range Mode

```html
<wa-date-picker mode="range" [months]="2" value="2026-05-25/2026-05-30"></wa-date-picker>
```

## Min and Max

```html
<wa-date-picker min="2026-01-01" max="2026-12-31"></wa-date-picker>
```

## Week Numbers and Outside Days

```html
<wa-date-picker withWeekNumbers withOutsideDays></wa-date-picker>
```

## Disabled Days

```html
<wa-date-picker disabledDaysOfWeek="sat sun" disablePast></wa-date-picker>
```

## Programmatic Control

```typescript
import { Component, ViewChild } from '@angular/core';
import { WaDatePickerDirective } from 'angular-awesome';

@Component({
  selector: 'app-date-picker-programmatic',
  template: `
    <div class="controls">
      <wa-button (click)="today()">Go to Today</wa-button>
      <wa-button (click)="clear()">Clear</wa-button>
    </div>
    <wa-date-picker #picker></wa-date-picker>
  `
})
export class DatePickerProgrammaticComponent {
  @ViewChild('picker') picker!: WaDatePickerDirective;

  today(): void {
    this.picker.goToToday();
  }

  clear(): void {
    this.picker.clear();
  }
}
```

