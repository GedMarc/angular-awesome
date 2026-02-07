import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaDialogDirective } from './dialog.directive';

// Create a test host component to test the dialog directive
@Component({
  template: `
    <wa-dialog
      [(open)]="open"
      [label]="label"
      [withoutHeader]="withoutHeader"
      [lightDismiss]="lightDismiss"
      [backgroundColor]="backgroundColor"
      [borderRadius]="borderRadius"
      [boxShadow]="boxShadow"
      [spacing]="spacing"
      [width]="width"
      [showDuration]="showDuration"
      [hideDuration]="hideDuration"
      (wa-show)="onShow()"
      (wa-after-show)="onAfterShow()"
      (wa-hide)="onHide($event)"
      (wa-after-hide)="onAfterHide()"
    >
      <div>Default content</div>
      <div slot="footer" *ngIf="showFooter">Footer content</div>
      <div slot="header-actions" *ngIf="showHeaderActions">Header actions</div>
    </wa-dialog>
  `,
  standalone: true,
  imports: [WaDialogDirective]
})
class TestHostComponent {
  open?: boolean | string;
  label?: string;
  withoutHeader?: boolean | string;
  lightDismiss?: boolean | string;

  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  spacing?: string;
  width?: string;
  showDuration?: string;
  hideDuration?: string;

  showFooter = false;
  showHeaderActions = false;

  onShow(): void {}
  onAfterShow(): void {}
  onHide(event: { source: HTMLElement | 'overlay' | 'escape' | 'programmatic' }): void {}
  onAfterHide(): void {}
}

