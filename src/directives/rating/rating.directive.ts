import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, Output, Renderer2, inject } from '@angular/core';
import { SizeToken } from '../../types/tokens';

/**
 * WaRatingDirective
 *
 * Angular wrapper for the <wa-rating> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported rating attributes as @Input() properties
 * - Supports value, max, precision, readonly, disabled, and size customization
 * - Emits rating events (waChange, waHover)
 * - Enables Angular-style class and style bindings
 * - Supports custom styling via CSS variables
 * - Provides accessibility support through label attribute
 * - Allows custom symbols via getSymbol property
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
@Directive({
  selector: 'wa-rating',
  standalone: true
})
export class WaRatingDirective implements OnInit, AfterViewInit, OnChanges {
  // Dialog integration: support both kebab-case and camelCase bindings
  private _dataDialog: string | null | undefined;
  @Input('data-dialog') set dataDialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input('dialog') set dialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input() set dataDialog(val: string | null | undefined) { this._dataDialog = val ?? null; }
  // Rating inputs
  @Input() label?: string;
  @Input() value?: number | string;
  @Input() max?: number | string;
  @Input() precision?: number | string;
  @Input() readonly?: boolean | string;
  @Input() disabled?: boolean | string;
  @Input() size?: SizeToken | string;

  // Direct styling inputs
  @Input() color?: string;
  @Input() backgroundColor?: string;
  @Input() fontSize?: string;

  // Custom symbol function
  private _getSymbol?: (value: number) => string;

  // Event outputs
  @Output() waChange = new EventEmitter<number>();
  @Output('wa-change') waChangeHyphen = this.waChange;
  @Output() waHover = new EventEmitter<{ phase: string, value: number }>();
  @Output('wa-hover') waHoverHyphen = this.waHover;
  @Output() waFocus = new EventEmitter<FocusEvent>();
  @Output('wa-focus') waFocusHyphen = this.waFocus;
  @Output() waBlur = new EventEmitter<FocusEvent>();
  @Output('wa-blur') waBlurHyphen = this.waBlur;
  @Output() valueChange = new EventEmitter<number>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    this.applyInputs();

    // Set up event listeners
    const handleChange = (event: CustomEvent<number>) => {
      const val = typeof event.detail === 'number' ? event.detail : (event.target as any).value;
      this.waChange.emit(val);
      this.valueChange.emit(val);
    };

    this.renderer.listen(nativeEl, 'change', handleChange as any);
    this.renderer.listen(nativeEl, 'wa-change', handleChange as any);

    this.renderer.listen(nativeEl, 'hover', (event: CustomEvent<{ phase: string, value: number }>) => {
      this.waHover.emit(event.detail);
    });
    this.renderer.listen(nativeEl, 'wa-hover', (event: CustomEvent<{ phase: string, value: number }>) => {
      this.waHover.emit(event.detail);
    });

    this.renderer.listen(nativeEl, 'focus', (event: FocusEvent) => {
      this.waFocus.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-focus', (event: CustomEvent) => {
      this.waFocus.emit(event as unknown as FocusEvent);
    });

    this.renderer.listen(nativeEl, 'blur', (event: FocusEvent) => {
      this.waBlur.emit(event);
    });
    this.renderer.listen(nativeEl, 'wa-blur', (event: CustomEvent) => {
      this.waBlur.emit(event as unknown as FocusEvent);
    });
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set standard attributes
    this.setAttr('label', this.label);

    // Set numeric attributes
    this.setNumericAttr('value', this.value);
    this.setNumericAttr('max', this.max);
    this.setNumericAttr('precision', this.precision);

    // Set string attributes
    this.setAttr('size', this.size);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('readonly', this.readonly);
    this.setBooleanAttr('disabled', this.disabled);

    // Apply direct styling inputs
    if (this.color) nativeEl.style.color = this.color;
    if (this.backgroundColor) nativeEl.style.backgroundColor = this.backgroundColor;
    if (this.fontSize) nativeEl.style.fontSize = this.fontSize;

    // Dialog attribute
    this.setAttr('data-dialog', this._dataDialog);
  }

  ngAfterViewInit() {
    // Set custom symbol function if provided
    if (this._getSymbol) {
      (this.el.nativeElement as any).getSymbol = this._getSymbol;
    }
  }

  /**
   * Sets a custom symbol function for the rating component
   */
  public set getSymbol(fn: (value: number) => string) {
    this._getSymbol = fn;

    // If the element is already initialized, set the property directly
    if (this.el?.nativeElement) {
      (this.el.nativeElement as any).getSymbol = fn;
    }
  }

  /**
   * Exposes the native rating element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Sets focusNative on the rating component
   */
  public focus(): void {
    this.el.nativeElement.focus();
  }

  /**
   * Removes focusNative from the rating component
   */
  public blur(): void {
    this.el.nativeElement.blur();
  }

  /**
   * Sets an attribute on the native element if the value is not null or undefined
   */
  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    }
  }

  /**
   * Sets a numeric attribute on the native element if the value is not null or undefined
   */
  private setNumericAttr(name: string, value: number | string | null | undefined) {
    if (value != null) {
      const numericValue = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(numericValue)) {
        this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
      }
    }
  }

  /**
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    }
  }
}
