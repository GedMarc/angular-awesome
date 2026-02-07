import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaDividerDirective
 *
 * Angular wrapper for the <wa-divider> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds the vertical boolean attribute
 * - Supports style inputs for color, width, and spacing
 * - Maps style inputs to CSS custom properties
 * - Enables Angular-style class and style bindings
 */
export declare class WaDividerDirective implements OnInit {
    orientation?: 'vertical' | 'horizontal' | string;
    vertical?: boolean | string;
    color?: string;
    width?: string;
    spacing?: string;
    private el;
    private renderer;
    ngOnInit(): void;
    /**
     * Exposes the native divider element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    private setCssVar;
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaDividerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaDividerDirective, "wa-divider", never, { "orientation": { "alias": "orientation"; "required": false; }; "vertical": { "alias": "vertical"; "required": false; }; "color": { "alias": "color"; "required": false; }; "width": { "alias": "width"; "required": false; }; "spacing": { "alias": "spacing"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=divider.directive.d.ts.map