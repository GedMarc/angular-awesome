import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, inject } from '@angular/core';
import { SizeToken } from '../../types/tokens';

/**
 * WaCheckboxGroupDirective
 *
 * Angular wrapper for the <wa-checkbox-group> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Checkbox groups give a set of related `<wa-checkbox>` or `<wa-switch>` elements a shared
 * label, hint, and grouping semantics. The group itself does not own a value — the individual
 * checkboxes/switches continue to manage their own `[(ngModel)]`/`formControlName` bindings.
 *
 * Features:
 * - Binds all supported checkbox-group attributes as @Input() properties
 * - Supports boolean attributes like required, with-label, with-hint
 * - Allows slot projection for default (checkboxes/switches), label, and hint content
 * - Supports custom styling via the `--gap` CSS custom property
 * - Exposes the native element for direct access
 */
@Directive({
  selector: 'wa-checkbox-group',
  standalone: true
})
export class WaCheckboxGroupDirective implements OnInit, OnChanges {
  // Core input attributes
  @Input() label?: string;
  @Input() hint?: string;
  @Input() orientation?: 'horizontal' | 'vertical' | string;
  @Input() size?: SizeToken | string;
  @Input() required?: boolean | string;
  @Input() withLabel?: boolean | string;
  @Input() withHint?: boolean | string;

  // Style inputs
  @Input() styleGap?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    this.applyInputs();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs(): void {
    // Set string attributes
    this.setAttr('label', this.label);
    this.setAttr('hint', this.hint);
    this.setAttr('orientation', this.orientation);
    this.setAttr('size', this.size);

    // Set boolean attributes (only if true)
    this.setBooleanAttr('required', this.required);
    this.setBooleanAttr('with-label', this.withLabel);
    this.setBooleanAttr('with-hint', this.withHint);

    // Set style attributes
    this.setCssVar('--gap', this.styleGap);
  }

  /**
   * Exposes the native element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Sets an attribute on the native element if the value is not null or undefined
   */
  private setAttr(name: string, value: string | null | undefined): void {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  /**
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean | string | null | undefined): void {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  /**
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
  private setCssVar(name: string, value: string | null | undefined): void {
    if (value != null) {
      this.el.nativeElement.style.setProperty(name, value);
    }
  }
}

