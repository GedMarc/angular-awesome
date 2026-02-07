import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export type WaSizeToken = '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | `wa-body-${string}` | `wa-heading-${string}` | `wa-caption-${string}` | `wa-longform-${string}` | `wa-font-size-${string}`;
export type WaFormControlTextRole = 'label' | 'value' | 'placeholder' | 'hint' | 'wa-form-control-label' | 'wa-form-control-value' | 'wa-form-control-placeholder' | 'wa-form-control-hint';
export type WaFontWeight = 'light' | 'normal' | 'semibold' | 'bold' | 'wa-font-weight-light' | 'wa-font-weight-normal' | 'wa-font-weight-semibold' | 'wa-font-weight-bold';
export type WaTextColor = 'quiet' | 'normal' | 'link' | 'wa-color-text-quiet' | 'wa-color-text-normal' | 'wa-color-text-link' | 'wa-color-quiet' | 'wa-color-normal' | 'wa-color-link';
/**
 * [waText] — Angular helper to apply Web Awesome Text Utility classes with typed options.
 *
 * Responsibilities:
 *  - Apply body/heading/caption/longform typography tokens
 *  - Apply link styles, list reset, form control text roles
 *  - Apply single-purpose font-size, font-weight, text color
 *  - Apply truncation utility
 *
 * Notes:
 *  - Inputs accept short tokens (e.g., 's', '2xl') or full class tokens (e.g., 'wa-body-s').
 *  - Directive maintains and replaces previously applied classes when inputs change.
 */
export declare class WaTextDirective implements OnChanges {
    private el;
    private renderer;
    waBody?: WaSizeToken | 'wa-body' | null;
    waHeading?: WaSizeToken | 'wa-heading' | null;
    waCaption?: WaSizeToken | 'wa-caption' | null;
    waLongform?: WaSizeToken | 'wa-longform' | null;
    waLink?: boolean | 'link' | 'plain' | 'wa-link' | 'wa-link-plain' | null;
    waListPlain?: boolean | string | null;
    waFormControlText?: WaFormControlTextRole | null;
    waFontSize?: WaSizeToken | null;
    waFontWeight?: WaFontWeight | null;
    waColorText?: WaTextColor | null;
    waTextTruncate?: boolean | string | null;
    private applied;
    constructor(el: ElementRef<HTMLElement>, renderer: Renderer2);
    ngOnChanges(_: SimpleChanges): void;
    private sync;
    private applyGrouped;
    private normalizeGrouped;
    private normalizeLink;
    private normalizeFormControlText;
    private normalizeFontSize;
    private normalizeFontWeight;
    private normalizeColorText;
    private isTruthy;
    private addClass;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaTextDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaTextDirective, "[waText]", never, { "waBody": { "alias": "waBody"; "required": false; }; "waHeading": { "alias": "waHeading"; "required": false; }; "waCaption": { "alias": "waCaption"; "required": false; }; "waLongform": { "alias": "waLongform"; "required": false; }; "waLink": { "alias": "waLink"; "required": false; }; "waListPlain": { "alias": "waListPlain"; "required": false; }; "waFormControlText": { "alias": "waFormControlText"; "required": false; }; "waFontSize": { "alias": "waFontSize"; "required": false; }; "waFontWeight": { "alias": "waFontWeight"; "required": false; }; "waColorText": { "alias": "waColorText"; "required": false; }; "waTextTruncate": { "alias": "waTextTruncate"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=text.directive.d.ts.map