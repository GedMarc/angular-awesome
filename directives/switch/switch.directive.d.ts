import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { SizeToken } from '../../types/tokens';
import * as i0 from "@angular/core";
/**
 * WaSwitchDirective
 *
 * Angular wrapper for the <wa-switch> Web Component that allows declarative usage,
 * input binding, and integration with Angular forms.
 *
 * Features:
 * - Binds all supported switch attributes as @Input() properties
 * - Emits events for input, change, focusNative, blurNative
 * - Enables Angular-style class and style bindings
 * - Supports ngModel for form integration
 */
export declare class WaSwitchDirective implements OnInit, ControlValueAccessor, Validator {
    private _dataDialog;
    set dataDialogAttr(val: string | null | undefined);
    set dialogAttr(val: string | null | undefined);
    set dataDialog(val: string | null | undefined);
    disabled?: boolean | string;
    required?: boolean | string;
    hint?: string;
    size?: SizeToken | string;
    backgroundColor?: string;
    backgroundColorChecked?: string;
    borderColor?: string;
    borderColorChecked?: string;
    borderStyle?: string;
    borderWidth?: string;
    boxShadow?: string;
    height?: string;
    thumbColor?: string;
    thumbColorChecked?: string;
    thumbShadow?: string;
    thumbSize?: string;
    width?: string;
    changeEvent: EventEmitter<Event>;
    inputEvent: EventEmitter<Event>;
    focusEvent: EventEmitter<FocusEvent>;
    blurEvent: EventEmitter<FocusEvent>;
    checkedChange: EventEmitter<boolean>;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    private validatorChange?;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<WaSwitchDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaSwitchDirective, "wa-switch[waSwitch]", never, { "dataDialogAttr": { "alias": "data-dialog"; "required": false; }; "dialogAttr": { "alias": "dialog"; "required": false; }; "dataDialog": { "alias": "dataDialog"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "size": { "alias": "size"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "backgroundColorChecked": { "alias": "backgroundColorChecked"; "required": false; }; "borderColor": { "alias": "borderColor"; "required": false; }; "borderColorChecked": { "alias": "borderColorChecked"; "required": false; }; "borderStyle": { "alias": "borderStyle"; "required": false; }; "borderWidth": { "alias": "borderWidth"; "required": false; }; "boxShadow": { "alias": "boxShadow"; "required": false; }; "height": { "alias": "height"; "required": false; }; "thumbColor": { "alias": "thumbColor"; "required": false; }; "thumbColorChecked": { "alias": "thumbColorChecked"; "required": false; }; "thumbShadow": { "alias": "thumbShadow"; "required": false; }; "thumbSize": { "alias": "thumbSize"; "required": false; }; "width": { "alias": "width"; "required": false; }; }, { "changeEvent": "wa-change"; "inputEvent": "wa-input"; "focusEvent": "wa-focus"; "blurEvent": "wa-blur"; "checkedChange": "checkedChange"; }, never, never, true, never>;
}
//# sourceMappingURL=switch.directive.d.ts.map