import { Directive, ElementRef, Input, inject } from '@angular/core';

/** A stage inside a Web Awesome stepper. */
@Directive({
  selector: 'wa-step',
  standalone: true,
  host: {
    '[attr.name]': 'name ?? null',
    '[attr.completed]': 'completed ? "" : null',
    '[attr.loading]': 'loading ? "" : null',
    '[attr.disabled]': 'disabled ? "" : null',
    '[attr.variant]': 'variant ?? null',
    '[attr.attention]': 'attention ?? null',
    '[attr.with-description]': 'withDescription ? "" : null',
    '[attr.active]': 'active ? "" : null'
  }
})
export class WaStepDirective {
  @Input() name?: string;
  @Input() completed = false;
  @Input() loading = false;
  @Input() disabled = false;
  @Input() variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger';
  @Input() attention?: 'none' | 'pulse' | 'bounce';
  /** Set for server rendering when the description slot is populated. */
  @Input() withDescription = false;
  /** The parent stepper normally controls this; set it for server rendering. */
  @Input() active = false;

  private readonly el = inject(ElementRef<HTMLElement>);
  get nativeElement(): HTMLElement { return this.el.nativeElement; }
}
