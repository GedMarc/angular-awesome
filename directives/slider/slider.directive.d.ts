import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SizeToken } from '../../types/tokens';
import * as i0 from "@angular/core";
/**
 * WaSliderDirective
 *
 * Angular wrapper for the <wa-slider> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported slider attributes as @Input() properties
 * - Supports range sliders with dual thumbs
 * - Supports vertical orientation
 * - Supports markers at each step
 * - Supports reference labels
 * - Supports tooltips for current values
 * - Emits events for input, change, focusNative, blurNative, etc.
 * - Enables Angular-style class and style bindings
 * - Supports ngModel for form integration
 * - Allows access to native methods via ViewChild
 */
export declare class WaSliderDirective implements OnInit, OnChanges, ControlValueAccessor {
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean | string;
    readonly?: boolean | string;
    required?: boolean | string;
    label?: string;
    hint?: string;
    name?: string;
    form?: string;
    withLabel?: boolean | string;
    withHint?: boolean | string;
    range?: boolean | string;
    minValue?: number;
    maxValue?: number;
    orientation?: 'horizontal' | 'vertical' | string;
    size?: SizeToken | string;
    indicatorOffset?: number;
    withMarkers?: boolean | string;
    withTooltip?: boolean | string;
    tooltipDistance?: number;
    tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left' | string;
    autofocus?: boolean | string;
    trackSize?: string;
    markerWidth?: string;
    markerHeight?: string;
    thumbWidth?: string;
    thumbHeight?: string;
    waBlur: EventEmitter<FocusEvent>;
    waBlurHyphen: EventEmitter<FocusEvent>;
    waFocus: EventEmitter<FocusEvent>;
    waFocusHyphen: EventEmitter<FocusEvent>;
    waChange: EventEmitter<Event>;
    waChangeHyphen: EventEmitter<Event>;
    waInput: EventEmitter<Event>;
    waInputHyphen: EventEmitter<Event>;
    waInvalid: EventEmitter<CustomEvent<any>>;
    waInvalidHyphen: EventEmitter<CustomEvent<any>>;
    valueChange: EventEmitter<any>;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    private valueFormatter?;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    /**
     * Sets the value formatter function
     * @param formatter A function that takes a number and returns a formatted string
     */
    setValueFormatter(formatter: (value: number) => string): void;
    /**
     * Exposes the native element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Focuses the slider
     */
    focus(): void;
    /**
     * Removes focusNative from the slider
     */
    blur(): void;
    /**
     * Decreases the slider's value by step
     */
    stepDown(): void;
    /**
     * Increases the slider's value by step
     */
    stepUp(): void;
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
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaSliderDirective, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaSliderDirective, "wa-slider", never, { "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "step": { "alias": "step"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "required": { "alias": "required"; "required": false; }; "label": { "alias": "label"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "name": { "alias": "name"; "required": false; }; "form": { "alias": "form"; "required": false; }; "withLabel": { "alias": "withLabel"; "required": false; }; "withHint": { "alias": "withHint"; "required": false; }; "range": { "alias": "range"; "required": false; }; "minValue": { "alias": "minValue"; "required": false; }; "maxValue": { "alias": "maxValue"; "required": false; }; "orientation": { "alias": "orientation"; "required": false; }; "size": { "alias": "size"; "required": false; }; "indicatorOffset": { "alias": "indicatorOffset"; "required": false; }; "withMarkers": { "alias": "withMarkers"; "required": false; }; "withTooltip": { "alias": "withTooltip"; "required": false; }; "tooltipDistance": { "alias": "tooltipDistance"; "required": false; }; "tooltipPlacement": { "alias": "tooltipPlacement"; "required": false; }; "autofocus": { "alias": "autofocus"; "required": false; }; "trackSize": { "alias": "trackSize"; "required": false; }; "markerWidth": { "alias": "markerWidth"; "required": false; }; "markerHeight": { "alias": "markerHeight"; "required": false; }; "thumbWidth": { "alias": "thumbWidth"; "required": false; }; "thumbHeight": { "alias": "thumbHeight"; "required": false; }; }, { "waBlur": "waBlur"; "waBlurHyphen": "wa-blur"; "waFocus": "waFocus"; "waFocusHyphen": "wa-focus"; "waChange": "waChange"; "waChangeHyphen": "wa-change"; "waInput": "waInput"; "waInputHyphen": "wa-input"; "waInvalid": "waInvalid"; "waInvalidHyphen": "wa-invalid"; "valueChange": "valueChange"; }, never, ["*"], true, never>;
}
//# sourceMappingURL=slider.directive.d.ts.map