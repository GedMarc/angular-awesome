import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaCopyButtonDirective
 *
 * Angular wrapper for the <wa-copy-button> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported copy-button attributes as @Input() properties
 * - Supports string inputs like value, from, copyLabel, successLabel, errorLabel
 * - Supports numeric inputs like feedbackDuration
 * - Supports tooltip placement options
 * - Supports boolean attributes like disabled
 * - Emits copy and error events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for copy-icon, success-icon, and error-icon
 * - Supports custom styling via CSS variables
 */
export declare class WaCopyButtonDirective implements OnInit, OnChanges {
    value?: string;
    from?: string;
    copyLabel?: string;
    successLabel?: string;
    errorLabel?: string;
    feedbackDuration?: number | string;
    tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left' | string;
    disabled?: boolean | string;
    private _dataDialog;
    set dataDialogAttr(val: string | null | undefined);
    set dialogAttr(val: string | null | undefined);
    set dataDialog(val: string | null | undefined);
    waCopy: EventEmitter<void>;
    waError: EventEmitter<Error>;
    private el;
    private renderer;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    /**
     * Exposes the native copy-button element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Programmatically triggers the copy action
     */
    copy(): void;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    private setNumericAttr;
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaCopyButtonDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaCopyButtonDirective, "wa-copy-button", never, { "value": { "alias": "value"; "required": false; }; "from": { "alias": "from"; "required": false; }; "copyLabel": { "alias": "copyLabel"; "required": false; }; "successLabel": { "alias": "successLabel"; "required": false; }; "errorLabel": { "alias": "errorLabel"; "required": false; }; "feedbackDuration": { "alias": "feedbackDuration"; "required": false; }; "tooltipPlacement": { "alias": "tooltipPlacement"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "dataDialogAttr": { "alias": "data-dialog"; "required": false; }; "dialogAttr": { "alias": "dialog"; "required": false; }; "dataDialog": { "alias": "dataDialog"; "required": false; }; }, { "waCopy": "wa-copy"; "waError": "wa-error"; }, never, never, true, never>;
}
//# sourceMappingURL=copy-button.directive.d.ts.map