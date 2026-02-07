import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[waTabContent]',
  standalone: true
})
export class WaTabContent {
  constructor(public templateRef: TemplateRef<any>) {}
}
