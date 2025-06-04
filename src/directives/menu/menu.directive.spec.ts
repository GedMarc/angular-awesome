import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaMenuDirective, WaMenuItemDirective, WaMenuLabelDirective } from './menu.directive';
import { FormsModule } from '@angular/forms';

// Create a test host component for WaMenuDirective
@Component({
  template: `
    <wa-menu
      [size]="size"
      [padding]="padding"
      [margin]="margin"
      [borderRadius]="borderRadius"
      [background]="background"
      [boxShadow]="boxShadow"
      [border]="border"
      [fontSize]="fontSize"
      (select)="onSelect($event)"
    >
      <ng-content></ng-content>
    </wa-menu>
  `,
  standalone: true,
  imports: [WaMenuDirective]
})
class MenuTestHostComponent {
  size?: 'small' | 'medium' | 'large' | 'inherit' | string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  background?: string;
  boxShadow?: string;
  border?: string;
  fontSize?: string;

  onSelect(event: CustomEvent): void {}
}

// Create a test host component for WaMenuItemDirective
@Component({
  template: `
    <wa-menu-item
      [type]="type"
      [checked]="checked"
      [value]="value"
      [loading]="loading"
      [disabled]="disabled"
      [label]="label"
      [withSubmenu]="withSubmenu"
      [backgroundColorHover]="backgroundColorHover"
      [textColorHover]="textColorHover"
      [submenuOffset]="submenuOffset"
      [padding]="padding"
      [margin]="margin"
      [fontSize]="fontSize"
      (blurEvent)="onBlur($event)"
      (focusEvent)="onFocus($event)"
      [(ngModel)]="checkedValue"
    >
      {{ itemText }}
    </wa-menu-item>
  `,
  standalone: true,
  imports: [WaMenuItemDirective, FormsModule]
})
class MenuItemTestHostComponent {
  type?: 'normal' | 'checkbox' | string;
  checked?: boolean | string;
  value?: string;
  loading?: boolean | string;
  disabled?: boolean | string;
  label?: string;
  withSubmenu?: boolean | string;
  backgroundColorHover?: string;
  textColorHover?: string;
  submenuOffset?: string;
  padding?: string;
  margin?: string;
  fontSize?: string;
  itemText = 'Menu Item Text';
  checkedValue = false;

  onBlur(event: FocusEvent): void {}
  onFocus(event: FocusEvent): void {}
}

// Create a test host component for WaMenuLabelDirective
@Component({
  template: `
    <wa-menu-label
      [padding]="padding"
      [fontSize]="fontSize"
      [color]="color"
      [margin]="margin"
    >
      {{ labelText }}
    </wa-menu-label>
  `,
  standalone: true,
  imports: [WaMenuLabelDirective]
})
class MenuLabelTestHostComponent {
  padding?: string;
  fontSize?: string;
  color?: string;
  margin?: string;
  labelText = 'Menu Label Text';
}

