import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaDetailsDirective } from './details.directive';

@Component({
  template: `
    <wa-details
      [summary]="summary"
      [disabled]="disabled"
      [appearance]="appearance"
      [open]="open"
      [iconPlacement]="iconPlacement"
      [name]="name"
      [iconColor]="iconColor"
      [spacing]="spacing"
      (wa-show)="onShow($event)"
      (wa-after-show)="onAfterShow($event)"
      (wa-hide)="onHide($event)"
      (wa-after-hide)="onAfterHide($event)"
    >
      Details content here
    </wa-details>
  `,
  standalone: true,
  imports: [WaDetailsDirective]
})
class TestHostComponent {
  summary?: string;
  disabled?: boolean | string;
  appearance?: string;
  open?: boolean | string;
  iconPlacement?: 'start' | 'end' | string;
  name?: string;
  iconColor?: string;
  spacing?: string;

  onShow(_: Event) {}
  onAfterShow(_: Event) {}
  onHide(_: Event) {}
  onAfterHide(_: Event) {}
}

describe('WaDetailsDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let detailsElement: HTMLElement;
  let detailsDirective: WaDetailsDirective;

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

    detailsElement = hostFixture.nativeElement.querySelector('wa-details');
    detailsDirective = hostFixture.debugElement.query(sel => sel.nativeElement === detailsElement).injector.get(WaDetailsDirective);
  });

  it('should create the details directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(detailsElement).toBeTruthy();
    expect(detailsDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.summary = 'Click to expand';
    hostComponent.appearance = 'filled';
    hostComponent.name = 'details-group';
    hostFixture.detectChanges();

    expect(detailsElement.getAttribute('summary')).toBe('Click to expand');
    expect(detailsElement.getAttribute('appearance')).toBe('filled');
    expect(detailsElement.getAttribute('name')).toBe('details-group');
  });

  it('should set icon-placement attribute correctly', () => {
    hostComponent.iconPlacement = 'start';
    hostFixture.detectChanges();
    expect(detailsElement.getAttribute('icon-placement')).toBe('start');

    hostComponent.iconPlacement = 'end';
    hostFixture.detectChanges();
    expect(detailsElement.getAttribute('icon-placement')).toBe('end');
  });

  it('should support deprecated iconPosition alias', () => {
    // Set via the directive's deprecated setter
    detailsDirective.iconPosition = 'end';
    // Trigger ngOnChanges manually since we're setting directly on the directive
    detailsDirective.ngOnChanges({});
    hostFixture.detectChanges();
    expect(detailsElement.getAttribute('icon-placement')).toBe('end');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.disabled = true;
    hostComponent.open = true;
    hostFixture.detectChanges();

    expect(detailsElement.hasAttribute('disabled')).toBeTrue();
    expect(detailsElement.hasAttribute('open')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.disabled = false;
    hostComponent.open = false;
    hostFixture.detectChanges();

    expect(detailsElement.hasAttribute('disabled')).toBeFalse();
    expect(detailsElement.hasAttribute('open')).toBeFalse();
  });

  it('should set CSS custom properties', () => {
    hostComponent.iconColor = 'red';
    hostComponent.spacing = '1rem';
    hostFixture.detectChanges();

    expect(detailsElement.style.getPropertyValue('--icon-color')).toBe('red');
    expect(detailsElement.style.getPropertyValue('--spacing')).toBe('1rem');
  });

  it('should expose the native element', () => {
    expect(detailsDirective.nativeElement).toBe(detailsElement);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onShow');
    spyOn(hostComponent, 'onAfterShow');
    spyOn(hostComponent, 'onHide');
    spyOn(hostComponent, 'onAfterHide');

    detailsElement.dispatchEvent(new Event('wa-show'));
    detailsElement.dispatchEvent(new Event('wa-after-show'));
    detailsElement.dispatchEvent(new Event('wa-hide'));
    detailsElement.dispatchEvent(new Event('wa-after-hide'));

    expect(hostComponent.onShow).toHaveBeenCalled();
    expect(hostComponent.onAfterShow).toHaveBeenCalled();
    expect(hostComponent.onHide).toHaveBeenCalled();
    expect(hostComponent.onAfterHide).toHaveBeenCalled();
  });

  it('should expose show() and hide() methods', () => {
    (detailsElement as any).show = jasmine.createSpy('show');
    (detailsElement as any).hide = jasmine.createSpy('hide');

    detailsDirective.show();
    expect((detailsElement as any).show).toHaveBeenCalled();

    detailsDirective.hide();
    expect((detailsElement as any).hide).toHaveBeenCalled();
  });

  it('should project content correctly', () => {
    expect(detailsElement.textContent).toContain('Details content here');
  });
});


