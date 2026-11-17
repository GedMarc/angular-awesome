import {
  Directive, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, booleanAttribute,
  forwardRef, inject, DestroyRef, Injector
} from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator
} from '@angular/forms';
import { SizeToken } from '../../types/tokens';
import { reflectAttributeInputs } from '../shared/attribute-inputs';
import { syncFormValidationState } from '../shared/form-validation-state';

export interface RichTextEditorSwatch {
  color: string;
  label: string;
}

export type RichTextEditorImage = string | { src: string; alt?: string };
export type RichTextEditorEmbed = string | { src: string; title?: string; width?: number; height?: number };

export interface RichTextEditorSuggestionRequest {
  trigger: string;
  query: string;
  signal: AbortSignal;
}

export interface RichTextEditorSuggestionItem {
  label: string;
  value?: string;
  description?: string;
}

export interface RichTextEditorSuggestionSource<T extends RichTextEditorSuggestionItem = RichTextEditorSuggestionItem> {
  trigger: string;
  dataSource(request: RichTextEditorSuggestionRequest): readonly T[] | Promise<readonly T[]>;
  formatter?(item: T): unknown;
}

export interface RichTextEditorSelection {
  from: number;
  to: number;
  empty: boolean;
}

export interface WaRichTextEditorSuggestionsErrorDetail {
  error: unknown;
  request: Pick<RichTextEditorSuggestionRequest, 'trigger' | 'query'>;
}

export interface WaRichTextEditorElement extends HTMLElement {
  value: string;
  defaultValue: string;
  readonly view?: unknown;
  readonly textValue: string;
  readonly selectedText: string;
  readonly canUndo: boolean;
  readonly canRedo: boolean;
  readonly dirty: boolean;
  readonly form: HTMLFormElement | null;
  readonly validity?: ValidityState;
  readonly validationMessage?: string;
  validationTarget?: HTMLElement;
  readonly updateComplete?: Promise<boolean>;
  runCommand?(name: string, options?: Record<string, unknown>): boolean;
  isActive?(name: string): boolean;
  insertHtml?(html: string): void;
  insertText?(text: string): void;
  deleteSelection?(): void;
  selectAll?(): void;
  undo?(): boolean;
  redo?(): boolean;
  getSelection?(): RichTextEditorSelection;
  setCustomValidity?(message: string): void;
  formStateRestoreCallback?(state: string | File | FormData | null, reason: 'autocomplete' | 'restore'): void;
  resetValidity?(): void;
}

/** Angular forms and template bindings for the Web Awesome Pro rich text editor. */
@Directive({
  selector: 'wa-rich-text-editor',
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => WaRichTextEditorDirective), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => WaRichTextEditorDirective), multi: true }
  ],
  host: {
    '[style.--content-min-height]': 'contentMinHeight',
    '[style.--content-max-height]': 'contentMaxHeight',
    '[style.--show-duration]': 'showDuration',
    '[style.--hide-duration]': 'hideDuration',
    '[style.--shadow-color]': 'shadowColor',
    '[style.--shadow-size]': 'shadowSize',
    '(input)': 'handleInput($event)',
    '(change)': 'forward($event, waChange)',
    '(focus)': 'forward($event, waFocus)',
    '(blur)': 'handleBlur($event)',
    '(selectionchange)': 'forward($event, selectionChange)',
    '(wa-invalid)': 'forward($event, waInvalid)',
    '(wa-suggestions-error)': 'forward($event, waSuggestionsError)'
  }
})
export class WaRichTextEditorDirective implements OnChanges, OnInit, DoCheck, ControlValueAccessor, Validator {
  @Input() value?: string | null;
  @Input() defaultValue?: string | null;
  @Input() name?: string | null;
  @Input() format?: 'html' | 'markdown';
  @Input() label?: string;
  @Input() hint?: string;
  @Input({ transform: booleanAttribute }) withLabel = false;
  @Input({ transform: booleanAttribute }) withHint = false;
  @Input() placeholder?: string;
  @Input() size?: Exclude<SizeToken, 'inherit'>;
  @Input() appearance?: 'filled' | 'outlined' | 'filled-outlined';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input({ transform: booleanAttribute }) required = false;
  /** Use this binding with Angular forms to validate the editor's plain text. */
  @Input() minLength?: number | string | null;
  /** Use this binding with Angular forms to validate the editor's plain text. */
  @Input() maxLength?: number | string | null;
  @Input() minlength?: number | string;
  @Input() maxlength?: number | string;
  @Input({ transform: booleanAttribute }) withCount = false;
  @Input() toolbar?: string;
  @Input() toolbarPlacement?: 'top' | 'bottom';
  @Input() iconLibrary?: string;
  @Input() disabledFeatures?: string;
  @Input() headingLevels?: string;
  @Input() textColors?: string | readonly (string | RichTextEditorSwatch)[];
  @Input() highlightColors?: string | readonly (string | RichTextEditorSwatch)[];
  @Input() linkTarget?: string;
  @Input() linkRel?: string;
  @Input({ transform: booleanAttribute }) withoutSmartPunctuation = false;
  @Input({ transform: booleanAttribute }) withoutMarkdownShortcuts = false;
  @Input({ transform: booleanAttribute }) withoutAutolink = false;
  @Input() autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
  @Input() autocorrect?: boolean | 'on' | 'off';
  @Input() enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  @Input() spellcheck?: boolean | 'true' | 'false';
  @Input() inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  @Input() imageProvider?: (file?: File) => Promise<RichTextEditorImage | null | undefined>;
  @Input() embedProvider?: (input: string) => Promise<RichTextEditorEmbed | null | undefined>;
  @Input() suggestions?: readonly RichTextEditorSuggestionSource[];
  @Input() validationTarget?: HTMLElement;
  @Input() form?: string | null;

