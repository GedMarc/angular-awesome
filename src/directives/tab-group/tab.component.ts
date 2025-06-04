import { Component, Input, ElementRef, Renderer2, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wa-tab',
  template: `<ng-content></ng-content>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.panel]': 'panel',
    '[attr.disabled]': 'disabled ? "" : null'
  }
})
export class WaTabComponent {
  @Input() panel!: string;
  @Input() disabled = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() set activeTabColor(value: string) {
    if (value) {
      this.renderer.setStyle(this.el.nativeElement, '--active-tab-color', value);
    }
  }
}
