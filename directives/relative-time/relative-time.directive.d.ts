import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * WaRelativeTimeDirective
 *
 * Angular wrapper for the <wa-relative-time> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds date attribute via ngModel (ISO 8601 string or Date)
 * - Supports format, numeric, lang, and sync inputs
 * - Emits focusNative and blurNative events
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support
 */
export declare class WaRelativeTimeDirective implements OnInit, ControlValueAccessor {
    format?: 'long' | 'short' | 'narrow' | string;
    numeric?: 'auto' | 'always' | string;
    lang?: string;
    sync?: boolean | string;
    display?: string;
    focusEvent: EventEmitter<FocusEvent>;
    blurEvent: EventEmitter<FocusEvent>;
    private el;
    private renderer;
    private onChange;
    private onTouched;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<WaRelativeTimeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaRelativeTimeDirective, "wa-relative-time[ngModel]", never, { "format": { "alias": "format"; "required": false; }; "numeric": { "alias": "numeric"; "required": false; }; "lang": { "alias": "lang"; "required": false; }; "sync": { "alias": "sync"; "required": false; }; "display": { "alias": "display"; "required": false; }; }, { "focusEvent": "focusEvent"; "blurEvent": "blurEvent"; }, never, never, true, never>;
}
//# sourceMappingURL=relative-time.directive.d.ts.map