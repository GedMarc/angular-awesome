import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export type WaStackDirection = 'column' | 'row' | 'wa-stack:column' | 'wa-stack:row';
export type WaStackJustify = 'start' | 'center' | 'end' | 'wa-justify-start' | 'wa-justify-center' | 'wa-justify-end';
/**
 * [waStack] — Angular helper to apply the wa-stack layout primitive with typed options.
 *
 * Responsibilities:
 *  - Toggle the `wa-stack` class on the host
 *  - Optional direction token adds `wa-stack:column` or `wa-stack:row`
 *  - Optional justify maps to `wa-justify-start|center|end`
 *  - Optional dividers boolean adds `wa-dividers`
 *
 * Use together with [waGap] for spacing and [waAlignItems] for cross-axis alignment.
 */
export declare class WaLayoutStackDirective implements OnChanges {
    private el;
    private renderer;
    enable: boolean | string | null;
    waStackDirection?: WaStackDirection | null;
    waStackJustify?: WaStackJustify | null;
    waStackDividers?: boolean | string | null;
    private applied;
    constructor(el: ElementRef<HTMLElement>, renderer: Renderer2);
    ngOnChanges(_: SimpleChanges): void;
    private sync;
    private addClass;
    private isTruthy;
    private normalizeDirection;
    private normalizeJustify;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaLayoutStackDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaLayoutStackDirective, "[waStack]", never, { "enable": { "alias": "waStack"; "required": false; }; "waStackDirection": { "alias": "waStackDirection"; "required": false; }; "waStackJustify": { "alias": "waStackJustify"; "required": false; }; "waStackDividers": { "alias": "waStackDividers"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=layout-stack.directive.d.ts.map