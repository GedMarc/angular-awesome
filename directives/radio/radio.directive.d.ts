import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { SizeToken } from '../../types/tokens';
import * as i0 from "@angular/core";
/**
 * WaRadioGroupDirective
 *
 * Angular wrapper for the <wa-radio-group> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported radio group attributes as @Input() properties
 * - Emits events for input, change, focusNative, blurNative, etc.
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for radio buttons
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
export declare class WaRadioGroupDirective implements OnInit, OnChanges, ControlValueAccessor, Validator {
    value?: string | null;
    label?: string;
    hint?: string;
    name?: string;
    orientation?: 'horizontal' | 'vertical' | string;
    size?: SizeToken | string;
    required?: boolean | string;
    disabled?: boolean | string;
    withLabel?: boolean | string;
    withHint?: boolean | string;
    styleRadiosGap?: string;
    waInput: EventEmitter<Event>;
    waInputHyphen: EventEmitter<Event>;
    waChange: EventEmitter<Event>;
    waChangeHyphen: EventEmitter<Event>;
    waFocus: EventEmitter<FocusEvent>;
    waFocusHyphen: EventEmitter<FocusEvent>;
    waBlur: EventEmitter<FocusEvent>;
    waBlurHyphen: EventEmitter<FocusEvent>;
    waInvalid: EventEmitter<CustomEvent<any>>;
    waInvalidHyphen: EventEmitter<CustomEvent<any>>;
    valueChange: EventEmitter<any>;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    private validatorChange?;
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
    validate(control: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange?(fn: () => void): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaRadioGroupDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaRadioGroupDirective, "wa-radio-group", never, { "value": { "alias": "value"; "required": false; }; "label": { "alias": "label"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "name": { "alias": "name"; "required": false; }; "orientation": { "alias": "orientation"; "required": false; }; "size": { "alias": "size"; "required": false; }; "required": { "alias": "required"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "withLabel": { "alias": "withLabel"; "required": false; }; "withHint": { "alias": "withHint"; "required": false; }; "styleRadiosGap": { "alias": "styleRadiosGap"; "required": false; }; }, { "waInput": "waInput"; "waInputHyphen": "wa-input"; "waChange": "waChange"; "waChangeHyphen": "wa-change"; "waFocus": "waFocus"; "waFocusHyphen": "wa-focus"; "waBlur": "waBlur"; "waBlurHyphen": "wa-blur"; "waInvalid": "waInvalid"; "waInvalidHyphen": "wa-invalid"; "valueChange": "valueChange"; }, never, never, true, never>;
}
/**
 * WaRadioDirective
 *
 * Angular wrapper for the <wa-radio> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported radio attributes as @Input() properties
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content
 * - Supports custom styling via CSS variables
 * - Supports button appearance (replaces wa-radio-button)
 */
export declare class WaRadioDirective implements OnInit, OnChanges {
    value?: string;
    form?: string | null;
    checked?: boolean | string;
    disabled?: boolean | string;
    appearance?: 'button' | string;
    withPrefix?: boolean | string;
    withSuffix?: boolean | string;
    blur: EventEmitter<FocusEvent>;
    focus: EventEmitter<FocusEvent>;
    styleBackgroundColor?: string;
    styleBackgroundColorChecked?: string;
    styleBorderColor?: string;
    styleBorderColorChecked?: string;
    styleBorderStyle?: string;
    styleBorderWidth?: string;
    styleBoxShadow?: string;
    styleCheckedIconColor?: string;
    styleCheckedIconScale?: string;
    styleToggleSize?: string;
    styleIndicatorColor?: string;
    styleIndicatorWidth?: string;
    styleDisplay?: string;
    private el;
    private renderer;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    private setCssVar;
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaRadioDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaRadioDirective, "wa-radio", never, { "value": { "alias": "value"; "required": false; }; "form": { "alias": "form"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "withPrefix": { "alias": "withPrefix"; "required": false; }; "withSuffix": { "alias": "withSuffix"; "required": false; }; "styleBackgroundColor": { "alias": "styleBackgroundColor"; "required": false; }; "styleBackgroundColorChecked": { "alias": "styleBackgroundColorChecked"; "required": false; }; "styleBorderColor": { "alias": "styleBorderColor"; "required": false; }; "styleBorderColorChecked": { "alias": "styleBorderColorChecked"; "required": false; }; "styleBorderStyle": { "alias": "styleBorderStyle"; "required": false; }; "styleBorderWidth": { "alias": "styleBorderWidth"; "required": false; }; "styleBoxShadow": { "alias": "styleBoxShadow"; "required": false; }; "styleCheckedIconColor": { "alias": "styleCheckedIconColor"; "required": false; }; "styleCheckedIconScale": { "alias": "styleCheckedIconScale"; "required": false; }; "styleToggleSize": { "alias": "styleToggleSize"; "required": false; }; "styleIndicatorColor": { "alias": "styleIndicatorColor"; "required": false; }; "styleIndicatorWidth": { "alias": "styleIndicatorWidth"; "required": false; }; "styleDisplay": { "alias": "styleDisplay"; "required": false; }; }, { "blur": "blur"; "focus": "focus"; }, never, never, true, never>;
}
/**
 * @deprecated Use WaRadioDirective with appearance="button" instead
 *
 * This directive is kept for backward compatibility but will be removed in a future version.
 * Please migrate to <wa-radio appearance="button"> as per the changelog.
 */
export declare class WaRadioButtonDirective implements OnInit {
    value?: string;
    checked?: boolean | string;
    disabled?: boolean | string;
    withPrefix?: boolean | string;
    withSuffix?: boolean | string;
    styleIndicatorColor?: string;
    styleIndicatorWidth?: string;
    styleDisplay?: string;
    private el;
    private renderer;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaRadioButtonDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaRadioButtonDirective, "wa-radio-button", never, { "value": { "alias": "value"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "withPrefix": { "alias": "withPrefix"; "required": false; }; "withSuffix": { "alias": "withSuffix"; "required": false; }; "styleIndicatorColor": { "alias": "styleIndicatorColor"; "required": false; }; "styleIndicatorWidth": { "alias": "styleIndicatorWidth"; "required": false; }; "styleDisplay": { "alias": "styleDisplay"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=radio.directive.d.ts.map