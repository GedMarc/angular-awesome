/**
 * Comprehensive Angular Form Validation Tests for Web Awesome Wrapper Components
 *
 * Tests that the Web Awesome Angular wrappers correctly update Angular form errors
 * for validation, covering:
 * - WaInputDirective (required, min, max, minlength, maxlength, pattern)
 * - WaCheckboxDirective (required validation — must be checked)
 * - WaSelectWrapperComponent (required validation — single + multiple)
 * - WaSwitchDirective (required validation — must be on)
 * - WaRadioGroupDirective (required validation — must select)
 * - WaComboboxComponent (required validation)
 * - WaTextareaComponent (required, minlength, maxlength)
 * - WaSliderDirective (required, min, max)
 *
 * Each component is tested via both Reactive Forms and Template-Driven Forms.
 */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  NgModel,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { WaInputDirective } from '../input/input.directive';
import { WaCheckboxDirective } from '../checkbox/checkbox.directive';
import { WaSelectWrapperComponent, WaOptionComponent } from '../select/select.directive';
import { WaSwitchDirective } from '../switch/switch.directive';
import { WaRadioGroupDirective, WaRadioDirective } from '../radio/radio.directive';
import { WaComboboxComponent } from '../combobox/combobox.directive';
import { WaTextareaComponent } from '../text-area/textarea.component';
import { WaSliderDirective } from '../slider/slider.directive';

