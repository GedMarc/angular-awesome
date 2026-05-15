import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaDropdownItemDirective } from './dropdown-item.directive';

@Component({
  template: `
    <wa-dropdown-item
      [type]="type"
      [checked]="checked"
      [value]="value"
      [loading]="loading"
      [disabled]="disabled"
      [label]="label"
      [variant]="variant"
      [submenuOpen]="submenuOpen"
      [backgroundColorHover]="backgroundColorHover"
      [textColorHover]="textColorHover"
    >
      Item Content
    </wa-dropdown-item>
  `,
  standalone: true,
  imports: [WaDropdownItemDirective]
})
class TestHostComponent {
  type?: 'normal' | 'checkbox' | string;
  checked?: boolean | string;
  value?: string;
  loading?: boolean | string;
  disabled?: boolean | string;
  label?: string;
  variant?: 'danger' | 'default' | string;
  submenuOpen?: boolean | string;
  backgroundColorHover?: string;
  textColorHover?: string;
}

describe('WaDropdownItemDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let itemElement: HTMLElement;
  let itemDirective: WaDropdownItemDirective;

  beforeEach(async () => {
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

    itemElement = hostFixture.nativeElement.querySelector('wa-dropdown-item');
    itemDirective = hostFixture.debugElement.query(sel => sel.nativeElement === itemElement).injector.get(WaDropdownItemDirective);
  });

  it('should create the dropdown item directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(itemElement).toBeTruthy();
    expect(itemDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.type = 'checkbox';
    hostComponent.value = 'opt1';
    hostComponent.label = 'Option 1';
    hostComponent.variant = 'danger';
    hostFixture.detectChanges();

    expect(itemElement.getAttribute('type')).toBe('checkbox');
    expect(itemElement.getAttribute('value')).toBe('opt1');
    expect(itemElement.getAttribute('label')).toBe('Option 1');
    expect(itemElement.getAttribute('variant')).toBe('danger');
  });

  it('should set variant to default', () => {
    hostComponent.variant = 'default';
    hostFixture.detectChanges();
    expect(itemElement.getAttribute('variant')).toBe('default');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.checked = true;
    hostComponent.loading = true;
    hostComponent.disabled = true;
    hostComponent.submenuOpen = true;
    hostFixture.detectChanges();

    expect(itemElement.hasAttribute('checked')).toBeTrue();
    expect(itemElement.hasAttribute('loading')).toBeTrue();
    expect(itemElement.hasAttribute('disabled')).toBeTrue();
    expect(itemElement.hasAttribute('submenu-open')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.checked = false;
    hostComponent.loading = false;
    hostComponent.disabled = false;
    hostComponent.submenuOpen = false;
    hostFixture.detectChanges();

    expect(itemElement.hasAttribute('checked')).toBeFalse();
    expect(itemElement.hasAttribute('loading')).toBeFalse();
    expect(itemElement.hasAttribute('disabled')).toBeFalse();
    expect(itemElement.hasAttribute('submenu-open')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.submenuOpen = 'true';
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('submenu-open')).toBeTrue();

    hostComponent.submenuOpen = '';
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('submenu-open')).toBeTrue();
  });

  it('should set CSS custom properties', () => {
    hostComponent.backgroundColorHover = '#f0f0f0';
    hostComponent.textColorHover = '#333';
    hostFixture.detectChanges();

    expect(itemElement.style.getPropertyValue('--background-color-hover')).toBe('#f0f0f0');
    expect(itemElement.style.getPropertyValue('--text-color-hover')).toBe('#333');
  });

  it('should project content correctly', () => {
    expect(itemElement.textContent).toContain('Item Content');
  });

  it('should implement ControlValueAccessor', () => {
    itemDirective.writeValue(true);
    expect(itemElement.hasAttribute('checked')).toBeTrue();

    itemDirective.writeValue(false);
    expect(itemElement.hasAttribute('checked')).toBeFalse();
  });

  it('should handle setDisabledState', () => {
    itemDirective.setDisabledState(true);
    expect(itemElement.hasAttribute('disabled')).toBeTrue();

    itemDirective.setDisabledState(false);
    expect(itemElement.hasAttribute('disabled')).toBeFalse();
  });
});

