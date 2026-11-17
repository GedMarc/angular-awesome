import { Renderer2, SimpleChanges } from '@angular/core';

/** Reflect only Angular inputs that changed so native attributes and defaults remain usable. */
export function reflectAttributeInputs(
  renderer: Renderer2,
  element: HTMLElement,
  changes: SimpleChanges,
  inputs: readonly string[]
): void {
  for (const input of inputs) {
    if (!changes[input]) continue;

    const name = input.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
    const value: unknown = changes[input].currentValue;
    if (value == null || value === false) {
      renderer.removeAttribute(element, name);
    } else {
      renderer.setAttribute(element, name, value === true ? '' : String(value));
    }
  }
}
