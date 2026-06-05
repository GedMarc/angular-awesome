# Time Input Examples

## Basic Usage

```html
<wa-time-input label="Time" hint="Choose a time"></wa-time-input>
```

## With ngModel

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-time-input-demo',
  template: `
    <wa-time-input label="Alarm" [(ngModel)]="alarm"></wa-time-input>
    <p>Selected: {{ alarm }}</p>
  `
})
export class TimeInputDemoComponent {
  alarm = '14:30';
}
```

## 24-Hour Format

```html
<wa-time-input label="Departure" hourFormat="24" value="18:45"></wa-time-input>
```

## With Seconds

```html
<wa-time-input label="Lap time" [step]="1" value="00:01:30"></wa-time-input>
```

## Min and Max

```html
<wa-time-input label="Office hours" min="08:00" max="18:00"></wa-time-input>
```

## With Now Button and Clear

```html
<wa-time-input label="Time" withNow withClear value="09:15"></wa-time-input>
```

## Appearance and Size

```html
<wa-time-input label="Filled" appearance="filled"></wa-time-input>
<wa-time-input label="Pill" pill></wa-time-input>
<wa-time-input label="Large" size="large"></wa-time-input>
```

## Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { WaTimeInputDirective } from 'angular-awesome';

@Component({
  selector: 'app-time-input-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, WaTimeInputDirective],
  template: `
    <wa-time-input label="Start time" [formControl]="start" required></wa-time-input>
    <p *ngIf="start.invalid && start.touched">A time is required.</p>
  `
})
export class TimeInputReactiveComponent {
  start = new FormControl('', Validators.required);
}
```

