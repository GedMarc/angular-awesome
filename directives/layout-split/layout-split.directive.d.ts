import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export type WaSplitDirection = 'row' | 'column' | 'wa-split:row' | 'wa-split:column';
/**
 * [waSplit] — Angular helper to apply the wa-split layout primitive with typed options.
 *
 * Responsibilities:
 *  - Toggle the `wa-split` class on the host
 *  - Optional direction token adds `wa-split:row` or `wa-split:column`
 *  - Optional collapse value sets CSS var `--wa-split-collapse` (e.g., `40rem`)
 *  - Works with [waGap] and [waAlignItems]
 */
export declare class WaLayoutSplitDirective implements OnChanges {
    private el;
    private renderer;
    enable: boolean | string | null;
    waSplitDirection?: WaSplitDirection | null;
    splitCollapse?: string | null;
    private applied;
    constructor(el: ElementRef<HTMLElement>, renderer: Renderer2);
    ngOnChanges(_: SimpleChanges): void;
    private sync;
    private addClass;
    private isTruthy;
    private normalizeDirection;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaLayoutSplitDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaLayoutSplitDirective, "[waSplit]", never, { "enable": { "alias": "waSplit"; "required": false; }; "waSplitDirection": { "alias": "waSplitDirection"; "required": false; }; "splitCollapse": { "alias": "splitCollapse"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=layout-split.directive.d.ts.map