describe('WaDialogDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let dialogElement: HTMLElement;
  let dialogDirective: WaDialogDirective;

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

    // Get the wa-dialog element
    dialogElement = hostFixture.nativeElement.querySelector('wa-dialog');
    dialogDirective = hostFixture.debugElement.query(sel => sel.nativeElement === dialogElement).injector.get(WaDialogDirective);
  });

  it('should create the dialog directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(dialogElement).toBeTruthy();
    expect(dialogDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.label = 'test-label';
    hostFixture.detectChanges();

    expect(dialogElement.getAttribute('label')).toBe('test-label');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.open = true;
    hostComponent.withoutHeader = true;
    hostComponent.lightDismiss = true;
    hostFixture.detectChanges();

    expect(dialogElement.hasAttribute('open')).toBeTrue();
    expect(dialogElement.hasAttribute('without-header')).toBeTrue();
    expect(dialogElement.hasAttribute('light-dismiss')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.open = false;
    hostComponent.withoutHeader = false;
    hostComponent.lightDismiss = false;
    hostFixture.detectChanges();

    expect(dialogElement.hasAttribute('open')).toBeFalse();
    expect(dialogElement.hasAttribute('without-header')).toBeFalse();
    expect(dialogElement.hasAttribute('light-dismiss')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.open = 'true';
    hostComponent.withoutHeader = '';
    hostComponent.lightDismiss = 'true';
    hostFixture.detectChanges();

    expect(dialogElement.hasAttribute('open')).toBeTrue();
    expect(dialogElement.hasAttribute('without-header')).toBeTrue();
    expect(dialogElement.hasAttribute('light-dismiss')).toBeTrue();
  });

  it('should set CSS custom properties correctly', () => {
    hostComponent.backgroundColor = 'red';
    hostComponent.borderRadius = '8px';
    hostComponent.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    hostComponent.spacing = '16px';
    hostComponent.width = '500px';
    hostComponent.showDuration = '300ms';
    hostComponent.hideDuration = '200ms';
    hostFixture.detectChanges();

    expect(dialogElement.style.getPropertyValue('--background-color')).toBe('red');
    expect(dialogElement.style.getPropertyValue('--border-radius')).toBe('8px');
    expect(dialogElement.style.getPropertyValue('--box-shadow')).toBe('0 2px 4px rgba(0,0,0,0.2)');
    expect(dialogElement.style.getPropertyValue('--spacing')).toBe('16px');
    expect(dialogElement.style.getPropertyValue('--width')).toBe('500px');
    expect(dialogElement.style.getPropertyValue('--show-duration')).toBe('300ms');
    expect(dialogElement.style.getPropertyValue('--hide-duration')).toBe('200ms');
  });

  it('should project content correctly', () => {
    hostComponent.showFooter = true;
    hostComponent.showHeaderActions = true;
    hostFixture.detectChanges();

    const defaultContent = dialogElement.querySelector(':not([slot])');
    const footerSlot = dialogElement.querySelector('[slot="footer"]');
    const headerActionsSlot = dialogElement.querySelector('[slot="header-actions"]');

    expect(defaultContent).toBeTruthy();
    expect(defaultContent?.textContent?.trim()).toBe('Default content');
    expect(footerSlot).toBeTruthy();
    expect(footerSlot?.textContent?.trim()).toBe('Footer content');
    expect(headerActionsSlot).toBeTruthy();
    expect(headerActionsSlot?.textContent?.trim()).toBe('Header actions');
  });

  it('should expose the native element', () => {
    expect(dialogDirective.nativeElement).toBe(dialogElement);
  });

  it('should expose methods for programmatic interaction', () => {
    // Mock the native element methods
    spyOn(dialogElement as any, 'show');
    spyOn(dialogElement as any, 'hide');

    // Call the directive methods
    dialogDirective.show();
    dialogDirective.hide();

    // Verify the native methods were called
    expect(dialogElement.show).toHaveBeenCalled();
    expect(dialogElement.hide).toHaveBeenCalled();
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onShow');
    spyOn(hostComponent, 'onAfterShow');
    spyOn(hostComponent, 'onHide');
    spyOn(hostComponent, 'onAfterHide');

    // Create mock events (native events)
    const showEvent = new Event('wa-show');
    const afterShowEvent = new Event('wa-after-show');
    const hideEvent = new CustomEvent('wa-hide', {
      detail: { source: 'escape' }
    });
    const afterHideEvent = new Event('wa-after-hide');

    // Dispatch events on the native element
    dialogElement.dispatchEvent(showEvent);
    dialogElement.dispatchEvent(afterShowEvent);
    dialogElement.dispatchEvent(hideEvent);
    dialogElement.dispatchEvent(afterHideEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onShow).toHaveBeenCalled();
    expect(hostComponent.onAfterShow).toHaveBeenCalled();
    expect(hostComponent.onHide).toHaveBeenCalledWith({ source: 'escape' });
    expect(hostComponent.onAfterHide).toHaveBeenCalled();
  });

  it('should remove projected content when closed and restore when opened', () => {
    // Initially closed -> no children should remain directly under host
    hostComponent.open = false;
    hostComponent.showFooter = true;
    hostComponent.showHeaderActions = true;
    hostFixture.detectChanges();

    // Expect no direct element children (content moved out)
    const firstChildEl = dialogElement.querySelector(':scope > *');
    expect(firstChildEl).toBeNull();

    // Open the dialog -> children should be restored
    hostComponent.open = true;
    hostFixture.detectChanges();

    const restoredDefault = dialogElement.querySelector(':scope > div:not([slot])');
    const restoredFooter = dialogElement.querySelector(':scope > [slot="footer"]');
    const restoredHeaderActions = dialogElement.querySelector(':scope > [slot="header-actions"]');

    expect(restoredDefault).toBeTruthy();
    expect(restoredFooter).toBeTruthy();
    expect(restoredHeaderActions).toBeTruthy();

    // Close again -> children removed
    hostComponent.open = false;
    hostFixture.detectChanges();
    const afterCloseChild = dialogElement.querySelector(':scope > *');
    expect(afterCloseChild).toBeNull();
  });

  it('should support two-way binding on open and update when dialog closes (light dismiss)', (done) => {
    hostComponent.open = true;
    hostComponent.lightDismiss = true;
    hostFixture.detectChanges();

    expect(dialogElement.hasAttribute('open')).toBeTrue();

    // Simulate the dialog closing itself (e.g. via light dismiss) by removing the 'open' attribute
    dialogElement.removeAttribute('open');

    // Allow MutationObserver to run
    setTimeout(() => {
      hostFixture.detectChanges();
      expect(hostComponent.open).toBeFalse();
      done();
    }, 0);
  });

  it('should not close immediately when content changes while opening/open', (done) => {
    // Spy on hide handler to detect unintended close
    spyOn(hostComponent, 'onHide');

    // Start closed with some content
    hostComponent.open = false;
    hostComponent.showFooter = false;
    hostComponent.showHeaderActions = false;
    hostFixture.detectChanges();

    // Open the dialog and dispatch lifecycle events
    hostComponent.open = true;
    hostFixture.detectChanges();

    // Simulate web component firing wa-show and wa-after-show
    dialogElement.dispatchEvent(new Event('wa-show'));
    dialogElement.dispatchEvent(new Event('wa-after-show'));

    // Now, while open, toggle some bound content (this used to cause immediate close)
    hostComponent.showFooter = true;
    hostComponent.showHeaderActions = true;
    hostComponent.label = 'Dynamic Label';
    hostFixture.detectChanges();

    // Give MutationObserver microtask queue a tick
    setTimeout(() => {
      hostFixture.detectChanges();

      // Ensure no hide was triggered
      expect(hostComponent.onHide).not.toHaveBeenCalled();

      // Ensure content remains present
      const restoredDefault = dialogElement.querySelector(':scope > div:not([slot])');
      const restoredFooter = dialogElement.querySelector(':scope > [slot="footer"]');
      const restoredHeaderActions = dialogElement.querySelector(':scope > [slot="header-actions"]');
      expect(restoredDefault).toBeTruthy();
      expect(restoredFooter).toBeTruthy();
      expect(restoredHeaderActions).toBeTruthy();

      done();
    }, 0);
  });
});


