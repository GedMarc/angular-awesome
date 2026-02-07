import { ElementRef, EventEmitter } from '@angular/core';
import { Appearance, VariantToken, SizeToken } from '../../types/tokens';
import * as i0 from "@angular/core";
export declare class WaTagDirective {
    private el;
    constructor(el: ElementRef<HTMLElement>);
    variant: VariantToken;
    appearance: Appearance;
    size: SizeToken;
    pill: boolean | string;
    withRemove: boolean | string;
    waRemove: EventEmitter<Event>;
    waRemoveHyphen: EventEmitter<Event>;
    onRemove(event: Event): void;
    ngOnChanges(): void;
    private setBooleanAttribute;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaTagDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaTagDirective, "wa-tag", ["waTag"], { "variant": { "alias": "variant"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "size": { "alias": "size"; "required": false; }; "pill": { "alias": "pill"; "required": false; }; "withRemove": { "alias": "withRemove"; "required": false; }; }, { "waRemove": "waRemove"; "waRemoveHyphen": "wa-remove"; }, never, never, true, never>;
}
//# sourceMappingURL=tag.directive.d.ts.map