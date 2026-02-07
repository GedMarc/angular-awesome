import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Appearance } from '../../types/tokens';
import * as i0 from "@angular/core";
/**
 * WaButtonDirective
 *
 * Angular wrapper for the <wa-button> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported button attributes as @Input() properties
 * - Supports boolean attributes like pill, caret, disabled, loading
 * - Emits button events (blurNative, focusNative, waInvalid)
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for start, end, and default content
 * - Supports custom styling via CSS variables
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
export declare class WaButtonDirective implements OnInit, OnChanges {
    variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'inherit' | string;
    /**
     * Appearance can be a single token or a space-separated combination of tokens.
     * Strictly typed to known tokens only.
     */
    appearance?: Appearance;
    size?: 'small' | 'medium' | 'large' | 'inherit' | string;
    pill?: boolean | string;
    withCaret?: boolean | string;
    caret?: boolean | string;
    disabled?: boolean | string;
    loading?: boolean | string;
    type?: 'button' | 'submit' | 'reset' | string;
    name?: string;
    value?: string;
    href?: string;
    target?: '_blank' | '_self' | '_parent' | '_top' | string;
    rel?: string;
    download?: string;
    form?: string;
    formAction?: string;
    formEnctype?: string;
    formMethod?: string;
    formNoValidate?: boolean | string;
    formTarget?: string;
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    private _dataDialog;
    set dataDialogAttr(val: string | null | undefined);
    set dialogAttr(val: string | null | undefined);
    set dataDialog(val: string | null | undefined);
    waBlur: EventEmitter<Event>;
    waBlurHyphen: EventEmitter<Event>;
    waFocus: EventEmitter<Event>;
    waFocusHyphen: EventEmitter<Event>;
    waInvalid: EventEmitter<Event>;
    waInvalidHyphen: EventEmitter<Event>;
    private el;
    private renderer;
    ngOnInit(): void;
    /**
     * Exposes the native button element for direct interaction
     */
    get nativeButton(): HTMLElement;
    /**
     * Programmatically triggers click on the button
     */
    click(): void;
    /**
     * Sets focusNative on the button
     */
    focus(): void;
    /**
     * Removes focusNative from the button
     */
    blur(): void;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    private setBooleanAttr;
    ngOnChanges(changes: SimpleChanges): void;
    private setOrRemoveAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaButtonDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaButtonDirective, "wa-button", never, { "variant": { "alias": "variant"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "size": { "alias": "size"; "required": false; }; "pill": { "alias": "pill"; "required": false; }; "withCaret": { "alias": "withCaret"; "required": false; }; "caret": { "alias": "caret"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "type": { "alias": "type"; "required": false; }; "name": { "alias": "name"; "required": false; }; "value": { "alias": "value"; "required": false; }; "href": { "alias": "href"; "required": false; }; "target": { "alias": "target"; "required": false; }; "rel": { "alias": "rel"; "required": false; }; "download": { "alias": "download"; "required": false; }; "form": { "alias": "form"; "required": false; }; "formAction": { "alias": "formAction"; "required": false; }; "formEnctype": { "alias": "formEnctype"; "required": false; }; "formMethod": { "alias": "formMethod"; "required": false; }; "formNoValidate": { "alias": "formNoValidate"; "required": false; }; "formTarget": { "alias": "formTarget"; "required": false; }; "color": { "alias": "color"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "fontSize": { "alias": "fontSize"; "required": false; }; "dataDialogAttr": { "alias": "data-dialog"; "required": false; }; "dialogAttr": { "alias": "dialog"; "required": false; }; "dataDialog": { "alias": "dataDialog"; "required": false; }; }, { "waBlur": "waBlur"; "waBlurHyphen": "wa-blur"; "waFocus": "waFocus"; "waFocusHyphen": "wa-focus"; "waInvalid": "waInvalid"; "waInvalidHyphen": "wa-invalid"; }, never, never, true, never>;
}
//# sourceMappingURL=button.directive.d.ts.map