import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WaOtpInputDirective } from './otp-input.directive';

@Component({
  template: `
    <wa-otp-input
      [value]="value"
      [length]="length"
      [appearance]="appearance"
      [type]="type"
      [mask]="mask"
      [case]="case"
      [size]="size"
      [label]="label"
      [hint]="hint"
      [format]="format"
      [autocomplete]="autocomplete"
      [required]="required"
      [readonly]="readonly"
      [autosubmit]="autosubmit"
      [withMask]="withMask"
      [name]="name"
      [segmentSize]="segmentSize"
      [maskChar]="maskChar"
      (waComplete)="onComplete($event)"
      (waClear)="onClear($event)"
    ></wa-otp-input>
  `,
  standalone: true,
  imports: [WaOtpInputDirective]
})
class TestHostComponent {
  value?: string | null;
  length?: number | string;
  appearance?: string;
  type?: string;
  mask?: boolean | string;
  case?: string;
  size?: string;
  label?: string;
  hint?: string;
  format?: string;
  autocomplete?: string;
  required?: boolean | string;
  readonly?: boolean | string;
  autosubmit?: boolean | string;
  withMask?: boolean | string;
  name?: string | null;
  segmentSize?: string;
  maskChar?: string;

  lastComplete?: CustomEvent;
  lastClear?: CustomEvent;
  onComplete(event: CustomEvent) { this.lastComplete = event; }
  onClear(event: CustomEvent) { this.lastClear = event; }
}

@Component({
  template: `<wa-otp-input [formControl]="control" [length]="6" [required]="true"></wa-otp-input>`,
  standalone: true,
  imports: [WaOtpInputDirective, ReactiveFormsModule, FormsModule]
})
class ReactiveHostComponent {
  control = new FormControl('', { validators: [Validators.required] });
}

describe('WaOtpInputDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let otpElement: HTMLElement;
  let directive: WaOtpInputDirective;

  beforeEach(async () => {
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ReactiveHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    otpElement = hostFixture.nativeElement.querySelector('wa-otp-input');
    directive = hostFixture.debugElement
      .query(sel => sel.nativeElement === otpElement)
      .injector.get(WaOtpInputDirective);
  });

  it('should create the directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(otpElement).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should set the value and length attributes', () => {
    hostComponent.value = '123456';
    hostComponent.length = 6;
    hostFixture.detectChanges();
    expect(otpElement.getAttribute('value')).toBe('123456');
    expect(otpElement.getAttribute('length')).toBe('6');
  });

  it('should set string attributes', () => {
    hostComponent.appearance = 'contained';
    hostComponent.type = 'alphanumeric';
    hostComponent.case = 'upper';
    hostComponent.size = 'l';
    hostComponent.format = '###-###';
    hostFixture.detectChanges();
    expect(otpElement.getAttribute('appearance')).toBe('contained');
    expect(otpElement.getAttribute('type')).toBe('alphanumeric');
    expect(otpElement.getAttribute('case')).toBe('upper');
    expect(otpElement.getAttribute('size')).toBe('l');
    expect(otpElement.getAttribute('format')).toBe('###-###');
  });

  it('should set boolean attributes', () => {
    hostComponent.mask = true;
    hostComponent.required = true;
    hostComponent.readonly = true;
    hostComponent.autosubmit = true;
    hostComponent.withMask = true;
    hostFixture.detectChanges();
    expect(otpElement.hasAttribute('mask')).toBeTrue();
    expect(otpElement.hasAttribute('required')).toBeTrue();
    expect(otpElement.hasAttribute('readonly')).toBeTrue();
    expect(otpElement.hasAttribute('autosubmit')).toBeTrue();
    expect(otpElement.hasAttribute('with-mask')).toBeTrue();
  });

  it('should set CSS custom properties', () => {
    hostComponent.segmentSize = '3em';
    hostComponent.maskChar = '*';
    hostFixture.detectChanges();
    expect(otpElement.style.getPropertyValue('--segment-size')).toBe('3em');
    expect(otpElement.style.getPropertyValue('--mask-char')).toBe('*');
  });

  it('should delegate clear() to the native element', () => {
    (otpElement as any).clear = jasmine.createSpy('clear');
    directive.clear();
    expect((otpElement as any).clear).toHaveBeenCalled();
  });

  it('should delegate setCustomValidity() to the native element', () => {
    (otpElement as any).setCustomValidity = jasmine.createSpy('setCustomValidity');
    directive.setCustomValidity('bad code');
    expect((otpElement as any).setCustomValidity).toHaveBeenCalledWith('bad code');
  });

  it('should emit waComplete when the native event fires', () => {
    const event = new CustomEvent('wa-complete', { cancelable: true });
    otpElement.dispatchEvent(event);
    expect(hostComponent.lastComplete).toBe(event);
  });

  it('should emit waClear when the native event fires', () => {
    const event = new CustomEvent('wa-clear');
    otpElement.dispatchEvent(event);
    expect(hostComponent.lastClear).toBe(event);
  });

  it('should flag a partially-filled value as incomplete', () => {
    hostComponent.length = 6;
    hostFixture.detectChanges();
    const errors = directive.validate({ value: '123' } as any);
    expect(errors && errors['incomplete']).toBeTruthy();
  });

  it('should treat a fully-filled value as valid', () => {
    hostComponent.length = 6;
    hostFixture.detectChanges();
    const errors = directive.validate({ value: '123456' } as any);
    expect(errors).toBeNull();
  });

  it('should derive segment count from format for validation', () => {
    hostComponent.format = '###-###';
    hostFixture.detectChanges();
    expect(directive.validate({ value: '123456' } as any)).toBeNull();
    expect(directive.validate({ value: '12345' } as any)?.['incomplete']).toBeTruthy();
  });

  it('should expose a required error for an empty required field', () => {
    hostComponent.required = true;
    hostFixture.detectChanges();
    const errors = directive.validate({ value: '' } as any);
    expect(errors && errors['required']).toBeTrue();
  });
});

describe('WaOtpInputDirective (reactive forms)', () => {
  let fixture: ComponentFixture<ReactiveHostComponent>;
  let component: ReactiveHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should write the value to the native element', () => {
    const el = fixture.nativeElement.querySelector('wa-otp-input') as HTMLElement;
    component.control.setValue('123456');
    fixture.detectChanges();
    expect(el.getAttribute('value')).toBe('123456');
  });
});

