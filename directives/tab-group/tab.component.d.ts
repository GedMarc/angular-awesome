import { ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class WaTabComponent {
    private el;
    private renderer;
    panel: string;
    disabled: boolean;
    constructor(el: ElementRef, renderer: Renderer2);
    set activeTabColor(value: string);
    static ɵfac: i0.ɵɵFactoryDeclaration<WaTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaTabComponent, "wa-tab", never, { "panel": { "alias": "panel"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "activeTabColor": { "alias": "activeTabColor"; "required": false; }; }, {}, never, ["*"], true, never>;
}
//# sourceMappingURL=tab.component.d.ts.map