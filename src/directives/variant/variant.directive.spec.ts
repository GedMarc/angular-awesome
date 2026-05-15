import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaVariantDirective } from './variant.directive';

@Component({
  template: `
    <div id="byInput" [waVariant]="variant"></div>
    <div id="byBoolean"
         [waBrand]="brand"
         [waNeutral]="neutral"
         [waSuccess]="success"
         [waWarning]="warning"
         [waDanger]="danger"></div>
  `,
  standalone: true,
  imports: [WaVariantDirective]
})
class TestHostComponent {
  variant: any = null;
  brand = false;
  neutral = false;
  success = false;
  warning = false;
  danger = false;
}

describe('WaVariantDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('applies class by waVariant short tokens', () => {
    host.variant = 'brand';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('#byInput') as HTMLElement;
    expect(el.classList.contains('wa-brand')).toBeTrue();

    host.variant = 'success';
    fixture.detectChanges();
    expect(el.classList.contains('wa-brand')).toBeFalse();
    expect(el.classList.contains('wa-success')).toBeTrue();
  });

  it('accepts full class tokens in waVariant', () => {
    host.variant = 'wa-warning';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('#byInput') as HTMLElement;
    expect(el.classList.contains('wa-warning')).toBeTrue();
  });

  it('applies by boolean shorthands with priority order', () => {
    host.brand = true;
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('#byBoolean') as HTMLElement;
    expect(el.classList.contains('wa-brand')).toBeTrue();

    // Multiple true picks the first in order brand > neutral > success > warning > danger
    host.neutral = true;
    host.success = true;
    fixture.detectChanges();
    expect(el.classList.contains('wa-brand')).toBeTrue();

    // If brand becomes false, falls back to next true (neutral)
    host.brand = false;
    fixture.detectChanges();
    expect(el.classList.contains('wa-neutral')).toBeTrue();
    expect(el.classList.contains('wa-success')).toBeFalse();
  });

  it('waVariant overrides boolean shorthands', () => {
    host.brand = true;
    host.variant = 'danger';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('#byInput') as HTMLElement;
    expect(el.classList.contains('wa-danger')).toBeTrue();
  });
});
