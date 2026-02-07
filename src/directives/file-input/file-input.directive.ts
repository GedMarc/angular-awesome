import { Directive, ElementRef, EventEmitter, Input, OnChanges, AfterViewInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: 'wa-file-input',
  standalone: true
})
export class WaFileInputDirective implements AfterViewInit, OnChanges {
  constructor(private host: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  // Properties
  @Input() size: 'small' | 'medium' | 'large' | string = 'medium';
  @Input() label?: string;
  @Input() hint?: string;
  @Input() multiple?: boolean | string;
  @Input() accept?: string;
  @Input() required?: boolean | string;
  @Input() withLabel?: boolean | string;
  @Input() withHint?: boolean | string;

  // Events
  @Output() input = new EventEmitter<Event>();
  @Output() change = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();
  @Output('wa-invalid') waInvalid = new EventEmitter<CustomEvent>();

  private setAll() {
    const el = this.host.nativeElement;
    this.setAttr('size', this.size);
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setBooleanAttr('multiple', this.multiple);
    this.setAttr('accept', this.accept);
    this.setBooleanAttr('required', this.required);
    this.setBooleanAttr('with-label', this.withLabel);
    this.setBooleanAttr('with-hint', this.withHint);

    this.renderer.listen(el, 'input', (e: Event) => this.input.emit(e));
    this.renderer.listen(el, 'change', (e: Event) => this.change.emit(e));
    this.renderer.listen(el, 'focus', (e: Event) => this.focus.emit(e));
    this.renderer.listen(el, 'blur', (e: Event) => this.blur.emit(e));
    this.renderer.listen(el, 'wa-invalid', (e: CustomEvent) => this.waInvalid.emit(e));
  }

  ngAfterViewInit(): void { this.setAll(); }
  ngOnChanges(): void { this.setAll(); }

  private setAttr(name: string, value: any) {
    if (value !== undefined && value !== null) {
      this.renderer.setAttribute(this.host.nativeElement, name, String(value));
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
