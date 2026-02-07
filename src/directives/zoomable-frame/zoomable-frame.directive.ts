import { Directive, ElementRef, EventEmitter, Input, OnChanges, AfterViewInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: 'wa-zoomable-frame',
  standalone: true
})
export class WaZoomableFrameDirective implements AfterViewInit, OnChanges {
  constructor(private host: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  // Properties
  @Input() src?: string;
  @Input() srcdoc?: string;
  @Input() allowfullscreen?: boolean | string;
  @Input() loading: 'eager' | 'lazy' | string = 'eager';
  @Input() referrerpolicy?: string;
  @Input() sandbox?: string;
  @Input() zoom?: number | string;
  @Input() zoomLevels?: string;
  @Input() withoutControls?: boolean | string;
  @Input() withoutInteraction?: boolean | string;

  // Events
  @Output() load = new EventEmitter<Event>();
  @Output() error = new EventEmitter<Event>();

  private setAll() {
    const el = this.host.nativeElement;
    this.setAttr('src', this.src);
    this.setAttr('srcdoc', this.srcdoc);
    this.setBooleanAttr('allowfullscreen', this.allowfullscreen);
    this.setAttr('loading', this.loading);
    this.setAttr('referrerpolicy', this.referrerpolicy);
    this.setAttr('sandbox', this.sandbox);
    this.setNumericAttr('zoom', this.zoom);
    this.setAttr('zoom-levels', this.zoomLevels);
    this.setBooleanAttr('without-controls', this.withoutControls);
    this.setBooleanAttr('without-interaction', this.withoutInteraction);

    // Events passthrough from internal iframe are re-dispatched by web component
    this.renderer.listen(el, 'load', (e: Event) => this.load.emit(e));
    this.renderer.listen(el, 'error', (e: Event) => this.error.emit(e));
  }

  ngAfterViewInit(): void { this.setAll(); }
  ngOnChanges(): void { this.setAll(); }

  private setAttr(name: string, value: any) {
    if (value !== undefined && value !== null) {
      this.renderer.setAttribute(this.host.nativeElement, name, String(value));
    }
  }
  private setNumericAttr(name: string, value: number | string | null | undefined) {
    if (value !== undefined && value !== null) {
      const n = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(n as number)) {
        this.renderer.setAttribute(this.host.nativeElement, name, String(n));
      }
    }
  }
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.host.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.host.nativeElement, name);
    }
  }
}
