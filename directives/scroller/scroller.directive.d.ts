import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaScrollerDirective
 *
 * Angular directive that attaches directly to the <wa-scroller> Web Component,
 * aligning with how other components are wrapped in this library.
 *
 * Features:
 * - Binds orientation, withoutScrollbar, and withoutShadow attributes
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 */
export declare class WaScrollerDirective implements OnInit, OnChanges {
    orientation?: 'horizontal' | 'vertical' | string;
    withoutScrollbar?: boolean | string;
    withoutShadow?: boolean | string;
    shadowColor?: string;
    shadowSize?: string;
    private el;
    private renderer;
    ngOnInit(): void;
    ngOnChanges(_changes: SimpleChanges): void;
    private applyInputs;
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    private setCssVar;
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaScrollerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaScrollerDirective, "wa-scroller", never, { "orientation": { "alias": "orientation"; "required": false; }; "withoutScrollbar": { "alias": "withoutScrollbar"; "required": false; }; "withoutShadow": { "alias": "withoutShadow"; "required": false; }; "shadowColor": { "alias": "shadowColor"; "required": false; }; "shadowSize": { "alias": "shadowSize"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=scroller.directive.d.ts.map