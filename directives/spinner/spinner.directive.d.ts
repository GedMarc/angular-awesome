import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaSpinnerDirective
 *
 * Angular wrapper for the <wa-spinner> Web Component that allows declarative usage
 * and input binding for styling.
 *
 * Features:
 * - Binds all supported spinner attributes as @Input() properties
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 */
export declare class WaSpinnerDirective implements OnInit {
    fontSize?: string;
    trackWidth?: string;
    trackColor?: string;
    indicatorColor?: string;
    speed?: string;
    private el;
    private renderer;
    ngOnInit(): void;
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Sets a style property on the native element if the value is not null or undefined
     */
    private setStyle;
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    private setCssVar;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaSpinnerDirective, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaSpinnerDirective, "wa-spinner", never, { "fontSize": { "alias": "fontSize"; "required": false; }; "trackWidth": { "alias": "trackWidth"; "required": false; }; "trackColor": { "alias": "trackColor"; "required": false; }; "indicatorColor": { "alias": "indicatorColor"; "required": false; }; "speed": { "alias": "speed"; "required": false; }; }, {}, never, ["*"], true, never>;
}
//# sourceMappingURL=spinner.directive.d.ts.map