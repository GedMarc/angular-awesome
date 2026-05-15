import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaBubbleChartDirective } from './bubble-chart.directive';
@Component({
  template: `
    <wa-bubble-chart
      [label]="label"
      [description]="description"
      [xLabel]="xLabel"
      [yLabel]="yLabel"
      [legendPosition]="legendPosition"
      [stacked]="stacked"
      [indexAxis]="indexAxis"
      [grid]="grid"
      [min]="min"
      [max]="max"
      [withoutAnimation]="withoutAnimation"
      [withoutLegend]="withoutLegend"
      [withoutTooltip]="withoutTooltip"
      [config]="config"
      [plugins]="plugins"
      [fillColor1]="fillColor1"
      [borderColor1]="borderColor1"
      [gridColor]="gridColor"
    ></wa-bubble-chart>
  `,
  standalone: true,
  imports: [WaBubbleChartDirective]
})
class TestHostComponent {
  label?: string | null;
  description?: string | null;
  xLabel?: string | null;
  yLabel?: string | null;
  legendPosition?: string;
  stacked?: boolean | string;
  indexAxis?: 'x' | 'y' | string;
  grid?: 'x' | 'y' | 'both' | 'none' | string;
  min?: number | null;
  max?: number | null;
  withoutAnimation?: boolean | string;
  withoutLegend?: boolean | string;
  withoutTooltip?: boolean | string;
  config?: any;
  plugins?: any[];
  fillColor1?: string;
  borderColor1?: string;
  gridColor?: string;
}
describe('WaBubbleChartDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let chartElement: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
    chartElement = hostFixture.nativeElement.querySelector('wa-bubble-chart');
  });
  it('should create the directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(chartElement).toBeTruthy();
  });
  it('should set string attributes correctly', () => {
    hostComponent.label = 'Test Chart';
    hostComponent.description = 'A test chart';
    hostComponent.xLabel = 'X Axis';
    hostComponent.yLabel = 'Y Axis';
    hostComponent.legendPosition = 'bottom';
    hostFixture.detectChanges();
    expect(chartElement.getAttribute('label')).toBe('Test Chart');
    expect(chartElement.getAttribute('description')).toBe('A test chart');
    expect(chartElement.getAttribute('x-label')).toBe('X Axis');
    expect(chartElement.getAttribute('y-label')).toBe('Y Axis');
    expect(chartElement.getAttribute('legend-position')).toBe('bottom');
  });
  it('should set indexAxis attribute', () => {
    hostComponent.indexAxis = 'y';
    hostFixture.detectChanges();
    expect(chartElement.getAttribute('index-axis')).toBe('y');
  });
  it('should set grid attribute', () => {
    hostComponent.grid = 'none';
    hostFixture.detectChanges();
    expect(chartElement.getAttribute('grid')).toBe('none');
  });
  it('should set numeric min/max attributes', () => {
    hostComponent.min = 0;
    hostComponent.max = 100;
    hostFixture.detectChanges();
    expect(chartElement.getAttribute('min')).toBe('0');
    expect(chartElement.getAttribute('max')).toBe('100');
  });
  it('should set boolean attributes when true', () => {
    hostComponent.stacked = true;
    hostComponent.withoutAnimation = true;
    hostComponent.withoutLegend = true;
    hostComponent.withoutTooltip = true;
    hostFixture.detectChanges();
    expect(chartElement.hasAttribute('stacked')).toBeTrue();
    expect(chartElement.hasAttribute('without-animation')).toBeTrue();
    expect(chartElement.hasAttribute('without-legend')).toBeTrue();
    expect(chartElement.hasAttribute('without-tooltip')).toBeTrue();
  });
  it('should not set boolean attributes when false', () => {
    hostComponent.stacked = false;
    hostComponent.withoutAnimation = false;
    hostFixture.detectChanges();
    expect(chartElement.hasAttribute('stacked')).toBeFalse();
    expect(chartElement.hasAttribute('without-animation')).toBeFalse();
  });
  it('should handle string values for boolean attributes', () => {
    hostComponent.stacked = 'true';
    hostComponent.withoutAnimation = '';
    hostFixture.detectChanges();
    expect(chartElement.hasAttribute('stacked')).toBeTrue();
    expect(chartElement.hasAttribute('without-animation')).toBeTrue();
  });
  it('should set config as a property', () => {
    const testConfig = {
      data: { labels: ['A', 'B'], datasets: [{ data: [1, 2] }] }
    };
    hostComponent.config = testConfig;
    hostFixture.detectChanges();
    expect((chartElement as any).config).toEqual(testConfig);
  });
  it('should set plugins as a property', () => {
    const testPlugins = [{ id: 'test-plugin' }];
    hostComponent.plugins = testPlugins;
    hostFixture.detectChanges();
    expect((chartElement as any).plugins).toEqual(testPlugins);
  });
  it('should set CSS custom properties', () => {
    hostComponent.fillColor1 = 'rgba(59, 130, 246, 0.5)';
    hostComponent.borderColor1 = 'rgb(59, 130, 246)';
    hostComponent.gridColor = '#ccc';
    hostFixture.detectChanges();
    expect(chartElement.style.getPropertyValue('--fill-color-1')).toBe('rgba(59, 130, 246, 0.5)');
    expect(chartElement.style.getPropertyValue('--border-color-1')).toBe('rgb(59, 130, 246)');
    expect(chartElement.style.getPropertyValue('--grid-color')).toBe('#ccc');
  });
  it('should update attributes when inputs change', () => {
    hostComponent.label = 'Initial';
    hostFixture.detectChanges();
    expect(chartElement.getAttribute('label')).toBe('Initial');
    hostComponent.label = 'Updated';
    hostFixture.detectChanges();
    expect(chartElement.getAttribute('label')).toBe('Updated');
  });
});
