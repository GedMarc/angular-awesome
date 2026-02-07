import { Directive, ElementRef, EventEmitter, Input, OnChanges, AfterViewInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: 'wa-number-input',
  standalone: true
})
export class WaNumberInputDirective implements AfterViewInit, OnChanges {
  constructor(private host: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  // Properties (subset mapped from llms.txt)
  @Input() value?: string | number;
  @Input() defaultValue?: string | null;
  @Input() size: 'small' | 'medium' | 'large' | string = 'medium';
  @Input() appearance: 'filled' | 'outlined' | 'filled-outlined' | string = 'outlined';
  @Input() pill?: boolean | string;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() placeholder?: string;
  @Input() readonly?: boolean | string;
  @Input() required?: boolean | string;
  @Input() min?: number | string;
  @Input() max?: number | string;
  @Input() step: number | 'any' | string = 1 as any;
  @Input() withoutSteppers?: boolean | string;
  @Input() autocomplete?: string;
  @Input() autofocus?: boolean | string;
  @Input() enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | string;
  @Input() inputmode: 'numeric' | 'decimal' | string = 'numeric';
  @Input() withLabel?: boolean | string;
  @Input() withHint?: boolean | string;

  // Events
  @Output() input = new EventEmitter<Event>();
  @Output() change = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<Event>();
  @Output('wa-invalid') waInvalid = new EventEmitter<CustomEvent>();

  private setAll() {
    const el = this.host.nativeElement;
    this.setAttr('value', this.value);
    this.setAttr('size', this.size);
    this.setAttr('appearance', this.appearance);
    this.setBooleanAttr('pill', this.pill);
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setAttr('placeholder', this.placeholder);
    this.setBooleanAttr('readonly', this.readonly);
    this.setBooleanAttr('required', this.required);
    this.setNumericAttr('min', this.min);
    this.setNumericAttr('max', this.max);
    this.setAttr('step', this.step);
    this.setBooleanAttr('without-steppers', this.withoutSteppers);
    this.setAttr('autocomplete', this.autocomplete);
    this.setBooleanAttr('autofocus', this.autofocus);
    this.setAttr('enterkeyhint', this.enterkeyhint);
    this.setAttr('inputmode', this.inputmode);
    this.setBooleanAttr('with-label', this.withLabel);
    this.setBooleanAttr('with-hint', this.withHint);

    this.renderer.listen(el, 'input', (e: Event) => this.input.emit(e));
    this.renderer.listen(el, 'change', (e: Event) => this.change.emit(e));
    this.renderer.listen(el, 'blur', (e: Event) => this.blur.emit(e));
    this.renderer.listen(el, 'focus', (e: Event) => this.focus.emit(e));
    this.renderer.listen(el, 'wa-invalid', (e: CustomEvent) => this.waInvalid.emit(e));
  }

  ngAfterViewInit(): void { this.setAll(); }
  ngOnChanges(): void { this.setAll(); }

  private setAttr(name: string, value: any) {
    if (value !== undefined && value !== null && value !== '') {
      this.renderer.setAttribute(this.host.nativeElement, name, String(value));
    }
  }
  private setNumericAttr(name: string, value: number | string | null | undefined) {
    if (value !== undefined && value !== null && value !== '') {
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
