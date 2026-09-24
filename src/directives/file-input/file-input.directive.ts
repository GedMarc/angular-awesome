import { AfterViewInit, Directive, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, Output, Renderer2 } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import {SizeToken} from '../../types/tokens';

@Directive({
  selector: 'wa-file-input',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaFileInputDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WaFileInputDirective),
      multi: true
    }
  ]
})
export class WaFileInputDirective implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor, Validator {
  constructor(private host: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  // Properties
  @Input() size: SizeToken | string = 'medium';
  @Input() label?: string;
  @Input() hint?: string;
  @Input() multiple?: boolean | string;
  @Input() accept?: string;
  @Input() required?: boolean | string;
  @Input() disabled?: boolean | string;
  @Input() withLabel?: boolean | string;
  @Input() withHint?: boolean | string;

  // Events
  @Output() input = new EventEmitter<Event>();
  @Output() change = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();
  @Output('wa-invalid') waInvalid = new EventEmitter<CustomEvent>();
  @Output() valueChange = new EventEmitter<FileList | null>();

  private onChange: (value: FileList | null) => void = () => {};
  private onTouched: () => void = () => {};
  private validatorChange?: () => void;
  private readonly removeEventListeners: (() => void)[] = [];

  private applyInputs() {
    this.setAttr('size', this.size);
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setBooleanAttr('multiple', this.multiple);
    this.setAttr('accept', this.accept);
    this.setBooleanAttr('required', this.required);
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('with-label', this.withLabel);
    this.setBooleanAttr('with-hint', this.withHint);

  }

  private registerEventListeners(): void {
    const el = this.host.nativeElement;
    const forwardInput = (event: Event) => {
      this.input.emit(event);
      this.propagateFiles(event);
    };
    const forwardChange = (event: Event) => {
      this.change.emit(event);
      this.propagateFiles(event);
    };

    this.removeEventListeners.push(
      this.renderer.listen(el, 'input', forwardInput),
      this.renderer.listen(el, 'wa-input', forwardInput),
      this.renderer.listen(el, 'change', forwardChange),
      this.renderer.listen(el, 'wa-change', forwardChange),
      this.renderer.listen(el, 'focus', (event: Event) => this.focus.emit(event)),
      this.renderer.listen(el, 'blur', (event: Event) => {
        this.blur.emit(event);
        this.onTouched();
      }),
      this.renderer.listen(el, 'wa-blur', (event: Event) => {
        this.blur.emit(event);
        this.onTouched();
      }),
      this.renderer.listen(el, 'wa-invalid', (event: CustomEvent) => this.waInvalid.emit(event))
    );
  }

  ngAfterViewInit(): void {
    this.applyInputs();
    this.registerEventListeners();
  }

  ngOnChanges(): void {
    this.applyInputs();
    this.validatorChange?.();
  }

  ngOnDestroy(): void {
    this.removeEventListeners.splice(0).forEach(remove => remove());
  }

  writeValue(value: FileList | null | undefined): void {
    // Browsers prohibit programmatically selecting files. Angular may only clear this control.
    if (value == null || value.length === 0) {
      const element = this.host.nativeElement as HTMLElement & { value?: string; clear?: () => void };
      if (typeof element.clear === 'function') {
        element.clear();
      } else {
        this.renderer.setProperty(element, 'value', '');
      }
    }
  }

  registerOnChange(fn: (value: FileList | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.host.nativeElement, 'disabled', isDisabled);
    this.setBooleanAttr('disabled', isDisabled);
    this.validatorChange?.();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const required = this.required === true || this.required === '' || this.required === 'true';
    return required && !control.value?.length ? { required: true } : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.validatorChange = fn;
  }

  private propagateFiles(event: Event): void {
    const source = (event.currentTarget || event.target || this.host.nativeElement) as { files?: FileList | null };
    const files = source.files ?? null;
    this.onChange(files);
    this.valueChange.emit(files);
  }

  private setAttr(name: string, value: any) {
    if (value !== undefined && value !== null) {
      this.renderer.setAttribute(this.host.nativeElement, name, String(value));
    } else {
      this.renderer.removeAttribute(this.host.nativeElement, name);
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
