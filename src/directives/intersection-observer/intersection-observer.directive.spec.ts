import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaIntersectionObserverDirective } from './intersection-observer.directive';

@Component({
  template: `
    <wa-intersection-observer
      [threshold]="threshold"
      [rootMargin]="rootMargin"
      [root]="root"
      [intersectClass]="intersectClass"
      [once]="once"
      [disabled]="disabled"
    >
      <div class="observed-content">Observed Content</div>
    </wa-intersection-observer>
  `,
  standalone: true,
  imports: [WaIntersectionObserverDirective]
})
class TestHostComponent {
  threshold?: number | number[] | string;
  rootMargin?: string;
  root?: string;
  intersectClass?: string;
  once?: boolean | string;
  disabled?: boolean | string;
}

describe('WaIntersectionObserverDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let observerElement: HTMLElement;

  beforeEach(async () => {
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

    observerElement = hostFixture.nativeElement.querySelector('wa-intersection-observer');
  });

  it('should create the directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(observerElement).toBeTruthy();
  });

  it('should set threshold attribute with number', () => {
    hostComponent.threshold = 0.5;
    hostFixture.detectChanges();
    expect(observerElement.getAttribute('threshold')).toBe('0.5');
  });

  it('should set threshold attribute with array', () => {
    hostComponent.threshold = [0, 0.25, 0.5, 1];
    hostFixture.detectChanges();
    expect(observerElement.getAttribute('threshold')).toBe('0,0.25,0.5,1');
  });

  it('should set root-margin attribute', () => {
    hostComponent.rootMargin = '10px 20px';
    hostFixture.detectChanges();
    expect(observerElement.getAttribute('root-margin')).toBe('10px 20px');
  });

  it('should set root attribute', () => {
    hostComponent.root = '#my-container';
    hostFixture.detectChanges();
    expect(observerElement.getAttribute('root')).toBe('#my-container');
  });

  it('should set intersect-class attribute', () => {
    hostComponent.intersectClass = 'is-visible';
    hostFixture.detectChanges();
    expect(observerElement.getAttribute('intersect-class')).toBe('is-visible');
  });

  it('should set once boolean attribute', () => {
    hostComponent.once = true;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('once')).toBeTrue();

    hostComponent.once = false;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('once')).toBeFalse();
  });

  it('should set disabled boolean attribute', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('disabled')).toBeTrue();

    hostComponent.disabled = false;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.once = 'true';
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('once')).toBeTrue();

    hostComponent.once = '';
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('once')).toBeTrue();
  });

  it('should project content correctly', () => {
    expect(observerElement.textContent).toContain('Observed Content');
  });
});

