import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaRatingDirective } from './rating.directive';

// Create a test host component to test the rating directive
@Component({
  template: `
    <wa-rating
      [label]="label"
      [value]="value"
      [max]="max"
      [precision]="precision"
      [readonly]="readonly"
      [disabled]="disabled"
      [size]="size"
      (waChange)="onRatingChange($event)"
      (waHover)="onRatingHover($event)"
    >
    </wa-rating>
  `,
  standalone: true,
  imports: [WaRatingDirective]
})
class TestHostComponent {
  label?: string;
  value?: number | string;
  max?: number | string;
  precision?: number | string;
  readonly?: boolean | string;
  disabled?: boolean | string;
  size?: string;

  onRatingChange(value: number): void {}
  onRatingHover(event: { phase: string, value: number }): void {}
}

describe('WaRatingDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let ratingElement: HTMLElement;
  let ratingDirective: WaRatingDirective;

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

    // Get the wa-rating element
    ratingElement = hostFixture.nativeElement.querySelector('wa-rating');
    ratingDirective = hostFixture.debugElement.query(sel => sel.nativeElement === ratingElement).injector.get(WaRatingDirective);
  });

  it('should create the rating directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(ratingElement).toBeTruthy();
    expect(ratingDirective).toBeTruthy();
  });

  it('should set standard attributes correctly', () => {
    hostComponent.label = 'Test Rating';
    hostComponent.size = 'large';
    hostFixture.detectChanges();

    expect(ratingElement.getAttribute('label')).toBe('Test Rating');
    expect(ratingElement.getAttribute('size')).toBe('large');
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.value = 3;
    hostComponent.max = 10;
    hostComponent.precision = 0.5;
    hostFixture.detectChanges();

    expect(ratingElement.getAttribute('value')).toBe('3');
    expect(ratingElement.getAttribute('max')).toBe('10');
    expect(ratingElement.getAttribute('precision')).toBe('0.5');
  });

  it('should handle string values for numeric attributes', () => {
    hostComponent.value = '4.5';
    hostComponent.max = '7';
    hostComponent.precision = '0.25';
    hostFixture.detectChanges();

    expect(ratingElement.getAttribute('value')).toBe('4.5');
    expect(ratingElement.getAttribute('max')).toBe('7');
    expect(ratingElement.getAttribute('precision')).toBe('0.25');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.readonly = true;
    hostComponent.disabled = true;
    hostFixture.detectChanges();

    expect(ratingElement.hasAttribute('readonly')).toBeTrue();
    expect(ratingElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.readonly = false;
    hostComponent.disabled = false;
    hostFixture.detectChanges();

    expect(ratingElement.hasAttribute('readonly')).toBeFalse();
    expect(ratingElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.readonly = 'true';
    hostComponent.disabled = '';
    hostFixture.detectChanges();

    expect(ratingElement.hasAttribute('readonly')).toBeTrue();
    expect(ratingElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should expose methods for programmatic interaction', () => {
    // Mock the native element methods
    spyOn(ratingElement, 'focusNative');
    spyOn(ratingElement, 'blurNative');

    // Call the directive methods
    ratingDirective.focus();
    ratingDirective.blur();

    // Verify the native methods were called
    expect(ratingElement.focus).toHaveBeenCalled();
    expect(ratingElement.blur).toHaveBeenCalled();
  });

  it('should expose the native element', () => {
    expect(ratingDirective.nativeElement).toBe(ratingElement);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onRatingChange');
    spyOn(hostComponent, 'onRatingHover');

    // Create mock events
    const changeEvent = new CustomEvent('change', { detail: 4 });
    const hoverEvent = new CustomEvent('hover', {
      detail: { phase: 'start', value: 3 }
    });

    // Dispatch events on the native element
    ratingElement.dispatchEvent(changeEvent);
    ratingElement.dispatchEvent(hoverEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onRatingChange).toHaveBeenCalledWith(4);
    expect(hostComponent.onRatingHover).toHaveBeenCalledWith({ phase: 'start', value: 3 });
  });

  it('should handle different size values', () => {
    const sizes = ['small', 'medium', 'large', 'inherit'];

    sizes.forEach(size => {
      hostComponent.size = size;
      hostFixture.detectChanges();
      expect(ratingElement.getAttribute('size')).toBe(size);
    });
  });

  it('should set custom symbol function', () => {
    // Create a spy for the getSymbol function
    const getSymbolFn = (value: number) => `<wa-icon name="star"></wa-icon>`;

    // Set the getSymbol function
    ratingDirective.getSymbol = getSymbolFn;

    // Verify the function was set on the native element
    expect((ratingElement as any).getSymbol).toBe(getSymbolFn);
  });
});
