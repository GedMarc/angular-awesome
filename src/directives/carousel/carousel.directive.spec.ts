import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaCarouselDirective } from './carousel.directive';
import { WaCarouselItemDirective } from './carousel-item.directive';

// Create a test host component to test the carousel directive
@Component({
  template: `
    <wa-carousel
      [loop]="loop"
      [navigation]="navigation"
      [pagination]="pagination"
      [autoplay]="autoplay"
      [autoplayInterval]="autoplayInterval"
      [slidesPerPage]="slidesPerPage"
      [slidesPerMove]="slidesPerMove"
      [orientation]="orientation"
      [mouseDragging]="mouseDragging"
      (waSlideChange)="onSlideChange($event)"
    >
      <div slot="previous-icon" *ngIf="showPreviousIcon">Previous Icon</div>
      <div slot="next-icon" *ngIf="showNextIcon">Next Icon</div>

      <wa-carousel-item *ngFor="let item of items">
        {{ item }}
      </wa-carousel-item>
    </wa-carousel>
  `,
  standalone: true,
  imports: [WaCarouselDirective, WaCarouselItemDirective]
})
class TestHostComponent {
  loop?: boolean | string;
  navigation?: boolean | string;
  pagination?: boolean | string;
  autoplay?: boolean | string;
  autoplayInterval?: number | string;
  slidesPerPage?: number | string;
  slidesPerMove?: number | string;
  orientation?: string;
  mouseDragging?: boolean | string;

  showPreviousIcon = false;
  showNextIcon = false;

  items = ['Item 1', 'Item 2', 'Item 3'];

  onSlideChange(event: { index: number }): void {}
}

describe('WaCarouselDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let carouselElement: HTMLElement;
  let carouselDirective: WaCarouselDirective;

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

    // Get the wa-carousel element
    carouselElement = hostFixture.nativeElement.querySelector('wa-carousel');
    carouselDirective = hostFixture.debugElement.query(sel => sel.nativeElement === carouselElement).injector.get(WaCarouselDirective);
  });

  it('should create the carousel directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(carouselElement).toBeTruthy();
    expect(carouselDirective).toBeTruthy();
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.loop = true;
    hostComponent.navigation = true;
    hostComponent.pagination = true;
    hostComponent.autoplay = true;
    hostComponent.mouseDragging = true;
    hostFixture.detectChanges();

    expect(carouselElement.hasAttribute('loop')).toBeTrue();
    expect(carouselElement.hasAttribute('navigation')).toBeTrue();
    expect(carouselElement.hasAttribute('pagination')).toBeTrue();
    expect(carouselElement.hasAttribute('autoplay')).toBeTrue();
    expect(carouselElement.hasAttribute('mouse-dragging')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.loop = false;
    hostComponent.navigation = false;
    hostComponent.pagination = false;
    hostComponent.autoplay = false;
    hostComponent.mouseDragging = false;
    hostFixture.detectChanges();

    expect(carouselElement.hasAttribute('loop')).toBeFalse();
    expect(carouselElement.hasAttribute('navigation')).toBeFalse();
    expect(carouselElement.hasAttribute('pagination')).toBeFalse();
    expect(carouselElement.hasAttribute('autoplay')).toBeFalse();
    expect(carouselElement.hasAttribute('mouse-dragging')).toBeFalse();
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.autoplayInterval = 5000;
    hostComponent.slidesPerPage = 2;
    hostComponent.slidesPerMove = 1;
    hostFixture.detectChanges();

    expect(carouselElement.getAttribute('autoplay-interval')).toBe('5000');
    expect(carouselElement.getAttribute('slides-per-page')).toBe('2');
    expect(carouselElement.getAttribute('slides-per-move')).toBe('1');
  });

  it('should handle string values for numeric attributes', () => {
    hostComponent.autoplayInterval = '5000';
    hostComponent.slidesPerPage = '2';
    hostComponent.slidesPerMove = '1';
    hostFixture.detectChanges();

    expect(carouselElement.getAttribute('autoplay-interval')).toBe('5000');
    expect(carouselElement.getAttribute('slides-per-page')).toBe('2');
    expect(carouselElement.getAttribute('slides-per-move')).toBe('1');
  });

  it('should set string attributes correctly', () => {
    hostComponent.orientation = 'vertical';
    hostFixture.detectChanges();

    expect(carouselElement.getAttribute('orientation')).toBe('vertical');
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.loop = 'true';
    hostComponent.navigation = '';
    hostFixture.detectChanges();

    expect(carouselElement.hasAttribute('loop')).toBeTrue();
    expect(carouselElement.hasAttribute('navigation')).toBeTrue();
  });

  it('should project content correctly', () => {
    // Check carousel items
    const carouselItems = hostFixture.nativeElement.querySelectorAll('wa-carousel-item');
    expect(carouselItems.length).toBe(3);
    expect(carouselItems[0].textContent?.trim()).toBe('Item 1');
    expect(carouselItems[1].textContent?.trim()).toBe('Item 2');
    expect(carouselItems[2].textContent?.trim()).toBe('Item 3');

    // Check navigation icon slots
    hostComponent.showPreviousIcon = true;
    hostComponent.showNextIcon = true;
    hostFixture.detectChanges();

    const previousIconSlot = hostFixture.nativeElement.querySelector('[slot="previous-icon"]');
    const nextIconSlot = hostFixture.nativeElement.querySelector('[slot="next-icon"]');

    expect(previousIconSlot).toBeTruthy();
    expect(previousIconSlot.textContent?.trim()).toBe('Previous Icon');
    expect(nextIconSlot).toBeTruthy();
    expect(nextIconSlot.textContent?.trim()).toBe('Next Icon');
  });

  it('should expose the native element', () => {
    expect(carouselDirective.nativeElement).toBe(carouselElement);
  });

  it('should expose methods for programmatic control', () => {
    // Mock the native element methods
    spyOn(carouselElement as any, 'next');
    spyOn(carouselElement as any, 'previous');
    spyOn(carouselElement as any, 'goToSlide');

    // Call the directive methods
    carouselDirective.next();
    carouselDirective.previous();
    carouselDirective.goToSlide(2);

    // Verify the native methods were called
    expect(carouselElement.next).toHaveBeenCalled();
    expect(carouselElement.previous).toHaveBeenCalled();
    expect(carouselElement.goToSlide).toHaveBeenCalledWith(2);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onSlideChange');

    // Create mock event
    const slideChangeEvent = new CustomEvent('slideChange', {
      detail: { index: 2 }
    });

    // Dispatch event on the native element
    carouselElement.dispatchEvent(slideChangeEvent);

    // Verify the host component event handler was called
    expect(hostComponent.onSlideChange).toHaveBeenCalledWith({ index: 2 });
  });
});
