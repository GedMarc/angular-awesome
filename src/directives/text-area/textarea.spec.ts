import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaTextareaComponent } from './textarea.component';

// Create a test host component for the textarea component
@Component({
  template: `
    <wa-textarea
      [(ngModel)]="value"
      [label]="label"
      [hint]="hint"
      [placeholder]="placeholder"
      [rows]="rows"
      [resize]="resize"
      [size]="size"
      [appearance]="appearance"
      [name]="name"
      [required]="required"
      [minlength]="minlength"
      [maxlength]="maxlength"
      [autocapitalize]="autocapitalize"
      [autocorrect]="autocorrect"
      [autocomplete]="autocomplete"
      [autofocus]="autofocus"
      [enterkeyhint]="enterkeyhint"
      [spellcheck]="spellcheck"
      [inputmode]="inputmode"
      [readonly]="readonly"
      [disabled]="disabled"
      [withLabel]="withLabel"
      [withHint]="withHint"
      [backgroundColor]="backgroundColor"
      [borderColor]="borderColor"
      [borderWidth]="borderWidth"
      [boxShadow]="boxShadow"
      (wa-focus)="onFocus($event)"
      (wa-blur)="onBlur($event)"
      (wa-input)="onInput($event)"
      (wa-change)="onChange($event)"
      (wa-invalid)="onInvalid($event)"
    ></wa-textarea>
  `,
  standalone: true,
  imports: [WaTextareaComponent, FormsModule]
})
class TestHostComponent {
  value = '';
  label?: string;
  hint?: string;
  placeholder?: string;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both' | 'auto';
  size?: 'small' | 'medium' | 'large' | 'inherit';
  appearance?: 'filled' | 'outlined';
  name?: string;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
  autocorrect?: string;
  autocomplete?: string;
  autofocus?: boolean;
  enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  spellcheck?: boolean;
  inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  readonly?: boolean;
  disabled?: boolean;
  withLabel?: boolean;
  withHint?: boolean;

  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  boxShadow?: string;

  focusCalled = false;
  blurCalled = false;
  inputCalled = false;
  changeCalled = false;
  invalidCalled = false;

  onFocus(event: FocusEvent) {
    this.focusCalled = true;
  }

  onBlur(event: FocusEvent) {
    this.blurCalled = true;
  }

  onInput(event: Event) {
    this.inputCalled = true;
  }

  onChange(event: Event) {
    this.changeCalled = true;
  }

  onInvalid(event: CustomEvent) {
    this.invalidCalled = true;
  }
}

describe('WaTextareaComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let textareaElement: HTMLElement;

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

    // Get the wa-textarea element
    textareaElement = hostFixture.nativeElement.querySelector('wa-textarea');
  });

  it('should create the textarea component', () => {
    expect(hostComponent).toBeTruthy();
    expect(textareaElement).toBeTruthy();
  });

  it('should set basic attributes correctly', () => {
    hostComponent.label = 'Test Label';
    hostComponent.hint = 'Test Hint';
    hostComponent.placeholder = 'Test Placeholder';
    hostComponent.rows = 5;
    hostFixture.detectChanges();

    expect(textareaElement.getAttribute('label')).toBe('Test Label');
    expect(textareaElement.getAttribute('hint')).toBe('Test Hint');
    expect(textareaElement.getAttribute('placeholder')).toBe('Test Placeholder');
    expect(textareaElement.getAttribute('rows')).toBe('5');
  });

  it('should set appearance and size attributes correctly', () => {
    hostComponent.appearance = 'filled';
    hostComponent.size = 'large';
    hostFixture.detectChanges();

    expect(textareaElement.getAttribute('appearance')).toBe('filled');
    expect(textareaElement.getAttribute('size')).toBe('large');
  });

  it('should set resize attribute correctly', () => {
    hostComponent.resize = 'none';
    hostFixture.detectChanges();
    expect(textareaElement.getAttribute('resize')).toBe('none');

    hostComponent.resize = 'vertical';
    hostFixture.detectChanges();
    expect(textareaElement.getAttribute('resize')).toBe('vertical');
  });

  it('should set validation attributes correctly', () => {
    hostComponent.required = true;
    hostComponent.minlength = 10;
    hostComponent.maxlength = 100;
    hostFixture.detectChanges();

    expect(textareaElement.hasAttribute('required')).toBe(true);
    expect(textareaElement.getAttribute('minlength')).toBe('10');
    expect(textareaElement.getAttribute('maxlength')).toBe('100');
  });

  it('should set state attributes correctly', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();
    expect(textareaElement.hasAttribute('disabled')).toBe(true);

    hostComponent.disabled = false;
    hostComponent.readonly = true;
    hostFixture.detectChanges();
    expect(textareaElement.hasAttribute('disabled')).toBe(false);
    expect(textareaElement.hasAttribute('readonly')).toBe(true);
  });

  it('should set input mode and related attributes correctly', () => {
    hostComponent.inputmode = 'email';
    hostComponent.autocomplete = 'email';
    hostComponent.autocapitalize = 'sentences';
    hostComponent.spellcheck = true;
    hostFixture.detectChanges();

    expect(textareaElement.getAttribute('inputmode')).toBe('email');
    expect(textareaElement.getAttribute('autocomplete')).toBe('email');
    expect(textareaElement.getAttribute('autocapitalize')).toBe('sentences');
    expect(textareaElement.getAttribute('spellcheck')).toBe('true');
  });

  it('should set style attributes correctly', () => {
    hostComponent.backgroundColor = '#f5f5f5';
    hostComponent.borderColor = '#2196F3';
    hostComponent.borderWidth = '2px';
    hostComponent.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    hostFixture.detectChanges();

    expect(textareaElement.style.getPropertyValue('--background-color')).toBe('#f5f5f5');
    expect(textareaElement.style.getPropertyValue('--border-color')).toBe('#2196F3');
    expect(textareaElement.style.getPropertyValue('--border-width')).toBe('2px');
    expect(textareaElement.style.getPropertyValue('--box-shadow')).toBe('0 4px 8px rgba(0,0,0,0.1)');
  });

  it('should handle ngModel binding', () => {
    // Update model -> view
    hostComponent.value = 'Test Value';
    hostFixture.detectChanges();
    expect(textareaElement.getAttribute('value')).toBe('Test Value');
  });

  it('should emit events correctly', () => {
    // Simulate focus event
    textareaElement.dispatchEvent(new FocusEvent('wa-focus'));
    expect(hostComponent.focusCalled).toBe(true);

    // Simulate blur event
    textareaElement.dispatchEvent(new FocusEvent('wa-blur'));
    expect(hostComponent.blurCalled).toBe(true);

    // Simulate input event
    textareaElement.dispatchEvent(new Event('wa-input'));
    expect(hostComponent.inputCalled).toBe(true);

    // Simulate change event
    textareaElement.dispatchEvent(new Event('wa-change'));
    expect(hostComponent.changeCalled).toBe(true);

    // Simulate invalid event
    textareaElement.dispatchEvent(new CustomEvent('wa-invalid'));
    expect(hostComponent.invalidCalled).toBe(true);
  });
});
