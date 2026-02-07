import { Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, inject } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { Appearance, SizeToken, normalizeAppearance } from '../../types/tokens';

/**
 * WaComboboxComponent
 *
 * Angular wrapper for the <wa-combobox> Web Awesome component that exposes
 * declarative bindings, ControlValueAccessor integration, and slot projection.
 */
@Component({
  selector: 'wa-combobox',
  standalone: true,
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaComboboxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WaComboboxComponent),
      multi: true
    }
  ]
})
export class WaComboboxComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, Validator {
  // Core inputs
  @Input() value?: any | any[];
  @Input() name?: string;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() placeholder?: string;
  @Input() appearance?: Appearance | string;
  @Input() pill?: boolean | string;
  @Input() withClear?: boolean | string;
  @Input() disabled?: boolean | string;
  @Input() multiple?: boolean | string;
  @Input() size?: SizeToken | string;
  @Input() placement?: 'top' | 'bottom' | string;
  @Input() required?: boolean | string;
  @Input() maxOptionsVisible?: number | string;
  @Input() withLabel?: boolean | string;
  @Input() withHint?: boolean | string;
  @Input() allowCustomValue?: boolean | string;
  @Input() autocomplete?: 'list' | 'none' | string;
  @Input() validationTarget?: string;

  // Rich behavior inputs
  @Input() filter?: ((option: any, query: string) => boolean) | null;
  @Input() getTag?: any;

  // Object binding helpers
  @Input() valueField?: string;
  @Input() trackBy?: (item: any) => string;

  // Style inputs
  @Input() backgroundColor?: string;
  @Input() borderColor?: string;
  @Input() borderWidth?: string;
  @Input() boxShadow?: string;
  @Input() backgroundColorCurrent?: string;
  @Input() backgroundColorHover?: string;
  @Input() textColorCurrent?: string;
  @Input() textColorHover?: string;

  // Event outputs
  @Output() waInput = new EventEmitter<Event>();
  @Output('wa-input') waInputHyphen = this.waInput;
  @Output() waChange = new EventEmitter<Event>();
  @Output('wa-change') waChangeHyphen = this.waChange;
  @Output() waFocus = new EventEmitter<FocusEvent>();
  @Output('wa-focus') waFocusHyphen = this.waFocus;
  @Output() waBlur = new EventEmitter<FocusEvent>();
  @Output('wa-blur') waBlurHyphen = this.waBlur;
  @Output() waClear = new EventEmitter<CustomEvent>();
  @Output('wa-clear') waClearHyphen = this.waClear;
  @Output() waShow = new EventEmitter<CustomEvent>();
  @Output('wa-show') waShowHyphen = this.waShow;
  @Output() waAfterShow = new EventEmitter<CustomEvent>();
  @Output('wa-after-show') waAfterShowHyphen = this.waAfterShow;
  @Output() waHide = new EventEmitter<CustomEvent>();
  @Output('wa-hide') waHideHyphen = this.waHide;
  @Output() waAfterHide = new EventEmitter<CustomEvent>();
  @Output('wa-after-hide') waAfterHideHyphen = this.waAfterHide;
  @Output() waInvalid = new EventEmitter<CustomEvent>();
  @Output('wa-invalid') waInvalidHyphen = this.waInvalid;
  @Output() valueChange = new EventEmitter<any>();

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private validatorChange?: () => void;
  private attrObserver?: MutationObserver;
  private isWriting = false;

  private keyToObject = new Map<string, any>();
  private objectToKey = new WeakMap<object, string>();
  private uidCounter = 0;

  private getKeyFor(val: any): string {
    if (val == null) {
      return '';
    }
    const type = typeof val;
    if (type !== 'object') {
      return String(val);
    }
    if (this.objectToKey.has(val)) {
      return this.objectToKey.get(val)!;
    }
    let key: string | undefined;
    try {
      if (this.trackBy) {
        key = this.trackBy(val);
      } else if (this.valueField && (val as any)[this.valueField] != null) {
        key = String((val as any)[this.valueField]);
      }
    } catch {
      key = undefined;
    }
    if (!key) {
      key = `obj:${++this.uidCounter}`;
    }
    this.objectToKey.set(val as object, key);
    if (!this.keyToObject.has(key)) {
      this.keyToObject.set(key, val);
    }
    return key;
  }

