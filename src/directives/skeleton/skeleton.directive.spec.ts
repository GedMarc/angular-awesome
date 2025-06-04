import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaSkeletonDirective } from './skeleton.directive';

// Create a test host component for the skeleton directive
@Component({
  template: `
    <div
      waSkeleton
      [effect]="effect"
      [borderRadius]="borderRadius"
      [color]="color"
      [sheenColor]="sheenColor"
    >
      {{ content }}
    </div>
    <wa-skeleton
      waSkeleton
      [effect]="waEffect"
      [borderRadius]="waBorderRadius"
      [color]="waColor"
      [sheenColor]="waSheenColor"
    ></wa-skeleton>
  `,
  standalone: true,
  imports: [WaSkeletonDirective]
})
class TestHostComponent {
  effect?: 'none' | 'sheen' | 'pulse' | string;
  borderRadius?: string;
  color?: string;
  sheenColor?: string;
  content = 'Loading...';

  // For wa-skeleton element
  waEffect?: 'none' | 'sheen' | 'pulse' | string;
  waBorderRadius?: string;
  waColor?: string;
  waSheenColor?: string;
}

describe('WaSkeletonDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let divElement: HTMLElement;
  let waSkeletonElement: HTMLElement;

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

    // Get the div element with waSkeleton directive
    divElement = hostFixture.nativeElement.querySelector('div');

    // Get the wa-skeleton element
    waSkeletonElement = hostFixture.nativeElement.querySelector('wa-skeleton');
  });

  it('should create the skeleton directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(divElement).toBeTruthy();
    expect(waSkeletonElement).toBeTruthy();
  });

  it('should set accessibility attributes on non-wa-skeleton elements', () => {
    expect(divElement.getAttribute('role')).toBe('presentation');
    expect(divElement.getAttribute('aria-hidden')).toBe('true');

    // wa-skeleton element should not have these attributes set by the directive
    expect(waSkeletonElement.getAttribute('role')).not.toBe('presentation');
    expect(waSkeletonElement.getAttribute('aria-hidden')).not.toBe('true');
  });

  it('should set effect attribute correctly', () => {
    hostComponent.effect = 'sheen';
    hostComponent.waEffect = 'pulse';
    hostFixture.detectChanges();

    expect(divElement.getAttribute('effect')).toBe('sheen');
    expect(waSkeletonElement.getAttribute('effect')).toBe('pulse');
  });

  it('should set style attributes correctly', () => {
    hostComponent.borderRadius = '8px';
    hostComponent.color = '#f0f0f0';
    hostComponent.sheenColor = 'rgba(255,255,255,0.3)';

    hostComponent.waBorderRadius = '50%';
    hostComponent.waColor = '#e0e0e0';
    hostComponent.waSheenColor = 'rgba(255,255,255,0.5)';
    hostFixture.detectChanges();

    expect(divElement.style.getPropertyValue('--border-radius')).toBe('8px');
    expect(divElement.style.getPropertyValue('--color')).toBe('#f0f0f0');
    expect(divElement.style.getPropertyValue('--sheen-color')).toBe('rgba(255,255,255,0.3)');

    expect(waSkeletonElement.style.getPropertyValue('--border-radius')).toBe('50%');
    expect(waSkeletonElement.style.getPropertyValue('--color')).toBe('#e0e0e0');
    expect(waSkeletonElement.style.getPropertyValue('--sheen-color')).toBe('rgba(255,255,255,0.5)');
  });

  it('should project content correctly', () => {
    expect(divElement.textContent?.trim()).toBe('Loading...');

    hostComponent.content = 'Please wait...';
    hostFixture.detectChanges();
    expect(divElement.textContent?.trim()).toBe('Please wait...');
  });

  it('should handle different effect values', () => {
    const effects = ['none', 'sheen', 'pulse'];

    effects.forEach(effect => {
      hostComponent.effect = effect;
      hostFixture.detectChanges();
      expect(divElement.getAttribute('effect')).toBe(effect);
    });
  });
});
