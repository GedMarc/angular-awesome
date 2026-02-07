import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Appearance } from '../../types/tokens';
import * as i0 from "@angular/core";
/**
 * WaDetailsDirective
 *
 * Angular wrapper for the <wa-details> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported details attributes as @Input() properties
 * - Supports summary, disabled, appearance, and open customization
 * - Emits details events (waShow, waAfterShow, waHide, waAfterHide)
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for summary, expand-icon, collapse-icon, and default content
 * - Supports custom styling via CSS variables
 * - Provides programmatic control through show() and hide() methods
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
export declare class WaDetailsDirective implements OnInit, OnChanges {
    summary?: string;
    disabled?: boolean | string;
    appearance?: Appearance | string;
    open?: boolean | string;
    iconPosition?: 'start' | 'end' | string;
    name?: string;
    iconColor?: string;
    spacing?: string;
    showDuration?: string;
    hideDuration?: string;
    display?: string;
    waShow: EventEmitter<Event>;
    waShowHyphen: EventEmitter<Event>;
    waAfterShow: EventEmitter<Event>;
    waAfterShowHyphen: EventEmitter<Event>;
    waHide: EventEmitter<Event>;
    waHideHyphen: EventEmitter<Event>;
    waAfterHide: EventEmitter<Event>;
    waAfterHideHyphen: EventEmitter<Event>;
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
     * Exposes the native details element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Opens the details programmatically
     */
    show(): void;
    /**
     * Closes the details programmatically
     */
    hide(): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<WaDetailsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaDetailsDirective, "wa-details", never, { "summary": { "alias": "summary"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "open": { "alias": "open"; "required": false; }; "iconPosition": { "alias": "iconPosition"; "required": false; }; "name": { "alias": "name"; "required": false; }; "iconColor": { "alias": "iconColor"; "required": false; }; "spacing": { "alias": "spacing"; "required": false; }; "showDuration": { "alias": "showDuration"; "required": false; }; "hideDuration": { "alias": "hideDuration"; "required": false; }; "display": { "alias": "display"; "required": false; }; }, { "waShow": "waShow"; "waShowHyphen": "wa-show"; "waAfterShow": "waAfterShow"; "waAfterShowHyphen": "wa-after-show"; "waHide": "waHide"; "waHideHyphen": "wa-hide"; "waAfterHide": "waAfterHide"; "waAfterHideHyphen": "wa-after-hide"; "waFocus": "waFocus"; "waFocusHyphen": "wa-focus"; "waBlur": "waBlur"; "waBlurHyphen": "wa-blur"; "openChange": "openChange"; }, never, never, true, never>;
}
//# sourceMappingURL=details.directive.d.ts.map