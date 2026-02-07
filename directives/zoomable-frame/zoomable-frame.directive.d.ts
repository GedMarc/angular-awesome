import { ElementRef, EventEmitter, OnChanges, AfterViewInit, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class WaZoomableFrameDirective implements AfterViewInit, OnChanges {
    private host;
    private renderer;
    constructor(host: ElementRef<HTMLElement>, renderer: Renderer2);
    src?: string;
    srcdoc?: string;
    allowfullscreen?: boolean | string;
    loading: 'eager' | 'lazy' | string;
    referrerpolicy?: string;
    sandbox?: string;
    zoom?: number | string;
    zoomLevels?: string;
    withoutControls?: boolean | string;
    withoutInteraction?: boolean | string;
    load: EventEmitter<Event>;
    error: EventEmitter<Event>;
    private setAll;
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    private setAttr;
    private setNumericAttr;
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaZoomableFrameDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaZoomableFrameDirective, "wa-zoomable-frame", never, { "src": { "alias": "src"; "required": false; }; "srcdoc": { "alias": "srcdoc"; "required": false; }; "allowfullscreen": { "alias": "allowfullscreen"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "referrerpolicy": { "alias": "referrerpolicy"; "required": false; }; "sandbox": { "alias": "sandbox"; "required": false; }; "zoom": { "alias": "zoom"; "required": false; }; "zoomLevels": { "alias": "zoomLevels"; "required": false; }; "withoutControls": { "alias": "withoutControls"; "required": false; }; "withoutInteraction": { "alias": "withoutInteraction"; "required": false; }; }, { "load": "load"; "error": "error"; }, never, never, true, never>;
}
//# sourceMappingURL=zoomable-frame.directive.d.ts.map