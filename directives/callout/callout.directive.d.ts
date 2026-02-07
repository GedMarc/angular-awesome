import { OnInit } from '@angular/core';
import { Appearance, VariantToken, SizeToken } from '../../types/tokens';
import * as i0 from "@angular/core";
/**
 * WaCalloutDirective
 *
 * Angular wrapper for the <wa-callout> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported callout attributes as @Input() properties
 * - Supports variant, appearance, and size customization
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for icon and default content
 * - Supports custom styling via CSS variables
 */
export declare class WaCalloutDirective implements OnInit {
    variant?: VariantToken | string;
    appearance?: Appearance | string;
    size?: SizeToken | string;
    private el;
    private renderer;
    ngOnInit(): void;
    /**
     * Exposes the native callout element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaCalloutDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaCalloutDirective, "wa-callout", never, { "variant": { "alias": "variant"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=callout.directive.d.ts.map