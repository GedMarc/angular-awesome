# Textarea Examples

Textarea collects multiline user input. These examples mirror the official sections.

## Basic
```html
<wa-textarea label="Type something', will ya"></wa-textarea>
```

## Labels
```html
<wa-textarea label="Comments"></wa-textarea>
```

## Hint
```html
<wa-textarea label="Feedback" hint="Please tell us what you think."> </wa-textarea>
```

## Rows
```html
<wa-textarea rows="2"></wa-textarea>
```

## Placeholders
```html
<wa-textarea placeholder="Type something"></wa-textarea>
```

## Appearance
```html
<wa-textarea placeholder="Type something" appearance="filled"></wa-textarea>
```

## Disabled
```html
<wa-textarea placeholder="Textarea" disabled></wa-textarea>
```

## Value
```html
<wa-textarea value="Write something awesome!"></wa-textarea>
```

## Sizes
```html
<wa-textarea placeholder="Small" size="small"></wa-textarea>
<br />
<wa-textarea placeholder="Medium" size="medium"></wa-textarea>
<br />
<wa-textarea placeholder="Large" size="large"></wa-textarea>
```

## Prevent Resizing
```html
<wa-textarea resize="none"></wa-textarea>
```

## Expand with Content
```html
<wa-textarea resize="auto"></wa-textarea>
```

## Resize horizontal
```html
<wa-textarea resize="horizontal"></wa-textarea>
```

## Resize both
```html
<wa-textarea resize="both"></wa-textarea>
```

---

## Angular bindings (template-driven)
```html
<form #f="ngForm">
  <wa-textarea label="Comments" name="comments" [(ngModel)]="comments"></wa-textarea>
  <div>Value: {{ comments }}</div>
</form>
```

## Event Handling (Angular)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-textarea-events',
  template: `
    <wa-textarea
      label="Event Demo"
      placeholder="Type something..."
      (focusEvent)="log('focus')"
      (blurEvent)="log('blur')"
      (inputEvent)="log('input')"
      (changeEvent)="log('change')"
      (invalid)="log('invalid')"
    ></wa-textarea>

    <ul><li *ngFor="let e of events">{{ e }}</li></ul>
  `
})
export class TextareaEventsComponent {
  events: string[] = [];
  log(t: string) { this.events.unshift(`${new Date().toLocaleTimeString()}: ${t}`); if (this.events.length>10) this.events.pop(); }
}
```
