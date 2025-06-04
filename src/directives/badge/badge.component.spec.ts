import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaBadgeComponent } from './badge.component';

// Create a test host component to test the badge component
@Component({
  template: `
    <wa-badge
      [variant]="variant"
      [appearance]="appearance"
      [pill]="pill"
      [pulse]="pulse"
      [fontSize]="fontSize"
      [backgroundColor]="backgroundColor"
      [borderColor]="borderColor"
      [textColor]="textColor"
    >
      Test Badge
    </wa-badge>
  `,
  standalone: true,
  imports: [WaBadgeComponent]
})
class TestHostComponent {
  variant: 'brand' | 'neutral' | 'success' | 'warning' | 'danger' | 'inherit' = 'brand';
  appearance: 'accent' | 'filled' | 'outlined' = 'accent';
  pill?: boolean | null;
  pulse?: boolean | null;
  fontSize?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}

describe('WaBadgeComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let badgeElement: HTMLElement;

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

    // Get the wa-badge element
    badgeElement = hostFixture.nativeElement.querySelector('wa-badge');
  });

  it('should create the badge component', () => {
    expect(hostComponent).toBeTruthy();
    expect(badgeElement).toBeTruthy();
  });

  it('should set variant attribute correctly', () => {
    hostComponent.variant = 'success';
    hostFixture.detectChanges();
    expect(badgeElement.getAttribute('variant')).toBe('success');
  });

  it('should set appearance attribute correctly', () => {
    hostComponent.appearance = 'outlined';
    hostFixture.detectChanges();
    expect(badgeElement.getAttribute('appearance')).toBe('outlined');
  });

  it('should set pill attribute when pill is true', () => {
    hostComponent.pill = true;
    hostFixture.detectChanges();
    expect(badgeElement.hasAttribute('pill')).toBe(true);
  });

  it('should not set pill attribute when pill is false', () => {
    hostComponent.pill = false;
    hostFixture.detectChanges();
    expect(badgeElement.hasAttribute('pill')).toBe(false);
  });

  it('should set pulse attribute when pulse is true', () => {
    hostComponent.pulse = true;
    hostFixture.detectChanges();
    expect(badgeElement.hasAttribute('pulse')).toBe(true);
  });

  it('should set font-size style when fontSize is provided', () => {
    hostComponent.fontSize = 'var(--wa-font-size-s)';
    hostFixture.detectChanges();
    expect(badgeElement.style.fontSize).toBe('var(--wa-font-size-s)');
  });

  it('should set custom CSS variables when provided', () => {
    hostComponent.backgroundColor = 'red';
    hostComponent.borderColor = 'blue';
    hostComponent.textColor = 'green';
    hostFixture.detectChanges();

    expect(badgeElement.style.getPropertyValue('--background-color')).toBe('red');
    expect(badgeElement.style.getPropertyValue('--border-color')).toBe('blue');
    expect(badgeElement.style.getPropertyValue('--text-color')).toBe('green');
  });

  it('should project content correctly', () => {
    expect(badgeElement.textContent?.trim()).toBe('Test Badge');
  });
});
