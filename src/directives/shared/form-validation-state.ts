import { ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Syncs Angular form control validity state to the Web Awesome host element.
 *
 * When the Angular control is dirty (or touched) AND invalid, sets the
 * `data-user-invalid` attribute on the native element. Web Awesome form
 * components use this attribute to render their danger-colored border
 * (matching the `:state(user-invalid)` internal styling).
 *
 * When the control is dirty (or touched) AND valid, sets `data-user-valid`.
 *
 * Call this from `ngDoCheck()` so it runs every change-detection cycle.
 */
export function syncFormValidationState(
  el: ElementRef,
  renderer: Renderer2,
  ngControl: NgControl | null | undefined
): void {
  if (!ngControl || !ngControl.control) {
    return;
  }

  const control = ngControl.control;
  const nativeEl = el.nativeElement as HTMLElement;
  const interacted = control.dirty || control.touched;

  if (interacted && control.invalid) {
    renderer.setAttribute(nativeEl, 'data-user-invalid', '');
    renderer.removeAttribute(nativeEl, 'data-user-valid');
  } else if (interacted && control.valid) {
    renderer.setAttribute(nativeEl, 'data-user-valid', '');
    renderer.removeAttribute(nativeEl, 'data-user-invalid');
  } else {
    renderer.removeAttribute(nativeEl, 'data-user-invalid');
    renderer.removeAttribute(nativeEl, 'data-user-valid');
  }
}

