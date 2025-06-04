import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaCopyButtonDirective } from './copy-button.directive';

// Create a test host component to test the copy-button directive
@Component({
  template: `
    <wa-copy-button
      [value]="value"
      [from]="from"
      [copyLabel]="copyLabel"
      [successLabel]="successLabel"
      [errorLabel]="errorLabel"
      [feedbackDuration]="feedbackDuration"
      [tooltipPlacement]="tooltipPlacement"
      [disabled]="disabled"
      (waCopy)="onCopy()"
      (waError)="onError($event)"
    >
      <div slot="copy-icon" *ngIf="showCopyIcon">Copy Icon</div>
      <div slot="success-icon" *ngIf="showSuccessIcon">Success Icon</div>
      <div slot="error-icon" *ngIf="showErrorIcon">Error Icon</div>
    </wa-copy-button>
  `,
  standalone: true,
  imports: [WaCopyButtonDirective]
})
class TestHostComponent {
  value?: string;
  from?: string;
  copyLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  feedbackDuration?: number | string;
  tooltipPlacement?: string;
  disabled?: boolean | string;

  showCopyIcon = false;
  showSuccessIcon = false;
  showErrorIcon = false;

  onCopy(): void {}
  onError(error: Error): void {}
}

describe('WaCopyButtonDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let copyButtonElement: HTMLElement;
  let copyButtonDirective: WaCopyButtonDirective;

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

    // Get the wa-copy-button element
    copyButtonElement = hostFixture.nativeElement.querySelector('wa-copy-button');
    copyButtonDirective = hostFixture.debugElement.query(sel => sel.nativeElement === copyButtonElement).injector.get(WaCopyButtonDirective);
  });

  it('should create the copy-button directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(copyButtonElement).toBeTruthy();
    expect(copyButtonDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.value = 'test-value';
    hostComponent.from = 'test-from';
    hostComponent.copyLabel = 'test-copy-label';
    hostComponent.successLabel = 'test-success-label';
    hostComponent.errorLabel = 'test-error-label';
    hostComponent.tooltipPlacement = 'right';
    hostFixture.detectChanges();

    expect(copyButtonElement.getAttribute('value')).toBe('test-value');
    expect(copyButtonElement.getAttribute('from')).toBe('test-from');
    expect(copyButtonElement.getAttribute('copy-label')).toBe('test-copy-label');
    expect(copyButtonElement.getAttribute('success-label')).toBe('test-success-label');
    expect(copyButtonElement.getAttribute('error-label')).toBe('test-error-label');
    expect(copyButtonElement.getAttribute('tooltip-placement')).toBe('right');
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.feedbackDuration = 5000;
    hostFixture.detectChanges();

    expect(copyButtonElement.getAttribute('feedback-duration')).toBe('5000');
  });

  it('should handle string values for numeric attributes', () => {
    hostComponent.feedbackDuration = '5000';
    hostFixture.detectChanges();

    expect(copyButtonElement.getAttribute('feedback-duration')).toBe('5000');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();

    expect(copyButtonElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.disabled = false;
    hostFixture.detectChanges();

    expect(copyButtonElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.disabled = 'true';
    hostFixture.detectChanges();

    expect(copyButtonElement.hasAttribute('disabled')).toBeTrue();

    hostComponent.disabled = '';
    hostFixture.detectChanges();

    expect(copyButtonElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should project content correctly', () => {
    hostComponent.showCopyIcon = true;
    hostComponent.showSuccessIcon = true;
    hostComponent.showErrorIcon = true;
    hostFixture.detectChanges();

    const copyIconSlot = hostFixture.nativeElement.querySelector('[slot="copy-icon"]');
    const successIconSlot = hostFixture.nativeElement.querySelector('[slot="success-icon"]');
    const errorIconSlot = hostFixture.nativeElement.querySelector('[slot="error-icon"]');

    expect(copyIconSlot).toBeTruthy();
    expect(copyIconSlot.textContent?.trim()).toBe('Copy Icon');
    expect(successIconSlot).toBeTruthy();
    expect(successIconSlot.textContent?.trim()).toBe('Success Icon');
    expect(errorIconSlot).toBeTruthy();
    expect(errorIconSlot.textContent?.trim()).toBe('Error Icon');
  });

  it('should expose the native element', () => {
    expect(copyButtonDirective.nativeElement).toBe(copyButtonElement);
  });

  it('should expose methods for programmatic interaction', () => {
    // Mock the native element methods
    spyOn(copyButtonElement as any, 'copy');

    // Call the directive methods
    copyButtonDirective.copy();

    // Verify the native methods were called
    expect(copyButtonElement.copy).toHaveBeenCalled();
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onCopy');
    spyOn(hostComponent, 'onError');

    // Create mock events
    const copyEvent = new Event('waCopy');
    const errorEvent = new CustomEvent('waError', {
      detail: new Error('Copy failed')
    });

    // Dispatch events on the native element
    copyButtonElement.dispatchEvent(copyEvent);
    copyButtonElement.dispatchEvent(errorEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onCopy).toHaveBeenCalled();
    expect(hostComponent.onError).toHaveBeenCalledWith(new Error('Copy failed'));
  });

  it('should handle different tooltip placement values', () => {
    const placements = ['top', 'right', 'bottom', 'left'];

    placements.forEach(placement => {
      hostComponent.tooltipPlacement = placement;
      hostFixture.detectChanges();
      expect(copyButtonElement.getAttribute('tooltip-placement')).toBe(placement);
    });
  });
});