// ─── Shared setup ────────────────────────────────────────────────────────────
function ensureCustomElements(): void {
  if (!window.customElements) {
    (window as any).customElements = {
      whenDefined: () => Promise.resolve(),
      define: () => {}
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. WaInputDirective — Form Validation
// ═══════════════════════════════════════════════════════════════════════════════

// --- Reactive Forms host ---
@Component({
  template: `
    <form [formGroup]="form">
      <wa-input formControlName="email" [required]="true" label="Email"></wa-input>
    </form>
  `,
  standalone: true,
  imports: [WaInputDirective, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class InputReactiveHost {
  form = new FormGroup({
    email: new FormControl('', Validators.required)
  });
}

// --- Template-Driven Forms host ---
@Component({
  template: `
    <form #f="ngForm">
      <wa-input [(ngModel)]="email" name="email" required label="Email"></wa-input>
    </form>
  `,
  standalone: true,
  imports: [WaInputDirective, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class InputTemplateHost {
  email = '';
  @ViewChild('f') form!: NgForm;
}

describe('WaInputDirective — Form Validation', () => {
  describe('Reactive Forms', () => {
    let fixture: ComponentFixture<InputReactiveHost>;
    let host: InputReactiveHost;
    let inputEl: HTMLElement;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [InputReactiveHost] }).compileComponents();
      fixture = TestBed.createComponent(InputReactiveHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      inputEl = fixture.nativeElement.querySelector('wa-input');
    });

    it('should mark control invalid when empty and required', () => {
      const ctrl = host.form.get('email')!;
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors).toBeTruthy();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should mark control valid when a value is provided', () => {
      const ctrl = host.form.get('email')!;
      ctrl.setValue('test@example.com');
      fixture.detectChanges();

      expect(ctrl.valid).toBeTrue();
      expect(ctrl.errors).toBeNull();
    });

    it('should go back to invalid when cleared', () => {
      const ctrl = host.form.get('email')!;
      ctrl.setValue('test@example.com');
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();

      ctrl.setValue('');
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should mark control as pristine initially', () => {
      expect(host.form.get('email')!.pristine).toBeTrue();
    });

    it('should mark control as dirty after user input event', () => {
      const ctrl = host.form.get('email')!;
      (inputEl as any).value = 'typed';
      inputEl.dispatchEvent(new Event('wa-input'));
      fixture.detectChanges();
      expect(ctrl.dirty).toBeTrue();
    });

    it('should mark control as touched after blur', () => {
      const ctrl = host.form.get('email')!;
      expect(ctrl.touched).toBeFalse();
      inputEl.dispatchEvent(new FocusEvent('wa-blur'));
      fixture.detectChanges();
      expect(ctrl.touched).toBeTrue();
    });

    it('should not report required error when disabled', () => {
      const ctrl = host.form.get('email')!;
      ctrl.disable();
      fixture.detectChanges();
      // Disabled controls have status 'DISABLED'; errors are cleared
      expect(ctrl.status).toBe('DISABLED');
      expect(ctrl.errors).toBeNull();
    });
  });

  describe('Template-Driven Forms', () => {
    let fixture: ComponentFixture<InputTemplateHost>;
    let host: InputTemplateHost;
    let inputEl: HTMLElement;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [InputTemplateHost] }).compileComponents();
      fixture = TestBed.createComponent(InputTemplateHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
      inputEl = fixture.nativeElement.querySelector('wa-input');
    });

    it('should be invalid when empty', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['email'];
      expect(ctrl).toBeTruthy();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    }));

    it('should become valid when model updates', fakeAsync(() => {
      host.email = 'user@test.com';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['email'];
      expect(ctrl.valid).toBeTrue();
    }));
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 2. WaCheckboxDirective — Form Validation
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-checkbox formControlName="agree" [required]="true">I agree</wa-checkbox>
    </form>
  `,
  standalone: true,
  imports: [WaCheckboxDirective, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class CheckboxReactiveHost {
  form = new FormGroup({
    agree: new FormControl(false)
  });
}

@Component({
  template: `
    <form #f="ngForm">
      <wa-checkbox [(ngModel)]="agree" name="agree" required>I agree</wa-checkbox>
    </form>
  `,
  standalone: true,
  imports: [WaCheckboxDirective, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class CheckboxTemplateHost {
  agree = false;
  @ViewChild('f') form!: NgForm;
}

describe('WaCheckboxDirective — Form Validation', () => {
  describe('Reactive Forms', () => {
    let fixture: ComponentFixture<CheckboxReactiveHost>;
    let host: CheckboxReactiveHost;
    let cbEl: HTMLElement;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [CheckboxReactiveHost] }).compileComponents();
      fixture = TestBed.createComponent(CheckboxReactiveHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      cbEl = fixture.nativeElement.querySelector('wa-checkbox');
    });

    it('should be invalid when unchecked and required', () => {
      const ctrl = host.form.get('agree')!;
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should become valid when checked', () => {
      const ctrl = host.form.get('agree')!;
      ctrl.setValue(true);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();
      expect(ctrl.errors).toBeNull();
    });

    it('should return to invalid when unchecked', () => {
      const ctrl = host.form.get('agree')!;
      ctrl.setValue(true);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();

      ctrl.setValue(false);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should mark as touched on blur', () => {
      const ctrl = host.form.get('agree')!;
      expect(ctrl.touched).toBeFalse();
      cbEl.dispatchEvent(new FocusEvent('wa-blur'));
      fixture.detectChanges();
      expect(ctrl.touched).toBeTrue();
    });

    it('should not report required error when disabled', () => {
      const ctrl = host.form.get('agree')!;
      ctrl.disable();
      fixture.detectChanges();
      expect(ctrl.status).toBe('DISABLED');
      expect(ctrl.errors).toBeNull();
    });
  });

  describe('Template-Driven Forms', () => {
    let fixture: ComponentFixture<CheckboxTemplateHost>;
    let host: CheckboxTemplateHost;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [CheckboxTemplateHost] }).compileComponents();
      fixture = TestBed.createComponent(CheckboxTemplateHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should be invalid when unchecked', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['agree'];
      expect(ctrl).toBeTruthy();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    }));

    it('should become valid when model set to true', fakeAsync(() => {
      host.agree = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      // Simulate the writeValue -> checked attribute flow
      const cbEl = fixture.nativeElement.querySelector('wa-checkbox');
      // The directive writes checked attribute
      const ctrl = host.form.controls['agree'];
      expect(ctrl.valid).toBeTrue();
    }));
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 3. WaSelectWrapperComponent — Form Validation
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-select formControlName="color" [required]="true" label="Color">
        <wa-option value="red">Red</wa-option>
        <wa-option value="blue">Blue</wa-option>
      </wa-select>
    </form>
  `,
  standalone: true,
  imports: [WaSelectWrapperComponent, WaOptionComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class SelectReactiveHost {
  form = new FormGroup({
    color: new FormControl('')
  });
}

@Component({
  template: `
    <form [formGroup]="form">
      <wa-select formControlName="colors" [required]="true" [multiple]="true" label="Colors">
        <wa-option value="red">Red</wa-option>
        <wa-option value="blue">Blue</wa-option>
        <wa-option value="green">Green</wa-option>
      </wa-select>
    </form>
  `,
  standalone: true,
  imports: [WaSelectWrapperComponent, WaOptionComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class SelectMultipleReactiveHost {
  form = new FormGroup({
    colors: new FormControl<string[]>([])
  });
}

@Component({
  template: `
    <form #f="ngForm">
      <wa-select [(ngModel)]="color" name="color" required label="Color">
        <wa-option value="red">Red</wa-option>
        <wa-option value="blue">Blue</wa-option>
      </wa-select>
    </form>
  `,
  standalone: true,
  imports: [WaSelectWrapperComponent, WaOptionComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class SelectTemplateHost {
  color = '';
  @ViewChild('f') form!: NgForm;
}

describe('WaSelectWrapperComponent — Form Validation', () => {
  describe('Reactive Forms — single', () => {
    let fixture: ComponentFixture<SelectReactiveHost>;
    let host: SelectReactiveHost;
    let selectEl: HTMLElement;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [SelectReactiveHost] }).compileComponents();
      fixture = TestBed.createComponent(SelectReactiveHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      selectEl = fixture.nativeElement.querySelector('wa-select');
    });

    it('should be invalid when no value selected', () => {
      const ctrl = host.form.get('color')!;
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should become valid after selecting a value', () => {
      const ctrl = host.form.get('color')!;
      ctrl.setValue('red');
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();
      expect(ctrl.errors).toBeNull();
    });

    it('should return to invalid when value cleared', () => {
      const ctrl = host.form.get('color')!;
      ctrl.setValue('red');
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();

      ctrl.setValue('');
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should mark as touched after blur event', () => {
      const ctrl = host.form.get('color')!;
      expect(ctrl.touched).toBeFalse();
      selectEl.dispatchEvent(new FocusEvent('wa-blur'));
      fixture.detectChanges();
      expect(ctrl.touched).toBeTrue();
    });

    it('should not report required error when disabled', () => {
      const ctrl = host.form.get('color')!;
      ctrl.disable();
      fixture.detectChanges();
      expect(ctrl.status).toBe('DISABLED');
      expect(ctrl.errors).toBeNull();
    });
  });

  describe('Reactive Forms — multiple', () => {
    let fixture: ComponentFixture<SelectMultipleReactiveHost>;
    let host: SelectMultipleReactiveHost;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [SelectMultipleReactiveHost] }).compileComponents();
      fixture = TestBed.createComponent(SelectMultipleReactiveHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be invalid when array is empty', () => {
      const ctrl = host.form.get('colors')!;
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should become valid when items selected', () => {
      const ctrl = host.form.get('colors')!;
      ctrl.setValue(['red', 'blue']);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();
    });

    it('should return to invalid when all items removed', () => {
      const ctrl = host.form.get('colors')!;
      ctrl.setValue(['red']);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();

      ctrl.setValue([]);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });
  });

  describe('Template-Driven Forms', () => {
    let fixture: ComponentFixture<SelectTemplateHost>;
    let host: SelectTemplateHost;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [SelectTemplateHost] }).compileComponents();
      fixture = TestBed.createComponent(SelectTemplateHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should be invalid when no value selected', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['color'];
      expect(ctrl).toBeTruthy();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    }));

    it('should become valid when model updates', fakeAsync(() => {
      host.color = 'blue';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['color'];
      expect(ctrl.valid).toBeTrue();
    }));
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 4. WaSwitchDirective — Form Validation
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-switch waSwitch formControlName="notifications" [required]="true">Notifications</wa-switch>
    </form>
  `,
  standalone: true,
  imports: [WaSwitchDirective, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class SwitchReactiveHost {
  form = new FormGroup({
    notifications: new FormControl(false)
  });
}

@Component({
  template: `
    <form #f="ngForm">
      <wa-switch waSwitch [(ngModel)]="notifications" name="notifications" required>Notifications</wa-switch>
    </form>
  `,
  standalone: true,
  imports: [WaSwitchDirective, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class SwitchTemplateHost {
  notifications = false;
  @ViewChild('f') form!: NgForm;
}

describe('WaSwitchDirective — Form Validation', () => {
  describe('Reactive Forms', () => {
    let fixture: ComponentFixture<SwitchReactiveHost>;
    let host: SwitchReactiveHost;
    let switchEl: HTMLElement;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [SwitchReactiveHost] }).compileComponents();
      fixture = TestBed.createComponent(SwitchReactiveHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      switchEl = fixture.nativeElement.querySelector('wa-switch');
    });

    it('should be invalid when off and required', () => {
      const ctrl = host.form.get('notifications')!;
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should become valid when turned on', () => {
      const ctrl = host.form.get('notifications')!;
      ctrl.setValue(true);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();
      expect(ctrl.errors).toBeNull();
    });

    it('should return to invalid when turned off', () => {
      const ctrl = host.form.get('notifications')!;
      ctrl.setValue(true);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();

      ctrl.setValue(false);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should mark as touched after blur', () => {
      const ctrl = host.form.get('notifications')!;
      expect(ctrl.touched).toBeFalse();
      switchEl.dispatchEvent(new FocusEvent('wa-blur'));
      fixture.detectChanges();
      expect(ctrl.touched).toBeTrue();
    });

    it('should not report errors when disabled', () => {
      const ctrl = host.form.get('notifications')!;
      ctrl.disable();
      fixture.detectChanges();
      expect(ctrl.status).toBe('DISABLED');
      expect(ctrl.errors).toBeNull();
    });
  });

  describe('Template-Driven Forms', () => {
    let fixture: ComponentFixture<SwitchTemplateHost>;
    let host: SwitchTemplateHost;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [SwitchTemplateHost] }).compileComponents();
      fixture = TestBed.createComponent(SwitchTemplateHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should be invalid when off', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['notifications'];
      expect(ctrl).toBeTruthy();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    }));

    it('should become valid when model set to true', fakeAsync(() => {
      host.notifications = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['notifications'];
      expect(ctrl.valid).toBeTrue();
    }));
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 5. WaRadioGroupDirective — Form Validation
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-radio-group formControlName="fruit" [required]="true" label="Fruit">
        <wa-radio value="apple">Apple</wa-radio>
        <wa-radio value="banana">Banana</wa-radio>
      </wa-radio-group>
    </form>
  `,
  standalone: true,
  imports: [WaRadioGroupDirective, WaRadioDirective, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class RadioReactiveHost {
  form = new FormGroup({
    fruit: new FormControl('')
  });
}

@Component({
  template: `
    <form #f="ngForm">
      <wa-radio-group [(ngModel)]="fruit" name="fruit" required label="Fruit">
        <wa-radio value="apple">Apple</wa-radio>
        <wa-radio value="banana">Banana</wa-radio>
      </wa-radio-group>
    </form>
  `,
  standalone: true,
  imports: [WaRadioGroupDirective, WaRadioDirective, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class RadioTemplateHost {
  fruit = '';
  @ViewChild('f') form!: NgForm;
}

describe('WaRadioGroupDirective — Form Validation', () => {
  describe('Reactive Forms', () => {
    let fixture: ComponentFixture<RadioReactiveHost>;
    let host: RadioReactiveHost;
    let radioGroupEl: HTMLElement;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [RadioReactiveHost] }).compileComponents();
      fixture = TestBed.createComponent(RadioReactiveHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      radioGroupEl = fixture.nativeElement.querySelector('wa-radio-group');
    });

    it('should be invalid when no selection and required', () => {
      const ctrl = host.form.get('fruit')!;
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should become valid after selecting a value', () => {
      const ctrl = host.form.get('fruit')!;
      ctrl.setValue('apple');
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();
      expect(ctrl.errors).toBeNull();
    });

    it('should return to invalid when selection cleared', () => {
      const ctrl = host.form.get('fruit')!;
      ctrl.setValue('apple');
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();

      ctrl.setValue('');
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should mark as touched after blur', () => {
      const ctrl = host.form.get('fruit')!;
      expect(ctrl.touched).toBeFalse();
      radioGroupEl.dispatchEvent(new FocusEvent('wa-blur'));
      fixture.detectChanges();
      expect(ctrl.touched).toBeTrue();
    });

    it('should not report errors when disabled', () => {
      const ctrl = host.form.get('fruit')!;
      ctrl.disable();
      fixture.detectChanges();
      expect(ctrl.status).toBe('DISABLED');
      expect(ctrl.errors).toBeNull();
    });

    it('should accept null as invalid value', () => {
      const ctrl = host.form.get('fruit')!;
      ctrl.setValue(null);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });
  });

  describe('Template-Driven Forms', () => {
    let fixture: ComponentFixture<RadioTemplateHost>;
    let host: RadioTemplateHost;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [RadioTemplateHost] }).compileComponents();
      fixture = TestBed.createComponent(RadioTemplateHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should be invalid with empty selection', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['fruit'];
      expect(ctrl).toBeTruthy();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    }));

    it('should become valid when model updates', fakeAsync(() => {
      host.fruit = 'banana';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['fruit'];
      expect(ctrl.valid).toBeTrue();
    }));
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 6. WaComboboxComponent — Form Validation
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-combobox formControlName="item" [required]="true" label="Item">
      </wa-combobox>
    </form>
  `,
  standalone: true,
  imports: [WaComboboxComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class ComboboxReactiveHost {
  form = new FormGroup({
    item: new FormControl('')
  });
}

@Component({
  template: `
    <form [formGroup]="form">
      <wa-combobox formControlName="items" [required]="true" [multiple]="true" label="Items">
      </wa-combobox>
    </form>
  `,
  standalone: true,
  imports: [WaComboboxComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class ComboboxMultipleReactiveHost {
  form = new FormGroup({
    items: new FormControl<string[]>([])
  });
}

@Component({
  template: `
    <form #f="ngForm">
      <wa-combobox [(ngModel)]="item" name="item" required label="Item">
      </wa-combobox>
    </form>
  `,
  standalone: true,
  imports: [WaComboboxComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class ComboboxTemplateHost {
  item = '';
  @ViewChild('f') form!: NgForm;
}

describe('WaComboboxComponent — Form Validation', () => {
  describe('Reactive Forms — single', () => {
    let fixture: ComponentFixture<ComboboxReactiveHost>;
    let host: ComboboxReactiveHost;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [ComboboxReactiveHost] }).compileComponents();
      fixture = TestBed.createComponent(ComboboxReactiveHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be invalid when empty and required', () => {
      const ctrl = host.form.get('item')!;
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should become valid with a value', () => {
      const ctrl = host.form.get('item')!;
      ctrl.setValue('Widget');
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();
      expect(ctrl.errors).toBeNull();
    });

    it('should return to invalid when cleared', () => {
      const ctrl = host.form.get('item')!;
      ctrl.setValue('Widget');
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();

      ctrl.setValue('');
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should not report errors when disabled', () => {
      const ctrl = host.form.get('item')!;
      ctrl.disable();
      fixture.detectChanges();
      expect(ctrl.status).toBe('DISABLED');
      expect(ctrl.errors).toBeNull();
    });
  });

  describe('Reactive Forms — multiple', () => {
    let fixture: ComponentFixture<ComboboxMultipleReactiveHost>;
    let host: ComboboxMultipleReactiveHost;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [ComboboxMultipleReactiveHost] }).compileComponents();
      fixture = TestBed.createComponent(ComboboxMultipleReactiveHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be invalid when array is empty', () => {
      const ctrl = host.form.get('items')!;
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should become valid with items', () => {
      const ctrl = host.form.get('items')!;
      ctrl.setValue(['item1', 'item2']);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();
    });

    it('should return to invalid when all items removed', () => {
      const ctrl = host.form.get('items')!;
      ctrl.setValue(['item1']);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();

      ctrl.setValue([]);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
    });
  });

  describe('Template-Driven Forms', () => {
    let fixture: ComponentFixture<ComboboxTemplateHost>;
    let host: ComboboxTemplateHost;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [ComboboxTemplateHost] }).compileComponents();
      fixture = TestBed.createComponent(ComboboxTemplateHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should be invalid when empty', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['item'];
      expect(ctrl).toBeTruthy();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    }));

    it('should become valid when model updates', fakeAsync(() => {
      host.item = 'Gadget';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['item'];
      expect(ctrl.valid).toBeTrue();
    }));
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 7. WaTextareaComponent — Form Validation
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-textarea formControlName="comment" [required]="true" label="Comment"></wa-textarea>
    </form>
  `,
  standalone: true,
  imports: [WaTextareaComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class TextareaReactiveHost {
  form = new FormGroup({
    comment: new FormControl('')
  });
}

@Component({
  template: `
    <form #f="ngForm">
      <wa-textarea [(ngModel)]="comment" name="comment" [required]="true" label="Comment"></wa-textarea>
    </form>
  `,
  standalone: true,
  imports: [WaTextareaComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class TextareaTemplateHost {
  comment = '';
  @ViewChild('f') form!: NgForm;
}

describe('WaTextareaComponent — Form Validation', () => {
  describe('Reactive Forms', () => {
    let fixture: ComponentFixture<TextareaReactiveHost>;
    let host: TextareaReactiveHost;
    let textareaEl: HTMLElement;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [TextareaReactiveHost] }).compileComponents();
      fixture = TestBed.createComponent(TextareaReactiveHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      textareaEl = fixture.nativeElement.querySelector('wa-textarea');
    });

    it('should be invalid when empty and required', () => {
      const ctrl = host.form.get('comment')!;
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors).toBeTruthy();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should become valid when text entered', () => {
      const ctrl = host.form.get('comment')!;
      ctrl.setValue('Some comment');
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();
      expect(ctrl.errors).toBeNull();
    });

    it('should return to invalid when cleared', () => {
      const ctrl = host.form.get('comment')!;
      ctrl.setValue('text');
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();

      ctrl.setValue('');
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should mark as touched after blur', () => {
      const ctrl = host.form.get('comment')!;
      expect(ctrl.touched).toBeFalse();
      textareaEl.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();
      expect(ctrl.touched).toBeTrue();
    });

    it('should not report errors when disabled', () => {
      const ctrl = host.form.get('comment')!;
      ctrl.disable();
      fixture.detectChanges();
      expect(ctrl.status).toBe('DISABLED');
      expect(ctrl.errors).toBeNull();
    });
  });

  describe('Template-Driven Forms', () => {
    let fixture: ComponentFixture<TextareaTemplateHost>;
    let host: TextareaTemplateHost;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [TextareaTemplateHost] }).compileComponents();
      fixture = TestBed.createComponent(TextareaTemplateHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should be invalid when empty', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['comment'];
      expect(ctrl).toBeTruthy();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    }));

    it('should become valid when model updates', fakeAsync(() => {
      host.comment = 'My comment';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['comment'];
      expect(ctrl.valid).toBeTrue();
    }));
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 8. Cross-Component: Full Form with multiple controls
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-input formControlName="name" [required]="true" label="Name"></wa-input>
      <wa-textarea formControlName="bio" [required]="true" label="Bio"></wa-textarea>
      <wa-select formControlName="role" [required]="true" label="Role">
        <wa-option value="admin">Admin</wa-option>
        <wa-option value="user">User</wa-option>
      </wa-select>
      <wa-checkbox formControlName="terms" [required]="true">Accept terms</wa-checkbox>
    </form>
  `,
  standalone: true,
  imports: [
    WaInputDirective,
    WaTextareaComponent,
    WaSelectWrapperComponent,
    WaOptionComponent,
    WaCheckboxDirective,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class FullFormReactiveHost {
  form = new FormGroup({
    name: new FormControl(''),
    bio: new FormControl(''),
    role: new FormControl(''),
    terms: new FormControl(false)
  });
}

describe('Cross-Component Full Form — Validation', () => {
  let fixture: ComponentFixture<FullFormReactiveHost>;
  let host: FullFormReactiveHost;

  beforeEach(async () => {
    ensureCustomElements();
    await TestBed.configureTestingModule({ imports: [FullFormReactiveHost] }).compileComponents();
    fixture = TestBed.createComponent(FullFormReactiveHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have all controls invalid initially', () => {
    expect(host.form.valid).toBeFalse();
    expect(host.form.get('name')!.errors!['required']).toBeTrue();
    expect(host.form.get('bio')!.errors!['required']).toBeTrue();
    expect(host.form.get('role')!.errors!['required']).toBeTrue();
    expect(host.form.get('terms')!.errors!['required']).toBeTrue();
  });

  it('should become valid only when all fields are filled', () => {
    const form = host.form;
    form.get('name')!.setValue('John');
    form.get('bio')!.setValue('A developer');
    form.get('role')!.setValue('admin');
    form.get('terms')!.setValue(true);
    fixture.detectChanges();

    expect(form.valid).toBeTrue();
    expect(form.get('name')!.errors).toBeNull();
    expect(form.get('bio')!.errors).toBeNull();
    expect(form.get('role')!.errors).toBeNull();
    expect(form.get('terms')!.errors).toBeNull();
  });

  it('should be invalid if any single field is missing', () => {
    const form = host.form;
    // Fill all but name
    form.get('bio')!.setValue('A developer');
    form.get('role')!.setValue('admin');
    form.get('terms')!.setValue(true);
    fixture.detectChanges();

    expect(form.valid).toBeFalse();
    expect(form.get('name')!.errors!['required']).toBeTrue();
    expect(form.get('bio')!.errors).toBeNull();
    expect(form.get('role')!.errors).toBeNull();
    expect(form.get('terms')!.errors).toBeNull();
  });

  it('should track dirty state independently for each control', () => {
    const form = host.form;
    expect(form.get('name')!.dirty).toBeFalse();
    expect(form.get('bio')!.dirty).toBeFalse();

    // Only name gets dirty
    const nameEl = fixture.nativeElement.querySelector('wa-input');
    (nameEl as any).value = 'Jane';
    nameEl.dispatchEvent(new Event('wa-input'));
    fixture.detectChanges();

    expect(form.get('name')!.dirty).toBeTrue();
    expect(form.get('bio')!.dirty).toBeFalse();
  });

  it('should report the form as touched when any control is touched', () => {
    expect(host.form.touched).toBeFalse();

    const nameEl = fixture.nativeElement.querySelector('wa-input');
    nameEl.dispatchEvent(new FocusEvent('wa-blur'));
    fixture.detectChanges();

    expect(host.form.touched).toBeTrue();
    expect(host.form.get('name')!.touched).toBeTrue();
    expect(host.form.get('bio')!.touched).toBeFalse();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 9. Edge Cases and Dynamic Validation
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-input formControlName="field" [required]="isRequired" label="Dynamic"></wa-input>
    </form>
  `,
  standalone: true,
  imports: [WaInputDirective, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class DynamicValidationHost {
  isRequired = false;
  form = new FormGroup({
    field: new FormControl('')
  });
}

describe('Dynamic Validation Toggling', () => {
  let fixture: ComponentFixture<DynamicValidationHost>;
  let host: DynamicValidationHost;

  beforeEach(async () => {
    ensureCustomElements();
    await TestBed.configureTestingModule({ imports: [DynamicValidationHost] }).compileComponents();
    fixture = TestBed.createComponent(DynamicValidationHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be valid when required is false even with empty value', () => {
    const ctrl = host.form.get('field')!;
    expect(ctrl.valid).toBeTrue();
    expect(ctrl.errors).toBeNull();
  });

  it('should become invalid when required toggled to true', () => {
    host.isRequired = true;
    fixture.detectChanges();

    const ctrl = host.form.get('field')!;
    // Trigger re-validation
    ctrl.updateValueAndValidity();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['required']).toBeTrue();
  });

  it('should return to valid when required toggled back to false', () => {
    host.isRequired = true;
    fixture.detectChanges();
    const ctrl = host.form.get('field')!;
    ctrl.updateValueAndValidity();
    expect(ctrl.valid).toBeFalse();

    host.isRequired = false;
    fixture.detectChanges();
    ctrl.updateValueAndValidity();
    expect(ctrl.valid).toBeTrue();
  });

  it('should handle null value as invalid when required', () => {
    host.isRequired = true;
    fixture.detectChanges();
    const ctrl = host.form.get('field')!;
    ctrl.setValue(null);
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['required']).toBeTrue();
  });

  it('should handle undefined value as invalid when required', () => {
    host.isRequired = true;
    fixture.detectChanges();
    const ctrl = host.form.get('field')!;
    ctrl.setValue(undefined as any);
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 10. WaSliderDirective — Form Validation (required, min, max)
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-slider formControlName="volume" [min]="0" [max]="100" [required]="true" label="Volume"></wa-slider>
    </form>
  `,
  standalone: true,
  imports: [WaSliderDirective, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class SliderRequiredReactiveHost {
  form = new FormGroup({
    volume: new FormControl<number | null>(null)
  });
}

@Component({
  template: `
    <form [formGroup]="form">
      <wa-slider formControlName="brightness" [min]="10" [max]="90" label="Brightness"></wa-slider>
    </form>
  `,
  standalone: true,
  imports: [WaSliderDirective, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class SliderMinMaxReactiveHost {
  form = new FormGroup({
    brightness: new FormControl<number | null>(50)
  });
}

@Component({
  template: `
    <form #f="ngForm">
      <wa-slider [(ngModel)]="level" name="level" [min]="0" [max]="100" required label="Level"></wa-slider>
    </form>
  `,
  standalone: true,
  imports: [WaSliderDirective, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class SliderTemplateHost {
  level: number | null = null;
  @ViewChild('f') form!: NgForm;
}

describe('WaSliderDirective — Form Validation', () => {
  describe('Reactive Forms — required', () => {
    let fixture: ComponentFixture<SliderRequiredReactiveHost>;
    let host: SliderRequiredReactiveHost;
    let sliderEl: HTMLElement;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [SliderRequiredReactiveHost] }).compileComponents();
      fixture = TestBed.createComponent(SliderRequiredReactiveHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      sliderEl = fixture.nativeElement.querySelector('wa-slider');
    });

    it('should be invalid when null and required', () => {
      const ctrl = host.form.get('volume')!;
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors).toBeTruthy();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should become valid when a value is set', () => {
      const ctrl = host.form.get('volume')!;
      ctrl.setValue(50);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();
      expect(ctrl.errors).toBeNull();
    });

    it('should accept 0 as a valid value (not empty)', () => {
      const ctrl = host.form.get('volume')!;
      ctrl.setValue(0);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();
      expect(ctrl.errors).toBeNull();
    });

    it('should return to invalid when set back to null', () => {
      const ctrl = host.form.get('volume')!;
      ctrl.setValue(50);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();

      ctrl.setValue(null);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should mark as touched after blur', () => {
      const ctrl = host.form.get('volume')!;
      expect(ctrl.touched).toBeFalse();
      sliderEl.dispatchEvent(new FocusEvent('wa-blur'));
      fixture.detectChanges();
      expect(ctrl.touched).toBeTrue();
    });

    it('should not report errors when disabled', () => {
      const ctrl = host.form.get('volume')!;
      ctrl.disable();
      fixture.detectChanges();
      expect(ctrl.status).toBe('DISABLED');
      expect(ctrl.errors).toBeNull();
    });
  });

  describe('Reactive Forms — min/max', () => {
    let fixture: ComponentFixture<SliderMinMaxReactiveHost>;
    let host: SliderMinMaxReactiveHost;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [SliderMinMaxReactiveHost] }).compileComponents();
      fixture = TestBed.createComponent(SliderMinMaxReactiveHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be valid when value is within range', () => {
      const ctrl = host.form.get('brightness')!;
      expect(ctrl.valid).toBeTrue();
      expect(ctrl.errors).toBeNull();
    });

    it('should report min error when value is below minimum', () => {
      const ctrl = host.form.get('brightness')!;
      ctrl.setValue(5);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['min']).toBeTruthy();
      expect(ctrl.errors!['min'].min).toBe(10);
      expect(ctrl.errors!['min'].actual).toBe(5);
    });

    it('should report max error when value exceeds maximum', () => {
      const ctrl = host.form.get('brightness')!;
      ctrl.setValue(95);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['max']).toBeTruthy();
      expect(ctrl.errors!['max'].max).toBe(90);
      expect(ctrl.errors!['max'].actual).toBe(95);
    });

    it('should be valid at the minimum boundary', () => {
      const ctrl = host.form.get('brightness')!;
      ctrl.setValue(10);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();
    });

    it('should be valid at the maximum boundary', () => {
      const ctrl = host.form.get('brightness')!;
      ctrl.setValue(90);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();
    });

    it('should clear min error once value meets minimum', () => {
      const ctrl = host.form.get('brightness')!;
      ctrl.setValue(5);
      fixture.detectChanges();
      expect(ctrl.errors!['min']).toBeTruthy();

      ctrl.setValue(10);
      fixture.detectChanges();
      expect(ctrl.errors).toBeNull();
    });

    it('should clear max error once value meets maximum', () => {
      const ctrl = host.form.get('brightness')!;
      ctrl.setValue(95);
      fixture.detectChanges();
      expect(ctrl.errors!['max']).toBeTruthy();

      ctrl.setValue(90);
      fixture.detectChanges();
      expect(ctrl.errors).toBeNull();
    });
  });

  describe('Template-Driven Forms', () => {
    let fixture: ComponentFixture<SliderTemplateHost>;
    let host: SliderTemplateHost;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [SliderTemplateHost] }).compileComponents();
      fixture = TestBed.createComponent(SliderTemplateHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should be invalid when null and required', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['level'];
      expect(ctrl).toBeTruthy();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    }));

    it('should become valid when model updates', fakeAsync(() => {
      host.level = 42;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['level'];
      expect(ctrl.valid).toBeTrue();
    }));
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 11. WaInputDirective — Extended Validation (min, max, minlength, maxlength, pattern)
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-input formControlName="age" type="number" [min]="18" [max]="120" label="Age"></wa-input>
    </form>
  `,
  standalone: true,
  imports: [WaInputDirective, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class InputMinMaxHost {
  form = new FormGroup({
    age: new FormControl('')
  });
}

@Component({
  template: `
    <form [formGroup]="form">
      <wa-input formControlName="username" [minlength]="3" [maxlength]="20" label="Username"></wa-input>
    </form>
  `,
  standalone: true,
  imports: [WaInputDirective, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class InputLengthHost {
  form = new FormGroup({
    username: new FormControl('')
  });
}

@Component({
  template: `
    <form [formGroup]="form">
      <wa-input formControlName="zipCode" [pattern]="'[0-9]{5}'" label="Zip Code"></wa-input>
    </form>
  `,
  standalone: true,
  imports: [WaInputDirective, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class InputPatternHost {
  form = new FormGroup({
    zipCode: new FormControl('')
  });
}

@Component({
  template: `
    <form [formGroup]="form">
      <wa-input formControlName="code"
                [required]="true"
                [minlength]="3"
                [maxlength]="10"
                [pattern]="'[A-Z0-9]+'"
                label="Code"></wa-input>
    </form>
  `,
  standalone: true,
  imports: [WaInputDirective, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class InputCombinedValidationHost {
  form = new FormGroup({
    code: new FormControl('')
  });
}

describe('WaInputDirective — Min/Max Validation', () => {
  let fixture: ComponentFixture<InputMinMaxHost>;
  let host: InputMinMaxHost;

  beforeEach(async () => {
    ensureCustomElements();
    await TestBed.configureTestingModule({ imports: [InputMinMaxHost] }).compileComponents();
    fixture = TestBed.createComponent(InputMinMaxHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be valid when empty (no required)', () => {
    const ctrl = host.form.get('age')!;
    expect(ctrl.valid).toBeTrue();
  });

  it('should be valid when value within range', () => {
    const ctrl = host.form.get('age')!;
    ctrl.setValue('25');
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();
    expect(ctrl.errors).toBeNull();
  });

  it('should report min error when below minimum', () => {
    const ctrl = host.form.get('age')!;
    ctrl.setValue('10');
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['min']).toBeTruthy();
    expect(ctrl.errors!['min'].min).toBe(18);
    expect(ctrl.errors!['min'].actual).toBe(10);
  });

  it('should report max error when above maximum', () => {
    const ctrl = host.form.get('age')!;
    ctrl.setValue('150');
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['max']).toBeTruthy();
    expect(ctrl.errors!['max'].max).toBe(120);
    expect(ctrl.errors!['max'].actual).toBe(150);
  });

  it('should be valid at the minimum boundary', () => {
    const ctrl = host.form.get('age')!;
    ctrl.setValue('18');
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();
  });

  it('should be valid at the maximum boundary', () => {
    const ctrl = host.form.get('age')!;
    ctrl.setValue('120');
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();
  });

  it('should clear min error when value corrected', () => {
    const ctrl = host.form.get('age')!;
    ctrl.setValue('10');
    fixture.detectChanges();
    expect(ctrl.errors!['min']).toBeTruthy();

    ctrl.setValue('20');
    fixture.detectChanges();
    expect(ctrl.errors).toBeNull();
  });
});

describe('WaInputDirective — Minlength/Maxlength Validation', () => {
  let fixture: ComponentFixture<InputLengthHost>;
  let host: InputLengthHost;

  beforeEach(async () => {
    ensureCustomElements();
    await TestBed.configureTestingModule({ imports: [InputLengthHost] }).compileComponents();
    fixture = TestBed.createComponent(InputLengthHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be valid when empty (no required)', () => {
    expect(host.form.get('username')!.valid).toBeTrue();
  });

  it('should report minlength error when too short', () => {
    const ctrl = host.form.get('username')!;
    ctrl.setValue('ab');
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['minlength']).toBeTruthy();
    expect(ctrl.errors!['minlength'].requiredLength).toBe(3);
    expect(ctrl.errors!['minlength'].actualLength).toBe(2);
  });

  it('should be valid at exactly the minimum length', () => {
    const ctrl = host.form.get('username')!;
    ctrl.setValue('abc');
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();
  });

  it('should report maxlength error when too long', () => {
    const ctrl = host.form.get('username')!;
    ctrl.setValue('abcdefghijklmnopqrstu'); // 21 chars
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['maxlength']).toBeTruthy();
    expect(ctrl.errors!['maxlength'].requiredLength).toBe(20);
    expect(ctrl.errors!['maxlength'].actualLength).toBe(21);
  });

  it('should be valid at exactly the maximum length', () => {
    const ctrl = host.form.get('username')!;
    ctrl.setValue('abcdefghijklmnopqrst'); // 20 chars
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();
  });

  it('should clear minlength error when text lengthened', () => {
    const ctrl = host.form.get('username')!;
    ctrl.setValue('ab');
    fixture.detectChanges();
    expect(ctrl.errors!['minlength']).toBeTruthy();

    ctrl.setValue('abc');
    fixture.detectChanges();
    expect(ctrl.errors).toBeNull();
  });
});

describe('WaInputDirective — Pattern Validation', () => {
  let fixture: ComponentFixture<InputPatternHost>;
  let host: InputPatternHost;

  beforeEach(async () => {
    ensureCustomElements();
    await TestBed.configureTestingModule({ imports: [InputPatternHost] }).compileComponents();
    fixture = TestBed.createComponent(InputPatternHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be valid when empty (no required)', () => {
    expect(host.form.get('zipCode')!.valid).toBeTrue();
  });

  it('should be valid when matching pattern', () => {
    const ctrl = host.form.get('zipCode')!;
    ctrl.setValue('12345');
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();
    expect(ctrl.errors).toBeNull();
  });

  it('should report pattern error when not matching', () => {
    const ctrl = host.form.get('zipCode')!;
    ctrl.setValue('1234'); // too short
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['pattern']).toBeTruthy();
    expect(ctrl.errors!['pattern'].requiredPattern).toBe('^[0-9]{5}$');
    expect(ctrl.errors!['pattern'].actualValue).toBe('1234');
  });

  it('should report pattern error for non-numeric', () => {
    const ctrl = host.form.get('zipCode')!;
    ctrl.setValue('abcde');
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['pattern']).toBeTruthy();
  });

  it('should clear pattern error when corrected', () => {
    const ctrl = host.form.get('zipCode')!;
    ctrl.setValue('abc');
    fixture.detectChanges();
    expect(ctrl.errors!['pattern']).toBeTruthy();

    ctrl.setValue('90210');
    fixture.detectChanges();
    expect(ctrl.errors).toBeNull();
  });
});

describe('WaInputDirective — Combined Validations', () => {
  let fixture: ComponentFixture<InputCombinedValidationHost>;
  let host: InputCombinedValidationHost;

  beforeEach(async () => {
    ensureCustomElements();
    await TestBed.configureTestingModule({ imports: [InputCombinedValidationHost] }).compileComponents();
    fixture = TestBed.createComponent(InputCombinedValidationHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should report required error when empty', () => {
    const ctrl = host.form.get('code')!;
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['required']).toBeTrue();
  });

  it('should report both minlength and pattern errors for short lowercase value', () => {
    const ctrl = host.form.get('code')!;
    ctrl.setValue('ab');
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['minlength']).toBeTruthy();
    expect(ctrl.errors!['pattern']).toBeTruthy();
  });

  it('should report only pattern error for correct-length lowercase value', () => {
    const ctrl = host.form.get('code')!;
    ctrl.setValue('abcde');
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['minlength']).toBeFalsy();
    expect(ctrl.errors!['pattern']).toBeTruthy();
  });

  it('should report only minlength error for short uppercase value', () => {
    const ctrl = host.form.get('code')!;
    ctrl.setValue('AB');
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['minlength']).toBeTruthy();
    expect(ctrl.errors!['pattern']).toBeFalsy();
  });

  it('should report maxlength error for too-long value', () => {
    const ctrl = host.form.get('code')!;
    ctrl.setValue('ABCDEFGHIJK'); // 11 chars
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['maxlength']).toBeTruthy();
    expect(ctrl.errors!['maxlength'].requiredLength).toBe(10);
  });

  it('should be valid when all constraints are satisfied', () => {
    const ctrl = host.form.get('code')!;
    ctrl.setValue('ABC123');
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();
    expect(ctrl.errors).toBeNull();
  });

  it('should transition from invalid to valid as errors are fixed', () => {
    const ctrl = host.form.get('code')!;
    // Start empty → required error
    expect(ctrl.errors!['required']).toBeTrue();

    // Set too-short lowercase → minlength + pattern
    ctrl.setValue('ab');
    fixture.detectChanges();
    expect(ctrl.errors!['minlength']).toBeTruthy();
    expect(ctrl.errors!['pattern']).toBeTruthy();

    // Fix length but not pattern → only pattern
    ctrl.setValue('abcde');
    fixture.detectChanges();
    expect(ctrl.errors!['minlength']).toBeFalsy();
    expect(ctrl.errors!['pattern']).toBeTruthy();

    // Fix pattern too → valid
    ctrl.setValue('ABCDE');
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 12. WaTextareaComponent — Extended Validation (minlength, maxlength)
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-textarea formControlName="bio" [minlength]="10" [maxlength]="200" label="Bio"></wa-textarea>
    </form>
  `,
  standalone: true,
  imports: [WaTextareaComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class TextareaLengthHost {
  form = new FormGroup({
    bio: new FormControl('')
  });
}

@Component({
  template: `
    <form [formGroup]="form">
      <wa-textarea formControlName="notes" [required]="true" [minlength]="5" label="Notes"></wa-textarea>
    </form>
  `,
  standalone: true,
  imports: [WaTextareaComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class TextareaRequiredLengthHost {
  form = new FormGroup({
    notes: new FormControl('')
  });
}

describe('WaTextareaComponent — Minlength/Maxlength Validation', () => {
  let fixture: ComponentFixture<TextareaLengthHost>;
  let host: TextareaLengthHost;

  beforeEach(async () => {
    ensureCustomElements();
    await TestBed.configureTestingModule({ imports: [TextareaLengthHost] }).compileComponents();
    fixture = TestBed.createComponent(TextareaLengthHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be valid when empty (no required)', () => {
    expect(host.form.get('bio')!.valid).toBeTrue();
  });

  it('should report minlength error when too short', () => {
    const ctrl = host.form.get('bio')!;
    ctrl.setValue('Short');
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['minlength']).toBeTruthy();
    expect(ctrl.errors!['minlength'].requiredLength).toBe(10);
    expect(ctrl.errors!['minlength'].actualLength).toBe(5);
  });

  it('should be valid at exactly the minimum length', () => {
    const ctrl = host.form.get('bio')!;
    ctrl.setValue('Exactly 10');  // 10 chars
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();
  });

  it('should report maxlength error when too long', () => {
    const ctrl = host.form.get('bio')!;
    const longText = 'A'.repeat(201);
    ctrl.setValue(longText);
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['maxlength']).toBeTruthy();
    expect(ctrl.errors!['maxlength'].requiredLength).toBe(200);
    expect(ctrl.errors!['maxlength'].actualLength).toBe(201);
  });

  it('should be valid at exactly the maximum length', () => {
    const ctrl = host.form.get('bio')!;
    const maxText = 'A'.repeat(200);
    ctrl.setValue(maxText);
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();
  });

  it('should clear minlength error when text lengthened', () => {
    const ctrl = host.form.get('bio')!;
    ctrl.setValue('Short');
    fixture.detectChanges();
    expect(ctrl.errors!['minlength']).toBeTruthy();

    ctrl.setValue('This is long enough now');
    fixture.detectChanges();
    expect(ctrl.errors).toBeNull();
  });
});

describe('WaTextareaComponent — Combined Required + Minlength', () => {
  let fixture: ComponentFixture<TextareaRequiredLengthHost>;
  let host: TextareaRequiredLengthHost;

  beforeEach(async () => {
    ensureCustomElements();
    await TestBed.configureTestingModule({ imports: [TextareaRequiredLengthHost] }).compileComponents();
    fixture = TestBed.createComponent(TextareaRequiredLengthHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should report required error when empty', () => {
    const ctrl = host.form.get('notes')!;
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['required']).toBeTrue();
    // minlength should NOT be reported when empty (value-absent)
    expect(ctrl.errors!['minlength']).toBeFalsy();
  });

  it('should report minlength (not required) when value present but short', () => {
    const ctrl = host.form.get('notes')!;
    ctrl.setValue('Hi');
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['required']).toBeFalsy();
    expect(ctrl.errors!['minlength']).toBeTruthy();
    expect(ctrl.errors!['minlength'].requiredLength).toBe(5);
  });

  it('should be valid when value meets both required and minlength', () => {
    const ctrl = host.form.get('notes')!;
    ctrl.setValue('Hello World');
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();
    expect(ctrl.errors).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 13. WaSelectWrapperComponent — Extended Validation Coverage
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-select formControlName="item" [required]="true" label="Item">
        <wa-option value="a">A</wa-option>
        <wa-option value="b">B</wa-option>
      </wa-select>
    </form>
  `,
  standalone: true,
  imports: [WaSelectWrapperComponent, WaOptionComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class SelectExtendedHost {
  form = new FormGroup({
    item: new FormControl('')
  });
}

@Component({
  template: `
    <form [formGroup]="form">
      <wa-select formControlName="items" [required]="true" [multiple]="true" label="Items">
        <wa-option value="x">X</wa-option>
        <wa-option value="y">Y</wa-option>
        <wa-option value="z">Z</wa-option>
      </wa-select>
    </form>
  `,
  standalone: true,
  imports: [WaSelectWrapperComponent, WaOptionComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class SelectMultiExtendedHost {
  form = new FormGroup({
    items: new FormControl<string[]>([])
  });
}

@Component({
  template: `
    <form #f="ngForm">
      <wa-select [(ngModel)]="items" name="items" required [multiple]="true" label="Items">
        <wa-option value="x">X</wa-option>
        <wa-option value="y">Y</wa-option>
      </wa-select>
    </form>
  `,
  standalone: true,
  imports: [WaSelectWrapperComponent, WaOptionComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class SelectMultiTemplateHost {
  items: string[] = [];
  @ViewChild('f') form!: NgForm;
}

describe('WaSelectWrapperComponent — Extended Coverage', () => {
  describe('Single — dirty, touched, null edge cases', () => {
    let fixture: ComponentFixture<SelectExtendedHost>;
    let host: SelectExtendedHost;
    let selectEl: HTMLElement;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [SelectExtendedHost] }).compileComponents();
      fixture = TestBed.createComponent(SelectExtendedHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      selectEl = fixture.nativeElement.querySelector('wa-select');
    });

    it('should be pristine initially', () => {
      expect(host.form.get('item')!.pristine).toBeTrue();
    });

    it('should become dirty after value change via DOM event', () => {
      const ctrl = host.form.get('item')!;
      (selectEl as any).value = 'a';
      selectEl.setAttribute('value', 'a');
      selectEl.dispatchEvent(new Event('wa-change'));
      fixture.detectChanges();
      expect(ctrl.dirty).toBeTrue();
    });

    it('should mark as touched on blur event', () => {
      const ctrl = host.form.get('item')!;
      expect(ctrl.touched).toBeFalse();
      selectEl.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();
      expect(ctrl.touched).toBeTrue();
    });

    it('should be invalid when value is null', () => {
      const ctrl = host.form.get('item')!;
      ctrl.setValue(null);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should be invalid when value is undefined', () => {
      const ctrl = host.form.get('item')!;
      ctrl.setValue(undefined as any);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
    });
  });

  describe('Multiple — dirty, touched, null edge cases', () => {
    let fixture: ComponentFixture<SelectMultiExtendedHost>;
    let host: SelectMultiExtendedHost;
    let selectEl: HTMLElement;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [SelectMultiExtendedHost] }).compileComponents();
      fixture = TestBed.createComponent(SelectMultiExtendedHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      selectEl = fixture.nativeElement.querySelector('wa-select');
    });

    it('should be pristine initially', () => {
      expect(host.form.get('items')!.pristine).toBeTrue();
    });

    it('should mark as touched on blur', () => {
      const ctrl = host.form.get('items')!;
      expect(ctrl.touched).toBeFalse();
      selectEl.dispatchEvent(new FocusEvent('wa-blur'));
      fixture.detectChanges();
      expect(ctrl.touched).toBeTrue();
    });

    it('should be invalid when value is null', () => {
      const ctrl = host.form.get('items')!;
      ctrl.setValue(null as any);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
    });

    it('should be valid with single item in array', () => {
      const ctrl = host.form.get('items')!;
      ctrl.setValue(['x']);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();
    });

    it('should not report required error when disabled', () => {
      const ctrl = host.form.get('items')!;
      ctrl.disable();
      fixture.detectChanges();
      expect(ctrl.status).toBe('DISABLED');
      expect(ctrl.errors).toBeNull();
    });
  });

  describe('Multiple — Template-Driven', () => {
    let fixture: ComponentFixture<SelectMultiTemplateHost>;
    let host: SelectMultiTemplateHost;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [SelectMultiTemplateHost] }).compileComponents();
      fixture = TestBed.createComponent(SelectMultiTemplateHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should be invalid when empty array', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['items'];
      expect(ctrl).toBeTruthy();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    }));

    it('should become valid when model has items', fakeAsync(() => {
      host.items = ['x'];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['items'];
      expect(ctrl.valid).toBeTrue();
    }));
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 14. WaSwitchDirective — Extended Validation Coverage
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-switch waSwitch formControlName="agree" [required]="true">Agree</wa-switch>
    </form>
  `,
  standalone: true,
  imports: [WaSwitchDirective, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class SwitchExtendedHost {
  form = new FormGroup({
    agree: new FormControl(false)
  });
}

describe('WaSwitchDirective — Extended Coverage', () => {
  let fixture: ComponentFixture<SwitchExtendedHost>;
  let host: SwitchExtendedHost;
  let switchEl: HTMLElement;

  beforeEach(async () => {
    ensureCustomElements();
    await TestBed.configureTestingModule({ imports: [SwitchExtendedHost] }).compileComponents();
    fixture = TestBed.createComponent(SwitchExtendedHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
    switchEl = fixture.nativeElement.querySelector('wa-switch');
  });

  it('should be pristine initially', () => {
    expect(host.form.get('agree')!.pristine).toBeTrue();
  });

  it('should become dirty after user toggles via wa-change event', () => {
    const ctrl = host.form.get('agree')!;
    Object.defineProperty(switchEl, 'checked', { value: true, writable: true });
    switchEl.dispatchEvent(new Event('wa-change'));
    fixture.detectChanges();
    expect(ctrl.dirty).toBeTrue();
  });

  it('should mark as touched on native blur event', () => {
    const ctrl = host.form.get('agree')!;
    expect(ctrl.touched).toBeFalse();
    switchEl.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    expect(ctrl.touched).toBeTrue();
  });

  it('should treat null value as invalid when required', () => {
    const ctrl = host.form.get('agree')!;
    ctrl.setValue(null);
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['required']).toBeTrue();
  });

  it('should treat undefined value as invalid when required', () => {
    const ctrl = host.form.get('agree')!;
    ctrl.setValue(undefined as any);
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
  });

  it('should cycle through invalid → valid → invalid correctly', () => {
    const ctrl = host.form.get('agree')!;
    expect(ctrl.valid).toBeFalse();

    ctrl.setValue(true);
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();

    ctrl.setValue(false);
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();

    ctrl.setValue(true);
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 15. WaComboboxComponent — Extended Validation Coverage
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-combobox formControlName="choice" [required]="true" label="Choice">
      </wa-combobox>
    </form>
  `,
  standalone: true,
  imports: [WaComboboxComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class ComboboxExtendedHost {
  form = new FormGroup({
    choice: new FormControl('')
  });
}

@Component({
  template: `
    <form [formGroup]="form">
      <wa-combobox formControlName="choices" [required]="true" [multiple]="true" label="Choices">
      </wa-combobox>
    </form>
  `,
  standalone: true,
  imports: [WaComboboxComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class ComboboxMultiExtendedHost {
  form = new FormGroup({
    choices: new FormControl<string[]>([])
  });
}

@Component({
  template: `
    <form #f="ngForm">
      <wa-combobox [(ngModel)]="choices" name="choices" required [multiple]="true" label="Choices">
      </wa-combobox>
    </form>
  `,
  standalone: true,
  imports: [WaComboboxComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class ComboboxMultiTemplateHost {
  choices: string[] = [];
  @ViewChild('f') form!: NgForm;
}

describe('WaComboboxComponent — Extended Coverage', () => {
  describe('Single — dirty, touched, null edge cases', () => {
    let fixture: ComponentFixture<ComboboxExtendedHost>;
    let host: ComboboxExtendedHost;
    let comboEl: HTMLElement;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [ComboboxExtendedHost] }).compileComponents();
      fixture = TestBed.createComponent(ComboboxExtendedHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      comboEl = fixture.nativeElement.querySelector('wa-combobox');
    });

    it('should be pristine initially', () => {
      expect(host.form.get('choice')!.pristine).toBeTrue();
    });

    it('should mark as touched on blur', () => {
      const ctrl = host.form.get('choice')!;
      expect(ctrl.touched).toBeFalse();
      comboEl.dispatchEvent(new FocusEvent('wa-blur'));
      fixture.detectChanges();
      expect(ctrl.touched).toBeTrue();
    });

    it('should be invalid when value is null', () => {
      const ctrl = host.form.get('choice')!;
      ctrl.setValue(null);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });

    it('should be invalid when value is undefined', () => {
      const ctrl = host.form.get('choice')!;
      ctrl.setValue(undefined as any);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
    });

    it('should cycle through invalid → valid → invalid correctly', () => {
      const ctrl = host.form.get('choice')!;
      expect(ctrl.valid).toBeFalse();

      ctrl.setValue('Option A');
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();

      ctrl.setValue('');
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });
  });

  describe('Multiple — dirty, touched, null edge cases', () => {
    let fixture: ComponentFixture<ComboboxMultiExtendedHost>;
    let host: ComboboxMultiExtendedHost;
    let comboEl: HTMLElement;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [ComboboxMultiExtendedHost] }).compileComponents();
      fixture = TestBed.createComponent(ComboboxMultiExtendedHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      comboEl = fixture.nativeElement.querySelector('wa-combobox');
    });

    it('should be pristine initially', () => {
      expect(host.form.get('choices')!.pristine).toBeTrue();
    });

    it('should mark as touched on blur', () => {
      const ctrl = host.form.get('choices')!;
      expect(ctrl.touched).toBeFalse();
      comboEl.dispatchEvent(new FocusEvent('wa-blur'));
      fixture.detectChanges();
      expect(ctrl.touched).toBeTrue();
    });

    it('should be invalid when value is null', () => {
      const ctrl = host.form.get('choices')!;
      ctrl.setValue(null as any);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
    });

    it('should be valid with single item in array', () => {
      const ctrl = host.form.get('choices')!;
      ctrl.setValue(['one']);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();
    });

    it('should not report errors when disabled', () => {
      const ctrl = host.form.get('choices')!;
      ctrl.disable();
      fixture.detectChanges();
      expect(ctrl.status).toBe('DISABLED');
      expect(ctrl.errors).toBeNull();
    });

    it('should transition valid → invalid on removing all items', () => {
      const ctrl = host.form.get('choices')!;
      ctrl.setValue(['a', 'b']);
      fixture.detectChanges();
      expect(ctrl.valid).toBeTrue();

      ctrl.setValue([]);
      fixture.detectChanges();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    });
  });

  describe('Multiple — Template-Driven', () => {
    let fixture: ComponentFixture<ComboboxMultiTemplateHost>;
    let host: ComboboxMultiTemplateHost;

    beforeEach(async () => {
      ensureCustomElements();
      await TestBed.configureTestingModule({ imports: [ComboboxMultiTemplateHost] }).compileComponents();
      fixture = TestBed.createComponent(ComboboxMultiTemplateHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should be invalid when empty array', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['choices'];
      expect(ctrl).toBeTruthy();
      expect(ctrl.valid).toBeFalse();
      expect(ctrl.errors!['required']).toBeTrue();
    }));

    it('should become valid when model has items', fakeAsync(() => {
      host.choices = ['opt1'];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const ctrl = host.form.controls['choices'];
      expect(ctrl.valid).toBeTrue();
    }));
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 16. WaRadioGroupDirective — Extended Validation Coverage
// ═══════════════════════════════════════════════════════════════════════════════

@Component({
  template: `
    <form [formGroup]="form">
      <wa-radio-group formControlName="color" [required]="true" label="Color">
        <wa-radio value="red">Red</wa-radio>
        <wa-radio value="green">Green</wa-radio>
        <wa-radio value="blue">Blue</wa-radio>
      </wa-radio-group>
    </form>
  `,
  standalone: true,
  imports: [WaRadioGroupDirective, WaRadioDirective, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class RadioExtendedHost {
  form = new FormGroup({
    color: new FormControl('')
  });
}

describe('WaRadioGroupDirective — Extended Coverage', () => {
  let fixture: ComponentFixture<RadioExtendedHost>;
  let host: RadioExtendedHost;
  let radioGroupEl: HTMLElement;

  beforeEach(async () => {
    ensureCustomElements();
    await TestBed.configureTestingModule({ imports: [RadioExtendedHost] }).compileComponents();
    fixture = TestBed.createComponent(RadioExtendedHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
    radioGroupEl = fixture.nativeElement.querySelector('wa-radio-group');
  });

  it('should be pristine initially', () => {
    expect(host.form.get('color')!.pristine).toBeTrue();
  });

  it('should become dirty after user selects via wa-input event', () => {
    const ctrl = host.form.get('color')!;
    (radioGroupEl as any).value = 'red';
    radioGroupEl.setAttribute('value', 'red');
    radioGroupEl.dispatchEvent(new Event('wa-input'));
    fixture.detectChanges();
    expect(ctrl.dirty).toBeTrue();
  });

  it('should mark as touched on native blur event', () => {
    const ctrl = host.form.get('color')!;
    expect(ctrl.touched).toBeFalse();
    radioGroupEl.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    expect(ctrl.touched).toBeTrue();
  });

  it('should treat undefined value as invalid when required', () => {
    const ctrl = host.form.get('color')!;
    ctrl.setValue(undefined as any);
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
  });

  it('should cycle through invalid → valid → invalid correctly', () => {
    const ctrl = host.form.get('color')!;
    expect(ctrl.valid).toBeFalse();

    ctrl.setValue('green');
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();

    ctrl.setValue('');
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalse();
    expect(ctrl.errors!['required']).toBeTrue();

    ctrl.setValue('blue');
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();
  });

  it('should allow changing selection without losing validity', () => {
    const ctrl = host.form.get('color')!;
    ctrl.setValue('red');
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();

    ctrl.setValue('blue');
    fixture.detectChanges();
    expect(ctrl.valid).toBeTrue();
    expect(ctrl.errors).toBeNull();
  });
});






