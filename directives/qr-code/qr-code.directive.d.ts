import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * WaQrCodeDirective
 *
 * Angular wrapper for the <wa-qr-code> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds value, label, size, fill, background, radius, and errorCorrection attributes
 * - Emits focusNative and blurNative events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content and prefix
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
export declare class WaQrCodeDirective implements OnInit, ControlValueAccessor {
    value?: string;
    label?: string;
    size?: number | string;
    fill?: string;
    background?: string;
    radius?: number | string;
    errorCorrection?: 'L' | 'M' | 'Q' | 'H' | string;
    styleSize?: string;
    styleFill?: string;
    styleBackground?: string;
    styleRadius?: string;
    styleColor?: string;
    styleDisplay?: string;
    waFocus: EventEmitter<FocusEvent>;
    waFocusHyphen: EventEmitter<FocusEvent>;
    waBlur: EventEmitter<FocusEvent>;
    waBlurHyphen: EventEmitter<FocusEvent>;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    ngOnInit(): void;
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
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaQrCodeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaQrCodeDirective, "wa-qr-code", never, { "value": { "alias": "value"; "required": false; }; "label": { "alias": "label"; "required": false; }; "size": { "alias": "size"; "required": false; }; "fill": { "alias": "fill"; "required": false; }; "background": { "alias": "background"; "required": false; }; "radius": { "alias": "radius"; "required": false; }; "errorCorrection": { "alias": "errorCorrection"; "required": false; }; "styleSize": { "alias": "styleSize"; "required": false; }; "styleFill": { "alias": "styleFill"; "required": false; }; "styleBackground": { "alias": "styleBackground"; "required": false; }; "styleRadius": { "alias": "styleRadius"; "required": false; }; "styleColor": { "alias": "styleColor"; "required": false; }; "styleDisplay": { "alias": "styleDisplay"; "required": false; }; }, { "waFocus": "waFocus"; "waFocusHyphen": "wa-focus"; "waBlur": "waBlur"; "waBlurHyphen": "wa-blur"; }, never, never, true, never>;
}
//# sourceMappingURL=qr-code.directive.d.ts.map