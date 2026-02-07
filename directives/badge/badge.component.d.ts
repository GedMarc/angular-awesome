import { ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
/**
 * WaBadgeComponent
 *
 * Angular wrapper for the <wa-badge> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds attributes: variant, appearance, pill, pulse
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content
 * - Enables font sizing via [style.fontSize]
 * - Supports custom styling via CSS variables
 */
import { Renderer2 } from '@angular/core';
import { VariantToken } from '../../types/tokens';
import * as i0 from "@angular/core";
type BadgeAppearanceBase = 'accent' | 'filled' | 'tinted' | 'outlined' | 'text' | 'plain';
export type BadgeAppearance = BadgeAppearanceBase | `${BadgeAppearanceBase} outlined` | `${BadgeAppearanceBase}-outlined`;
export declare class WaBadgeDirective implements OnInit, OnChanges {
    variant: VariantToken;
    appearance: BadgeAppearance;
    pill?: boolean | string | null;
    pulse?: boolean | string | null;
    fontSize?: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    pulseColor?: string;
    el: ElementRef<any>;
    renderer: Renderer2;
    ngOnInit(): void;
    ngOnChanges(_changes: SimpleChanges): void;
    private applyInputs;
    private setAttr;
    private setBoolAttr;
    private setStyleValue;
    private setCssVar;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaBadgeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaBadgeDirective, "wa-badge", never, { "variant": { "alias": "variant"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "pill": { "alias": "pill"; "required": false; }; "pulse": { "alias": "pulse"; "required": false; }; "fontSize": { "alias": "fontSize"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "borderColor": { "alias": "borderColor"; "required": false; }; "textColor": { "alias": "textColor"; "required": false; }; "pulseColor": { "alias": "pulseColor"; "required": false; }; }, {}, never, never, true, never>;
}
export {};
//# sourceMappingURL=badge.component.d.ts.map