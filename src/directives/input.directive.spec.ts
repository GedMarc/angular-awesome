import {Component, DebugElement, signal} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { WaInputDirective } from './input.directive';

// Test component that uses the directive with model()
@Component({
  template: `
    <wa-input [(value)]="testValue"
           clearable="true"
           [password-toggle]="isPassword"
           [type]="inputType"
           [placeholder]="placeholder"
           (inputChange)="onInputChange($event)">
    </wa-input>
  `,
  standalone: true,
  imports: [WaInputDirective]
})
class TestComponent {
  testValue: string = 'initial value';
  isPassword: boolean = false;
  inputType: 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' = 'text';
  placeholder: string = 'Enter text';

  onInputChange(event: any) {
    // Test event handler
  }
}

@Component({
  template: `
    <wa-input clearable="true"
              passwordToggle="isPassword"
              password-visible
              required type="text"
              [placeholder]="placeholder"
              [(ngModel)]="inputSignal">
    </wa-input>
  `,
  standalone: true,
  imports: [WaInputDirective, FormsModule]
})
class TestComponent2 {
  placeholder: string = 'Enter text';
  inputSignal = signal('')
}


@Component({
  template: `
    <wa-input clearable="true"
           required type="number"
              min="0"
              max="3"
              step="1"
              readonly
              autocapitalize
              autofocus
              pill
              spellcheck
              with-label
              label="label input"
              size="small"
              inputmode="numeric"
           placeholder="placeholder"
           [(ngModel)]="inputSignal">
    </wa-input>
  `,
  standalone: true,
  imports: [WaInputDirective, FormsModule]
})
class TestComponentNumber {
  placeholder: string = 'Enter number';
  inputSignal = signal(0)
}

@Component({
  template: `
    <wa-input clearable="true"
           required [type]="'number'"
              [min]="0"
              [max]="3"
              [step]="1"
              [readonly]="true"
              autocapitalize="sentences"
              [autofocus]="true"
              [pill]="true"
              [spellcheck]="true"
              size="large"
           placeholder="placeholder"
           [(ngModel)]="inputSignal">
    </wa-input>
  `,
  standalone: true,
  imports: [WaInputDirective, FormsModule]
})
class TestComponentNumberBinding {
  placeholder: string = 'Enter number';
  inputSignal = signal(0)
}



describe('WaInputDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;
  let directive: WaInputDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.directive(WaInputDirective));
    directive = inputEl.injector.get(WaInputDirective);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should initialize with the correct values', () => {
    expect(inputEl.nativeElement.value).toBe('initial value');
    expect(directive.clearable()).toBe('true');
    expect(directive.passwordToggle()).toBe(false);
    expect(directive.type()).toBe('text');
    expect(directive.placeholder()).toBe('Enter text');
  });

  it('should update the model when input value changes', () => {
    inputEl.nativeElement.value = 'new value';
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.testValue).toBe('new value');
  });

  it('should update the input when model changes', () => {
    component.testValue = 'updated value';
    fixture.detectChanges();

    expect(inputEl.nativeElement.value).toBe('updated value');
  });


  it('should recognize password-toggle as a standalone attribute', () => {
    // Create a new test component with password-toggle as a standalone attribute
    @Component({
      template: `<wa-input password-toggle type="password"></wa-input>`,
      standalone: true,
      imports: [WaInputDirective]
    })
    class StandaloneAttributeComponent {}

    const standaloneFixture = TestBed.createComponent(StandaloneAttributeComponent);
    const standaloneInputEl = standaloneFixture.debugElement.query(By.directive(WaInputDirective));
    const standaloneDirective = standaloneInputEl.injector.get(WaInputDirective);

    standaloneFixture.detectChanges();

    // Check that password toggle is enabled
    expect(standaloneDirective.passwordToggleAttr()).toBe('');
  });

  it('should handle password-toggle="true" attribute', () => {
    // Create a new test component with password-toggle="true"
    @Component({
      template: `<wa-input password-toggle="true" type="password"></wa-input>`,
      standalone: true,
      imports: [WaInputDirective]
    })
    class TrueAttributeComponent {}

    const trueFixture = TestBed.createComponent(TrueAttributeComponent);
    const trueInputEl = trueFixture.debugElement.query(By.directive(WaInputDirective));
    const trueDirective = trueInputEl.injector.get(WaInputDirective);

    trueFixture.detectChanges();

    // Check that password toggle is enabled
    expect(trueDirective.passwordToggleAttr()).toBe('true');
  });

  it('should handle password-toggle="false" attribute', () => {
    // Create a new test component with password-toggle="false"
    @Component({
      template: `<wa-input password-toggle="false" type="password"></wa-input>`,
      standalone: true,
      imports: [WaInputDirective]
    })
    class FalseAttributeComponent {}

    const falseFixture = TestBed.createComponent(FalseAttributeComponent);
    const falseInputEl = falseFixture.debugElement.query(By.directive(WaInputDirective));
    const falseDirective = falseInputEl.injector.get(WaInputDirective);

    falseFixture.detectChanges();

    // Check that password toggle is disabled
    expect(falseDirective.passwordToggleAttr()).toBe('false');
  });

  it('should recognize clearable as a standalone attribute', () => {
    // Create a new test component with clearable as a standalone attribute
    @Component({
      template: `<wa-input clearable></wa-input>`,
      standalone: true,
      imports: [WaInputDirective]
    })
    class StandaloneClearableComponent {}

    const standaloneFixture = TestBed.createComponent(StandaloneClearableComponent);
    const standaloneInputEl = standaloneFixture.debugElement.query(By.directive(WaInputDirective));
    const standaloneDirective = standaloneInputEl.injector.get(WaInputDirective);

    standaloneFixture.detectChanges();
  });

  it('should handle clearable="true" attribute', () => {
    // Create a new test component with clearable="true"
    @Component({
      template: `<wa-input clearable="true"></wa-input>`,
      standalone: true,
      imports: [WaInputDirective]
    })
    class TrueClearableComponent {}

    const trueFixture = TestBed.createComponent(TrueClearableComponent);
    const trueInputEl = trueFixture.debugElement.query(By.directive(WaInputDirective));
    const trueDirective = trueInputEl.injector.get(WaInputDirective);

    trueFixture.detectChanges();

    // Check that clearable is enabled
    expect(trueDirective.clearable()).toBe('true');
  });

  it('should handle clearable="false" attribute', () => {
    // Create a new test component with clearable="false"
    @Component({
      template: `<wa-input clearable="false"></wa-input>`,
      standalone: true,
      imports: [WaInputDirective]
    })
    class FalseClearableComponent {}

    const falseFixture = TestBed.createComponent(FalseClearableComponent);
    const falseInputEl = falseFixture.debugElement.query(By.directive(WaInputDirective));
    const falseDirective = falseInputEl.injector.get(WaInputDirective);

    falseFixture.detectChanges();

    // Check that clearable is disabled
    expect(falseDirective.clearable()).toBe('false');
  });
});
