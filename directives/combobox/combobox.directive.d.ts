import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { Appearance, SizeToken } from '../../types/tokens';
import * as i0 from "@angular/core";
/**
 * WaComboboxComponent
 *
 * Angular wrapper for the <wa-combobox> Web Awesome component that exposes
 * declarative bindings, ControlValueAccessor integration, and slot projection.
 */
export declare class WaComboboxComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, Validator {
    value?: any | any[];
    name?: string;
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
    withLabel?: boolean | string;
    withHint?: boolean | string;
    allowCustomValue?: boolean | string;
    autocomplete?: 'list' | 'none' | string;
    validationTarget?: string;
    filter?: ((option: any, query: string) => boolean) | null;
    getTag?: any;
    valueField?: string;
    trackBy?: (item: any) => string;
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
    private onChange;
    private onTouched;
    private validatorChange?;
    private attrObserver?;
    private isWriting;
    private keyToObject;
    private objectToKey;
    private uidCounter;
    private getKeyFor;
    /** Register an option's value and return the corresponding DOM key */
    registerOptionValue(val: any): string;
    private mapFromKeys;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    ngOnDestroy(): void;
    private applyInputs;
    private isMultiple;
    get nativeElement(): HTMLElement;
    private setAttr;
    private setNumericAttr;
    private setCssVar;
    private setBooleanAttr;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    validate(control: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange?(fn: () => void): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaComboboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaComboboxComponent, "wa-combobox", never, { "value": { "alias": "value"; "required": false; }; "name": { "alias": "name"; "required": false; }; "label": { "alias": "label"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "pill": { "alias": "pill"; "required": false; }; "withClear": { "alias": "withClear"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "multiple": { "alias": "multiple"; "required": false; }; "size": { "alias": "size"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "required": { "alias": "required"; "required": false; }; "maxOptionsVisible": { "alias": "maxOptionsVisible"; "required": false; }; "withLabel": { "alias": "withLabel"; "required": false; }; "withHint": { "alias": "withHint"; "required": false; }; "allowCustomValue": { "alias": "allowCustomValue"; "required": false; }; "autocomplete": { "alias": "autocomplete"; "required": false; }; "validationTarget": { "alias": "validationTarget"; "required": false; }; "filter": { "alias": "filter"; "required": false; }; "getTag": { "alias": "getTag"; "required": false; }; "valueField": { "alias": "valueField"; "required": false; }; "trackBy": { "alias": "trackBy"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "borderColor": { "alias": "borderColor"; "required": false; }; "borderWidth": { "alias": "borderWidth"; "required": false; }; "boxShadow": { "alias": "boxShadow"; "required": false; }; "backgroundColorCurrent": { "alias": "backgroundColorCurrent"; "required": false; }; "backgroundColorHover": { "alias": "backgroundColorHover"; "required": false; }; "textColorCurrent": { "alias": "textColorCurrent"; "required": false; }; "textColorHover": { "alias": "textColorHover"; "required": false; }; }, { "waInput": "waInput"; "waInputHyphen": "wa-input"; "waChange": "waChange"; "waChangeHyphen": "wa-change"; "waFocus": "waFocus"; "waFocusHyphen": "wa-focus"; "waBlur": "waBlur"; "waBlurHyphen": "wa-blur"; "waClear": "waClear"; "waClearHyphen": "wa-clear"; "waShow": "waShow"; "waShowHyphen": "wa-show"; "waAfterShow": "waAfterShow"; "waAfterShowHyphen": "wa-after-show"; "waHide": "waHide"; "waHideHyphen": "wa-hide"; "waAfterHide": "waAfterHide"; "waAfterHideHyphen": "wa-after-hide"; "waInvalid": "waInvalid"; "waInvalidHyphen": "wa-invalid"; "valueChange": "valueChange"; }, never, ["*"], true, never>;
}
//# sourceMappingURL=combobox.directive.d.ts.map