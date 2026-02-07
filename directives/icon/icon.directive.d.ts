import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaIconDirective
 *
 * Angular wrapper for the <wa-icon> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported icon attributes as @Input() properties
 * - Supports name, family, variant, library, src, label, and withFixedWidth customization
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 * - Provides accessibility support through label attribute
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
export declare class WaIconDirective implements OnInit {
    name?: string;
    family?: string;
    variant?: string;
    library?: string;
    src?: string;
    label?: string;
    withFixedWidth?: boolean | string;
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    private _dataDialog;
    set dataDialogAttr(val: string | null | undefined);
    set dialogAttr(val: string | null | undefined);
    set dataDialog(val: string | null | undefined);
    primaryColor?: string;
    primaryOpacity?: string;
    secondaryColor?: string;
    secondaryOpacity?: string;
    private el;
    private renderer;
    ngOnInit(): void;
    /**
     * Exposes the native icon element for direct interaction
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
    /**
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
    private setCssVar;
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    private setCssStyle;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaIconDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaIconDirective, "wa-icon", never, { "name": { "alias": "name"; "required": false; }; "family": { "alias": "family"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "library": { "alias": "library"; "required": false; }; "src": { "alias": "src"; "required": false; }; "label": { "alias": "label"; "required": false; }; "withFixedWidth": { "alias": "withFixedWidth"; "required": false; }; "color": { "alias": "color"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "fontSize": { "alias": "fontSize"; "required": false; }; "dataDialogAttr": { "alias": "data-dialog"; "required": false; }; "dialogAttr": { "alias": "dialog"; "required": false; }; "dataDialog": { "alias": "dataDialog"; "required": false; }; "primaryColor": { "alias": "primaryColor"; "required": false; }; "primaryOpacity": { "alias": "primaryOpacity"; "required": false; }; "secondaryColor": { "alias": "secondaryColor"; "required": false; }; "secondaryOpacity": { "alias": "secondaryOpacity"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=icon.directive.d.ts.map