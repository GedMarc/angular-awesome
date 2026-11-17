import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, inject, booleanAttribute, EventEmitter, Output } from '@angular/core';
import { reflectAttributeInputs } from '../shared/attribute-inputs';

export interface WaNumberTickerElement extends HTMLElement {
  restart?: () => void;
}

/** Angular bindings for animated, locale-aware numbers. */
@Directive({
  selector: 'wa-number-ticker',
  standalone: true,
  host: {
    '(wa-finish)': 'forward($event, waFinish)'
  }
})
export class WaNumberTickerDirective implements OnChanges {
  @Input() value?: number | string;
  @Input() startValue?: number | string;
  @Input() duration?: number | string;
  @Input() delay?: number | string;
  @Input() easing?: string;
  @Input({ transform: booleanAttribute }) eager = false;
  @Input() type?: 'currency' | 'decimal' | 'percent';
  @Input({ transform: booleanAttribute }) withoutGrouping = false;
  @Input() currency?: string;
  @Input() currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  @Input() minimumIntegerDigits?: number | string;
  @Input() minimumFractionDigits?: number | string;
  @Input() maximumFractionDigits?: number | string;
  @Input() minimumSignificantDigits?: number | string;
  @Input() maximumSignificantDigits?: number | string;
  @Input() valueFormatter?: (value: number) => string;

  @Output() waFinish = new EventEmitter<Event>();

  private readonly el = inject(ElementRef<WaNumberTickerElement>);
  private readonly renderer = inject(Renderer2);

  get nativeElement(): WaNumberTickerElement {
    return this.el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    reflectAttributeInputs(this.renderer, this.nativeElement, changes, [
      'value', 'startValue', 'duration', 'delay', 'easing', 'eager', 'type', 'withoutGrouping',
      'currency', 'currencyDisplay', 'minimumIntegerDigits', 'minimumFractionDigits',
      'maximumFractionDigits', 'minimumSignificantDigits', 'maximumSignificantDigits'
    ]);
    if (changes['valueFormatter']) this.renderer.setProperty(this.nativeElement, 'valueFormatter', this.valueFormatter);
  }

  forward<T extends Event>(event: T, output: EventEmitter<T>): void {
    if (event.target === this.nativeElement) output.emit(event);
  }

  restart(): void {
    this.nativeElement.restart?.();
  }
}
