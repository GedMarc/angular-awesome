import { ElementRef, OnChanges, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class WaPageComponent implements OnChanges {
    private el;
    private renderer;
    constructor(el: ElementRef<HTMLElement>, renderer: Renderer2);
    mobileBreakpoint?: string | number;
    navOpen?: boolean;
    disableSticky?: string;
    navigationPlacement?: 'start' | 'end';
    menuWidth?: string;
    mainWidth?: string;
    asideWidth?: string;
    bannerHeight?: string;
    headerHeight?: string;
    subheaderHeight?: string;
    get view(): 'mobile' | 'desktop' | null;
    ngOnChanges(): void;
    showNavigation(): void;
    hideNavigation(): void;
    toggleNavigation(): void;
    private setCssVar;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaPageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaPageComponent, "wa-page", never, { "mobileBreakpoint": { "alias": "mobileBreakpoint"; "required": false; }; "navOpen": { "alias": "navOpen"; "required": false; }; "disableSticky": { "alias": "disableSticky"; "required": false; }; "navigationPlacement": { "alias": "navigationPlacement"; "required": false; }; "menuWidth": { "alias": "menuWidth"; "required": false; }; "mainWidth": { "alias": "mainWidth"; "required": false; }; "asideWidth": { "alias": "asideWidth"; "required": false; }; "bannerHeight": { "alias": "bannerHeight"; "required": false; }; "headerHeight": { "alias": "headerHeight"; "required": false; }; "subheaderHeight": { "alias": "subheaderHeight"; "required": false; }; }, {}, never, ["[waPageSkipToContent]", "[waPageBanner]", "[waPageHeader]", "[waPageSubheader]", "[waPageNavigationHeader]", "[waPageNavigation]", "[waPageNavigationFooter]", "[waPageMenu]", "[waPageMainHeader]", "*", "[waPageMainFooter]", "[waPageAside]", "[waPageFooter]", "[waPageDialogWrapper]"], true, never>;
}
//# sourceMappingURL=page.component.d.ts.map