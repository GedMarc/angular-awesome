import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaDrawerDirective } from './drawer.directive';

// Create a test host component to test the drawer directive
@Component({
  template: `
    <wa-drawer
      [open]="open"
      [label]="label"
      [placement]="placement"
      [withoutHeader]="withoutHeader"
      [lightDismiss]="lightDismiss"
      [backgroundColor]="backgroundColor"
      [boxShadow]="boxShadow"
      [spacing]="spacing"
      [size]="size"
      [showDuration]="showDuration"
      [hideDuration]="hideDuration"
      (wa-show)="onShow($event)"
      (wa-after-show)="onAfterShow($event)"
      (wa-hide)="onHide($event)"
      (wa-after-hide)="onAfterHide($event)"
      (wa-focus)="onFocus($event)"
      (wa-blur)="onBlur($event)"
    >
      <div>Default content</div>
      <div slot="footer" *ngIf="showFooter">Footer content</div>
      <div slot="header-actions" *ngIf="showHeaderActions">Header actions</div>
      <div slot="label" *ngIf="showCustomLabel">Custom label</div>
    </wa-drawer>
  `,
  standalone: true,
  imports: [WaDrawerDirective]
})
class TestHostComponent {
  open?: boolean | string;
  label?: string;
  placement?: 'top' | 'end' | 'bottom' | 'start' | string;
  withoutHeader?: boolean | string;
  lightDismiss?: boolean | string;

  backgroundColor?: string;
  boxShadow?: string;
  spacing?: string;
  size?: string;
  showDuration?: string;
  hideDuration?: string;

  showFooter = false;
  showHeaderActions = false;
  showCustomLabel = false;

  onShow(event: CustomEvent): void {}
  onAfterShow(event: CustomEvent): void {}
  onHide(event: CustomEvent): void {}
  onAfterHide(event: CustomEvent): void {}
  onFocus(event: FocusEvent): void {}
  onBlur(event: FocusEvent): void {}
}

