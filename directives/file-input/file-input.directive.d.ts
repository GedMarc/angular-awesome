import { ElementRef, EventEmitter, OnChanges, AfterViewInit, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class WaFileInputDirective implements AfterViewInit, OnChanges {
    private host;
    private renderer;
    constructor(host: ElementRef<HTMLElement>, renderer: Renderer2);
    size: 'small' | 'medium' | 'large' | string;
    label?: string;
    hint?: string;
    multiple?: boolean | string;
    accept?: string;
    required?: boolean | string;
    withLabel?: boolean | string;
    withHint?: boolean | string;
    input: EventEmitter<Event>;
    change: EventEmitter<Event>;
    focus: EventEmitter<Event>;
    blur: EventEmitter<Event>;
    waInvalid: EventEmitter<CustomEvent<any>>;
    private setAll;
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    private setAttr;
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaFileInputDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaFileInputDirective, "wa-file-input", never, { "size": { "alias": "size"; "required": false; }; "label": { "alias": "label"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "multiple": { "alias": "multiple"; "required": false; }; "accept": { "alias": "accept"; "required": false; }; "required": { "alias": "required"; "required": false; }; "withLabel": { "alias": "withLabel"; "required": false; }; "withHint": { "alias": "withHint"; "required": false; }; }, { "input": "input"; "change": "change"; "focus": "focus"; "blur": "blur"; "waInvalid": "wa-invalid"; }, never, never, true, never>;
}
//# sourceMappingURL=file-input.directive.d.ts.map