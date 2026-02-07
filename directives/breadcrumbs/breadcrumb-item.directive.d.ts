import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaBreadcrumbItemDirective
 *
 * Angular wrapper for the <wa-breadcrumb-item> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds attributes: href, target, rel
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, start, end, and custom separators
 * - Supports custom styling via CSS variables and ::part() selectors
 */
export declare class WaBreadcrumbItemDirective implements OnInit {
    href?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    rel: string;
    private _dataDialog;
    set dataDialogAttr(val: string | null | undefined);
    set dialogAttr(val: string | null | undefined);
    set dataDialog(val: string | null | undefined);
    private el;
    private renderer;
    ngOnInit(): void;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaBreadcrumbItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaBreadcrumbItemDirective, "wa-breadcrumb-item", never, { "href": { "alias": "href"; "required": false; }; "target": { "alias": "target"; "required": false; }; "rel": { "alias": "rel"; "required": false; }; "dataDialogAttr": { "alias": "data-dialog"; "required": false; }; "dialogAttr": { "alias": "dialog"; "required": false; }; "dataDialog": { "alias": "dataDialog"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=breadcrumb-item.directive.d.ts.map