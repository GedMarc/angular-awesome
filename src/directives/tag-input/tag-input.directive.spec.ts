import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { WaTagInputCreateDetail, WaTagInputDirective } from './tag-input.directive';

@Component({
  template: `
    <wa-tag-input
      [value]="value"
      [defaultValue]="defaultValue"
      [inputValue]="inputValue"
      [delimiter]="delimiter"
      [maxTags]="maxTags"
      [minTags]="minTags"
      [allowDuplicates]="allowDuplicates"
      [withClear]="withClear"
      [placeholder]="placeholder"
      [label]="label"
      [hint]="hint"
      [withLabel]="withLabel"
      [withHint]="withHint"
      [size]="size"
      [appearance]="appearance"
      [pill]="pill"
      [readonly]="readonly"
      [required]="required"
      [autocapitalize]="autocapitalize"
      [autocorrect]="autocorrect"
      [autocomplete]="autocomplete"
      [enterkeyhint]="enterkeyhint"
      [spellcheck]="spellcheck"
      [inputmode]="inputmode"
      [name]="name"
      [disabled]="disabled"
      [form]="form"
      [validators]="validators"
      [validationTarget]="validationTarget"
      (waCreate)="onCreate($event)"
      (waClear)="onClear($event)"
    ></wa-tag-input>
  `,
  standalone: true,
  imports: [WaTagInputDirective]
})
class TestHostComponent {
  value?: string[] | null;
  defaultValue?: string | null;
  inputValue?: string;
  delimiter?: string;
  maxTags?: number | string;
  minTags?: number | string;
  allowDuplicates?: boolean | string;
  withClear?: boolean | string;
  placeholder?: string;
  label?: string;
  hint?: string;
  withLabel?: boolean | string;
  withHint?: boolean | string;
  size?: string;
  appearance?: string;
  pill?: boolean | string;
  readonly?: boolean | string;
  required?: boolean | string;
  autocapitalize?: string;
  autocorrect?: boolean | string;
  autocomplete?: string;
  enterkeyhint?: string;
  spellcheck?: boolean | string;
  inputmode?: string;
  name?: string | null;
  disabled?: boolean | string;
  form?: string | null;
  validators?: readonly unknown[];
  validationTarget?: HTMLElement;
  createEvent?: CustomEvent<WaTagInputCreateDetail>;
  clearEvent?: CustomEvent;

  onCreate(event: CustomEvent<WaTagInputCreateDetail>): void {
    this.createEvent = event;
  }

  onClear(event: CustomEvent): void {
    this.clearEvent = event;
  }
}

@Component({
  template: `<wa-tag-input [formControl]="control" [required]="required" [minTags]="minTags" [maxTags]="maxTags"></wa-tag-input>`,
  standalone: true,
  imports: [WaTagInputDirective, ReactiveFormsModule]
})
class ReactiveHostComponent {
  control = new FormControl<string[]>([], { nonNullable: true });
  required = false;
  minTags?: number;
  maxTags?: number;
}

