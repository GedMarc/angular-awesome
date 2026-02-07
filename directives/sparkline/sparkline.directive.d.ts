import { ElementRef, OnChanges, AfterViewInit, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class WaSparklineDirective implements AfterViewInit, OnChanges {
    private host;
    private renderer;
    constructor(host: ElementRef<HTMLElement>, renderer: Renderer2);
    label?: string;
    data?: string;
    appearance: 'gradient' | 'line' | 'solid' | string;
    trend?: 'positive' | 'negative' | 'neutral' | string;
    curve: 'linear' | 'natural' | 'step' | string;
    set fillColor(value: string | undefined);
    set lineColor(value: string | undefined);
    set lineWidth(value: string | undefined);
    private setAll;
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    private setAttr;
    private setStyle;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaSparklineDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaSparklineDirective, "wa-sparkline", never, { "label": { "alias": "label"; "required": false; }; "data": { "alias": "data"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "trend": { "alias": "trend"; "required": false; }; "curve": { "alias": "curve"; "required": false; }; "fillColor": { "alias": "fillColor"; "required": false; }; "lineColor": { "alias": "lineColor"; "required": false; }; "lineWidth": { "alias": "lineWidth"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=sparkline.directive.d.ts.map