import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { WaSelectDirective } from './select.directive';
import { WaOptionDirective } from './option.directive';

// Test component that uses the directive with model()
@Component({
  template: `
    <wa-select [(value)]="testValue"
           clearable="true"
           [multiple]="isMultiple"
           [placeholder]="placeholder"
           [size]="size"
           (changeEvent)="onChange($event)">
      <wa-option value="option-1">Option 1</wa-option>
      <wa-option value="option-2">Option 2</wa-option>
      <wa-option value="option-3">Option 3</wa-option>
    </wa-select>
  `,
  standalone: true,
  imports: [WaSelectDirective, WaOptionDirective]
})
class TestComponent {
  testValue: string | string[] = 'option-1';
  isMultiple: boolean = false;
  placeholder: string = 'Select an option';
  size: 'small' | 'medium' | 'large' | 'inherit' = 'medium';

  onChange(event: any) {
    // Test event handler
  }
}

describe('WaSelectDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let selectEl: DebugElement;
  let directive: WaSelectDirective;
  let optionEls: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    selectEl = fixture.debugElement.query(By.directive(WaSelectDirective));
    directive = selectEl.injector.get(WaSelectDirective);
    optionEls = fixture.debugElement.queryAll(By.directive(WaOptionDirective));

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should initialize with the correct values', () => {
    expect(directive.value()).toBe('option-1');
    expect(directive.clearableAttr()).toBe('true');
    expect(directive.multiple()).toBe(false);
    expect(directive.placeholder()).toBe('Select an option');
    expect(directive.size()).toBe('medium');
  });

  it('should update the model when value changes', () => {
    directive.value.set('option-2');
    fixture.detectChanges();

    expect(component.testValue).toBe('option-2');
  });

  it('should update the select when model changes', () => {
    component.testValue = 'option-3';
    fixture.detectChanges();

    expect(directive.value()).toBe('option-3');
  });

  it('should recognize clearable as a standalone attribute', () => {
    // Create a new test component with clearable as a standalone attribute
    @Component({
      template: `
        <wa-select clearable>
          <wa-option value="option-1">Option 1</wa-option>
        </wa-select>
      `,
      standalone: true,
      imports: [WaSelectDirective, WaOptionDirective]
    })
    class StandaloneClearableComponent {}

    const standaloneFixture = TestBed.createComponent(StandaloneClearableComponent);
    const standaloneSelectEl = standaloneFixture.debugElement.query(By.directive(WaSelectDirective));
    const standaloneDirective = standaloneSelectEl.injector.get(WaSelectDirective);

    standaloneFixture.detectChanges();

    // Check that clearable is enabled
    expect(standaloneDirective.clearableAttr()).toBe('');
    expect(standaloneDirective.isClearable()).toBeTrue();
  });

  it('should handle clearable="true" attribute', () => {
    // Create a new test component with clearable="true"
    @Component({
      template: `
        <wa-select clearable="true">
          <wa-option value="option-1">Option 1</wa-option>
        </wa-select>
      `,
      standalone: true,
      imports: [WaSelectDirective, WaOptionDirective]
    })
    class TrueClearableComponent {}

    const trueFixture = TestBed.createComponent(TrueClearableComponent);
    const trueSelectEl = trueFixture.debugElement.query(By.directive(WaSelectDirective));
    const trueDirective = trueSelectEl.injector.get(WaSelectDirective);

    trueFixture.detectChanges();

    // Check that clearable is enabled
    expect(trueDirective.clearableAttr()).toBe('true');
    expect(trueDirective.isClearable()).toBeTrue();
  });

  it('should handle clearable="false" attribute', () => {
    // Create a new test component with clearable="false"
    @Component({
      template: `
        <wa-select clearable="false">
          <wa-option value="option-1">Option 1</wa-option>
        </wa-select>
      `,
      standalone: true,
      imports: [WaSelectDirective, WaOptionDirective]
    })
    class FalseClearableComponent {}

    const falseFixture = TestBed.createComponent(FalseClearableComponent);
    const falseSelectEl = falseFixture.debugElement.query(By.directive(WaSelectDirective));
    const falseDirective = falseSelectEl.injector.get(WaSelectDirective);

    falseFixture.detectChanges();

    // Check that clearable is disabled
    expect(falseDirective.clearableAttr()).toBe('false');
    expect(falseDirective.isClearable()).toBeFalse();
  });

  it('should recognize multiple as a standalone attribute', () => {
    // Create a new test component with multiple as a standalone attribute
    @Component({
      template: `
        <wa-select multiple>
          <wa-option value="option-1">Option 1</wa-option>
        </wa-select>
      `,
      standalone: true,
      imports: [WaSelectDirective, WaOptionDirective]
    })
    class StandaloneMultipleComponent {}

    const standaloneFixture = TestBed.createComponent(StandaloneMultipleComponent);
    const standaloneSelectEl = standaloneFixture.debugElement.query(By.directive(WaSelectDirective));
    const standaloneDirective = standaloneSelectEl.injector.get(WaSelectDirective);

    standaloneFixture.detectChanges();

    // Check that multiple is enabled
    expect(standaloneDirective.multipleAttr()).toBe('');
    expect(standaloneDirective.isMultiple()).toBeTrue();
  });

  it('should handle multiple="true" attribute', () => {
    // Create a new test component with multiple="true"
    @Component({
      template: `
        <wa-select multiple="true">
          <wa-option value="option-1">Option 1</wa-option>
        </wa-select>
      `,
      standalone: true,
      imports: [WaSelectDirective, WaOptionDirective]
    })
    class TrueMultipleComponent {}

    const trueFixture = TestBed.createComponent(TrueMultipleComponent);
    const trueSelectEl = trueFixture.debugElement.query(By.directive(WaSelectDirective));
    const trueDirective = trueSelectEl.injector.get(WaSelectDirective);

    trueFixture.detectChanges();

    // Check that multiple is enabled
    expect(trueDirective.multipleAttr()).toBe('true');
    expect(trueDirective.isMultiple()).toBeTrue();
  });

  it('should handle multiple="false" attribute', () => {
    // Create a new test component with multiple="false"
    @Component({
      template: `
        <wa-select multiple="false">
          <wa-option value="option-1">Option 1</wa-option>
        </wa-select>
      `,
      standalone: true,
      imports: [WaSelectDirective, WaOptionDirective]
    })
    class FalseMultipleComponent {}

    const falseFixture = TestBed.createComponent(FalseMultipleComponent);
    const falseSelectEl = falseFixture.debugElement.query(By.directive(WaSelectDirective));
    const falseDirective = falseSelectEl.injector.get(WaSelectDirective);

    falseFixture.detectChanges();

    // Check that multiple is disabled
    expect(falseDirective.multipleAttr()).toBe('false');
    expect(falseDirective.isMultiple()).toBeFalse();
  });

  it('should handle show and hide methods', () => {
    // Initially closed
    expect(directive.open()).toBeFalse();

    // Show the select
    directive.show();
    fixture.detectChanges();
    expect(directive.open()).toBeTrue();

    // Hide the select
    directive.hide();
    fixture.detectChanges();
    expect(directive.open()).toBeFalse();
  });

  it('should clear the value when clear method is called', () => {
    // Set initial value
    directive.value.set('option-1');
    fixture.detectChanges();
    expect(directive.value()).toBe('option-1');

    // Clear the value
    directive.clear();
    fixture.detectChanges();
    expect(directive.value()).toBe('');
  });

  it('should handle multiple selection', () => {
    // Set multiple to true
    component.isMultiple = true;
    fixture.detectChanges();
    expect(directive.isMultiple()).toBeTrue();

    // Set multiple values
    directive.value.set(['option-1', 'option-2']);
    fixture.detectChanges();
    expect(component.testValue).toEqual(['option-1', 'option-2']);

    // Clear the values
    directive.clear();
    fixture.detectChanges();
    expect(directive.value()).toEqual([]);
  });
});
