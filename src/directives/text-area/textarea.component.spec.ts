import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaTextareaComponent } from './textarea.component';

describe('WaTextareaComponent', () => {
  let fixture: ComponentFixture<WaTextareaComponent>;
  let component: WaTextareaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaTextareaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WaTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle native input event once, update value and emit outputs', () => {
    const el = fixture.nativeElement as HTMLElement;

    const inputSpy = spyOn(component, 'handleInput').and.callThrough();
    const waInputSpy = jasmine.createSpy('waInput');
    const valueChangeSpy = jasmine.createSpy('valueChange');
    component.waInput.subscribe(waInputSpy);
    component.valueChange.subscribe(valueChangeSpy);

    // Dispatch a native input event with target.value
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: 'hello' } });
    el.dispatchEvent(event);
    fixture.detectChanges();

    expect(inputSpy).toHaveBeenCalledTimes(1);
    expect(waInputSpy).toHaveBeenCalledTimes(1);
    expect(valueChangeSpy).toHaveBeenCalledWith('hello');
  });

  it('should handle custom wa-input event once and emit waInput (no recursion)', () => {
    const el = fixture.nativeElement as HTMLElement;
    const inputSpy = spyOn(component, 'handleInput').and.callThrough();
    const waInputSpy = jasmine.createSpy('waInput');
    component.waInput.subscribe(waInputSpy);

    const event = new CustomEvent('wa-input', { bubbles: true });
    // mimic target with a value
    Object.defineProperty(event, 'target', { value: { value: 'x' } });
    el.dispatchEvent(event);
    fixture.detectChanges();

    expect(inputSpy).toHaveBeenCalledTimes(1);
    expect(waInputSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit focus and blur events and call onTouched on blur', () => {
    const el = fixture.nativeElement as HTMLElement;
    const focusSpy = jasmine.createSpy('focus');
    const blurSpy = jasmine.createSpy('blur');
    const touchedSpy = spyOn(component, 'onTouched').and.callThrough();
    component.waFocus.subscribe(focusSpy);
    component.waBlur.subscribe(blurSpy);

    const focusEvent = new FocusEvent('focus');
    el.dispatchEvent(focusEvent);
    fixture.detectChanges();
    expect(focusSpy).toHaveBeenCalledTimes(1);

    const blurEvent = new FocusEvent('blur');
    el.dispatchEvent(blurEvent);
    fixture.detectChanges();
    expect(blurSpy).toHaveBeenCalledTimes(1);
    expect(touchedSpy).toHaveBeenCalledTimes(1);
  });
});
