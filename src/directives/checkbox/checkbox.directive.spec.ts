import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
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

  onCheckedChange(isChecked: boolean): void {}
  onInput(event: Event): void {}
  onBlur(event: Event): void {}
  onFocus(event: Event): void {}
  onChange(event: Event): void {}
  onInvalid(event: Event): void {}
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
    const invalidEvent = new Event('waInvalid');

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
});