// Additional host components for alias testing
@Component({
  template: `<wa-dialog [light-dismiss]="ld"></wa-dialog>`,
  standalone: true,
  imports: [WaDialogDirective]
})
class KebabCaseHostComponent { ld = true; }

@Component({
  template: `<wa-dialog [lightdismiss]="ld"></wa-dialog>`,
  standalone: true,
  imports: [WaDialogDirective]
})
class NoDashHostComponent { ld = true; }

// Additional tests for input aliasing
describe('WaDialogDirective input aliasing', () => {
  it('should accept kebab-case [light-dismiss] binding and reflect attribute', async () => {
    await TestBed.configureTestingModule({
      imports: [KebabCaseHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(KebabCaseHostComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('wa-dialog');
    expect(el).toBeTruthy();
    expect(el.hasAttribute('light-dismiss')).toBeTrue();
  });

  it('should accept no-dash [lightdismiss] binding and reflect attribute', async () => {
    await TestBed.configureTestingModule({
      imports: [NoDashHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(NoDashHostComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('wa-dialog');
    expect(el).toBeTruthy();
    expect(el.hasAttribute('light-dismiss')).toBeTrue();
  });
});


// Static attribute host components for testing bare attributes
@Component({
  template: `<wa-dialog light-dismiss></wa-dialog>`,
  standalone: true,
  imports: [WaDialogDirective]
})
class StaticKebabHostComponent {}

@Component({
  template: `<wa-dialog lightdismiss></wa-dialog>`,
  standalone: true,
  imports: [WaDialogDirective]
})
class StaticNoDashHostComponent {}

// Tests for static/bare attribute presence
describe('WaDialogDirective static attribute handling', () => {
  it('should reflect bare light-dismiss attribute on rendered element', async () => {
    await TestBed.configureTestingModule({
      imports: [StaticKebabHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(StaticKebabHostComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('wa-dialog');
    expect(el).toBeTruthy();
    expect(el.hasAttribute('light-dismiss')).toBeTrue();
  });

  it('should accept bare no-dash lightdismiss and reflect as light-dismiss', async () => {
    await TestBed.configureTestingModule({
      imports: [StaticNoDashHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(StaticNoDashHostComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('wa-dialog');
    expect(el).toBeTruthy();
    expect(el.hasAttribute('light-dismiss')).toBeTrue();
  });
});
