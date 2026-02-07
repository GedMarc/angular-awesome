import { AfterViewInit, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SizeToken } from '../../types/tokens';
import * as i0 from "@angular/core";
/**
 * WaRatingDirective
 *
 * Angular wrapper for the <wa-rating> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported rating attributes as @Input() properties
 * - Supports value, max, precision, readonly, disabled, and size customization
 * - Emits rating events (waChange, waHover)
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 * - Provides accessibility support through label attribute
 * - Allows custom symbols via getSymbol property
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
export declare class WaRatingDirective implements OnInit, AfterViewInit, OnChanges {
    private _dataDialog;
    set dataDialogAttr(val: string | null | undefined);
    set dialogAttr(val: string | null | undefined);
    set dataDialog(val: string | null | undefined);
    label?: string;
    value?: number | string;
    max?: number | string;
    precision?: number | string;
    readonly?: boolean | string;
    disabled?: boolean | string;
    size?: SizeToken | string;
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    private _getSymbol?;
    waChange: EventEmitter<number>;
    waChangeHyphen: EventEmitter<number>;
    waHover: EventEmitter<{
        phase: string;
        value: number;
    }>;
    waHoverHyphen: EventEmitter<{
        phase: string;
        value: number;
    }>;
    waFocus: EventEmitter<FocusEvent>;
    waFocusHyphen: EventEmitter<FocusEvent>;
    waBlur: EventEmitter<FocusEvent>;
    waBlurHyphen: EventEmitter<FocusEvent>;
    valueChange: EventEmitter<number>;
    private el;
    private renderer;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    ngAfterViewInit(): void;
    /**
     * Sets a custom symbol function for the rating component
     */
    set getSymbol(fn: (value: number) => string);
    /**
     * Exposes the native rating element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Sets focusNative on the rating component
     */
    focus(): void;
    /**
     * Removes focusNative from the rating component
     */
    blur(): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<WaRatingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaRatingDirective, "wa-rating", never, { "dataDialogAttr": { "alias": "data-dialog"; "required": false; }; "dialogAttr": { "alias": "dialog"; "required": false; }; "dataDialog": { "alias": "dataDialog"; "required": false; }; "label": { "alias": "label"; "required": false; }; "value": { "alias": "value"; "required": false; }; "max": { "alias": "max"; "required": false; }; "precision": { "alias": "precision"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "size": { "alias": "size"; "required": false; }; "color": { "alias": "color"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "fontSize": { "alias": "fontSize"; "required": false; }; }, { "waChange": "waChange"; "waChangeHyphen": "wa-change"; "waHover": "waHover"; "waHoverHyphen": "wa-hover"; "waFocus": "waFocus"; "waFocusHyphen": "wa-focus"; "waBlur": "waBlur"; "waBlurHyphen": "wa-blur"; "valueChange": "valueChange"; }, never, never, true, never>;
}
//# sourceMappingURL=rating.directive.d.ts.map