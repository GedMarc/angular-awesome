import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { Appearance, VariantToken, SizeToken, normalizeAppearance } from '../../types/tokens';

@Directive({
  // Allow using <wa-tag> directly without requiring ngModel
  selector: 'wa-tag',
  exportAs: 'waTag',
  standalone: true
})
export class WaTagDirective {
  constructor(private el: ElementRef<HTMLElement>) {}

  // Inputs
  @Input() variant: VariantToken = 'inherit';
  @Input() appearance: Appearance = 'filled-outlined';
  @Input() size: SizeToken = 'inherit';
  @Input() pill = false;
  @Input() withRemove = false;

  // Outputs
  @Output() waRemove = new EventEmitter<Event>();

  @HostListener('wa-remove', ['$event'])
  onRemove(event: Event) {
    this.waRemove.emit(event);
  }

  ngOnChanges() {
    const tag = this.el.nativeElement;
    tag.setAttribute('variant', this.variant);
    tag.setAttribute('appearance', normalizeAppearance(this.appearance) as string);
    tag.setAttribute('size', this.size);
    this.setBooleanAttribute(tag, 'pill', this.pill);
    this.setBooleanAttribute(tag, 'with-remove', this.withRemove);
  }

  private setBooleanAttribute(tag: HTMLElement, name: string, value: boolean) {
    if (value) {
      tag.setAttribute(name, '');
    } else {
      tag.removeAttribute(name);
    }
  }
}
