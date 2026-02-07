import { Directive, ElementRef, EventEmitter, Input, OnChanges, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'wa-sparkline',
  standalone: true
})
export class WaSparklineDirective implements AfterViewInit, OnChanges {
  constructor(private host: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  // Properties
  @Input() label?: string;
  @Input() data?: string;
  @Input() appearance: 'gradient' | 'line' | 'solid' | string = 'solid';
  @Input() trend?: 'positive' | 'negative' | 'neutral' | string;
  @Input() curve: 'linear' | 'natural' | 'step' | string = 'linear';

  // CSS variables helpers
  @Input() set fillColor(value: string | undefined) { this.setStyle('--fill-color', value); }
  @Input() set lineColor(value: string | undefined) { this.setStyle('--line-color', value); }
  @Input() set lineWidth(value: string | undefined) { this.setStyle('--line-width', value); }

  private setAll() {
    this.setAttr('label', this.label);
    this.setAttr('data', this.data);
    this.setAttr('appearance', this.appearance);
    this.setAttr('trend', this.trend);
    this.setAttr('curve', this.curve);
  }

  ngAfterViewInit(): void { this.setAll(); }
  ngOnChanges(): void { this.setAll(); }

  private setAttr(name: string, value: any) {
    if (value !== undefined && value !== null && value !== '') {
      this.renderer.setAttribute(this.host.nativeElement, name, String(value));
    }
  }
  private setStyle(name: string, value: string | undefined) {
    if (value) {
      this.host.nativeElement.style.setProperty(name, value);
    }
  }
}
