import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Directive({
  selector: 'wa-tag[ngModel]',
  exportAs: 'waTag',
  standalone: true
})
export class WaTagDirective {
  constructor(private el: ElementRef<HTMLElement>) {}

  // Inputs
  @Input() variant: 'brand' | 'neutral' | 'success' | 'warning' | 'danger' | 'inherit' = 'inherit';
  @Input() appearance: 'accent' | 'outlined accent' | 'filled' | 'outlined' | 'outlined filled' = 'outlined filled';
  @Input() size: 'small' | 'medium' | 'large' | 'inherit' = 'inherit';
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
    tag.setAttribute('appearance', this.appearance);
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
