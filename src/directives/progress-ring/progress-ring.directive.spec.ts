import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaProgressRingDirective } from './progress-ring.directive';
import { FormsModule } from '@angular/forms';

// Create a test host component to test the progress ring directive
@Component({
  template: `
    <wa-progress-ring
      [(ngModel)]="value"
      [label]="label"
      [size]="size"
      [trackWidth]="trackWidth"
      [trackColor]="trackColor"
      [indicatorWidth]="indicatorWidth"
      [indicatorColor]="indicatorColor"
      [indicatorTransitionDuration]="indicatorTransitionDuration"
      (focusEvent)="onFocus($event)"
      (blurEvent)="onBlur($event)"
    >
      {{ displayText }}
    </wa-progress-ring>
  `,
  standalone: true,
  imports: [WaProgressRingDirective, FormsModule]
})
class TestHostComponent {
  value?: number;
  label?: string;
  size?: string;
  trackWidth?: string;
  trackColor?: string;
  indicatorWidth?: string;
  indicatorColor?: string;
  indicatorTransitionDuration?: string;
  displayText = '50%';

  onFocus(event: FocusEvent): void {}
  onBlur(event: FocusEvent): void {}
}

describe('WaProgressRingDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let progressRingElement: HTMLElement;
  let progressRingDirective: WaProgressRingDirective;

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

    // Get the wa-progress-ring element
    progressRingElement = hostFixture.nativeElement.querySelector('wa-progress-ring');
    progressRingDirective = hostFixture.debugElement.query(sel => sel.nativeElement === progressRingElement).injector.get(WaProgressRingDirective);
  });

  it('should create the progress ring directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(progressRingElement).toBeTruthy();
    expect(progressRingDirective).toBeTruthy();
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.value = 75;
    hostFixture.detectChanges();
    expect(progressRingElement.getAttribute('value')).toBe('75');
  });

  it('should set string attributes correctly', () => {
    hostComponent.label = 'Upload Progress';
    hostFixture.detectChanges();
    expect(progressRingElement.getAttribute('label')).toBe('Upload Progress');
  });

  it('should set style attributes correctly', () => {
    hostComponent.size = '150px';
    hostComponent.trackWidth = '4px';
    hostComponent.trackColor = '#eee';
    hostComponent.indicatorWidth = '8px';
    hostComponent.indicatorColor = '#2196f3';
    hostComponent.indicatorTransitionDuration = '300ms';
    hostFixture.detectChanges();

    expect(progressRingElement.style.getPropertyValue('--size')).toBe('150px');
    expect(progressRingElement.style.getPropertyValue('--track-width')).toBe('4px');
    expect(progressRingElement.style.getPropertyValue('--track-color')).toBe('#eee');
    expect(progressRingElement.style.getPropertyValue('--indicator-width')).toBe('8px');
    expect(progressRingElement.style.getPropertyValue('--indicator-color')).toBe('#2196f3');
    expect(progressRingElement.style.getPropertyValue('--indicator-transition-duration')).toBe('300ms');
  });

  it('should project content correctly', () => {
    expect(progressRingElement.textContent?.trim()).toBe('50%');

    hostComponent.displayText = '75%';
    hostFixture.detectChanges();
    expect(progressRingElement.textContent?.trim()).toBe('75%');
  });

  it('should expose the native element', () => {
    expect(progressRingDirective.nativeElement).toBe(progressRingElement);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onFocus');
    spyOn(hostComponent, 'onBlur');

    // Create mock events
    const focusEvent = new FocusEvent('focus');
    const blurEvent = new FocusEvent('blur');

    // Dispatch events on the native element
    progressRingElement.dispatchEvent(focusEvent);
    progressRingElement.dispatchEvent(blurEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onFocus).toHaveBeenCalled();
    expect(hostComponent.onBlur).toHaveBeenCalled();
  });

  it('should implement ControlValueAccessor correctly', () => {
    // Test writeValue
    progressRingDirective.writeValue(60);
    expect(progressRingElement.getAttribute('value')).toBe('60');

    // Test setDisabledState
    progressRingDirective.setDisabledState(true);
    expect(progressRingElement.hasAttribute('disabled')).toBeTrue();

    progressRingDirective.setDisabledState(false);
    expect(progressRingElement.hasAttribute('disabled')).toBeFalse();
  });
});
