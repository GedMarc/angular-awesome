import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export type WaGapToken = '0' | '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | 'wa-gap-0' | 'wa-gap-3xs' | 'wa-gap-2xs' | 'wa-gap-xs' | 'wa-gap-s' | 'wa-gap-m' | 'wa-gap-l' | 'wa-gap-xl' | 'wa-gap-2xl' | 'wa-gap-3xl';
/**
 * Attribute directive to apply Web Awesome gap utility classes to any container.
 * It also sets display:flex via the utility and can be overridden since the utility has low specificity.
 *
 * Usage:
 * <div [waGap]="'m'" class="wa-cluster">...</div>
 * <section [waGap]="'wa-gap-xl'" class="wa-grid">...</section>
 */
export declare class WaLayoutGapDirective implements OnChanges {
    private el;
    private renderer;
    private previousClass?;
    gap?: WaGapToken | null;
    constructor(el: ElementRef<HTMLElement>, renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    private applyClass;
    private toClassName;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaLayoutGapDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaLayoutGapDirective, "[waGap]", never, { "gap": { "alias": "waGap"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=layout-gap.directive.d.ts.map