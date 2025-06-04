import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaCalloutDirective } from './callout.directive';

// Create a test host component to test the callout directive
@Component({
  template: `
    <wa-callout
      [variant]="variant"
      [appearance]="appearance"
      [size]="size"
    >
      <div slot="icon" *ngIf="showIcon">Icon Content</div>
      {{ calloutText }}
    </wa-callout>
  `,
  standalone: true,
  imports: [WaCalloutDirective]
})
class TestHostComponent {
  variant?: string;
  appearance?: string;
  size?: string;
  calloutText = 'Callout Text';
  showIcon = false;
}

describe('WaCalloutDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let calloutElement: HTMLElement;
  let calloutDirective: WaCalloutDirective;

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

    // Get the wa-callout element
    calloutElement = hostFixture.nativeElement.querySelector('wa-callout');
    calloutDirective = hostFixture.debugElement.query(sel => sel.nativeElement === calloutElement).injector.get(WaCalloutDirective);
  });

  it('should create the callout directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(calloutElement).toBeTruthy();
    expect(calloutDirective).toBeTruthy();
  });

  it('should set appearance attributes correctly', () => {
    hostComponent.variant = 'success';
    hostComponent.appearance = 'outlined filled';
    hostComponent.size = 'medium';
    hostFixture.detectChanges();

    expect(calloutElement.getAttribute('variant')).toBe('success');
    expect(calloutElement.getAttribute('appearance')).toBe('outlined filled');
    expect(calloutElement.getAttribute('size')).toBe('medium');
  });

  it('should project content correctly', () => {
    expect(calloutElement.textContent?.trim()).toBe('Callout Text');

    hostComponent.showIcon = true;
    hostFixture.detectChanges();

    const iconSlot = hostFixture.nativeElement.querySelector('[slot="icon"]');

    expect(iconSlot).toBeTruthy();
    expect(iconSlot.textContent?.trim()).toBe('Icon Content');
  });

  it('should expose the native element', () => {
    expect(calloutDirective.nativeElement).toBe(calloutElement);
  });

  it('should handle different variant values', () => {
    const variants = ['brand', 'neutral', 'success', 'warning', 'danger', 'inherit'];

    variants.forEach(variant => {
      hostComponent.variant = variant;
      hostFixture.detectChanges();
      expect(calloutElement.getAttribute('variant')).toBe(variant);
    });
  });

  it('should handle different appearance values', () => {
    const appearances = ['accent', 'filled', 'outlined', 'plain', 'outlined filled', 'outlined accent'];

    appearances.forEach(appearance => {
      hostComponent.appearance = appearance;
      hostFixture.detectChanges();
      expect(calloutElement.getAttribute('appearance')).toBe(appearance);
    });
  });

  it('should handle different size values', () => {
    const sizes = ['small', 'medium', 'large', 'inherit'];

    sizes.forEach(size => {
      hostComponent.size = size;
      hostFixture.detectChanges();
      expect(calloutElement.getAttribute('size')).toBe(size);
    });
  });
});
