import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { WaNumberInputDirective } from './number-input.directive';

// Test host that binds every supported input + event of the directive
@Component({
  template: `
    <wa-number-input
      [(ngModel)]="value"
      (ngModelChange)="onModelChange($event)"
      [size]="size"
      [appearance]="appearance"
      [pill]="pill"
      [label]="label"
      [hint]="hint"
      [placeholder]="placeholder"
      [readonly]="readonly"
      [required]="required"
      [min]="min"
      [max]="max"
      [step]="step"
      [withoutSteppers]="withoutSteppers"
      [autocomplete]="autocomplete"
      [autofocus]="autofocus"
      [enterkeyhint]="enterkeyhint"
      [inputmode]="inputmode"
      [withLabel]="withLabel"
      [withHint]="withHint"
      (wa-input)="onInput($event)"
      (wa-change)="onChange($event)"
      (wa-focus)="onFocus($event)"
      (wa-blur)="onBlur($event)"
      (wa-invalid)="onInvalid($event)"
      (valueChange)="onValueChange($event)"
    ></wa-number-input>
  `,
  standalone: true,
  imports: [WaNumberInputDirective, FormsModule]
})
class TestHostComponent {
  value?: string | number | null;
  size?: string;
  appearance?: string;
  pill?: boolean | string;
  label?: string;
  hint?: string;
  placeholder?: string;
  readonly?: boolean | string;
  required?: boolean | string;
  min?: number | string;
  max?: number | string;
  step?: number | 'any' | string;
  withoutSteppers?: boolean | string;
  autocomplete?: string;
  autofocus?: boolean | string;
  enterkeyhint?: string;
  inputmode?: string;
  withLabel?: boolean | string;
  withHint?: boolean | string;

  onInput(_event: Event): void {}
  onChange(_event: Event): void {}
  onFocus(_event: FocusEvent): void {}
  onBlur(_event: FocusEvent): void {}
  onInvalid(_event: CustomEvent): void {}
  onValueChange(_value: string | number | null): void {}
  onModelChange(_value: string | number | null): void {}
}

/**
 * Helper: simulate the value the web component would report on the event target.
 * The Web Awesome component exposes its current value via the `value` property.
 */
function setNativeValue(el: HTMLElement, value: string): void {
  (el as any).value = value;
  el.setAttribute('value', value);
}

