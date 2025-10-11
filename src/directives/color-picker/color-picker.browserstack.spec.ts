import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WaColorPickerDirective } from './color-picker.directive';

// BrowserStack-style spec to validate [(ngModel)] two-way binding for wa-color-picker
@Component({
  template: `
    <wa-color-picker
      name="favColor"
      [(ngModel)]="color"
      (change)="onChange($event)"
      (input)="onInput($event)"
      (waShow)="onShow($event)"
      (waAfterShow)="onAfterShow($event)"
      (waHide)="onHide($event)"
      (waAfterHide)="onAfterHide($event)"
    ></wa-color-picker>
    <div id="model">{{ color }}</div>
  `,
  standalone: true,
  imports: [WaColorPickerDirective, FormsModule]
})
class ColorPickerNgModelHostComponent {
  color: string | null = null;
  show = 0; afterShow = 0; hide = 0; afterHide = 0;
  onChange(_e: Event) {}
  onInput(_e: Event) {}
  onShow(_e: CustomEvent) { this.show++; }
  onAfterShow(_e: CustomEvent) { this.afterShow++; }
  onHide(_e: CustomEvent) { this.hide++; }
  onAfterHide(_e: CustomEvent) { this.afterHide++; }
}

describe('wa-color-picker [(ngModel)] on BrowserStack', () => {
  let fixture: ComponentFixture<ColorPickerNgModelHostComponent>;
  let component: ColorPickerNgModelHostComponent;
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
      imports: [ColorPickerNgModelHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ColorPickerNgModelHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nativeEl = fixture.nativeElement.querySelector('wa-color-picker') as HTMLElement;
  });

  it('should start with null model and no value attribute', () => {
    expect(component.color).toBeNull();
    expect(nativeEl.hasAttribute('value')).toBeFalse();
  });

  it('should update model when native input fires after setting value attribute', () => {
    nativeEl.setAttribute('value', '#ff0000');
    nativeEl.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(component.color).toBe('#ff0000');
  });

  it('should update model when native change fires after setting value property', () => {
    (nativeEl as any).value = '#00ff00';
    nativeEl.setAttribute('value', '#00ff00');
    nativeEl.dispatchEvent(new Event('change', { bubbles: true }));
    fixture.detectChanges();

    expect(component.color).toBe('#00ff00');
  });

  it('should reflect model to attribute when programmatically updated', async () => {
    component.color = '#123456';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(nativeEl.getAttribute('value')).toBe('#123456');
  });

  it('should clear attribute when model becomes null', () => {
    component.color = null;
    fixture.detectChanges();

    expect(nativeEl.hasAttribute('value')).toBeFalse();
  });

  it('should emit popup lifecycle events', () => {
    nativeEl.dispatchEvent(new CustomEvent('wa-show'));
    nativeEl.dispatchEvent(new CustomEvent('wa-after-show'));
    nativeEl.dispatchEvent(new CustomEvent('wa-hide'));
    nativeEl.dispatchEvent(new CustomEvent('wa-after-hide'));
    fixture.detectChanges();

    expect(component.show).toBeGreaterThan(0);
    expect(component.afterShow).toBeGreaterThan(0);
    expect(component.hide).toBeGreaterThan(0);
    expect(component.afterHide).toBeGreaterThan(0);
  });
});
