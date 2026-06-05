import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaDatePickerDirective } from './date-picker.directive';

@Component({
  template: `
    <wa-date-picker
      [mode]="mode"
      [value]="value"
      [min]="min"
      [max]="max"
      [view]="view"
      [months]="months"
      [weekdayFormat]="weekdayFormat"
      [size]="size"
      [withOutsideDays]="withOutsideDays"
      [withWeekNumbers]="withWeekNumbers"
      [readonly]="readonly"
      (wa-change)="onChange($event)"
      (wa-view-change)="onViewChange($event)"
    ></wa-date-picker>
  `,
  standalone: true,
  imports: [WaDatePickerDirective]
})
class TestHostComponent {
  mode?: string;
  value?: string;
  min?: string;
  max?: string;
  view?: string;
  months?: number | string;
  weekdayFormat?: string;
  size?: string;
  withOutsideDays?: boolean | string;
  withWeekNumbers?: boolean | string;
  readonly?: boolean | string;

  onChange(_: Event) {}
  onViewChange(_: Event) {}
}

@Component({
  template: `<wa-date-picker [(ngModel)]="model"></wa-date-picker>`,
  standalone: true,
  imports: [WaDatePickerDirective, FormsModule]
})
class NgModelHostComponent {
  model = '2026-05-25';
}

describe('WaDatePickerDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;
  let directive: WaDatePickerDirective;

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

    element = hostFixture.nativeElement.querySelector('wa-date-picker');
    directive = hostFixture.debugElement.query(sel => sel.nativeElement === element).injector.get(WaDatePickerDirective);
  });

  it('should create the date-picker directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(element).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.mode = 'range';
    hostComponent.value = '2026-05-25';
    hostComponent.min = '2020-01-01';
    hostComponent.max = '2030-12-31';
    hostComponent.view = 'days';
    hostComponent.weekdayFormat = 'long';
    hostComponent.size = 'large';
    hostFixture.detectChanges();

    expect(element.getAttribute('mode')).toBe('range');
    expect(element.getAttribute('value')).toBe('2026-05-25');
    expect(element.getAttribute('min')).toBe('2020-01-01');
    expect(element.getAttribute('max')).toBe('2030-12-31');
    expect(element.getAttribute('view')).toBe('days');
    expect(element.getAttribute('weekday-format')).toBe('long');
    expect(element.getAttribute('size')).toBe('large');
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.months = 2;
    hostFixture.detectChanges();
    expect(element.getAttribute('months')).toBe('2');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.withOutsideDays = true;
    hostComponent.withWeekNumbers = true;
    hostComponent.readonly = true;
    hostFixture.detectChanges();

    expect(element.hasAttribute('with-outside-days')).toBeTrue();
    expect(element.hasAttribute('with-week-numbers')).toBeTrue();
    expect(element.hasAttribute('readonly')).toBeTrue();
  });

  it('should expose the native element', () => {
    expect(directive.nativeElement).toBe(element);
  });

  it('should emit change and view-change events', () => {
    spyOn(hostComponent, 'onChange');
    spyOn(hostComponent, 'onViewChange');

    element.dispatchEvent(new Event('change'));
    element.dispatchEvent(new CustomEvent('wa-view-change'));

    expect(hostComponent.onChange).toHaveBeenCalled();
    expect(hostComponent.onViewChange).toHaveBeenCalled();
  });

  it('should expose goToDate(), goToToday(), and clear() methods', () => {
    (element as any).goToDate = jasmine.createSpy('goToDate');
    (element as any).goToToday = jasmine.createSpy('goToToday');
    (element as any).clear = jasmine.createSpy('clear');

    directive.goToDate('2026-05-25');
    expect((element as any).goToDate).toHaveBeenCalledWith('2026-05-25');

    directive.goToToday();
    expect((element as any).goToToday).toHaveBeenCalled();

    directive.clear();
    expect((element as any).clear).toHaveBeenCalled();
  });

  it('should support ngModel binding', async () => {
    const ngModelFixture = TestBed.createComponent(NgModelHostComponent);
    ngModelFixture.detectChanges();
    await ngModelFixture.whenStable();

    const el: HTMLElement = ngModelFixture.nativeElement.querySelector('wa-date-picker');
    expect(el.getAttribute('value')).toBe('2026-05-25');
  });
});

