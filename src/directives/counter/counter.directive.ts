import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, inject, booleanAttribute, EventEmitter, Output } from '@angular/core';
import { reflectAttributeInputs } from '../shared/attribute-inputs';

export type CounterUnit = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds';

/** Angular bindings for a countdown or elapsed-time counter. */
@Directive({
  selector: 'wa-counter',
  standalone: true,
  host: {
    '(wa-finish)': 'forward($event, waFinish)'
  }
})
export class WaCounterDirective implements OnChanges {
  @Input() date?: Date | string | null;
  @Input() duration?: number | string | null;
  @Input() direction?: 'down' | 'up';
  @Input() label?: string;
  @Input() largestUnit?: CounterUnit;
  @Input() smallestUnit?: CounterUnit;
  @Input() format?: 'long' | 'short' | 'narrow';
  @Input({ transform: booleanAttribute }) withoutLabels = false;
  @Input() delimiter?: string;
  @Input({ transform: booleanAttribute }) paused = false;
  @Input() valueFormatter?: (value: number, unit: CounterUnit) => string;

  @Output() waFinish = new EventEmitter<Event>();
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    reflectAttributeInputs(this.renderer, this.nativeElement, changes, [
      'duration', 'direction', 'label', 'largestUnit', 'smallestUnit', 'format',
      'withoutLabels', 'delimiter', 'paused'
    ]);
    if (changes['date']) {
      const date = this.date instanceof Date
        ? (Number.isNaN(this.date.getTime()) ? null : this.date.toISOString())
        : this.date;
      if (date == null) this.renderer.removeAttribute(this.nativeElement, 'date');
      else this.renderer.setAttribute(this.nativeElement, 'date', date);
    }
    if (changes['valueFormatter']) this.renderer.setProperty(this.nativeElement, 'valueFormatter', this.valueFormatter);
  }

  forward<T extends Event>(event: T, output: EventEmitter<T>): void {
    if (event.target === this.nativeElement) output.emit(event);
  }
}
