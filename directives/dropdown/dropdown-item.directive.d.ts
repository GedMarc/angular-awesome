import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * WaDropdownItemDirective
 *
 * Angular wrapper for the <wa-dropdown-item> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds attributes: type, checked, value, loading, disabled, label, variant
 * - Emits events: blurNative, focusNative
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, icon, details, submenu, etc.
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support on checkbox type
 *
 * Slots:
 * - default: The dropdown item's content
 * - icon: Icon to display at the start of the item (replaces start slot)
 * - details: Additional details like keyboard shortcuts
 * - submenu: Nested dropdown items for creating submenus
 */
export declare class WaDropdownItemDirective implements OnInit, ControlValueAccessor {
    type?: 'normal' | 'checkbox' | string;
    checked?: boolean | string;
    value?: string;
    loading?: boolean | string;
    disabled?: boolean | string;
    label?: string;
    variant?: 'danger' | string;
    backgroundColorHover?: string;
    textColorHover?: string;
    padding?: string;
    margin?: string;
    fontSize?: string;
    private _dataDialog;
    set dataDialogAttr(val: string | null | undefined);
    set dialogAttr(val: string | null | undefined);
    set dataDialog(val: string | null | undefined);
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    ngOnInit(): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<WaDropdownItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaDropdownItemDirective, "wa-dropdown-item", never, { "type": { "alias": "type"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; "value": { "alias": "value"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "label": { "alias": "label"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "backgroundColorHover": { "alias": "backgroundColorHover"; "required": false; }; "textColorHover": { "alias": "textColorHover"; "required": false; }; "padding": { "alias": "padding"; "required": false; }; "margin": { "alias": "margin"; "required": false; }; "fontSize": { "alias": "fontSize"; "required": false; }; "dataDialogAttr": { "alias": "data-dialog"; "required": false; }; "dialogAttr": { "alias": "dialog"; "required": false; }; "dataDialog": { "alias": "dataDialog"; "required": false; }; }, { "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; }, never, never, true, never>;
}
//# sourceMappingURL=dropdown-item.directive.d.ts.map