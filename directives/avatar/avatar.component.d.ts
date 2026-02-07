import { ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
/**
 * WaAvatarDirective
 *
 * Angular wrapper for the <wa-avatar> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds attributes: image, initials, label, shape, loading
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for custom icons
 * - Enables font sizing via [style.fontSize]
 * - Supports custom styling via CSS variables (--size, --background-color, --text-color)
 */
import { Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class WaAvatarDirective implements OnInit, OnChanges {
    image?: string;
    label?: string;
    initials?: string;
    shape: 'circle' | 'square' | 'rounded';
    loading: 'lazy' | 'eager';
    fontSize?: string;
    size?: string;
    backgroundColor?: string;
    textColor?: string;
    el: ElementRef<any>;
    renderer: Renderer2;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private syncAll;
    private setOrRemoveAttr;
    private setOrRemoveCssVar;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaAvatarDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaAvatarDirective, "wa-avatar", never, { "image": { "alias": "image"; "required": false; }; "label": { "alias": "label"; "required": false; }; "initials": { "alias": "initials"; "required": false; }; "shape": { "alias": "shape"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "fontSize": { "alias": "fontSize"; "required": false; }; "size": { "alias": "size"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "textColor": { "alias": "textColor"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=avatar.component.d.ts.map