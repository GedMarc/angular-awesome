import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: 'wa-tree',
  exportAs: 'waTree',
  standalone: true
})
export class WaTreeDirective implements OnChanges {
  // Inputs
  @Input() selection: 'single' | 'multiple' | 'leaf' | null = null;

  // Outputs
  @Output() selectionChange = new EventEmitter<any>();

  // Styling inputs
  @Input() indentSize?: string;
  @Input() indentGuideColor?: string;
  @Input() indentGuideOffset?: string;
  @Input() indentGuideStyle?: string;
  @Input() indentGuideWidth?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnChanges() {
    const tree = this.el.nativeElement;

    // Set selection mode attribute
    if (this.selection) {
      this.renderer.setAttribute(tree, 'selection', this.selection);
    } else {
      this.renderer.removeAttribute(tree, 'selection');
    }

    // Apply custom CSS properties for styling
    this.setCssVar('--indent-size', this.indentSize);
    this.setCssVar('--indent-guide-color', this.indentGuideColor);
    this.setCssVar('--indent-guide-offset', this.indentGuideOffset);
    this.setCssVar('--indent-guide-style', this.indentGuideStyle);
    this.setCssVar('--indent-guide-width', this.indentGuideWidth);
  }

  /**
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
    }
  }
}
