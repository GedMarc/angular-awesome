import { EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class WaTabGroupComponent implements ControlValueAccessor {
    private el;
    private renderer;
    placement: 'top' | 'bottom' | 'start' | 'end';
    activation: 'auto' | 'manual';
    withoutScrollControls: boolean;
    waTabShow: EventEmitter<CustomEvent<any>>;
    waTabShowHyphen: EventEmitter<CustomEvent<any>>;
    waTabHide: EventEmitter<CustomEvent<any>>;
    waTabHideHyphen: EventEmitter<CustomEvent<any>>;
    valueChange: EventEmitter<string | null>;
    set active(val: string | null);
    get active(): string | null;
    get value(): string | null;
    set value(val: string | null);
    private _value;
    onChange: (value: any) => void;
    onTouched: () => void;
    onTabShow(event: CustomEvent): void;
    onTabHide(event: CustomEvent): void;
    constructor(el: ElementRef, renderer: Renderer2);
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    set indicatorColor(value: string);
    set trackColor(value: string);
    set trackWidth(value: string);
    private setStyle;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaTabGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaTabGroupComponent, "wa-tab-group", never, { "placement": { "alias": "placement"; "required": false; }; "activation": { "alias": "activation"; "required": false; }; "withoutScrollControls": { "alias": "withoutScrollControls"; "required": false; }; "active": { "alias": "active"; "required": false; }; "value": { "alias": "value"; "required": false; }; "indicatorColor": { "alias": "indicatorColor"; "required": false; }; "trackColor": { "alias": "trackColor"; "required": false; }; "trackWidth": { "alias": "trackWidth"; "required": false; }; }, { "waTabShow": "waTabShow"; "waTabShowHyphen": "wa-tab-show"; "waTabHide": "waTabHide"; "waTabHideHyphen": "wa-tab-hide"; "valueChange": "valueChange"; }, never, ["*"], true, never>;
}
//# sourceMappingURL=tab-group.component.d.ts.map