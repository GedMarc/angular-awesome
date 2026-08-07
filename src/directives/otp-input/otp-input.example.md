# WaOtpInputDirective Usage Examples

## Basic Usage

A six-digit numeric one-time passcode.

```html
<wa-otp-input label="Verification code"></wa-otp-input>
```

## Two-Way Binding with ngModel

```html
<wa-otp-input [(ngModel)]="code" [length]="6" required></wa-otp-input>
<p>Entered: {{ code }}</p>
```

```ts
code = '';
```

## Reactive Forms

```html
<form [formGroup]="form">
  <wa-otp-input formControlName="otp" [length]="6" required></wa-otp-input>
  <p *ngIf="form.controls.otp.hasError('incomplete')">Enter all 6 digits.</p>
</form>
```

```ts
form = this.fb.group({
  otp: ['', [Validators.required]]
});
```

## Formatted Segments

Use `format` with `#` placeholders and literal separators. The segment count is derived from the number of `#` characters.

```html
<wa-otp-input format="###-###" label="Invite code"></wa-otp-input>
```

## Alphanumeric and Case Handling

```html
<wa-otp-input type="alphanumeric" case="upper" [length]="8"></wa-otp-input>
```

## Masked Entry

```html
<wa-otp-input mask withMask maskChar="•" [length]="4" label="PIN"></wa-otp-input>
```

## Auto-Submit and Completion

```html
<wa-otp-input autosubmit (waComplete)="onComplete($event)"></wa-otp-input>
```

```ts
onComplete(event: CustomEvent) {
  // Cancel to prevent automatic form submission for this completion
  // event.preventDefault();
  console.log('Code complete:', (event.target as any).value);
}
```

## Styling the Segments

```html
<wa-otp-input
  appearance="filled"
  segmentSize="3em"
  segmentGap="0.5em"
  segmentBorderRadius="0.5em"
  [length]="6"
></wa-otp-input>
```

