import { EventEmitter, OnChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class WaTreeItemDirective implements OnChanges {
    expanded: boolean | string;
    selected: boolean | string;
    disabled: boolean | string;
    lazy: boolean | string;
    /** Optional data payload bound to this tree item. Used for two-way binding via ngModel */
    data: any;
    /** Optional value key; if provided, will be used as value identity */
    value: any;
    waExpand: EventEmitter<void>;
    waExpandHyphen: EventEmitter<void>;
    waAfterExpand: EventEmitter<void>;
    waAfterExpandHyphen: EventEmitter<void>;
    waCollapse: EventEmitter<void>;
    waCollapseHyphen: EventEmitter<void>;
    waAfterCollapse: EventEmitter<void>;
    waAfterCollapseHyphen: EventEmitter<void>;
    lazyChange: EventEmitter<boolean>;
    waLazyLoad: EventEmitter<void>;
    waLazyLoadHyphen: EventEmitter<void>;
    selectionBackgroundColor?: string;
    selectionIndicatorColor?: string;
    expandButtonColor?: string;
    showDuration?: string;
    hideDuration?: string;
    private el;
    private renderer;
    private isTruthy;
    onExpand(): void;
    onAfterExpand(): void;
    onCollapse(): void;
    onAfterCollapse(): void;
    onLazyLoad(): void;
    ngOnChanges(): void;
    /**
     * Sets a CSS custom property on the native element if the value is not null or undefined
     */
    private setCssVar;
    /**
     * Sets a boolean attribute on the native element if the value is truthy
     * For boolean attributes, the presence of the attribute (with empty value) indicates true
     */
    private setBooleanAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaTreeItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WaTreeItemDirective, "wa-tree-item", ["waTreeItem"], { "expanded": { "alias": "expanded"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "lazy": { "alias": "lazy"; "required": false; }; "data": { "alias": "data"; "required": false; }; "value": { "alias": "value"; "required": false; }; "selectionBackgroundColor": { "alias": "selectionBackgroundColor"; "required": false; }; "selectionIndicatorColor": { "alias": "selectionIndicatorColor"; "required": false; }; "expandButtonColor": { "alias": "expandButtonColor"; "required": false; }; "showDuration": { "alias": "showDuration"; "required": false; }; "hideDuration": { "alias": "hideDuration"; "required": false; }; }, { "waExpand": "waExpand"; "waExpandHyphen": "wa-expand"; "waAfterExpand": "waAfterExpand"; "waAfterExpandHyphen": "wa-after-expand"; "waCollapse": "waCollapse"; "waCollapseHyphen": "wa-collapse"; "waAfterCollapse": "waAfterCollapse"; "waAfterCollapseHyphen": "wa-after-collapse"; "lazyChange": "lazyChange"; "waLazyLoad": "waLazyLoad"; "waLazyLoadHyphen": "wa-lazy-load"; }, never, never, true, never>;
}
//# sourceMappingURL=tree-item.directive.d.ts.map