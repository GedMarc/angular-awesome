import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WaCheckboxDirective } from './checkbox.directive';

// This spec is designed to run both locally and on BrowserStack via Karma.
// It focuses specifically on verifying that [(ngModel)] two-way binding
// updates when the underlying web component emits native 'change'/'input'.

@Component({
  template: `
    <wa-checkbox
      waCheckbox
      name="accept"
      [(ngModel)]="isChecked"
      (change)="onChange($event)"
      (input)="onInput($event)"
    >Accept terms</wa-checkbox>
    <div id="model">{{ isChecked }}</div>
  `,
  standalone: true,
  imports: [WaCheckboxDirective, FormsModule]
})
class CheckboxNgModelHostComponent {
  isChecked = false;
  onChange(_e: Event) {}
  onInput(_e: Event) {}
}

describe('wa-checkbox [(ngModel)] on BrowserStack', () => {
  let fixture: ComponentFixture<CheckboxNgModelHostComponent>;
  let component: CheckboxNgModelHostComponent;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    // Ensure customElements API exists in the test environment
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      } as any;
    }

    await TestBed.configureTestingModule({
      imports: [CheckboxNgModelHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxNgModelHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nativeEl = fixture.nativeElement.querySelector('wa-checkbox') as HTMLElement;
  });

  it('should start unchecked (model false, no checked attribute)', () => {
    expect(component.isChecked).toBeFalse();
    expect(nativeEl.hasAttribute('checked')).toBeFalse();
  });

  it('should update model to true when native change fires after checking', () => {
    // Simulate user action: set checked property/attribute then dispatch change
    (nativeEl as any).checked = true;
    nativeEl.setAttribute('checked', '');
    nativeEl.dispatchEvent(new Event('change', { bubbles: true }));
    fixture.detectChanges();

    expect(component.isChecked).toBeTrue();
  });

  it('should update model to true when native input fires after checking', () => {
    component.isChecked = false;
    fixture.detectChanges();

    (nativeEl as any).checked = true;
    nativeEl.setAttribute('checked', '');
    nativeEl.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(component.isChecked).toBeTrue();
  });

  it('should update model to false when unchecked and change fires', () => {
    // Start in checked state
    component.isChecked = true;
    fixture.detectChanges();

    // Simulate unchecking
    (nativeEl as any).checked = false;
    nativeEl.removeAttribute('checked');
    nativeEl.dispatchEvent(new Event('change', { bubbles: true }));
    fixture.detectChanges();

    expect(component.isChecked).toBeFalse();
  });
});
