import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaMutationObserverDirective
 *
 * Angular wrapper for the <wa-mutation-observer> WebAwesome component.
 *
 * Features:
 * - Binds target and options inputs
 * - Re-emits wa-mutation events
 * - Supports default slot projection (observed content)
 */
export declare class WaMutationObserverDirective implements OnInit, OnChanges {
    /** Element id or HTMLElement to observe. If not provided, the default slot content is observed. */
    target?: string | HTMLElement;
    /** Options bag or JSON string (attributes, childList, subtree, characterData, attributeFilter). */
    options?: any;
    disabled?: boolean | string;
    waMutation: EventEmitter<CustomEvent<any>>;
    private el;
    private renderer;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    private setAttr;
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaMutationObserverDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaMutationObserverDirective, "wa-mutation-observer", never, { "target": { "alias": "target"; "required": false; }; "options": { "alias": "options"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "waMutation": "wa-mutation"; }, never, never, true, never>;
}
//# sourceMappingURL=mutation-observer.directive.d.ts.map