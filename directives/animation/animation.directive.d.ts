import { EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaAnimationDirective
 *
 * Angular wrapper for the <wa-animation> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported animation attributes as @Input() properties
 * - Supports JavaScript-only properties like keyframes and currentTime
 * - Emits animation lifecycle events (start, finish, cancel)
 * - Enables Angular-style class and style bindings
 * - Allows projection of a single child element
 * - Supports custom styling via CSS variables
 */
export declare class WaAnimationDirective implements OnInit {
    name?: string;
    play?: boolean | string | null;
    delay?: number;
    duration?: number;
    easing?: string;
    direction?: string;
    iterations?: number;
    iterationStart?: number;
    endDelay?: number;
    fill?: string;
    playbackRate?: number;
    keyframes?: Keyframe[];
    currentTime?: any;
    controlBoxSize?: string;
    iconSize?: string;
    waStart: EventEmitter<Event>;
    waStartHyphen: EventEmitter<Event>;
    waFinish: EventEmitter<Event>;
    waFinishHyphen: EventEmitter<Event>;
    waCancel: EventEmitter<Event>;
    waCancelHyphen: EventEmitter<Event>;
    private el;
    private renderer;
    ngOnInit(): void;
    /**
     * Exposes the native animation element for direct interaction
     */
    get nativeAnimation(): HTMLElement;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    /**
     * Sets a boolean attribute on the native element if the value is truthy (true | 'true' | '')
     */
    private setBooleanAttr;
    /**
     * Sets a style property on the native element if the value is not null or undefined
     */
    private setStyle;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaAnimationDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaAnimationDirective, "wa-animation", never, { "name": { "alias": "name"; "required": false; }; "play": { "alias": "play"; "required": false; }; "delay": { "alias": "delay"; "required": false; }; "duration": { "alias": "duration"; "required": false; }; "easing": { "alias": "easing"; "required": false; }; "direction": { "alias": "direction"; "required": false; }; "iterations": { "alias": "iterations"; "required": false; }; "iterationStart": { "alias": "iterationStart"; "required": false; }; "endDelay": { "alias": "endDelay"; "required": false; }; "fill": { "alias": "fill"; "required": false; }; "playbackRate": { "alias": "playbackRate"; "required": false; }; "keyframes": { "alias": "keyframes"; "required": false; }; "currentTime": { "alias": "currentTime"; "required": false; }; "controlBoxSize": { "alias": "controlBoxSize"; "required": false; }; "iconSize": { "alias": "iconSize"; "required": false; }; }, { "waStart": "waStart"; "waStartHyphen": "wa-start"; "waFinish": "waFinish"; "waFinishHyphen": "wa-finish"; "waCancel": "waCancel"; "waCancelHyphen": "wa-cancel"; }, never, never, true, never>;
}
//# sourceMappingURL=animation.directive.d.ts.map