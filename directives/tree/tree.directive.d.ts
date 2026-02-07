import { EventEmitter, OnChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class WaTreeDirective implements OnChanges, ControlValueAccessor {
    selection: 'single' | 'multiple' | 'leaf' | null;
    /** Name of the tree, used for querySelector targeting */
    name?: string;
    waSelectionChange: EventEmitter<any>;
    waSelectionChangeHyphen: EventEmitter<any>;
    indentSize?: string;
    indentGuideColor?: string;
    indentGuideOffset?: string;
    indentGuideStyle?: string;
    indentGuideWidth?: string;
    private el;
    private renderer;
    private onChange;
    private onTouched;
    private isDisabled;
    private modelValue;
    ngOnChanges(): void;
    onSelectionChanged(event: CustomEvent): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    private setCssVar;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaTreeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaTreeDirective, "wa-tree", ["waTree"], { "selection": { "alias": "selection"; "required": false; }; "name": { "alias": "name"; "required": false; }; "indentSize": { "alias": "indentSize"; "required": false; }; "indentGuideColor": { "alias": "indentGuideColor"; "required": false; }; "indentGuideOffset": { "alias": "indentGuideOffset"; "required": false; }; "indentGuideStyle": { "alias": "indentGuideStyle"; "required": false; }; "indentGuideWidth": { "alias": "indentGuideWidth"; "required": false; }; }, { "waSelectionChange": "waSelectionChange"; "waSelectionChangeHyphen": "wa-selection-change"; }, never, never, true, never>;
}
//# sourceMappingURL=tree.directive.d.ts.map