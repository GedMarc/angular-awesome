import { OnInit } from '@angular/core';
import { SizeToken, VariantToken } from '../../types/tokens';
import * as i0 from "@angular/core";
/**
 * WaButtonGroupDirective
 *
 * Angular wrapper for the <wa-button-group> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Container component for grouping related <wa-button> elements
 * - Supports shared attributes (size, variant, orientation)
 * - Provides accessibility features via label attribute
 * - Allows slot projection for buttons and compatible components
 *
 * Usage:
 * ```html
 * <!-- As an element -->
 * <wa-button-group label="Alignment">
 *   <wa-button>Left</wa-button>
 *   <wa-button>Center</wa-button>
 *   <wa-button>Right</wa-button>
 * </wa-button-group>
 *
 * <!-- As an attribute -->
 * <div waButtonGroup label="Alignment">
 *   <button waButton>Left</button>
 *   <button waButton>Center</button>
 *   <button waButton>Right</button>
 * </div>
 * ```
 *
 * Slots:
 * - (default): Buttons and controls inside the group
 *
 * CSS Parts:
 * - base: The wrapper of the group
 */
export declare class WaButtonGroupDirective implements OnInit {
    label?: string;
    size?: SizeToken | string;
    variant?: VariantToken | string;
    orientation?: 'horizontal' | 'vertical' | string;
    private el;
    private renderer;
    ngOnInit(): void;
    /**
     * Exposes the native button group element for direct interaction
     */
    get nativeButtonGroup(): HTMLElement;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaButtonGroupDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaButtonGroupDirective, "wa-button-group, [waButtonGroup]", never, { "label": { "alias": "label"; "required": false; }; "size": { "alias": "size"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "orientation": { "alias": "orientation"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=button-group.directive.d.ts.map