describe('WaDrawerDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let drawerElement: HTMLElement;
  let drawerDirective: WaDrawerDirective;

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

    // Get the wa-drawer element
    drawerElement = hostFixture.nativeElement.querySelector('wa-drawer');
    drawerDirective = hostFixture.debugElement.query(sel => sel.nativeElement === drawerElement).injector.get(WaDrawerDirective);
  });

  it('should create the drawer directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(drawerElement).toBeTruthy();
    expect(drawerDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.label = 'test-label';
    hostComponent.placement = 'top';
    hostFixture.detectChanges();

    expect(drawerElement.getAttribute('label')).toBe('test-label');
    expect(drawerElement.getAttribute('placement')).toBe('top');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.open = true;
    hostComponent.withoutHeader = true;
    hostComponent.lightDismiss = true;
    hostFixture.detectChanges();

    expect(drawerElement.hasAttribute('open')).toBeTrue();
    expect(drawerElement.hasAttribute('without-header')).toBeTrue();
    expect(drawerElement.hasAttribute('light-dismiss')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.open = false;
    hostComponent.withoutHeader = false;
    hostComponent.lightDismiss = false;
    hostFixture.detectChanges();

    expect(drawerElement.hasAttribute('open')).toBeFalse();
    expect(drawerElement.hasAttribute('without-header')).toBeFalse();
    expect(drawerElement.hasAttribute('light-dismiss')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.open = 'true';
    hostComponent.withoutHeader = '';
    hostComponent.lightDismiss = 'true';
    hostFixture.detectChanges();

    expect(drawerElement.hasAttribute('open')).toBeTrue();
    expect(drawerElement.hasAttribute('without-header')).toBeTrue();
    expect(drawerElement.hasAttribute('light-dismiss')).toBeTrue();
  });

  it('should set CSS custom properties correctly', () => {
    hostComponent.backgroundColor = 'red';
    hostComponent.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    hostComponent.spacing = '16px';
    hostComponent.size = '300px';
    hostComponent.showDuration = '300ms';
    hostComponent.hideDuration = '200ms';
    hostFixture.detectChanges();

    expect(drawerElement.style.getPropertyValue('--background-color')).toBe('red');
    expect(drawerElement.style.getPropertyValue('--box-shadow')).toBe('0 2px 4px rgba(0,0,0,0.2)');
    expect(drawerElement.style.getPropertyValue('--spacing')).toBe('16px');
    expect(drawerElement.style.getPropertyValue('--size')).toBe('300px');
    expect(drawerElement.style.getPropertyValue('--show-duration')).toBe('300ms');
    expect(drawerElement.style.getPropertyValue('--hide-duration')).toBe('200ms');
  });

  it('should project content correctly', () => {
    hostComponent.showFooter = true;
    hostComponent.showHeaderActions = true;
    hostComponent.showCustomLabel = true;
    hostFixture.detectChanges();

    const defaultContent = drawerElement.querySelector(':not([slot])');
    const footerSlot = drawerElement.querySelector('[slot="footer"]');
    const headerActionsSlot = drawerElement.querySelector('[slot="header-actions"]');
    const labelSlot = drawerElement.querySelector('[slot="label"]');

    expect(defaultContent).toBeTruthy();
    expect(defaultContent?.textContent?.trim()).toBe('Default content');
    expect(footerSlot).toBeTruthy();
    expect(footerSlot?.textContent?.trim()).toBe('Footer content');
    expect(headerActionsSlot).toBeTruthy();
    expect(headerActionsSlot?.textContent?.trim()).toBe('Header actions');
    expect(labelSlot).toBeTruthy();
    expect(labelSlot?.textContent?.trim()).toBe('Custom label');
  });

  it('should expose the native element', () => {
    expect(drawerDirective.nativeElement).toBe(drawerElement);
  });

  it('should expose methods for programmatic interaction', () => {
    // Mock the native element methods
    spyOn(drawerElement as any, 'show');
    spyOn(drawerElement as any, 'hide');

    // Call the directive methods
    drawerDirective.show();
    drawerDirective.hide();

    // Verify the native methods were called
    expect(drawerElement.show).toHaveBeenCalled();
    expect(drawerElement.hide).toHaveBeenCalled();
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onShow');
    spyOn(hostComponent, 'onAfterShow');
    spyOn(hostComponent, 'onHide');
    spyOn(hostComponent, 'onAfterHide');
    spyOn(hostComponent, 'onFocus');
    spyOn(hostComponent, 'onBlur');

    // Create mock events
    const showEvent = new CustomEvent('wa-show');
    const afterShowEvent = new CustomEvent('wa-after-show');
    const hideEvent = new CustomEvent('wa-hide');
    const afterHideEvent = new CustomEvent('wa-after-hide');
    const focusEvent = new FocusEvent('wa-focus');
    const blurEvent = new FocusEvent('wa-blur');

    // Dispatch events on the native element
    drawerElement.dispatchEvent(showEvent);
    drawerElement.dispatchEvent(afterShowEvent);
    drawerElement.dispatchEvent(hideEvent);
    drawerElement.dispatchEvent(afterHideEvent);
    drawerElement.dispatchEvent(focusEvent);
    drawerElement.dispatchEvent(blurEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onShow).toHaveBeenCalledWith(showEvent);
    expect(hostComponent.onAfterShow).toHaveBeenCalledWith(afterShowEvent);
    expect(hostComponent.onHide).toHaveBeenCalledWith(hideEvent);
    expect(hostComponent.onAfterHide).toHaveBeenCalledWith(afterHideEvent);
    expect(hostComponent.onFocus).toHaveBeenCalledWith(focusEvent);
    expect(hostComponent.onBlur).toHaveBeenCalledWith(blurEvent);
  });

  it('should handle different placement values', () => {
    const placements = ['top', 'end', 'bottom', 'start'];

    placements.forEach(placement => {
      hostComponent.placement = placement as any;
      hostFixture.detectChanges();
      expect(drawerElement.getAttribute('placement')).toBe(placement);
    });
  });
});
