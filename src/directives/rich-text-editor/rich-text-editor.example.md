### Reactive Markdown editor

```ts
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { WaRichTextEditorDirective } from 'angular-awesome';

@Component({
  imports: [ReactiveFormsModule, WaRichTextEditorDirective],
  template: `
    <wa-rich-text-editor
      label="Release notes"
      format="markdown"
      [formControl]="notes"
      [required]="true"
      [withCount]="true">
    </wa-rich-text-editor>
  `
})
export class ReleaseNotesComponent {
  readonly notes = new FormControl('', { nonNullable: true });
}
```
