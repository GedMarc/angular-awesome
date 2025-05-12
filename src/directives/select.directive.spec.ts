import { Component, DebugElement, signal } from '@angular/core';
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

// Test component that uses the directive with ngModel
@Component({
  template: `
    <wa-select clearable="true"
              required
              [multiple]="isMultiple"
              [placeholder]="placeholder"
              [(ngModel)]="selectSignal">
      <wa-option value="option-1">Option 1</wa-option>
      <wa-option value="option-2">Option 2</wa-option>
      <wa-option value="option-3">Option 3</wa-option>
    </wa-select>
  `,
  standalone: true,
  imports: [WaSelectDirective, WaOptionDirective, FormsModule]
})
class TestComponentWithNgModel {
  placeholder: string = 'Select an option';
  isMultiple: boolean = false;
  selectSignal = signal<string|string[]>('option-1');
}

// Test component with standalone attributes
@Component({
  template: `
    <wa-select clearable
              required
              multiple
              pill
              disabled
              size="small"
              placeholder="Select an option"
              [(ngModel)]="selectSignal">
      <wa-option value="option-1">Option 1</wa-option>
      <wa-option value="option-2">Option 2</wa-option>
      <wa-option value="option-3">Option 3</wa-option>
    </wa-select>
  `,
  standalone: true,
  imports: [WaSelectDirective, WaOptionDirective, FormsModule]
})
class TestComponentWithStandaloneAttributes {
  selectSignal = signal('option-1');
}

// Test component with property binding
@Component({
  template: `
    <wa-select [clearable]="true"
              [required]="true"
              [multiple]="true"
              [pill]="true"
              [disabled]="isDisabled"
              [size]="size"
              [placeholder]="placeholder"
              [(ngModel)]="selectSignal">
      <wa-option value="option-1">Option 1</wa-option>
      <wa-option value="option-2">Option 2</wa-option>
      <wa-option value="option-3">Option 3</wa-option>
    </wa-select>
  `,
  standalone: true,
  imports: [WaSelectDirective, WaOptionDirective, FormsModule]
})
class TestComponentWithPropertyBinding {
  placeholder: string = 'Select an option';
  isDisabled: boolean = false;
  size: 'small' | 'medium' | 'large' | 'inherit' = 'large';
  selectSignal = signal(['option-1', 'option-2']);
}

