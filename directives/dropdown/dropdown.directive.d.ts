import { EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * Type definition for dropdown placement options
 */
export type DropdownPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
/**
 * WaDropdownDirective
 *
 * Angular wrapper for the <wa-dropdown> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported dropdown attributes as @Input() properties
 * - Supports string inputs like placement
 * - Supports boolean attributes like disabled and stayOpenOnSelect
 * - Supports numeric inputs like distance and skidding
 * - Emits events for dropdown lifecycle: showEvent, afterShowEvent, hideEvent, afterHideEvent, selectEvent
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for trigger and content
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control: show(), hide(), and reposition()
 * - Implements ControlValueAccessor for ngModel support
 */
export declare class WaDropdownDirective implements OnInit, ControlValueAccessor {
    placement?: DropdownPlacement | string;
    disabled?: boolean | string;
    stayOpenOnSelect?: boolean | string;
    containingElement?: HTMLElement;
    distance?: number | string;
    skidding?: number | string;
    sync?: 'width' | 'height' | 'both' | string;
    boxShadow?: string;
    waShow: EventEmitter<Event>;
    waShowHyphen: EventEmitter<Event>;
    waAfterShow: EventEmitter<Event>;
    waAfterShowHyphen: EventEmitter<Event>;
    waHide: EventEmitter<Event>;
    waHideHyphen: EventEmitter<Event>;
    waAfterHide: EventEmitter<Event>;
    waAfterHideHyphen: EventEmitter<Event>;
    waSelect: EventEmitter<{
        item: HTMLElement;
    }>;
    waSelectHyphen: EventEmitter<{
        item: HTMLElement;
    }>;
    valueChange: EventEmitter<any>;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    private value;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    /**
     * Exposes the native dropdown element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Programmatically opens the dropdown
     */
    show(): void;
    /**
     * Programmatically closes the dropdown
     */
    hide(): void;
    /**
     * Programmatically repositions the dropdown
     */
    reposition(): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<WaDropdownDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaDropdownDirective, "wa-dropdown", never, { "placement": { "alias": "placement"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "stayOpenOnSelect": { "alias": "stayOpenOnSelect"; "required": false; }; "containingElement": { "alias": "containingElement"; "required": false; }; "distance": { "alias": "distance"; "required": false; }; "skidding": { "alias": "skidding"; "required": false; }; "sync": { "alias": "sync"; "required": false; }; "boxShadow": { "alias": "boxShadow"; "required": false; }; }, { "waShow": "waShow"; "waShowHyphen": "wa-show"; "waAfterShow": "waAfterShow"; "waAfterShowHyphen": "wa-after-show"; "waHide": "waHide"; "waHideHyphen": "wa-hide"; "waAfterHide": "waAfterHide"; "waAfterHideHyphen": "wa-after-hide"; "waSelect": "waSelect"; "waSelectHyphen": "wa-select"; "valueChange": "valueChange"; }, never, never, true, never>;
}
//# sourceMappingURL=dropdown.directive.d.ts.map