import { OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * WaFormatNumberDirective
 *
 * Angular wrapper for the <wa-format-number> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported format-number attributes as @Input() properties
 * - Supports string inputs for number formatting options
 * - Implements ControlValueAccessor for ngModel support
 * - Enables Angular-style class and style bindings
 * - Supports styling inputs via CSS custom properties
 */
export declare class WaFormatNumberDirective implements OnInit, ControlValueAccessor {
    value?: number;
    type?: 'currency' | 'decimal' | 'percent';
    currency?: string;
    currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
    lang?: string;
    withoutGrouping?: boolean | string;
    minimumIntegerDigits?: number | string;
    minimumFractionDigits?: number | string;
    maximumFractionDigits?: number | string;
    minimumSignificantDigits?: number | string;
    maximumSignificantDigits?: number | string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    display?: string;
    textAlign?: string;
    padding?: string;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    ngOnInit(): void;
    /**
     * Exposes the native format-number element for direct interaction
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
    static ɵfac: i0.ɵɵFactoryDeclaration<WaFormatNumberDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaFormatNumberDirective, "wa-format-number", never, { "value": { "alias": "value"; "required": false; }; "type": { "alias": "type"; "required": false; }; "currency": { "alias": "currency"; "required": false; }; "currencyDisplay": { "alias": "currencyDisplay"; "required": false; }; "lang": { "alias": "lang"; "required": false; }; "withoutGrouping": { "alias": "withoutGrouping"; "required": false; }; "minimumIntegerDigits": { "alias": "minimumIntegerDigits"; "required": false; }; "minimumFractionDigits": { "alias": "minimumFractionDigits"; "required": false; }; "maximumFractionDigits": { "alias": "maximumFractionDigits"; "required": false; }; "minimumSignificantDigits": { "alias": "minimumSignificantDigits"; "required": false; }; "maximumSignificantDigits": { "alias": "maximumSignificantDigits"; "required": false; }; "color": { "alias": "color"; "required": false; }; "fontSize": { "alias": "fontSize"; "required": false; }; "fontWeight": { "alias": "fontWeight"; "required": false; }; "display": { "alias": "display"; "required": false; }; "textAlign": { "alias": "textAlign"; "required": false; }; "padding": { "alias": "padding"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=format-number.directive.d.ts.map