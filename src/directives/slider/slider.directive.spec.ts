import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
      [label]="label"
      [hint]="hint"
      [name]="name"
      [form]="form"
      [withLabel]="withLabel"
      [withHint]="withHint"
      (wa-blur)="onBlur($event)"
      (wa-focus)="onFocus($event)"
      (wa-change)="onChange($event)"
      (wa-input)="onInput($event)"
      (wa-invalid)="onInvalid($event)"
    >
      {{ sliderContent }}
    </wa-slider>
  `,
  standalone: true,
  imports: [WaSliderDirective, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class TestHostComponent {
  value?: number;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  disabled?: boolean | string;
  label?: string;
  hint?: string;
  name?: string;
  form?: string;
  withLabel?: boolean | string;
  withHint?: boolean | string;
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
    hostFixture.detectChanges();

    expect(sliderElement.getAttribute('label')).toBe('Volume');
    expect(sliderElement.getAttribute('hint')).toBe('Adjust the volume');
    expect(sliderElement.getAttribute('name')).toBe('volume-slider');
    expect(sliderElement.getAttribute('form')).toBe('audio-form');
  });

  it('should set numeric attributes correctly', fakeAsync(() => {
    hostComponent.min = 0;
    hostComponent.max = 100;
    hostComponent.step = 5;
    hostComponent.value = 50;
    hostFixture.detectChanges();
    tick();
    hostFixture.detectChanges();

    expect(sliderElement.getAttribute('min')).toBe('0');
    expect(sliderElement.getAttribute('max')).toBe('100');
    expect(sliderElement.getAttribute('step')).toBe('5');
    expect(sliderElement.getAttribute('value')).toBe('50');
  }));

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

  it('should project content correctly', () => {
    expect(sliderElement.textContent?.trim()).toBe('Slider Content');

    hostComponent.sliderContent = 'Updated Content';
    hostFixture.detectChanges();
    expect(sliderElement.textContent?.trim()).toBe('Updated Content');
  });

  it('should expose methods for programmatic interaction', () => {
    // Mock the native element methods
    spyOn(sliderElement as any, 'focus');
    spyOn(sliderElement as any, 'blur');
    (sliderElement as any).stepUp = () => {};
    (sliderElement as any).stepDown = () => {};
    spyOn(sliderElement as any, 'stepUp');
    spyOn(sliderElement as any, 'stepDown');

    // Call the directive methods
    sliderDirective.focus();
    sliderDirective.blur();
    sliderDirective.stepUp();
    sliderDirective.stepDown();

    // Verify the methods were called
    expect(sliderElement.focus).toHaveBeenCalled();
    expect(sliderElement.blur).toHaveBeenCalled();
    expect((sliderElement as any).stepUp).toHaveBeenCalled();
    expect((sliderElement as any).stepDown).toHaveBeenCalled();
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
    const blurEvent = new FocusEvent('wa-blur');
    const focusEvent = new FocusEvent('wa-focus');
    const changeEvent = new Event('wa-change');
    const inputEvent = new Event('wa-input');
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

  it('should handle different orientation values', () => {
    const orientations = ['horizontal', 'vertical'];

    orientations.forEach(orientation => {
      sliderDirective.orientation = orientation;
      hostFixture.detectChanges();
      // Directive applies via applyInputs, check via directive property
      expect(sliderDirective.orientation).toBe(orientation);
    });
  });
});

