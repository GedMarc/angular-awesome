import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  Renderer2, OnChanges,
} from '@angular/core';

@Directive({
  selector: 'wa-tooltip',
  standalone: true,
})
export class WaTooltipDirective implements AfterViewInit, OnChanges, OnDestroy {


  @Input() for!: string;
  @Input() placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end' | string = 'top';
  @Input() disabled?: boolean | string;
  @Input() distance: number | string = 8;
  @Input() skidding: number | string = 0;
  @Input() open?: boolean | string;
  @Input() showDelay: number | string = 150;
  @Input() hideDelay: number | string = 0;
  @Input() trigger: string = 'hover focusNative';
  @Input() withoutArrow?: boolean | string;

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
  @Output('wa-show') waShowHyphen = this.waShow;
  @Output() waAfterShow = new EventEmitter<CustomEvent>();
  @Output('wa-after-show') waAfterShowHyphen = this.waAfterShow;
  @Output() waHide = new EventEmitter<CustomEvent>();
  @Output('wa-hide') waHideHyphen = this.waHide;
  @Output() waAfterHide = new EventEmitter<CustomEvent>();
  @Output('wa-after-hide') waAfterHideHyphen = this.waAfterHide;

  private listeners: (() => void)[] = [];

  constructor(private host: ElementRef, private renderer: Renderer2) {
    this.el = this.host.nativeElement;
  }


  private el: HTMLElement;

  ngAfterViewInit(): void {
    this.setProperties();
    this.attachEvents();
  }

  ngOnChanges(): void {
    this.setProperties();
  }

  ngOnDestroy(): void {
    this.listeners.forEach(unlisten => unlisten());
  }

  private setProperties(): void {
    this.setAttr('for', this.for);
    this.setAttr('placement', this.placement);
    this.setBooleanAttr('disabled', this.disabled);
    this.setNumericAttr('distance', this.distance);
    this.setNumericAttr('skidding', this.skidding);
    this.setBooleanAttr('open', this.open);
    this.setNumericAttr('show-delay', this.showDelay);
    this.setNumericAttr('hide-delay', this.hideDelay);
    this.setAttr('trigger', this.trigger);
    this.setBooleanAttr('without-arrow', this.withoutArrow);
  }

  private setAttr(name: string, value: any): void {
    if (value !== undefined && value !== null) {
      this.renderer.setAttribute(this.el, name, String(value));
    }
  }

  private setBooleanAttr(name: string, value: boolean | string | null | undefined): void {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el, name, '');
    } else {
      this.renderer.removeAttribute(this.el, name);
    }
  }

  private setNumericAttr(name: string, value: number | string | null | undefined): void {
    if (value !== undefined && value !== null) {
      const n = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(n as number)) {
        this.renderer.setAttribute(this.el, name, String(n));
      }
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
