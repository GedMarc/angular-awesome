import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * WaCarouselDirective
 *
 * Angular wrapper for the <wa-carousel> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported carousel attributes as @Input() properties
 * - Supports boolean attributes like loop, navigation, pagination, autoplay, mouseDragging
 * - Supports numeric attributes like autoplayInterval, slidesPerPage, slidesPerMove
 * - Supports string attributes like orientation
 * - Emits slide change events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for carousel items and navigation icons
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control (next, previous, goToSlide)
 */
export declare class WaCarouselDirective implements OnInit, OnChanges {
    loop?: boolean | string;
    navigation?: boolean | string;
    pagination?: boolean | string;
    autoplay?: boolean | string;
    mouseDragging?: boolean | string;
    autoplayInterval?: number | string;
    slidesPerPage?: number | string;
    slidesPerMove?: number | string;
    orientation?: 'horizontal' | 'vertical' | string;
    waSlideChange: EventEmitter<{
        index: number;
    }>;
    waSlideChangeCamel: EventEmitter<{
        index: number;
    }>;
    private el;
    private renderer;
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private applyInputs;
    /**
     * Exposes the native carousel element for direct interaction
     */
    get nativeElement(): HTMLElement;
    /**
     * Scrolls to the next slide
     */
    next(): void;
    /**
     * Scrolls to the previous slide
     */
    previous(): void;
    /**
     * Scrolls to the slide at the specified index
     */
    goToSlide(index: number): void;
    /**
     * Sets an attribute on the native element if the value is not null or undefined
     */
    private setAttr;
    /**
     * Sets a numeric attribute on the native element if the value is not null or undefined
     */
    private setNumericAttr;
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaCarouselDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaCarouselDirective, "wa-carousel", never, { "loop": { "alias": "loop"; "required": false; }; "navigation": { "alias": "navigation"; "required": false; }; "pagination": { "alias": "pagination"; "required": false; }; "autoplay": { "alias": "autoplay"; "required": false; }; "mouseDragging": { "alias": "mouseDragging"; "required": false; }; "autoplayInterval": { "alias": "autoplayInterval"; "required": false; }; "slidesPerPage": { "alias": "slidesPerPage"; "required": false; }; "slidesPerMove": { "alias": "slidesPerMove"; "required": false; }; "orientation": { "alias": "orientation"; "required": false; }; }, { "waSlideChange": "wa-slide-change"; "waSlideChangeCamel": "waSlideChange"; }, never, never, true, never>;
}
//# sourceMappingURL=carousel.directive.d.ts.map