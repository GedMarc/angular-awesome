import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, inject } from '@angular/core';
import { reflectAttributeInputs } from '../shared/attribute-inputs';

export interface WaLightboxItemElement extends HTMLElement {
  type: 'image' | 'video';
  src: string;
  srcset: string;
  sizes: string;
  alt: string;
  caption: string;
  thumbnail: string;
  width: number;
  height: number;
}

/** Angular bindings for media and thumbnails in a lightbox. */
@Directive({
  selector: 'wa-lightbox-item',
  standalone: true
})
export class WaLightboxItemDirective implements OnChanges {
  @Input() type?: 'image' | 'video';
  @Input() src?: string;
  @Input() srcset?: string;
  @Input() sizes?: string;
  @Input() alt?: string;
  @Input() caption?: string;
  @Input() thumbnail?: string;
  @Input() width?: number | string;
  @Input() height?: number | string;

  private readonly el = inject(ElementRef<WaLightboxItemElement>);
  private readonly renderer = inject(Renderer2);

  get nativeElement(): WaLightboxItemElement {
    return this.el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    reflectAttributeInputs(this.renderer, this.nativeElement, changes, [
      'type', 'src', 'srcset', 'sizes', 'alt', 'caption', 'thumbnail', 'width', 'height'
    ]);
  }

  focus(options?: FocusOptions): void {
    this.nativeElement.focus(options);
  }
}
