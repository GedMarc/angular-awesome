import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaSplitPanelDirective
 *
 * Angular wrapper for the <wa-split-panel> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported split panel attributes as @Input() properties
 * - Emits events for repositioning
 * - Enables Angular-style class and style bindings
 * - Supports slot projection for start, end, and divider content
 */
export declare class WaSplitPanelDirective implements OnInit, OnChanges {
    position?: number;
    positionInPixels?: number;
    orientation?: 'vertical' | 'horizontal' | string;
    vertical?: boolean | string;
    disabled?: boolean | string;
    primary?: 'start' | 'end' | string;
    snap?: string;
    snapThreshold?: number;
    dividerColor?: string;
    dividerWidth?: string;
    dividerHitArea?: string;
    min?: string;
    max?: string;
    repositionEvent: EventEmitter<CustomEvent<any>>;
    private el;
    private renderer;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    private setNumericAttr;
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    private setCssVar;
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaSplitPanelDirective, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaSplitPanelDirective, "wa-split-panel", never, { "position": { "alias": "position"; "required": false; }; "positionInPixels": { "alias": "positionInPixels"; "required": false; }; "orientation": { "alias": "orientation"; "required": false; }; "vertical": { "alias": "vertical"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "primary": { "alias": "primary"; "required": false; }; "snap": { "alias": "snap"; "required": false; }; "snapThreshold": { "alias": "snapThreshold"; "required": false; }; "dividerColor": { "alias": "dividerColor"; "required": false; }; "dividerWidth": { "alias": "dividerWidth"; "required": false; }; "dividerHitArea": { "alias": "dividerHitArea"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; }, { "repositionEvent": "wa-reposition"; }, never, ["[slot=start]", "[slot=end]", "[slot=divider]"], true, never>;
}
//# sourceMappingURL=split-panel.directive.d.ts.map