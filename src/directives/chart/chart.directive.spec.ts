import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaChartDirective } from './chart.directive';

@Component({
  template: `
    <wa-chart
      [type]="type"
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
      [borderWidth]="borderWidth"
      [borderRadius]="borderRadius"
      [gridBorderWidth]="gridBorderWidth"
      [lineBorderWidth]="lineBorderWidth"
      [pointRadius]="pointRadius"
    ></wa-chart>
  `,
  standalone: true,
  imports: [WaChartDirective]
})
class TestHostComponent {
  type?: string;
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
  borderWidth?: string;
  borderRadius?: string;
  gridBorderWidth?: string;
  lineBorderWidth?: string;
  pointRadius?: string;
}

describe('WaChartDirective', () => {
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

    chartElement = hostFixture.nativeElement.querySelector('wa-chart');
  });

  it('should create the chart directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(chartElement).toBeTruthy();
  });

  it('should set the type attribute', () => {
    hostComponent.type = 'bar';
    hostFixture.detectChanges();
    expect(chartElement.getAttribute('type')).toBe('bar');
  });

  it('should set string attributes correctly', () => {
    hostComponent.label = 'Sales Chart';
    hostComponent.description = 'Monthly sales data';
    hostComponent.xLabel = 'Month';
    hostComponent.yLabel = 'Revenue';
    hostComponent.legendPosition = 'bottom';
    hostFixture.detectChanges();

    expect(chartElement.getAttribute('label')).toBe('Sales Chart');
    expect(chartElement.getAttribute('description')).toBe('Monthly sales data');
    expect(chartElement.getAttribute('x-label')).toBe('Month');
    expect(chartElement.getAttribute('y-label')).toBe('Revenue');
    expect(chartElement.getAttribute('legend-position')).toBe('bottom');
  });

  it('should set indexAxis attribute', () => {
    hostComponent.indexAxis = 'y';
    hostFixture.detectChanges();
    expect(chartElement.getAttribute('index-axis')).toBe('y');
  });

  it('should set grid attribute', () => {
    hostComponent.grid = 'both';
    hostFixture.detectChanges();
    expect(chartElement.getAttribute('grid')).toBe('both');

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
    hostComponent.withoutLegend = false;
    hostComponent.withoutTooltip = false;
    hostFixture.detectChanges();

    expect(chartElement.hasAttribute('stacked')).toBeFalse();
    expect(chartElement.hasAttribute('without-animation')).toBeFalse();
    expect(chartElement.hasAttribute('without-legend')).toBeFalse();
    expect(chartElement.hasAttribute('without-tooltip')).toBeFalse();
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
      type: 'bar',
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

  it('should set CSS custom properties for fill colors', () => {
    hostComponent.fillColor1 = 'rgba(59, 130, 246, 0.5)';
    hostFixture.detectChanges();

    expect(chartElement.style.getPropertyValue('--fill-color-1')).toBe('rgba(59, 130, 246, 0.5)');
  });

  it('should set CSS custom properties for border colors', () => {
    hostComponent.borderColor1 = 'rgb(59, 130, 246)';
    hostFixture.detectChanges();

    expect(chartElement.style.getPropertyValue('--border-color-1')).toBe('rgb(59, 130, 246)');
  });

  it('should set CSS custom properties for grid and sizing', () => {
    hostComponent.gridColor = '#ccc';
    hostComponent.borderWidth = '2px';
    hostComponent.borderRadius = '4px';
    hostComponent.gridBorderWidth = '1px';
    hostComponent.lineBorderWidth = '3px';
    hostComponent.pointRadius = '5px';
    hostFixture.detectChanges();

    expect(chartElement.style.getPropertyValue('--grid-color')).toBe('#ccc');
    expect(chartElement.style.getPropertyValue('--border-width')).toBe('2px');
    expect(chartElement.style.getPropertyValue('--border-radius')).toBe('4px');
    expect(chartElement.style.getPropertyValue('--grid-border-width')).toBe('1px');
    expect(chartElement.style.getPropertyValue('--line-border-width')).toBe('3px');
    expect(chartElement.style.getPropertyValue('--point-radius')).toBe('5px');
  });

  it('should update attributes when inputs change', () => {
    hostComponent.label = 'Initial Label';
    hostFixture.detectChanges();
    expect(chartElement.getAttribute('label')).toBe('Initial Label');

    hostComponent.label = 'Updated Label';
    hostFixture.detectChanges();
    expect(chartElement.getAttribute('label')).toBe('Updated Label');
  });

  it('should handle different chart types', () => {
    const types = ['bar', 'line', 'pie', 'doughnut', 'polarArea', 'radar', 'scatter', 'bubble'];
    types.forEach(type => {
      hostComponent.type = type;
      hostFixture.detectChanges();
      expect(chartElement.getAttribute('type')).toBe(type);
    });
  });

  it('should handle different legend positions', () => {
    const positions = ['top', 'bottom', 'left', 'right', 'start', 'end'];
    positions.forEach(pos => {
      hostComponent.legendPosition = pos;
      hostFixture.detectChanges();
      expect(chartElement.getAttribute('legend-position')).toBe(pos);
    });
  });
});

