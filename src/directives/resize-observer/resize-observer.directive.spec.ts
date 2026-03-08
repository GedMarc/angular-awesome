import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaResizeObserverDirective } from './resize-observer.directive';

@Component({
  template: `
    <wa-resize-observer
      [disabled]="disabled"
      (wa-resize)="onResize($event)"
    >
      <div class="observed-content">{{ content }}</div>
    </wa-resize-observer>
  `,
  standalone: true,
  imports: [WaResizeObserverDirective]
})
class TestHostComponent {
  disabled?: boolean | string;
  content = 'Observed Content';
  resizeEvents: CustomEvent[] = [];

  onResize(event: CustomEvent) {
    this.resizeEvents.push(event);
  }
}

describe('WaResizeObserverDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let observerElement: HTMLElement;
  let observerDirective: WaResizeObserverDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    observerElement = hostFixture.nativeElement.querySelector('wa-resize-observer');
    observerDirective = hostFixture.debugElement.query(
      sel => sel.nativeElement === observerElement
    ).injector.get(WaResizeObserverDirective);
  });

  it('should create the resize-observer directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(observerElement).toBeTruthy();
    expect(observerDirective).toBeTruthy();
  });

  it('should set disabled attribute when true', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should not set disabled attribute when false', () => {
    hostComponent.disabled = false;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should handle string values for disabled attribute', () => {
    hostComponent.disabled = 'true';
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('disabled')).toBeTrue();

    hostComponent.disabled = '';
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should project content correctly', () => {
    const content = observerElement.querySelector('.observed-content');
    expect(content).toBeTruthy();
    expect(content?.textContent?.trim()).toBe('Observed Content');
  });

  it('should emit wa-resize event when element dispatches it', () => {
    const customEvent = new CustomEvent('wa-resize', {
      bubbles: true,
      detail: { entries: [] }
    });
    observerElement.dispatchEvent(customEvent);

    // Event fires twice: once from native DOM event, once from @Output re-emit
    expect(hostComponent.resizeEvents.length).toBe(2);
    expect(hostComponent.resizeEvents[0].detail).toEqual({ entries: [] });
  });

  it('should emit multiple wa-resize events', () => {
    for (let i = 0; i < 3; i++) {
      const event = new CustomEvent('wa-resize', {
        bubbles: true,
        detail: { index: i }
      });
      observerElement.dispatchEvent(event);
    }

    // Each dispatch triggers 2 events (DOM + @Output re-emit)
    expect(hostComponent.resizeEvents.length).toBe(6);
    expect(hostComponent.resizeEvents[4].detail).toEqual({ index: 2 });
  });

  it('should update content projection when content changes', () => {
    hostComponent.content = 'Updated Content';
    hostFixture.detectChanges();

    const content = observerElement.querySelector('.observed-content');
    expect(content?.textContent?.trim()).toBe('Updated Content');
  });
});


