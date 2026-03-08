import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[waDialogContent]',
  standalone: true
})
export class WaDialogContent {
  constructor(public templateRef: TemplateRef<any>) {}
}