describe('WaMenuDirective', () => {
  let hostComponent: MenuTestHostComponent;
  let hostFixture: ComponentFixture<MenuTestHostComponent>;
  let menuElement: HTMLElement;
  let menuDirective: WaMenuDirective;

  beforeEach(async () => {
    // Mock the customElements API
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [MenuTestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(MenuTestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    // Get the wa-menu element
    menuElement = hostFixture.nativeElement.querySelector('wa-menu');
    menuDirective = hostFixture.debugElement.query(sel => sel.nativeElement === menuElement).injector.get(WaMenuDirective);
  });

  it('should create the menu directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(menuElement).toBeTruthy();
    expect(menuDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.size = 'large';
    hostFixture.detectChanges();
    expect(menuElement.getAttribute('size')).toBe('large');
  });

  it('should set style attributes correctly', () => {
    hostComponent.padding = '10px';
    hostComponent.margin = '5px';
    hostComponent.borderRadius = '4px';
    hostComponent.background = '#ffffff';
    hostComponent.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    hostComponent.border = '1px solid #eaeaea';
    hostComponent.fontSize = '14px';
    hostFixture.detectChanges();

    expect(menuElement.style.getPropertyValue('--padding')).toBe('10px');
    expect(menuElement.style.getPropertyValue('--margin')).toBe('5px');
    expect(menuElement.style.getPropertyValue('--border-radius')).toBe('4px');
    expect(menuElement.style.getPropertyValue('--background')).toBe('#ffffff');
    expect(menuElement.style.getPropertyValue('--box-shadow')).toBe('0 2px 4px rgba(0,0,0,0.1)');
    expect(menuElement.style.getPropertyValue('--border')).toBe('1px solid #eaeaea');
    expect(menuElement.style.getPropertyValue('--font-size')).toBe('14px');
  });

  it('should emit select event', () => {
    spyOn(hostComponent, 'onSelect');
    const selectEvent = new CustomEvent('wa-select', { detail: { value: 'test' } });
    menuElement.dispatchEvent(selectEvent);
    expect(hostComponent.onSelect).toHaveBeenCalled();
  });

  it('should handle different size values', () => {
    const sizes = ['small', 'medium', 'large', 'inherit'];

    sizes.forEach(size => {
      hostComponent.size = size;
      hostFixture.detectChanges();
      expect(menuElement.getAttribute('size')).toBe(size);
    });
  });
});

describe('WaMenuItemDirective', () => {
  let hostComponent: MenuItemTestHostComponent;
  let hostFixture: ComponentFixture<MenuItemTestHostComponent>;
  let menuItemElement: HTMLElement;
  let menuItemDirective: WaMenuItemDirective;

  beforeEach(async () => {
    // Mock the customElements API
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [MenuItemTestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(MenuItemTestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    // Get the wa-menu-item element
    menuItemElement = hostFixture.nativeElement.querySelector('wa-menu-item');
    menuItemDirective = hostFixture.debugElement.query(sel => sel.nativeElement === menuItemElement).injector.get(WaMenuItemDirective);
  });

  it('should create the menu item directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(menuItemElement).toBeTruthy();
    expect(menuItemDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.type = 'checkbox';
    hostComponent.value = 'test-value';
    hostComponent.label = 'Test Label';
    hostFixture.detectChanges();

    expect(menuItemElement.getAttribute('type')).toBe('checkbox');
    expect(menuItemElement.getAttribute('value')).toBe('test-value');
    expect(menuItemElement.getAttribute('label')).toBe('Test Label');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.checked = true;
    hostComponent.loading = true;
    hostComponent.disabled = true;
    hostComponent.withSubmenu = true;
    hostFixture.detectChanges();

    expect(menuItemElement.hasAttribute('checked')).toBeTrue();
    expect(menuItemElement.hasAttribute('loading')).toBeTrue();
    expect(menuItemElement.hasAttribute('disabled')).toBeTrue();
    expect(menuItemElement.hasAttribute('with-submenu')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.checked = false;
    hostComponent.loading = false;
    hostComponent.disabled = false;
    hostComponent.withSubmenu = false;
    hostFixture.detectChanges();

    expect(menuItemElement.hasAttribute('checked')).toBeFalse();
    expect(menuItemElement.hasAttribute('loading')).toBeFalse();
    expect(menuItemElement.hasAttribute('disabled')).toBeFalse();
    expect(menuItemElement.hasAttribute('with-submenu')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.checked = 'true';
    hostComponent.loading = '';
    hostFixture.detectChanges();

    expect(menuItemElement.hasAttribute('checked')).toBeTrue();
    expect(menuItemElement.hasAttribute('loading')).toBeTrue();
  });

  it('should set style attributes correctly', () => {
    hostComponent.backgroundColorHover = '#f5f5f5';
    hostComponent.textColorHover = '#333333';
    hostComponent.submenuOffset = '5px';
    hostComponent.padding = '10px';
    hostComponent.margin = '5px';
    hostComponent.fontSize = '14px';
    hostFixture.detectChanges();

    expect(menuItemElement.style.getPropertyValue('--background-color-hover')).toBe('#f5f5f5');
    expect(menuItemElement.style.getPropertyValue('--text-color-hover')).toBe('#333333');
    expect(menuItemElement.style.getPropertyValue('--submenu-offset')).toBe('5px');
    expect(menuItemElement.style.getPropertyValue('--padding')).toBe('10px');
    expect(menuItemElement.style.getPropertyValue('--margin')).toBe('5px');
    expect(menuItemElement.style.getPropertyValue('--font-size')).toBe('14px');
  });

  it('should project content correctly', () => {
    expect(menuItemElement.textContent?.trim()).toBe('Menu Item Text');

    hostComponent.itemText = 'Updated Text';
    hostFixture.detectChanges();
    expect(menuItemElement.textContent?.trim()).toBe('Updated Text');
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onBlur');
    spyOn(hostComponent, 'onFocus');

    // Create mock events
    const blurEvent = new FocusEvent('blur');
    const focusEvent = new FocusEvent('focus');

    // Dispatch events on the native element
    menuItemElement.dispatchEvent(blurEvent);
    menuItemElement.dispatchEvent(focusEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onBlur).toHaveBeenCalled();
    expect(hostComponent.onFocus).toHaveBeenCalled();
  });

  it('should implement ControlValueAccessor correctly', () => {
    // Test writeValue
    menuItemDirective.writeValue(true);
    expect(menuItemElement.hasAttribute('checked')).toBeTrue();

    menuItemDirective.writeValue(false);
    expect(menuItemElement.hasAttribute('checked')).toBeFalse();

    // Test setDisabledState
    menuItemDirective.setDisabledState(true);
    expect(menuItemElement.hasAttribute('disabled')).toBeTrue();

    menuItemDirective.setDisabledState(false);
    expect(menuItemElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should update model when checkbox is checked', () => {
    hostComponent.type = 'checkbox';
    hostFixture.detectChanges();

    // Simulate checkedChange event
    const checkedChangeEvent = new CustomEvent('checkedChange', { detail: true });
    menuItemElement.dispatchEvent(checkedChangeEvent);

    // Verify the model is updated
    expect(hostComponent.checkedValue).toBeTrue();
  });
});

describe('WaMenuLabelDirective', () => {
  let hostComponent: MenuLabelTestHostComponent;
  let hostFixture: ComponentFixture<MenuLabelTestHostComponent>;
  let menuLabelElement: HTMLElement;
  let menuLabelDirective: WaMenuLabelDirective;

  beforeEach(async () => {
    // Mock the customElements API
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [MenuLabelTestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(MenuLabelTestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    // Get the wa-menu-label element
    menuLabelElement = hostFixture.nativeElement.querySelector('wa-menu-label');
    menuLabelDirective = hostFixture.debugElement.query(sel => sel.nativeElement === menuLabelElement).injector.get(WaMenuLabelDirective);
  });

  it('should create the menu label directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(menuLabelElement).toBeTruthy();
    expect(menuLabelDirective).toBeTruthy();
  });

  it('should set style attributes correctly', () => {
    hostComponent.padding = '10px';
    hostComponent.fontSize = '14px';
    hostComponent.color = '#666666';
    hostComponent.margin = '5px';
    hostFixture.detectChanges();

    expect(menuLabelElement.style.getPropertyValue('--padding')).toBe('10px');
    expect(menuLabelElement.style.getPropertyValue('--font-size')).toBe('14px');
    expect(menuLabelElement.style.getPropertyValue('--color')).toBe('#666666');
    expect(menuLabelElement.style.getPropertyValue('--margin')).toBe('5px');
  });

  it('should project content correctly', () => {
    expect(menuLabelElement.textContent?.trim()).toBe('Menu Label Text');

    hostComponent.labelText = 'Updated Label';
    hostFixture.detectChanges();
    expect(menuLabelElement.textContent?.trim()).toBe('Updated Label');
  });
});
