import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Appearance } from '../../types/tokens';
import * as i0 from "@angular/core";
/**
 * WaInputDirective
 *
 * Angular wrapper for the <wa-input> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported input attributes as @Input() properties
 * - Supports string inputs like type, label, placeholder, etc.
 * - Supports numeric inputs like minlength, maxlength, min, max, etc.
 * - Supports boolean attributes like required, readonly, clearable, etc.
 * - Emits events for input, change, focusNative, blurNative, etc.
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for label, hint, start, end, etc.
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control: focusNative(), blurNative(), select(), etc.
 * - Implements ControlValueAccessor for ngModel support
 */
export declare class WaInputDirective implements OnInit, OnChanges, ControlValueAccessor, Validator {
    type?: string;
    value?: string | number | null;
    size?: 'small' | 'medium' | 'large' | 'inherit' | string;
    appearance?: Appearance | string;
    pill?: boolean | string;
    label?: string;
    hint?: string;
    withClear?: boolean | string;
    placeholder?: string;
    readonly?: boolean | string;
    passwordToggle?: boolean | string;
    passwordVisible?: boolean | string;
    withoutSpinButtons?: boolean | string;
    form?: string | null;
    required?: boolean | string;
    pattern?: string;
    minlength?: number | string;
    maxlength?: number | string;
    min?: number | string;
    max?: number | string;
    step?: number | 'any' | string;
    autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' | string;
    autocorrect?: 'on' | 'off' | string;
    autocomplete?: string;
    autofocus?: boolean | string;
    enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | string;
    spellcheck?: boolean | string;
    inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' | string;
    withLabel?: boolean | string;
    withHint?: boolean | string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: string;
    boxShadow?: string;
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
    waInvalid: EventEmitter<CustomEvent<any>>;
    waInvalidHyphen: EventEmitter<CustomEvent<any>>;
    valueChange: EventEmitter<string | number | null>;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    private validatorChange?;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    /**
     * Exposes the native input element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Programmatically focuses the input
     */
    focus(options?: FocusOptions): void;
    /**
     * Programmatically blurs the input
     */
    blur(): void;
    /**
     * Programmatically selects all text in the input
     */
    select(): void;
    /**
     * Programmatically sets the selection range
     */
    setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none'): void;
    /**
     * Programmatically sets the range text
     */
    setRangeText(replacement: string, start: number, end: number, selectMode?: 'select' | 'start' | 'end' | 'preserve'): void;
    /**
     * Programmatically shows the picker (for date, color, etc. inputs)
     */
    showPicker(): void;
    /**
     * Programmatically steps up the value (for number inputs)
     */
    stepUp(): void;
    /**
     * Programmatically steps down the value (for number inputs)
     */
    stepDown(): void;
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
    validate(control: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange?(fn: () => void): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaInputDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaInputDirective, "wa-input", never, { "type": { "alias": "type"; "required": false; }; "value": { "alias": "value"; "required": false; }; "size": { "alias": "size"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "pill": { "alias": "pill"; "required": false; }; "label": { "alias": "label"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "withClear": { "alias": "withClear"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "passwordToggle": { "alias": "passwordToggle"; "required": false; }; "passwordVisible": { "alias": "passwordVisible"; "required": false; }; "withoutSpinButtons": { "alias": "withoutSpinButtons"; "required": false; }; "form": { "alias": "form"; "required": false; }; "required": { "alias": "required"; "required": false; }; "pattern": { "alias": "pattern"; "required": false; }; "minlength": { "alias": "minlength"; "required": false; }; "maxlength": { "alias": "maxlength"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "step": { "alias": "step"; "required": false; }; "autocapitalize": { "alias": "autocapitalize"; "required": false; }; "autocorrect": { "alias": "autocorrect"; "required": false; }; "autocomplete": { "alias": "autocomplete"; "required": false; }; "autofocus": { "alias": "autofocus"; "required": false; }; "enterkeyhint": { "alias": "enterkeyhint"; "required": false; }; "spellcheck": { "alias": "spellcheck"; "required": false; }; "inputmode": { "alias": "inputmode"; "required": false; }; "withLabel": { "alias": "withLabel"; "required": false; }; "withHint": { "alias": "withHint"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "borderColor": { "alias": "borderColor"; "required": false; }; "borderWidth": { "alias": "borderWidth"; "required": false; }; "boxShadow": { "alias": "boxShadow"; "required": false; }; }, { "waInput": "waInput"; "waInputHyphen": "wa-input"; "waChange": "waChange"; "waChangeHyphen": "wa-change"; "waFocus": "waFocus"; "waFocusHyphen": "wa-focus"; "waBlur": "waBlur"; "waBlurHyphen": "wa-blur"; "waClear": "waClear"; "waClearHyphen": "wa-clear"; "waInvalid": "waInvalid"; "waInvalidHyphen": "wa-invalid"; "valueChange": "valueChange"; }, never, never, true, never>;
}
//# sourceMappingURL=input.directive.d.ts.map