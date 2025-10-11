import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaSwitchDirective } from './switch.directive';

// Create a test host component for the switch directive
@Component({
  template: `
    <wa-switch
      waSwitch
      [disabled]="disabled"
      [hint]="hint"
      [size]="size"
      [backgroundColor]="backgroundColor"
      [backgroundColorChecked]="backgroundColorChecked"
      [borderColor]="borderColor"
      [borderColorChecked]="borderColorChecked"
      [borderStyle]="borderStyle"
      [borderWidth]="borderWidth"
      [boxShadow]="boxShadow"
      [height]="height"
      [thumbColor]="thumbColor"
      [thumbColorChecked]="thumbColorChecked"
      [thumbShadow]="thumbShadow"
      [thumbSize]="thumbSize"
      [width]="width"
      [(ngModel)]="isChecked"
      (changeEvent)="onChange($event)"
      (inputEvent)="onInput($event)"
      (focusEvent)="onFocus($event)"
      (blurEvent)="onBlur($event)"
    ></wa-switch>
  `,
  standalone: true,
  imports: [WaSwitchDirective, FormsModule]
})
class TestHostComponent {
  disabled?: boolean | string;
  hint?: string;
  size?: 'small' | 'medium' | 'large' | 'inherit' | string;

  backgroundColor?: string;
  backgroundColorChecked?: string;
  borderColor?: string;
  borderColorChecked?: string;
  borderStyle?: string;
  borderWidth?: string;
  boxShadow?: string;
  height?: string;
  thumbColor?: string;
  thumbColorChecked?: string;
  thumbShadow?: string;
  thumbSize?: string;
  width?: string;

  isChecked = false;

  changeEventCalled = false;
  inputEventCalled = false;
  focusEventCalled = false;
  blurEventCalled = false;

  onChange(event: Event) {
    this.changeEventCalled = true;
  }

  onInput(event: Event) {
    this.inputEventCalled = true;
  }

  onFocus(event: FocusEvent) {
    this.focusEventCalled = true;
  }

  onBlur(event: FocusEvent) {
    this.blurEventCalled = true;
  }
}

describe('WaSwitchDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let switchElement: HTMLElement;

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

    // Get the wa-switch element
    switchElement = hostFixture.nativeElement.querySelector('wa-switch');
  });

  it('should create the switch directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(switchElement).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.hint = 'Test hint';
    hostComponent.size = 'large';
    hostFixture.detectChanges();

    expect(switchElement.getAttribute('hint')).toBe('Test hint');
    expect(switchElement.getAttribute('size')).toBe('large');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();
    expect(switchElement.hasAttribute('disabled')).toBe(true);

    hostComponent.disabled = false;
    hostFixture.detectChanges();
    expect(switchElement.hasAttribute('disabled')).toBe(false);
  });

  it('should set style attributes correctly', () => {
    hostComponent.backgroundColor = '#f0f0f0';
    hostComponent.backgroundColorChecked = '#e0e0e0';
    hostComponent.borderColor = '#d0d0d0';
    hostComponent.borderColorChecked = '#c0c0c0';
    hostComponent.borderStyle = 'solid';
    hostComponent.borderWidth = '1px';
    hostComponent.boxShadow = '0 0 5px rgba(0,0,0,0.1)';
    hostComponent.height = '24px';
    hostComponent.thumbColor = '#ffffff';
    hostComponent.thumbColorChecked = '#f8f8f8';
    hostComponent.thumbShadow = '0 0 3px rgba(0,0,0,0.2)';
    hostComponent.thumbSize = '18px';
    hostComponent.width = '48px';
    hostFixture.detectChanges();

    expect(switchElement.style.getPropertyValue('--background-color')).toBe('#f0f0f0');
    expect(switchElement.style.getPropertyValue('--background-color-checked')).toBe('#e0e0e0');
    expect(switchElement.style.getPropertyValue('--border-color')).toBe('#d0d0d0');
    expect(switchElement.style.getPropertyValue('--border-color-checked')).toBe('#c0c0c0');
    expect(switchElement.style.getPropertyValue('--border-style')).toBe('solid');
    expect(switchElement.style.getPropertyValue('--border-width')).toBe('1px');
    expect(switchElement.style.getPropertyValue('--box-shadow')).toBe('0 0 5px rgba(0,0,0,0.1)');
    expect(switchElement.style.getPropertyValue('--height')).toBe('24px');
    expect(switchElement.style.getPropertyValue('--thumb-color')).toBe('#ffffff');
    expect(switchElement.style.getPropertyValue('--thumb-color-checked')).toBe('#f8f8f8');
    expect(switchElement.style.getPropertyValue('--thumb-shadow')).toBe('0 0 3px rgba(0,0,0,0.2)');
    expect(switchElement.style.getPropertyValue('--thumb-size')).toBe('18px');
    expect(switchElement.style.getPropertyValue('--width')).toBe('48px');
  });

  it('should handle ngModel binding', () => {
    // Initial state
    expect(hostComponent.isChecked).toBe(false);
    expect(switchElement.hasAttribute('checked')).toBe(false);

    // Update model -> view
    hostComponent.isChecked = true;
    hostFixture.detectChanges();
    expect(switchElement.hasAttribute('checked')).toBe(true);
  });

  it('should update ngModel when native change event fires (user toggles on)', () => {
    hostComponent.isChecked = false;
    hostFixture.detectChanges();
    expect(hostComponent.isChecked).toBeFalse();

    // Simulate the underlying element becoming checked and dispatch 'change'
    (switchElement as any).checked = true;
    switchElement.setAttribute('checked', '');
    switchElement.dispatchEvent(new Event('change'));
    hostFixture.detectChanges();

    expect(hostComponent.isChecked).toBeTrue();
  });

  it('should update ngModel when native change event fires (user toggles off)', () => {
    hostComponent.isChecked = true;
    hostFixture.detectChanges();
    expect(switchElement.hasAttribute('checked')).toBeTrue();

    // Simulate unchecking and dispatch 'change'
    (switchElement as any).checked = false;
    switchElement.removeAttribute('checked');
    switchElement.dispatchEvent(new Event('change'));
    hostFixture.detectChanges();

    expect(hostComponent.isChecked).toBeFalse();
  });

  it('should emit events correctly', () => {
    // Simulate input event
    switchElement.dispatchEvent(new Event('input'));
    expect(hostComponent.inputEventCalled).toBe(true);

    // Simulate change event
    switchElement.dispatchEvent(new Event('change'));
    expect(hostComponent.changeEventCalled).toBe(true);

    // Simulate focus event
    switchElement.dispatchEvent(new FocusEvent('focus'));
    expect(hostComponent.focusEventCalled).toBe(true);

    // Simulate blur event
    switchElement.dispatchEvent(new FocusEvent('blur'));
    expect(hostComponent.blurEventCalled).toBe(true);
  });
});
