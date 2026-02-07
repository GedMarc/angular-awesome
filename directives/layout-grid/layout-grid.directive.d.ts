import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * [waGrid] — Angular helper to apply the wa-grid layout primitive and common options.
 *
 * Responsibilities:
 *  - Toggle the `wa-grid` class on the host
 *  - Support sizing via CSS custom properties commonly used by WA grid:
 *    - minColumnSize -> --min-column-size (e.g., 20ch, 16rem, 200px)
 *    - columns -> --columns (number)
 *    - rowSize -> --row-size
 *  - Provide a convenient boolean input to add/remove `wa-span-grid` on a child when the directive is applied to that child via [waGridSpan]
 *
 * Use with [waGap] for spacing and [waAlignItems] for cross-axis alignment.
 */
export declare class WaLayoutGridDirective implements OnChanges {
    private el;
    private renderer;
    enable: boolean | string | null;
    minColumnSize?: string | null;
    columns?: number | string | null;
    rowSize?: string | null;
    private appliedBase;
    constructor(el: ElementRef<HTMLElement>, renderer: Renderer2);
    ngOnChanges(_: SimpleChanges): void;
    private sync;
    private clearStyles;
    private isTruthy;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaLayoutGridDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaLayoutGridDirective, "[waGrid]", never, { "enable": { "alias": "waGrid"; "required": false; }; "minColumnSize": { "alias": "minColumnSize"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; "rowSize": { "alias": "rowSize"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * [waGridSpan] — helper directive to mark a grid child as full-span (adds `wa-span-grid`).
 */
export declare class WaLayoutGridSpanDirective implements OnChanges {
    private el;
    private renderer;
    span: boolean | string | null;
    private applied;
    constructor(el: ElementRef<HTMLElement>, renderer: Renderer2);
    ngOnChanges(_: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaLayoutGridSpanDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaLayoutGridSpanDirective, "[waGridSpan]", never, { "span": { "alias": "waGridSpan"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=layout-grid.directive.d.ts.map