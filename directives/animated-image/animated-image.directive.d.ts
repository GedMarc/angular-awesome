import { ElementRef, OnInit, EventEmitter } from '@angular/core';
/**
 * WaAnimatedImageDirective
 *
 * Angular wrapper for the <wa-animated-image> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds attributes: src, alt, play
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for play/pause icons
 * - Supports custom styling via CSS variables (--icon-size, --control-box-size)
 * - Emits events for image load and error
 */
import { Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class WaAnimatedImageDirective implements OnInit {
    src: string;
    alt: string;
    play?: boolean | string | null;
    iconSize?: string;
    controlBoxSize?: string;
    load: EventEmitter<Event>;
    error: EventEmitter<Event>;
    el: ElementRef<any>;
    renderer: Renderer2;
    ngOnInit(): void;
    private setAttr;
    private setStyle;
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaAnimatedImageDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaAnimatedImageDirective, "wa-animated-image", never, { "src": { "alias": "src"; "required": false; }; "alt": { "alias": "alt"; "required": false; }; "play": { "alias": "play"; "required": false; }; "iconSize": { "alias": "iconSize"; "required": false; }; "controlBoxSize": { "alias": "controlBoxSize"; "required": false; }; }, { "load": "wa-load"; "error": "wa-error"; }, never, never, true, never>;
}
//# sourceMappingURL=animated-image.directive.d.ts.map