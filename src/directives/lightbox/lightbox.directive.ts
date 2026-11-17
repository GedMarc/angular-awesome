import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, inject, booleanAttribute, EventEmitter, Output } from '@angular/core';
import { reflectAttributeInputs } from '../shared/attribute-inputs';
import type { WaLightboxItemElement } from '../lightbox-item/lightbox-item.directive';

export interface WaLightboxHideDetail {
  source: Element;
}

export interface WaLightboxItemChangeDetail {
  index: number;
  previousIndex: number;
  item: WaLightboxItemElement;
  previousItem: WaLightboxItemElement | null;
}

export interface WaLightboxElement extends HTMLElement {
  readonly items: WaLightboxItemElement[];
  readonly currentItem: WaLightboxItemElement | undefined;
  next?: () => void;
  previous?: () => void;
  zoomIn?: () => void;
  zoomOut?: () => void;
}

/** Angular bindings for a full-screen image and video gallery. */
@Directive({
  selector: 'wa-lightbox',
  standalone: true,
  host: {
    '[style.--backdrop-color]': 'backdropColor',
    '[style.--backdrop-filter]': 'backdropFilter',
    '[style.--media-border-radius]': 'mediaBorderRadius',
    '[style.--controls-color]': 'controlsColor',
    '[style.--controls-background]': 'controlsBackground',
    '[style.--show-duration]': 'showDuration',
    '[style.--hide-duration]': 'hideDuration',
    '[style.--spacing]': 'spacing',
    '[style.--slide-gap]': 'slideGap',
    '[style.--thumbnail-size]': 'thumbnailSize',
    '(wa-show)': 'forward($event, waShow)',
    '(wa-after-show)': 'forward($event, waAfterShow)',
    '(wa-hide)': 'forward($event, waHide)',
    '(wa-after-hide)': 'forward($event, waAfterHide)',
    '(wa-item-change)': 'forward($event, waItemChange)'
  }
})
export class WaLightboxDirective implements OnChanges {
  @Input() index?: number | string;
  @Input() label?: string;
  @Input({ transform: booleanAttribute }) loop = false;
  @Input({ transform: booleanAttribute }) withThumbnails = false;
  @Input({ transform: booleanAttribute }) withoutNavigation = false;
  @Input({ transform: booleanAttribute }) withoutCounter = false;
  @Input({ transform: booleanAttribute }) withoutZoom = false;
  @Input({ transform: booleanAttribute }) open = false;
  @Input() backdropColor?: string;
  @Input() backdropFilter?: string;
  @Input() mediaBorderRadius?: string;
  @Input() controlsColor?: string;
  @Input() controlsBackground?: string;
  @Input() showDuration?: string;
  @Input() hideDuration?: string;
  @Input() spacing?: string;
  @Input() slideGap?: string;
  @Input() thumbnailSize?: string;

  @Output() waShow = new EventEmitter<Event>();
  @Output() waAfterShow = new EventEmitter<Event>();
  @Output() waHide = new EventEmitter<Event & { readonly detail: WaLightboxHideDetail }>();
  @Output() waAfterHide = new EventEmitter<Event>();
  @Output() waItemChange = new EventEmitter<Event & { readonly detail: WaLightboxItemChangeDetail }>();

  private readonly el = inject(ElementRef<WaLightboxElement>);
  private readonly renderer = inject(Renderer2);

  get nativeElement(): WaLightboxElement {
    return this.el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    reflectAttributeInputs(this.renderer, this.nativeElement, changes, [
      'index', 'label', 'loop', 'withThumbnails', 'withoutNavigation', 'withoutCounter', 'withoutZoom',
      'open'
    ]);
  }

  forward<T extends Event>(event: T, output: EventEmitter<T>): void {
    if (event.target === this.nativeElement) output.emit(event);
  }

  get items(): WaLightboxItemElement[] {
    return this.nativeElement.items ?? [];
  }

  get currentItem(): WaLightboxItemElement | undefined {
    return this.nativeElement.currentItem;
  }

  next(): void {
    this.nativeElement.next?.();
  }

  previous(): void {
    this.nativeElement.previous?.();
  }

  zoomIn(): void {
    this.nativeElement.zoomIn?.();
  }

  zoomOut(): void {
    this.nativeElement.zoomOut?.();
  }
}
