import { Injectable, InjectionToken, Provider, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_TOAST_CONFIG, Toast, ToastConfig } from './toast.types';

export const WA_TOAST_CONFIG = new InjectionToken<ToastConfig>('WA_TOAST_CONFIG');

export function provideWaToasts(config: ToastConfig = {}): Provider[] {
  return [
    { provide: WA_TOAST_CONFIG, useValue: config }
  ];
}

@Injectable({ providedIn: 'root' })
export class WaToastService {
  private cfg: ToastConfig = { ...DEFAULT_TOAST_CONFIG, ...(inject(WA_TOAST_CONFIG, { optional: true }) || {}) };

  private visible: Toast[] = [];
  private queue: Toast[] = [];
  private timers = new Map<string, any>();

  private subject = new BehaviorSubject<Toast[]>([]);
  public readonly toasts$ = this.subject.asObservable();

  get config(): Readonly<Required<ToastConfig>> {
    return { ...(DEFAULT_TOAST_CONFIG as any), ...(this.cfg as any) } as any;
  }

  setConfig(partial: ToastConfig) {
    this.cfg = { ...this.cfg, ...partial };
    this.emit();
  }

  show(message: string, options: Partial<Omit<Toast, 'id' | 'message' | 'createdAt'>> = {}): string {
    const id = this.uuid();
    const toast: Toast = {
      id,
      message,
      variant: options.variant,
      appearance: options.appearance,
      size: options.size,
      closable: options.closable ?? true,
      duration: options.duration ?? this.config.duration,
      title: options.title,
      createdAt: Date.now()
    };
    this.enqueue(toast);
    return id;
  }

  success(message: string, options: Partial<Omit<Toast, 'id' | 'message' | 'createdAt'>> = {}) {
    return this.show(message, { variant: 'success', ...options });
  }
  warning(message: string, options: Partial<Omit<Toast, 'id' | 'message' | 'createdAt'>> = {}) {
    return this.show(message, { variant: 'warning', ...options });
  }
  danger(message: string, options: Partial<Omit<Toast, 'id' | 'message' | 'createdAt'>> = {}) {
    return this.show(message, { variant: 'danger', ...options });
  }
  brand(message: string, options: Partial<Omit<Toast, 'id' | 'message' | 'createdAt'>> = {}) {
    return this.show(message, { variant: 'brand', ...options });
  }
  neutral(message: string, options: Partial<Omit<Toast, 'id' | 'message' | 'createdAt'>> = {}) {
    return this.show(message, { variant: 'neutral', ...options });
  }

  update(id: string, changes: Partial<Omit<Toast, 'id' | 'createdAt'>>) {
    let updated = false;
    this.visible = this.visible.map(t => {
      if (t.id === id) {
        updated = true;
        return { ...t, ...changes };
      }
      return t;
    });
    if (!updated) {
      this.queue = this.queue.map(t => (t.id === id ? { ...t, ...changes } : t));
    }
    this.emit();
  }

  close(id: string) {
    this.clearTimer(id);
    const idx = this.visible.findIndex(t => t.id === id);
    if (idx !== -1) {
      this.visible.splice(idx, 1);
      this.fillFromQueue();
      this.emit();
      return;
    }
    // If not visible yet, remove from queue
    this.queue = this.queue.filter(t => t.id !== id);
    this.emit();
  }

  clearAll() {
    // clear timers
    for (const id of this.timers.keys()) this.clearTimer(id);
    this.visible = [];
    this.queue = [];
    this.emit();
  }

  private enqueue(toast: Toast) {
    const max = this.config.max;
    if (this.visible.length < max) {
      if (this.config.newestOnTop) {
        this.visible = [toast, ...this.visible];
      } else {
        this.visible = [...this.visible, toast];
      }
      this.startTimerIfNeeded(toast);
      this.emit();
    } else {
      this.queue.push(toast);
    }
  }

  private fillFromQueue() {
    const max = this.config.max;
    while (this.visible.length < max && this.queue.length > 0) {
      const next = this.queue.shift()!;
      if (this.config.newestOnTop) {
        this.visible = [next, ...this.visible];
      } else {
        this.visible = [...this.visible, next];
      }
      this.startTimerIfNeeded(next);
    }
  }

  private startTimerIfNeeded(toast: Toast) {
    const duration = toast.duration ?? this.config.duration;
    if (duration && duration > 0) {
      const handle = setTimeout(() => this.close(toast.id), duration);
      this.timers.set(toast.id, handle);
    }
  }

  private clearTimer(id: string) {
    const handle = this.timers.get(id);
    if (handle) {
      clearTimeout(handle);
      this.timers.delete(id);
    }
  }

  private emit() {
    // sort by createdAt depending on newestOnTop, but keep current order
    // We already maintain order at insertion time; just emit a shallow copy
    this.subject.next([...this.visible]);
  }

  private uuid(): string {
    // Simple RFC4122 v4-ish ID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