  @Input() contentMinHeight?: string;
  @Input() contentMaxHeight?: string;
  @Input() showDuration?: string;
  @Input() hideDuration?: string;
  @Input() shadowColor?: string;
  @Input() shadowSize?: string;

  @Output() valueChange = new EventEmitter<string>();
  @Output() waInput = new EventEmitter<Event>();
  @Output() waChange = new EventEmitter<Event>();
  @Output() waFocus = new EventEmitter<Event>();
  @Output() waBlur = new EventEmitter<Event>();
  @Output() selectionChange = new EventEmitter<Event>();
  @Output() waInvalid = new EventEmitter<Event>();
  @Output() waSuggestionsError = new EventEmitter<CustomEvent<WaRichTextEditorSuggestionsErrorDetail>>();

  private readonly el = inject(ElementRef<WaRichTextEditorElement>);
  private readonly renderer = inject(Renderer2);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private ngControl?: NgControl | null;
  private controlDisabled?: boolean;
  private validationUpdate?: Promise<boolean>;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  private validatorChange?: () => void;

  get nativeElement(): WaRichTextEditorElement { return this.el.nativeElement; }
  get view(): unknown { return this.nativeElement.view; }
  get textValue(): string { return this.nativeElement.textValue ?? ''; }
  get selectedText(): string { return this.nativeElement.selectedText ?? ''; }
  get canUndo(): boolean { return this.nativeElement.canUndo ?? false; }
  get canRedo(): boolean { return this.nativeElement.canRedo ?? false; }
  get dirty(): boolean { return this.nativeElement.dirty ?? false; }

  ngOnChanges(changes: SimpleChanges): void {
    const element = this.nativeElement;
    reflectAttributeInputs(this.renderer, element, changes, [
      'name', 'format', 'label', 'hint', 'withLabel', 'withHint', 'placeholder', 'size', 'appearance',
      'readonly', 'required', 'minlength', 'maxlength', 'withCount', 'toolbar', 'toolbarPlacement', 'iconLibrary',
      'disabledFeatures', 'headingLevels', 'linkTarget', 'linkRel', 'withoutSmartPunctuation',
      'withoutMarkdownShortcuts', 'withoutAutolink', 'autocapitalize', 'enterkeyhint', 'inputmode', 'form'
    ]);
    if (changes['minLength']) this.setAttribute('minlength', this.minLength?.toString());
    if (changes['maxLength']) this.setAttribute('maxlength', this.maxLength?.toString());
    if (changes['disabled']) this.applyDisabled();
    if (changes['autocorrect']) this.setAttribute('autocorrect', typeof this.autocorrect === 'boolean'
      ? (this.autocorrect ? 'on' : 'off') : this.autocorrect);
    if (changes['spellcheck']) this.setAttribute('spellcheck', this.spellcheck?.toString());
    if (changes['defaultValue']) {
      this.setAttribute('value', this.defaultValue);
      this.renderer.setProperty(element, 'defaultValue', this.defaultValue ?? '');
    }
    if (changes['value']) this.renderer.setProperty(element, 'value', this.value ?? '');

    for (const property of ['textColors', 'highlightColors', 'imageProvider', 'embedProvider', 'validationTarget'] as const) {
      if (changes[property]) this.renderer.setProperty(element, property, this[property]);
    }
    if (changes['suggestions']) this.renderer.setProperty(element, 'suggestions', this.suggestions ?? []);
    this.refreshValidation();
  }

