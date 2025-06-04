import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaButtonGroupDirective } from './button-group.directive';
import { WaButtonDirective } from '../button/button.directive';

// Create a test host component to test the button-group directive
@Component({
  template: `
    <wa-button-group
      [label]="label"
      [size]="size"
      [variant]="variant"
      [orientation]="orientation"
    >
      <wa-button *ngFor="let btn of buttons">{{ btn }}</wa-button>
    </wa-button-group>

    <div
      *ngIf="useAttribute"
      waButtonGroup
      [label]="label"
      [size]="size"
      [variant]="variant"
      [orientation]="orientation"
    >
      <button waButton *ngFor="let btn of buttons">{{ btn }}</button>
    </div>
  `,
  standalone: true,
  imports: [WaButtonGroupDirective, WaButtonDirective]
})
class TestHostComponent {
  label?: string;
  size?: string;
  variant?: string;
  orientation?: string;
  buttons: string[] = ['Button 1', 'Button 2', 'Button 3'];
  useAttribute = false;
}

describe('WaButtonGroupDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let buttonGroupElement: HTMLElement;
  let buttonGroupDirective: WaButtonGroupDirective;

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

    // Get the wa-button-group element
    buttonGroupElement = hostFixture.nativeElement.querySelector('wa-button-group');
    buttonGroupDirective = hostFixture.debugElement.query(sel => sel.nativeElement === buttonGroupElement).injector.get(WaButtonGroupDirective);
  });

  it('should create the button-group directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(buttonGroupElement).toBeTruthy();
    expect(buttonGroupDirective).toBeTruthy();
  });

  it('should set attributes correctly', () => {
    hostComponent.label = 'Test Group';
    hostComponent.size = 'small';
    hostComponent.variant = 'brand';
    hostComponent.orientation = 'vertical';
    hostFixture.detectChanges();

    expect(buttonGroupElement.getAttribute('label')).toBe('Test Group');
    expect(buttonGroupElement.getAttribute('size')).toBe('small');
    expect(buttonGroupElement.getAttribute('variant')).toBe('brand');
    expect(buttonGroupElement.getAttribute('orientation')).toBe('vertical');
    expect(buttonGroupElement.getAttribute('aria-label')).toBe('Test Group');
  });

  it('should project button content correctly', () => {
    const buttonElements = buttonGroupElement.querySelectorAll('wa-button');
    expect(buttonElements.length).toBe(3);
    expect(buttonElements[0].textContent?.trim()).toBe('Button 1');
    expect(buttonElements[1].textContent?.trim()).toBe('Button 2');
    expect(buttonElements[2].textContent?.trim()).toBe('Button 3');
  });

  it('should expose the native button group element', () => {
    expect(buttonGroupDirective.nativeButtonGroup).toBe(buttonGroupElement);
  });

  it('should work with attribute selector', () => {
    hostComponent.useAttribute = true;
    hostComponent.label = 'Attribute Group';
    hostFixture.detectChanges();

    const attributeButtonGroup = hostFixture.nativeElement.querySelector('[waButtonGroup]');
    expect(attributeButtonGroup).toBeTruthy();
    expect(attributeButtonGroup.getAttribute('label')).toBe('Attribute Group');

    const buttonElements = attributeButtonGroup.querySelectorAll('[waButton]');
    expect(buttonElements.length).toBe(3);
  });
});
