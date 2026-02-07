import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WaToastContainerComponent } from './toast-container.component';
import { WaToastService, WA_TOAST_CONFIG } from '../../services/toast/toast.service';

function getAttr(el: Element, name: string): string | null {
  return el.getAttribute(name);
}

describe('WaToastContainerComponent', () => {
  let fixture: ComponentFixture<WaToastContainerComponent>;
  let component: WaToastContainerComponent;
  let service: WaToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaToastContainerComponent],
      providers: [
        { provide: WA_TOAST_CONFIG, useValue: { position: 'bottom-left', max: 3, duration: 0, newestOnTop: true } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WaToastContainerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(WaToastService);
  });

  it('uses default position top-right when no @Input provided', () => {
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(getAttr(host, 'data-pos')).toBe('top-right');

    const stack = host.querySelector('.wa-toast-stack') as HTMLElement;
    expect(getAttr(stack, 'data-position')).toBe('top-right');
  });

  it('accepts @Input position and overrides service config', () => {
    component.position = 'top-center' as any;
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(getAttr(host, 'data-pos')).toBe('top-center');

    const stack = host.querySelector('.wa-toast-stack') as HTMLElement;
    expect(getAttr(stack, 'data-position')).toBe('top-center');
  });

  it('renders callouts for visible toasts with default appearance and size; close button removes', () => {
    fixture.detectChanges();

    service.show('Hello World', { closable: true, appearance: undefined, size: undefined });
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    const callouts = host.querySelectorAll('wa-callout');
    expect(callouts.length).toBe(1);

    // Defaults applied by template bindings
    const callout = callouts[0] as HTMLElement;
    expect(getAttr(callout, 'appearance')).toBe('filled');
    expect(getAttr(callout, 'size')).toBe('medium');
    expect(getAttr(callout, 'variant')).toBeNull();

    // Close button
    const closeBtn = host.querySelector('.wa-toast__close') as HTMLButtonElement;
    expect(closeBtn).withContext('close button should exist').not.toBeNull();
    closeBtn.click();
    fixture.detectChanges();

    expect(host.querySelectorAll('wa-callout').length).toBe(0);
  });

  it('orders toasts by newestOnTop when true', () => {
    fixture.detectChanges();

    service.setConfig({ newestOnTop: true, max: 5 });
    service.show('First');
    service.show('Second');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    const messages = Array.from(host.querySelectorAll('.wa-toast__message')).map(e => e.textContent?.trim());
    expect(messages).toEqual(['Second', 'First']);
  });

  it('auto-dismisses toasts when duration > 0', fakeAsync(() => {
    fixture.detectChanges();
    service.setConfig({ duration: 5 });
    service.show('Auto');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('wa-callout').length).toBe(1);

    tick(6);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('wa-callout').length).toBe(0);
  }));
});
