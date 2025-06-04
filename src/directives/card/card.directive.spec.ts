import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaCardDirective } from './card.directive';

// Create a test host component to test the card directive
@Component({
  template: `
    <wa-card
      [appearance]="appearance"
      [size]="size"
      [withHeader]="withHeader"
      [withImage]="withImage"
      [withFooter]="withFooter"
    >
      <div slot="header" *ngIf="showHeader">Header Content</div>
      <img slot="image" *ngIf="showImage" src="test.jpg" alt="Test Image">
      {{ cardText }}
      <div slot="footer" *ngIf="showFooter">Footer Content</div>
    </wa-card>
  `,
  standalone: true,
  imports: [WaCardDirective]
})
class TestHostComponent {
  appearance?: string;
  size?: string;
  withHeader?: boolean;
  withImage?: boolean;
  withFooter?: boolean;
  cardText = 'Card Text';
  showHeader = false;
  showImage = false;
  showFooter = false;
}

describe('WaCardDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let cardElement: HTMLElement;
  let cardDirective: WaCardDirective;

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

    // Get the wa-card element
    cardElement = hostFixture.nativeElement.querySelector('wa-card');
    cardDirective = hostFixture.debugElement.query(sel => sel.nativeElement === cardElement).injector.get(WaCardDirective);
  });

  it('should create the card directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(cardElement).toBeTruthy();
    expect(cardDirective).toBeTruthy();
  });

  it('should set appearance attributes correctly', () => {
    hostComponent.appearance = 'outlined';
    hostComponent.size = 'medium';
    hostFixture.detectChanges();

    expect(cardElement.getAttribute('appearance')).toBe('outlined');
    expect(cardElement.getAttribute('size')).toBe('medium');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.withHeader = true;
    hostComponent.withImage = true;
    hostComponent.withFooter = true;
    hostFixture.detectChanges();

    expect(cardElement.hasAttribute('with-header')).toBeTrue();
    expect(cardElement.hasAttribute('with-image')).toBeTrue();
    expect(cardElement.hasAttribute('with-footer')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.withHeader = false;
    hostComponent.withImage = false;
    hostComponent.withFooter = false;
    hostFixture.detectChanges();

    expect(cardElement.hasAttribute('with-header')).toBeFalse();
    expect(cardElement.hasAttribute('with-image')).toBeFalse();
    expect(cardElement.hasAttribute('with-footer')).toBeFalse();
  });

  it('should project content correctly', () => {
    expect(cardElement.textContent?.trim()).toBe('Card Text');

    hostComponent.showHeader = true;
    hostComponent.showImage = true;
    hostComponent.showFooter = true;
    hostFixture.detectChanges();

    const headerSlot = hostFixture.nativeElement.querySelector('[slot="header"]');
    const imageSlot = hostFixture.nativeElement.querySelector('[slot="image"]');
    const footerSlot = hostFixture.nativeElement.querySelector('[slot="footer"]');

    expect(headerSlot).toBeTruthy();
    expect(headerSlot.textContent?.trim()).toBe('Header Content');
    expect(imageSlot).toBeTruthy();
    expect(footerSlot).toBeTruthy();
    expect(footerSlot.textContent?.trim()).toBe('Footer Content');
  });

  it('should expose the native element', () => {
    expect(cardDirective.nativeElement).toBe(cardElement);
  });

  it('should handle different appearance values', () => {
    const appearances = ['accent', 'filled', 'outlined', 'plain'];

    appearances.forEach(appearance => {
      hostComponent.appearance = appearance;
      hostFixture.detectChanges();
      expect(cardElement.getAttribute('appearance')).toBe(appearance);
    });
  });

  it('should handle different size values', () => {
    const sizes = ['small', 'medium', 'large', 'inherit'];

    sizes.forEach(size => {
      hostComponent.size = size;
      hostFixture.detectChanges();
      expect(cardElement.getAttribute('size')).toBe(size);
    });
  });
});
