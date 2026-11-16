import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WaToastContainerComponent } from './toast-container.component';
import { WaToastService, WA_TOAST_CONFIG } from '../../services/toast/toast.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  template: '<ng-template #actions><strong>Upload complete</strong><br><a href="/files">View file</a> <button (click)="claimed = true">Claim</button></ng-template>'
})
class ToastContentHost {
  @ViewChild('actions', { static: true }) content!: TemplateRef<unknown>;
  claimed = false;
}

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
        { provide: WA_TOAST_CONFIG, useValue: { placement: 'bottom-start', max: 3, duration: 0, newestOnTop: true } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WaToastContainerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(WaToastService);
  });

  it('uses default placement top-end when no @Input provided', () => {
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    const waToast = host.querySelector('wa-toast') as HTMLElement;
    expect(waToast).not.toBeNull();
    expect(getAttr(waToast, 'placement')).toBe('top-end');
  });

  it('accepts @Input placement and overrides service config', () => {
    component.placement = 'top-center';
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    const waToast = host.querySelector('wa-toast') as HTMLElement;
    expect(getAttr(waToast, 'placement')).toBe('top-center');
  });

  it('renders wa-toast-item elements for visible toasts with default variant and size', () => {
    fixture.detectChanges();

    service.show('Hello World');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    const toastItems = host.querySelectorAll('wa-toast-item');
    expect(toastItems.length).toBe(1);

    // Defaults applied by template bindings
    const toastItem = toastItems[0] as HTMLElement;
    expect(getAttr(toastItem, 'variant')).toBe('neutral');
    expect(getAttr(toastItem, 'size')).toBe('medium');
  });

  it('renders toast items with correct variant when specified', () => {
    fixture.detectChanges();

    service.success('Success!');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    const toastItem = host.querySelector('wa-toast-item') as HTMLElement;
    expect(getAttr(toastItem, 'variant')).toBe('success');
    expect(getAttr(toastItem.querySelector('wa-icon')!, 'name')).toBe('check');
  });

  it('uses an explicit icon and can suppress the default icon', () => {
    fixture.detectChanges();
    service.success('Uploaded', { icon: 'cloud-arrow-up' });
    service.danger('Hidden icon', { icon: null });
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('wa-toast-item');
    expect(getAttr(items[1].querySelector('wa-icon')!, 'name')).toBe('cloud-arrow-up');
    expect(getAttr(items[1].querySelector('wa-icon')!, 'slot')).toBe('icon');
    expect(items[0].querySelector('wa-icon')).toBeNull();
  });

  it('renders template content with working links and actions', () => {
    const host = TestBed.createComponent(ToastContentHost);
    host.detectChanges();
    fixture.detectChanges();
    service.showContent(host.componentInstance.content, { variant: 'brand', icon: 'gift' });
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('wa-toast-item') as HTMLElement;
    expect(item.querySelector('strong')?.textContent).toBe('Upload complete');
    expect(item.querySelector('a')?.getAttribute('href')).toBe('/files');
    expect(item.querySelector('wa-icon')?.getAttribute('name')).toBe('gift');
    item.querySelector('button')?.click();
    expect(host.componentInstance.claimed).toBeTrue();
  });

  it('close removes a toast item from the display', () => {
    fixture.detectChanges();

    const id = service.show('To close');
    fixture.detectChanges();

    let toastItems = fixture.nativeElement.querySelectorAll('wa-toast-item');
    expect(toastItems.length).toBe(1);

    service.close(id);
    fixture.detectChanges();

    toastItems = fixture.nativeElement.querySelectorAll('wa-toast-item');
    expect(toastItems.length).toBe(0);
  });

  it('orders toasts by newestOnTop when true', () => {
    fixture.detectChanges();

    service.setConfig({ newestOnTop: true, max: 5 });
    service.show('First');
    service.show('Second');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    const toastItems = Array.from(host.querySelectorAll('wa-toast-item'));
    const messages = toastItems.map(e => e.textContent?.trim());
    expect(messages).toEqual(['Second', 'First']);
  });

  it('auto-dismisses toasts when duration > 0', fakeAsync(() => {
    fixture.detectChanges();
    service.setConfig({ duration: 5 });
    service.show('Auto');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('wa-toast-item').length).toBe(1);

    tick(6);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('wa-toast-item').length).toBe(0);
  }));

  it('renders title in strong tag when toast has a title', () => {
    fixture.detectChanges();

    service.show('Body text', { title: 'Title' });
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    const strong = host.querySelector('wa-toast-item strong');
    expect(strong).not.toBeNull();
    expect(strong?.textContent?.trim()).toBe('Title');
  });

  it('sets data-toast-id attribute on each toast item', () => {
    fixture.detectChanges();

    const id = service.show('Tracked');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    const toastItem = host.querySelector('wa-toast-item') as HTMLElement;
    expect(getAttr(toastItem, 'data-toast-id')).toBe(id);
  });

  it('renders multiple toast items up to max', () => {
    fixture.detectChanges();
    service.setConfig({ max: 3 });

    service.show('One');
    service.show('Two');
    service.show('Three');
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('wa-toast-item');
    expect(items.length).toBe(3);
  });

  it('queues toasts beyond max and backfills on close', () => {
    fixture.detectChanges();
    service.setConfig({ max: 1 });

    const id1 = service.show('Visible');
    service.show('Queued');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('wa-toast-item').length).toBe(1);

    service.close(id1);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('wa-toast-item');
    expect(items.length).toBe(1);
    expect(items[0].textContent?.trim()).toBe('Queued');
  });
});
