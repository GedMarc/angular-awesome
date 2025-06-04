import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaFormatDateDirective } from './format-date.directive';

// Create a test host component to test the format-date directive
@Component({
  template: `
    <wa-format-date
      [(ngModel)]="date"
      [weekday]="weekday"
      [era]="era"
      [year]="year"
      [month]="month"
      [day]="day"
      [hour]="hour"
      [minute]="minute"
      [second]="second"
      [timeZoneName]="timeZoneName"
      [timeZone]="timeZone"
      [hourFormat]="hourFormat"
      [lang]="lang"
      [color]="color"
      [fontSize]="fontSize"
      [fontWeight]="fontWeight"
      [backgroundColor]="backgroundColor"
      [padding]="padding"
      [margin]="margin"
      [display]="display"
    ></wa-format-date>
  `,
  standalone: true,
  imports: [WaFormatDateDirective, FormsModule]
})
class TestHostComponent {
  date?: Date | string;
  weekday?: 'narrow' | 'short' | 'long';
  era?: 'narrow' | 'short' | 'long';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'short' | 'long';
  timeZone?: string;
  hourFormat?: 'auto' | '12' | '24';
  lang?: string;

  // Style properties
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  display?: string;
}

describe('WaFormatDateDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let formatDateElement: HTMLElement;
  let formatDateDirective: WaFormatDateDirective;

  beforeEach(async () => {
    // Mock the customElements API
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

    // Get the wa-format-date element
    formatDateElement = hostFixture.nativeElement.querySelector('wa-format-date');
    formatDateDirective = hostFixture.debugElement.query(sel => sel.nativeElement === formatDateElement).injector.get(WaFormatDateDirective);
  });

  it('should create the format-date directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(formatDateElement).toBeTruthy();
    expect(formatDateDirective).toBeTruthy();
  });

  it('should set date attribute correctly with Date object', () => {
    const testDate = new Date('2023-01-15T12:30:00Z');
    hostComponent.date = testDate;
    hostFixture.detectChanges();

    expect(formatDateElement.getAttribute('date')).toBe(testDate.toISOString());
  });

  it('should set date attribute correctly with string', () => {
    const testDateString = '2023-01-15T12:30:00Z';
    hostComponent.date = testDateString;
    hostFixture.detectChanges();

    expect(formatDateElement.getAttribute('date')).toBe(testDateString);
  });

  it('should set format attributes correctly', () => {
    hostComponent.weekday = 'long';
    hostComponent.era = 'short';
    hostComponent.year = 'numeric';
    hostComponent.month = 'long';
    hostComponent.day = '2-digit';
    hostComponent.hour = 'numeric';
    hostComponent.minute = '2-digit';
    hostComponent.second = 'numeric';
    hostComponent.timeZoneName = 'short';
    hostComponent.timeZone = 'America/New_York';
    hostComponent.hourFormat = '12';
    hostComponent.lang = 'fr';
    hostFixture.detectChanges();

    expect(formatDateElement.getAttribute('weekday')).toBe('long');
    expect(formatDateElement.getAttribute('era')).toBe('short');
    expect(formatDateElement.getAttribute('year')).toBe('numeric');
    expect(formatDateElement.getAttribute('month')).toBe('long');
    expect(formatDateElement.getAttribute('day')).toBe('2-digit');
    expect(formatDateElement.getAttribute('hour')).toBe('numeric');
    expect(formatDateElement.getAttribute('minute')).toBe('2-digit');
    expect(formatDateElement.getAttribute('second')).toBe('numeric');
    expect(formatDateElement.getAttribute('time-zone-name')).toBe('short');
    expect(formatDateElement.getAttribute('time-zone')).toBe('America/New_York');
    expect(formatDateElement.getAttribute('hour-format')).toBe('12');
    expect(formatDateElement.getAttribute('lang')).toBe('fr');
  });

  it('should set style attributes correctly', () => {
    hostComponent.color = 'red';
    hostComponent.fontSize = '16px';
    hostComponent.fontWeight = 'bold';
    hostComponent.backgroundColor = '#f0f0f0';
    hostComponent.padding = '10px';
    hostComponent.margin = '5px';
    hostComponent.display = 'inline-block';
    hostFixture.detectChanges();

    expect(formatDateElement.style.getPropertyValue('--color')).toBe('red');
    expect(formatDateElement.style.getPropertyValue('--font-size')).toBe('16px');
    expect(formatDateElement.style.getPropertyValue('--font-weight')).toBe('bold');
    expect(formatDateElement.style.getPropertyValue('--background-color')).toBe('#f0f0f0');
    expect(formatDateElement.style.getPropertyValue('--padding')).toBe('10px');
    expect(formatDateElement.style.getPropertyValue('--margin')).toBe('5px');
    expect(formatDateElement.style.getPropertyValue('--display')).toBe('inline-block');
  });

  it('should handle ngModel binding', () => {
    // Set the date via ngModel
    const testDate = new Date('2023-01-15T12:30:00Z');
    hostComponent.date = testDate;
    hostFixture.detectChanges();

    expect(formatDateElement.getAttribute('date')).toBe(testDate.toISOString());

    // Update the date
    const newDate = new Date('2023-02-20T15:45:00Z');
    hostComponent.date = newDate;
    hostFixture.detectChanges();

    expect(formatDateElement.getAttribute('date')).toBe(newDate.toISOString());
  });

  it('should expose the native element', () => {
    expect(formatDateDirective.nativeElement).toBe(formatDateElement);
  });

  it('should handle disabled state', () => {
    // Test setDisabledState from ControlValueAccessor
    formatDateDirective.setDisabledState(true);
    expect(formatDateElement.getAttribute('disabled')).toBe('true');

    formatDateDirective.setDisabledState(false);
    expect(formatDateElement.getAttribute('disabled')).toBe('false');
  });
});
