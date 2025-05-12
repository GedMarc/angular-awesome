import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: 'wa-option',
  standalone: true
})
export class WaOptionDirective {
  // Option properties
  @Input() value: string = '';

  // Boolean properties
  @Input() disabled: boolean | string = false;

  @Input() selected: boolean | string = false;

  // Output events
  @Output() selectEvent = new EventEmitter<any>();

  // Helper methods for boolean attributes
  isDisabled(): boolean {
    const disabledValue = this.disabled;
    return disabledValue === true ||
           disabledValue === '' ||
           disabledValue === 'true';
  }

  isSelected(): boolean {
    const selectedValue = this.selected;
    return selectedValue === true ||
           selectedValue === '' ||
           selectedValue === 'true';
  }

  // Get the text content of the option (label)
  get label(): string {
    return this.el.nativeElement.textContent.trim();
  }

  // Event listeners
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.isDisabled()) {
      this.selectEvent.emit({
        value: this.value,
        label: this.label
      });

      // Prevent event bubbling to parent elements
      event.stopPropagation();
    }
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.isDisabled()) {
      event.preventDefault();
      this.selectEvent.emit({
        value: this.value,
        label: this.label
      });
    }
  }

  constructor(private el: ElementRef) {}
}
