import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  HostListener,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: 'wa-tree-item',
  exportAs: 'waTreeItem',
  standalone: true
})
export class WaTreeItemDirective implements OnChanges {
  // Inputs
  @Input() expanded = false;
  @Input() selected = false;
  @Input() disabled = false;
  @Input() lazy = false;

  // Outputs
  @Output() expand = new EventEmitter<void>();
  @Output() afterExpand = new EventEmitter<void>();
  @Output() collapse = new EventEmitter<void>();
  @Output() afterCollapse = new EventEmitter<void>();
  @Output() lazyChange = new EventEmitter<boolean>();
  @Output() lazyLoad = new EventEmitter<void>();

  // Styling inputs
  @Input() selectionBackgroundColor?: string;
  @Input() selectionIndicatorColor?: string;
  @Input() expandButtonColor?: string;
  @Input() showDuration?: string;
  @Input() hideDuration?: string;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('wa-expand')
  onExpand() {
    if (!this.disabled) {
      this.expand.emit();
    }
  }

  @HostListener('wa-after-expand')
  onAfterExpand() {
    this.afterExpand.emit();
  }

  @HostListener('wa-collapse')
  onCollapse() {
    if (!this.disabled) {
      this.collapse.emit();
    }
  }

  @HostListener('wa-after-collapse')
  onAfterCollapse() {
    this.afterCollapse.emit();
  }

  @HostListener('wa-lazy-load')
  onLazyLoad() {
    if (this.lazy && !this.disabled) {
      this.lazyLoad.emit();
    }
  }

  ngOnChanges() {
    const item = this.el.nativeElement;

    // Set boolean attributes
    this.setBooleanAttr('expanded', this.expanded);
    this.setBooleanAttr('selected', this.selected);
    this.setBooleanAttr('disabled', this.disabled);
    this.setBooleanAttr('lazy', this.lazy);

    // Apply custom CSS properties for styling
    this.setCssVar('--selection-background-color', this.selectionBackgroundColor);
    this.setCssVar('--selection-indicator-color', this.selectionIndicatorColor);
    this.setCssVar('--expand-button-color', this.expandButtonColor);
    this.setCssVar('--show-duration', this.showDuration);
    this.setCssVar('--hide-duration', this.hideDuration);
  }

  /**
   * Sets a CSS custom property on the native element if the value is not null or undefined
   */
  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
    }
  }

  /**
   * Sets a boolean attribute on the native element if the value is truthy
   * For boolean attributes, the presence of the attribute (with empty value) indicates true
   */
  private setBooleanAttr(name: string, value: boolean) {
    if (value) {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }
}
