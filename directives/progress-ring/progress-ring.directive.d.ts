import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * WaProgressRingDirective
 *
 * Angular wrapper for the <wa-progress-ring> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds value and label attributes
 * - Emits focusNative and blurNative events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content and prefix
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
export declare class WaProgressRingDirective implements OnInit, ControlValueAccessor, OnChanges {
    value?: number;
    label?: string;
    private _dataDialog;
    set dataDialogAttr(val: string | null | undefined);
    set dialogAttr(val: string | null | undefined);
    set dataDialog(val: string | null | undefined);
    size?: string;
    trackWidth?: string;
    trackColor?: string;
    indicatorWidth?: string;
    indicatorColor?: string;
    indicatorTransitionDuration?: string;
    waFocus: EventEmitter<FocusEvent>;
    waFocusHyphen: EventEmitter<FocusEvent>;
    waBlur: EventEmitter<FocusEvent>;
    waBlurHyphen: EventEmitter<FocusEvent>;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    private _lastPercentApplied;
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
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaProgressRingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaProgressRingDirective, "wa-progress-ring", never, { "value": { "alias": "value"; "required": false; }; "label": { "alias": "label"; "required": false; }; "dataDialogAttr": { "alias": "data-dialog"; "required": false; }; "dialogAttr": { "alias": "dialog"; "required": false; }; "dataDialog": { "alias": "dataDialog"; "required": false; }; "size": { "alias": "size"; "required": false; }; "trackWidth": { "alias": "trackWidth"; "required": false; }; "trackColor": { "alias": "trackColor"; "required": false; }; "indicatorWidth": { "alias": "indicatorWidth"; "required": false; }; "indicatorColor": { "alias": "indicatorColor"; "required": false; }; "indicatorTransitionDuration": { "alias": "indicatorTransitionDuration"; "required": false; }; }, { "waFocus": "waFocus"; "waFocusHyphen": "wa-focus"; "waBlur": "waBlur"; "waBlurHyphen": "wa-blur"; }, never, never, true, never>;
}
//# sourceMappingURL=progress-ring.directive.d.ts.map