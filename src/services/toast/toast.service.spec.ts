import { TestBed } from '@angular/core/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { WaToastService, WA_TOAST_CONFIG } from './toast.service';
import { Toast } from './toast.types';

function lastValue<T>(service: WaToastService): T[] {
  let latest: T[] = [] as any;
  const sub = service.toasts$.subscribe(v => (latest = v as any));
  sub.unsubscribe();
  return latest;
}

describe('WaToastService', () => {
  let service: WaToastService;

  function getToasts(): Toast[] {
    let latest: Toast[] = [];
    const sub = service.toasts$.subscribe(v => (latest = v));
    sub.unsubscribe();
    return latest;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WaToastService,
        { provide: WA_TOAST_CONFIG, useValue: { position: 'top-right', max: 2, duration: 100, newestOnTop: true } }
      ]
    });
    service = TestBed.inject(WaToastService);
  });

  it('show should return an id and emit visible list', () => {
    const id = service.show('Hello');
    expect(typeof id).toBe('string');
    const items = getToasts();
    expect(items.length).toBe(1);
    expect(items[0].message).toBe('Hello');
  });

  it('enforces max visible and queues overflow; closes backfill from queue', () => {
    // max=2 from provider
    const a = service.show('A');
    const b = service.show('B');
    const c = service.show('C');

    let items = getToasts();
    expect(items.map(t => t.message)).toEqual(['B', 'A']); // newestOnTop true

    // C should be queued
    expect(items.find(t => t.message === 'C')).toBeUndefined();

    // Close one visible; queued item should appear
    service.close(a);
    items = getToasts();
    // Visible should now contain B and C
    expect(items.map(t => t.message).sort()).toEqual(['B', 'C']);
  });

  it('auto-dismisses when duration > 0', fakeAsync(() => {
    service.setConfig({ duration: 10 });
    service.show('Timed');
    expect(getToasts().length).toBe(1);
    tick(11);
    expect(getToasts().length).toBe(0);
  }));

  it('sticky when duration <= 0', fakeAsync(() => {
    service.show('Sticky', { duration: 0 });
    expect(getToasts().length).toBe(1);
    tick(1000);
    expect(getToasts().length).toBe(1);
  }));

  it('honors newestOnTop ordering', () => {
    service.clearAll();
    service.setConfig({ newestOnTop: false, max: 5 });
    service.show('First');
    service.show('Second');
    let items = getToasts();
    expect(items.map(t => t.message)).toEqual(['First', 'Second']);

    service.clearAll();
    service.setConfig({ newestOnTop: true, max: 5 });
    service.show('First');
    service.show('Second');
    items = getToasts();
    expect(items.map(t => t.message)).toEqual(['Second', 'First']);
  });

  it('update(id, changes) applies to visible and queued toasts', () => {
    service.clearAll();
    service.setConfig({ max: 1 });
    const id1 = service.show('One');
    const id2 = service.show('Two'); // queued

    service.update(id1, { message: 'One!' });
    service.update(id2, { message: 'Two!' });

    let items = getToasts();
    expect(items[0].message).toBe('One!');

    // Close first, queued item appears with updated message
    service.close(id1);
    items = getToasts();
    expect(items[0].message).toBe('Two!');
  });

  it('clearAll clears timers, visible, and queue', fakeAsync(() => {
    service.setConfig({ duration: 10, max: 1 });
    service.show('One');
    service.show('Two'); // queued
    expect(getToasts().length).toBe(1);
    service.clearAll();
    expect(getToasts().length).toBe(0);
    // advance timers to ensure none fire
    tick(50);
    expect(getToasts().length).toBe(0);
  }));

  it('setConfig affects behavior (max, duration)', fakeAsync(() => {
    service.clearAll();
    service.setConfig({ max: 3, duration: 5 });
    service.show('1');
    service.show('2');
    service.show('3');
    expect(getToasts().length).toBe(3);
    tick(6);
    expect(getToasts().length).toBe(0);
  }));
});
