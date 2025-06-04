import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaIconButtonDirective } from './icon-button.directive';

// Create a test host component to test the icon-button directive
@Component({
  template: `
    <wa-icon-button
      [name]="name"
      [family]="family"
      [variant]="variant"
      [library]="library"
      [src]="src"
      [label]="label"
      [href]="href"
      [target]="target"
      [download]="download"
      [disabled]="disabled"
      (blur)="onBlur($event)"
      (focus)="onFocus($event)"
    >
    </wa-icon-button>
  `,
  standalone: true,
  imports: [WaIconButtonDirective]
})
class TestHostComponent {
  name?: string;
  family?: string;
  variant?: string;
  library?: string;
  src?: string;
  label?: string;
  href?: string;
  target?: string;
  download?: string;
  disabled?: boolean;

  onBlur(event: Event): void {}
  onFocus(event: Event): void {}
}

describe('WaIconButtonDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let iconButtonElement: HTMLElement;
  let iconButtonDirective: WaIconButtonDirective;

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

    // Get the wa-icon-button element
    iconButtonElement = hostFixture.nativeElement.querySelector('wa-icon-button');
    iconButtonDirective = hostFixture.debugElement.query(sel => sel.nativeElement === iconButtonElement).injector.get(WaIconButtonDirective);
  });

  it('should create the icon-button directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(iconButtonElement).toBeTruthy();
    expect(iconButtonDirective).toBeTruthy();
  });

  it('should set icon attributes correctly', () => {
    hostComponent.name = 'star';
    hostComponent.family = 'classic';
    hostComponent.variant = 'solid';
    hostComponent.library = 'font-awesome';
    hostComponent.src = '/assets/icons/custom.svg';
    hostComponent.label = 'Favorite';
    hostFixture.detectChanges();

    expect(iconButtonElement.getAttribute('name')).toBe('star');
    expect(iconButtonElement.getAttribute('family')).toBe('classic');
    expect(iconButtonElement.getAttribute('variant')).toBe('solid');
    expect(iconButtonElement.getAttribute('library')).toBe('font-awesome');
    expect(iconButtonElement.getAttribute('src')).toBe('/assets/icons/custom.svg');
    expect(iconButtonElement.getAttribute('label')).toBe('Favorite');
  });

  it('should set link attributes correctly', () => {
    hostComponent.href = 'https://example.com';
    hostComponent.target = '_blank';
    hostComponent.download = 'file.pdf';
    hostFixture.detectChanges();

    expect(iconButtonElement.getAttribute('href')).toBe('https://example.com');
    expect(iconButtonElement.getAttribute('target')).toBe('_blank');
    expect(iconButtonElement.getAttribute('download')).toBe('file.pdf');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();

    expect(iconButtonElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.disabled = false;
    hostFixture.detectChanges();

    expect(iconButtonElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should expose methods for programmatic interaction', () => {
    // Mock the native element methods
    spyOn(iconButtonElement, 'click');
    spyOn(iconButtonElement, 'focus');
    spyOn(iconButtonElement, 'blur');

    // Call the directive methods
    iconButtonDirective.click();
    iconButtonDirective.focus();
    iconButtonDirective.blur();

    // Verify the native methods were called
    expect(iconButtonElement.click).toHaveBeenCalled();
    expect(iconButtonElement.focus).toHaveBeenCalled();
    expect(iconButtonElement.blur).toHaveBeenCalled();
  });

  it('should expose the native element', () => {
    expect(iconButtonDirective.nativeElement).toBe(iconButtonElement);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onBlur');
    spyOn(hostComponent, 'onFocus');

    // Create mock events
    const blurEvent = new Event('blur');
    const focusEvent = new Event('focus');

    // Dispatch events on the native element
    iconButtonElement.dispatchEvent(blurEvent);
    iconButtonElement.dispatchEvent(focusEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onBlur).toHaveBeenCalled();
    expect(hostComponent.onFocus).toHaveBeenCalled();
  });

  it('should handle different name values', () => {
    const names = ['star', 'heart', 'bell', 'circle', 'square'];

    names.forEach(name => {
      hostComponent.name = name;
      hostFixture.detectChanges();
      expect(iconButtonElement.getAttribute('name')).toBe(name);
    });
  });

  it('should handle different family values', () => {
    const families = ['classic', 'brands', 'sharp'];

    families.forEach(family => {
      hostComponent.family = family;
      hostFixture.detectChanges();
      expect(iconButtonElement.getAttribute('family')).toBe(family);
    });
  });

  it('should handle different variant values', () => {
    const variants = ['regular', 'solid', 'light', 'thin', 'duotone'];

    variants.forEach(variant => {
      hostComponent.variant = variant;
      hostFixture.detectChanges();
      expect(iconButtonElement.getAttribute('variant')).toBe(variant);
    });
  });

  it('should handle string value for disabled', () => {
    hostComponent.disabled = 'true';
    hostFixture.detectChanges();
    expect(iconButtonElement.hasAttribute('disabled')).toBeTrue();

    hostComponent.disabled = '';
    hostFixture.detectChanges();
    expect(iconButtonElement.hasAttribute('disabled')).toBeTrue();
  });
});
