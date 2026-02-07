import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaComparisonDirective } from './comparison.directive';

// Create a test host component to test the comparison directive
@Component({
  template: `
    <wa-comparison
      [position]="position"
      (change)="onPositionChange($event)"
    >
      <div slot="before" *ngIf="showBefore">Before Content</div>
      <div slot="after" *ngIf="showAfter">After Content</div>
      <div slot="handle" *ngIf="showHandle">Handle Content</div>
    </wa-comparison>
  `,
  standalone: true,
  imports: [WaComparisonDirective]
})
class TestHostComponent {
  position?: number | string;
  showBefore = false;
  showAfter = false;
  showHandle = false;

  onPositionChange(position: number): void {}
}

describe('WaComparisonDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let comparisonElement: HTMLElement;
  let comparisonDirective: WaComparisonDirective;

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

    // Get the wa-comparison element
    comparisonElement = hostFixture.nativeElement.querySelector('wa-comparison');
    comparisonDirective = hostFixture.debugElement.query(sel => sel.nativeElement === comparisonElement).injector.get(WaComparisonDirective);
  });

  it('should create the comparison directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(comparisonElement).toBeTruthy();
    expect(comparisonDirective).toBeTruthy();
  });

  it('should set position attribute correctly with number value', () => {
    hostComponent.position = 25;
    hostFixture.detectChanges();

    expect(comparisonElement.getAttribute('position')).toBe('25');
  });

  it('should set position attribute correctly with string value', () => {
    hostComponent.position = '75';
    hostFixture.detectChanges();

    expect(comparisonElement.getAttribute('position')).toBe('75');
  });

  it('should not set position attribute with invalid string value', () => {
    hostComponent.position = 'invalid';
    hostFixture.detectChanges();

    expect(comparisonElement.hasAttribute('position')).toBeFalse();
  });

  it('should project content correctly', () => {
    hostComponent.showBefore = true;
    hostComponent.showAfter = true;
    hostComponent.showHandle = true;
    hostFixture.detectChanges();

    const beforeSlot = hostFixture.nativeElement.querySelector('[slot="before"]');
    const afterSlot = hostFixture.nativeElement.querySelector('[slot="after"]');
    const handleSlot = hostFixture.nativeElement.querySelector('[slot="handle"]');

    expect(beforeSlot).toBeTruthy();
    expect(beforeSlot.textContent?.trim()).toBe('Before Content');
    expect(afterSlot).toBeTruthy();
    expect(afterSlot.textContent?.trim()).toBe('After Content');
    expect(handleSlot).toBeTruthy();
    expect(handleSlot.textContent?.trim()).toBe('Handle Content');
  });

  it('should emit change event correctly', () => {
    spyOn(hostComponent, 'onPositionChange');

    // Create mock event
    const changeEvent = new CustomEvent('change', { detail: 42 });

    // Dispatch event on the native element
    comparisonElement.dispatchEvent(changeEvent);

    // Verify the host component event handler was called
    expect(hostComponent.onPositionChange).toHaveBeenCalledWith(42);
  });

  it('should expose the native element', () => {
    expect(comparisonDirective.nativeElement).toBe(comparisonElement);
  });
});