  ngOnInit(): void {
    const registry = this.nativeElement.ownerDocument.defaultView?.customElements;
    if (registry && !registry.get('wa-rich-text-editor')) {
      void registry.whenDefined('wa-rich-text-editor').then(() => {
        if (!this.destroyRef.destroyed) this.refreshValidation();
      });
    }
  }

  ngDoCheck(): void {
    if (this.ngControl === undefined) this.ngControl = this.injector.get(NgControl, null, { self: true });
    syncFormValidationState(this.el, this.renderer, this.ngControl);
  }

  writeValue(value: string | null | undefined): void {
    this.renderer.setProperty(this.nativeElement, 'value', value ?? '');
    this.refreshValidation();
  }

  registerOnChange(fn: (value: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(disabled: boolean): void {
    this.controlDisabled = disabled;
    this.applyDisabled();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const validity = this.nativeElement.validity;
    if (!validity) return this.required && !control.value ? { required: true } : null;
    if (validity.valueMissing) return { required: true };
    if (!validity.valid) return { waRichTextEditor: { message: this.nativeElement.validationMessage } };
    return null;
  }

  registerOnValidatorChange(fn: () => void): void { this.validatorChange = fn; }

  handleInput(event: Event): void {
    if (event.target !== this.nativeElement) return;
    const value = this.nativeElement.value ?? '';
    this.onChange(value);
    this.valueChange.emit(value);
    this.waInput.emit(event);
    this.refreshValidation();
  }

  handleBlur(event: Event): void {
    if (event.target !== this.nativeElement) return;
    this.onTouched();
    this.waBlur.emit(event);
  }

  forward<T extends Event>(event: T, output: EventEmitter<T>): void {
    if (event.target === this.nativeElement) output.emit(event);
  }

  runCommand(name: string, options?: Record<string, unknown>): boolean {
    return this.nativeElement.runCommand?.(name, options) ?? false;
  }
  isActive(name: string): boolean { return this.nativeElement.isActive?.(name) ?? false; }
  insertHtml(html: string): void { this.nativeElement.insertHtml?.(html); }
  insertText(text: string): void { this.nativeElement.insertText?.(text); }
  deleteSelection(): void { this.nativeElement.deleteSelection?.(); }
  selectAll(): void { this.nativeElement.selectAll?.(); }
  undo(): boolean { return this.nativeElement.undo?.() ?? false; }
  redo(): boolean { return this.nativeElement.redo?.() ?? false; }
  getSelection(): RichTextEditorSelection | undefined { return this.nativeElement.getSelection?.(); }
  focus(options?: FocusOptions): void { this.nativeElement.focus(options); }
  blur(): void { this.nativeElement.blur(); }

  setCustomValidity(message: string): void {
    this.nativeElement.setCustomValidity?.(message);
    this.refreshValidation();
  }

  formStateRestoreCallback(state: string | File | FormData | null, reason: 'autocomplete' | 'restore'): void {
    this.nativeElement.formStateRestoreCallback?.(state, reason);
    this.refreshValidation();
  }

  resetValidity(): void {
    this.nativeElement.resetValidity?.();
    this.refreshValidation();
  }

  private applyDisabled(): void {
    this.setAttribute('disabled', (this.controlDisabled ?? this.disabled) ? '' : undefined);
  }

  private setAttribute(name: string, value: string | null | undefined): void {
    if (value == null) this.renderer.removeAttribute(this.nativeElement, name);
    else this.renderer.setAttribute(this.nativeElement, name, value);
  }

  private refreshValidation(): void {
    this.validatorChange?.();
    const update = this.nativeElement.updateComplete;
    if (!update || update === this.validationUpdate) return;

    this.validationUpdate = update;
    // Web Awesome updates element-internals validity when its render completes.
    void update.then(() => {
      if (!this.destroyRef.destroyed && this.validationUpdate === update) this.validatorChange?.();
    }, () => {});
  }
}
