import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, forwardRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { WaCheckboxDirective } from './checkbox.directive';

// Create a test host component to test the checkbox directive
@Component({
  template: `
    <wa-checkbox
      [checked]="checked"
      [value]="value"
      [name]="name"
      [form]="form"
      [hint]="hint"
      [disabled]="disabled"
      [required]="required"
      [indeterminate]="indeterminate"
      [size]="size"
      [backgroundColor]="backgroundColor"
      [backgroundColorChecked]="backgroundColorChecked"
      [borderColor]="borderColor"
      [borderColorChecked]="borderColorChecked"
      [borderRadius]="borderRadius"
      [borderStyle]="borderStyle"
      [borderWidth]="borderWidth"
      [boxShadow]="boxShadow"
      [checkedIconColor]="checkedIconColor"
      [toggleSize]="toggleSize"
      (checkedChange)="onCheckedChange($event)"
      (input)="onInput($event)"
      (blur)="onBlur($event)"
      (focus)="onFocus($event)"
      (change)="onChange($event)"
      (waInvalid)="onInvalid($event)"
    >
      {{ checkboxText }}
    </wa-checkbox>
  `,
  standalone: true,
  imports: [WaCheckboxDirective]
})
class TestHostComponent {
  checked?: boolean | string;
  value?: string;
  name?: string;
  form?: string;
  hint?: string;
  disabled?: boolean | string;
  required?: boolean | string;
  indeterminate?: boolean | string;
  size?: string;
  checkboxText = 'Checkbox Text';

  // CSS custom properties
  backgroundColor?: string;
  backgroundColorChecked?: string;
  borderColor?: string;
  borderColorChecked?: string;
  borderRadius?: string;
  borderStyle?: string;
  borderWidth?: string;
  boxShadow?: string;
  checkedIconColor?: string;
  toggleSize?: string;

  onCheckedChange(isChecked: boolean): void {}
  onInput(event: Event): void {}
  onBlur(event: Event): void {}
  onFocus(event: Event): void {}
  onChange(event: Event): void {}
  onInvalid(event: Event): void {}
}

// Test component for template-driven forms
@Component({
  template: `
    <form #form="ngForm">
      <wa-checkbox [(ngModel)]="isChecked" name="checkbox" required>
        Template-driven form checkbox
      </wa-checkbox>
    </form>
  `,
  standalone: true,
  imports: [WaCheckboxDirective, FormsModule]
})
class TemplateFormComponent {
  isChecked = false;
}

// Test component for reactive forms
@Component({
  template: `
    <form [formGroup]="form">
      <wa-checkbox formControlName="isChecked">
        Reactive form checkbox
      </wa-checkbox>
    </form>
  `,
  standalone: true,
  imports: [WaCheckboxDirective, ReactiveFormsModule]
})
class ReactiveFormComponent {
  form = new FormGroup({
    isChecked: new FormControl(false)
  });
}

