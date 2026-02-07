import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaIncludeDirective
 *
 * Angular wrapper for the <wa-include> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported include attributes as @Input() properties
 * - Supports string inputs like src and mode
 * - Supports boolean attributes like allowScripts
 * - Emits load and error events
 * - Enables Angular-style class and style bindings
 */
export declare class WaIncludeDirective implements OnInit, OnChanges {
    src?: string;
    mode?: 'cors' | 'no-cors' | 'same-origin' | string;
    allowScripts?: boolean | string;
    waLoad: EventEmitter<void>;
    waError: EventEmitter<{
        status: number;
    }>;
    private el;
    private renderer;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    /**
     * Exposes the native include element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaIncludeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaIncludeDirective, "wa-include", never, { "src": { "alias": "src"; "required": false; }; "mode": { "alias": "mode"; "required": false; }; "allowScripts": { "alias": "allowScripts"; "required": false; }; }, { "waLoad": "wa-load"; "waError": "wa-error"; }, never, never, true, never>;
}
//# sourceMappingURL=include.directive.d.ts.map