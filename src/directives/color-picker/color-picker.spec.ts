import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaColorPickerDirective } from './color-picker.directive';

// Create a test host component for the color picker directive
@Component({
  template: `
    <wa-color-picker
      [label]="label"
      [hint]="hint"
      [value]="value"
      [format]="format"
      [withoutFormatToggle]="noFormatToggle"
      [opacity]="opacity"
      [uppercase]="uppercase"
      [size]="size"
      [disabled]="disabled"
      [required]="required"
      [name]="name"
      [form]="form"
      [swatches]="swatches"
      [color]="color"
      [backgroundColor]="backgroundColor"
      [fontSize]="fontSize"
      [swatchSize]="swatchSize"
      [swatchSpacing]="swatchSpacing"
      [borderRadius]="borderRadius"
      [dropdownWidth]="dropdownWidth"
      [dropdownHeight]="dropdownHeight"
      (wa-change)="onChange($event)"
      (wa-input)="onInput($event)"
      (wa-focus)="onFocus($event)"
      (wa-blur)="onBlur($event)"
      (wa-invalid)="onInvalid($event)"
    ></wa-color-picker>
  `,
  standalone: true,
  imports: [WaColorPickerDirective, FormsModule]
})
class TestHostComponent {
  label?: string;
  hint?: string;
  value?: string | null;
  format?: 'hex' | 'rgb' | 'hsl' | 'hsv' | string;
  noFormatToggle?: boolean | string;
  opacity?: boolean | string;
  uppercase?: boolean | string;
  size?: 'small' | 'medium' | 'large' | 'inherit' | string;
  disabled?: boolean | string;
  required?: boolean | string;
  name?: string | null;
  form?: string | null;
  swatches?: string | string[];

  color?: string;
  backgroundColor?: string;
  fontSize?: string;

  swatchSize?: string;
  swatchSpacing?: string;
  borderRadius?: string;
  dropdownWidth?: string;
  dropdownHeight?: string;

  changeEventCalled = false;
  inputEventCalled = false;
  focusEventCalled = false;
  blurEventCalled = false;
  invalidEventCalled = false;

  onChange(event: Event) {
    this.changeEventCalled = true;
  }

  onInput(event: Event) {
    this.inputEventCalled = true;
  }

  onFocus(event: Event) {
    this.focusEventCalled = true;
  }

  onBlur(event: Event) {
    this.blurEventCalled = true;
  }

  onInvalid(event: Event) {
    this.invalidEventCalled = true;
  }
}

describe('WaColorPickerDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let colorPickerElement: HTMLElement;

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

    // Get the wa-color-picker element
    colorPickerElement = hostFixture.nativeElement.querySelector('wa-color-picker');
  });

  it('should create the color picker directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(colorPickerElement).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.label = 'Test Label';
    hostComponent.hint = 'Test Hint';
    hostComponent.value = '#ff0000';
    hostComponent.format = 'rgb';
    hostComponent.name = 'color-field';
    hostComponent.form = 'color-form';
    hostComponent.size = 'large';
    hostFixture.detectChanges();

    expect(colorPickerElement.getAttribute('label')).toBe('Test Label');
    expect(colorPickerElement.getAttribute('hint')).toBe('Test Hint');
    expect(colorPickerElement.getAttribute('value')).toBe('#ff0000');
    expect(colorPickerElement.getAttribute('format')).toBe('rgb');
    expect(colorPickerElement.getAttribute('name')).toBe('color-field');
    expect(colorPickerElement.getAttribute('form')).toBe('color-form');
    expect(colorPickerElement.getAttribute('size')).toBe('large');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.noFormatToggle = true;
    hostComponent.opacity = true;
    hostComponent.uppercase = true;
    hostComponent.disabled = true;
    hostComponent.required = true;
    hostFixture.detectChanges();

    expect(colorPickerElement.hasAttribute('without-format-toggle')).toBe(true);
    expect(colorPickerElement.hasAttribute('opacity')).toBe(true);
    expect(colorPickerElement.hasAttribute('uppercase')).toBe(true);
    expect(colorPickerElement.hasAttribute('disabled')).toBe(true);
    expect(colorPickerElement.hasAttribute('required')).toBe(true);

    hostComponent.noFormatToggle = false;
    hostComponent.opacity = false;
    hostComponent.uppercase = false;
    hostComponent.disabled = false;
    hostComponent.required = false;
    hostFixture.detectChanges();

    expect(colorPickerElement.hasAttribute('without-format-toggle')).toBe(false);
    expect(colorPickerElement.hasAttribute('opacity')).toBe(false);
    expect(colorPickerElement.hasAttribute('uppercase')).toBe(false);
    expect(colorPickerElement.hasAttribute('disabled')).toBe(false);
    expect(colorPickerElement.hasAttribute('required')).toBe(false);
  });

  it('should set swatches correctly', () => {
    // Test string swatches
    hostComponent.swatches = '#ff0000;#00ff00;#0000ff';
    hostFixture.detectChanges();
    expect(colorPickerElement.getAttribute('swatches')).toBe('#ff0000;#00ff00;#0000ff');

    // Test array swatches
    hostComponent.swatches = ['#ff0000', '#00ff00', '#0000ff'];
    hostFixture.detectChanges();
    expect(colorPickerElement.getAttribute('swatches')).toBe('#ff0000;#00ff00;#0000ff');
  });

  it('should set direct styling correctly', () => {
    hostComponent.color = '#333333';
    hostComponent.backgroundColor = '#f8f9fa';
    hostComponent.fontSize = '16px';
    hostFixture.detectChanges();

    expect(colorPickerElement.style.color).toBe('rgb(51, 51, 51)');
    expect(colorPickerElement.style.backgroundColor).toBe('rgb(248, 249, 250)');
    expect(colorPickerElement.style.fontSize).toBe('16px');
  });

  it('should set CSS custom properties correctly', () => {
    hostComponent.swatchSize = '24px';
    hostComponent.swatchSpacing = '8px';
    hostComponent.borderRadius = '8px';
    hostComponent.dropdownWidth = '300px';
    hostComponent.dropdownHeight = '250px';
    hostFixture.detectChanges();

    expect(colorPickerElement.style.getPropertyValue('--swatch-size')).toBe('24px');
    expect(colorPickerElement.style.getPropertyValue('--swatch-spacing')).toBe('8px');
    expect(colorPickerElement.style.getPropertyValue('--border-radius')).toBe('8px');
    expect(colorPickerElement.style.getPropertyValue('--dropdown-width')).toBe('300px');
    expect(colorPickerElement.style.getPropertyValue('--dropdown-height')).toBe('250px');
  });

  it('should emit events correctly', () => {
    // Simulate change event
    colorPickerElement.dispatchEvent(new Event('wa-change'));
    expect(hostComponent.changeEventCalled).toBe(true);

    // Simulate input event
    colorPickerElement.dispatchEvent(new Event('wa-input'));
    expect(hostComponent.inputEventCalled).toBe(true);

    // Simulate focus event
    colorPickerElement.dispatchEvent(new Event('wa-focus'));
    expect(hostComponent.focusEventCalled).toBe(true);

    // Simulate blur event
    colorPickerElement.dispatchEvent(new Event('wa-blur'));
    expect(hostComponent.blurEventCalled).toBe(true);

    // Simulate wa-invalid event
    colorPickerElement.dispatchEvent(new Event('wa-invalid'));
    expect(hostComponent.invalidEventCalled).toBe(true);
  });
});
