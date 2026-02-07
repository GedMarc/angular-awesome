import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaRadioGroupDirective, WaRadioDirective, WaRadioButtonDirective } from './radio.directive';
import { FormsModule } from '@angular/forms';

// Create a test host component for WaRadioGroupDirective
@Component({
  template: `
    <wa-radio-group
      [(ngModel)]="value"
      [label]="label"
      [hint]="hint"
      [name]="name"
      [orientation]="orientation"
      [size]="size"
      [required]="required"
      [withLabel]="withLabel"
      [withHint]="withHint"
      [styleRadiosGap]="styleRadiosGap"
      (wa-input)="onInput($event)"
      (wa-change)="onChange($event)"
      (wa-focus)="onFocus($event)"
      (wa-blur)="onBlur($event)"
      (wa-invalid)="onInvalid($event)"
    >
      <ng-content></ng-content>
    </wa-radio-group>
  `,
  standalone: true,
  imports: [WaRadioGroupDirective, FormsModule]
})
class RadioGroupTestHostComponent {
  value?: string | null;
  label?: string;
  hint?: string;
  name?: string;
  orientation?: 'horizontal' | 'vertical' | string;
  size?: 'small' | 'medium' | 'large' | 'inherit' | string;
  required?: boolean | string;
  withLabel?: boolean | string;
  withHint?: boolean | string;
  styleRadiosGap?: string;

  onInput(event: Event): void {}
  onChange(event: Event): void {}
  onFocus(event: FocusEvent): void {}
  onBlur(event: FocusEvent): void {}
  onInvalid(event: CustomEvent): void {}
}

// Create a test host component for WaRadioDirective
@Component({
  template: `
    <wa-radio
      [value]="value"
      [checked]="checked"
      [disabled]="disabled"
      [styleBackgroundColor]="styleBackgroundColor"
      [styleBackgroundColorChecked]="styleBackgroundColorChecked"
      [styleBorderColor]="styleBorderColor"
      [styleBorderColorChecked]="styleBorderColorChecked"
      [styleBorderStyle]="styleBorderStyle"
      [styleBorderWidth]="styleBorderWidth"
      [styleBoxShadow]="styleBoxShadow"
      [styleCheckedIconColor]="styleCheckedIconColor"
      [styleCheckedIconScale]="styleCheckedIconScale"
      [styleToggleSize]="styleToggleSize"
    >
      {{ radioText }}
    </wa-radio>
  `,
  standalone: true,
  imports: [WaRadioDirective]
})
class RadioTestHostComponent {
  value?: string;
  checked?: boolean | string;
  disabled?: boolean | string;
  styleBackgroundColor?: string;
  styleBackgroundColorChecked?: string;
  styleBorderColor?: string;
  styleBorderColorChecked?: string;
  styleBorderStyle?: string;
  styleBorderWidth?: string;
  styleBoxShadow?: string;
  styleCheckedIconColor?: string;
  styleCheckedIconScale?: string;
  styleToggleSize?: string;
  radioText = 'Radio Option';
}

// Create a test host component for WaRadioDirective with appearance="button"
@Component({
  template: `
    <wa-radio
      appearance="button"
      [value]="value"
      [checked]="checked"
      [disabled]="disabled"
      [withPrefix]="withPrefix"
      [withSuffix]="withSuffix"
      [styleIndicatorColor]="styleIndicatorColor"
      [styleIndicatorWidth]="styleIndicatorWidth"
      [styleDisplay]="styleDisplay"
    >
      <div *ngIf="prefixContent" slot="start">{{ prefixContent }}</div>
      {{ buttonText }}
      <div *ngIf="suffixContent" slot="end">{{ suffixContent }}</div>
    </wa-radio>
  `,
  standalone: true,
  imports: [WaRadioDirective]
})
class RadioButtonTestHostComponent {
  value?: string;
  checked?: boolean | string;
  disabled?: boolean | string;
  withPrefix?: boolean | string;
  withSuffix?: boolean | string;
  styleIndicatorColor?: string;
  styleIndicatorWidth?: string;
  styleDisplay?: string;
  buttonText = 'Radio Button';
  prefixContent?: string;
  suffixContent?: string;
}

