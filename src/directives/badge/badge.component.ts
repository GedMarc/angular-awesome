import {Input, ElementRef, OnInit, inject} from '@angular/core';

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

@Directive({
  selector: 'wa-badge',
  standalone: true
})
export class WaBadgeDirective implements OnInit {
  @Input() variant: 'brand' | 'neutral' | 'success' | 'warning' | 'danger' | 'inherit' = 'inherit';
  @Input() appearance: 'accent' | 'filled' | 'outlined' = 'accent';
  @Input() pill?: boolean | null;
  @Input() pulse?: boolean | null;
  @Input() fontSize?: string;

  @Input() backgroundColor?: string;
  @Input() borderColor?: string;
  @Input() textColor?: string;

  el = inject(ElementRef)
  renderer = inject(Renderer2)


  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    this.setAttr('variant', this.variant);
    this.setAttr('appearance', this.appearance);
    this.setBoolAttr('pill', this.pill);
    this.setBoolAttr('pulse', this.pulse);

    if (this.fontSize) nativeEl.style.fontSize = this.fontSize;
    if (this.backgroundColor) nativeEl.style.setProperty('--background-color', this.backgroundColor);
    if (this.borderColor) nativeEl.style.setProperty('--border-color', this.borderColor);
    if (this.textColor) nativeEl.style.setProperty('--text-color', this.textColor);
  }

  private setAttr(name: string, value: string | null) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    }
  }

  private setBoolAttr(name: string, value: boolean | null | undefined) {
    if (value) {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    }
  }
}