  /** Register an option's value and return the corresponding DOM key */
  public registerOptionValue(val: any): string {
    const key = this.getKeyFor(val);
    if (!this.keyToObject.has(key)) {
      this.keyToObject.set(key, val);
    }
    return key;
  }

  private mapFromKeys(raw: string | string[]): any | any[] {
    const mapOne = (key: string) => (this.keyToObject.has(key) ? this.keyToObject.get(key) : key);
    if (Array.isArray(raw)) {
      return raw.map(mapOne);
    }
    return mapOne(raw);
  }

  ngOnInit(): void {
    const nativeEl = this.el.nativeElement;
    this.applyInputs();

    const handleValueRead = () => {
      const el: any = this.el.nativeElement;
      let rawValue: any = el?.value ?? el?.getAttribute?.('value') ?? '';
      if (this.isMultiple() && !Array.isArray(rawValue)) {
        rawValue = String(rawValue)
          .split(' ')
          .filter(v => v !== '');
      }
      const mapped = this.mapFromKeys(rawValue);
      this.onChange(mapped);
      this.valueChange.emit(mapped);
    };

    const forwardInput = (event: Event | CustomEvent) => {
      this.waInput.emit(event as Event);
      handleValueRead();
    };

    const forwardChange = (event: Event | CustomEvent) => {
      this.waChange.emit(event as Event);
      handleValueRead();
    };

    this.renderer.listen(nativeEl, 'input', forwardInput);
    this.renderer.listen(nativeEl, 'wa-input', forwardInput);
    this.renderer.listen(nativeEl, 'change', forwardChange);
    this.renderer.listen(nativeEl, 'wa-change', forwardChange);
    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => {
      this.waFocus.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-focus', (event: CustomEvent) => {
      this.waFocus.emit(event as unknown as FocusEvent);
    });
    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.waBlur.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'wa-blur', (event: CustomEvent) => {
      this.waBlur.emit(event as unknown as FocusEvent);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'wa-clear', (event: CustomEvent) => {
      this.waClear.emit(event);
      const val = this.isMultiple() ? [] : '';
      this.onChange(val);
      this.valueChange.emit(val);
    });
    this.renderer.listen(nativeEl, 'wa-show', (event: CustomEvent) => this.waShow.emit(event));
    this.renderer.listen(nativeEl, 'wa-after-show', (event: CustomEvent) => this.waAfterShow.emit(event));
    this.renderer.listen(nativeEl, 'wa-hide', (event: CustomEvent) => this.waHide.emit(event));
    this.renderer.listen(nativeEl, 'wa-after-hide', (event: CustomEvent) => this.waAfterHide.emit(event));
    this.renderer.listen(nativeEl, 'wa-invalid', (event: CustomEvent) => {
      this.waInvalid.emit(event);
      this.validatorChange?.();
    });

