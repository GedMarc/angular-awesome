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
    '[attr.appearance]': 'appearance',
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
    '(blur)': 'onBlur($event)',
    '(input)': 'handleInput($event)',
    '(change)': 'changeEvent.emit($event)',
    '(wa-invalid)': 'invalid.emit($event)'
  }
})
export class WaTextareaComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() hint?: string;
  @Input() placeholder?: string;
  @Input() rows?: number;
  @Input() resize?: 'none' | 'vertical' | 'horizontal' | 'both' | 'auto';
  @Input() size?: 'small' | 'medium' | 'large' | 'inherit';
  @Input() appearance?: 'filled' | 'outlined';
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

  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() inputEvent = new EventEmitter<Event>();
  @Output() changeEvent = new EventEmitter<Event>();
  @Output() invalid = new EventEmitter<CustomEvent>();

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
    const target = event.target as HTMLTextAreaElement;
    this._value = target.value;
    this.onChange(this._value);
    this.inputEvent.emit(event);
  }

  onFocus(event: FocusEvent) {
    this.focusEvent.emit(event);
  }

  onBlur(event: FocusEvent) {
    this.onTouched();
    this.blurEvent.emit(event);
  }
}
