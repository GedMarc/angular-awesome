import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaBreadcrumbDirective
 *
 * Angular wrapper for the <wa-breadcrumb> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds label attribute for accessibility
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for breadcrumb items and custom separators
 * - Supports custom styling via CSS variables
 */
export declare class WaBreadcrumbDirective implements OnInit {
    label?: string;
    private el;
    private renderer;
    ngOnInit(): void;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaBreadcrumbDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaBreadcrumbDirective, "wa-breadcrumb", never, { "label": { "alias": "label"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=breadcrumb.directive.d.ts.map