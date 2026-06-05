import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaTimeInputDirective } from './time-input.directive';

@Component({
  template: `
    <wa-time-input
      [name]="name"
      [value]="value"
      [size]="size"
      [appearance]="appearance"
      [label]="label"
      [hint]="hint"
      [min]="min"
      [max]="max"
      [step]="step"
      [hourFormat]="hourFormat"
      [pill]="pill"
      [required]="required"
      [readonly]="readonly"
      [withClear]="withClear"
      [withNow]="withNow"
      [open]="open"
      [columnWidth]="columnWidth"
      (wa-change)="onChange($event)"
      (wa-clear)="onClear($event)"
    ></wa-time-input>
  `,
  standalone: true,
  imports: [WaTimeInputDirective]
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
  step?: number | 'any' | string;
  hourFormat?: string;
  pill?: boolean | string;
  required?: boolean | string;
  readonly?: boolean | string;
  withClear?: boolean | string;
  withNow?: boolean | string;
  open?: boolean | string;
  columnWidth?: string;

  onChange(_: Event) {}
  onClear(_: Event) {}
}

@Component({
  template: `<wa-time-input [(ngModel)]="model"></wa-time-input>`,
  standalone: true,
  imports: [WaTimeInputDirective, FormsModule]
})
class NgModelHostComponent {
  model = '14:30';
}

describe('WaTimeInputDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let timeElement: HTMLElement;
  let timeDirective: WaTimeInputDirective;

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

    timeElement = hostFixture.nativeElement.querySelector('wa-time-input');
    timeDirective = hostFixture.debugElement.query(sel => sel.nativeElement === timeElement).injector.get(WaTimeInputDirective);
  });

  it('should create the time-input directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(timeElement).toBeTruthy();
    expect(timeDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.name = 'alarm';
    hostComponent.value = '14:30';
    hostComponent.size = 'large';
    hostComponent.appearance = 'filled';
    hostComponent.label = 'Time';
    hostComponent.hint = 'Pick a time';
    hostComponent.min = '08:00';
    hostComponent.max = '18:00';
    hostComponent.hourFormat = '24';
    hostFixture.detectChanges();

    expect(timeElement.getAttribute('name')).toBe('alarm');
    expect(timeElement.getAttribute('value')).toBe('14:30');
    expect(timeElement.getAttribute('size')).toBe('large');
    expect(timeElement.getAttribute('appearance')).toBe('filled');
    expect(timeElement.getAttribute('label')).toBe('Time');
    expect(timeElement.getAttribute('hint')).toBe('Pick a time');
    expect(timeElement.getAttribute('min')).toBe('08:00');
    expect(timeElement.getAttribute('max')).toBe('18:00');
    expect(timeElement.getAttribute('hour-format')).toBe('24');
  });

  it('should set numeric step attribute correctly', () => {
    hostComponent.step = 1;
    hostFixture.detectChanges();
    expect(timeElement.getAttribute('step')).toBe('1');
  });

  it('should support step="any"', () => {
    hostComponent.step = 'any';
    hostFixture.detectChanges();
    expect(timeElement.getAttribute('step')).toBe('any');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.pill = true;
    hostComponent.required = true;
    hostComponent.readonly = true;
    hostComponent.withClear = true;
    hostComponent.withNow = true;
    hostComponent.open = true;
    hostFixture.detectChanges();

    expect(timeElement.hasAttribute('pill')).toBeTrue();
    expect(timeElement.hasAttribute('required')).toBeTrue();
    expect(timeElement.hasAttribute('readonly')).toBeTrue();
    expect(timeElement.hasAttribute('with-clear')).toBeTrue();
    expect(timeElement.hasAttribute('with-now')).toBeTrue();
    expect(timeElement.hasAttribute('open')).toBeTrue();
  });

  it('should set CSS custom properties', () => {
    hostComponent.columnWidth = '4em';
    hostFixture.detectChanges();
    expect(timeElement.style.getPropertyValue('--column-width')).toBe('4em');
  });

  it('should expose the native element', () => {
    expect(timeDirective.nativeElement).toBe(timeElement);
  });

  it('should emit change and clear events', () => {
    spyOn(hostComponent, 'onChange');
    spyOn(hostComponent, 'onClear');

    timeElement.dispatchEvent(new Event('change'));
    timeElement.dispatchEvent(new CustomEvent('wa-clear'));

    expect(hostComponent.onChange).toHaveBeenCalled();
    expect(hostComponent.onClear).toHaveBeenCalled();
  });

  it('should expose show() and hide() methods', () => {
    (timeElement as any).show = jasmine.createSpy('show');
    (timeElement as any).hide = jasmine.createSpy('hide');

    timeDirective.show();
    expect((timeElement as any).show).toHaveBeenCalled();

    timeDirective.hide();
    expect((timeElement as any).hide).toHaveBeenCalled();
  });

  it('should support ngModel binding', async () => {
    const ngModelFixture = TestBed.createComponent(NgModelHostComponent);
    ngModelFixture.detectChanges();
    await ngModelFixture.whenStable();

    const el: HTMLElement = ngModelFixture.nativeElement.querySelector('wa-time-input');
    expect(el.getAttribute('value')).toBe('14:30');
  });

  it('should report required validation error', () => {
    hostComponent.required = true;
    hostFixture.detectChanges();
    const errors = timeDirective.validate({ value: '' } as any);
    expect(errors?.['required']).toBeTrue();
  });
});

