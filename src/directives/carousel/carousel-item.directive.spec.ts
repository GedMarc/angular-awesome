import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaCarouselItemDirective } from './carousel-item.directive';

// Create a test host component to test the carousel-item directive
@Component({
  template: `
    <wa-carousel-item>
      {{ itemContent }}
    </wa-carousel-item>
  `,
  standalone: true,
  imports: [WaCarouselItemDirective]
})
class TestHostComponent {
  itemContent = 'Carousel Item Content';
}

describe('WaCarouselItemDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let carouselItemElement: HTMLElement;
  let carouselItemDirective: WaCarouselItemDirective;

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

    // Get the wa-carousel-item element
    carouselItemElement = hostFixture.nativeElement.querySelector('wa-carousel-item');
    carouselItemDirective = hostFixture.debugElement.query(sel => sel.nativeElement === carouselItemElement).injector.get(WaCarouselItemDirective);
  });

  it('should create the carousel-item directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(carouselItemElement).toBeTruthy();
    expect(carouselItemDirective).toBeTruthy();
  });

  it('should project content correctly', () => {
    expect(carouselItemElement.textContent?.trim()).toBe('Carousel Item Content');

    // Update content and check if it's projected
    hostComponent.itemContent = 'Updated Content';
    hostFixture.detectChanges();
    expect(carouselItemElement.textContent?.trim()).toBe('Updated Content');
  });

  it('should expose the native element', () => {
    expect(carouselItemDirective.nativeElement).toBe(carouselItemElement);
  });
});