describe('WaTagInputDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let element: HTMLElement;
  let directive: WaTagInputDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('wa-tag-input');
    directive = fixture.debugElement
      .query(debugElement => debugElement.nativeElement === element)
      .injector.get(WaTagInputDirective);
  });

  it('creates the directive and exposes the native element', () => {
    expect(directive).toBeTruthy();
    expect(directive.nativeElement).toBe(element);
  });

  it('writes the array value as a live property and keeps the reset value as an attribute', () => {
    host.value = ['angular', 'web-components'];
    host.defaultValue = 'angular,web-components';
    host.inputValue = 'typ';
    fixture.detectChanges();

    expect((element as any).value).toEqual(['angular', 'web-components']);
    expect((element as any).value).not.toBe(host.value);
    expect((element as any).defaultValue).toBe('angular,web-components');
    expect((element as any).inputValue).toBe('typ');
    expect(element.getAttribute('value')).toBe('angular,web-components');
  });

  it('applies string, numeric, appearance, and boolean inputs', () => {
    host.delimiter = ',;';
    host.maxTags = 8;
    host.minTags = '2';
    host.allowDuplicates = true;
    host.withClear = true;
    host.placeholder = 'Add a tag';
    host.label = 'Topics';
    host.hint = 'Press Enter';
    host.withLabel = true;
    host.withHint = true;
    host.size = 'l';
    host.appearance = 'filled outlined';
    host.pill = true;
    host.readonly = true;
    host.required = true;
    host.autocapitalize = 'words';
    host.autocorrect = false;
    host.autocomplete = 'off';
    host.enterkeyhint = 'done';
    host.spellcheck = false;
    host.inputmode = 'text';
    host.name = 'topics';
    host.disabled = true;
    host.form = 'article-form';
    fixture.detectChanges();

    expect(element.getAttribute('delimiter')).toBe(',;');
    expect(element.getAttribute('max-tags')).toBe('8');
    expect(element.getAttribute('min-tags')).toBe('2');
    expect(element.hasAttribute('allow-duplicates')).toBeTrue();
    expect(element.hasAttribute('with-clear')).toBeTrue();
    expect(element.getAttribute('placeholder')).toBe('Add a tag');
    expect(element.getAttribute('label')).toBe('Topics');
    expect(element.getAttribute('hint')).toBe('Press Enter');
    expect(element.hasAttribute('with-label')).toBeTrue();
    expect(element.hasAttribute('with-hint')).toBeTrue();
    expect(element.getAttribute('size')).toBe('l');
    expect(element.getAttribute('appearance')).toBe('filled-outlined');
    expect(element.hasAttribute('pill')).toBeTrue();
    expect(element.hasAttribute('readonly')).toBeTrue();
    expect(element.hasAttribute('required')).toBeTrue();
    expect(element.getAttribute('autocapitalize')).toBe('words');
    expect(element.getAttribute('autocorrect')).toBe('off');
    expect(element.getAttribute('autocomplete')).toBe('off');
    expect(element.getAttribute('enterkeyhint')).toBe('done');
    expect(element.getAttribute('spellcheck')).toBe('false');
    expect(element.getAttribute('inputmode')).toBe('text');
    expect(element.getAttribute('name')).toBe('topics');
    expect(element.hasAttribute('disabled')).toBeTrue();
    expect(element.getAttribute('form')).toBe('article-form');

    host.allowDuplicates = undefined;
    host.readonly = false;
    fixture.detectChanges();
    expect((element as any).allowDuplicates).toBeFalse();
    expect((element as any).readonly).toBeFalse();
    expect(element.hasAttribute('allow-duplicates')).toBeFalse();
    expect(element.hasAttribute('readonly')).toBeFalse();
  });

  it('preserves an empty delimiter so Enter is the only tag separator', () => {
    host.delimiter = '';
    fixture.detectChanges();
    expect(element.getAttribute('delimiter')).toBe('');
  });

  it('assigns validators and the validation target as DOM properties', () => {
    const validators = [{ attribute: 'required' }];
    const target = document.createElement('div');
    host.validators = validators;
    host.validationTarget = target;
    fixture.detectChanges();

    expect((element as any).validators).toBe(validators);
    expect((element as any).validationTarget).toBe(target);
  });

  it('clears property-only bindings when their Angular inputs are cleared', () => {
    host.inputValue = 'draft';
    host.validators = [{ attribute: 'required' }];
    host.validationTarget = document.createElement('div');
    fixture.detectChanges();

    host.inputValue = undefined;
    host.validators = undefined;
    host.validationTarget = undefined;
    fixture.detectChanges();

    expect((element as any).inputValue).toBe('');
    expect((element as any).validators).toEqual([]);
    expect((element as any).validationTarget).toBeUndefined();
  });

  it('forwards the cancelable wa-create event with its detail', () => {
    const event = new CustomEvent<WaTagInputCreateDetail>('wa-create', {
      cancelable: true,
      detail: { inputValue: 'angular' }
    });
    element.dispatchEvent(event);

    expect(host.createEvent).toBe(event);
    host.createEvent?.preventDefault();
    expect(event.defaultPrevented).toBeTrue();
  });

  it('forwards wa-clear and publishes the cleared array', () => {
    const values: string[][] = [];
    directive.valueChange.subscribe(value => values.push(value));
    (element as any).value = [];
    const event = new CustomEvent('wa-clear');
    element.dispatchEvent(event);

    expect(host.clearEvent).toBe(event);
    expect(values).toEqual([[]]);
  });

  it('delegates all documented methods to the custom element', () => {
    (element as any).focus = jasmine.createSpy('focus');
    (element as any).blur = jasmine.createSpy('blur');
    (element as any).setCustomValidity = jasmine.createSpy('setCustomValidity');
    (element as any).formStateRestoreCallback = jasmine.createSpy('formStateRestoreCallback');
    (element as any).resetValidity = jasmine.createSpy('resetValidity');

    directive.focus({ preventScroll: true });
    directive.blur();
    directive.setCustomValidity('Choose another tag');
    directive.formStateRestoreCallback('angular,forms', 'restore');
    directive.resetValidity();

    expect((element as any).focus).toHaveBeenCalledWith({ preventScroll: true });
    expect((element as any).blur).toHaveBeenCalled();
    expect((element as any).setCustomValidity).toHaveBeenCalledWith('Choose another tag');
    expect((element as any).formStateRestoreCallback).toHaveBeenCalledWith('angular,forms', 'restore');
    expect((element as any).resetValidity).toHaveBeenCalled();
  });
});

