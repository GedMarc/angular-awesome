import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: 'wa-tooltip',
  standalone: true,
})
export class WaTooltipDirective implements AfterViewInit, OnDestroy {


  @Input() for!: string;
  @Input() placement: string = 'top';
  @Input() disabled = false;
  @Input() distance = 8;
  @Input() skidding = 0;
  @Input() open = false;
  @Input() showDelay = 150;
  @Input() hideDelay = 0;
  @Input() trigger: string = 'hover focus';

  // Styling Inputs (mapped to CSS custom properties)
  @Input() set backgroundColor(value: string) {
    this.setStyle('--background-color', value);
  }
  @Input() set borderRadius(value: string) {
    this.setStyle('--border-radius', value);
  }
  @Input() set maxWidth(value: string) {
    this.setStyle('--max-width', value);
  }
  @Input() set padding(value: string) {
    this.setStyle('--padding', value);
  }
  @Input() set arrowSize(value: string) {
    this.setStyle('--wa-tooltip-arrow-size', value);
  }

  @Output() waShow = new EventEmitter<CustomEvent>();
  @Output() waAfterShow = new EventEmitter<CustomEvent>();
  @Output() waHide = new EventEmitter<CustomEvent>();
  @Output() waAfterHide = new EventEmitter<CustomEvent>();

  private listeners: (() => void)[] = [];

  constructor(private host: ElementRef, private renderer: Renderer2) {
    this.el = this.host.nativeElement;
  }


  private el: ElementRef;

  ngAfterViewInit(): void {
    this.setProperties();
    this.attachEvents();
  }

  ngOnDestroy(): void {
    this.listeners.forEach(unlisten => unlisten());
  }

  private setProperties(): void {
    this.setAttr('for', this.for);
    this.setAttr('placement', this.placement);
    this.setAttr('disabled', this.disabled);
    this.setAttr('distance', this.distance);
    this.setAttr('skidding', this.skidding);
    this.setAttr('open', this.open);
    this.setAttr('show-delay', this.showDelay);
    this.setAttr('hide-delay', this.hideDelay);
    this.setAttr('trigger', this.trigger);
  }

  private setAttr(name: string, value: any): void {
    if (value !== undefined && value !== null) {
      this.renderer.setProperty(this.el, name, value);
    }
  }

  private setStyle(prop: string, value: string) {
    if (value) {
      this.renderer.setStyle(this.el, prop, value);
    }
  }

  private attachEvents(): void {
    this.listeners.push(
      this.renderer.listen(this.el, 'wa-show', (e: CustomEvent) => this.waShow.emit(e)),
      this.renderer.listen(this.el, 'wa-after-show', (e: CustomEvent) => this.waAfterShow.emit(e)),
      this.renderer.listen(this.el, 'wa-hide', (e: CustomEvent) => this.waHide.emit(e)),
      this.renderer.listen(this.el, 'wa-after-hide', (e: CustomEvent) => this.waAfterHide.emit(e))
    );
  }
}
