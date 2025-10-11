import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaInputDirective } from './input.directive';
import { FormsModule } from '@angular/forms';

// Create a test host component to test the input directive
@Component({
  template: `
    <wa-input
      [(ngModel)]="value"
      [type]="type"
      [size]="size"
      [appearance]="appearance"
      [pill]="pill"
      [label]="label"
      [hint]="hint"
      [clearable]="clearable"
      [placeholder]="placeholder"
      [readonly]="readonly"
      [passwordToggle]="passwordToggle"
      [passwordVisible]="passwordVisible"
      [noSpinButtons]="noSpinButtons"
      [form]="form"
      [required]="required"
      [pattern]="pattern"
      [minlength]="minlength"
      [maxlength]="maxlength"
      [min]="min"
      [max]="max"
      [step]="step"
      [autocapitalize]="autocapitalize"
      [autocorrect]="autocorrect"
      [autocomplete]="autocomplete"
      [autofocus]="autofocus"
      [enterkeyhint]="enterkeyhint"
      [spellcheck]="spellcheck"
      [inputmode]="inputmode"
      [withLabel]="withLabel"
      [withHint]="withHint"
      [backgroundColor]="backgroundColor"
      [borderColor]="borderColor"
      [borderWidth]="borderWidth"
      [boxShadow]="boxShadow"
      (input)="onInput($event)"
      (change)="onChange($event)"
      (focusEvent)="onFocus($event)"
      (blurEvent)="onBlur($event)"
      (waClear)="onClear($event)"
      (waInvalid)="onInvalid($event)"
    ></wa-input>
  `,
  standalone: true,
  imports: [WaInputDirective, FormsModule]
})
class TestHostComponent {
  value?: string | number | null;
  type?: string;
  size?: 'small' | 'medium' | 'large' | 'inherit' | string;
  appearance?: 'filled' | 'outlined' | string;
  pill?: boolean | string;
  label?: string;
  hint?: string;
  clearable?: boolean | string;
  placeholder?: string;
  readonly?: boolean | string;
  passwordToggle?: boolean | string;
  passwordVisible?: boolean | string;
  noSpinButtons?: boolean | string;
  form?: string | null;
  required?: boolean | string;
  pattern?: string;
  minlength?: number | string;
  maxlength?: number | string;
  min?: number | string;
  max?: number | string;
  step?: number | 'any' | string;
  autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' | string;
  autocorrect?: 'on' | 'off' | string;
  autocomplete?: string;
  autofocus?: boolean | string;
  enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | string;
  spellcheck?: boolean | string;
  inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' | string;
  withLabel?: boolean | string;
  withHint?: boolean | string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  boxShadow?: string;

  onInput(event: Event): void {}
  onChange(event: Event): void {}
  onFocus(event: FocusEvent): void {}
  onBlur(event: FocusEvent): void {}
  onClear(event: CustomEvent): void {}
  onInvalid(event: CustomEvent): void {}
}

