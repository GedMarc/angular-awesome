import { Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Type definition for dropdown placement options
 */
export type DropdownPlacement =
  'top' | 'top-start' | 'top-end' |
  'bottom' | 'bottom-start' | 'bottom-end' |
  'right' | 'right-start' | 'right-end' |
  'left' | 'left-start' | 'left-end';

/**
 * WaDropdownDirective
 *
 * Angular wrapper for the <wa-dropdown> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported dropdown attributes as @Input() properties
 * - Supports string inputs like placement
 * - Supports boolean attributes like disabled and stayOpenOnSelect
 * - Supports numeric inputs like distance and skidding
 * - Emits events for dropdown lifecycle: showEvent, afterShowEvent, hideEvent, afterHideEvent, selectEvent
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for trigger and content
 * - Supports custom styling via CSS variables
 * - Provides methods for programmatic control: show(), hide(), and reposition()
 * - Implements ControlValueAccessor for ngModel support
 */
@Directive({
  selector: 'wa-dropdown',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaDropdownDirective),
      multi: true
    }
  ]
})
export class WaDropdownDirective implements OnInit, ControlValueAccessor {
  // Structural inputs
  @Input() placement?: DropdownPlacement | string;
  @Input() disabled?: boolean | string;
  @Input() stayOpenOnSelect?: boolean | string;
  @Input() containingElement?: HTMLElement;
  @Input() distance?: number | string;
  @Input() skidding?: number | string;
  @Input() sync?: 'width' | 'height' | 'both' | string;

  // Style inputs
  @Input() boxShadow?: string;

  // Event outputs
  @Output() showEvent = new EventEmitter<Event>();
  @Output() afterShowEvent = new EventEmitter<Event>();
  @Output() hideEvent = new EventEmitter<Event>();
  @Output() afterHideEvent = new EventEmitter<Event>();
  @Output() selectEvent = new EventEmitter<{ item: HTMLElement }>();

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // ControlValueAccessor implementation
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private value: any;

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    // Set string attributes
    this.setAttr('placement', this.placement);
    this.setAttr('sync', this.sync);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('stay-open-on-select', this.stayOpenOnSelect);

    // Set numeric attributes
    this.setNumericAttr('distance', this.distance);
    this.setNumericAttr('skidding', this.skidding);

    // Set object attributes
    if (this.containingElement) {
      (nativeEl as any).containingElement = this.containingElement;
    }

    // Set style attributes
    this.setCssVar('--box-shadow', this.boxShadow);

    // Set up event listeners
    this.renderer.listen(nativeEl, 'wa-show', (event: Event) => this.showEvent.emit(event));
    this.renderer.listen(nativeEl, 'wa-after-show', (event: Event) => this.afterShowEvent.emit(event));
    this.renderer.listen(nativeEl, 'wa-hide', (event: Event) => this.hideEvent.emit(event));
    this.renderer.listen(nativeEl, 'wa-after-hide', (event: Event) => this.afterHideEvent.emit(event));
    this.renderer.listen(nativeEl, 'wa-select', (event: CustomEvent<{ item: HTMLElement }>) => {
      this.selectEvent.emit(event.detail);

      // Handle ngModel value update when a menu item is selected
      const selectedItem = event.detail.item;
      if (selectedItem && selectedItem.hasAttribute('value')) {
        const newValue = selectedItem.getAttribute('value');
        if (newValue !== this.value) {
          this.value = newValue;
          this.onChange(newValue);
          this.onTouched();
        }
      }
    });
  }

  /**
   * Exposes the native dropdown element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Programmatically opens the dropdown
   */
  public show(): void {
    if (typeof this.el.nativeElement.show === 'function') {
      this.el.nativeElement.show();
    }
  }

  /**
   * Programmatically closes the dropdown
   */
  public hide(): void {
    if (typeof this.el.nativeElement.hide === 'function') {
      this.el.nativeElement.hide();
    }
  }

  /**
   * Programmatically repositions the dropdown
   */
  public reposition(): void {
    if (typeof this.el.nativeElement.reposition === 'function') {
      this.el.nativeElement.reposition();
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
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
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

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value;

    // Find and select the menu item with the matching value
    if (value != null) {
      setTimeout(() => {
        const menuItems = this.el.nativeElement.querySelectorAll('wa-menu-item[value]');
        for (let i = 0; i < menuItems.length; i++) {
          const item = menuItems[i];
          if (item.getAttribute('value') === value) {
            item.selected = true;
            break;
          }
        }
      });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.setBooleanAttr('disabled', isDisabled);
  }
}
