import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WaOptionDirective } from './option.directive';

// Test component that uses the directive
@Component({
  template: `
    <wa-option value="option-1" [selected]="isSelected" [disabled]="isDisabled">Option 1</wa-option>
  `,
  standalone: true,
  imports: [WaOptionDirective]
})
class TestComponent {
  isSelected: boolean = false;
  isDisabled: boolean = false;
}

describe('WaOptionDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let optionEl: DebugElement;
  let directive: WaOptionDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    optionEl = fixture.debugElement.query(By.directive(WaOptionDirective));
    directive = optionEl.injector.get(WaOptionDirective);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should initialize with the correct values', () => {
    expect(directive.value()).toBe('option-1');
    expect(directive.selected()).toBe(false);
    expect(directive.disabled()).toBe(false);
  });

  it('should update when properties change', () => {
    component.isSelected = true;
    component.isDisabled = true;
    fixture.detectChanges();

    expect(directive.selected()).toBe(true);
    expect(directive.disabled()).toBe(true);
  });

  it('should recognize selected as a standalone attribute', () => {
    // Create a new test component with selected as a standalone attribute
    @Component({
      template: `<wa-option value="option-1" selected>Option 1</wa-option>`,
      standalone: true,
      imports: [WaOptionDirective]
    })
    class SelectedAttributeComponent {}

    const selectedFixture = TestBed.createComponent(SelectedAttributeComponent);
    const selectedOptionEl = selectedFixture.debugElement.query(By.directive(WaOptionDirective));
    const selectedDirective = selectedOptionEl.injector.get(WaOptionDirective);

    selectedFixture.detectChanges();

    // Check that selected is enabled
    expect(selectedDirective.selected()).toBe('');
    expect(selectedDirective.isSelected()).toBeTrue();
  });

  it('should handle selected="true" attribute', () => {
    // Create a new test component with selected="true"
    @Component({
      template: `<wa-option value="option-1" selected="true">Option 1</wa-option>`,
      standalone: true,
      imports: [WaOptionDirective]
    })
    class TrueSelectedComponent {}

    const trueFixture = TestBed.createComponent(TrueSelectedComponent);
    const trueOptionEl = trueFixture.debugElement.query(By.directive(WaOptionDirective));
    const trueDirective = trueOptionEl.injector.get(WaOptionDirective);

    trueFixture.detectChanges();

    // Check that selected is enabled
    expect(trueDirective.selected()).toBe('true');
    expect(trueDirective.isSelected()).toBeTrue();
  });

  it('should handle selected="false" attribute', () => {
    // Create a new test component with selected="false"
    @Component({
      template: `<wa-option value="option-1" selected="false">Option 1</wa-option>`,
      standalone: true,
      imports: [WaOptionDirective]
    })
    class FalseSelectedComponent {}

    const falseFixture = TestBed.createComponent(FalseSelectedComponent);
    const falseOptionEl = falseFixture.debugElement.query(By.directive(WaOptionDirective));
    const falseDirective = falseOptionEl.injector.get(WaOptionDirective);

    falseFixture.detectChanges();

    // Check that selected is disabled
    expect(falseDirective.selected()).toBe('false');
    expect(falseDirective.isSelected()).toBeFalse();
  });

  it('should recognize disabled as a standalone attribute', () => {
    // Create a new test component with disabled as a standalone attribute
    @Component({
      template: `<wa-option value="option-1" disabled>Option 1</wa-option>`,
      standalone: true,
      imports: [WaOptionDirective]
    })
    class DisabledAttributeComponent {}

    const disabledFixture = TestBed.createComponent(DisabledAttributeComponent);
    const disabledOptionEl = disabledFixture.debugElement.query(By.directive(WaOptionDirective));
    const disabledDirective = disabledOptionEl.injector.get(WaOptionDirective);

    disabledFixture.detectChanges();

    // Check that disabled is enabled
    expect(disabledDirective.disabled()).toBe('');
    expect(disabledDirective.isDisabled()).toBeTrue();
  });

  it('should handle disabled="true" attribute', () => {
    // Create a new test component with disabled="true"
    @Component({
      template: `<wa-option value="option-1" disabled="true">Option 1</wa-option>`,
      standalone: true,
      imports: [WaOptionDirective]
    })
    class TrueDisabledComponent {}

    const trueFixture = TestBed.createComponent(TrueDisabledComponent);
    const trueOptionEl = trueFixture.debugElement.query(By.directive(WaOptionDirective));
    const trueDirective = trueOptionEl.injector.get(WaOptionDirective);

    trueFixture.detectChanges();

    // Check that disabled is enabled
    expect(trueDirective.disabled()).toBe('true');
    expect(trueDirective.isDisabled()).toBeTrue();
  });

  it('should handle disabled="false" attribute', () => {
    // Create a new test component with disabled="false"
    @Component({
      template: `<wa-option value="option-1" disabled="false">Option 1</wa-option>`,
      standalone: true,
      imports: [WaOptionDirective]
    })
    class FalseDisabledComponent {}

    const falseFixture = TestBed.createComponent(FalseDisabledComponent);
    const falseOptionEl = falseFixture.debugElement.query(By.directive(WaOptionDirective));
    const falseDirective = falseOptionEl.injector.get(WaOptionDirective);

    falseFixture.detectChanges();

    // Check that disabled is disabled
    expect(falseDirective.disabled()).toBe('false');
    expect(falseDirective.isDisabled()).toBeFalse();
  });

  it('should get the label from the element content', () => {
    expect(directive.label).toBe('Option 1');
  });
});