describe('WaSelectDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let selectEl: DebugElement;
  let directive: WaSelectDirective;
  let optionEls: DebugElement[];

  // For ngModel tests
  let ngModelComponent: TestComponentWithNgModel;
  let ngModelFixture: ComponentFixture<TestComponentWithNgModel>;
  let ngModelSelectEl: DebugElement;
  let ngModelDirective: WaSelectDirective;

  // For standalone attributes tests
  let standaloneComponent: TestComponentWithStandaloneAttributes;
  let standaloneFixture: ComponentFixture<TestComponentWithStandaloneAttributes>;
  let standaloneSelectEl: DebugElement;
  let standaloneDirective: WaSelectDirective;

  // For property binding tests
  let bindingComponent: TestComponentWithPropertyBinding;
  let bindingFixture: ComponentFixture<TestComponentWithPropertyBinding>;
  let bindingSelectEl: DebugElement;
  let bindingDirective: WaSelectDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TestComponent,
        TestComponentWithNgModel,
        TestComponentWithStandaloneAttributes,
        TestComponentWithPropertyBinding
      ]
    }).compileComponents();

    // Initialize main test component
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    selectEl = fixture.debugElement.query(By.directive(WaSelectDirective));
    directive = selectEl.injector.get(WaSelectDirective);
    optionEls = fixture.debugElement.queryAll(By.directive(WaOptionDirective));
    fixture.detectChanges();

    // Initialize ngModel test component
    ngModelFixture = TestBed.createComponent(TestComponentWithNgModel);
    ngModelComponent = ngModelFixture.componentInstance;
    ngModelSelectEl = ngModelFixture.debugElement.query(By.directive(WaSelectDirective));
    ngModelDirective = ngModelSelectEl.injector.get(WaSelectDirective);
    ngModelFixture.detectChanges();

    // Initialize standalone attributes test component
    standaloneFixture = TestBed.createComponent(TestComponentWithStandaloneAttributes);
    standaloneComponent = standaloneFixture.componentInstance;
    standaloneSelectEl = standaloneFixture.debugElement.query(By.directive(WaSelectDirective));
    standaloneDirective = standaloneSelectEl.injector.get(WaSelectDirective);
    standaloneFixture.detectChanges();

    // Initialize property binding test component
    bindingFixture = TestBed.createComponent(TestComponentWithPropertyBinding);
    bindingComponent = bindingFixture.componentInstance;
    bindingSelectEl = bindingFixture.debugElement.query(By.directive(WaSelectDirective));
    bindingDirective = bindingSelectEl.injector.get(WaSelectDirective);
    bindingFixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should initialize with the correct values', () => {
    expect(directive.value()).toBe('option-1');
    expect(directive.clearable()).toBe('true');
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
    expect(standaloneDirective.clearable()).toBe('');
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
    expect(trueDirective.clearable()).toBe('true');
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
    expect(falseDirective.clearable()).toBe('false');
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
    expect(standaloneDirective.multiple()).toBe('');
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
    expect(trueDirective.multiple()).toBe('true');
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
    expect(falseDirective.multiple()).toBe('false');
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

  it('should render multiple selections as space-delimited values in the value attribute', () => {
    // Set multiple to true
    component.isMultiple = true;
    fixture.detectChanges();
    expect(directive.isMultiple()).toBeTrue();

    // Set multiple values
    directive.value.set(['option-1', 'option-2']);
    fixture.detectChanges();

    // Check that the value attribute is set correctly
    const selectElement = selectEl.nativeElement;
    expect(selectElement.getAttribute('value')).toBe('option-1 option-2');

    // Add another option
    directive.value.set(['option-1', 'option-2', 'option-3']);
    fixture.detectChanges();

    // Check that the value attribute is updated correctly
    expect(selectElement.getAttribute('value')).toBe('option-1 option-2 option-3');

    // Clear the values
    directive.clear();
    fixture.detectChanges();

    // Check that the value attribute is cleared
    expect(selectElement.getAttribute('value')).toBe('');
  });

  // Tests for ngModel binding
  describe('ngModel binding', () => {
    it('should initialize with the correct values from ngModel', () => {
      expect(ngModelDirective.value()).toBe('option-1');
      expect(ngModelDirective.clearable()).toBe('true');
      expect(ngModelDirective.required()).toBe('');
      expect(ngModelDirective.isRequired()).toBeTrue();
      expect(ngModelDirective.placeholder()).toBe('Select an option');
    });

    it('should update the model when select value changes', () => {
      ngModelDirective.value.apply('option-2');
      ngModelFixture.detectChanges();

      expect(ngModelComponent.selectSignal()).toBe('option-2');
    });

    it('should update the select when model changes', () => {
      ngModelComponent.selectSignal.set('option-3');
      ngModelFixture.detectChanges();

      expect(ngModelDirective.value()).toBe('option-3');
    });

    it('should render multiple selections as space-delimited values with ngModel', () => {
      // Set multiple to true
      ngModelComponent.isMultiple = true;
      ngModelFixture.detectChanges();
      expect(ngModelDirective.isMultiple()).toBeTrue();

      // Set multiple values
      ngModelComponent.selectSignal.set(['option-1', 'option-2']);
      ngModelFixture.detectChanges();

      // Check that the value attribute is set correctly
      const selectElement = ngModelSelectEl.nativeElement;
      expect(selectElement.getAttribute('value')).toBe('option-1 option-2');

      // Update the values
      ngModelComponent.selectSignal.set(['option-2', 'option-3']);
      ngModelFixture.detectChanges();

      // Check that the value attribute is updated correctly
      expect(selectElement.getAttribute('value')).toBe('option-2 option-3');

      // Clear the values
      ngModelDirective.clear();
      ngModelFixture.detectChanges();

      // Check that the value attribute is cleared
      expect(selectElement.getAttribute('value')).toBe('');
      expect(ngModelComponent.selectSignal()).toEqual([]);
    });
  });

  // Tests for standalone attributes
  describe('standalone attributes', () => {
    it('should recognize all standalone attributes', () => {
      expect(standaloneDirective.clearable()).toBe('');
      expect(standaloneDirective.isClearable()).toBeTrue();

      expect(standaloneDirective.required()).toBe('');
      expect(standaloneDirective.isRequired()).toBeTrue();

      expect(standaloneDirective.multiple()).toBe('');
      expect(standaloneDirective.isMultiple()).toBeTrue();

      expect(standaloneDirective.pill()).toBe('');
      expect(standaloneDirective.isPill()).toBeTrue();

      expect(standaloneDirective.disabled()).toBe('');
      expect(standaloneDirective.isDisabled()).toBeTrue();

      expect(standaloneDirective.size()).toBe('small');
      expect(standaloneDirective.placeholder()).toBe('Select an option');
    });

    it('should not allow selection when disabled', () => {
      // Try to show the select
      standaloneDirective.show();
      standaloneFixture.detectChanges();

      // Should not open because it's disabled
      expect(standaloneDirective.open()).toBeFalse();
    });
  });

  // Tests for property binding
  describe('property binding', () => {
    it('should initialize with the correct values from property binding', () => {
      expect(bindingDirective.clearable()).toBe('true');
      expect(bindingDirective.isClearable()).toBeTrue();

      expect(bindingDirective.required()).toBe('true');
      expect(bindingDirective.isRequired()).toBeTrue();

      expect(bindingDirective.multiple()).toBe('true');
      expect(bindingDirective.isMultiple()).toBeTrue();

      expect(bindingDirective.pill()).toBe('true');
      expect(bindingDirective.isPill()).toBeTrue();

      expect(bindingDirective.disabled()).toBe(false);
      expect(bindingDirective.isDisabled()).toBeFalse();

      expect(bindingDirective.size()).toBe('large');
      expect(bindingDirective.placeholder()).toBe('Select an option');

      // Check array value
      expect(bindingDirective.value()).toEqual(['option-1', 'option-2']);

      // Check that the value attribute is set correctly
      const selectElement = bindingSelectEl.nativeElement;
      expect(selectElement.getAttribute('value')).toBe('option-1 option-2');
    });

    it('should update when property binding changes', () => {
      // Change disabled state
      bindingComponent.isDisabled = true;
      bindingFixture.detectChanges();

      expect(bindingDirective.disabled()).toBe(true);
      expect(bindingDirective.isDisabled()).toBeTrue();

      // Change size
      bindingComponent.size = 'small';
      bindingFixture.detectChanges();

      expect(bindingDirective.size()).toBe('small');

      // Change placeholder
      bindingComponent.placeholder = 'New placeholder';
      bindingFixture.detectChanges();

      expect(bindingDirective.placeholder()).toBe('New placeholder');
    });

    it('should handle multiple selection with property binding', () => {
      // Update the array
      bindingComponent.selectSignal.set(['option-2', 'option-3']);
      bindingFixture.detectChanges();

      expect(bindingDirective.value()).toEqual(['option-2', 'option-3']);

      // Check that the value attribute is updated correctly
      const selectElement = bindingSelectEl.nativeElement;
      expect(selectElement.getAttribute('value')).toBe('option-2 option-3');

      // Clear the values
      bindingDirective.clear();
      bindingFixture.detectChanges();

      expect(bindingDirective.value()).toEqual([]);
      expect(bindingComponent.selectSignal()).toEqual([]);
      expect(selectElement.getAttribute('value')).toBe('');
    });

    it('should render multiple selections as space-delimited values with property binding', () => {
      // Check initial state
      const selectElement = bindingSelectEl.nativeElement;
      expect(selectElement.getAttribute('value')).toBe('option-1 option-2');

      // Update with more values
      bindingComponent.selectSignal.set(['option-1', 'option-2', 'option-3']);
      bindingFixture.detectChanges();

      // Check that the value attribute is updated correctly
      expect(selectElement.getAttribute('value')).toBe('option-1 option-2 option-3');

      // Update with fewer values
      bindingComponent.selectSignal.set(['option-3']);
      bindingFixture.detectChanges();

      // Check that the value attribute is updated correctly
      expect(selectElement.getAttribute('value')).toBe('option-3');
    });
  });

  // Tests for form validation
  describe('form validation', () => {
    it('should validate required field', () => {
      // Create a mock AbstractControl
      const control = { value: null } as any;

      // Test validation with required field
      const errors = ngModelDirective.validate(control);

      expect(errors).not.toBeNull();
      expect(errors?.['required']).toBeTrue();
    });

    it('should pass validation when value is provided', () => {
      // Create a mock AbstractControl
      const control = { value: 'option-1' } as any;

      // Test validation with a value
      const errors = ngModelDirective.validate(control);

      expect(errors).toBeNull();
    });

    it('should validate multiple selection', () => {
      // Set multiple to true
      bindingComponent.selectSignal.set([]);
      bindingFixture.detectChanges();

      // Create a mock AbstractControl
      const control = { value: [] } as any;

      // Test validation with empty array
      const errors = bindingDirective.validate(control);

      expect(errors).not.toBeNull();
      expect(errors?.['required']).toBeTrue();

      // Update with values
      control.value = ['option-1'];
      const validErrors = bindingDirective.validate(control);

      expect(validErrors).toBeNull();
    });
  });
});
