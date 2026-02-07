import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export type WaFrameRatioToken = 'square' | 'landscape' | 'portrait' | 'wa-frame:square' | 'wa-frame:landscape' | 'wa-frame:portrait';
export type WaFrameRadiusToken = 's' | 'm' | 'l' | 'pill' | 'circle' | 'square' | 'wa-border-radius-s' | 'wa-border-radius-m' | 'wa-border-radius-l' | 'wa-border-radius-pill' | 'wa-border-radius-circle' | 'wa-border-radius-square';
/**
 * [waFrame] — Angular helper to apply the wa-frame layout primitive with typed options.
 *
 * Responsibilities:
 *  - Toggle the `wa-frame` class on the host
 *  - Optional ratio token adds `wa-frame:square|landscape|portrait`
 *  - Optional custom aspectRatio string sets CSS `aspect-ratio` on host
 *  - Optional border radius token adds `wa-border-radius-*`
 *  - Optional custom borderRadius string sets style `border-radius` on host
 *  - Optional objectFit sets CSS custom property `--object-fit` (consumed by Web Awesome CSS)
 */
export declare class WaLayoutFrameDirective implements OnChanges {
    private el;
    private renderer;
    enable: boolean | string | null;
    waFrameRatio?: WaFrameRatioToken | null;
    aspectRatio?: string | null;
    waFrameRadius?: WaFrameRadiusToken | null;
    borderRadius?: string | null;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' | (string & {}) | null;
    private appliedClasses;
    constructor(el: ElementRef<HTMLElement>, renderer: Renderer2);
    ngOnChanges(_: SimpleChanges): void;
    private sync;
    private addClass;
    private isTruthy;
    private normalizeRatio;
    private normalizeRadius;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaLayoutFrameDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaLayoutFrameDirective, "[waFrame]", never, { "enable": { "alias": "waFrame"; "required": false; }; "waFrameRatio": { "alias": "waFrameRatio"; "required": false; }; "aspectRatio": { "alias": "aspectRatio"; "required": false; }; "waFrameRadius": { "alias": "waFrameRadius"; "required": false; }; "borderRadius": { "alias": "borderRadius"; "required": false; }; "objectFit": { "alias": "objectFit"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=layout-frame.directive.d.ts.map