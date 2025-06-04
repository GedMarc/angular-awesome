import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaFormatNumberDirective } from './format-number.directive';

// Create a test host component to test the format-number directive
@Component({
  template: `
    <wa-format-number
      [(ngModel)]="value"
      [type]="type"
      [currency]="currency"
      [currencyDisplay]="currencyDisplay"
      [lang]="lang"
      [noGrouping]="noGrouping"
      [minimumIntegerDigits]="minimumIntegerDigits"
      [minimumFractionDigits]="minimumFractionDigits"
      [maximumFractionDigits]="maximumFractionDigits"
      [minimumSignificantDigits]="minimumSignificantDigits"
      [maximumSignificantDigits]="maximumSignificantDigits"
      [color]="color"
      [fontSize]="fontSize"
      [fontWeight]="fontWeight"
      [display]="display"
      [textAlign]="textAlign"
      [padding]="padding"
    ></wa-format-number>
  `,
  standalone: true,
  imports: [WaFormatNumberDirective, FormsModule]
})
class TestHostComponent {
  value?: number;
  type?: 'currency' | 'decimal' | 'percent';
  currency?: string;
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  lang?: string;
  noGrouping?: boolean | string;
  minimumIntegerDigits?: number | string;
  minimumFractionDigits?: number | string;
  maximumFractionDigits?: number | string;
  minimumSignificantDigits?: number | string;
  maximumSignificantDigits?: number | string;

  // Style properties
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  display?: string;
  textAlign?: string;
  padding?: string;
}

describe('WaFormatNumberDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let formatNumberElement: HTMLElement;
  let formatNumberDirective: WaFormatNumberDirective;

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

    // Get the wa-format-number element
    formatNumberElement = hostFixture.nativeElement.querySelector('wa-format-number');
    formatNumberDirective = hostFixture.debugElement.query(sel => sel.nativeElement === formatNumberElement).injector.get(WaFormatNumberDirective);
  });

  it('should create the format-number directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(formatNumberElement).toBeTruthy();
    expect(formatNumberDirective).toBeTruthy();
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.value = 1234.56;
    hostComponent.minimumIntegerDigits = 2;
    hostComponent.minimumFractionDigits = 2;
    hostComponent.maximumFractionDigits = 4;
    hostComponent.minimumSignificantDigits = 3;
    hostComponent.maximumSignificantDigits = 5;
    hostFixture.detectChanges();

    expect(formatNumberElement.getAttribute('value')).toBe('1234.56');
    expect(formatNumberElement.getAttribute('minimum-integer-digits')).toBe('2');
    expect(formatNumberElement.getAttribute('minimum-fraction-digits')).toBe('2');
    expect(formatNumberElement.getAttribute('maximum-fraction-digits')).toBe('4');
    expect(formatNumberElement.getAttribute('minimum-significant-digits')).toBe('3');
    expect(formatNumberElement.getAttribute('maximum-significant-digits')).toBe('5');
  });

  it('should handle string values for numeric attributes', () => {
    hostComponent.minimumIntegerDigits = '2';
    hostComponent.minimumFractionDigits = '2';
    hostComponent.maximumFractionDigits = '4';
    hostFixture.detectChanges();

    expect(formatNumberElement.getAttribute('minimum-integer-digits')).toBe('2');
    expect(formatNumberElement.getAttribute('minimum-fraction-digits')).toBe('2');
    expect(formatNumberElement.getAttribute('maximum-fraction-digits')).toBe('4');
  });

  it('should set string attributes correctly', () => {
    hostComponent.type = 'currency';
    hostComponent.currency = 'USD';
    hostComponent.currencyDisplay = 'symbol';
    hostComponent.lang = 'en-US';
    hostFixture.detectChanges();

    expect(formatNumberElement.getAttribute('type')).toBe('currency');
    expect(formatNumberElement.getAttribute('currency')).toBe('USD');
    expect(formatNumberElement.getAttribute('currency-display')).toBe('symbol');
    expect(formatNumberElement.getAttribute('lang')).toBe('en-US');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.noGrouping = true;
    hostFixture.detectChanges();

    expect(formatNumberElement.hasAttribute('no-grouping')).toBeTrue();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.noGrouping = 'true';
    hostFixture.detectChanges();

    expect(formatNumberElement.hasAttribute('no-grouping')).toBeTrue();
  });

  it('should set style attributes correctly', () => {
    hostComponent.color = 'red';
    hostComponent.fontSize = '16px';
    hostComponent.fontWeight = 'bold';
    hostComponent.display = 'inline-block';
    hostComponent.textAlign = 'right';
    hostComponent.padding = '10px';
    hostFixture.detectChanges();

    expect(formatNumberElement.style.getPropertyValue('--color')).toBe('red');
    expect(formatNumberElement.style.getPropertyValue('--font-size')).toBe('16px');
    expect(formatNumberElement.style.getPropertyValue('--font-weight')).toBe('bold');
    expect(formatNumberElement.style.getPropertyValue('--display')).toBe('inline-block');
    expect(formatNumberElement.style.getPropertyValue('--text-align')).toBe('right');
    expect(formatNumberElement.style.getPropertyValue('--padding')).toBe('10px');
  });

  it('should handle ngModel binding', () => {
    // Set the value via ngModel
    hostComponent.value = 1234.56;
    hostFixture.detectChanges();

    expect(formatNumberElement.getAttribute('value')).toBe('1234.56');

    // Update the value
    hostComponent.value = 7890.12;
    hostFixture.detectChanges();

    expect(formatNumberElement.getAttribute('value')).toBe('7890.12');
  });

  it('should expose the native element', () => {
    expect(formatNumberDirective.nativeElement).toBe(formatNumberElement);
  });

  it('should handle disabled state', () => {
    // Test setDisabledState from ControlValueAccessor
    formatNumberDirective.setDisabledState(true);
    expect(formatNumberElement.getAttribute('disabled')).toBe('true');

    formatNumberDirective.setDisabledState(false);
    expect(formatNumberElement.getAttribute('disabled')).toBe('false');
  });

  it('should handle different type values', () => {
    const types = ['currency', 'decimal', 'percent'];

    types.forEach(type => {
      hostComponent.type = type as any;
      hostFixture.detectChanges();
      expect(formatNumberElement.getAttribute('type')).toBe(type);
    });
  });

  it('should handle different currencyDisplay values', () => {
    const displays = ['symbol', 'narrowSymbol', 'code', 'name'];

    displays.forEach(display => {
      hostComponent.currencyDisplay = display as any;
      hostFixture.detectChanges();
      expect(formatNumberElement.getAttribute('currency-display')).toBe(display);
    });
  });
});
