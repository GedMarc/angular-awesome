import {Input, ElementRef, OnInit, OnChanges, SimpleChanges, inject} from '@angular/core';

/**
 * WaBadgeComponent
 *
 * Angular wrapper for the <wa-badge> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds attributes: variant, appearance, pill, pulse
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for content
 * - Enables font sizing via [style.fontSize]
 * - Supports custom styling via CSS variables
 */
import { Directive,  Renderer2 } from '@angular/core';
import { VariantToken, normalizeAppearance } from '../../types/tokens';

// Badge-specific appearance tokens and combinations (Web Awesome 3.0.0)
// Support hyphenated combined token as well as legacy space-delimited for backwards-compat
// Prefer using '<base>-outlined' going forward (e.g., 'filled-outlined')
type BadgeAppearanceBase = 'accent' | 'filled' | 'tinted' | 'outlined' | 'text' | 'plain';
export type BadgeAppearance =
  | BadgeAppearanceBase
  | `${BadgeAppearanceBase} outlined` // legacy form
  | `${BadgeAppearanceBase}-outlined`; // new form

@Directive({
  selector: 'wa-badge',
  standalone: true
})
export class WaBadgeDirective implements OnInit, OnChanges {
  @Input() variant: VariantToken = 'inherit';
  // Allowed appearances derived from Java enum: lowercased, underscores replaced with spaces
  @Input() appearance: BadgeAppearance = 'accent';
  @Input() pill?: boolean | string | null;
  @Input() pulse?: boolean | string | null;
  @Input() fontSize?: string;

  @Input() backgroundColor?: string;
  @Input() borderColor?: string;
  @Input() textColor?: string;
  @Input() pulseColor?: string;

  el = inject(ElementRef)
  renderer = inject(Renderer2)


  ngOnInit() {
    this.applyInputs();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs(): void {
    const nativeEl = this.el.nativeElement as HTMLElement;

    this.setAttr('variant', this.variant);
    this.setAttr('appearance', normalizeAppearance(this.appearance as any));
    this.setBoolAttr('pill', this.pill);
    this.setBoolAttr('pulse', this.pulse);

    // Styles
    this.setStyleValue('fontSize', this.fontSize);
    this.setCssVar('--background-color', this.backgroundColor);
    this.setCssVar('--border-color', this.borderColor);
    this.setCssVar('--text-color', this.textColor);
    this.setCssVar('--pulse-color', this.pulseColor);
  }

  private setAttr(name: string, value: string | null | undefined) {
    const nativeEl = this.el.nativeElement as HTMLElement;
    if (value != null) {
      this.renderer.setAttribute(nativeEl, name, String(value));
    } else {
      this.renderer.removeAttribute(nativeEl, name);
    }
  }

  private setBoolAttr(name: string, value: boolean | string | null | undefined) {
    const nativeEl = this.el.nativeElement as HTMLElement;
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(nativeEl, name, '');
    } else {
      this.renderer.removeAttribute(nativeEl, name);
    }
  }

  private setStyleValue(styleProp: 'fontSize', value?: string) {
    const nativeEl = this.el.nativeElement as HTMLElement;
    if (value != null) {
      (nativeEl.style as any)[styleProp] = value;
    } else {
      (nativeEl.style as any)[styleProp] = '';
    }
  }

  private setCssVar(varName: string, value?: string) {
    const nativeEl = this.el.nativeElement as HTMLElement;
    if (value != null) {
      nativeEl.style.setProperty(varName, value);
    } else {
      nativeEl.style.removeProperty(varName);
    }
  }
}

