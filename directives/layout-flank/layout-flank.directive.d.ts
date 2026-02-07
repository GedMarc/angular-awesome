import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export type WaFlankPosition = 'start' | 'end' | 'wa-flank:start' | 'wa-flank:end' | null;
/**
 * [waFlank] — Angular helper to apply the wa-flank layout primitive with optional typed options.
 *
 * Responsibilities:
 *  - Toggle the `wa-flank` class on the host
 *  - Optionally append `wa-flank:start` or `wa-flank:end` to control which item flanks
 *  - Optionally add `wa-nowrap` when `waFlankNowrap` is truthy
 *  - Optionally set CSS custom properties `--flank-size` and `--content-percentage`
 *
 * Use together with [waGap] for spacing and [waAlignItems] for cross-axis alignment.
 */
export declare class WaLayoutFlankDirective implements OnChanges {
    private el;
    private renderer;
    enable: boolean | string | null;
    waFlankPosition?: WaFlankPosition;
    waFlankNowrap?: boolean | string | null;
    flankSize?: string | null;
    contentPercentage?: string | null;
    private appliedClasses;
    constructor(el: ElementRef<HTMLElement>, renderer: Renderer2);
    ngOnChanges(_: SimpleChanges): void;
    private sync;
    private addClass;
    private isTruthy;
    private normalizePosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaLayoutFlankDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaLayoutFlankDirective, "[waFlank]", never, { "enable": { "alias": "waFlank"; "required": false; }; "waFlankPosition": { "alias": "waFlankPosition"; "required": false; }; "waFlankNowrap": { "alias": "waFlankNowrap"; "required": false; }; "flankSize": { "alias": "flankSize"; "required": false; }; "contentPercentage": { "alias": "contentPercentage"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=layout-flank.directive.d.ts.map