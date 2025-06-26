import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WaPopupDirective } from './popup.directive';

@Component({
  template: `
    <wa-popup
      #popup
      [anchor]="anchorId"
      [active]="isActive"
      [placement]="placement"
      [distance]="distance"
      [arrow]="showArrow"
      (waReposition)="onReposition($event)"
    >
      <div class="popup-content">Test Popup Content</div>
    </wa-popup>
    <button #anchorButton id="test-anchor">Anchor Button</button>
  `,
  standalone: true,
  imports: [WaPopupDirective]
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

describe('WaPopupDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let popupElement: HTMLElement;
  let directive: WaPopupDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.directive(WaPopupDirective));
    popupElement = debugElement.nativeElement;
    directive = debugElement.injector.get(WaPopupDirective);
  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should set anchor attribute', () => {
    expect(popupElement.getAttribute('anchor')).toBe('test-anchor');
  });

  it('should set active attribute when isActive is true', () => {
    expect(popupElement.hasAttribute('active')).toBeTrue();
  });

  it('should remove active attribute when isActive is false', () => {
    component.isActive = false;
    fixture.detectChanges();
    expect(popupElement.hasAttribute('active')).toBeFalse();
  });

  it('should set placement attribute', () => {
    expect(popupElement.getAttribute('placement')).toBe('top');
  });

  it('should set distance attribute', () => {
    expect(popupElement.getAttribute('distance')).toBe('10');
  });

  it('should set arrow attribute when showArrow is true', () => {
    expect(popupElement.hasAttribute('arrow')).toBeTrue();
  });

  it('should remove arrow attribute when showArrow is false', () => {
    component.showArrow = false;
    fixture.detectChanges();
    expect(popupElement.hasAttribute('arrow')).toBeFalse();
  });

  it('should update attributes when inputs change', () => {
    component.placement = 'bottom';
    component.distance = 20;
    fixture.detectChanges();

    expect(popupElement.getAttribute('placement')).toBe('bottom');
    expect(popupElement.getAttribute('distance')).toBe('20');
  });

  it('should expose the native element', () => {
    expect(directive.nativeElement).toBe(popupElement);
  });

  it('should call reposition method on the native element', () => {
    // Mock the reposition method on the native element
    const spy = spyOn(popupElement as any, 'reposition');

    directive.reposition();

    expect(spy).toHaveBeenCalled();
  });

  // Note: Testing the waReposition event would require simulating the native 'reposition' event,
  // which is challenging in a unit test environment. This would be better tested in an integration test.
});
