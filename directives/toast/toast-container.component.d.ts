import { OnDestroy, OnInit } from '@angular/core';
import { Toast, ToastPosition } from '../../services/toast/toast.types';
import * as i0 from "@angular/core";
export declare class WaToastContainerComponent implements OnInit, OnDestroy {
    private service;
    private positionSig;
    set position(value: ToastPosition | undefined);
    positionValue: import("@angular/core").Signal<ToastPosition>;
    get posAttr(): ToastPosition;
    toasts: import("@angular/core").WritableSignal<Toast[]>;
    private subscription?;
    ngOnInit(): void;
    ngOnDestroy(): void;
    close(t: Toast): void;
    trackById: (_: number, t: Toast) => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaToastContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaToastContainerComponent, "wa-toast-container", never, { "position": { "alias": "position"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=toast-container.component.d.ts.map