describe('WaTagInputDirective forms integration', () => {
  let fixture: ComponentFixture<ReactiveHostComponent>;
  let host: ReactiveHostComponent;
  let element: HTMLElement;
  let directive: WaTagInputDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ReactiveHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(ReactiveHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('wa-tag-input');
    directive = fixture.debugElement
      .query(debugElement => debugElement.nativeElement === element)
      .injector.get(WaTagInputDirective);
  });

  it('writes reactive-form values to the live array property without synthetic events', () => {
    const inputSpy = spyOn(directive.waInput, 'emit');
    const changeSpy = spyOn(directive.waChange, 'emit');
    const tags = ['angular', 'web-awesome'];

    host.control.setValue(tags);
    fixture.detectChanges();

    expect((element as any).value).toEqual(tags);
    expect((element as any).value).not.toBe(tags);
    expect(inputSpy).not.toHaveBeenCalled();
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('updates the form model from input and change events', () => {
    (element as any).value = ['one'];
    element.dispatchEvent(new Event('input'));
    expect(host.control.value).toEqual(['one']);

    (element as any).value = ['one', 'two'];
    element.dispatchEvent(new Event('change'));
    expect(host.control.value).toEqual(['one', 'two']);
  });

  it('validates required, minTags, and maxTags constraints', () => {
    host.required = true;
    host.minTags = 2;
    host.maxTags = 3;
    fixture.detectChanges();

    expect(directive.validate({ value: [] } as any)?.['required']).toBeTrue();
    expect(directive.validate({ value: ['one'] } as any)?.['minTags']).toEqual({ minTags: 2, actual: 1 });
    expect(directive.validate({ value: ['one', 'two'] } as any)).toBeNull();
    expect(directive.validate({ value: ['one', 'two', 'three', 'four'] } as any)?.['maxTags'])
      .toEqual({ maxTags: 3, actual: 4 });
  });

  it('does not apply minTags to an optional empty value', () => {
    host.required = false;
    host.minTags = 2;
    fixture.detectChanges();
    expect(directive.validate({ value: [] } as any)).toBeNull();
  });

  it('writes the disabled state to the property and attribute', () => {
    host.control.disable();
    fixture.detectChanges();
    expect((element as any).disabled).toBeTrue();
    expect(element.hasAttribute('disabled')).toBeTrue();

    host.control.enable();
    fixture.detectChanges();
    expect((element as any).disabled).toBeFalse();
    expect(element.hasAttribute('disabled')).toBeFalse();
  });
});
