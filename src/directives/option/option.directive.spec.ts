import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaOptionDirective } from './option.directive';

@Component({
  template: `
    <wa-option
      [value]="value"
      [disabled]="disabled"
      [selected]="selected"
      [label]="label"
    >{{ content }}</wa-option>
  `,
  standalone: true,
  imports: [WaOptionDirective]
})
class TestHostComponent {
  value?: string;
  disabled?: boolean | string;
  selected?: boolean | string;
  label?: string;
  content = 'Option Label';
}

describe('WaOptionDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let optionElement: HTMLElement;
  let optionDirective: WaOptionDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    optionElement = hostFixture.nativeElement.querySelector('wa-option');
    optionDirective = hostFixture.debugElement.query(
      sel => sel.nativeElement === optionElement
    ).injector.get(WaOptionDirective);
  });

  it('should create the option directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(optionElement).toBeTruthy();
    expect(optionDirective).toBeTruthy();
  });

  it('should set the value attribute', () => {
    hostComponent.value = 'option-1';
    hostFixture.detectChanges();
    expect(optionElement.getAttribute('value')).toBe('option-1');
  });

  it('should set the label attribute', () => {
    hostComponent.label = 'Custom Label';
    hostFixture.detectChanges();
    expect(optionElement.getAttribute('label')).toBe('Custom Label');
  });

  it('should set disabled attribute when true', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();
    expect(optionElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should not set disabled attribute when false', () => {
    hostComponent.disabled = false;
    hostFixture.detectChanges();
    expect(optionElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should handle string values for disabled attribute', () => {
    hostComponent.disabled = 'true';
    hostFixture.detectChanges();
    expect(optionElement.hasAttribute('disabled')).toBeTrue();

    hostComponent.disabled = '';
    hostFixture.detectChanges();
    expect(optionElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should set selected attribute when true', () => {
    hostComponent.selected = true;
    hostFixture.detectChanges();
    expect(optionElement.hasAttribute('selected')).toBeTrue();
  });

  it('should not set selected attribute when false', () => {
    hostComponent.selected = false;
    hostFixture.detectChanges();
    expect(optionElement.hasAttribute('selected')).toBeFalse();
  });

  it('should handle string values for selected attribute', () => {
    hostComponent.selected = 'true';
    hostFixture.detectChanges();
    expect(optionElement.hasAttribute('selected')).toBeTrue();
  });

  it('should project content correctly', () => {
    expect(optionElement.textContent?.trim()).toBe('Option Label');

    hostComponent.content = 'Updated Label';
    hostFixture.detectChanges();
    expect(optionElement.textContent?.trim()).toBe('Updated Label');
  });

  it('should update value when input changes', () => {
    hostComponent.value = 'initial';
    hostFixture.detectChanges();
    expect(optionElement.getAttribute('value')).toBe('initial');

    hostComponent.value = 'updated';
    hostFixture.detectChanges();
    expect(optionElement.getAttribute('value')).toBe('updated');
  });

  it('should handle multiple attribute updates at once', () => {
    hostComponent.value = 'test-val';
    hostComponent.label = 'Test Label';
    hostComponent.disabled = true;
    hostComponent.selected = true;
    hostFixture.detectChanges();

    expect(optionElement.getAttribute('value')).toBe('test-val');
    expect(optionElement.getAttribute('label')).toBe('Test Label');
    expect(optionElement.hasAttribute('disabled')).toBeTrue();
    expect(optionElement.hasAttribute('selected')).toBeTrue();
  });
});

