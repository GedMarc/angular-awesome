import { ElementRef, Renderer2, AfterViewInit, OnDestroy, AfterContentInit } from '@angular/core';
import { WaTabContent } from './tab-content.directive';
import * as i0 from "@angular/core";
export declare class WaTabPanelComponent implements AfterViewInit, AfterContentInit, OnDestroy {
    private el;
    private renderer;
    name: string;
    active: boolean;
    /**
     * When true (and no <ng-template waTabContent> is provided), the panel will lazily attach/detach
     * its projected DOM based on active state. Note this does NOT prevent Angular component
     * instantiation; for true deferred instantiation use <ng-template waTabContent>.
     */
    lazy: boolean;
    lazyContent?: WaTabContent;
    /**
     * When the panel is inactive and no lazy content is used, we keep all child nodes in this fragment
     * so that there is no DOM footprint. When it becomes active, we append the nodes back.
     * NOTE: For modern Angular use, the [waTabContent] directive is preferred.
     */
    private contentFragment;
    private unlistenShow?;
    private unlistenWaShow?;
    private mutationObserver?;
    constructor(el: ElementRef, renderer: Renderer2);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    set padding(value: string);
    isActive(): boolean;
    private captureAllChildrenIntoFragment;
    private updateProjectedContentVisibility;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaTabPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaTabPanelComponent, "wa-tab-panel", never, { "name": { "alias": "name"; "required": false; }; "active": { "alias": "active"; "required": false; }; "lazy": { "alias": "lazy"; "required": false; }; "padding": { "alias": "padding"; "required": false; }; }, {}, ["lazyContent"], ["*"], true, never>;
}
//# sourceMappingURL=tab-panel.component.d.ts.map