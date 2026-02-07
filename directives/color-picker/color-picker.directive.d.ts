import { AfterViewInit, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { SizeToken } from '../../types/tokens';
import * as i0 from "@angular/core";
/**ple
 * WaColorPickerDirective
 *
 * Angular wrapper for the <wa-color-picker> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported color-picker attributes as @Input() properties
 * - Supports label, hint, value, format, opacity, and other customization
 * - Emits color-picker events (change, input, focusNative, blurNative, waInvalid)
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for label and hint content
 * - Supports custom styling via CSS variables
 * - Provides programmatic control through focusNative(), blurNative(), and other methods
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
export declare class WaColorPickerDirective implements OnInit, AfterViewInit, OnDestroy, OnChanges, ControlValueAccessor, Validator {
    label?: string;
    hint?: string;
    value?: string | null;
    format?: 'hex' | 'rgb' | 'hsl' | 'hsv' | string;
    withoutFormatToggle?: boolean | string;
    opacity?: boolean | string;
    uppercase?: boolean | string;
    size?: SizeToken | string;
    disabled?: boolean | string;
    required?: boolean | string;
    pattern?: string | RegExp | null;
    minlength?: number | string | null;
    maxlength?: number | string | null;
    name?: string | null;
    form?: string | null;
    swatches?: string | string[];
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    swatchSize?: string;
    swatchSpacing?: string;
    borderRadius?: string;
    dropdownWidth?: string;
    dropdownHeight?: string;
    waChange: EventEmitter<Event>;
    waChangeHyphen: EventEmitter<Event>;
    waInput: EventEmitter<Event>;
    waInputHyphen: EventEmitter<Event>;
    waFocus: EventEmitter<Event>;
    waFocusHyphen: EventEmitter<Event>;
    waBlur: EventEmitter<Event>;
    waBlurHyphen: EventEmitter<Event>;
    waInvalid: EventEmitter<Event>;
    waInvalidHyphen: EventEmitter<Event>;
    waShow: EventEmitter<CustomEvent<any>>;
    waShowHyphen: EventEmitter<CustomEvent<any>>;
    waAfterShow: EventEmitter<CustomEvent<any>>;
    waAfterShowHyphen: EventEmitter<CustomEvent<any>>;
    waHide: EventEmitter<CustomEvent<any>>;
    waHideHyphen: EventEmitter<CustomEvent<any>>;
    waAfterHide: EventEmitter<CustomEvent<any>>;
    waAfterHideHyphen: EventEmitter<CustomEvent<any>>;
    valueChange: EventEmitter<any>;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    private isWriting;
    private attrObserver?;
    private validatorChange?;
    /**
     * Extracts the most up-to-date value from an event or from the element.
     * Prefers CustomEvent.detail when available as many Web Components include
     * the new value there before attributes/properties reflect.
     */
    private readCurrentValueFromEvent;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Exposes the native color-picker element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Sets focusNative on the color-picker
     */
    focusNative(): void;
    /**
     * Removes focusNative from the color-picker
     */
    blurNative(): void;
    /**
     * Returns the color value in the specified format
     */
    getFormattedValue(format: 'hex' | 'rgb' | 'hsl' | 'hsv'): string;
    /**
     * Triggers form validation UI
     */
    reportValidity(): boolean;
    /**
     * Converts HSV to hex string
     */
    getHexString(h: number, s: number, v: number, a?: number): string;
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
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
    private setCssVar;
    writeValue(value: any): void;
    /**
     * Applies current @Input values to the underlying <wa-color-picker> element.
     * When changes are provided, only updates those that changed.
     */
    private applyInputs;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    validate(control: {
        value: any;
    }): ValidationErrors | null;
    registerOnValidatorChange?(fn: () => void): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaColorPickerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaColorPickerDirective, "wa-color-picker", never, { "label": { "alias": "label"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "value": { "alias": "value"; "required": false; }; "format": { "alias": "format"; "required": false; }; "withoutFormatToggle": { "alias": "withoutFormatToggle"; "required": false; }; "opacity": { "alias": "opacity"; "required": false; }; "uppercase": { "alias": "uppercase"; "required": false; }; "size": { "alias": "size"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; "pattern": { "alias": "pattern"; "required": false; }; "minlength": { "alias": "minlength"; "required": false; }; "maxlength": { "alias": "maxlength"; "required": false; }; "name": { "alias": "name"; "required": false; }; "form": { "alias": "form"; "required": false; }; "swatches": { "alias": "swatches"; "required": false; }; "color": { "alias": "color"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "fontSize": { "alias": "fontSize"; "required": false; }; "swatchSize": { "alias": "swatchSize"; "required": false; }; "swatchSpacing": { "alias": "swatchSpacing"; "required": false; }; "borderRadius": { "alias": "borderRadius"; "required": false; }; "dropdownWidth": { "alias": "dropdownWidth"; "required": false; }; "dropdownHeight": { "alias": "dropdownHeight"; "required": false; }; }, { "waChange": "waChange"; "waChangeHyphen": "wa-change"; "waInput": "waInput"; "waInputHyphen": "wa-input"; "waFocus": "waFocus"; "waFocusHyphen": "wa-focus"; "waBlur": "waBlur"; "waBlurHyphen": "wa-blur"; "waInvalid": "waInvalid"; "waInvalidHyphen": "wa-invalid"; "waShow": "waShow"; "waShowHyphen": "wa-show"; "waAfterShow": "waAfterShow"; "waAfterShowHyphen": "wa-after-show"; "waHide": "waHide"; "waHideHyphen": "wa-hide"; "waAfterHide": "waAfterHide"; "waAfterHideHyphen": "wa-after-hide"; "valueChange": "valueChange"; }, never, never, true, never>;
}
//# sourceMappingURL=color-picker.directive.d.ts.map