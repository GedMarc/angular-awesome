import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, inject } from '@angular/core';

/**
 * WaCopyButtonDirective
 *
 * Angular wrapper for the <wa-copy-button> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported copy-button attributes as @Input() properties
 * - Supports string inputs like value, from, copyLabel, successLabel, errorLabel
 * - Supports numeric inputs like feedbackDuration
 * - Supports tooltip placement options
 * - Supports boolean attributes like disabled
 * - Emits copy and error events
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for copy-icon, success-icon, and error-icon
 * - Supports custom styling via CSS variables
 */
@Directive({
  selector: 'wa-copy-button',
  standalone: true
})
export class WaCopyButtonDirective implements OnInit {
  // String inputs
  @Input() value?: string;
  @Input() from?: string;
  @Input() copyLabel?: string;
  @Input() successLabel?: string;
  @Input() errorLabel?: string;

  // Numeric inputs
  @Input() feedbackDuration?: number | string;

  // Placement input
  @Input() tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left' | string;

  // Boolean inputs
  @Input() disabled?: boolean | string;

  // Dialog integration: support both kebab-case and camelCase bindings
  private _dataDialog: string | null | undefined;
  @Input('data-dialog') set dataDialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input('dialog') set dialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input() set dataDialog(val: string | null | undefined) { this._dataDialog = val ?? null; }

  // Event outputs
  @Output() waCopy = new EventEmitter<void>();
  @Output() waError = new EventEmitter<Error>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set string attributes
    this.setAttr('value', this.value);
    this.setAttr('from', this.from);
    this.setAttr('copy-label', this.copyLabel);
    this.setAttr('success-label', this.successLabel);
    this.setAttr('error-label', this.errorLabel);
    this.setAttr('tooltip-placement', this.tooltipPlacement);

    // Set numeric attributes
    this.setNumericAttr('feedback-duration', this.feedbackDuration);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('disabled', this.disabled);

    // Dialog attribute
    this.setAttr('data-dialog', this._dataDialog);

    // Set up event listeners (use hyphenated custom events per WebAwesome)
    this.renderer.listen(nativeEl, 'wa-copy', () => this.waCopy.emit());
    this.renderer.listen(nativeEl, 'wa-error', (event: CustomEvent<Error>) => this.waError.emit(event.detail));
    // Backwards compatibility with legacy camelCase events
    this.renderer.listen(nativeEl, 'waCopy', () => this.waCopy.emit());
    this.renderer.listen(nativeEl, 'waError', (event: CustomEvent<Error>) => this.waError.emit(event.detail));
  }

  /**
   * Exposes the native copy-button element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Programmatically triggers the copy action
   */
  public copy(): void {
    if (typeof this.el.nativeElement.copy === 'function') {
      this.el.nativeElement.copy();
    }
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
