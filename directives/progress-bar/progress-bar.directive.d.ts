import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * WaProgressBarDirective
 *
 * Angular wrapper for the <wa-progress-bar> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds value, indeterminate, and label attributes
 * - Emits focusNative and blurNative events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content and prefix
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
export declare class WaProgressBarDirective implements OnInit, OnChanges, ControlValueAccessor {
    value?: number;
    indeterminate?: boolean | string;
    label?: string;
    /**
     * Internal: track last applied percent to CSS var to avoid redundant writes
     */
    private _lastPercentApplied;
    private _dataDialog;
    set dataDialogAttr(val: string | null | undefined);
    set dialogAttr(val: string | null | undefined);
    set dataDialog(val: string | null | undefined);
    indicatorColor?: string;
    display?: string;
    trackHeight?: string;
    waFocus: EventEmitter<FocusEvent>;
    waFocusHyphen: EventEmitter<FocusEvent>;
    waBlur: EventEmitter<FocusEvent>;
    waBlurHyphen: EventEmitter<FocusEvent>;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    private clampPercent;
    private applyPercentageVar;
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
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaProgressBarDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaProgressBarDirective, "wa-progress-bar", never, { "value": { "alias": "value"; "required": false; }; "indeterminate": { "alias": "indeterminate"; "required": false; }; "label": { "alias": "label"; "required": false; }; "dataDialogAttr": { "alias": "data-dialog"; "required": false; }; "dialogAttr": { "alias": "dialog"; "required": false; }; "dataDialog": { "alias": "dataDialog"; "required": false; }; "indicatorColor": { "alias": "indicatorColor"; "required": false; }; "display": { "alias": "display"; "required": false; }; "trackHeight": { "alias": "trackHeight"; "required": false; }; }, { "waFocus": "waFocus"; "waFocusHyphen": "wa-focus"; "waBlur": "waBlur"; "waBlurHyphen": "wa-blur"; }, never, never, true, never>;
}
//# sourceMappingURL=progress-bar.directive.d.ts.map