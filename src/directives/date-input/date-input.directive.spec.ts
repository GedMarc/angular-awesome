import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaDateInputDirective } from './date-input.directive';

@Component({
  template: `
    <wa-date-input
      [name]="name"
      [value]="value"
      [size]="size"
      [appearance]="appearance"
      [label]="label"
      [hint]="hint"
      [mode]="mode"
      [min]="min"
      [max]="max"
      [pill]="pill"
      [required]="required"
      [readonly]="readonly"
      [withClear]="withClear"
      [open]="open"
      [months]="months"
      [showDuration]="showDuration"
      (wa-change)="onChange($event)"
      (wa-clear)="onClear($event)"
    ></wa-date-input>
  `,
  standalone: true,
  imports: [WaDateInputDirective]
})
class TestHostComponent {
  name?: string;
  value?: string;
  size?: string;
  appearance?: string;
  label?: string;
  hint?: string;
  mode?: string;
  min?: string;
  max?: string;
  pill?: boolean | string;
  required?: boolean | string;
  readonly?: boolean | string;
  withClear?: boolean | string;
  open?: boolean | string;
  months?: number | string;
  showDuration?: string;

  onChange(_: Event) {}
  onClear(_: Event) {}
}

@Component({
  template: `<wa-date-input [(ngModel)]="model"></wa-date-input>`,
  standalone: true,
  imports: [WaDateInputDirective, FormsModule]
})
class NgModelHostComponent {
  model = '2026-05-25';
}

describe('WaDateInputDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let dateElement: HTMLElement;
  let dateDirective: WaDateInputDirective;

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

    dateElement = hostFixture.nativeElement.querySelector('wa-date-input');
    dateDirective = hostFixture.debugElement.query(sel => sel.nativeElement === dateElement).injector.get(WaDateInputDirective);
  });

  it('should create the date-input directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(dateElement).toBeTruthy();
    expect(dateDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.name = 'birthday';
    hostComponent.value = '2026-05-25';
    hostComponent.size = 'large';
    hostComponent.appearance = 'filled';
    hostComponent.label = 'Date';
    hostComponent.hint = 'Pick a date';
    hostComponent.mode = 'single';
    hostComponent.min = '2020-01-01';
    hostComponent.max = '2030-12-31';
    hostFixture.detectChanges();

    expect(dateElement.getAttribute('name')).toBe('birthday');
    expect(dateElement.getAttribute('value')).toBe('2026-05-25');
    expect(dateElement.getAttribute('size')).toBe('large');
    expect(dateElement.getAttribute('appearance')).toBe('filled');
    expect(dateElement.getAttribute('label')).toBe('Date');
    expect(dateElement.getAttribute('hint')).toBe('Pick a date');
    expect(dateElement.getAttribute('mode')).toBe('single');
    expect(dateElement.getAttribute('min')).toBe('2020-01-01');
    expect(dateElement.getAttribute('max')).toBe('2030-12-31');
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.months = 2;
    hostFixture.detectChanges();
    expect(dateElement.getAttribute('months')).toBe('2');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.pill = true;
    hostComponent.required = true;
    hostComponent.readonly = true;
    hostComponent.withClear = true;
    hostComponent.open = true;
    hostFixture.detectChanges();

    expect(dateElement.hasAttribute('pill')).toBeTrue();
    expect(dateElement.hasAttribute('required')).toBeTrue();
    expect(dateElement.hasAttribute('readonly')).toBeTrue();
    expect(dateElement.hasAttribute('with-clear')).toBeTrue();
    expect(dateElement.hasAttribute('open')).toBeTrue();
  });

  it('should set CSS custom properties', () => {
    hostComponent.showDuration = '200ms';
    hostFixture.detectChanges();
    expect(dateElement.style.getPropertyValue('--show-duration')).toBe('200ms');
  });

  it('should expose the native element', () => {
    expect(dateDirective.nativeElement).toBe(dateElement);
  });

  it('should emit change and clear events', () => {
    spyOn(hostComponent, 'onChange');
    spyOn(hostComponent, 'onClear');

    dateElement.dispatchEvent(new Event('change'));
    dateElement.dispatchEvent(new CustomEvent('wa-clear'));

    expect(hostComponent.onChange).toHaveBeenCalled();
    expect(hostComponent.onClear).toHaveBeenCalled();
  });

  it('should expose show(), hide(), and clear() methods', () => {
    (dateElement as any).show = jasmine.createSpy('show');
    (dateElement as any).hide = jasmine.createSpy('hide');
    (dateElement as any).clear = jasmine.createSpy('clear');

    dateDirective.show();
    expect((dateElement as any).show).toHaveBeenCalled();

    dateDirective.hide();
    expect((dateElement as any).hide).toHaveBeenCalled();

    dateDirective.clear();
    expect((dateElement as any).clear).toHaveBeenCalled();
  });

  it('should support ngModel binding', async () => {
    const ngModelFixture = TestBed.createComponent(NgModelHostComponent);
    ngModelFixture.detectChanges();
    await ngModelFixture.whenStable();

    const el: HTMLElement = ngModelFixture.nativeElement.querySelector('wa-date-input');
    expect(el.getAttribute('value')).toBe('2026-05-25');
  });

  it('should report required validation error through ngModel', async () => {
    hostComponent.required = true;
    hostFixture.detectChanges();
    const errors = dateDirective.validate({ value: '' } as any);
    expect(errors?.['required']).toBeTrue();
  });
});

