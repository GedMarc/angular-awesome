import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, Renderer2, inject } from '@angular/core';

/**
 * WaOptionDirective
 *
 * Angular wrapper for the <wa-option> Web Component.
 * Options define the selectable items within various form controls such as select and combobox.
 *
 * Features:
 * - Binds all supported option attributes as @Input() properties
 * - Enables Angular-style class and style bindings
 * - Allows slot projection for label, start, and end content
 */
@Directive({
  selector: 'wa-option',
  standalone: true
})
export class WaOptionDirective implements OnInit, OnChanges {
  @Input() value?: string;
  @Input() disabled?: boolean | string;
  @Input() selected?: boolean | string;
  @Input() label?: string;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    this.applyInputs();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs() {
    this.setAttr('value', this.value);
    this.setAttr('label', this.label);
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('selected', this.selected);
  }

  private setAttr(name: string, value: string | null | undefined) {
    if (value != null && value !== '') {
      this.renderer.setAttribute(this.el.nativeElement, name, String(value));
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }
}

