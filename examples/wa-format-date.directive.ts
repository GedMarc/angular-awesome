import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'wa-format-date, [waFormatDate]',
  standalone: true
})
export class WaFormatDateDirective {
  // Input for the date to format
  @Input() date: Date | string = new Date();
  @Input() waFormatDate: Date | string | null = null;

  // Formatting options
  @Input() weekday: 'narrow' | 'short' | 'long' | undefined;
  @Input() era: 'narrow' | 'short' | 'long' | undefined;
  @Input() year: 'numeric' | '2-digit' | undefined;
  @Input() month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long' | undefined;
  @Input() day: 'numeric' | '2-digit' | undefined;
  @Input() hour: 'numeric' | '2-digit' | undefined;
  @Input() minute: 'numeric' | '2-digit' | undefined;
  @Input() second: 'numeric' | '2-digit' | undefined;
  @Input() timeZoneName: 'short' | 'long' | undefined;
  @Input() timeZone: string | undefined;
  @Input() lang: string = 'en';

  // Private backing field for hourFormat
  private _hourFormat: '12' | '24' | 'auto' = 'auto';

  // Getter and setter to handle both property binding and standalone attribute
  @Input()
  get hourFormat(): '12' | '24' | 'auto' {
    return this._hourFormat;
  }
  set hourFormat(value: '12' | '24' | 'auto' | string) {
    if (value === '12' || value === '24') {
      this._hourFormat = value;
    } else if (value === '' || value === 'auto' || value === 'true') {
      this._hourFormat = 'auto';
    }
  }

  constructor(private el: ElementRef) {}

}
