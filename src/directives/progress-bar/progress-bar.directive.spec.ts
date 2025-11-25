import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaProgressBarDirective } from './progress-bar.directive';
import { FormsModule } from '@angular/forms';

// Create a test host component to test the progress bar directive
@Component({
  template: `
    <wa-progress-bar
      [(ngModel)]="value"
      [indeterminate]="indeterminate"
      [label]="label"
      [indicatorColor]="indicatorColor"
      [display]="display"
      (focusEvent)="onFocus($event)"
      (blurEvent)="onBlur($event)"
    >
      {{ displayText }}
    </wa-progress-bar>
  `,
  standalone: true,
  imports: [WaProgressBarDirective, FormsModule]
})
class TestHostComponent {
  value?: number;
  indeterminate?: boolean | string;
  label?: string;
  indicatorColor?: string;
  display?: string;
  displayText = '50%';

  onFocus(event: FocusEvent): void {}
  onBlur(event: FocusEvent): void {}
}

describe('WaProgressBarDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let progressBarElement: HTMLElement;
  let progressBarDirective: WaProgressBarDirective;

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

    // Get the wa-progress-bar element
    progressBarElement = hostFixture.nativeElement.querySelector('wa-progress-bar');
    progressBarDirective = hostFixture.debugElement.query(sel => sel.nativeElement === progressBarElement).injector.get(WaProgressBarDirective);
  });

  it('should create the progress bar directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(progressBarElement).toBeTruthy();
    expect(progressBarDirective).toBeTruthy();
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.value = 75;
    hostFixture.detectChanges();
    expect(progressBarElement.getAttribute('value')).toBe('75');
  });

  it('should set string attributes correctly', () => {
    hostComponent.label = 'Upload Progress';
    hostFixture.detectChanges();
    expect(progressBarElement.getAttribute('label')).toBe('Upload Progress');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.indeterminate = true;
    hostFixture.detectChanges();
    expect(progressBarElement.hasAttribute('indeterminate')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.indeterminate = false;
    hostFixture.detectChanges();
    expect(progressBarElement.hasAttribute('indeterminate')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.indeterminate = 'true';
    hostFixture.detectChanges();
    expect(progressBarElement.hasAttribute('indeterminate')).toBeTrue();
  });

  it('should set style attributes correctly', () => {
    hostComponent.indicatorColor = '#3366ff';
    hostComponent.display = 'block';
    hostFixture.detectChanges();

    expect(progressBarElement.style.getPropertyValue('--indicator-color')).toBe('#3366ff');
    expect(progressBarElement.style.getPropertyValue('--display')).toBe('block');
  });

  it('should project content correctly', () => {
    expect(progressBarElement.textContent?.trim()).toBe('50%');

    hostComponent.displayText = '75%';
    hostFixture.detectChanges();
    expect(progressBarElement.textContent?.trim()).toBe('75%');
  });

  it('should expose the native element', () => {
    expect(progressBarDirective.nativeElement).toBe(progressBarElement);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onFocus');
    spyOn(hostComponent, 'onBlur');

    // Create mock events
    const focusEvent = new FocusEvent('focusNative');
    const blurEvent = new FocusEvent('blurNative');

    // Dispatch events on the native element
    progressBarElement.dispatchEvent(focusEvent);
    progressBarElement.dispatchEvent(blurEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onFocus).toHaveBeenCalled();
    expect(hostComponent.onBlur).toHaveBeenCalled();
  });

  it('should implement ControlValueAccessor correctly', () => {
    // Test writeValue
    progressBarDirective.writeValue(60);
    expect(progressBarElement.getAttribute('value')).toBe('60');

    // Test setDisabledState
    progressBarDirective.setDisabledState(true);
    expect(progressBarElement.hasAttribute('disabled')).toBeTrue();

    progressBarDirective.setDisabledState(false);
    expect(progressBarElement.hasAttribute('disabled')).toBeFalse();
  });
});
