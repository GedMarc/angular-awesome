---
name: angular-awesome-forms
description: "Integrate Angular Awesome form controls (wa-input, wa-select, wa-checkbox, wa-switch, wa-slider, wa-textarea, wa-combobox, wa-color-picker, wa-number-input, wa-radio, wa-file-input) with Angular Reactive Forms and Template-Driven Forms. Use when binding [(ngModel)], using FormControl/FormGroup, implementing custom validation, handling wa-input/wa-change events, or building form layouts with Web Awesome components."
metadata:
  short-description: Use Angular Awesome form controls with Angular Forms
---

# Angular Awesome — Forms

Integrate Web Awesome form controls with Angular's template-driven and reactive forms.

## Supported Form Controls

All implement `ControlValueAccessor` and work with `[(ngModel)]`, `[formControl]`, and `[formControlName]`:

| Control | Selector | Value Type |
|---------|----------|-----------|
| Input | `wa-input` | `string` |
| Number Input | `wa-number-input` | `number` |
| Textarea | `wa-textarea` | `string` |
| Select | `wa-select` | `string \| string[]` |
| Combobox | `wa-combobox` | `string \| string[]` |
| Checkbox | `wa-checkbox` | `boolean` |
| Switch | `wa-switch` | `boolean` |
| Radio | `wa-radio` | `string` |
| Slider | `wa-slider` | `number` |
| Color Picker | `wa-color-picker` | `string` |
| File Input | `wa-file-input` | `FileList` |

## Template-Driven Forms

```html
<form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
  <wa-input label="Name" [(ngModel)]="name" name="name" required></wa-input>
  <wa-select label="Role" [(ngModel)]="role" name="role">
    <wa-option value="admin">Admin</wa-option>
    <wa-option value="user">User</wa-option>
  </wa-select>
  <wa-checkbox [(ngModel)]="agree" name="agree">I agree</wa-checkbox>
  <wa-button type="submit" [disabled]="!f.valid">Submit</wa-button>
</form>
```

## Reactive Forms

```ts
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, WaInputDirective, WaSelectDirective, WaCheckboxDirective, WaButtonDirective, WaOptionDirective],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <wa-input label="Email" formControlName="email"></wa-input>
      <wa-number-input label="Age" formControlName="age" [min]="0" [max]="120"></wa-number-input>
      <wa-select label="Country" formControlName="country">
        <wa-option value="us">United States</wa-option>
        <wa-option value="uk">United Kingdom</wa-option>
      </wa-select>
      <wa-switch formControlName="newsletter">Subscribe</wa-switch>
      <wa-button type="submit" [disabled]="form.invalid">Save</wa-button>
    </form>
  `
})
export class ProfileForm {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(null, [Validators.min(0), Validators.max(120)]),
    country: new FormControl(''),
    newsletter: new FormControl(false)
  });
  submit() { console.log(this.form.value); }
}
```

## Events

Form controls emit two key events:
- `(wa-input)` — fires on every keystroke/interaction (use for live feedback)
- `(wa-change)` — fires on commit (blur, Enter, selection)

```html
<wa-input (wa-input)="onInput($event)" (wa-change)="onChange($event)"></wa-input>
```

## Validation

Angular validation works out of the box. Add CSS classes or attribute selectors:

```css
wa-input.ng-invalid.ng-touched { --wa-input-border-color: var(--wa-color-danger-600); }
```

Use `wa-callout` variant="danger" for error messages:
```html
<wa-callout variant="danger" *ngIf="form.get('email')?.errors?.['required'] && form.get('email')?.touched">
  Email is required.
</wa-callout>
```

## Disabled State

```html
<wa-input [disabled]="isDisabled" formControlName="name"></wa-input>
```

Or programmatically:
```ts
this.form.get('name')?.disable();
```

## Multi-Select

```html
<wa-select multiple formControlName="tags">
  <wa-option value="angular">Angular</wa-option>
  <wa-option value="web">Web</wa-option>
</wa-select>
```

Value is `string[]` when `multiple` is set.

## Key Rules

- Import `FormsModule` for `[(ngModel)]` or `ReactiveFormsModule` for `[formControl]`.
- Always import the specific directive (e.g., `WaInputDirective`) — standalone, no module wrapping.
- `wa-option` must be used inside `wa-select` or `wa-combobox` for selectable items.
- Use `(wa-change)` for form submission triggers, `(wa-input)` for live filtering/search.

