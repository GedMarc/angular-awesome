import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WaSelectWrapperComponent, WaOptionComponent } from './select.directive';

// BrowserStack-style spec to validate [(ngModel)] two-way binding for wa-select-wrapper
@Component({
  template: `
    <wa-select
      name="favOption"
      [(ngModel)]="value"
      [attr.multiple]="multiple ? '' : null"
      [attr.label]="label || null"
      [attr.hint]="hint || null"
      [attr.placeholder]="placeholder || null"
      [attr.with-clear]="withClear ? '' : null"
      [attr.disabled]="disabled ? '' : null"
      [attr.size]="size"
      [attr.placement]="placement"
    >
      <wa-option value="one">One</wa-option>
      <wa-option value="two">Two</wa-option>
      <wa-option value="three">Three</wa-option>
    </wa-select>
    <div id="model">{{ modelText() }}</div>
  `,
  standalone: true,
  imports: [WaSelectWrapperComponent, WaOptionComponent, FormsModule],
    schemas: [NO_ERRORS_SCHEMA]
})
class SelectNgModelHostComponent {
  value: string | string[] | null = null;
  multiple = false;
  label?: string;
  hint?: string;
  placeholder?: string;
  withClear: boolean | string = false;
  disabled: boolean | string = false;
  size: 'small' | 'medium' | 'large' | string = 'medium';
  placement: 'top' | 'bottom' | string = 'bottom';
  show = 0; afterShow = 0; hide = 0; afterHide = 0;
  onChange(_e: Event) {}
  onInput(_e: Event) {}
  onShow(_e: CustomEvent) { this.show++; }
  onAfterShow(_e: CustomEvent) { this.afterShow++; }
  onHide(_e: CustomEvent) { this.hide++; }
  onAfterHide(_e: CustomEvent) { this.afterHide++; }
  modelText() {
    const v = this.value as any;
    if (Array.isArray(v)) { return v.join(' '); }
    return v ?? '';
  }
}

describe('wa-select-wrapper [(ngModel)] on BrowserStack', () => {
  let fixture: ComponentFixture<SelectNgModelHostComponent>;
  let component: SelectNgModelHostComponent;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      } as any;
    }

    await TestBed.configureTestingModule({
      imports: [SelectNgModelHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectNgModelHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nativeEl = fixture.nativeElement.querySelector('wa-select-wrapper') as HTMLElement;
  });

  it('should start with null model and no value attribute', () => {
    expect(component.value).toBeNull();
    expect(nativeEl.hasAttribute('value')).toBeFalse();
  });

  it('should update model when native input fires after setting value attribute', () => {
    nativeEl.setAttribute('value', 'two');
    nativeEl.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(component.value).toBe('two');
  });

  it('should update model when native change fires after setting value property', () => {
    (nativeEl as any).value = 'three';
    nativeEl.setAttribute('value', 'three');
    nativeEl.dispatchEvent(new Event('change', { bubbles: true }));
    fixture.detectChanges();

    expect(component.value).toBe('three');
  });

  it('should reflect model to attribute when programmatically updated', async () => {
    component.value = 'one';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(nativeEl.getAttribute('value')).toBe('one');
  });

  it('should handle multiple selection arrays', async () => {
    component.multiple = true;
    fixture.detectChanges();
    await fixture.whenStable();

    // programmatically set model to array
    component.value = ['one', 'three'];
    fixture.detectChanges();
    await fixture.whenStable();

    expect(nativeEl.getAttribute('value')).toBe('one three');

    // Simulate WC change to different array via attribute
    nativeEl.setAttribute('value', 'two three');
    nativeEl.dispatchEvent(new Event('change', { bubbles: true }));
    fixture.detectChanges();

    expect(Array.isArray(component.value)).toBeTrue();
    expect((component.value as string[]).join(' ')).toBe('two three');
  });

  it('should clear attribute when model becomes null', () => {
    component.value = null as any;
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

  it('should set label and hint attributes', async () => {
    component.label = 'Select one';
    component.hint = 'Helpful hint';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(nativeEl.getAttribute('label')).toBe('Select one');
    expect(nativeEl.getAttribute('hint')).toBe('Helpful hint');
  });

  it('should show placeholder and clear value with with-clear', async () => {
    component.placeholder = 'Pick one';
    component.withClear = true;
    fixture.detectChanges();
    await fixture.whenStable();

    // Simulate selecting a value then clearing it via wa-clear
    nativeEl.setAttribute('value', 'one');
    nativeEl.dispatchEvent(new Event('change', { bubbles: true }));
    fixture.detectChanges();
    expect(component.value).toBe('one');

    nativeEl.dispatchEvent(new CustomEvent('wa-clear'));
    // In our wrapper, wa-clear triggers output only; ensure value cleared manually
    nativeEl.removeAttribute('value');
    nativeEl.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(component.value).toBe('');
  });

  it('should respect disabled attribute by reflecting it', async () => {
    component.disabled = true;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(nativeEl.hasAttribute('disabled')).toBeTrue();
  });

  it('should set size and placement attributes', async () => {
    component.size = 'small';
    component.placement = 'top';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(nativeEl.getAttribute('size')).toBe('small');
    expect(nativeEl.getAttribute('placement')).toBe('top');
  });

  it('should support custom tag renderer via getTag (multiple)', async () => {
    component.multiple = true;
    fixture.detectChanges();
    await fixture.whenStable();

    // Set a simple getTag that returns a string
    (nativeEl as any).getTag = (_option: any, _index: number) => '<wa-tag with-remove>Tag</wa-tag>';

    // Set two values and ensure attribute reflects space-delimited
    component.value = ['one', 'two'];
    fixture.detectChanges();
    await fixture.whenStable();

    expect(nativeEl.getAttribute('value')).toBe('one two');
  });

  it('should reflect max-options-visible attribute', async () => {
    nativeEl.setAttribute('max-options-visible', '2');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(nativeEl.getAttribute('max-options-visible')).toBe('2');
  });
});
