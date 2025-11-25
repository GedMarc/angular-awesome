import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Appearance, normalizeAppearance } from '../../types/tokens';

/**
 * WaButtonDirective
 *
 * Angular wrapper for the <wa-button> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported button attributes as @Input() properties
 * - Supports boolean attributes like pill, caret, disabled, loading
 * - Emits button events (blurNative, focusNative, waInvalid)
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for start, end, and default content
 * - Supports custom styling via CSS variables
 * - Supports direct styling through color, backgroundColor, and fontSize inputs
 */
@Directive({
  selector: 'wa-button',
  standalone: true
})
export class WaButtonDirective implements OnInit, OnChanges {
  // Appearance inputs
  @Input() variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'inherit' | string;
  /**
   * Appearance can be a single token or a space-separated combination of tokens.
   * Strictly typed to known tokens only.
   */
  @Input() appearance?: Appearance;
  @Input() size?: 'small' | 'medium' | 'large' | 'inherit' | string;

  // Boolean inputs
  @Input() pill?: boolean | string;
  @Input() withCaret?: boolean | string;
  @Input() caret?: boolean | string;
  @Input() disabled?: boolean | string;
  @Input() loading?: boolean | string;

  // Button type inputs
  @Input() type?: 'button' | 'submit' | 'reset' | string;
  @Input() name?: string;
  @Input() value?: string;

  // Link inputs (when button acts as an anchor)
  @Input() href?: string;
  @Input() target?: '_blank' | '_self' | '_parent' | '_top' | string;
  @Input() rel?: string;
  @Input() download?: string;

  // Form inputs
  @Input() form?: string;
  @Input() formAction?: string;
  @Input() formEnctype?: string;
  @Input() formMethod?: string;
  @Input() formNoValidate?: boolean | string;
  @Input() formTarget?: string;

  // Direct styling inputs
  @Input() color?: string;
  @Input() backgroundColor?: string;
  @Input() fontSize?: string;

  // Dialog integration: support both kebab-case and camelCase bindings
  private _dataDialog: string | null | undefined;
  @Input('data-dialog') set dataDialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input('dialog') set dialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input() set dataDialog(val: string | null | undefined) { this._dataDialog = val ?? null; }

  // Event outputs
  @Output() blurEvent = new EventEmitter<Event>();
  @Output() focusEvent = new EventEmitter<Event>();
  @Output() waInvalid = new EventEmitter<Event>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set standard attributes
    this.setAttr('variant', this.variant);
    this.setAttr('appearance', normalizeAppearance(this.appearance));
    this.setAttr('size', this.size);
    this.setAttr('type', this.type);
    this.setAttr('name', this.name);
    this.setAttr('value', this.value);

    // Set link attributes
    this.setAttr('href', this.href);
    this.setAttr('target', this.target);
    this.setAttr('rel', this.rel);
    this.setAttr('download', this.download);

    // Set form attributes
    this.setAttr('form', this.form);
    this.setAttr('formaction', this.formAction);
    this.setAttr('formenctype', this.formEnctype);
    this.setAttr('formmethod', this.formMethod);
    this.setAttr('formtarget', this.formTarget);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('pill', this.pill);
    // Map both inputs `withCaret` and `caret` to the underlying `with-caret` attribute for the Web Component
    this.setBooleanAttr('with-caret', (this.withCaret === true || this.withCaret === 'true' || this.withCaret === '' || this.caret === true || this.caret === 'true' || this.caret === ''));
    // Do not set a standalone `caret` attribute on the element, as the Web Component uses `with-caret`
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('loading', this.loading);
    this.setBooleanAttr('formnovalidate', this.formNoValidate);

    // Dialog attribute
    this.setAttr('data-dialog', this._dataDialog);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'blur', (event) => this.blurEvent.emit(event));
    this.renderer.listen(nativeEl, 'focus', (event) => this.focusEvent.emit(event));
    this.renderer.listen(nativeEl, 'wa-invalid', (event) => this.waInvalid.emit(event));

    // Handle data-dialog at click time to avoid timing issues with Angular rendering
    this.renderer.listen(nativeEl, 'click', (event: Event) => {
      // Determine the instruction from the cached input or live attribute
      const raw = (this._dataDialog ?? nativeEl.getAttribute('data-dialog') ?? '').trim();
      if (!raw) return;

      // Support forms: "open id", "close id", or just "id" (treated as open)
      let action: 'open' | 'close' = 'open';
      let target = raw;
      const parts = raw.split(/\s+/);
      if (parts.length > 1 && (parts[0] === 'open' || parts[0] === 'close')) {
        action = parts[0] as 'open' | 'close';
        target = parts.slice(1).join(' ');
      }

      // Normalize id (accept leading '#')
      const id = target.replace(/^#/,'').trim();
      if (!id) return;

      const dialogEl = document.getElementById(id) as any;
      if (dialogEl && typeof dialogEl.show === 'function' && typeof dialogEl.hide === 'function') {
        try {
          if (action === 'open') {
            dialogEl.show();
          } else {
            dialogEl.hide();
          }
          // Prevent default if we handled the action
          event.preventDefault?.();
          event.stopPropagation?.();
        } catch { /* no-op */ }
      }
    });

    // Apply direct styling inputs
    if (this.color) nativeEl.style.color = this.color;
    if (this.backgroundColor) nativeEl.style.backgroundColor = this.backgroundColor;
    if (this.fontSize) nativeEl.style.fontSize = this.fontSize;
  }

  /**
   * Exposes the native button element for direct interaction
   */
  public get nativeButton(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Programmatically triggers click on the button
   */
  public click(): void {
    this.el.nativeElement.click();
  }

  /**
   * Sets focusNative on the button
   */
  public focus(): void {
    this.el.nativeElement.focus();
  }

  /**
   * Removes focusNative from the button
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
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Update dynamic attributes when inputs change after initialization
    if ('variant' in changes) {
      this.setOrRemoveAttr('variant', this.variant);
    }
    if ('appearance' in changes) {
      const norm = normalizeAppearance(this.appearance);
      this.setOrRemoveAttr('appearance', norm);
      // Also set the property to support web components that react to property changes but not attribute mutations
      (this.el.nativeElement as any).appearance = norm ?? null;
    }
    if ('size' in changes) {
      this.setOrRemoveAttr('size', this.size);
    }

    // Map caret inputs to underlying with-caret attribute
    if ('caret' in changes || 'withCaret' in changes) {
      const v = (this.withCaret === true || this.withCaret === 'true' || this.withCaret === '' || this.caret === true || this.caret === 'true' || this.caret === '');
      const el = this.el.nativeElement as HTMLElement;
      if (v) {
        this.renderer.setAttribute(el, 'with-caret', '');
      } else {
        this.renderer.removeAttribute(el, 'with-caret');
      }
      // Ensure no stray `caret` attribute remains
      this.renderer.removeAttribute(el, 'caret');
    }
  }

  private setOrRemoveAttr(name: string, value: string | null | undefined) {
    const el = this.el.nativeElement as HTMLElement;
    if (value == null) {
      this.renderer.removeAttribute(el, name);
    } else {
      this.renderer.setAttribute(el, name, String(value));
    }
  }
}
