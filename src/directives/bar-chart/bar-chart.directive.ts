import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, Renderer2, inject } from '@angular/core';

/**
 * WaBarChartDirective
 *
 * Angular wrapper for the <wa-bar-chart> Web Component.
 * Bar charts work well for comparing quantities across categories, showing rankings,
 * and highlighting differences between groups.
 */
@Directive({
  selector: 'wa-bar-chart',
  standalone: true
})
export class WaBarChartDirective implements OnInit, OnChanges {
  @Input() label?: string | null;
  @Input() description?: string | null;
  @Input() xLabel?: string | null;
  @Input() yLabel?: string | null;
  @Input() legendPosition?: string;
  @Input() stacked?: boolean | string;
  @Input() indexAxis?: 'x' | 'y' | string;
  @Input() grid?: 'x' | 'y' | 'both' | 'none' | string;
  @Input() min?: number | null;
  @Input() max?: number | null;
  @Input() withoutAnimation?: boolean | string;
  @Input() withoutLegend?: boolean | string;
  @Input() withoutTooltip?: boolean | string;
  @Input() config?: any;
  @Input() plugins?: any[];

  @Input() set fillColor1(v: string | undefined) { this.setStyle('--fill-color-1', v); }
  @Input() set fillColor2(v: string | undefined) { this.setStyle('--fill-color-2', v); }
  @Input() set fillColor3(v: string | undefined) { this.setStyle('--fill-color-3', v); }
  @Input() set fillColor4(v: string | undefined) { this.setStyle('--fill-color-4', v); }
  @Input() set fillColor5(v: string | undefined) { this.setStyle('--fill-color-5', v); }
  @Input() set fillColor6(v: string | undefined) { this.setStyle('--fill-color-6', v); }
  @Input() set borderColor1(v: string | undefined) { this.setStyle('--border-color-1', v); }
  @Input() set borderColor2(v: string | undefined) { this.setStyle('--border-color-2', v); }
  @Input() set borderColor3(v: string | undefined) { this.setStyle('--border-color-3', v); }
  @Input() set borderColor4(v: string | undefined) { this.setStyle('--border-color-4', v); }
  @Input() set borderColor5(v: string | undefined) { this.setStyle('--border-color-5', v); }
  @Input() set borderColor6(v: string | undefined) { this.setStyle('--border-color-6', v); }
  @Input() set gridColor(v: string | undefined) { this.setStyle('--grid-color', v); }
  @Input() set borderWidth(v: string | undefined) { this.setStyle('--border-width', v); }
  @Input() set borderRadius(v: string | undefined) { this.setStyle('--border-radius', v); }
  @Input() set gridBorderWidth(v: string | undefined) { this.setStyle('--grid-border-width', v); }
  @Input() set lineBorderWidth(v: string | undefined) { this.setStyle('--line-border-width', v); }
  @Input() set pointRadius(v: string | undefined) { this.setStyle('--point-radius', v); }

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void { this.applyInputs(); }
  ngOnChanges(_: SimpleChanges): void { this.applyInputs(); }

  private applyInputs() {
    const nativeEl = this.el.nativeElement as HTMLElement;
    this.setAttr('label', this.label);
    this.setAttr('description', this.description);
    this.setAttr('x-label', this.xLabel);
    this.setAttr('y-label', this.yLabel);
    this.setAttr('legend-position', this.legendPosition);
    this.setBooleanAttr('stacked', this.stacked);
    this.setAttr('index-axis', this.indexAxis);
    this.setAttr('grid', this.grid);
    this.setNumericAttr('min', this.min);
    this.setNumericAttr('max', this.max);
    this.setBooleanAttr('without-animation', this.withoutAnimation);
    this.setBooleanAttr('without-legend', this.withoutLegend);
    this.setBooleanAttr('without-tooltip', this.withoutTooltip);
    if (this.config != null) { (nativeEl as any).config = this.config; }
    if (this.plugins != null) { (nativeEl as any).plugins = this.plugins; }
  }

  private setAttr(name: string, value: string | number | null | undefined) {
    if (value != null && value !== '') { this.renderer.setAttribute(this.el.nativeElement, name, String(value)); }
  }
  private setNumericAttr(name: string, value: number | null | undefined) {
    if (value != null) { this.renderer.setAttribute(this.el.nativeElement, name, String(value)); }
  }
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') { this.renderer.setAttribute(this.el.nativeElement, name, ''); } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }
  private setStyle(name: string, value: string | undefined) {
    if (value) { this.el.nativeElement.style.setProperty(name, value); }
  }
}
