import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaCarouselItemDirective
 *
 * Angular wrapper for the <wa-carousel-item> Web Component that allows declarative usage
 * and integration with Angular templates.
 *
 * Features:
 * - Enables Angular-style class and style bindings
 * - Allows content projection for slide content
 * - Supports custom styling via CSS variables
 * - Integrates with parent WaCarouselDirective
 */
export declare class WaCarouselItemDirective implements OnInit {
    private el;
    private renderer;
    ngOnInit(): void;
    /**
     * Exposes the native carousel item element for direct interaction
     */
    get nativeElement(): HTMLElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaCarouselItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaCarouselItemDirective, "wa-carousel-item", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=carousel-item.directive.d.ts.map