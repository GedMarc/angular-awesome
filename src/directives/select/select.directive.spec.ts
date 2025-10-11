import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaSelectWrapperComponent, WaOptionComponent } from './select.directive';
import { FormsModule } from '@angular/forms';

// Create a test host component for WaSelectWrapperComponent
@Component({
  template: `
    <wa-select-wrapper
      [(ngModel)]="value"
      [label]="label"
      [hint]="hint"
      [placeholder]="placeholder"
      [appearance]="appearance"
      [pill]="pill"
      [clearable]="clearable"
      [disabled]="disabled"
      [multiple]="multiple"
      [size]="size"
      [placement]="placement"
      [required]="required"
      [maxOptionsVisible]="maxOptionsVisible"
      [form]="form"
      [backgroundColor]="backgroundColor"
      [borderColor]="borderColor"
      [borderWidth]="borderWidth"
      [boxShadow]="boxShadow"
      [backgroundColorCurrent]="backgroundColorCurrent"
      [backgroundColorHover]="backgroundColorHover"
      [textColorCurrent]="textColorCurrent"
      [textColorHover]="textColorHover"
      (inputEvent)="onInput($event)"
      (changeEvent)="onChange($event)"
      (focusEvent)="onFocus($event)"
      (blurEvent)="onBlur($event)"
      (clearEvent)="onClear($event)"
      (showEvent)="onShow($event)"
      (afterShowEvent)="onAfterShow($event)"
      (hideEvent)="onHide($event)"
      (afterHideEvent)="onAfterHide($event)"
      (invalidEvent)="onInvalid($event)"
    >
      <wa-option *ngFor="let option of options" [value]="option.value" [label]="option.label">
        {{ option.text }}
      </wa-option>
    </wa-select-wrapper>
  `,
  standalone: true,
  imports: [WaSelectWrapperComponent, WaOptionComponent, FormsModule]
})
class SelectTestHostComponent {
  value?: string | string[];
  label?: string;
  hint?: string;
  placeholder?: string;
  appearance?: 'outlined' | 'filled' | string;
  pill?: boolean | string;
  clearable?: boolean | string;
  disabled?: boolean | string;
  multiple?: boolean | string;
  size?: 'small' | 'medium' | 'large' | string;
  placement?: 'top' | 'bottom' | string;
  required?: boolean | string;
  maxOptionsVisible?: number | string;
  form?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  boxShadow?: string;
  backgroundColorCurrent?: string;
  backgroundColorHover?: string;
  textColorCurrent?: string;
  textColorHover?: string;

  options = [
    { value: 'option1', label: 'Option 1', text: 'First Option' },
    { value: 'option2', label: 'Option 2', text: 'Second Option' },
    { value: 'option3', label: 'Option 3', text: 'Third Option' }
  ];

  onInput(event: Event): void {}
  onChange(event: Event): void {}
  onFocus(event: FocusEvent): void {}
  onBlur(event: FocusEvent): void {}
  onClear(event: CustomEvent): void {}
  onShow(event: CustomEvent): void {}
  onAfterShow(event: CustomEvent): void {}
  onHide(event: CustomEvent): void {}
  onAfterHide(event: CustomEvent): void {}
  onInvalid(event: CustomEvent): void {}
}

// Create a test host component for WaOptionComponent
@Component({
  template: `
    <wa-option
      [value]="value"
      [label]="label"
      [disabled]="disabled"
      [backgroundColorCurrent]="backgroundColorCurrent"
      [backgroundColorHover]="backgroundColorHover"
      [textColorCurrent]="textColorCurrent"
      [textColorHover]="textColorHover"
    >
      {{ optionText }}
    </wa-option>
  `,
  standalone: true,
  imports: [WaOptionComponent]
})
class OptionTestHostComponent {
  value?: string;
  label?: string;
  disabled?: boolean | string;
  backgroundColorCurrent?: string;
  backgroundColorHover?: string;
  textColorCurrent?: string;
  textColorHover?: string;
  optionText = 'Option Text';
}

