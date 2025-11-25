import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { WaColorPickerDirective } from './color-picker.directive';

@Component({
  template: `
    <form #f="ngForm">
      <wa-color-picker
        name="fav"
        [(ngModel)]="color"
        [required]="required"
        [pattern]="pattern"
      ></wa-color-picker>
    </form>
    <div id="valid">{{ f.valid }}</div>
    <div id="invalid">{{ f.invalid }}</div>
    <div id="dirty">{{ f.dirty }}</div>
    <div id="pristine">{{ f.pristine }}</div>
    <div id="touched">{{ f.touched }}</div>
    <div id="untouched">{{ f.untouched }}</div>
  `,
  standalone: true,
  imports: [WaColorPickerDirective, FormsModule]
})
class FormsHostComponent {
  @ViewChild('f', { static: true }) form!: NgForm;
  color: string | null = null;
  required = true;
  // Simple hex color pattern (e.g., #abc or #aabbcc)
  pattern: string | RegExp = '#(?:[0-9a-fA-F]{3}){1,2}';
}

describe('wa-color-picker Angular forms integration', () => {
  let fixture: ComponentFixture<FormsHostComponent>;
  let component: FormsHostComponent;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      } as any;
    }

    await TestBed.configureTestingModule({
      imports: [FormsHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormsHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nativeEl = fixture.nativeElement.querySelector('wa-color-picker');
  });

  it('should start invalid due to required with null model', () => {
    expect(component.form.invalid).toBeTrue();
    const control = component.form.controls['fav'];
    expect(control?.errors?.['required']).toBeTrue();
  });

  it('should become dirty when user-like input changes value', () => {
    const control = component.form.controls['fav'];
    expect(control?.pristine).toBeTrue();

    nativeEl.setAttribute('value', '#abc');
    nativeEl.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(control?.dirty).toBeTrue();
    expect(control?.pristine).toBeFalse();
  });

  it('should validate required and pattern correctly', () => {
    const control = component.form.controls['fav'];

    // Provide an invalid value for the pattern
    nativeEl.setAttribute('value', 'not-a-color');
    nativeEl.dispatchEvent(new Event('change', { bubbles: true }));
    fixture.detectChanges();

    expect(control?.errors?.['pattern']).toBeTruthy();

    // Provide a valid hex value
    nativeEl.setAttribute('value', '#a1b2c3');
    nativeEl.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(control?.errors).toBeNull();
    expect(control?.valid).toBeTrue();
  });

  it('should mark control as touched on blurNative', () => {
    const control = component.form.controls['fav'];
    expect(control?.touched).toBeFalse();

    nativeEl.dispatchEvent(new Event('blurNative', { bubbles: true }));
    fixture.detectChanges();

    expect(control?.touched).toBeTrue();
  });
});
