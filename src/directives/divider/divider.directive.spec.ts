import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaDividerDirective } from './divider.directive';

// Create a test host component to test the divider directive
@Component({
  template: `
    <wa-divider
      [vertical]="vertical"
      [color]="color"
      [width]="width"
      [spacing]="spacing"
    ></wa-divider>
  `,
  standalone: true,
  imports: [WaDividerDirective]
})
class TestHostComponent {
  vertical?: boolean | string;
  color?: string;
  width?: string;
  spacing?: string;
}

describe('WaDividerDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let dividerElement: HTMLElement;
  let dividerDirective: WaDividerDirective;

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

    // Get the wa-divider element
    dividerElement = hostFixture.nativeElement.querySelector('wa-divider');
    dividerDirective = hostFixture.debugElement.query(sel => sel.nativeElement === dividerElement).injector.get(WaDividerDirective);
  });

  it('should create the divider directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(dividerElement).toBeTruthy();
    expect(dividerDirective).toBeTruthy();
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.vertical = true;
    hostFixture.detectChanges();

    expect(dividerElement.hasAttribute('vertical')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.vertical = false;
    hostFixture.detectChanges();

    expect(dividerElement.hasAttribute('vertical')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.vertical = 'true';
    hostFixture.detectChanges();

    expect(dividerElement.hasAttribute('vertical')).toBeTrue();

    hostComponent.vertical = '';
    hostFixture.detectChanges();

    expect(dividerElement.hasAttribute('vertical')).toBeTrue();
  });

  it('should set CSS custom properties correctly', () => {
    hostComponent.color = 'red';
    hostComponent.width = '4px';
    hostComponent.spacing = '16px';
    hostFixture.detectChanges();

    expect(dividerElement.style.getPropertyValue('--color')).toBe('red');
    expect(dividerElement.style.getPropertyValue('--width')).toBe('4px');
    expect(dividerElement.style.getPropertyValue('--spacing')).toBe('16px');
  });

  it('should expose the native element', () => {
    expect(dividerDirective.nativeElement).toBe(dividerElement);
  });
});
