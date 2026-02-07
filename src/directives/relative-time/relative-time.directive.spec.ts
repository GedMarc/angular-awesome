import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaRelativeTimeDirective } from './relative-time.directive';
import { FormsModule } from '@angular/forms';

// Create a test host component to test the relative time directive
@Component({
  template: `
    <wa-relative-time
      [(ngModel)]="date"
      [format]="format"
      [numeric]="numeric"
      [lang]="lang"
      [sync]="sync"
      [display]="display"
      (focusEvent)="onFocus($event)"
      (blurEvent)="onBlur($event)"
    ></wa-relative-time>
  `,
  standalone: true,
  imports: [WaRelativeTimeDirective, FormsModule]
})
class TestHostComponent {
  date?: string | Date;
  format?: 'long' | 'short' | 'narrow' | string;
  numeric?: 'auto' | 'always' | string;
  lang?: string;
  sync?: boolean | string;
  display?: string;

  onFocus(event: FocusEvent): void {}
  onBlur(event: FocusEvent): void {}
}

describe('WaRelativeTimeDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let relativeTimeElement: HTMLElement;
  let relativeTimeDirective: WaRelativeTimeDirective;

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

    // Get the wa-relative-time element
    relativeTimeElement = hostFixture.nativeElement.querySelector('wa-relative-time');
    relativeTimeDirective = hostFixture.debugElement.query(sel => sel.nativeElement === relativeTimeElement).injector.get(WaRelativeTimeDirective);
  });

  it('should create the relative time directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(relativeTimeElement).toBeTruthy();
    expect(relativeTimeDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.format = 'short';
    hostComponent.numeric = 'auto';
    hostComponent.lang = 'en-US';
    hostFixture.detectChanges();

    expect(relativeTimeElement.getAttribute('format')).toBe('short');
    expect(relativeTimeElement.getAttribute('numeric')).toBe('auto');
    expect(relativeTimeElement.getAttribute('lang')).toBe('en-US');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.sync = true;
    hostFixture.detectChanges();
    expect(relativeTimeElement.hasAttribute('sync')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.sync = false;
    hostFixture.detectChanges();
    expect(relativeTimeElement.hasAttribute('sync')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.sync = 'true';
    hostFixture.detectChanges();
    expect(relativeTimeElement.hasAttribute('sync')).toBeTrue();
  });

  it('should set style attributes correctly', () => {
    hostComponent.display = 'inline-block';
    hostFixture.detectChanges();
    expect(relativeTimeElement.style.getPropertyValue('--display')).toBe('inline-block');
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onFocus');
    spyOn(hostComponent, 'onBlur');

    // Create mock events
    const focusEvent = new FocusEvent('focusNative');
    const blurEvent = new FocusEvent('blurNative');

    // Dispatch events on the native element
    relativeTimeElement.dispatchEvent(focusEvent);
    relativeTimeElement.dispatchEvent(blurEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onFocus).toHaveBeenCalled();
    expect(hostComponent.onBlur).toHaveBeenCalled();
  });

  it('should expose the native element', () => {
    expect(relativeTimeDirective.nativeElement).toBe(relativeTimeElement);
  });

  it('should implement ControlValueAccessor correctly', () => {
    // Test writeValue with string date
    const isoDate = '2023-01-01T12:00:00Z';
    relativeTimeDirective.writeValue(isoDate);
    expect(relativeTimeElement.getAttribute('date')).toBe(isoDate);

    // Test writeValue with Date object
    const dateObj = new Date('2023-02-15T15:30:00Z');
    relativeTimeDirective.writeValue(dateObj);
    expect(relativeTimeElement.getAttribute('date')).toBe(dateObj.toISOString());

    // Test setDisabledState
    relativeTimeDirective.setDisabledState(true);
    expect(relativeTimeElement.hasAttribute('disabled')).toBeTrue();

    relativeTimeDirective.setDisabledState(false);
    expect(relativeTimeElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should handle different format values', () => {
    const formats = ['long', 'short', 'narrow'];

    formats.forEach(format => {
      hostComponent.format = format;
      hostFixture.detectChanges();
      expect(relativeTimeElement.getAttribute('format')).toBe(format);
    });
  });

  it('should handle different numeric values', () => {
    const numericValues = ['auto', 'always'];

    numericValues.forEach(value => {
      hostComponent.numeric = value;
      hostFixture.detectChanges();
      expect(relativeTimeElement.getAttribute('numeric')).toBe(value);
    });
  });
});
