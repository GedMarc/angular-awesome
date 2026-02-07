import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaFormatBytesDirective } from './format-bytes.directive';

// Create a test host component to test the format-bytes directive
@Component({
  template: `
    <wa-format-bytes
      [(ngModel)]="value"
      [unit]="unit"
      [display]="display"
      [lang]="lang"
    ></wa-format-bytes>
  `,
  standalone: true,
  imports: [WaFormatBytesDirective, FormsModule]
})
class TestHostComponent {
  value?: number;
  unit?: 'byte' | 'bit';
  display?: 'long' | 'short' | 'narrow';
  lang?: string;
}

describe('WaFormatBytesDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let formatBytesElement: HTMLElement;
  let formatBytesDirective: WaFormatBytesDirective;

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

    // Get the wa-format-bytes element
    formatBytesElement = hostFixture.nativeElement.querySelector('wa-format-bytes');
    formatBytesDirective = hostFixture.debugElement.query(sel => sel.nativeElement === formatBytesElement).injector.get(WaFormatBytesDirective);
  });

  it('should create the format-bytes directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(formatBytesElement).toBeTruthy();
    expect(formatBytesDirective).toBeTruthy();
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.value = 1024;
    hostFixture.detectChanges();

    expect(formatBytesElement.getAttribute('value')).toBe('1024');
  });

  it('should set string attributes correctly', () => {
    hostComponent.unit = 'bit';
    hostComponent.display = 'long';
    hostComponent.lang = 'fr';
    hostFixture.detectChanges();

    expect(formatBytesElement.getAttribute('unit')).toBe('bit');
    expect(formatBytesElement.getAttribute('display')).toBe('long');
    expect(formatBytesElement.getAttribute('lang')).toBe('fr');
  });

  it('should handle ngModel binding', () => {
    // Set the value via ngModel
    hostComponent.value = 2048;
    hostFixture.detectChanges();

    expect(formatBytesElement.getAttribute('value')).toBe('2048');

    // Update the value
    hostComponent.value = 4096;
    hostFixture.detectChanges();

    expect(formatBytesElement.getAttribute('value')).toBe('4096');
  });

  it('should expose the native element', () => {
    expect(formatBytesDirective.nativeElement).toBe(formatBytesElement);
  });

  it('should handle disabled state', () => {
    // Test setDisabledState from ControlValueAccessor
    formatBytesDirective.setDisabledState(true);
    expect(formatBytesElement.getAttribute('disabled')).toBe('true');

    formatBytesDirective.setDisabledState(false);
    expect(formatBytesElement.getAttribute('disabled')).toBe('false');
  });

  it('should handle different unit values', () => {
    const units = ['byte', 'bit'];

    units.forEach(unit => {
      hostComponent.unit = unit as any;
      hostFixture.detectChanges();
      expect(formatBytesElement.getAttribute('unit')).toBe(unit);
    });
  });

  it('should handle different display values', () => {
    const displays = ['long', 'short', 'narrow'];

    displays.forEach(display => {
      hostComponent.display = display as any;
      hostFixture.detectChanges();
      expect(formatBytesElement.getAttribute('display')).toBe(display);
    });
  });
});
