import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export type WaAlignItemsValue = 'start' | 'end' | 'center' | 'stretch' | 'baseline' | 'wa-align-items-start' | 'wa-align-items-end' | 'wa-align-items-center' | 'wa-align-items-stretch' | 'wa-align-items-baseline';
/**
 * Attribute directive to conveniently apply Web Awesome align-items utility classes.
 *
 * Usage:
 * <div [waAlignItems]="'center'" class="wa-cluster">...</div>
 * <div [waAlignItems]="'wa-align-items-baseline'" class="wa-stack">...</div>
 */
export declare class WaLayoutAlignItemsDirective implements OnChanges {
    private el;
    private renderer;
    private previousClass?;
    alignItems?: WaAlignItemsValue | null;
    constructor(el: ElementRef<HTMLElement>, renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    private applyClass;
    private toClassName;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaLayoutAlignItemsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaLayoutAlignItemsDirective, "[waAlignItems]", never, { "alignItems": { "alias": "waAlignItems"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=layout-align.directive.d.ts.map