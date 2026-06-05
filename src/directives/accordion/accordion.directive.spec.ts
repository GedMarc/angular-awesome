import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaAccordionDirective } from './accordion.directive';
import { WaAccordionItemDirective } from './accordion-item.directive';

@Component({
  template: `
    <wa-accordion
      [mode]="mode"
      [iconPlacement]="iconPlacement"
      [headingLevel]="headingLevel"
      [appearance]="appearance"
      (wa-expand)="onExpand($event)"
      (wa-after-expand)="onAfterExpand($event)"
      (wa-collapse)="onCollapse($event)"
      (wa-after-collapse)="onAfterCollapse($event)"
    >
      <wa-accordion-item label="Item 1">Content 1</wa-accordion-item>
    </wa-accordion>
  `,
  standalone: true,
  imports: [WaAccordionDirective, WaAccordionItemDirective]
})
class TestHostComponent {
  mode?: string;
  iconPlacement?: string;
  headingLevel?: string | number;
  appearance?: string;

  onExpand(_: Event) {}
  onAfterExpand(_: Event) {}
  onCollapse(_: Event) {}
  onAfterCollapse(_: Event) {}
}

describe('WaAccordionDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let accordionElement: HTMLElement;
  let accordionDirective: WaAccordionDirective;

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

    accordionElement = hostFixture.nativeElement.querySelector('wa-accordion');
    accordionDirective = hostFixture.debugElement.query(sel => sel.nativeElement === accordionElement).injector.get(WaAccordionDirective);
  });

  it('should create the accordion directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(accordionElement).toBeTruthy();
    expect(accordionDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.mode = 'single';
    hostComponent.iconPlacement = 'start';
    hostComponent.headingLevel = 2;
    hostComponent.appearance = 'filled';
    hostFixture.detectChanges();

    expect(accordionElement.getAttribute('mode')).toBe('single');
    expect(accordionElement.getAttribute('icon-placement')).toBe('start');
    expect(accordionElement.getAttribute('heading-level')).toBe('2');
    expect(accordionElement.getAttribute('appearance')).toBe('filled');
  });

  it('should expose the native element', () => {
    expect(accordionDirective.nativeElement).toBe(accordionElement);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onExpand');
    spyOn(hostComponent, 'onAfterExpand');
    spyOn(hostComponent, 'onCollapse');
    spyOn(hostComponent, 'onAfterCollapse');

    accordionElement.dispatchEvent(new Event('wa-expand'));
    accordionElement.dispatchEvent(new Event('wa-after-expand'));
    accordionElement.dispatchEvent(new Event('wa-collapse'));
    accordionElement.dispatchEvent(new Event('wa-after-collapse'));

    expect(hostComponent.onExpand).toHaveBeenCalled();
    expect(hostComponent.onAfterExpand).toHaveBeenCalled();
    expect(hostComponent.onCollapse).toHaveBeenCalled();
    expect(hostComponent.onAfterCollapse).toHaveBeenCalled();
  });

  it('should expose expandAll() and collapseAll() methods', () => {
    (accordionElement as any).expandAll = jasmine.createSpy('expandAll');
    (accordionElement as any).collapseAll = jasmine.createSpy('collapseAll');

    accordionDirective.expandAll();
    expect((accordionElement as any).expandAll).toHaveBeenCalled();

    accordionDirective.collapseAll();
    expect((accordionElement as any).collapseAll).toHaveBeenCalled();
  });
});


