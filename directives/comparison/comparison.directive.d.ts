import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaComparisonDirective
 *
 * Angular wrapper for the <wa-comparison> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds position attribute as @Input() property
 * - Emits change events when the divider position changes
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for before, after, and handle content
 * - Supports custom styling via CSS variables
 */
export declare class WaComparisonDirective implements OnInit, OnChanges {
    position?: number | string;
    dividerColor?: string;
    dividerWidth?: string;
    handleColor?: string;
    handleSize?: string;
    change: EventEmitter<number>;
    private el;
    private renderer;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    /**
     * Exposes the native comparison element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    private setNumericAttr;
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    private setCssVar;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaComparisonDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaComparisonDirective, "wa-comparison", never, { "position": { "alias": "position"; "required": false; }; "dividerColor": { "alias": "dividerColor"; "required": false; }; "dividerWidth": { "alias": "dividerWidth"; "required": false; }; "handleColor": { "alias": "handleColor"; "required": false; }; "handleSize": { "alias": "handleSize"; "required": false; }; }, { "change": "wa-change"; }, never, never, true, never>;
}
//# sourceMappingURL=comparison.directive.d.ts.map