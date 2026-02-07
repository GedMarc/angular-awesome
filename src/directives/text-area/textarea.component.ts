import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { SizeToken, Appearance, normalizeAppearance } from '../../types/tokens';

@Component({
  selector: 'wa-textarea',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaTextareaComponent),
      multi: true
    }
  ],
  host: {
    '[attr.label]': 'label',
    '[attr.hint]': 'hint',
    '[attr.placeholder]': 'placeholder',
    '[attr.rows]': 'rows',
    '[attr.resize]': 'resize',
    '[attr.size]': 'size',
    '[attr.appearance]': 'normalizedAppearance',
    '[attr.name]': 'name',
    '[attr.required]': 'required || null',
    '[attr.minlength]': 'minlength',
    '[attr.maxlength]': 'maxlength',
    '[attr.autocapitalize]': 'autocapitalize',
    '[attr.autocorrect]': 'autocorrect',
    '[attr.autocomplete]': 'autocomplete',
    '[attr.autofocus]': 'autofocus || null',
    '[attr.enterkeyhint]': 'enterkeyhint',
    '[attr.spellcheck]': 'spellcheck',
    '[attr.inputmode]': 'inputmode',
    '[attr.with-label]': 'withLabel ? true : null',
    '[attr.with-hint]': 'withHint ? true : null',
    '[attr.readonly]': 'readonly || null',
    '[attr.disabled]': 'disabled || null',

    '[style.--background-color]': 'backgroundColor',
    '[style.--border-color]': 'borderColor',
    '[style.--border-width]': 'borderWidth',
    '[style.--box-shadow]': 'boxShadow',

    '(focus)': 'onFocus($event)',
    '(wa-focus)': 'onFocus($event)',
    '(blur)': 'onBlur($event)',
    '(wa-blur)': 'onBlur($event)',
    '(input)': 'handleInput($event)',
    '(wa-input)': 'handleInput($event)',
    '(change)': 'handleChange($event)',
    '(wa-change)': 'handleChange($event)',
    '(wa-invalid)': 'waInvalid.emit($event)'
  }
})
export class WaTextareaComponent implements ControlValueAccessor {
  get normalizedAppearance(): string | undefined {
    return normalizeAppearance(this.appearance as any);
  }
  @Input() label?: string;
  @Input() hint?: string;
  @Input() placeholder?: string;
  @Input() rows?: number;
  @Input() resize?: 'none' | 'vertical' | 'horizontal' | 'both' | 'auto';
  @Input() size?: SizeToken | string;
  @Input() appearance?: Appearance | string;
  @Input() name?: string;
  @Input() required?: boolean;
  @Input() minlength?: number;
  @Input() maxlength?: number;
  @Input() autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
  @Input() autocorrect?: string;
  @Input() autocomplete?: string;
  @Input() autofocus?: boolean;
  @Input() enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  @Input() spellcheck?: boolean;
  @Input() inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  @Input() readonly?: boolean;
  @Input() disabled?: boolean;
  @Input() withLabel?: boolean;
  @Input() withHint?: boolean;

  // CSS custom properties
  @Input() backgroundColor?: string;
  @Input() borderColor?: string;
  @Input() borderWidth?: string;
  @Input() boxShadow?: string;

  @Output() waFocus = new EventEmitter<FocusEvent>();
  @Output('wa-focus') waFocusHyphen = this.waFocus;
  @Output() waBlur = new EventEmitter<FocusEvent>();
  @Output('wa-blur') waBlurHyphen = this.waBlur;
  @Output() waInput = new EventEmitter<Event>();
  @Output('wa-input') waInputHyphen = this.waInput;
  @Output() waChange = new EventEmitter<Event>();
  @Output('wa-change') waChangeHyphen = this.waChange;
  @Output() waInvalid = new EventEmitter<CustomEvent>();
  @Output('wa-invalid') waInvalidHyphen = this.waInvalid;
  @Output() valueChange = new EventEmitter<string>();

  private _value = '';
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private host: ElementRef<HTMLElement>) {}

  writeValue(val: any): void {
    this._value = val ?? '';
    this.host.nativeElement.setAttribute('value', this._value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.host.nativeElement.toggleAttribute('disabled', isDisabled);
  }

  handleInput(event: Event): void {
    const target = event.target as any;
    this._value = target.value;
    this.onChange(this._value);
    this.valueChange.emit(this._value);
    this.waInput.emit(event);
  }

  handleChange(event: Event): void {
    const target = event.target as any;
    this._value = target.value;
    this.onChange(this._value);
    this.valueChange.emit(this._value);
    this.waChange.emit(event);
  }

  onFocus(event: FocusEvent) {
    this.waFocus.emit(event);
  }

  onBlur(event: FocusEvent) {
    this.onTouched();
    this.waBlur.emit(event);
  }
}
