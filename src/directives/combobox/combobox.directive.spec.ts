import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WaComboboxComponent } from './combobox.directive';
import {WaOptionComponent} from '../select';

@Component({
  template: `
    <wa-combobox
      [(ngModel)]="value"
      [label]="label"
      [hint]="hint"
      [placeholder]="placeholder"
      [appearance]="appearance"
      [pill]="pill"
      [withClear]="withClear"
      [disabled]="disabled"
      [multiple]="multiple"
      [size]="size"
      [placement]="placement"
      [required]="required"
      [maxOptionsVisible]="maxOptionsVisible"
      [allowCustomValue]="allowCustomValue"
      (wa-input)="onInput($event)"
      (wa-change)="onChange($event)"
      (wa-focus)="onFocus($event)"
      (wa-blur)="onBlur($event)"
      (wa-clear)="onClear($event)"
    >
      <wa-option value="apple">Apple</wa-option>
      <wa-option value="banana">Banana</wa-option>
      <wa-option value="cherry">Cherry</wa-option>
    </wa-combobox>
  `,
  standalone: true,
  imports: [WaComboboxComponent, FormsModule, WaOptionComponent]
})
class ComboboxHostComponent {
  value?: any;
  label?: string;
  hint?: string;
  placeholder?: string;
  appearance?: string;
  pill?: boolean | string;
  withClear?: boolean | string;
  disabled?: boolean | string;
  multiple?: boolean | string;
  size?: string;
  placement?: string;
  required?: boolean | string;
  maxOptionsVisible?: number | string;
  allowCustomValue?: boolean | string;

  onInput(_: Event) {}
  onChange(_: Event) {}
  onFocus(_: FocusEvent) {}
  onBlur(_: FocusEvent) {}
  onClear(_: CustomEvent) {}
}

describe('WaComboboxComponent', () => {
  let fixture: ComponentFixture<ComboboxHostComponent>;
  let host: ComboboxHostComponent;
  let comboboxEl: HTMLElement;
  let comboboxCmp: WaComboboxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ComboboxHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    comboboxEl = fixture.nativeElement.querySelector('wa-combobox');
    comboboxCmp = fixture.debugElement.query(de => de.nativeElement === comboboxEl).injector.get(WaComboboxComponent);
  });

  it('should create', () => {
    expect(host).toBeTruthy();
    expect(comboboxEl).toBeTruthy();
    expect(comboboxCmp).toBeTruthy();
  });

  it('should set string attributes', () => {
    host.label = 'Pick fruit';
    host.hint = 'Type to filter';
    host.placeholder = 'Search';
    host.appearance = 'filled';
    host.size = 'large';
    host.placement = 'top';
    fixture.detectChanges();

    expect(comboboxEl.getAttribute('label')).toBe('Pick fruit');
    expect(comboboxEl.getAttribute('hint')).toBe('Type to filter');
    expect(comboboxEl.getAttribute('placeholder')).toBe('Search');
    expect(comboboxEl.getAttribute('appearance')).toBe('filled');
    expect(comboboxEl.getAttribute('size')).toBe('large');
    expect(comboboxEl.getAttribute('placement')).toBe('top');
  });

  it('should set boolean attributes', () => {
    host.pill = true;
    host.withClear = '';
    host.disabled = 'true';
    host.multiple = true;
    host.required = true;
    fixture.detectChanges();

    expect(comboboxEl.hasAttribute('pill')).toBeTrue();
    expect(comboboxEl.hasAttribute('with-clear')).toBeTrue();
    expect(comboboxEl.hasAttribute('disabled')).toBeTrue();
    expect(comboboxEl.hasAttribute('multiple')).toBeTrue();
    expect(comboboxEl.hasAttribute('required')).toBeTrue();
  });

  it('should set numeric attributes', () => {
    host.maxOptionsVisible = 2;
    fixture.detectChanges();
    expect(comboboxEl.getAttribute('max-options-visible')).toBe('2');
  });

  it('should support ControlValueAccessor for single value', () => {
    comboboxCmp.writeValue('apple');
    expect(comboboxEl.getAttribute('value')).toBe('apple');
  });

  it('should support ControlValueAccessor for multiple values', () => {
    host.multiple = true;
    fixture.detectChanges();

    comboboxCmp.writeValue(['apple', 'banana']);
    expect(comboboxEl.getAttribute('value')).toBe('apple banana');
  });

  it('should call onChange when value changes', () => {
    const spy = spyOn<any>(comboboxCmp, 'onChange');
    (comboboxEl as any).value = 'banana';
    comboboxEl.dispatchEvent(new Event('wa-change'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit events', () => {
    spyOn(host, 'onInput');
    spyOn(host, 'onChange');
    spyOn(host, 'onFocus');
    spyOn(host, 'onBlur');
    spyOn(host, 'onClear');

    const events = [
      new Event('wa-input'),
      new Event('wa-change'),
      new FocusEvent('wa-focus'),
      new FocusEvent('wa-blur'),
      new CustomEvent('wa-clear')
    ];

    events.forEach(event => comboboxEl.dispatchEvent(event));
    fixture.detectChanges();

    expect(host.onInput).toHaveBeenCalled();
    expect(host.onChange).toHaveBeenCalled();
    expect(host.onFocus).toHaveBeenCalled();
    expect(host.onBlur).toHaveBeenCalled();
    expect(host.onClear).toHaveBeenCalled();
  });
});

