import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaDialogDirective
 *
 * Angular wrapper for the <wa-dialog> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported dialog attributes as @Input() properties
 * - Supports string inputs like label
 * - Supports boolean attributes like open, withoutHeader, lightDismiss
 * - Emits events for dialog lifecycle: waShow, waAfterShow, waHide, waAfterHide
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, footer, and header-actions
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control: show() and hide()
 */
export declare class WaDialogDirective implements OnInit, OnChanges, OnDestroy {
    /**
     * When dialog is closed, we move all child nodes into this fragment so that
     * the dialog has no content in the DOM. When it opens again, we re-attach
     * the nodes back to the host element.
     */
    private contentFragment;
    open?: boolean | string;
    withoutHeader?: boolean | string;
    private _lightDismiss?;
    set lightDismiss(val: boolean | string | undefined);
    set lightDismissKebab(val: boolean | string | undefined);
    set lightDismissNoDash(val: boolean | string | undefined);
    label?: string;
    backgroundColor?: string;
    borderRadius?: string;
    boxShadow?: string;
    spacing?: string;
    width?: string;
    showDuration?: string;
    hideDuration?: string;
    openChange: EventEmitter<boolean>;
    waShow: EventEmitter<void>;
    waShowHyphen: EventEmitter<void>;
    waAfterShow: EventEmitter<void>;
    waAfterShowHyphen: EventEmitter<void>;
    waHide: EventEmitter<{
        source: HTMLElement | "overlay" | "escape" | "programmatic";
    }>;
    waHideHyphen: EventEmitter<{
        source: HTMLElement | "overlay" | "escape" | "programmatic";
    }>;
    waAfterHide: EventEmitter<void>;
    waAfterHideHyphen: EventEmitter<void>;
    private el;
    private renderer;
    /**
     * Internal flag to prevent feedback loops when we programmatically write to attributes/properties
     */
    private isWriting;
    /** Observe attribute changes (e.g., 'open') to drive two-way binding */
    private attrObserver?;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    ngOnDestroy(): void;
    /**
     * Exposes the native dialog element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Programmatically opens the dialog
     */
    show(): void;
    /**
     * Programmatically closes the dialog
     */
    hide(): void;
    private labelSlotObserver?;
    private applyInputs;
    private setupLabelSlotObserver;
    private updateLabelFromSlot;
    private setPropertySafe;
    private parseBool;
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
    /** Determine whether the dialog is currently open */
    private isDialogOpen;
    /**
     * Ensure that projected children exist only when dialog is open.
     * Moves children into a DocumentFragment when closed, and restores when opened.
     */
    private updateProjectedContentVisibility;
    /** Explicitly attach content if it was previously detached */
    private attachProjectedContentIfNeeded;
    /** Explicitly detach content if dialog is closed and content is present */
    private detachProjectedContentIfNeeded;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaDialogDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaDialogDirective, "wa-dialog", never, { "open": { "alias": "open"; "required": false; }; "withoutHeader": { "alias": "withoutHeader"; "required": false; }; "lightDismiss": { "alias": "lightDismiss"; "required": false; }; "lightDismissKebab": { "alias": "light-dismiss"; "required": false; }; "lightDismissNoDash": { "alias": "lightdismiss"; "required": false; }; "label": { "alias": "label"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "borderRadius": { "alias": "borderRadius"; "required": false; }; "boxShadow": { "alias": "boxShadow"; "required": false; }; "spacing": { "alias": "spacing"; "required": false; }; "width": { "alias": "width"; "required": false; }; "showDuration": { "alias": "showDuration"; "required": false; }; "hideDuration": { "alias": "hideDuration"; "required": false; }; }, { "openChange": "openChange"; "waShow": "waShow"; "waShowHyphen": "wa-show"; "waAfterShow": "waAfterShow"; "waAfterShowHyphen": "wa-after-show"; "waHide": "waHide"; "waHideHyphen": "wa-hide"; "waAfterHide": "waAfterHide"; "waAfterHideHyphen": "wa-after-hide"; }, never, never, true, never>;
}
//# sourceMappingURL=dialog.directive.d.ts.map