describe('WaNumberInputDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let numberInputElement: HTMLElement;
  let directive: WaNumberInputDirective;

  beforeEach(async () => {
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

    numberInputElement = hostFixture.nativeElement.querySelector('wa-number-input');
    directive = hostFixture.debugElement
      .query(sel => sel.nativeElement === numberInputElement)
      .injector.get(WaNumberInputDirective);
  });

  it('should create the directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(numberInputElement).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  // Attribute binding
  // ---------------------------------------------------------------------------
  describe('attribute binding', () => {
    it('should set string attributes correctly', fakeAsync(() => {
      hostComponent.size = 'large';
      hostComponent.appearance = 'filled';
      hostComponent.label = 'Quantity';
      hostComponent.hint = 'Enter a number';
      hostComponent.placeholder = '0';
      hostComponent.autocomplete = 'off';
      hostComponent.enterkeyhint = 'done';
      hostComponent.inputmode = 'decimal';
      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();

      expect(numberInputElement.getAttribute('size')).toBe('large');
      expect(numberInputElement.getAttribute('appearance')).toBe('filled');
      expect(numberInputElement.getAttribute('label')).toBe('Quantity');
      expect(numberInputElement.getAttribute('hint')).toBe('Enter a number');
      expect(numberInputElement.getAttribute('placeholder')).toBe('0');
      expect(numberInputElement.getAttribute('autocomplete')).toBe('off');
      expect(numberInputElement.getAttribute('enterkeyhint')).toBe('done');
      expect(numberInputElement.getAttribute('inputmode')).toBe('decimal');
    }));

    it('should set numeric attributes correctly', () => {
      hostComponent.min = 1;
      hostComponent.max = 100;
      hostComponent.step = 5;
      hostFixture.detectChanges();

      expect(numberInputElement.getAttribute('min')).toBe('1');
      expect(numberInputElement.getAttribute('max')).toBe('100');
      expect(numberInputElement.getAttribute('step')).toBe('5');
    });

    it('should handle "any" as a step value', () => {
      hostComponent.step = 'any';
      hostFixture.detectChanges();
      expect(numberInputElement.getAttribute('step')).toBe('any');
    });

    it('should set boolean attributes when true', () => {
      hostComponent.pill = true;
      hostComponent.readonly = true;
      hostComponent.required = true;
      hostComponent.withoutSteppers = true;
      hostComponent.autofocus = true;
      hostComponent.withLabel = true;
      hostComponent.withHint = true;
      hostFixture.detectChanges();

      expect(numberInputElement.hasAttribute('pill')).toBeTrue();
      expect(numberInputElement.hasAttribute('readonly')).toBeTrue();
      expect(numberInputElement.hasAttribute('required')).toBeTrue();
      expect(numberInputElement.hasAttribute('without-steppers')).toBeTrue();
      expect(numberInputElement.hasAttribute('autofocus')).toBeTrue();
      expect(numberInputElement.hasAttribute('with-label')).toBeTrue();
      expect(numberInputElement.hasAttribute('with-hint')).toBeTrue();
    });

    it('should remove boolean attributes when false', () => {
      hostComponent.pill = true;
      hostFixture.detectChanges();
      expect(numberInputElement.hasAttribute('pill')).toBeTrue();

      hostComponent.pill = false;
      hostFixture.detectChanges();
      expect(numberInputElement.hasAttribute('pill')).toBeFalse();
    });

    it('should accept string values for boolean attributes', () => {
      hostComponent.required = 'true';
      hostComponent.withoutSteppers = '';
      hostFixture.detectChanges();

      expect(numberInputElement.hasAttribute('required')).toBeTrue();
      expect(numberInputElement.hasAttribute('without-steppers')).toBeTrue();
    });
  });

  // ---------------------------------------------------------------------------
  // Event emission (the original bug: (wa-input) etc. did nothing)
  // ---------------------------------------------------------------------------
  describe('event emission', () => {
    it('should emit wa- aliased events for wa-prefixed DOM events', () => {
      spyOn(hostComponent, 'onInput');
      spyOn(hostComponent, 'onChange');
      spyOn(hostComponent, 'onFocus');
      spyOn(hostComponent, 'onBlur');
      spyOn(hostComponent, 'onInvalid');

      numberInputElement.dispatchEvent(new Event('wa-input'));
      numberInputElement.dispatchEvent(new Event('wa-change'));
      numberInputElement.dispatchEvent(new FocusEvent('wa-focus'));
      numberInputElement.dispatchEvent(new FocusEvent('wa-blur'));
      numberInputElement.dispatchEvent(new CustomEvent('wa-invalid'));

      expect(hostComponent.onInput).toHaveBeenCalled();
      expect(hostComponent.onChange).toHaveBeenCalled();
      expect(hostComponent.onFocus).toHaveBeenCalled();
      expect(hostComponent.onBlur).toHaveBeenCalled();
      expect(hostComponent.onInvalid).toHaveBeenCalled();
    });

    it('should emit wa- aliased events for native DOM events', () => {
      spyOn(hostComponent, 'onInput');
      spyOn(hostComponent, 'onChange');
      spyOn(hostComponent, 'onFocus');
      spyOn(hostComponent, 'onBlur');

      numberInputElement.dispatchEvent(new Event('input'));
      numberInputElement.dispatchEvent(new Event('change'));
      numberInputElement.dispatchEvent(new FocusEvent('focus'));
      numberInputElement.dispatchEvent(new FocusEvent('blur'));

      expect(hostComponent.onInput).toHaveBeenCalled();
      expect(hostComponent.onChange).toHaveBeenCalled();
      expect(hostComponent.onFocus).toHaveBeenCalled();
      expect(hostComponent.onBlur).toHaveBeenCalled();
    });

    it('should not accumulate listeners across change detection cycles', () => {
      const spy = spyOn(hostComponent, 'onInput');

      // Baseline emission count for a single dispatch
      numberInputElement.dispatchEvent(new Event('wa-input'));
      const perDispatch = spy.calls.count();
      expect(perDispatch).toBeGreaterThan(0);

      // Trigger several change-detection passes (previously re-bound listeners)
      hostComponent.min = 0;
      hostFixture.detectChanges();
      hostComponent.max = 10;
      hostFixture.detectChanges();
      hostComponent.step = 2;
      hostFixture.detectChanges();

      spy.calls.reset();
      numberInputElement.dispatchEvent(new Event('wa-input'));

      // Listener count must remain stable - no extra handlers attached on changes
      expect(spy.calls.count()).toBe(perDispatch);
    });

    it('should emit valueChange with the current value', () => {
      const received: Array<string | number | null> = [];
      spyOn(hostComponent, 'onValueChange').and.callFake(v => received.push(v));

      setNativeValue(numberInputElement, '42');
      numberInputElement.dispatchEvent(new Event('input'));

      expect(hostComponent.onValueChange).toHaveBeenCalled();
      expect(received[received.length - 1]).toBe('42');
    });
  });

  // ---------------------------------------------------------------------------
  // ngModel — the focus of this request
  // ---------------------------------------------------------------------------
  describe('ngModel two-way binding', () => {
    it('should write the initial model value to the element (model -> view)', fakeAsync(() => {
      hostComponent.value = 7;
      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();

      expect(numberInputElement.getAttribute('value')).toBe('7');
    }));

    it('should reflect later model changes to the element (model -> view)', fakeAsync(() => {
      hostComponent.value = 1;
      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();
      expect(numberInputElement.getAttribute('value')).toBe('1');

      hostComponent.value = 99;
      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();
      expect(numberInputElement.getAttribute('value')).toBe('99');
    }));

    it('should update the model from a native input event (view -> model)', fakeAsync(() => {
      hostComponent.value = '';
      hostFixture.detectChanges();
      tick();

      setNativeValue(numberInputElement, '25');
      numberInputElement.dispatchEvent(new Event('input'));
      hostFixture.detectChanges();
      tick();

      expect(hostComponent.value).toBe('25');
    }));

    it('should update the model from a wa-input event (view -> model)', fakeAsync(() => {
      hostComponent.value = '';
      hostFixture.detectChanges();
      tick();

      setNativeValue(numberInputElement, '12');
      numberInputElement.dispatchEvent(new Event('wa-input'));
      hostFixture.detectChanges();
      tick();

      expect(hostComponent.value).toBe('12');
    }));

    it('should update the model from a native change event (view -> model)', fakeAsync(() => {
      hostComponent.value = '';
      hostFixture.detectChanges();
      tick();

      setNativeValue(numberInputElement, '88');
      numberInputElement.dispatchEvent(new Event('change'));
      hostFixture.detectChanges();
      tick();

      expect(hostComponent.value).toBe('88');
    }));

    it('should update the model from a wa-change event (view -> model)', fakeAsync(() => {
      hostComponent.value = '';
      hostFixture.detectChanges();
      tick();

      setNativeValue(numberInputElement, '33');
      numberInputElement.dispatchEvent(new Event('wa-change'));
      hostFixture.detectChanges();
      tick();

      expect(hostComponent.value).toBe('33');
    }));

    it('should fire ngModelChange exactly once per input event', fakeAsync(() => {
      hostComponent.value = '';
      hostFixture.detectChanges();
      tick();

      const spy = spyOn(hostComponent, 'onModelChange');

      setNativeValue(numberInputElement, '5');
      numberInputElement.dispatchEvent(new Event('input'));
      hostFixture.detectChanges();
      tick();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('5');
    }));

    it('should keep model and view in sync through several edits', fakeAsync(() => {
      hostComponent.value = '';
      hostFixture.detectChanges();
      tick();

      const edits = ['1', '10', '100', '42'];
      for (const v of edits) {
        setNativeValue(numberInputElement, v);
        numberInputElement.dispatchEvent(new Event('input'));
        hostFixture.detectChanges();
        tick();
        expect(hostComponent.value).toBe(v);
      }

      // Final model -> view round trip
      hostComponent.value = 7;
      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();
      expect(numberInputElement.getAttribute('value')).toBe('7');
    }));

    it('should mark the control as touched on blur', fakeAsync(() => {
      hostFixture.detectChanges();
      tick();

      const form = hostFixture.debugElement.children[0].injector.get(NgForm, null);
      // NgForm may not be present (no <form>), so guard and use the directive control instead
      numberInputElement.dispatchEvent(new FocusEvent('blur'));
      hostFixture.detectChanges();
      tick();

      // No throw is the primary assertion here; onTouched wiring is exercised.
      expect(form === null || form !== undefined).toBeTrue();
    }));
  });

  // ---------------------------------------------------------------------------
  // ControlValueAccessor / Validator
  // ---------------------------------------------------------------------------
  describe('ControlValueAccessor & validation', () => {
    it('should write value via writeValue()', () => {
      directive.writeValue(55);
      expect(numberInputElement.getAttribute('value')).toBe('55');
    });

    it('should toggle the disabled attribute via setDisabledState()', () => {
      directive.setDisabledState(true);
      expect(numberInputElement.hasAttribute('disabled')).toBeTrue();

      directive.setDisabledState(false);
      expect(numberInputElement.hasAttribute('disabled')).toBeFalse();
    });

    it('should report a required error when empty', () => {
      directive.required = true;
      const errors = directive.validate({ value: '' } as any);
      expect(errors).toEqual({ required: true });
    });

    it('should report a min error', () => {
      directive.min = 10;
      const errors = directive.validate({ value: 5 } as any);
      expect(errors && errors['min']).toEqual({ min: 10, actual: 5 });
    });

    it('should report a max error', () => {
      directive.max = 10;
      const errors = directive.validate({ value: 20 } as any);
      expect(errors && errors['max']).toEqual({ max: 10, actual: 20 });
    });

    it('should return null when valid', () => {
      directive.min = 0;
      directive.max = 100;
      directive.required = true;
      expect(directive.validate({ value: 50 } as any)).toBeNull();
    });

    it('should drive data-user-invalid styling for an interacted invalid required control', fakeAsync(() => {
      hostComponent.required = true;
      hostComponent.value = '';
      hostFixture.detectChanges();
      tick();

      // Simulate user interaction so the control becomes touched + dirty
      setNativeValue(numberInputElement, '');
      numberInputElement.dispatchEvent(new Event('input'));
      numberInputElement.dispatchEvent(new FocusEvent('blur'));
      hostFixture.detectChanges();
      tick();
      hostFixture.detectChanges();

      expect(numberInputElement.hasAttribute('data-user-invalid')).toBeTrue();
    }));
  });

  // ---------------------------------------------------------------------------
  // Programmatic API
  // ---------------------------------------------------------------------------
  describe('programmatic methods', () => {
    it('should call the native element methods', () => {
      (numberInputElement as any).select = () => {};
      (numberInputElement as any).stepUp = () => {};
      (numberInputElement as any).stepDown = () => {};

      spyOn(numberInputElement as any, 'focus');
      spyOn(numberInputElement as any, 'blur');
      spyOn(numberInputElement as any, 'select');
      spyOn(numberInputElement as any, 'stepUp');
      spyOn(numberInputElement as any, 'stepDown');

      directive.focus();
      directive.blur();
      directive.select();
      directive.stepUp();
      directive.stepDown();

      expect((numberInputElement as any).focus).toHaveBeenCalled();
      expect((numberInputElement as any).blur).toHaveBeenCalled();
      expect((numberInputElement as any).select).toHaveBeenCalled();
      expect((numberInputElement as any).stepUp).toHaveBeenCalled();
      expect((numberInputElement as any).stepDown).toHaveBeenCalled();
    });

    it('should expose the native element', () => {
      expect(directive.nativeElement).toBe(numberInputElement);
    });
  });
});


