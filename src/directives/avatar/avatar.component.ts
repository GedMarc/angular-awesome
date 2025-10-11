import {Input, ElementRef, OnInit, OnChanges, SimpleChanges, inject} from '@angular/core';

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
export class WaAvatarDirective implements OnInit, OnChanges {
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
    // Initialize all attributes and styles
    this.syncAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reflect only the changed inputs to the underlying element
    const el = this.el.nativeElement as HTMLElement;

    if ('image' in changes) this.setOrRemoveAttr('image', this.image);
    if ('label' in changes) this.setOrRemoveAttr('label', this.label);
    if ('initials' in changes) this.setOrRemoveAttr('initials', this.initials);
    if ('shape' in changes) this.setOrRemoveAttr('shape', this.shape);
    if ('loading' in changes) this.setOrRemoveAttr('loading', this.loading);

    if ('fontSize' in changes) el.style.fontSize = this.fontSize ?? '';
    if ('size' in changes) this.setOrRemoveCssVar('--size', this.size);
    if ('backgroundColor' in changes) this.setOrRemoveCssVar('--background-color', this.backgroundColor);
    if ('textColor' in changes) this.setOrRemoveCssVar('--text-color', this.textColor);
  }

  private syncAll() {
    const el = this.el.nativeElement as HTMLElement;
    this.setOrRemoveAttr('image', this.image);
    this.setOrRemoveAttr('label', this.label);
    this.setOrRemoveAttr('initials', this.initials);
    this.setOrRemoveAttr('shape', this.shape);
    this.setOrRemoveAttr('loading', this.loading);

    el.style.fontSize = this.fontSize ?? '';
    this.setOrRemoveCssVar('--size', this.size);
    this.setOrRemoveCssVar('--background-color', this.backgroundColor);
    this.setOrRemoveCssVar('--text-color', this.textColor);
  }

  private setOrRemoveAttr(name: string, value: string | null | undefined) {
    const el = this.el.nativeElement as HTMLElement;
    if (value === undefined || value === null || value === '') {
      this.renderer.removeAttribute(el, name);
    } else {
      this.renderer.setAttribute(el, name, String(value));
    }
  }

  private setOrRemoveCssVar(name: string, value: string | null | undefined) {
    const el = this.el.nativeElement as HTMLElement;
    if (value === undefined || value === null || value === '') {
      el.style.removeProperty(name);
    } else {
      el.style.setProperty(name, String(value));
    }
  }
}
