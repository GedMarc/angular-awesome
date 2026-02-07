import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaDrawerDirective
 *
 * Angular wrapper for the <wa-drawer> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported drawer attributes as @Input() properties
 * - Supports string inputs like label and placement
 * - Supports boolean attributes like open, withoutHeader, lightDismiss
 * - Emits events for drawer lifecycle: showEvent, afterShowEvent, hideEvent, afterHideEvent
 * - Emits native focusNative and blurNative events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, label, header-actions, and footer
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control: show() and hide()
 */
export declare class WaDrawerDirective implements OnInit, OnChanges {
    open?: boolean | string;
    withoutHeader?: boolean | string;
    lightDismiss?: boolean | string;
    label?: string;
    placement?: 'top' | 'end' | 'bottom' | 'start' | string;
    backgroundColor?: string;
    boxShadow?: string;
    spacing?: string;
    size?: string;
    showDuration?: string;
    hideDuration?: string;
    waShow: EventEmitter<CustomEvent<any>>;
    waShowHyphen: EventEmitter<CustomEvent<any>>;
    waAfterShow: EventEmitter<CustomEvent<any>>;
    waAfterShowHyphen: EventEmitter<CustomEvent<any>>;
    waHide: EventEmitter<CustomEvent<any>>;
    waHideHyphen: EventEmitter<CustomEvent<any>>;
    waAfterHide: EventEmitter<CustomEvent<any>>;
    waAfterHideHyphen: EventEmitter<CustomEvent<any>>;
    waFocus: EventEmitter<FocusEvent>;
    waFocusHyphen: EventEmitter<FocusEvent>;
    waBlur: EventEmitter<FocusEvent>;
    waBlurHyphen: EventEmitter<FocusEvent>;
    openChange: EventEmitter<boolean>;
    private el;
    private renderer;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    /**
     * Exposes the native drawer element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Programmatically opens the drawer
     */
    show(): void;
    /**
     * Programmatically closes the drawer
     */
    hide(): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<WaDrawerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaDrawerDirective, "wa-drawer", never, { "open": { "alias": "open"; "required": false; }; "withoutHeader": { "alias": "withoutHeader"; "required": false; }; "lightDismiss": { "alias": "lightDismiss"; "required": false; }; "label": { "alias": "label"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "boxShadow": { "alias": "boxShadow"; "required": false; }; "spacing": { "alias": "spacing"; "required": false; }; "size": { "alias": "size"; "required": false; }; "showDuration": { "alias": "showDuration"; "required": false; }; "hideDuration": { "alias": "hideDuration"; "required": false; }; }, { "waShow": "waShow"; "waShowHyphen": "wa-show"; "waAfterShow": "waAfterShow"; "waAfterShowHyphen": "wa-after-show"; "waHide": "waHide"; "waHideHyphen": "wa-hide"; "waAfterHide": "waAfterHide"; "waAfterHideHyphen": "wa-after-hide"; "waFocus": "waFocus"; "waFocusHyphen": "wa-focus"; "waBlur": "waBlur"; "waBlurHyphen": "wa-blur"; "openChange": "openChange"; }, never, never, true, never>;
}
//# sourceMappingURL=drawer.directive.d.ts.map