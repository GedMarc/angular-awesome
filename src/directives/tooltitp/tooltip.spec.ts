import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaTooltipDirective } from './tooltip.directive';

// Create a test host component for the tooltip directive
@Component({
  template: `
    <button id="tooltip-target">Hover me</button>
    <wa-tooltip
      for="tooltip-target"
      [placement]="placement"
      [disabled]="disabled"
      [distance]="distance"
      [skidding]="skidding"
      [open]="open"
      [showDelay]="showDelay"
      [hideDelay]="hideDelay"
      [trigger]="trigger"
      [backgroundColor]="backgroundColor"
      [borderRadius]="borderRadius"
      [maxWidth]="maxWidth"
      [padding]="padding"
      [arrowSize]="arrowSize"
      (waShow)="onShow($event)"
      (waAfterShow)="onAfterShow($event)"
      (waHide)="onHide($event)"
      (waAfterHide)="onAfterHide($event)"
    >
      {{ content }}
    </wa-tooltip>
  `,
  standalone: true,
  imports: [WaTooltipDirective]
})
class TestHostComponent {
  for = 'tooltip-target';
  placement = 'top';
  disabled = false;
  distance = 8;
  skidding = 0;
  open = false;
  showDelay = 150;
  hideDelay = 0;
  trigger = 'hover focusNative';
  content = 'Tooltip Content';

  backgroundColor?: string;
  borderRadius?: string;
  maxWidth?: string;
  padding?: string;
  arrowSize?: string;

  showEventCalled = false;
  afterShowEventCalled = false;
  hideEventCalled = false;
  afterHideEventCalled = false;

  onShow(event: CustomEvent) {
    this.showEventCalled = true;
  }

  onAfterShow(event: CustomEvent) {
    this.afterShowEventCalled = true;
  }

  onHide(event: CustomEvent) {
    this.hideEventCalled = true;
  }

  onAfterHide(event: CustomEvent) {
    this.afterHideEventCalled = true;
  }
}

describe('WaTooltipDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let tooltipElement: HTMLElement;

  beforeEach(async () => {
    // Mock the customElements API
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    // Get the wa-tooltip element
    tooltipElement = hostFixture.nativeElement.querySelector('wa-tooltip');
  });

  it('should create the tooltip directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(tooltipElement).toBeTruthy();
  });

  it('should set basic attributes correctly', () => {
    hostComponent.placement = 'bottom';
    hostComponent.distance = 16;
    hostComponent.skidding = 10;
    hostFixture.detectChanges();

    expect(tooltipElement.getAttribute('for')).toBe('tooltip-target');
    expect(tooltipElement.getAttribute('placement')).toBe('bottom');
    expect(tooltipElement.getAttribute('distance')).toBe('16');
    expect(tooltipElement.getAttribute('skidding')).toBe('10');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();
    expect(tooltipElement.getAttribute('disabled')).toBe('true');

    hostComponent.disabled = false;
    hostFixture.detectChanges();
    expect(tooltipElement.getAttribute('disabled')).toBe('false');

    hostComponent.open = true;
    hostFixture.detectChanges();
    expect(tooltipElement.getAttribute('open')).toBe('true');
  });

  it('should set delay attributes correctly', () => {
    hostComponent.showDelay = 300;
    hostComponent.hideDelay = 200;
    hostFixture.detectChanges();

    expect(tooltipElement.getAttribute('show-delay')).toBe('300');
    expect(tooltipElement.getAttribute('hide-delay')).toBe('200');
  });

  it('should set trigger attribute correctly', () => {
    hostComponent.trigger = 'hover';
    hostFixture.detectChanges();
    expect(tooltipElement.getAttribute('trigger')).toBe('hover');

    hostComponent.trigger = 'focusNative';
    hostFixture.detectChanges();
    expect(tooltipElement.getAttribute('trigger')).toBe('focusNative');

    hostComponent.trigger = 'click';
    hostFixture.detectChanges();
    expect(tooltipElement.getAttribute('trigger')).toBe('click');
  });

  it('should set style attributes correctly', () => {
    hostComponent.backgroundColor = '#3f51b5';
    hostComponent.borderRadius = '8px';
    hostComponent.maxWidth = '300px';
    hostComponent.padding = '16px';
    hostComponent.arrowSize = '12px';
    hostFixture.detectChanges();

    expect(tooltipElement.style.getPropertyValue('--background-color')).toBe('#3f51b5');
    expect(tooltipElement.style.getPropertyValue('--border-radius')).toBe('8px');
    expect(tooltipElement.style.getPropertyValue('--max-width')).toBe('300px');
    expect(tooltipElement.style.getPropertyValue('--padding')).toBe('16px');
    expect(tooltipElement.style.getPropertyValue('--wa-tooltip-arrow-size')).toBe('12px');
  });

  it('should project content correctly', () => {
    expect(tooltipElement.textContent?.trim()).toBe('Tooltip Content');

    hostComponent.content = 'New Tooltip Content';
    hostFixture.detectChanges();
    expect(tooltipElement.textContent?.trim()).toBe('New Tooltip Content');
  });

  it('should emit events correctly', () => {
    // Simulate wa-show event
    tooltipElement.dispatchEvent(new CustomEvent('wa-show'));
    expect(hostComponent.showEventCalled).toBe(true);

    // Simulate wa-after-show event
    tooltipElement.dispatchEvent(new CustomEvent('wa-after-show'));
    expect(hostComponent.afterShowEventCalled).toBe(true);

    // Simulate wa-hide event
    tooltipElement.dispatchEvent(new CustomEvent('wa-hide'));
    expect(hostComponent.hideEventCalled).toBe(true);

    // Simulate wa-after-hide event
    tooltipElement.dispatchEvent(new CustomEvent('wa-after-hide'));
    expect(hostComponent.afterHideEventCalled).toBe(true);
  });
});
