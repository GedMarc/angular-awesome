import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { WaDropdownDirective } from './dropdown.directive';

// Create a test host component to test the dropdown directive
@Component({
  template: `
    <wa-dropdown
      [(ngModel)]="selectedValue"
      [placement]="placement"
      [disabled]="disabled"
      [stayOpenOnSelect]="stayOpenOnSelect"
      [distance]="distance"
      [skidding]="skidding"
      [sync]="sync"
      [boxShadow]="boxShadow"
      (showEvent)="onShow($event)"
      (afterShowEvent)="onAfterShow($event)"
      (hideEvent)="onHide($event)"
      (afterHideEvent)="onAfterHide($event)"
      (selectEvent)="onSelect($event)"
    >
      <div slot="trigger">{{ triggerText }}</div>
      <div class="menu-container">
        <div class="menu-item" value="item1">Item 1</div>
        <div class="menu-item" value="item2">Item 2</div>
        <div class="menu-item" value="item3">Item 3</div>
      </div>
    </wa-dropdown>
  `,
  standalone: true,
  imports: [WaDropdownDirective, FormsModule]
})
class TestHostComponent {
  selectedValue?: string;
  placement?: string;
  disabled?: boolean | string;
  stayOpenOnSelect?: boolean | string;
  distance?: number | string;
  skidding?: number | string;
  sync?: 'width' | 'height' | 'both' | string;
  boxShadow?: string;
  triggerText = 'Dropdown';

  onShow(event: Event): void {}
  onAfterShow(event: Event): void {}
  onHide(event: Event): void {}
  onAfterHide(event: Event): void {}
  onSelect(event: { item: HTMLElement }): void {}
}

