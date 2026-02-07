import { OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * WaFormatDateDirective
 *
 * Angular wrapper for the <wa-format-date> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported format-date attributes as @Input() properties
 * - Supports string inputs for date formatting options
 * - Implements ControlValueAccessor for ngModel support
 * - Enables Angular-style class and style bindings
 * - Supports styling inputs via CSS custom properties
 */
export declare class WaFormatDateDirective implements OnInit, ControlValueAccessor {
    date?: Date | string;
    weekday?: 'narrow' | 'short' | 'long';
    era?: 'narrow' | 'short' | 'long';
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
    day?: 'numeric' | '2-digit';
    hour?: 'numeric' | '2-digit';
    minute?: 'numeric' | '2-digit';
    second?: 'numeric' | '2-digit';
    timeZoneName?: 'short' | 'long';
    timeZone?: string;
    hourFormat?: 'auto' | '12' | '24';
    lang?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    display?: string;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    ngOnInit(): void;
    /**
     * Exposes the native format-date element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    /**
     * Sets a date attribute on the native element if the value is not null or undefined
     */
    private setDateAttr;
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    private setCssVar;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaFormatDateDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaFormatDateDirective, "wa-format-date", never, { "date": { "alias": "date"; "required": false; }; "weekday": { "alias": "weekday"; "required": false; }; "era": { "alias": "era"; "required": false; }; "year": { "alias": "year"; "required": false; }; "month": { "alias": "month"; "required": false; }; "day": { "alias": "day"; "required": false; }; "hour": { "alias": "hour"; "required": false; }; "minute": { "alias": "minute"; "required": false; }; "second": { "alias": "second"; "required": false; }; "timeZoneName": { "alias": "timeZoneName"; "required": false; }; "timeZone": { "alias": "timeZone"; "required": false; }; "hourFormat": { "alias": "hourFormat"; "required": false; }; "lang": { "alias": "lang"; "required": false; }; "color": { "alias": "color"; "required": false; }; "fontSize": { "alias": "fontSize"; "required": false; }; "fontWeight": { "alias": "fontWeight"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "padding": { "alias": "padding"; "required": false; }; "margin": { "alias": "margin"; "required": false; }; "display": { "alias": "display"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=format-date.directive.d.ts.map