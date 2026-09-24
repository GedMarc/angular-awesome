import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WaDateInputDirective } from './date-input/date-input.directive';
import { WaDatePickerDirective } from './date-picker/date-picker.directive';
import { WaFileInputDirective } from './file-input/file-input.directive';
import { WaKnownDateDirective } from './known-date/known-date.directive';
import { WaSliderDirective } from './slider/slider.directive';
import { WaTimeInputDirective } from './time-input/time-input.directive';

@Component({
  standalone: true,
  imports: [FormsModule, WaDateInputDirective, WaDatePickerDirective, WaKnownDateDirective, WaTimeInputDirective, WaSliderDirective, WaFileInputDirective],
  template: `
    <wa-date-input [(ngModel)]="dateInput"></wa-date-input>
    <wa-date-picker [(ngModel)]="datePicker"></wa-date-picker>
    <wa-known-date [(ngModel)]="knownDate"></wa-known-date>
    <wa-time-input [(ngModel)]="timeInput"></wa-time-input>
    <wa-slider [(ngModel)]="slider"></wa-slider>
    <wa-file-input [(ngModel)]="files"></wa-file-input>
  `
})
class FormAccessorRegressionHost {
  dateInput = '';
  datePicker = '';
  knownDate = '';
  timeInput = '';
  slider: number | null = null;
  files: FileList | null = null;
}

describe('form accessor regressions', () => {
  let fixture: ComponentFixture<FormAccessorRegressionHost>;
  let host: FormAccessorRegressionHost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FormAccessorRegressionHost] }).compileComponents();
    fixture = TestBed.createComponent(FormAccessorRegressionHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateFromWaChange(selector: string, value: string): void {
    const element = fixture.nativeElement.querySelector(selector) as HTMLElement & { value: string };
    element.value = value;
    element.dispatchEvent(new Event('wa-change'));
    fixture.detectChanges();
  }

  it('updates every date/time model from wa-change', () => {
    updateFromWaChange('wa-date-input', '2026-09-04');
    updateFromWaChange('wa-date-picker', '2026-09-05');
    updateFromWaChange('wa-known-date', '2026-09-06');
    updateFromWaChange('wa-time-input', '14:30');

    expect(host.dateInput).toBe('2026-09-04');
    expect(host.datePicker).toBe('2026-09-05');
    expect(host.knownDate).toBe('2026-09-06');
    expect(host.timeInput).toBe('14:30');
  });

  it('updates the slider model from wa-change', () => {
    updateFromWaChange('wa-slider', '42');
    expect(host.slider).toBe(42);
  });

  it('propagates the selected FileList without attempting to write it', () => {
    const element = fixture.nativeElement.querySelector('wa-file-input') as HTMLElement & { files: FileList };
    const files = { length: 1, item: () => null } as unknown as FileList;
    Object.defineProperty(element, 'files', { configurable: true, value: files });

    element.dispatchEvent(new Event('wa-change'));
    fixture.detectChanges();

    expect(host.files).toBe(files);
  });
});
