import { Component, Input, ElementRef, Renderer2, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wa-tab-panel',
  template: `<ng-content></ng-content>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.name]': 'name',
    '[attr.active]': 'active ? "" : null'
  }
})
export class WaTabPanelComponent {
  @Input() name!: string;
  @Input() active = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() set padding(value: string) {
    if (value) {
      this.renderer.setStyle(this.el.nativeElement, '--padding', value);
    }
  }
}