describe('WaSelectWrapperComponent', () => {
  let hostComponent: SelectTestHostComponent;
  let hostFixture: ComponentFixture<SelectTestHostComponent>;
  let selectElement: HTMLElement;
  let selectComponent: WaSelectWrapperComponent;

  beforeEach(async () => {
    // Mock the customElements API
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [SelectTestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(SelectTestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    // Get the wa-select-wrapper element
    selectElement = hostFixture.nativeElement.querySelector('wa-select-wrapper');
    selectComponent = hostFixture.debugElement.query(sel => sel.nativeElement === selectElement).injector.get(WaSelectWrapperComponent);
  });

  it('should create the select wrapper component', () => {
    expect(hostComponent).toBeTruthy();
    expect(selectElement).toBeTruthy();
    expect(selectComponent).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.label = 'Select an option';
    hostComponent.hint = 'Choose one of the options';
    hostComponent.placeholder = 'Select...';
    hostComponent.appearance = 'outlined';
    hostComponent.size = 'large';
    hostComponent.placement = 'bottom';
    hostComponent.form = 'test-form';
    hostFixture.detectChanges();

    expect(selectElement.getAttribute('label')).toBe('Select an option');
    expect(selectElement.getAttribute('hint')).toBe('Choose one of the options');
    expect(selectElement.getAttribute('placeholder')).toBe('Select...');
    expect(selectElement.getAttribute('appearance')).toBe('outlined');
    expect(selectElement.getAttribute('size')).toBe('large');
    expect(selectElement.getAttribute('placement')).toBe('bottom');
    expect(selectElement.getAttribute('form')).toBe('test-form');
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.maxOptionsVisible = 3;
    hostFixture.detectChanges();
    expect(selectElement.getAttribute('max-options-visible')).toBe('3');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.pill = true;
    hostComponent.clearable = true;
    hostComponent.disabled = true;
    hostComponent.multiple = true;
    hostComponent.required = true;
    hostFixture.detectChanges();

    expect(selectElement.hasAttribute('pill')).toBeTrue();
    expect(selectElement.hasAttribute('clearable')).toBeTrue();
    expect(selectElement.hasAttribute('disabled')).toBeTrue();
    expect(selectElement.hasAttribute('multiple')).toBeTrue();
    expect(selectElement.hasAttribute('required')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.pill = false;
    hostComponent.clearable = false;
    hostComponent.disabled = false;
    hostComponent.multiple = false;
    hostComponent.required = false;
    hostFixture.detectChanges();

    expect(selectElement.hasAttribute('pill')).toBeFalse();
    expect(selectElement.hasAttribute('clearable')).toBeFalse();
    expect(selectElement.hasAttribute('disabled')).toBeFalse();
    expect(selectElement.hasAttribute('multiple')).toBeFalse();
    expect(selectElement.hasAttribute('required')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.pill = 'true';
    hostComponent.clearable = '';
    hostFixture.detectChanges();

    expect(selectElement.hasAttribute('pill')).toBeTrue();
    expect(selectElement.hasAttribute('clearable')).toBeTrue();
  });

  it('should set style attributes correctly', () => {
    hostComponent.backgroundColor = '#f5f5f5';
    hostComponent.borderColor = '#3366ff';
    hostComponent.borderWidth = '2px';
    hostComponent.boxShadow = '0 0 5px rgba(51, 102, 255, 0.5)';
    hostComponent.backgroundColorCurrent = '#e6e6e6';
    hostComponent.backgroundColorHover = '#f0f0f0';
    hostComponent.textColorCurrent = '#333333';
    hostComponent.textColorHover = '#000000';
    hostFixture.detectChanges();

    expect(selectElement.style.getPropertyValue('--background-color')).toBe('#f5f5f5');
    expect(selectElement.style.getPropertyValue('--border-color')).toBe('#3366ff');
    expect(selectElement.style.getPropertyValue('--border-width')).toBe('2px');
    expect(selectElement.style.getPropertyValue('--box-shadow')).toBe('0 0 5px rgba(51, 102, 255, 0.5)');
    expect(selectElement.style.getPropertyValue('--background-color-current')).toBe('#e6e6e6');
    expect(selectElement.style.getPropertyValue('--background-color-hover')).toBe('#f0f0f0');
    expect(selectElement.style.getPropertyValue('--text-color-current')).toBe('#333333');
    expect(selectElement.style.getPropertyValue('--text-color-hover')).toBe('#000000');
  });

  it('should expose the native element', () => {
    expect(selectComponent.nativeElement).toBe(selectElement);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onInput');
    spyOn(hostComponent, 'onChange');
    spyOn(hostComponent, 'onFocus');
    spyOn(hostComponent, 'onBlur');
    spyOn(hostComponent, 'onClear');
    spyOn(hostComponent, 'onShow');
    spyOn(hostComponent, 'onAfterShow');
    spyOn(hostComponent, 'onHide');
    spyOn(hostComponent, 'onAfterHide');
    spyOn(hostComponent, 'onInvalid');

    // Create mock events
    const inputEvent = new Event('input');
    const changeEvent = new Event('change');
    const focusEvent = new FocusEvent('focus');
    const blurEvent = new FocusEvent('blur');
    const clearEvent = new CustomEvent('wa-clear');
    const showEvent = new CustomEvent('wa-show');
    const afterShowEvent = new CustomEvent('wa-after-show');
    const hideEvent = new CustomEvent('wa-hide');
    const afterHideEvent = new CustomEvent('wa-after-hide');
    const invalidEvent = new CustomEvent('wa-invalid');

    // Dispatch events on the native element
    selectElement.dispatchEvent(inputEvent);
    selectElement.dispatchEvent(changeEvent);
    selectElement.dispatchEvent(focusEvent);
    selectElement.dispatchEvent(blurEvent);
    selectElement.dispatchEvent(clearEvent);
    selectElement.dispatchEvent(showEvent);
    selectElement.dispatchEvent(afterShowEvent);
    selectElement.dispatchEvent(hideEvent);
    selectElement.dispatchEvent(afterHideEvent);
    selectElement.dispatchEvent(invalidEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onInput).toHaveBeenCalled();
    expect(hostComponent.onChange).toHaveBeenCalled();
    expect(hostComponent.onFocus).toHaveBeenCalled();
    expect(hostComponent.onBlur).toHaveBeenCalled();
    expect(hostComponent.onClear).toHaveBeenCalled();
    expect(hostComponent.onShow).toHaveBeenCalled();
    expect(hostComponent.onAfterShow).toHaveBeenCalled();
    expect(hostComponent.onHide).toHaveBeenCalled();
    expect(hostComponent.onAfterHide).toHaveBeenCalled();
    expect(hostComponent.onInvalid).toHaveBeenCalled();
  });

  it('should implement ControlValueAccessor correctly', () => {
    // Test writeValue for single selection
    selectComponent.writeValue('option1');
    expect(selectElement.getAttribute('value')).toBe('option1');

    // Test writeValue for multiple selection
    hostComponent.multiple = true;
    hostFixture.detectChanges();
    selectComponent.writeValue(['option1', 'option2']);
    expect(selectElement.getAttribute('value')).toBe('option1 option2');

    // Test setDisabledState
    selectComponent.setDisabledState(true);
    expect(selectElement.hasAttribute('disabled')).toBeTrue();

    selectComponent.setDisabledState(false);
    expect(selectElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should handle different appearance values', () => {
    const appearances = ['outlined', 'filled'];

    appearances.forEach(appearance => {
      hostComponent.appearance = appearance;
      hostFixture.detectChanges();
      expect(selectElement.getAttribute('appearance')).toBe(appearance);
    });
  });

  it('should handle different size values', () => {
    const sizes = ['small', 'medium', 'large'];

    sizes.forEach(size => {
      hostComponent.size = size;
      hostFixture.detectChanges();
      expect(selectElement.getAttribute('size')).toBe(size);
    });
  });

  it('should handle different placement values', () => {
    const placements = ['top', 'bottom'];

    placements.forEach(placement => {
      hostComponent.placement = placement;
      hostFixture.detectChanges();
      expect(selectElement.getAttribute('placement')).toBe(placement);
    });
  });

  it('should update ngModel on change for single selection', () => {
    hostComponent.multiple = false;
    hostFixture.detectChanges();

    // Simulate user picking option2 by setting value attribute and dispatching 'change'
    selectElement.setAttribute('value', 'option2');
    (selectElement as any).value = 'option2';
    selectElement.dispatchEvent(new Event('change'));
    hostFixture.detectChanges();

    expect(hostComponent.value).toBe('option2');
  });

  it('should update ngModel on change for multiple selection', () => {
    hostComponent.multiple = true;
    hostFixture.detectChanges();

    // Simulate user picking option1 and option3
    selectElement.setAttribute('value', 'option1 option3');
    (selectElement as any).value = 'option1 option3';
    selectElement.dispatchEvent(new Event('change'));
    hostFixture.detectChanges();

    expect(Array.isArray(hostComponent.value)).toBeTrue();
    expect(hostComponent.value).toEqual(['option1', 'option3']);
  });
});

describe('WaOptionComponent', () => {
  let hostComponent: OptionTestHostComponent;
  let hostFixture: ComponentFixture<OptionTestHostComponent>;
  let optionElement: HTMLElement;
  let optionComponent: WaOptionComponent;

  beforeEach(async () => {
    // Mock the customElements API
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [OptionTestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(OptionTestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    // Get the wa-option element
    optionElement = hostFixture.nativeElement.querySelector('wa-option');
    optionComponent = hostFixture.debugElement.query(sel => sel.nativeElement === optionElement).injector.get(WaOptionComponent);
  });

  it('should create the option component', () => {
    expect(hostComponent).toBeTruthy();
    expect(optionElement).toBeTruthy();
    expect(optionComponent).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.value = 'option1';
    hostComponent.label = 'Option 1';
    hostFixture.detectChanges();

    expect(optionElement.getAttribute('value')).toBe('option1');
    expect(optionElement.getAttribute('label')).toBe('Option 1');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();
    expect(optionElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.disabled = false;
    hostFixture.detectChanges();
    expect(optionElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.disabled = 'true';
    hostFixture.detectChanges();
    expect(optionElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should set style attributes correctly', () => {
    hostComponent.backgroundColorCurrent = '#e6e6e6';
    hostComponent.backgroundColorHover = '#f0f0f0';
    hostComponent.textColorCurrent = '#333333';
    hostComponent.textColorHover = '#000000';
    hostFixture.detectChanges();

    expect(optionElement.style.getPropertyValue('--background-color-current')).toBe('#e6e6e6');
    expect(optionElement.style.getPropertyValue('--background-color-hover')).toBe('#f0f0f0');
    expect(optionElement.style.getPropertyValue('--text-color-current')).toBe('#333333');
    expect(optionElement.style.getPropertyValue('--text-color-hover')).toBe('#000000');
  });

  it('should project content correctly', () => {
    expect(optionElement.textContent?.trim()).toBe('Option Text');

    hostComponent.optionText = 'Updated Option';
    hostFixture.detectChanges();
    expect(optionElement.textContent?.trim()).toBe('Updated Option');
  });
});