describe('WaInputDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let inputElement: HTMLElement;
  let inputDirective: WaInputDirective;

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

    // Get the wa-input element
    inputElement = hostFixture.nativeElement.querySelector('wa-input');
    inputDirective = hostFixture.debugElement.query(sel => sel.nativeElement === inputElement).injector.get(WaInputDirective);
  });

  it('should create the input directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(inputElement).toBeTruthy();
    expect(inputDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.type = 'email';
    hostComponent.value = 'test@example.com';
    hostComponent.size = 'large';
    hostComponent.appearance = 'outlined';
    hostComponent.label = 'Email';
    hostComponent.hint = 'Enter your email address';
    hostComponent.placeholder = 'example@example.com';
    hostComponent.form = 'test-form';
    hostComponent.pattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    hostComponent.autocapitalize = 'off';
    hostComponent.autocorrect = 'off';
    hostComponent.autocomplete = 'email';
    hostComponent.enterkeyhint = 'next';
    hostComponent.inputmode = 'email';
    hostFixture.detectChanges();

    expect(inputElement.getAttribute('type')).toBe('email');
    expect(inputElement.getAttribute('value')).toBe('test@example.com');
    expect(inputElement.getAttribute('size')).toBe('large');
    expect(inputElement.getAttribute('appearance')).toBe('outlined');
    expect(inputElement.getAttribute('label')).toBe('Email');
    expect(inputElement.getAttribute('hint')).toBe('Enter your email address');
    expect(inputElement.getAttribute('placeholder')).toBe('example@example.com');
    expect(inputElement.getAttribute('form')).toBe('test-form');
    expect(inputElement.getAttribute('pattern')).toBe('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    expect(inputElement.getAttribute('autocapitalize')).toBe('off');
    expect(inputElement.getAttribute('autocorrect')).toBe('off');
    expect(inputElement.getAttribute('autocomplete')).toBe('email');
    expect(inputElement.getAttribute('enterkeyhint')).toBe('next');
    expect(inputElement.getAttribute('inputmode')).toBe('email');
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.minlength = 5;
    hostComponent.maxlength = 50;
    hostComponent.min = 1;
    hostComponent.max = 100;
    hostComponent.step = 2;
    hostFixture.detectChanges();

    expect(inputElement.getAttribute('minlength')).toBe('5');
    expect(inputElement.getAttribute('maxlength')).toBe('50');
    expect(inputElement.getAttribute('min')).toBe('1');
    expect(inputElement.getAttribute('max')).toBe('100');
    expect(inputElement.getAttribute('step')).toBe('2');
  });

  it('should handle "any" as step value', () => {
    hostComponent.step = 'any';
    hostFixture.detectChanges();
    expect(inputElement.getAttribute('step')).toBe('any');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.pill = true;
    hostComponent.clearable = true;
    hostComponent.readonly = true;
    hostComponent.passwordToggle = true;
    hostComponent.passwordVisible = true;
    hostComponent.noSpinButtons = true;
    hostComponent.required = true;
    hostComponent.autofocus = true;
    hostComponent.spellcheck = true;
    hostComponent.withLabel = true;
    hostComponent.withHint = true;
    hostFixture.detectChanges();

    expect(inputElement.hasAttribute('pill')).toBeTrue();
    expect(inputElement.hasAttribute('clearable')).toBeTrue();
    expect(inputElement.hasAttribute('readonly')).toBeTrue();
    expect(inputElement.hasAttribute('password-toggle')).toBeTrue();
    expect(inputElement.hasAttribute('password-visible')).toBeTrue();
    expect(inputElement.hasAttribute('no-spin-buttons')).toBeTrue();
    expect(inputElement.hasAttribute('required')).toBeTrue();
    expect(inputElement.hasAttribute('autofocus')).toBeTrue();
    expect(inputElement.hasAttribute('spellcheck')).toBeTrue();
    expect(inputElement.hasAttribute('with-label')).toBeTrue();
    expect(inputElement.hasAttribute('with-hint')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.pill = false;
    hostComponent.clearable = false;
    hostComponent.readonly = false;
    hostComponent.passwordToggle = false;
    hostComponent.passwordVisible = false;
    hostComponent.noSpinButtons = false;
    hostComponent.required = false;
    hostComponent.autofocus = false;
    hostComponent.spellcheck = false;
    hostComponent.withLabel = false;
    hostComponent.withHint = false;
    hostFixture.detectChanges();

    expect(inputElement.hasAttribute('pill')).toBeFalse();
    expect(inputElement.hasAttribute('clearable')).toBeFalse();
    expect(inputElement.hasAttribute('readonly')).toBeFalse();
    expect(inputElement.hasAttribute('password-toggle')).toBeFalse();
    expect(inputElement.hasAttribute('password-visible')).toBeFalse();
    expect(inputElement.hasAttribute('no-spin-buttons')).toBeFalse();
    expect(inputElement.hasAttribute('required')).toBeFalse();
    expect(inputElement.hasAttribute('autofocus')).toBeFalse();
    expect(inputElement.hasAttribute('spellcheck')).toBeFalse();
    expect(inputElement.hasAttribute('with-label')).toBeFalse();
    expect(inputElement.hasAttribute('with-hint')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.pill = 'true';
    hostComponent.clearable = '';
    hostFixture.detectChanges();

    expect(inputElement.hasAttribute('pill')).toBeTrue();
    expect(inputElement.hasAttribute('clearable')).toBeTrue();
  });

  it('should set style attributes correctly', () => {
    hostComponent.backgroundColor = '#f5f5f5';
    hostComponent.borderColor = '#3366ff';
    hostComponent.borderWidth = '2px';
    hostComponent.boxShadow = '0 0 5px rgba(51, 102, 255, 0.5)';
    hostFixture.detectChanges();

    expect(inputElement.style.getPropertyValue('--background-color')).toBe('#f5f5f5');
    expect(inputElement.style.getPropertyValue('--border-color')).toBe('#3366ff');
    expect(inputElement.style.getPropertyValue('--border-width')).toBe('2px');
    expect(inputElement.style.getPropertyValue('--box-shadow')).toBe('0 0 5px rgba(51, 102, 255, 0.5)');
  });

  it('should expose methods for programmatic interaction', () => {
    // Mock the native element methods
    spyOn(inputElement, 'focus');
    spyOn(inputElement, 'blur');
    spyOn(inputElement, 'select');
    spyOn(inputElement, 'setSelectionRange');
    spyOn(inputElement, 'setRangeText');
    spyOn(inputElement, 'showPicker');
    spyOn(inputElement, 'stepUp');
    spyOn(inputElement, 'stepDown');

    // Call the directive methods
    inputDirective.focus();
    inputDirective.blur();
    inputDirective.select();
    inputDirective.setSelectionRange(0, 5, 'forward');
    inputDirective.setRangeText('test', 0, 4, 'select');
    inputDirective.showPicker();
    inputDirective.stepUp();
    inputDirective.stepDown();

    // Verify the methods were called
    expect(inputElement.focus).toHaveBeenCalled();
    expect(inputElement.blur).toHaveBeenCalled();
    expect(inputElement.select).toHaveBeenCalled();
    expect(inputElement.setSelectionRange).toHaveBeenCalledWith(0, 5, 'forward');
    expect(inputElement.setRangeText).toHaveBeenCalledWith('test', 0, 4, 'select');
    expect(inputElement.showPicker).toHaveBeenCalled();
    expect(inputElement.stepUp).toHaveBeenCalled();
    expect(inputElement.stepDown).toHaveBeenCalled();
  });

  it('should expose the native element', () => {
    expect(inputDirective.nativeElement).toBe(inputElement);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onInput');
    spyOn(hostComponent, 'onChange');
    spyOn(hostComponent, 'onFocus');
    spyOn(hostComponent, 'onBlur');
    spyOn(hostComponent, 'onClear');
    spyOn(hostComponent, 'onInvalid');

    // Create mock events
    const inputEvent = new Event('input');
    const changeEvent = new Event('change');
    const focusEvent = new FocusEvent('focus');
    const blurEvent = new FocusEvent('blur');
    const clearEvent = new CustomEvent('waClear');
    const invalidEvent = new CustomEvent('waInvalid');

    // Dispatch events on the native element
    inputElement.dispatchEvent(inputEvent);
    inputElement.dispatchEvent(changeEvent);
    inputElement.dispatchEvent(focusEvent);
    inputElement.dispatchEvent(blurEvent);
    inputElement.dispatchEvent(clearEvent);
    inputElement.dispatchEvent(invalidEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onInput).toHaveBeenCalled();
    expect(hostComponent.onChange).toHaveBeenCalled();
    expect(hostComponent.onFocus).toHaveBeenCalled();
    expect(hostComponent.onBlur).toHaveBeenCalled();
    expect(hostComponent.onClear).toHaveBeenCalled();
    expect(hostComponent.onInvalid).toHaveBeenCalled();
  });

  it('should update ngModel when native change event fires', () => {
    hostComponent.value = '';
    hostFixture.detectChanges();

    // Simulate user typing then blurring causing a change
    (inputElement as any).value = 'hello world';
    inputElement.setAttribute('value', 'hello world');
    inputElement.dispatchEvent(new Event('change'));
    hostFixture.detectChanges();

    expect(hostComponent.value).toBe('hello world');
  });

  it('should handle different size values', () => {
    const sizes = ['small', 'medium', 'large', 'inherit'];

    sizes.forEach(size => {
      hostComponent.size = size;
      hostFixture.detectChanges();
      expect(inputElement.getAttribute('size')).toBe(size);
    });
  });

  it('should handle different appearance values', () => {
    const appearances = ['filled', 'outlined'];

    appearances.forEach(appearance => {
      hostComponent.appearance = appearance;
      hostFixture.detectChanges();
      expect(inputElement.getAttribute('appearance')).toBe(appearance);
    });
  });

  it('should implement ControlValueAccessor correctly', () => {
    // Test writeValue
    inputDirective.writeValue('test value');
    expect(inputElement.getAttribute('value')).toBe('test value');

    // Test setDisabledState
    inputDirective.setDisabledState(true);
    expect(inputElement.hasAttribute('disabled')).toBeTrue();

    inputDirective.setDisabledState(false);
    expect(inputElement.hasAttribute('disabled')).toBeFalse();
  });
});
