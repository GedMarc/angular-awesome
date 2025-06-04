import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaSliderDirective } from './slider.directive';
import { FormsModule } from '@angular/forms';

// Create a test host component to test the slider directive
@Component({
  template: `
    <wa-slider
      [(ngModel)]="value"
      [min]="min"
      [max]="max"
      [step]="step"
      [disabled]="disabled"
      [tooltip]="tooltip"
      [label]="label"
      [hint]="hint"
      [name]="name"
      [form]="form"
      [withLabel]="withLabel"
      [withHint]="withHint"
      [trackColorActive]="trackColorActive"
      [trackColorInactive]="trackColorInactive"
      [trackHeight]="trackHeight"
      [trackActiveOffset]="trackActiveOffset"
      [thumbColor]="thumbColor"
      [thumbGap]="thumbGap"
      [thumbShadow]="thumbShadow"
      [thumbSize]="thumbSize"
      [tooltipOffset]="tooltipOffset"
      (blurEvent)="onBlur($event)"
      (focusEvent)="onFocus($event)"
      (changeEvent)="onChange($event)"
      (inputEvent)="onInput($event)"
      (invalidEvent)="onInvalid($event)"
    >
      {{ sliderContent }}
    </wa-slider>
  `,
  standalone: true,
  imports: [WaSliderDirective, FormsModule]
})
class TestHostComponent {
  value?: number;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  disabled?: boolean | string;
  tooltip?: 'top' | 'bottom' | 'none' | string;
  label?: string;
  hint?: string;
  name?: string;
  form?: string;
  withLabel?: boolean | string;
  withHint?: boolean | string;
  trackColorActive?: string;
  trackColorInactive?: string;
  trackHeight?: string;
  trackActiveOffset?: string;
  thumbColor?: string;
  thumbGap?: string;
  thumbShadow?: string;
  thumbSize?: string;
  tooltipOffset?: string;
  sliderContent = 'Slider Content';

  onBlur(event: FocusEvent): void {}
  onFocus(event: FocusEvent): void {}
  onChange(event: Event): void {}
  onInput(event: Event): void {}
  onInvalid(event: CustomEvent): void {}
}

