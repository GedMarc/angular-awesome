import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaScrollerDirective } from './scroller.directive';

// Create a test host component to test the scroller directive
@Component({
  template: `
    <wa-scroller
      [orientation]="orientation"
      [withoutScrollbar]="withoutScrollbar"
      [withoutShadow]="withoutShadow"
      [shadowColor]="shadowColor"
      [shadowSize]="shadowSize"
    >
      {{ content }}
    </wa-scroller>
  `,
  standalone: true,
  imports: [WaScrollerDirective]
})
class TestHostComponent {
  orientation?: 'horizontal' | 'vertical' | string;
  withoutScrollbar?: boolean | string;
  withoutShadow?: boolean | string;
  shadowColor?: string;
  shadowSize?: string;
  content = 'Scrollable Content';
}

describe('WaScrollerDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let scrollerElement: HTMLElement;
  let scrollerDirective: WaScrollerDirective;

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

    // Get the wa-scroller element
    scrollerElement = hostFixture.nativeElement.querySelector('wa-scroller');
    scrollerDirective = hostFixture.debugElement.query(sel => sel.nativeElement === scrollerElement).injector.get(WaScrollerDirective);
  });

  it('should create the scroller directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(scrollerElement).toBeTruthy();
    expect(scrollerDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.orientation = 'vertical';
    hostFixture.detectChanges();
    expect(scrollerElement.getAttribute('orientation')).toBe('vertical');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.withoutScrollbar = true;
    hostComponent.withoutShadow = true;
    hostFixture.detectChanges();

    expect(scrollerElement.hasAttribute('without-scrollbar')).toBeTrue();
    expect(scrollerElement.hasAttribute('without-shadow')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.withoutScrollbar = false;
    hostComponent.withoutShadow = false;
    hostFixture.detectChanges();

    expect(scrollerElement.hasAttribute('without-scrollbar')).toBeFalse();
    expect(scrollerElement.hasAttribute('without-shadow')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.withoutScrollbar = 'true';
    hostComponent.withoutShadow = '';
    hostFixture.detectChanges();

    expect(scrollerElement.hasAttribute('without-scrollbar')).toBeTrue();
    expect(scrollerElement.hasAttribute('without-shadow')).toBeTrue();
  });

  it('should set style attributes correctly', () => {
    hostComponent.shadowColor = 'rgba(0, 0, 0, 0.2)';
    hostComponent.shadowSize = '20px';
    hostFixture.detectChanges();

    expect(scrollerElement.style.getPropertyValue('--shadow-color')).toBe('rgba(0, 0, 0, 0.2)');
    expect(scrollerElement.style.getPropertyValue('--shadow-size')).toBe('20px');
  });

  it('should project content correctly', () => {
    expect(scrollerElement.textContent?.trim()).toBe('Scrollable Content');

    hostComponent.content = 'Updated Content';
    hostFixture.detectChanges();
    expect(scrollerElement.textContent?.trim()).toBe('Updated Content');
  });

  it('should expose the native element', () => {
    expect(scrollerDirective.nativeElement).toBe(scrollerElement);
  });

  it('should handle different orientation values', () => {
    const orientations = ['horizontal', 'vertical'];

    orientations.forEach(orientation => {
      hostComponent.orientation = orientation;
      hostFixture.detectChanges();
      expect(scrollerElement.getAttribute('orientation')).toBe(orientation);
    });
  });
});
