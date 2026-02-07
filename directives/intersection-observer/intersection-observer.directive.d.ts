import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaIntersectionObserverDirective
 *
 * Angular wrapper for the <wa-intersection-observer> WebAwesome component.
 *
 * Features:
 * - Binds threshold and rootMargin inputs
 * - Re-emits wa-change events
 * - Supports default slot projection (observed content)
 */
export declare class WaIntersectionObserverDirective implements OnInit, OnChanges {
    threshold?: number | number[] | string;
    rootMargin?: string;
    disabled?: boolean | string;
    waChange: EventEmitter<CustomEvent<any>>;
    private el;
    private renderer;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    private setAttr;
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaIntersectionObserverDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaIntersectionObserverDirective, "wa-intersection-observer", never, { "threshold": { "alias": "threshold"; "required": false; }; "rootMargin": { "alias": "rootMargin"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "waChange": "wa-change"; }, never, never, true, never>;
}
//# sourceMappingURL=intersection-observer.directive.d.ts.map