import { InjectionToken, Provider } from '@angular/core';
import { Toast, ToastConfig } from './toast.types';
import * as i0 from "@angular/core";
export declare const WA_TOAST_CONFIG: InjectionToken<ToastConfig>;
export declare function provideWaToasts(config?: ToastConfig): Provider[];
export declare class WaToastService {
    private cfg;
    private visible;
    private queue;
    private timers;
    private subject;
    readonly toasts$: import("rxjs").Observable<Toast[]>;
    get config(): Readonly<Required<ToastConfig>>;
    setConfig(partial: ToastConfig): void;
    show(message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'createdAt'>>): string;
    success(message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'createdAt'>>): string;
    warning(message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'createdAt'>>): string;
    danger(message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'createdAt'>>): string;
    brand(message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'createdAt'>>): string;
    neutral(message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'createdAt'>>): string;
    update(id: string, changes: Partial<Omit<Toast, 'id' | 'createdAt'>>): void;
    close(id: string): void;
    clearAll(): void;
    private enqueue;
    private fillFromQueue;
    private startTimerIfNeeded;
    private clearTimer;
    private emit;
    private uuid;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaToastService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WaToastService>;
}
//# sourceMappingURL=toast.service.d.ts.map