describe('WaRadioGroupDirective', () => {
  let hostComponent: RadioGroupTestHostComponent;
  let hostFixture: ComponentFixture<RadioGroupTestHostComponent>;
  let radioGroupElement: HTMLElement;
  let radioGroupDirective: WaRadioGroupDirective;

  beforeEach(async () => {
    // Mock the customElements API
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [RadioGroupTestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(RadioGroupTestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    // Get the wa-radio-group element
    radioGroupElement = hostFixture.nativeElement.querySelector('wa-radio-group');
    radioGroupDirective = hostFixture.debugElement.query(sel => sel.nativeElement === radioGroupElement).injector.get(WaRadioGroupDirective);
  });

  it('should create the radio group directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(radioGroupElement).toBeTruthy();
    expect(radioGroupDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.value = 'option1';
    hostComponent.label = 'Select an option';
    hostComponent.hint = 'Choose one of the options';
    hostComponent.name = 'options';
    hostComponent.orientation = 'horizontal';
    hostComponent.size = 'large';
    hostFixture.detectChanges();

    expect(radioGroupElement.getAttribute('value')).toBe('option1');
    expect(radioGroupElement.getAttribute('label')).toBe('Select an option');
    expect(radioGroupElement.getAttribute('hint')).toBe('Choose one of the options');
    expect(radioGroupElement.getAttribute('name')).toBe('options');
    expect(radioGroupElement.getAttribute('orientation')).toBe('horizontal');
    expect(radioGroupElement.getAttribute('size')).toBe('large');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.required = true;
    hostComponent.withLabel = true;
    hostComponent.withHint = true;
    hostFixture.detectChanges();

    expect(radioGroupElement.hasAttribute('required')).toBeTrue();
    expect(radioGroupElement.hasAttribute('with-label')).toBeTrue();
    expect(radioGroupElement.hasAttribute('with-hint')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.required = false;
    hostComponent.withLabel = false;
    hostComponent.withHint = false;
    hostFixture.detectChanges();

    expect(radioGroupElement.hasAttribute('required')).toBeFalse();
    expect(radioGroupElement.hasAttribute('with-label')).toBeFalse();
    expect(radioGroupElement.hasAttribute('with-hint')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.required = 'true';
    hostComponent.withLabel = '';
    hostFixture.detectChanges();

    expect(radioGroupElement.hasAttribute('required')).toBeTrue();
    expect(radioGroupElement.hasAttribute('with-label')).toBeTrue();
  });

  it('should set style attributes correctly', () => {
    hostComponent.styleRadiosGap = '10px';
    hostFixture.detectChanges();

    expect(radioGroupElement.style.getPropertyValue('--gap')).toBe('10px');
  });

  it('should expose the native element', () => {
    expect(radioGroupDirective.nativeElement).toBe(radioGroupElement);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onInput');
    spyOn(hostComponent, 'onChange');
    spyOn(hostComponent, 'onFocus');
    spyOn(hostComponent, 'onBlur');
    spyOn(hostComponent, 'onInvalid');

    // Create mock events
    const inputEvent = new Event('wa-input');
    const changeEvent = new Event('wa-change');
    const focusEvent = new FocusEvent('wa-focus');
    const blurEvent = new FocusEvent('wa-blur');
    const invalidEvent = new CustomEvent('wa-invalid');

    // Dispatch events on the native element
    radioGroupElement.dispatchEvent(inputEvent);
    radioGroupElement.dispatchEvent(changeEvent);
    radioGroupElement.dispatchEvent(focusEvent);
    radioGroupElement.dispatchEvent(blurEvent);
    radioGroupElement.dispatchEvent(invalidEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onInput).toHaveBeenCalled();
    expect(hostComponent.onChange).toHaveBeenCalled();
    expect(hostComponent.onFocus).toHaveBeenCalled();
    expect(hostComponent.onBlur).toHaveBeenCalled();
    expect(hostComponent.onInvalid).toHaveBeenCalled();
  });

  it('should implement ControlValueAccessor correctly', () => {
    // Test writeValue
    radioGroupDirective.writeValue('option2');
    expect(radioGroupElement.getAttribute('value')).toBe('option2');

    // Test setDisabledState
    radioGroupDirective.setDisabledState(true);
    expect(radioGroupElement.hasAttribute('disabled')).toBeTrue();

    radioGroupDirective.setDisabledState(false);
    expect(radioGroupElement.hasAttribute('disabled')).toBeFalse();
  });
});

describe('WaRadioDirective', () => {
  let hostComponent: RadioTestHostComponent;
  let hostFixture: ComponentFixture<RadioTestHostComponent>;
  let radioElement: HTMLElement;
  let radioDirective: WaRadioDirective;

  beforeEach(async () => {
    // Mock the customElements API
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [RadioTestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(RadioTestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    // Get the wa-radio element
    radioElement = hostFixture.nativeElement.querySelector('wa-radio');
    radioDirective = hostFixture.debugElement.query(sel => sel.nativeElement === radioElement).injector.get(WaRadioDirective);
  });

  it('should create the radio directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(radioElement).toBeTruthy();
    expect(radioDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.value = 'option1';
    hostFixture.detectChanges();
    expect(radioElement.getAttribute('value')).toBe('option1');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.checked = true;
    hostComponent.disabled = true;
    hostFixture.detectChanges();

    expect(radioElement.hasAttribute('checked')).toBeTrue();
    expect(radioElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.checked = false;
    hostComponent.disabled = false;
    hostFixture.detectChanges();

    expect(radioElement.hasAttribute('checked')).toBeFalse();
    expect(radioElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.checked = 'true';
    hostComponent.disabled = '';
    hostFixture.detectChanges();

    expect(radioElement.hasAttribute('checked')).toBeTrue();
    expect(radioElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should set style attributes correctly', () => {
    hostComponent.styleBackgroundColor = '#f5f5f5';
    hostComponent.styleBackgroundColorChecked = '#3366ff';
    hostComponent.styleBorderColor = '#cccccc';
    hostComponent.styleBorderColorChecked = '#3366ff';
    hostComponent.styleBorderStyle = 'solid';
    hostComponent.styleBorderWidth = '2px';
    hostComponent.styleBoxShadow = '0 0 5px rgba(51, 102, 255, 0.5)';
    hostComponent.styleCheckedIconColor = '#ffffff';
    hostComponent.styleCheckedIconScale = '0.8';
    hostComponent.styleToggleSize = '20px';
    hostFixture.detectChanges();

    expect(radioElement.style.getPropertyValue('--background-color')).toBe('#f5f5f5');
    expect(radioElement.style.getPropertyValue('--background-color-checked')).toBe('#3366ff');
    expect(radioElement.style.getPropertyValue('--border-color')).toBe('#cccccc');
    expect(radioElement.style.getPropertyValue('--border-color-checked')).toBe('#3366ff');
    expect(radioElement.style.getPropertyValue('--border-style')).toBe('solid');
    expect(radioElement.style.getPropertyValue('--border-width')).toBe('2px');
    expect(radioElement.style.getPropertyValue('--box-shadow')).toBe('0 0 5px rgba(51, 102, 255, 0.5)');
    expect(radioElement.style.getPropertyValue('--checked-icon-color')).toBe('#ffffff');
    expect(radioElement.style.getPropertyValue('--checked-icon-scale')).toBe('0.8');
    expect(radioElement.style.getPropertyValue('--toggle-size')).toBe('20px');
  });

  it('should project content correctly', () => {
    expect(radioElement.textContent?.trim()).toBe('Radio Option');

    hostComponent.radioText = 'Updated Option';
    hostFixture.detectChanges();
    expect(radioElement.textContent?.trim()).toBe('Updated Option');
  });
});

describe('WaRadioDirective with appearance="button"', () => {
  let hostComponent: RadioButtonTestHostComponent;
  let hostFixture: ComponentFixture<RadioButtonTestHostComponent>;
  let radioButtonElement: HTMLElement;
  let radioDirective: WaRadioDirective;

  beforeEach(async () => {
    // Mock the customElements API
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [RadioButtonTestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(RadioButtonTestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    // Get the wa-radio element with appearance="button"
    radioButtonElement = hostFixture.nativeElement.querySelector('wa-radio[appearance="button"]');
    radioDirective = hostFixture.debugElement.query(sel => sel.nativeElement === radioButtonElement).injector.get(WaRadioDirective);
  });

  it('should create the radio directive with button appearance', () => {
    expect(hostComponent).toBeTruthy();
    expect(radioButtonElement).toBeTruthy();
    expect(radioDirective).toBeTruthy();
    expect(radioButtonElement.getAttribute('appearance')).toBe('button');
  });

  it('should set string attributes correctly', () => {
    hostComponent.value = 'option1';
    hostFixture.detectChanges();
    expect(radioButtonElement.getAttribute('value')).toBe('option1');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.checked = true;
    hostComponent.disabled = true;
    hostComponent.withPrefix = true;
    hostComponent.withSuffix = true;
    hostFixture.detectChanges();

    expect(radioButtonElement.hasAttribute('checked')).toBeTrue();
    expect(radioButtonElement.hasAttribute('disabled')).toBeTrue();
    expect(radioButtonElement.hasAttribute('with-prefix')).toBeTrue();
    expect(radioButtonElement.hasAttribute('with-suffix')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.checked = false;
    hostComponent.disabled = false;
    hostComponent.withPrefix = false;
    hostComponent.withSuffix = false;
    hostFixture.detectChanges();

    expect(radioButtonElement.hasAttribute('checked')).toBeFalse();
    expect(radioButtonElement.hasAttribute('disabled')).toBeFalse();
    expect(radioButtonElement.hasAttribute('with-prefix')).toBeFalse();
    expect(radioButtonElement.hasAttribute('with-suffix')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.checked = 'true';
    hostComponent.disabled = '';
    hostFixture.detectChanges();

    expect(radioButtonElement.hasAttribute('checked')).toBeTrue();
    expect(radioButtonElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should set style attributes correctly', () => {
    hostComponent.styleIndicatorColor = '#3366ff';
    hostComponent.styleIndicatorWidth = '2px';
    hostComponent.styleDisplay = 'inline-flex';
    hostFixture.detectChanges();

    expect(radioButtonElement.style.getPropertyValue('--indicator-color')).toBe('#3366ff');
    expect(radioButtonElement.style.getPropertyValue('--indicator-width')).toBe('2px');
    expect(radioButtonElement.style.getPropertyValue('--display')).toBe('inline-flex');
  });

  it('should project content correctly', () => {
    expect(radioButtonElement.textContent?.trim()).toBe('Radio Button');

    hostComponent.buttonText = 'Updated Button';
    hostFixture.detectChanges();
    expect(radioButtonElement.textContent?.trim()).toBe('Updated Button');
  });

  it('should project start and end content correctly', () => {
    hostComponent.prefixContent = 'Prefix';
    hostComponent.suffixContent = 'Suffix';
    hostComponent.withPrefix = true;
    hostComponent.withSuffix = true;
    hostFixture.detectChanges();

    const startSlot = radioButtonElement.querySelector('[slot="start"]');
    const endSlot = radioButtonElement.querySelector('[slot="end"]');

    expect(startSlot?.textContent?.trim()).toBe('Prefix');
    expect(endSlot?.textContent?.trim()).toBe('Suffix');
  });
});
