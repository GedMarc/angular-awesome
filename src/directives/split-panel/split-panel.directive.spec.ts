import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaSplitPanelDirective } from './split-panel.directive';

@Component({
  template: `
    <wa-split-panel
      [position]="position"
      [positionInPixels]="positionInPixels"
      [snapThreshold]="snapThreshold"
    ></wa-split-panel>
  `,
  standalone: true,
  imports: [WaSplitPanelDirective]
})
class TestHostComponent {
  position?: number | string;
  positionInPixels?: number | string;
  snapThreshold?: number | string;
}

describe('WaSplitPanelDirective numeric attribute coercion', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('wa-split-panel');
  });

  it('should create the directive', () => {
    expect(el).toBeTruthy();
  });

  it('should set numeric attributes from number values', () => {
    host.position = 25;
    host.positionInPixels = 120;
    host.snapThreshold = 12;
    fixture.detectChanges();

    expect(el.getAttribute('position')).toBe('25');
    expect(el.getAttribute('position-in-pixels')).toBe('120');
    expect(el.getAttribute('snap-threshold')).toBe('12');
  });

  it('should accept string values (standard bindings)', () => {
    host.position = '25';
    host.positionInPixels = '120';
    host.snapThreshold = '12';
    fixture.detectChanges();

    expect(el.getAttribute('position')).toBe('25');
    expect(el.getAttribute('position-in-pixels')).toBe('120');
    expect(el.getAttribute('snap-threshold')).toBe('12');
  });

  it('should ignore non-numeric string values', () => {
    host.position = 'half';
    fixture.detectChanges();
    expect(el.hasAttribute('position')).toBeFalse();
  });
});

