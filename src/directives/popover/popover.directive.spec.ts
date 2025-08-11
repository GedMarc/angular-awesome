import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WaPopoverDirective } from './popover.directive';

@Component({
  template: `
    <wa-popover
      #popover
      [anchor]="anchorId"
      [active]="isActive"
      [placement]="placement"
      [distance]="distance"
      [arrow]="showArrow"
      (waReposition)="onReposition($event)"
    >
      <div class="popover-content">Test Popover Content</div>
    </wa-popover>
    <button #anchorButton id="test-anchor">Anchor Button</button>
  `,
  standalone: true,
  imports: [WaPopoverDirective]
})
class TestComponent {
  anchorId = 'test-anchor';
  isActive = true;
  placement = 'top';
  distance = 10;
  showArrow = true;
  repositionCount = 0;

  onReposition(event: CustomEvent) {
    this.repositionCount++;
  }
}

describe('WaPopoverDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let popoverElement: HTMLElement;
  let directive: WaPopoverDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.directive(WaPopoverDirective));
    popoverElement = debugElement.nativeElement;
    directive = debugElement.injector.get(WaPopoverDirective);
  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should set anchor attribute', () => {
    expect(popoverElement.getAttribute('anchor')).toBe('test-anchor');
  });

  it('should set active attribute when isActive is true', () => {
    expect(popoverElement.hasAttribute('active')).toBeTrue();
  });

  it('should remove active attribute when isActive is false', () => {
    component.isActive = false;
    fixture.detectChanges();
    expect(popoverElement.hasAttribute('active')).toBeFalse();
  });

  it('should set placement attribute', () => {
    expect(popoverElement.getAttribute('placement')).toBe('top');
  });

  it('should set distance attribute', () => {
    expect(popoverElement.getAttribute('distance')).toBe('10');
  });

  it('should set arrow attribute when showArrow is true', () => {
    expect(popoverElement.hasAttribute('arrow')).toBeTrue();
  });

  it('should remove arrow attribute when showArrow is false', () => {
    component.showArrow = false;
    fixture.detectChanges();
    expect(popoverElement.hasAttribute('arrow')).toBeFalse();
  });

  it('should update attributes when inputs change', () => {
    component.placement = 'bottom';
    component.distance = 20;
    fixture.detectChanges();

    expect(popoverElement.getAttribute('placement')).toBe('bottom');
    expect(popoverElement.getAttribute('distance')).toBe('20');
  });

  it('should expose the native element', () => {
    expect(directive.nativeElement).toBe(popoverElement);
  });

  it('should call reposition method on the native element', () => {
    // Mock the reposition method on the native element
    const spy = spyOn(popoverElement as any, 'reposition');

    directive.reposition();

    expect(spy).toHaveBeenCalled();
  });

  // Note: Testing the waReposition event would require simulating the native 'reposition' event,
  // which is challenging in a unit test environment. This would be better tested in an integration test.
});
