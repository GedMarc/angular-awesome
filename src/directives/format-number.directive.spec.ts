import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { WaFormatNumberDirective } from './format-number.directive';

// Test component that uses the directive with ngModel
@Component({
  template: `
    <wa-format-number [(ngModel)]="testValue"
           [type]="type"
           [noGrouping]="noGrouping"
           [currency]="currency"
           [currencyDisplay]="currencyDisplay"
           [minimumIntegerDigits]="minimumIntegerDigits"
           [minimumFractionDigits]="minimumFractionDigits"
           [maximumFractionDigits]="maximumFractionDigits"
           [lang]="lang">
    </wa-format-number>
  `,
  standalone: true,
  imports: [FormsModule, WaFormatNumberDirective]
})
class TestComponent {
  testValue: number = 1000;
  type: 'currency' | 'decimal' | 'percent' = 'decimal';
  noGrouping: boolean = false;
  currency: string = 'USD';
  currencyDisplay: 'symbol' | 'narrowSymbol' | 'code' | 'name' = 'symbol';
  minimumIntegerDigits?: number;
  minimumFractionDigits?: number = 2;
  maximumFractionDigits?: number = 2;
  lang: string = 'en';
}

describe('WaFormatNumberDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveEl: DebugElement;
  let directive: WaFormatNumberDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(WaFormatNumberDirective));
    directive = directiveEl.injector.get(WaFormatNumberDirective);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should initialize with the correct values', () => {
    expect(directive.value()).toBe(1000);
    expect(directive.type()).toBe('decimal');
    expect(directive.noGrouping()).toBe(false);
    expect(directive.currency()).toBe('USD');
    expect(directive.currencyDisplay()).toBe('symbol');
    expect(directive.minimumFractionDigits()).toBe(2);
    expect(directive.maximumFractionDigits()).toBe(2);
    expect(directive.lang()).toBe('en');
  });

  it('should update the model when value changes', () => {
    directive.value.set(2000);
    fixture.detectChanges();

    expect(component.testValue).toBe(2000);
  });

  it('should update the directive when model changes', () => {
    component.testValue = 3000;
    fixture.detectChanges();

    expect(directive.value()).toBe(3000);
  });

  it('should handle type changes', () => {
    component.type = 'percent';
    fixture.detectChanges();

    expect(directive.type()).toBe('percent');
  });

  it('should handle noGrouping changes', () => {
    component.noGrouping = true;
    fixture.detectChanges();

    expect(directive.noGrouping()).toBe(true);
  });

  it('should handle currency changes', () => {
    component.currency = 'EUR';
    fixture.detectChanges();

    expect(directive.currency()).toBe('EUR');
  });

  it('should handle currencyDisplay changes', () => {
    component.currencyDisplay = 'code';
    fixture.detectChanges();

    expect(directive.currencyDisplay()).toBe('code');
  });

  it('should handle digit configuration changes', () => {
    component.minimumIntegerDigits = 2;
    component.minimumFractionDigits = 3;
    component.maximumFractionDigits = 4;
    fixture.detectChanges();

    expect(directive.minimumIntegerDigits()).toBe(2);
    expect(directive.minimumFractionDigits()).toBe(3);
    expect(directive.maximumFractionDigits()).toBe(4);
  });

  it('should handle language changes', () => {
    component.lang = 'fr';
    fixture.detectChanges();

    expect(directive.lang()).toBe('fr');
  });
});
