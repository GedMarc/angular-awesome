import { Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, OnChanges, SimpleChanges, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * WaDropdownItemDirective
 *
 * Angular wrapper for the <wa-dropdown-item> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds attributes: type, checked, value, loading, disabled, label, variant
 * - Binds link attributes: href, target, rel, download (Web Awesome 3.12+)
 * - Emits events: blurNative, focusNative
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content, icon, details, submenu, etc.
 * - Supports custom styling via CSS variables
 * - Implements ControlValueAccessor for ngModel support on checkbox type
 *
 * Slots:
 * - default: The dropdown item's content
 * - icon: Icon to display at the start of the item (replaces start slot)
 * - details: Additional details like keyboard shortcuts
 * - submenu: Nested dropdown items for creating submenus
 *
 * CSS States (Web Awesome 3.12+), targetable with `:state(...)`:
 * - active, checked, disabled, has-submenu, link, submenu-open
 */
@Directive({
  selector: 'wa-dropdown-item',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaDropdownItemDirective),
      multi: true
    }
  ]
})
export class WaDropdownItemDirective implements OnInit, OnChanges, ControlValueAccessor {
  @Input() type?: 'normal' | 'checkbox' | string;
  @Input() checked?: boolean | string;
  @Input() value?: string;
  @Input() loading?: boolean | string;
  @Input() disabled?: boolean | string;
  @Input() label?: string;
  @Input() variant?: 'danger' | 'default' | string;
  @Input() submenuOpen?: boolean | string;

  /**
   * Link inputs (Web Awesome 3.12+).
   *
   * When `href` is set, selecting the item navigates to the URL. The item remains a menu item for
   * assistive devices, so make sure the label describes where the link goes. `href` is ignored when
   * the item has a submenu. `target`, `rel`, and `download` are only used when `href` is present.
   */
  @Input() href?: string;
  @Input() target?: '_blank' | '_parent' | '_self' | '_top' | string;
  @Input() rel?: string;
  @Input() download?: string;

  // Style inputs
  @Input() backgroundColorHover?: string;
  @Input() textColorHover?: string;
  @Input() padding?: string;
  @Input() margin?: string;
  @Input() fontSize?: string;

  // Dialog integration: support both kebab-case and camelCase bindings
  private _dataDialog: string | null | undefined;
  @Input('data-dialog') set dataDialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input('dialog') set dialogAttr(val: string | null | undefined) { this._dataDialog = val ?? null; }
  @Input() set dataDialog(val: string | null | undefined) { this._dataDialog = val ?? null; }

  // Event outputs
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    this.applyInputs();

    // Set up event listeners
    this.renderer.listen(nativeEl, 'blurNative', (event: FocusEvent) => {
      this.blurEvent.emit(event);
      this.onTouched();
    });
    this.renderer.listen(nativeEl, 'focusNative', (event: FocusEvent) => {
      this.focusEvent.emit(event);
    });

    // For checkbox type, listen for checked changes
    if (this.type === 'checkbox') {
      this.renderer.listen(nativeEl, 'checkedChange', (event: CustomEvent<boolean>) => {
        this.onChange(event.detail);
      });
    }
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs() {
    // Set string attributes
    this.setAttr('type', this.type);
    this.setAttr('value', this.value);
    this.setAttr('label', this.label);
    this.setAttr('variant', this.variant);

    // Set link attributes (Web Awesome 3.12+).
    // `target`, `rel`, and `download` are only meaningful alongside `href`, so they are removed
    // when `href` is absent to avoid emitting orphaned attributes onto the element.
    this.setAttr('href', this.href);
    this.setAttr('target', this.href != null ? this.target : undefined);
    this.setAttr('rel', this.href != null ? this.rel : undefined);
    this.setAttr('download', this.href != null ? this.download : undefined);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('checked', this.checked);
    this.setBooleanAttr('loading', this.loading);
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('submenu-open', this.submenuOpen);

    // Set style attributes
    this.setCssVar('--background-color-hover', this.backgroundColorHover);
    this.setCssVar('--text-color-hover', this.textColorHover);
    this.setCssVar('--padding', this.padding);
    this.setCssVar('--margin', this.margin);
    this.setCssVar('--font-size', this.fontSize);

    // Dialog attribute
    this.setAttr('data-dialog', this._dataDialog);
  }

  /**
   * Sets an attribute on the native element if the value is not null or undefined
   */
  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  /**
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.el.nativeElement.style.setProperty(name, value);
    }
  }

  /**
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value !== undefined) {
      this.checked = value;
      this.setBooleanAttr('checked', value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.setBooleanAttr('disabled', isDisabled);
  }
}
