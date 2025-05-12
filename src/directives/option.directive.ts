import { Directive, ElementRef, HostListener, input, output } from '@angular/core';

@Directive({
  selector: 'wa-option',
  standalone: true
})
export class WaOptionDirective {
  // Option properties
  value = input<string>('');

  // Boolean properties
  disabled = input<boolean | string>(false);

  selected = input<boolean | string>(false);

  // Output events
  selectEvent = output<any>();

  // Helper methods for boolean attributes
  isDisabled(): boolean {
    const disabledValue = this.disabled();
    return disabledValue === true ||
           disabledValue === '' ||
           disabledValue === 'true';
  }

  isSelected(): boolean {
    const selectedValue = this.selected();
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
