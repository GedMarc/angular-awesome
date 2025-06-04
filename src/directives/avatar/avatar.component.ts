import {Input, ElementRef, OnInit, inject} from '@angular/core';

/**
 * WaAvatarDirective
 *
 * Angular wrapper for the <wa-avatar> Web Component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds attributes: image, initials, label, shape, loading
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for custom icons
 * - Enables font sizing via [style.fontSize]
 * - Supports custom styling via CSS variables (--size, --background-color, --text-color)
 */
import { Directive, Renderer2 } from '@angular/core';

@Directive({
  selector: 'wa-avatar',
  standalone: true
})
export class WaAvatarDirective implements OnInit {
  @Input() image?: string;
  @Input() label?: string;
  @Input() initials?: string;
  @Input() shape: 'circle' | 'square' | 'rounded' = 'circle';
  @Input() loading: 'lazy' | 'eager' = 'eager';
  @Input() fontSize?: string;
  @Input() size?: string;
  @Input() backgroundColor?: string;
  @Input() textColor?: string;

  el = inject(ElementRef);
  renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    this.setAttr('image', this.image);
    this.setAttr('label', this.label);
    this.setAttr('initials', this.initials);
    this.setAttr('shape', this.shape);
    this.setAttr('loading', this.loading);

    if (this.fontSize) nativeEl.style.fontSize = this.fontSize;
    if (this.size) nativeEl.style.setProperty('--size', this.size);
    if (this.backgroundColor) nativeEl.style.setProperty('--background-color', this.backgroundColor);
    if (this.textColor) nativeEl.style.setProperty('--text-color', this.textColor);
  }

  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    }
  }
}
