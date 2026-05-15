import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaTreeItemDirective } from './tree-item.directive';

@Component({
  template: `
    <wa-tree-item
      [expanded]="expanded"
      [selected]="selected"
      [disabled]="disabled"
      [lazy]="lazy"
      [value]="value"
      [data]="data"
      [selectionBackgroundColor]="selectionBackgroundColor"
      [selectionIndicatorColor]="selectionIndicatorColor"
      [expandButtonColor]="expandButtonColor"
      [showDuration]="showDuration"
      [hideDuration]="hideDuration"
    >{{ content }}</wa-tree-item>
  `,
  standalone: true,
  imports: [WaTreeItemDirective]
})
class TestHostComponent {
  expanded: boolean | string = false;
  selected: boolean | string = false;
  disabled: boolean | string = false;
  lazy: boolean | string = false;
  value?: any;
  data?: any;
  content = 'Tree Item Label';
  selectionBackgroundColor?: string;
  selectionIndicatorColor?: string;
  expandButtonColor?: string;
  showDuration?: string;
  hideDuration?: string;
}

describe('WaTreeItemDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let itemElement: HTMLElement;
  let directive: WaTreeItemDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    itemElement = hostFixture.nativeElement.querySelector('wa-tree-item');
    directive = hostFixture.debugElement.query(
      sel => sel.nativeElement === itemElement
    ).injector.get(WaTreeItemDirective);
  });

  // ----- Smoke tests -----

  it('should create the tree-item directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(itemElement).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should project content correctly', () => {
    expect(itemElement.textContent?.trim()).toBe('Tree Item Label');

    hostComponent.content = 'Renamed';
    hostFixture.detectChanges();
    expect(itemElement.textContent?.trim()).toBe('Renamed');
  });

  // ----- value attribute -----

  it('should set the value attribute for a string value', () => {
    hostComponent.value = 'node-1';
    hostFixture.detectChanges();
    expect(itemElement.getAttribute('value')).toBe('node-1');
  });

  it('should update the value attribute when it changes', () => {
    hostComponent.value = 'first';
    hostFixture.detectChanges();
    expect(itemElement.getAttribute('value')).toBe('first');

    hostComponent.value = 'second';
    hostFixture.detectChanges();
    expect(itemElement.getAttribute('value')).toBe('second');
  });

  it('should set the value attribute for a numeric value', () => {
    hostComponent.value = 42;
    hostFixture.detectChanges();
    expect(itemElement.getAttribute('value')).toBe('42');
  });

  it('should set the value attribute for a boolean value', () => {
    hostComponent.value = true;
    hostFixture.detectChanges();
    expect(itemElement.getAttribute('value')).toBe('true');
  });

  it('should store data on the native element', () => {
    const payload = { id: 1, name: 'Node' };
    hostComponent.data = payload;
    hostFixture.detectChanges();
    expect((itemElement as any).__waData).toEqual(payload);
  });

  // ----- disabled boolean attribute -----

  it('should set disabled attribute when true', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should not set disabled attribute when false', () => {
    hostComponent.disabled = false;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should set disabled attribute when string "true"', () => {
    hostComponent.disabled = 'true';
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should set disabled attribute when empty string', () => {
    hostComponent.disabled = '';
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should remove disabled attribute when toggled from true to false', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('disabled')).toBeTrue();

    hostComponent.disabled = false;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should remove disabled attribute when toggled from "true" to false', () => {
    hostComponent.disabled = 'true';
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('disabled')).toBeTrue();

    hostComponent.disabled = false;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('disabled')).toBeFalse();
  });

  // ----- selected boolean attribute -----

  it('should set selected attribute when true', () => {
    hostComponent.selected = true;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('selected')).toBeTrue();
  });

  it('should not set selected attribute when false', () => {
    hostComponent.selected = false;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('selected')).toBeFalse();
  });

  it('should set selected attribute when string "true"', () => {
    hostComponent.selected = 'true';
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('selected')).toBeTrue();
  });

  it('should set selected attribute when empty string', () => {
    hostComponent.selected = '';
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('selected')).toBeTrue();
  });

  it('should remove selected attribute when toggled from true to false', () => {
    hostComponent.selected = true;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('selected')).toBeTrue();

    hostComponent.selected = false;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('selected')).toBeFalse();
  });

  it('should remove selected attribute when toggled from "true" to false', () => {
    hostComponent.selected = 'true';
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('selected')).toBeTrue();

    hostComponent.selected = false;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('selected')).toBeFalse();
  });

  // ----- expanded boolean attribute -----

  it('should set expanded attribute when true', () => {
    hostComponent.expanded = true;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('expanded')).toBeTrue();
  });

  it('should not set expanded attribute when false', () => {
    hostComponent.expanded = false;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('expanded')).toBeFalse();
  });

  it('should set expanded attribute when string "true"', () => {
    hostComponent.expanded = 'true';
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('expanded')).toBeTrue();
  });

  it('should set expanded attribute when empty string', () => {
    hostComponent.expanded = '';
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('expanded')).toBeTrue();
  });

  it('should remove expanded attribute when toggled from true to false', () => {
    hostComponent.expanded = true;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('expanded')).toBeTrue();

    hostComponent.expanded = false;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('expanded')).toBeFalse();
  });

  // ----- lazy boolean attribute -----

  it('should set lazy attribute when true', () => {
    hostComponent.lazy = true;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('lazy')).toBeTrue();
  });

  it('should not set lazy attribute when false', () => {
    hostComponent.lazy = false;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('lazy')).toBeFalse();
  });

  it('should set lazy attribute when empty string', () => {
    hostComponent.lazy = '';
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('lazy')).toBeTrue();
  });

  // ----- ngOnChanges-driven updates across multiple cycles -----

  it('should update disabled attribute across multiple change detection cycles', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('disabled')).toBeTrue();

    hostComponent.disabled = false;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('disabled')).toBeFalse();

    hostComponent.disabled = '';
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should update selected attribute across multiple change detection cycles', () => {
    hostComponent.selected = false;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('selected')).toBeFalse();

    hostComponent.selected = true;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('selected')).toBeTrue();

    hostComponent.selected = false;
    hostFixture.detectChanges();
    expect(itemElement.hasAttribute('selected')).toBeFalse();
  });

  it('should reflect all boolean attributes correctly after toggling multiple inputs', () => {
    hostComponent.expanded = true;
    hostComponent.selected = true;
    hostComponent.disabled = false;
    hostComponent.lazy = false;
    hostFixture.detectChanges();

    expect(itemElement.hasAttribute('expanded')).toBeTrue();
    expect(itemElement.hasAttribute('selected')).toBeTrue();
    expect(itemElement.hasAttribute('disabled')).toBeFalse();
    expect(itemElement.hasAttribute('lazy')).toBeFalse();

    // Toggle everything
    hostComponent.expanded = false;
    hostComponent.selected = false;
    hostComponent.disabled = true;
    hostComponent.lazy = true;
    hostFixture.detectChanges();

    expect(itemElement.hasAttribute('expanded')).toBeFalse();
    expect(itemElement.hasAttribute('selected')).toBeFalse();
    expect(itemElement.hasAttribute('disabled')).toBeTrue();
    expect(itemElement.hasAttribute('lazy')).toBeTrue();
  });

  // ----- CSS custom property styling inputs -----

  it('should set CSS custom properties for styling inputs', () => {
    hostComponent.selectionBackgroundColor = 'rgba(0, 0, 255, 0.1)';
    hostComponent.selectionIndicatorColor = 'blue';
    hostComponent.expandButtonColor = 'gray';
    hostComponent.showDuration = '200ms';
    hostComponent.hideDuration = '100ms';
    hostFixture.detectChanges();

    expect(itemElement.style.getPropertyValue('--selection-background-color')).toBe('rgba(0, 0, 255, 0.1)');
    expect(itemElement.style.getPropertyValue('--selection-indicator-color')).toBe('blue');
    expect(itemElement.style.getPropertyValue('--expand-button-color')).toBe('gray');
    expect(itemElement.style.getPropertyValue('--show-duration')).toBe('200ms');
    expect(itemElement.style.getPropertyValue('--hide-duration')).toBe('100ms');
  });
});

