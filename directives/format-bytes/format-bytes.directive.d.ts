import { OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * WaFormatBytesDirective
 *
 * Angular wrapper for the <wa-format-bytes> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported format-bytes attributes as @Input() properties
 * - Supports string inputs like unit, display, and lang
 * - Supports numeric input for value
 * - Implements ControlValueAccessor for ngModel support
 * - Enables Angular-style class and style bindings
 */
export declare class WaFormatBytesDirective implements OnInit, ControlValueAccessor {
    value?: number;
    unit?: 'byte' | 'bit';
    display?: 'long' | 'short' | 'narrow';
    lang?: string;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    ngOnInit(): void;
    /**
     * Exposes the native format-bytes element for direct interaction
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
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaFormatBytesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaFormatBytesDirective, "wa-format-bytes", never, { "value": { "alias": "value"; "required": false; }; "unit": { "alias": "unit"; "required": false; }; "display": { "alias": "display"; "required": false; }; "lang": { "alias": "lang"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=format-bytes.directive.d.ts.map