    try {
      this.attrObserver = new MutationObserver(mutations => {
        if (this.isWriting) {
          return;
        }
        for (const mutation of mutations) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
            const el: any = this.el.nativeElement;
            let current = el?.value ?? el?.getAttribute?.('value') ?? '';
            if (this.isMultiple() && !Array.isArray(current)) {
              current = String(current)
                .split(' ')
                .filter(v => v !== '');
            }
            const mapped = this.mapFromKeys(current);
            this.onChange(mapped);
            this.valueChange.emit(mapped);
          }
        }
      });
      this.attrObserver.observe(nativeEl, { attributes: true, attributeFilter: ['value'] });
    } catch {}
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  ngOnDestroy(): void {
    this.attrObserver?.disconnect();
  }

  private applyInputs(): void {
    this.setAttr('name', this.name);
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setAttr('placeholder', this.placeholder);
    this.setAttr('appearance', normalizeAppearance(this.appearance as any));
    this.setAttr('size', this.size);
    this.setAttr('placement', this.placement);
    this.setAttr('autocomplete', this.autocomplete);
    this.setAttr('validation-target', this.validationTarget);
    this.setAttr('form', (this.el.nativeElement as any).form ?? undefined);
    this.setNumericAttr('max-options-visible', this.maxOptionsVisible);

    const host = this.el.nativeElement;
    ['pill', 'with-clear', 'disabled', 'multiple', 'required', 'allow-custom-value', 'with-label', 'with-hint'].forEach(attr =>
      host.removeAttribute(attr)
    );

    this.setBooleanAttr('pill', this.pill);
    this.setBooleanAttr('with-clear', this.withClear);
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('multiple', this.multiple);
    this.setBooleanAttr('required', this.required);
    this.setBooleanAttr('allow-custom-value', this.allowCustomValue);
    this.setBooleanAttr('with-label', this.withLabel);
    this.setBooleanAttr('with-hint', this.withHint);

    this.setCssVar('--background-color', this.backgroundColor);
    this.setCssVar('--border-color', this.borderColor);
    this.setCssVar('--border-width', this.borderWidth);
    this.setCssVar('--box-shadow', this.boxShadow);
    this.setCssVar('--background-color-current', this.backgroundColorCurrent);
    this.setCssVar('--background-color-hover', this.backgroundColorHover);
    this.setCssVar('--text-color-current', this.textColorCurrent);
    this.setCssVar('--text-color-hover', this.textColorHover);

    if (this.filter) {
      (this.el.nativeElement as any).filter = this.filter;
    }
    if (this.getTag) {
      (this.el.nativeElement as any).getTag = this.getTag;
    }
  }

  private isMultiple(): boolean {
    return this.multiple === true || this.multiple === '' || this.multiple === 'true';
  }

  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  private setAttr(name: string, value: string | null | undefined): void {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    } else {
      this.el.nativeElement.removeAttribute(name);
    }
  }

  private setNumericAttr(name: string, value: number | string | null | undefined): void {
    if (value != null) {
      const numeric = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(numeric)) {
        this.renderer.setAttribute(this.el.nativeElement, name, numeric.toString());
      }
    } else {
      this.el.nativeElement.removeAttribute(name);
    }
  }

  private setCssVar(name: string, value: string | null | undefined): void {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
    } else {
      this.el.nativeElement.style.removeProperty(name);
    }
  }

  private setBooleanAttr(name: string, value: boolean | string | null | undefined): void {
    if (value === true || value === '' || value === 'true') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      this.el.nativeElement.removeAttribute(name);
    }
  }

  // ControlValueAccessor
  writeValue(value: any): void {
    if (value === undefined) {
      return;
    }
    this.value = value;
    this.isWriting = true;
    try {
      const el: any = this.el.nativeElement;
      if (this.isMultiple()) {
        const arrayValue = Array.isArray(value) ? value : value == null ? [] : [value];
        const keys = arrayValue.map(v => this.getKeyFor(v));
        this.renderer.setProperty(el, 'value', keys);
        if (keys.length === 0) {
          this.el.nativeElement.removeAttribute('value');
        } else {
          this.setAttr('value', keys.join(' '));
        }
      } else {
        if (value == null || value === '') {
          this.renderer.setProperty(el, 'value', '');
          this.el.nativeElement.removeAttribute('value');
        } else {
          const key = this.getKeyFor(value);
          this.renderer.setProperty(el, 'value', key);
          this.setAttr('value', key);
        }
      }
    } finally {
      Promise.resolve().then(() => (this.isWriting = false));
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', !!isDisabled);
    if (isDisabled) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
    } else {
      this.el.nativeElement.removeAttribute('disabled');
    }
  }

  // Validator
  validate(control: AbstractControl): ValidationErrors | null {
    const el: any = this.el?.nativeElement;
    if (!el || el.disabled) {
      return null;
    }
    const isRequired = this.required === true || this.required === '' || this.required === 'true';
    if (!isRequired) {
      return null;
    }
    const val = control?.value;
    const empty = Array.isArray(val) ? val.length === 0 : val == null || val === '';
    return empty ? { required: true } : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validatorChange = fn;
  }
}
