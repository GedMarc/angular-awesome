import { Directive, ElementRef, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, Output, Renderer2, inject } from '@angular/core';
import { Appearance, normalizeAppearance } from '../../types/tokens';

/**
 * WaAccordionDirective
 *
 * Angular wrapper for the <wa-accordion> Web Awesome component that allows declarative usage,
 * input binding, and integration with Angular templates.
 *
 * Features:
 * - Binds all supported accordion attributes as @Input() properties
 * - Supports mode, iconPlacement, headingLevel, and appearance customization
 * - Emits accordion events (waExpand, waAfterExpand, waCollapse, waAfterCollapse)
 * - Allows slot projection for <wa-accordion-item> children
 * - Provides programmatic control through expandAll() and collapseAll() methods
 */
@Directive({
  selector: 'wa-accordion',
  standalone: true
})
export class WaAccordionDirective implements OnInit, OnChanges {
  // Accordion inputs
  @Input() mode?: 'single' | 'single-collapsible' | 'multiple' | string;
  @Input() iconPlacement?: 'start' | 'end' | string;
  @Input() headingLevel?: string | number;
  @Input() appearance?: Appearance | string;

  // Event outputs
  @Output() waExpand = new EventEmitter<Event>();
  @Output('wa-expand') waExpandHyphen = this.waExpand;
  @Output() waAfterExpand = new EventEmitter<Event>();
  @Output('wa-after-expand') waAfterExpandHyphen = this.waAfterExpand;
  @Output() waCollapse = new EventEmitter<Event>();
  @Output('wa-collapse') waCollapseHyphen = this.waCollapse;
  @Output() waAfterCollapse = new EventEmitter<Event>();
  @Output('wa-after-collapse') waAfterCollapseHyphen = this.waAfterCollapse;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const nativeEl = this.el.nativeElement as HTMLElement;

    this.applyInputs();

    this.renderer.listen(nativeEl, 'wa-expand', (event) => this.waExpand.emit(event));
    this.renderer.listen(nativeEl, 'wa-after-expand', (event) => this.waAfterExpand.emit(event));
    this.renderer.listen(nativeEl, 'wa-collapse', (event) => this.waCollapse.emit(event));
    this.renderer.listen(nativeEl, 'wa-after-collapse', (event) => this.waAfterCollapse.emit(event));
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs() {
    this.setAttr('mode', this.mode);
    this.setAttr('icon-placement', this.iconPlacement);
    this.setAttr('heading-level', this.headingLevel != null ? String(this.headingLevel) : undefined);
    this.setAttr('appearance', normalizeAppearance(this.appearance));
  }

  /**
   * Exposes the native accordion element for direct interaction
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Expands all accordion items. No-op when mode is single or single-collapsible.
   */
  public expandAll(): void {
    if (typeof this.el.nativeElement.expandAll === 'function') {
      this.el.nativeElement.expandAll();
    }
  }

  /**
   * Collapses all accordion items.
   */
  public collapseAll(): void {
    if (typeof this.el.nativeElement.collapseAll === 'function') {
      this.el.nativeElement.collapseAll();
    }
  }

  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }
}