describe('WaCheckboxDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let checkboxElement: HTMLElement;
  let checkboxDirective: WaCheckboxDirective;

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

    // Get the wa-checkbox element
    checkboxElement = hostFixture.nativeElement.querySelector('wa-checkbox');
    checkboxDirective = hostFixture.debugElement.query(sel => sel.nativeElement === checkboxElement).injector.get(WaCheckboxDirective);
  });

  it('should create the checkbox directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(checkboxElement).toBeTruthy();
    expect(checkboxDirective).toBeTruthy();
  });

  it('should set standard attributes correctly', () => {
    hostComponent.value = 'test-value';
    hostComponent.name = 'test-name';
    hostComponent.form = 'test-form';
    hostComponent.hint = 'test-hint';
    hostComponent.size = 'large';
    hostFixture.detectChanges();

    expect(checkboxElement.getAttribute('value')).toBe('test-value');
    expect(checkboxElement.getAttribute('name')).toBe('test-name');
    expect(checkboxElement.getAttribute('form')).toBe('test-form');
    expect(checkboxElement.getAttribute('hint')).toBe('test-hint');
    expect(checkboxElement.getAttribute('size')).toBe('large');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.checked = true;
    hostComponent.disabled = true;
    hostComponent.required = true;
    hostComponent.indeterminate = true;
    hostFixture.detectChanges();

    expect(checkboxElement.hasAttribute('checked')).toBeTrue();
    expect(checkboxElement.hasAttribute('disabled')).toBeTrue();
    expect(checkboxElement.hasAttribute('required')).toBeTrue();
    expect(checkboxElement.hasAttribute('indeterminate')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.checked = false;
    hostComponent.disabled = false;
    hostComponent.required = false;
    hostComponent.indeterminate = false;
    hostFixture.detectChanges();

    expect(checkboxElement.hasAttribute('checked')).toBeFalse();
    expect(checkboxElement.hasAttribute('disabled')).toBeFalse();
    expect(checkboxElement.hasAttribute('required')).toBeFalse();
    expect(checkboxElement.hasAttribute('indeterminate')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.checked = 'true';
    hostComponent.disabled = '';
    hostFixture.detectChanges();

    expect(checkboxElement.hasAttribute('checked')).toBeTrue();
    expect(checkboxElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should project content correctly', () => {
    expect(checkboxElement.textContent?.trim()).toBe('Checkbox Text');

    hostComponent.checkboxText = 'Updated Text';
    hostFixture.detectChanges();
    expect(checkboxElement.textContent?.trim()).toBe('Updated Text');
  });

  it('should expose methods for programmatic interaction', () => {
    // Mock the native element methods
    spyOn(checkboxElement, 'click');
    spyOn(checkboxElement, 'focus');
    spyOn(checkboxElement, 'blur');
    spyOn(checkboxDirective as any, 'setCustomValidity');

    // Call the directive methods
    checkboxDirective.click();
    checkboxDirective.focus();
    checkboxDirective.blur();
    checkboxDirective.setCustomValidity('Invalid');

    // Verify the methods were called
    expect(checkboxElement.click).toHaveBeenCalled();
    expect(checkboxElement.focus).toHaveBeenCalled();
    expect(checkboxElement.blur).toHaveBeenCalled();
    expect(checkboxDirective.setCustomValidity).toHaveBeenCalledWith('Invalid');
  });

  it('should expose the native element', () => {
    expect(checkboxDirective.nativeElement).toBe(checkboxElement);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onCheckedChange');
    spyOn(hostComponent, 'onInput');
    spyOn(hostComponent, 'onBlur');
    spyOn(hostComponent, 'onFocus');
    spyOn(hostComponent, 'onChange');
    spyOn(hostComponent, 'onInvalid');

    // Create mock events
    const checkedChangeEvent = new CustomEvent('checkedChange', { detail: true });
    const inputEvent = new Event('input');
    const blurEvent = new Event('blur');
    const focusEvent = new Event('focus');
    const changeEvent = new Event('change');
    const invalidEvent = new Event('wa-invalid');

    // Dispatch events on the native element
    checkboxElement.dispatchEvent(checkedChangeEvent);
    checkboxElement.dispatchEvent(inputEvent);
    checkboxElement.dispatchEvent(blurEvent);
    checkboxElement.dispatchEvent(focusEvent);
    checkboxElement.dispatchEvent(changeEvent);
    checkboxElement.dispatchEvent(invalidEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onCheckedChange).toHaveBeenCalledWith(true);
    expect(hostComponent.onInput).toHaveBeenCalled();
    expect(hostComponent.onBlur).toHaveBeenCalled();
    expect(hostComponent.onFocus).toHaveBeenCalled();
    expect(hostComponent.onChange).toHaveBeenCalled();
    expect(hostComponent.onInvalid).toHaveBeenCalled();
  });

  it('should handle different size values', () => {
    const sizes = ['small', 'medium', 'large', 'inherit'];

    sizes.forEach(size => {
      hostComponent.size = size;
      hostFixture.detectChanges();
      expect(checkboxElement.getAttribute('size')).toBe(size);
    });
  });

  it('should set CSS custom properties correctly', () => {
    // Set CSS custom properties
    hostComponent.backgroundColor = '#f0f0f0';
    hostComponent.backgroundColorChecked = '#4a90e2';
    hostComponent.borderColor = '#cccccc';
    hostComponent.borderColorChecked = '#2a70c2';
    hostComponent.borderRadius = '4px';
    hostComponent.borderStyle = 'solid';
    hostComponent.borderWidth = '2px';
    hostComponent.boxShadow = '0 0 5px rgba(0,0,0,0.2)';
    hostComponent.checkedIconColor = 'white';
    hostComponent.toggleSize = '24px';
    hostFixture.detectChanges();

    // Verify CSS custom properties are set
    expect(checkboxElement.getAttribute('--background-color')).toBe('#f0f0f0');
    expect(checkboxElement.getAttribute('--background-color-checked')).toBe('#4a90e2');
    expect(checkboxElement.getAttribute('--border-color')).toBe('#cccccc');
    expect(checkboxElement.getAttribute('--border-color-checked')).toBe('#2a70c2');
    expect(checkboxElement.getAttribute('--border-radius')).toBe('4px');
    expect(checkboxElement.getAttribute('--border-style')).toBe('solid');
    expect(checkboxElement.getAttribute('--border-width')).toBe('2px');
    expect(checkboxElement.getAttribute('--box-shadow')).toBe('0 0 5px rgba(0,0,0,0.2)');
    expect(checkboxElement.getAttribute('--checked-icon-color')).toBe('white');
    expect(checkboxElement.getAttribute('--toggle-size')).toBe('24px');
  });
});

describe('WaCheckboxDirective - Form Integration', () => {
  describe('Template-driven forms', () => {
    let component: TemplateFormComponent;
    let fixture: ComponentFixture<TemplateFormComponent>;
    let checkboxElement: HTMLElement;
    let checkboxDirective: WaCheckboxDirective;

    beforeEach(async () => {
      // Mock the customElements API
      if (!window.customElements) {
        (window as any).customElements = {
          whenDefined: () => Promise.resolve(),
          define: () => {}
        };
      }

      await TestBed.configureTestingModule({
        imports: [TemplateFormComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(TemplateFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // Get the wa-checkbox element
      checkboxElement = fixture.nativeElement.querySelector('wa-checkbox');
      checkboxDirective = fixture.debugElement.query(sel => sel.nativeElement === checkboxElement).injector.get(WaCheckboxDirective);
    });

    it('should create the template-driven form component', () => {
      expect(component).toBeTruthy();
      expect(checkboxElement).toBeTruthy();
      expect(checkboxDirective).toBeTruthy();
    });

    it('should bind with ngModel', () => {
      // Initially the checkbox should be unchecked
      expect(component.isChecked).toBeFalse();
      expect(checkboxElement.hasAttribute('checked')).toBeFalse();

      // Simulate user checking the checkbox via legacy event
      const checkedChangeEvent = new CustomEvent('checkedChange', { detail: true });
      checkboxElement.dispatchEvent(checkedChangeEvent);
      fixture.detectChanges();

      // The model should be updated
      expect(component.isChecked).toBeTrue();
    });

    it('should update ngModel when native change event fires', () => {
      component.isChecked = false;
      fixture.detectChanges();
      expect(component.isChecked).toBeFalse();

      // The directive listens to 'change' and calls onChange with current checked state.
      // Simulate the underlying element becoming checked before dispatching 'change'.
      (checkboxElement as any).checked = true;
      checkboxElement.setAttribute('checked', '');
      const changeEvent = new Event('change');
      checkboxElement.dispatchEvent(changeEvent);
      fixture.detectChanges();

      expect(component.isChecked).toBeTrue();
    });

    it('should update ngModel when native input event fires', () => {
      component.isChecked = false;
      fixture.detectChanges();

      (checkboxElement as any).checked = true;
      checkboxElement.setAttribute('checked', '');
      const inputEvent = new Event('input');
      checkboxElement.dispatchEvent(inputEvent);
      fixture.detectChanges();

      expect(component.isChecked).toBeTrue();
    });

    it('should update ngModel back to false when unchecked via change', () => {
      // Start true in the model and view
      component.isChecked = true;
      fixture.detectChanges();
      expect(checkboxElement.hasAttribute('checked')).toBeTrue();

      // Simulate unchecking by clearing property/attribute then dispatch change
      (checkboxElement as any).checked = false;
      checkboxElement.removeAttribute('checked');
      const changeEvent = new Event('change');
      checkboxElement.dispatchEvent(changeEvent);
      fixture.detectChanges();

      expect(component.isChecked).toBeFalse();
    });

    it('should update the view when model changes', () => {
      // Change the model
      component.isChecked = true;
      fixture.detectChanges();

      // The view should be updated
      expect(checkboxElement.hasAttribute('checked')).toBeTrue();
    });
  });

  describe('Reactive forms', () => {
    let component: ReactiveFormComponent;
    let fixture: ComponentFixture<ReactiveFormComponent>;
    let checkboxElement: HTMLElement;
    let checkboxDirective: WaCheckboxDirective;

    beforeEach(async () => {
      // Mock the customElements API
      if (!window.customElements) {
        (window as any).customElements = {
          whenDefined: () => Promise.resolve(),
          define: () => {}
        };
      }

      await TestBed.configureTestingModule({
        imports: [ReactiveFormComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(ReactiveFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // Get the wa-checkbox element
      checkboxElement = fixture.nativeElement.querySelector('wa-checkbox');
      checkboxDirective = fixture.debugElement.query(sel => sel.nativeElement === checkboxElement).injector.get(WaCheckboxDirective);
    });

    it('should create the reactive form component', () => {
      expect(component).toBeTruthy();
      expect(checkboxElement).toBeTruthy();
      expect(checkboxDirective).toBeTruthy();
    });

    it('should bind with formControlName', () => {
      // Initially the checkbox should be unchecked
      expect(component.form.get('isChecked')?.value).toBeFalse();
      expect(checkboxElement.hasAttribute('checked')).toBeFalse();

      // Simulate user checking the checkbox
      const checkedChangeEvent = new CustomEvent('checkedChange', { detail: true });
      checkboxElement.dispatchEvent(checkedChangeEvent);
      fixture.detectChanges();

      // The form control should be updated
      expect(component.form.get('isChecked')?.value).toBeTrue();
    });

    it('should update the view when form control changes', () => {
      // Change the form control value
      component.form.get('isChecked')?.setValue(true);
      fixture.detectChanges();

      // The view should be updated
      expect(checkboxElement.hasAttribute('checked')).toBeTrue();
    });

    it('should handle disabled state from form control', () => {
      // Disable the form control
      component.form.get('isChecked')?.disable();
      fixture.detectChanges();

      // The checkbox should be disabled
      expect(checkboxElement.hasAttribute('disabled')).toBeTrue();
    });
  });
});
