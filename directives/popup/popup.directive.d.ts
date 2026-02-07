import { EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaPopupDirective
 *
 * Angular wrapper for the <wa-popup> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Popup is a utility that lets you declaratively anchor "popup" containers to another element.
 * It uses Floating UI under the hood to provide a well-tested, lightweight, and fully
 * declarative positioning utility for tooltips, dropdowns, and more.
 *
 * Features:
 * - Binds all supported popup attributes as @Input() properties
 * - Supports anchoring to elements via ID or slot
 * - Supports various placement options (top, bottom, left, right, etc.)
 * - Supports customization of distance, skidding, arrows, etc.
 * - Supports advanced positioning features like flip, shift, and auto-size
 * - Emits reposition events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for popup content and anchor
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control (reposition)
 */
export declare class WaPopupDirective implements OnInit {
    anchor?: string;
    placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end' | string;
    boundary?: 'viewport' | 'scroll' | string;
    flipFallbackPlacements?: string;
    flipFallbackStrategy?: 'best-fit' | 'initial' | string;
    autoSize?: 'horizontal' | 'vertical' | 'both' | string;
    sync?: 'width' | 'height' | 'both' | string;
    arrowPlacement?: 'start' | 'end' | 'center' | 'anchor' | string;
    active?: boolean | string;
    arrow?: boolean | string;
    flip?: boolean | string;
    shift?: boolean | string;
    hoverBridge?: boolean | string;
    distance?: number | string;
    skidding?: number | string;
    arrowPadding?: number | string;
    flipPadding?: number | string;
    shiftPadding?: number | string;
    autoSizePadding?: number | string;
    waReposition: EventEmitter<CustomEvent<any>>;
    waRepositionHyphen: EventEmitter<CustomEvent<any>>;
    private el;
    private renderer;
    ngOnInit(): void;
    /**
     * Exposes the native popup element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Forces the popup to recalculate and reposition itself
     */
    reposition(): void;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    private setNumericAttr;
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaPopupDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaPopupDirective, "wa-popup", never, { "anchor": { "alias": "anchor"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "boundary": { "alias": "boundary"; "required": false; }; "flipFallbackPlacements": { "alias": "flipFallbackPlacements"; "required": false; }; "flipFallbackStrategy": { "alias": "flipFallbackStrategy"; "required": false; }; "autoSize": { "alias": "autoSize"; "required": false; }; "sync": { "alias": "sync"; "required": false; }; "arrowPlacement": { "alias": "arrowPlacement"; "required": false; }; "active": { "alias": "active"; "required": false; }; "arrow": { "alias": "arrow"; "required": false; }; "flip": { "alias": "flip"; "required": false; }; "shift": { "alias": "shift"; "required": false; }; "hoverBridge": { "alias": "hoverBridge"; "required": false; }; "distance": { "alias": "distance"; "required": false; }; "skidding": { "alias": "skidding"; "required": false; }; "arrowPadding": { "alias": "arrowPadding"; "required": false; }; "flipPadding": { "alias": "flipPadding"; "required": false; }; "shiftPadding": { "alias": "shiftPadding"; "required": false; }; "autoSizePadding": { "alias": "autoSizePadding"; "required": false; }; }, { "waReposition": "waReposition"; "waRepositionHyphen": "wa-reposition"; }, never, never, true, never>;
}
//# sourceMappingURL=popup.directive.d.ts.map