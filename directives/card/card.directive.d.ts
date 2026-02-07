import { OnInit } from '@angular/core';
import { Appearance } from '../../types/tokens';
import * as i0 from "@angular/core";
/**
 * WaCardDirective
 *
 * Angular wrapper for the <wa-card> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported card attributes as @Input() properties
 * - Supports appearance and size customization
 * - Supports boolean attributes for header, image, and footer
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for header, footer, image, and default content
 * - Supports custom styling via CSS variables
 * - Supports direct styling through color, backgroundColor, fontSize inputs
 */
export declare class WaCardDirective implements OnInit {
    appearance?: Appearance | string;
    withHeader?: boolean | string;
    withImage?: boolean | string;
    withFooter?: boolean | string;
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    borderRadius?: string;
    borderColor?: string;
    innerBorderColor?: string;
    borderWidth?: string;
    spacing?: string;
    private el;
    private renderer;
    ngOnInit(): void;
    /**
     * Exposes the native card element for direct interaction
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
    static ɵfac: i0.ɵɵFactoryDeclaration<WaCardDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaCardDirective, "wa-card", never, { "appearance": { "alias": "appearance"; "required": false; }; "withHeader": { "alias": "withHeader"; "required": false; }; "withImage": { "alias": "withImage"; "required": false; }; "withFooter": { "alias": "withFooter"; "required": false; }; "color": { "alias": "color"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "fontSize": { "alias": "fontSize"; "required": false; }; "borderRadius": { "alias": "borderRadius"; "required": false; }; "borderColor": { "alias": "borderColor"; "required": false; }; "innerBorderColor": { "alias": "innerBorderColor"; "required": false; }; "borderWidth": { "alias": "borderWidth"; "required": false; }; "spacing": { "alias": "spacing"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=card.directive.d.ts.map