describe('WaSliderDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let sliderElement: HTMLElement;
  let sliderDirective: WaSliderDirective;

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

    // Get the wa-slider element
    sliderElement = hostFixture.nativeElement.querySelector('wa-slider');
    sliderDirective = hostFixture.debugElement.query(sel => sel.nativeElement === sliderElement).injector.get(WaSliderDirective);
  });

  it('should create the slider directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(sliderElement).toBeTruthy();
    expect(sliderDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.label = 'Volume';
    hostComponent.hint = 'Adjust the volume';
    hostComponent.name = 'volume-slider';
    hostComponent.form = 'audio-form';
    hostComponent.tooltip = 'bottom';
    hostFixture.detectChanges();

    expect(sliderElement.getAttribute('label')).toBe('Volume');
    expect(sliderElement.getAttribute('hint')).toBe('Adjust the volume');
    expect(sliderElement.getAttribute('name')).toBe('volume-slider');
    expect(sliderElement.getAttribute('form')).toBe('audio-form');
    expect(sliderElement.getAttribute('tooltip')).toBe('bottom');
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.min = 0;
    hostComponent.max = 100;
    hostComponent.step = 5;
    hostComponent.value = 50;
    hostFixture.detectChanges();

    expect(sliderElement.getAttribute('min')).toBe('0');
    expect(sliderElement.getAttribute('max')).toBe('100');
    expect(sliderElement.getAttribute('step')).toBe('5');
    expect(sliderElement.getAttribute('value')).toBe('50');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.disabled = true;
    hostComponent.withLabel = true;
    hostComponent.withHint = true;
    hostFixture.detectChanges();

    expect(sliderElement.hasAttribute('disabled')).toBeTrue();
    expect(sliderElement.hasAttribute('with-label')).toBeTrue();
    expect(sliderElement.hasAttribute('with-hint')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.disabled = false;
    hostComponent.withLabel = false;
    hostComponent.withHint = false;
    hostFixture.detectChanges();

    expect(sliderElement.hasAttribute('disabled')).toBeFalse();
    expect(sliderElement.hasAttribute('with-label')).toBeFalse();
    expect(sliderElement.hasAttribute('with-hint')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.disabled = 'true';
    hostComponent.withLabel = '';
    hostFixture.detectChanges();

    expect(sliderElement.hasAttribute('disabled')).toBeTrue();
    expect(sliderElement.hasAttribute('with-label')).toBeTrue();
  });

  it('should set style attributes correctly', () => {
    hostComponent.trackColorActive = '#3366ff';
    hostComponent.trackColorInactive = '#cccccc';
    hostComponent.trackHeight = '6px';
    hostComponent.trackActiveOffset = '2px';
    hostComponent.thumbColor = '#ffffff';
    hostComponent.thumbGap = '2px';
    hostComponent.thumbShadow = '0 0 5px rgba(0,0,0,0.2)';
    hostComponent.thumbSize = '20px';
    hostComponent.tooltipOffset = '10px';
    hostFixture.detectChanges();

    expect(sliderElement.style.getPropertyValue('--track-color-active')).toBe('#3366ff');
    expect(sliderElement.style.getPropertyValue('--track-color-inactive')).toBe('#cccccc');
    expect(sliderElement.style.getPropertyValue('--track-height')).toBe('6px');
    expect(sliderElement.style.getPropertyValue('--track-active-offset')).toBe('2px');
    expect(sliderElement.style.getPropertyValue('--thumb-color')).toBe('#ffffff');
    expect(sliderElement.style.getPropertyValue('--thumb-gap')).toBe('2px');
    expect(sliderElement.style.getPropertyValue('--thumb-shadow')).toBe('0 0 5px rgba(0,0,0,0.2)');
    expect(sliderElement.style.getPropertyValue('--thumb-size')).toBe('20px');
    expect(sliderElement.style.getPropertyValue('--tooltip-offset')).toBe('10px');
  });

  it('should project content correctly', () => {
    expect(sliderElement.textContent?.trim()).toBe('Slider Content');

    hostComponent.sliderContent = 'Updated Content';
    hostFixture.detectChanges();
    expect(sliderElement.textContent?.trim()).toBe('Updated Content');
  });

  it('should expose methods for programmatic interaction', () => {
    // Mock the native element methods
    spyOn(sliderElement, 'focus');
    spyOn(sliderElement, 'blur');
    spyOn(sliderElement, 'stepUp');
    spyOn(sliderElement, 'stepDown');

    // Call the directive methods
    sliderDirective.focus();
    sliderDirective.blur();
    sliderDirective.stepUp();
    sliderDirective.stepDown();

    // Verify the methods were called
    expect(sliderElement.focus).toHaveBeenCalled();
    expect(sliderElement.blur).toHaveBeenCalled();
    expect(sliderElement.stepUp).toHaveBeenCalled();
    expect(sliderElement.stepDown).toHaveBeenCalled();
  });

  it('should expose the native element', () => {
    expect(sliderDirective.nativeElement).toBe(sliderElement);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onBlur');
    spyOn(hostComponent, 'onFocus');
    spyOn(hostComponent, 'onChange');
    spyOn(hostComponent, 'onInput');
    spyOn(hostComponent, 'onInvalid');

    // Create mock events
    const blurEvent = new FocusEvent('blur');
    const focusEvent = new FocusEvent('focus');
    const changeEvent = new Event('change');
    const inputEvent = new Event('input');
    const invalidEvent = new CustomEvent('wa-invalid');

    // Dispatch events on the native element
    sliderElement.dispatchEvent(blurEvent);
    sliderElement.dispatchEvent(focusEvent);
    sliderElement.dispatchEvent(changeEvent);
    sliderElement.dispatchEvent(inputEvent);
    sliderElement.dispatchEvent(invalidEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onBlur).toHaveBeenCalled();
    expect(hostComponent.onFocus).toHaveBeenCalled();
    expect(hostComponent.onChange).toHaveBeenCalled();
    expect(hostComponent.onInput).toHaveBeenCalled();
    expect(hostComponent.onInvalid).toHaveBeenCalled();
  });

  it('should implement ControlValueAccessor correctly', () => {
    // Test writeValue
    sliderDirective.writeValue(75);
    expect(sliderElement.getAttribute('value')).toBe('75');

    // Test setDisabledState
    sliderDirective.setDisabledState(true);
    expect(sliderElement.hasAttribute('disabled')).toBeTrue();

    sliderDirective.setDisabledState(false);
    expect(sliderElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should handle different tooltip values', () => {
    const tooltipValues = ['top', 'bottom', 'none'];

    tooltipValues.forEach(tooltip => {
      hostComponent.tooltip = tooltip;
      hostFixture.detectChanges();
      expect(sliderElement.getAttribute('tooltip')).toBe(tooltip);
    });
  });
});
