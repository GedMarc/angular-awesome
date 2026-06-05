import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaKnownDateDirective } from './known-date.directive';

@Component({
  template: `
    <wa-known-date
      [name]="name"
      [value]="value"
      [size]="size"
      [appearance]="appearance"
      [label]="label"
      [hint]="hint"
      [min]="min"
      [max]="max"
      [locale]="locale"
      [pill]="pill"
      [required]="required"
      [readonly]="readonly"
      (wa-change)="onChange($event)"
    ></wa-known-date>
  `,
  standalone: true,
  imports: [WaKnownDateDirective]
})
class TestHostComponent {
  name?: string;
  value?: string;
  size?: string;
  appearance?: string;
  label?: string;
  hint?: string;
  min?: string;
  max?: string;
  locale?: string;
  pill?: boolean | string;
  required?: boolean | string;
  readonly?: boolean | string;

  onChange(_: Event) {}
}

@Component({
  template: `<wa-known-date [(ngModel)]="model"></wa-known-date>`,
  standalone: true,
  imports: [WaKnownDateDirective, FormsModule]
})
class NgModelHostComponent {
  model = '1990-04-12';
}

describe('WaKnownDateDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;
  let directive: WaKnownDateDirective;

  beforeEach(async () => {
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NgModelHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    element = hostFixture.nativeElement.querySelector('wa-known-date');
    directive = hostFixture.debugElement.query(sel => sel.nativeElement === element).injector.get(WaKnownDateDirective);
  });

  it('should create the known-date directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(element).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.name = 'dob';
    hostComponent.value = '1990-04-12';
    hostComponent.size = 'large';
    hostComponent.appearance = 'filled';
    hostComponent.label = 'Birthday';
    hostComponent.hint = 'Enter your birthday';
    hostComponent.min = '1900-01-01';
    hostComponent.max = '2030-12-31';
    hostComponent.locale = 'en-GB';
    hostFixture.detectChanges();

    expect(element.getAttribute('name')).toBe('dob');
    expect(element.getAttribute('value')).toBe('1990-04-12');
    expect(element.getAttribute('size')).toBe('large');
    expect(element.getAttribute('appearance')).toBe('filled');
    expect(element.getAttribute('label')).toBe('Birthday');
    expect(element.getAttribute('hint')).toBe('Enter your birthday');
    expect(element.getAttribute('min')).toBe('1900-01-01');
    expect(element.getAttribute('max')).toBe('2030-12-31');
    expect(element.getAttribute('locale')).toBe('en-GB');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.pill = true;
    hostComponent.required = true;
    hostComponent.readonly = true;
    hostFixture.detectChanges();

    expect(element.hasAttribute('pill')).toBeTrue();
    expect(element.hasAttribute('required')).toBeTrue();
    expect(element.hasAttribute('readonly')).toBeTrue();
  });

  it('should expose the native element', () => {
    expect(directive.nativeElement).toBe(element);
  });

  it('should emit change events', () => {
    spyOn(hostComponent, 'onChange');
    element.dispatchEvent(new Event('change'));
    expect(hostComponent.onChange).toHaveBeenCalled();
  });

  it('should expose focus() and blur() methods', () => {
    (element as any).focus = jasmine.createSpy('focus');
    (element as any).blur = jasmine.createSpy('blur');

    directive.focus();
    expect((element as any).focus).toHaveBeenCalled();

    directive.blur();
    expect((element as any).blur).toHaveBeenCalled();
  });

  it('should support ngModel binding', async () => {
    const ngModelFixture = TestBed.createComponent(NgModelHostComponent);
    ngModelFixture.detectChanges();
    await ngModelFixture.whenStable();

    const el: HTMLElement = ngModelFixture.nativeElement.querySelector('wa-known-date');
    expect(el.getAttribute('value')).toBe('1990-04-12');
  });

  it('should report required validation error', () => {
    hostComponent.required = true;
    hostFixture.detectChanges();
    const errors = directive.validate({ value: '' } as any);
    expect(errors?.['required']).toBeTrue();
  });
});

