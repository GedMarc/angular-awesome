import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { VariantToken } from '../../types/tokens';
import * as i0 from "@angular/core";
export type WaVariantClass = 'wa-brand' | 'wa-neutral' | 'wa-success' | 'wa-warning' | 'wa-danger';
export type WaVariantInput = Exclude<VariantToken, 'inherit'> | WaVariantClass | null;
/**
 * [waVariant] — Angular helper to apply Web Awesome color variant utility classes
 * to any element (`.wa-brand`, `.wa-neutral`, `.wa-success`, `.wa-warning`, `.wa-danger`).
 *
 * Usage:
 *  - <div [waVariant]="'brand'"></div>
 *  - <div waBrand></div>
 *  - <div [waBrand]="true"></div>
 *  - <div [waVariant]="'wa-success'"></div>
 *
 * The directive ensures that only one variant class is applied at a time.
 */
export declare class WaVariantDirective implements OnChanges {
    private el;
    private renderer;
    waVariant: WaVariantInput;
    waBrand?: boolean | '' | null;
    waNeutral?: boolean | '' | null;
    waSuccess?: boolean | '' | null;
    waWarning?: boolean | '' | null;
    waDanger?: boolean | '' | null;
    private applied;
    constructor(el: ElementRef<HTMLElement>, renderer: Renderer2);
    ngOnChanges(_: SimpleChanges): void;
    private sync;
    private normalizeVariant;
    private isTruthy;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaVariantDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaVariantDirective, "[waVariant],[waBrand],[waNeutral],[waSuccess],[waWarning],[waDanger]", never, { "waVariant": { "alias": "waVariant"; "required": false; }; "waBrand": { "alias": "waBrand"; "required": false; }; "waNeutral": { "alias": "waNeutral"; "required": false; }; "waSuccess": { "alias": "waSuccess"; "required": false; }; "waWarning": { "alias": "waWarning"; "required": false; }; "waDanger": { "alias": "waDanger"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=variant.directive.d.ts.map