import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaCheckboxGroupDirective } from './checkbox-group.directive';
import { WaCheckboxDirective } from '../checkbox/checkbox.directive';
import { FormsModule } from '@angular/forms';

// Create a test host component for WaCheckboxGroupDirective
@Component({
  template: `
    <wa-checkbox-group
      [label]="label"
      [hint]="hint"
      [orientation]="orientation"
      [size]="size"
      [required]="required"
      [withLabel]="withLabel"
      [withHint]="withHint"
      [styleGap]="styleGap"
    >
      <wa-checkbox [(ngModel)]="option1" name="option1" value="1">Option 1</wa-checkbox>
      <wa-checkbox [(ngModel)]="option2" name="option2" value="2">Option 2</wa-checkbox>
      <wa-checkbox [(ngModel)]="option3" name="option3" value="3">Option 3</wa-checkbox>
    </wa-checkbox-group>
  `,
  standalone: true,
  imports: [WaCheckboxGroupDirective, WaCheckboxDirective, FormsModule]
})
class CheckboxGroupTestHostComponent {
  label?: string;
  hint?: string;
  orientation?: 'horizontal' | 'vertical' | string;
  size?: 'small' | 'medium' | 'large' | 'inherit' | string;
  required?: boolean | string;
  withLabel?: boolean | string;
  withHint?: boolean | string;
  styleGap?: string;

  option1?: boolean;
  option2?: boolean;
  option3?: boolean;
}

describe('WaCheckboxGroupDirective', () => {
  let hostComponent: CheckboxGroupTestHostComponent;
  let hostFixture: ComponentFixture<CheckboxGroupTestHostComponent>;
  let groupElement: HTMLElement;
  let groupDirective: WaCheckboxGroupDirective;

  beforeEach(async () => {
    // Mock the customElements API
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [CheckboxGroupTestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(CheckboxGroupTestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    groupElement = hostFixture.nativeElement.querySelector('wa-checkbox-group');
    groupDirective = hostFixture.debugElement
      .query(sel => sel.nativeElement === groupElement)
      .injector.get(WaCheckboxGroupDirective);
  });

  it('should create the checkbox group directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(groupElement).toBeTruthy();
    expect(groupDirective).toBeTruthy();
  });

  it('should set string attributes correctly', fakeAsync(() => {
    hostComponent.label = 'Choose toppings';
    hostComponent.hint = 'Select all that apply';
    hostComponent.orientation = 'horizontal';
    hostComponent.size = 'large';
    hostFixture.detectChanges();
    tick();
    hostFixture.detectChanges();

    expect(groupElement.getAttribute('label')).toBe('Choose toppings');
    expect(groupElement.getAttribute('hint')).toBe('Select all that apply');
    expect(groupElement.getAttribute('orientation')).toBe('horizontal');
    expect(groupElement.getAttribute('size')).toBe('large');
  }));

  it('should set boolean attributes correctly', () => {
    hostComponent.required = true;
    hostComponent.withLabel = true;
    hostComponent.withHint = true;
    hostFixture.detectChanges();

    expect(groupElement.hasAttribute('required')).toBeTrue();
    expect(groupElement.hasAttribute('with-label')).toBeTrue();
    expect(groupElement.hasAttribute('with-hint')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.required = false;
    hostComponent.withLabel = false;
    hostComponent.withHint = false;
    hostFixture.detectChanges();

    expect(groupElement.hasAttribute('required')).toBeFalse();
    expect(groupElement.hasAttribute('with-label')).toBeFalse();
    expect(groupElement.hasAttribute('with-hint')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.required = 'true';
    hostComponent.withLabel = '';
    hostFixture.detectChanges();

    expect(groupElement.hasAttribute('required')).toBeTrue();
    expect(groupElement.hasAttribute('with-label')).toBeTrue();
  });

  it('should set the --gap style custom property correctly', () => {
    hostComponent.styleGap = '1rem';
    hostFixture.detectChanges();

    expect(groupElement.style.getPropertyValue('--gap')).toBe('1rem');
  });

  it('should expose the native element', () => {
    expect(groupDirective.nativeElement).toBe(groupElement);
  });

  it('should project slotted checkboxes', () => {
    const checkboxes = groupElement.querySelectorAll('wa-checkbox');
    expect(checkboxes.length).toBe(3);
    expect(checkboxes[0].textContent?.trim()).toBe('Option 1');
  });
});

