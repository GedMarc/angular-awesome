import { Directive, ElementRef, HostListener, input, output } from '@angular/core';

@Directive({
  selector: 'wa-option',
  standalone: true
})
export class WaOptionDirective {
  // Option properties
  value = input<string>('');

  // Boolean properties
  disabled = input<boolean>(false);
  disabledAttr = input<string | boolean>('', { alias: 'disabled' });

  selected = input<boolean>(false);
  selectedAttr = input<string | boolean>('', { alias: 'selected' });

  // Output events
  selectEvent = output<any>();

  // Helper methods for boolean attributes
  isDisabled(): boolean {
    return this.disabled() ||
           this.disabledAttr() === '' ||
           this.disabledAttr() === 'true';
  }

  isSelected(): boolean {
    return this.selected() ||
           this.selectedAttr() === '' ||
           this.selectedAttr() === 'true';
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
        value: this.value(),
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
        value: this.value(),
        label: this.label
      });
    }
  }

  constructor(private el: ElementRef) {}
}
