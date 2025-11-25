import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WaColorPickerDirective } from './color-picker.directive';

@Component({
  template: `
    <wa-color-picker
      name="dynamic"
      [(ngModel)]="color"
      [format]="format"
    ></wa-color-picker>
    <div id="model">{{ color }}</div>
    <div id="format">{{ format }}</div>
  `,
  standalone: true,
  imports: [WaColorPickerDirective, FormsModule]
})
class DynamicFormatHostComponent {
  color: string | null = '#ff00ff';
  get format(): string {
    const v = this.color || '';
    return v.startsWith('#') ? 'hex' : v.startsWith('rgb') ? 'rgb' : v.startsWith('hsl') ? 'hsl' : v.startsWith('hsv') ? 'hsv' : 'hex';
  }
}

describe('wa-color-picker dynamic [format] with [(ngModel)]', () => {
  let fixture: ComponentFixture<DynamicFormatHostComponent>;
  let component: DynamicFormatHostComponent;
  let nativeEl: HTMLElement & { value?: any };

  beforeEach(async () => {
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      } as any;
    }

    await TestBed.configureTestingModule({
      imports: [DynamicFormatHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormatHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nativeEl = fixture.nativeElement.querySelector('wa-color-picker');
  });

  it('should apply initial format derived from model', () => {
    expect(component.color).toBe('#ff00ff');
    expect(nativeEl.getAttribute('format')).toBe('hex');
  });

  it('should update format attribute when model changes to rgb string', async () => {
    component.color = 'rgb(10, 20, 30)';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(nativeEl.getAttribute('format')).toBe('rgb');
    // and the value attribute should reflect the model (CVA write)
    expect(nativeEl.getAttribute('value')).toBe('rgb(10, 20, 30)');
  });

  it('should re-derive format after user/input changes update the model', async () => {
    // Simulate the WC reflecting a new hex value, then firing input
    nativeEl.setAttribute('value', '#123456');
    nativeEl.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    // Angular model should be updated
    expect(component.color).toBe('#123456');
    // The computed [format] should have been re-applied by ngOnChanges
    fixture.detectChanges();
    expect(nativeEl.getAttribute('format')).toBe('hex');
  });
});
