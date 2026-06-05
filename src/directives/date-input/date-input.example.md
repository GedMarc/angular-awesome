# Date Input Examples

## Basic Usage

```html
<wa-date-input label="Date" hint="Choose a date"></wa-date-input>
```

## With ngModel

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-date-input-demo',
  template: `
    <wa-date-input label="Departure" [(ngModel)]="departure"></wa-date-input>
    <p>Selected: {{ departure }}</p>
  `
})
export class DateInputDemoComponent {
  departure = '2026-05-25';
}
```

## Min and Max

```html
<wa-date-input label="Booking date" min="2026-01-01" max="2026-12-31"></wa-date-input>
```

## Range Mode

```html
<wa-date-input label="Stay" mode="range" value="2026-05-25/2026-05-30" [months]="2"></wa-date-input>
```

## Clearable

```html
<wa-date-input label="Date" withClear value="2026-05-25"></wa-date-input>
```

## Appearance and Size

```html
<wa-date-input label="Filled" appearance="filled"></wa-date-input>
<wa-date-input label="Pill" pill></wa-date-input>
<wa-date-input label="Large" size="large"></wa-date-input>
```

## Disabled Dates and Days

```html
<wa-date-input
  label="Appointment"
  disabledDaysOfWeek="sat sun"
  disablePast>
</wa-date-input>
```

## Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { WaDateInputDirective } from 'angular-awesome';

@Component({
  selector: 'app-date-input-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, WaDateInputDirective],
  template: `
    <wa-date-input label="Due date" [formControl]="due" required></wa-date-input>
    <p *ngIf="due.invalid && due.touched">A date is required.</p>
  `
})
export class DateInputReactiveComponent {
  due = new FormControl('', Validators.required);
}
```

