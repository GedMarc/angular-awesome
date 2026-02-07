import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { SizeToken, Appearance } from '../../types/tokens';
import * as i0 from "@angular/core";
/**
 * WaSelectWrapperComponent
 *
 * Angular wrapper for the <wa-select> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported select attributes as @Input() properties
 * - Emits events for input, change, focusNative, blurNative, etc.
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for wa-option elements
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
export declare class WaSelectWrapperComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
    value?: any | any[];
    label?: string;
    hint?: string;
    placeholder?: string;
    appearance?: Appearance | string;
    pill?: boolean | string;
    withClear?: boolean | string;
    disabled?: boolean | string;
    multiple?: boolean | string;
    size?: SizeToken | string;
    placement?: 'top' | 'bottom' | string;
    required?: boolean | string;
    maxOptionsVisible?: number | string;
    maxSelected?: number | string;
    form?: string;
    getTag?: any;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: string;
    boxShadow?: string;
    backgroundColorCurrent?: string;
    backgroundColorHover?: string;
    textColorCurrent?: string;
    textColorHover?: string;
    waInput: EventEmitter<Event>;
    waInputHyphen: EventEmitter<Event>;
    waChange: EventEmitter<Event>;
    waChangeHyphen: EventEmitter<Event>;
    waFocus: EventEmitter<FocusEvent>;
    waFocusHyphen: EventEmitter<FocusEvent>;
    waBlur: EventEmitter<FocusEvent>;
    waBlurHyphen: EventEmitter<FocusEvent>;
    waClear: EventEmitter<CustomEvent<any>>;
    waClearHyphen: EventEmitter<CustomEvent<any>>;
    waShow: EventEmitter<CustomEvent<any>>;
    waShowHyphen: EventEmitter<CustomEvent<any>>;
    waAfterShow: EventEmitter<CustomEvent<any>>;
    waAfterShowHyphen: EventEmitter<CustomEvent<any>>;
    waHide: EventEmitter<CustomEvent<any>>;
    waHideHyphen: EventEmitter<CustomEvent<any>>;
    waAfterHide: EventEmitter<CustomEvent<any>>;
    waAfterHideHyphen: EventEmitter<CustomEvent<any>>;
    waInvalid: EventEmitter<CustomEvent<any>>;
    waInvalidHyphen: EventEmitter<CustomEvent<any>>;
    valueChange: EventEmitter<any>;
    private el;
    private renderer;
    valueField?: string;
    trackBy?: (item: any) => string;
    private keyToObject;
    private objectToKey;
    private uidCounter;
    private getKeyFor;
    /** Register an option's value and return the key to set on DOM */
    registerOptionValue(val: any): string;
    /** Translate raw value(s) from WC back to Angular model values */
    private mapFromKeys;
    private onChange;
    private onTouched;
    /**
     * Internal flag to suppress model updates when we are writing programmatically
     * to the underlying element (prevents feedback loops with MutationObserver/events).
     */
    private isWriting;
    private attrObserver?;
    private validatorChange?;
    private parseMaxSelected;
    private getKeysFromValue;
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
     * Sets a CSS custom property on the native element if the value is truthy
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
    validate(control: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange?(fn: () => void): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaSelectWrapperComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaSelectWrapperComponent, "wa-select", never, { "value": { "alias": "value"; "required": false; }; "label": { "alias": "label"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "pill": { "alias": "pill"; "required": false; }; "withClear": { "alias": "withClear"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "multiple": { "alias": "multiple"; "required": false; }; "size": { "alias": "size"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "required": { "alias": "required"; "required": false; }; "maxOptionsVisible": { "alias": "maxOptionsVisible"; "required": false; }; "maxSelected": { "alias": "maxSelected"; "required": false; }; "form": { "alias": "form"; "required": false; }; "getTag": { "alias": "getTag"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "borderColor": { "alias": "borderColor"; "required": false; }; "borderWidth": { "alias": "borderWidth"; "required": false; }; "boxShadow": { "alias": "boxShadow"; "required": false; }; "backgroundColorCurrent": { "alias": "backgroundColorCurrent"; "required": false; }; "backgroundColorHover": { "alias": "backgroundColorHover"; "required": false; }; "textColorCurrent": { "alias": "textColorCurrent"; "required": false; }; "textColorHover": { "alias": "textColorHover"; "required": false; }; "valueField": { "alias": "valueField"; "required": false; }; "trackBy": { "alias": "trackBy"; "required": false; }; }, { "waInput": "waInput"; "waInputHyphen": "wa-input"; "waChange": "waChange"; "waChangeHyphen": "wa-change"; "waFocus": "waFocus"; "waFocusHyphen": "wa-focus"; "waBlur": "waBlur"; "waBlurHyphen": "wa-blur"; "waClear": "waClear"; "waClearHyphen": "wa-clear"; "waShow": "waShow"; "waShowHyphen": "wa-show"; "waAfterShow": "waAfterShow"; "waAfterShowHyphen": "wa-after-show"; "waHide": "waHide"; "waHideHyphen": "wa-hide"; "waAfterHide": "waAfterHide"; "waAfterHideHyphen": "wa-after-hide"; "waInvalid": "waInvalid"; "waInvalidHyphen": "wa-invalid"; "valueChange": "valueChange"; }, never, ["*"], true, never>;
}
/**
 * WaOptionDirective
 *
 * Angular wrapper for the <wa-option> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds value, label, and disabled attributes
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content
 * - Supports custom styling via CSS variables
 */
export declare class WaOptionComponent implements OnInit, OnChanges {
    value?: any;
    label?: string;
    disabled?: boolean | string;
    backgroundColorCurrent?: string;
    backgroundColorHover?: string;
    textColorCurrent?: string;
    textColorHover?: string;
    private el;
    private renderer;
    private parent;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    /**
     * Sets a CSS custom property on the native element if the value is truthy
     */
    private setCssVar;
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaOptionComponent, "wa-option", never, { "value": { "alias": "value"; "required": false; }; "label": { "alias": "label"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "backgroundColorCurrent": { "alias": "backgroundColorCurrent"; "required": false; }; "backgroundColorHover": { "alias": "backgroundColorHover"; "required": false; }; "textColorCurrent": { "alias": "textColorCurrent"; "required": false; }; "textColorHover": { "alias": "textColorHover"; "required": false; }; }, {}, never, ["*"], true, never>;
}
//# sourceMappingURL=select.directive.d.ts.map