describe('WaDropdownDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let dropdownElement: HTMLElement;
  let dropdownDirective: WaDropdownDirective;
  let directiveDebugElement: DebugElement;

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

    // Get the wa-dropdown element
    dropdownElement = hostFixture.nativeElement.querySelector('wa-dropdown');
    directiveDebugElement = hostFixture.debugElement.query(By.directive(WaDropdownDirective));
    dropdownDirective = directiveDebugElement.injector.get(WaDropdownDirective);
  });

  it('should create the dropdown directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(dropdownElement).toBeTruthy();
    expect(dropdownDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.placement = 'bottom-start';
    hostComponent.sync = 'width';
    hostFixture.detectChanges();

    expect(dropdownElement.getAttribute('placement')).toBe('bottom-start');
    expect(dropdownElement.getAttribute('sync')).toBe('width');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.disabled = true;
    hostComponent.stayOpenOnSelect = true;
    hostFixture.detectChanges();

    expect(dropdownElement.hasAttribute('disabled')).toBeTrue();
    expect(dropdownElement.hasAttribute('stay-open-on-select')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.disabled = false;
    hostComponent.stayOpenOnSelect = false;
    hostFixture.detectChanges();

    expect(dropdownElement.hasAttribute('disabled')).toBeFalse();
    expect(dropdownElement.hasAttribute('stay-open-on-select')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.disabled = 'true';
    hostComponent.stayOpenOnSelect = '';
    hostFixture.detectChanges();

    expect(dropdownElement.hasAttribute('disabled')).toBeTrue();
    expect(dropdownElement.hasAttribute('stay-open-on-select')).toBeTrue();
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.distance = 10;
    hostComponent.skidding = 5;
    hostFixture.detectChanges();

    expect(dropdownElement.getAttribute('distance')).toBe('10');
    expect(dropdownElement.getAttribute('skidding')).toBe('5');
  });

  it('should handle string values for numeric attributes', () => {
    hostComponent.distance = '10';
    hostComponent.skidding = '5';
    hostFixture.detectChanges();

    expect(dropdownElement.getAttribute('distance')).toBe('10');
    expect(dropdownElement.getAttribute('skidding')).toBe('5');
  });

  it('should set CSS custom properties correctly', () => {
    hostComponent.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    hostFixture.detectChanges();

    expect(dropdownElement.style.getPropertyValue('--box-shadow')).toBe('0 2px 4px rgba(0,0,0,0.2)');
  });

  it('should project content correctly', () => {
    const triggerSlot = dropdownElement.querySelector('[slot="trigger"]');
    const menuContainer = dropdownElement.querySelector('.menu-container');
    const menuItems = dropdownElement.querySelectorAll('.menu-item');

    expect(triggerSlot).toBeTruthy();
    expect(triggerSlot?.textContent?.trim()).toBe('Dropdown');
    expect(menuContainer).toBeTruthy();
    expect(menuItems.length).toBe(3);
    expect(menuItems[0].getAttribute('value')).toBe('item1');
    expect(menuItems[1].getAttribute('value')).toBe('item2');
    expect(menuItems[2].getAttribute('value')).toBe('item3');
  });

  it('should expose the native element', () => {
    expect(dropdownDirective.nativeElement).toBe(dropdownElement);
  });

  it('should expose methods for programmatic interaction', () => {
    // Mock the native element methods
    spyOn(dropdownElement as any, 'show');
    spyOn(dropdownElement as any, 'hide');
    spyOn(dropdownElement as any, 'reposition');

    // Call the directive methods
    dropdownDirective.show();
    dropdownDirective.hide();
    dropdownDirective.reposition();

    // Verify the native methods were called
    expect(dropdownElement.show).toHaveBeenCalled();
    expect(dropdownElement.hide).toHaveBeenCalled();
    expect(dropdownElement.reposition).toHaveBeenCalled();
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onShow');
    spyOn(hostComponent, 'onAfterShow');
    spyOn(hostComponent, 'onHide');
    spyOn(hostComponent, 'onAfterHide');
    spyOn(hostComponent, 'onSelect');

    // Create mock events
    const showEvent = new Event('wa-show');
    const afterShowEvent = new Event('wa-after-show');
    const hideEvent = new Event('wa-hide');
    const afterHideEvent = new Event('wa-after-hide');
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    const selectEvent = new CustomEvent('wa-select', {
      detail: { item: menuItem }
    });

    // Dispatch events on the native element
    dropdownElement.dispatchEvent(showEvent);
    dropdownElement.dispatchEvent(afterShowEvent);
    dropdownElement.dispatchEvent(hideEvent);
    dropdownElement.dispatchEvent(afterHideEvent);
    dropdownElement.dispatchEvent(selectEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onShow).toHaveBeenCalledWith(showEvent);
    expect(hostComponent.onAfterShow).toHaveBeenCalledWith(afterShowEvent);
    expect(hostComponent.onHide).toHaveBeenCalledWith(hideEvent);
    expect(hostComponent.onAfterHide).toHaveBeenCalledWith(afterHideEvent);
    expect(hostComponent.onSelect).toHaveBeenCalledWith(selectEvent.detail);
  });

  it('should handle ngModel binding', () => {
    // Set the selected value
    hostComponent.selectedValue = 'item2';
    hostFixture.detectChanges();

    // Mock the menu item selection
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    menuItem.setAttribute('value', 'item3');

    // Create a select event
    const selectEvent = new CustomEvent('wa-select', {
      detail: { item: menuItem }
    });

    // Dispatch the event
    dropdownElement.dispatchEvent(selectEvent);

    // Verify the selected value was updated
    expect(hostComponent.selectedValue).toBe('item3');
  });

  it('should handle disabled state', () => {
    // Test setDisabledState from ControlValueAccessor
    dropdownDirective.setDisabledState(true);
    expect(dropdownElement.hasAttribute('disabled')).toBeTrue();

    dropdownDirective.setDisabledState(false);
    expect(dropdownElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should handle different placement values', () => {
    const placements = [
      'top', 'top-start', 'top-end',
      'bottom', 'bottom-start', 'bottom-end',
      'right', 'right-start', 'right-end',
      'left', 'left-start', 'left-end'
    ];

    placements.forEach(placement => {
      hostComponent.placement = placement;
      hostFixture.detectChanges();
      expect(dropdownElement.getAttribute('placement')).toBe(placement);
    });
  });

  it('should handle different sync values', () => {
    const syncValues = ['width', 'height', 'both'];

    syncValues.forEach(sync => {
      hostComponent.sync = sync as any;
      hostFixture.detectChanges();
      expect(dropdownElement.getAttribute('sync')).toBe(sync);
    });
  });
});
