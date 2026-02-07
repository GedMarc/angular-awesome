import { EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { SizeToken } from '../../types/tokens';
import * as i0 from "@angular/core";
/**
 * WaCheckboxDirective
 *
 * Angular wrapper for the <wa-checkbox> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported checkbox attributes as @Input() properties
 * - Supports boolean attributes like checked, disabled, required, indeterminate
 * - Emits checkbox events (change, input, blurNative, focusNative, waInvalid); also re-emits checkedChange for compatibility
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for label and hint content
 * - Supports custom styling via CSS variables
 * - Provides accessibility support through aria attributes
 * - Implements ControlValueAccessor for ngModel support
 */
export declare class WaCheckboxDirective implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, Validator {
    private _dataDialog;
    set dataDialogAttr(val: string | null | undefined);
    set dialogAttr(val: string | null | undefined);
    set dataDialog(val: string | null | undefined);
    checked?: boolean | string;
    value?: string | null;
    name?: string;
    form?: string;
    hint?: string;
    disabled?: boolean | string;
    required?: boolean | string;
    indeterminate?: boolean | string;
    size?: SizeToken | string;
    backgroundColor?: string;
    backgroundColorChecked?: string;
    borderColor?: string;
    borderColorChecked?: string;
    borderRadius?: string;
    borderStyle?: string;
    borderWidth?: string;
    boxShadow?: string;
    checkedIconColor?: string;
    checkedIconScale?: string;
    toggleSize?: string;
    checkedChange: EventEmitter<boolean>;
    waInput: EventEmitter<Event>;
    waInputHyphen: EventEmitter<Event>;
    waBlur: EventEmitter<Event>;
    waBlurHyphen: EventEmitter<Event>;
    waFocus: EventEmitter<Event>;
    waFocusHyphen: EventEmitter<Event>;
    waChange: EventEmitter<Event>;
    waChangeHyphen: EventEmitter<Event>;
    waInvalid: EventEmitter<Event>;
    waInvalidHyphen: EventEmitter<Event>;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    /**
     * Internal flag to suppress model updates when we are writing programmatically
     * to the underlying element (prevents feedback loops with MutationObserver/events).
     */
    private isWriting;
    private attrObserver?;
    private validatorChange?;
    /**
     * Safely determine the current checked state by preferring the property and
     * falling back to attributes some environments/components use.
     */
    private getCurrentChecked;
    /**
     * Safely derive the checked value from a change/input CustomEvent if available.
     */
    private getCheckedFromEvent;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    ngOnDestroy(): void;
    validate(control: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange?(fn: () => void): void;
    /**
     * Exposes the native checkbox element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Programmatically clicks the checkbox
     */
    click(): void;
    /**
     * Sets focusNative on the checkbox
     */
    focus(): void;
    /**
     * Removes focusNative from the checkbox
     */
    blur(): void;
    /**
     * Sets custom validity message for the checkbox
     */
    setCustomValidity(message: string): void;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    private setBooleanAttr;
    /**
     * Toggles a boolean attribute based on a boolean value (adds when true, removes when false)
     */
    private toggleBooleanAttr;
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    private setCssVar;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaCheckboxDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaCheckboxDirective, "wa-checkbox", never, { "dataDialogAttr": { "alias": "data-dialog"; "required": false; }; "dialogAttr": { "alias": "dialog"; "required": false; }; "dataDialog": { "alias": "dataDialog"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; "value": { "alias": "value"; "required": false; }; "name": { "alias": "name"; "required": false; }; "form": { "alias": "form"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; "indeterminate": { "alias": "indeterminate"; "required": false; }; "size": { "alias": "size"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "backgroundColorChecked": { "alias": "backgroundColorChecked"; "required": false; }; "borderColor": { "alias": "borderColor"; "required": false; }; "borderColorChecked": { "alias": "borderColorChecked"; "required": false; }; "borderRadius": { "alias": "borderRadius"; "required": false; }; "borderStyle": { "alias": "borderStyle"; "required": false; }; "borderWidth": { "alias": "borderWidth"; "required": false; }; "boxShadow": { "alias": "boxShadow"; "required": false; }; "checkedIconColor": { "alias": "checkedIconColor"; "required": false; }; "checkedIconScale": { "alias": "checkedIconScale"; "required": false; }; "toggleSize": { "alias": "toggleSize"; "required": false; }; }, { "checkedChange": "checkedChange"; "waInput": "waInput"; "waInputHyphen": "wa-input"; "waBlur": "waBlur"; "waBlurHyphen": "wa-blur"; "waFocus": "waFocus"; "waFocusHyphen": "wa-focus"; "waChange": "waChange"; "waChangeHyphen": "wa-change"; "waInvalid": "waInvalid"; "waInvalidHyphen": "wa-invalid"; }, never, never, true, never>;
}
//# sourceMappingURL=checkbox.directive.d.ts.map