import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaSkeletonDirective
 *
 * Angular wrapper for the <wa-skeleton> Web Component that allows declarative usage
 * and styling of skeleton loading placeholders.
 *
 * Features:
 * - Applied as an attribute to placeholder elements
 * - Supports animation effects: none, sheen, pulse
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 */
export declare class WaSkeletonDirective implements OnInit {
    effect?: 'none' | 'sheen' | 'pulse' | string;
    borderRadius?: string;
    color?: string;
    sheenColor?: string;
    private el;
    private renderer;
    ngOnInit(): void;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    private setCssVar;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaSkeletonDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaSkeletonDirective, "[waSkeleton]", never, { "effect": { "alias": "effect"; "required": false; }; "borderRadius": { "alias": "borderRadius"; "required": false; }; "color": { "alias": "color"; "required": false; }; "sheenColor": { "alias": "sheenColor"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=skeleton.directive.d.ts.map