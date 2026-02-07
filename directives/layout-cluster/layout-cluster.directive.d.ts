import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export type WaClusterDirection = 'row' | 'column' | 'wa-cluster:row' | 'wa-cluster:column';
export type WaClusterJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'wa-justify-start' | 'wa-justify-center' | 'wa-justify-end' | 'wa-justify-between' | 'wa-justify-around' | 'wa-justify-evenly';
/**
 * [waCluster] — Angular helper to apply the wa-cluster layout primitive with optional typed options.
 *
 * Minimal responsibility: toggle the `wa-cluster` class on the host.
 * Optional inputs map to utility classes when provided:
 *  - direction: row | column (maps to wa-cluster:row / wa-cluster:column)
 *  - wrap: boolean (true => wa-wrap, false => wa-nowrap)
 *  - justify: start|center|end|between|around|evenly (maps to wa-justify-*)
 *
 * Use together with [waGap] and [waAlignItems] for spacing and cross-axis alignment.
 */
export declare class WaLayoutClusterDirective implements OnChanges {
    private el;
    private renderer;
    enable: boolean | string | null;
    waClusterDirection?: WaClusterDirection | null;
    waClusterWrap?: boolean | string | null;
    waClusterJustify?: WaClusterJustify | null;
    private applied;
    constructor(el: ElementRef<HTMLElement>, renderer: Renderer2);
    ngOnChanges(_: SimpleChanges): void;
    private sync;
    private addClass;
    private isTruthy;
    private normalizeDirection;
    private normalizeWrap;
    private normalizeJustify;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaLayoutClusterDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaLayoutClusterDirective, "[waCluster]", never, { "enable": { "alias": "waCluster"; "required": false; }; "waClusterDirection": { "alias": "waClusterDirection"; "required": false; }; "waClusterWrap": { "alias": "waClusterWrap"; "required": false; }; "waClusterJustify": { "alias": "waClusterJustify"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=layout-cluster.directive.d.ts.map