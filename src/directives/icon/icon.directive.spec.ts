import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaIconDirective } from './icon.directive';

// Create a test host component to test the icon directive
@Component({
  template: `
    <wa-icon
      [name]="name"
      [family]="family"
      [variant]="variant"
      [library]="library"
      [src]="src"
      [label]="label"
      [fixedWidth]="fixedWidth"
    >
    </wa-icon>
  `,
  standalone: true,
  imports: [WaIconDirective]
})
class TestHostComponent {
  name?: string;
  family?: string;
  variant?: string;
  library?: string;
  src?: string;
  label?: string;
  fixedWidth?: boolean;
}

describe('WaIconDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let iconElement: HTMLElement;
  let iconDirective: WaIconDirective;

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

    // Get the wa-icon element
    iconElement = hostFixture.nativeElement.querySelector('wa-icon');
    iconDirective = hostFixture.debugElement.query(sel => sel.nativeElement === iconElement).injector.get(WaIconDirective);
  });

  it('should create the icon directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(iconElement).toBeTruthy();
    expect(iconDirective).toBeTruthy();
  });

  it('should set standard attributes correctly', () => {
    hostComponent.name = 'star';
    hostComponent.family = 'classic';
    hostComponent.variant = 'solid';
    hostComponent.library = 'font-awesome';
    hostComponent.src = '/assets/icons/custom.svg';
    hostComponent.label = 'Favorite';
    hostFixture.detectChanges();

    expect(iconElement.getAttribute('name')).toBe('star');
    expect(iconElement.getAttribute('family')).toBe('classic');
    expect(iconElement.getAttribute('variant')).toBe('solid');
    expect(iconElement.getAttribute('library')).toBe('font-awesome');
    expect(iconElement.getAttribute('src')).toBe('/assets/icons/custom.svg');
    expect(iconElement.getAttribute('label')).toBe('Favorite');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.fixedWidth = true;
    hostFixture.detectChanges();

    expect(iconElement.hasAttribute('fixed-width')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.fixedWidth = false;
    hostFixture.detectChanges();

    expect(iconElement.hasAttribute('fixed-width')).toBeFalse();
  });

  it('should expose the native element', () => {
    expect(iconDirective.nativeElement).toBe(iconElement);
  });

  it('should handle different name values', () => {
    const names = ['star', 'heart', 'bell', 'circle', 'square'];

    names.forEach(name => {
      hostComponent.name = name;
      hostFixture.detectChanges();
      expect(iconElement.getAttribute('name')).toBe(name);
    });
  });

  it('should handle different family values', () => {
    const families = ['classic', 'brands', 'sharp'];

    families.forEach(family => {
      hostComponent.family = family;
      hostFixture.detectChanges();
      expect(iconElement.getAttribute('family')).toBe(family);
    });
  });

  it('should handle different variant values', () => {
    const variants = ['regular', 'solid', 'light', 'thin', 'duotone'];

    variants.forEach(variant => {
      hostComponent.variant = variant;
      hostFixture.detectChanges();
      expect(iconElement.getAttribute('variant')).toBe(variant);
    });
  });

  it('should handle string value for fixedWidth', () => {
    hostComponent.fixedWidth = 'true';
    hostFixture.detectChanges();
    expect(iconElement.hasAttribute('fixed-width')).toBeTrue();

    hostComponent.fixedWidth = '';
    hostFixture.detectChanges();
    expect(iconElement.hasAttribute('fixed-width')).toBeTrue();
  });
});
