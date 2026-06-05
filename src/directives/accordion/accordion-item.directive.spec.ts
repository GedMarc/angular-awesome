import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaAccordionItemDirective } from './accordion-item.directive';

@Component({
  template: `
    <wa-accordion-item
      [label]="label"
      [expanded]="expanded"
      [disabled]="disabled"
      [spacing]="spacing"
      [dividerColor]="dividerColor"
      (openChange)="onOpenChange($event)"
    >
      Item content here
    </wa-accordion-item>
  `,
  standalone: true,
  imports: [WaAccordionItemDirective]
})
class TestHostComponent {
  label?: string;
  expanded?: boolean | string;
  disabled?: boolean | string;
  spacing?: string;
  dividerColor?: string;

  onOpenChange(_: boolean) {}
}

describe('WaAccordionItemDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let itemElement: HTMLElement;
  let itemDirective: WaAccordionItemDirective;

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

    itemElement = hostFixture.nativeElement.querySelector('wa-accordion-item');
    itemDirective = hostFixture.debugElement.query(sel => sel.nativeElement === itemElement).injector.get(WaAccordionItemDirective);
  });

  it('should create the accordion-item directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(itemElement).toBeTruthy();
    expect(itemDirective).toBeTruthy();
  });

  it('should set the label attribute correctly', () => {
    hostComponent.label = 'Section A';
    hostFixture.detectChanges();
    expect(itemElement.getAttribute('label')).toBe('Section A');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.expanded = true;
    hostComponent.disabled = true;
    hostFixture.detectChanges();

    expect(itemElement.hasAttribute('expanded')).toBeTrue();
    expect(itemElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.expanded = false;
    hostComponent.disabled = false;
    hostFixture.detectChanges();

    expect(itemElement.hasAttribute('expanded')).toBeFalse();
    expect(itemElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should set CSS custom properties', () => {
    hostComponent.spacing = '1rem';
    hostComponent.dividerColor = 'red';
    hostFixture.detectChanges();

    expect(itemElement.style.getPropertyValue('--spacing')).toBe('1rem');
    expect(itemElement.style.getPropertyValue('--wa-accordion-divider-color')).toBe('red');
  });

  it('should emit openChange on expand/collapse', () => {
    spyOn(hostComponent, 'onOpenChange');

    itemElement.dispatchEvent(new Event('wa-after-expand'));
    expect(hostComponent.onOpenChange).toHaveBeenCalledWith(true);

    itemElement.dispatchEvent(new Event('wa-after-collapse'));
    expect(hostComponent.onOpenChange).toHaveBeenCalledWith(false);
  });

  it('should expose expand(), collapse(), and toggle() methods', () => {
    (itemElement as any).expand = jasmine.createSpy('expand');
    (itemElement as any).collapse = jasmine.createSpy('collapse');
    (itemElement as any).toggle = jasmine.createSpy('toggle');

    itemDirective.expand();
    expect((itemElement as any).expand).toHaveBeenCalled();

    itemDirective.collapse();
    expect((itemElement as any).collapse).toHaveBeenCalled();

    itemDirective.toggle();
    expect((itemElement as any).toggle).toHaveBeenCalled();
  });

  it('should project content correctly', () => {
    expect(itemElement.textContent).toContain('Item content here');
  });
});

