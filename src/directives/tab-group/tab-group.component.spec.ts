import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaTabGroupComponent } from './tab-group.component';

describe('WaTabGroupComponent', () => {
  let fixture: ComponentFixture<WaTabGroupComponent>;
  let component: WaTabGroupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaTabGroupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WaTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should reflect active attribute when value set', () => {
    component.value = 'tab-a';
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('active')).toBe('tab-a');
  });

  it('should emit waTabShow and update value when wa-tab-show DOM event fires (no recursion)', () => {
    const el = fixture.nativeElement as HTMLElement;

    const showSpy = jasmine.createSpy('showSpy');
    const handlerSpy = spyOn(component, 'onTabShow').and.callThrough();
    component.waTabShow.subscribe(showSpy);

    const ev = new CustomEvent('wa-tab-show', { detail: { name: 'tab-1' }, bubbles: true });
    el.dispatchEvent(ev);
    fixture.detectChanges();

    // Handler should be called exactly once for one DOM event
    expect(handlerSpy).toHaveBeenCalledTimes(1);
    // Output should have emitted once with the same event
    expect(showSpy).toHaveBeenCalledTimes(1);
    expect(component.value).toBe('tab-1');
    // Ensure that after setting value and emitting output, we did not re-enter
    expect(handlerSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit waTabHide when wa-tab-hide DOM event fires', () => {
    const el = fixture.nativeElement as HTMLElement;
    const hideSpy = jasmine.createSpy('hideSpy');
    component.waTabHide.subscribe(hideSpy);

    const ev = new CustomEvent('wa-tab-hide', { detail: { name: 'tab-1' }, bubbles: true });
    el.dispatchEvent(ev);
    fixture.detectChanges();

    expect(hideSpy).toHaveBeenCalledTimes(1);
  });
});
