# WaTagInputDirective Usage Examples

## Basic Usage

```html
<wa-tag-input label="Topics" placeholder="Add a topic"></wa-tag-input>
```

## Two-Way Binding

```html
<wa-tag-input
  [(ngModel)]="topics"
  label="Topics"
  hint="Press Enter or comma to add a topic"
  withClear
></wa-tag-input>

<p>Selected: {{ topics.join(', ') }}</p>
```

```ts
topics = ['angular', 'web-components'];
```

## Reactive Forms and Limits

```html
<form [formGroup]="articleForm">
  <wa-tag-input
    formControlName="tags"
    label="Article tags"
    [required]="true"
    [minTags]="2"
    [maxTags]="5"
  ></wa-tag-input>

  @if (articleForm.controls.tags.hasError('minTags')) {
    <p>Add at least two tags.</p>
  }
</form>
```

```ts
articleForm = new FormGroup({
  tags: new FormControl<string[]>([], { nonNullable: true })
});
```

## Multiple Delimiters

Each character in `delimiter` acts as a separator. This accepts commas and semicolons.

```html
<wa-tag-input delimiter=",;" [(ngModel)]="recipients"></wa-tag-input>
```

Use an empty delimiter when only Enter should create tags.

```html
<wa-tag-input [delimiter]="''" [(ngModel)]="labels"></wa-tag-input>
```

## Validate Before Creating a Tag

```html
<wa-tag-input
  [(ngModel)]="emails"
  inputmode="email"
  (waCreate)="validateEmail($event)"
></wa-tag-input>
```

```ts
validateEmail(event: CustomEvent<{ inputValue: string }>) {
  if (!event.detail.inputValue.includes('@')) {
    event.preventDefault();
  }
}
```

## Slots and Appearance

```html
<wa-tag-input appearance="filled" size="l" pill withClear>
  <strong slot="label">Skills</strong>
  <wa-icon slot="start" name="tags"></wa-icon>
  <span slot="hint">Add up to eight skills.</span>
  <wa-icon slot="clear-icon" name="xmark"></wa-icon>
</wa-tag-input>
```

For server-rendered markup, add `[withLabel]="true"` and `[withHint]="true"` when using the corresponding slots.

## Default Form Value

`defaultValue` is the delimiter-separated value used when a native form resets. The live Angular value remains a string array.

```html
<wa-tag-input
  defaultValue="angular,typescript"
  [(ngModel)]="tags"
  name="tags"
></wa-tag-input>
```
