# Known Date Examples

## Basic Usage

```html
<wa-known-date label="Date of birth"></wa-known-date>
```

## With ngModel

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-known-date-demo',
  template: `
    <wa-known-date label="Birthday" [(ngModel)]="birthday"></wa-known-date>
    <p>Selected: {{ birthday }}</p>
  `
})
export class KnownDateDemoComponent {
  birthday = '1990-04-12';
}
```

## Birthday Autocomplete

```html
<wa-known-date label="Date of birth" autocomplete="bday"></wa-known-date>
```

## Min and Max

```html
<wa-known-date label="Document date" min="2000-01-01" max="2030-12-31"></wa-known-date>
```

## Locale Override

```html
<wa-known-date label="Fecha" locale="es-ES"></wa-known-date>
```

## Appearance and Size

```html
<wa-known-date label="Filled" appearance="filled"></wa-known-date>
<wa-known-date label="Pill" pill></wa-known-date>
<wa-known-date label="Large" size="large"></wa-known-date>
```

## Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { WaKnownDateDirective } from 'angular-awesome';

@Component({
  selector: 'app-known-date-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, WaKnownDateDirective],
  template: `
    <wa-known-date label="Expiry" [formControl]="expiry" required></wa-known-date>
    <p *ngIf="expiry.invalid && expiry.touched">A date is required.</p>
  `
})
export class KnownDateReactiveComponent {
  expiry = new FormControl('', Validators.required);
}
```

