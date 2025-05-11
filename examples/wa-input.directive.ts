import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: 'wa-input',
  standalone: true
})
export class WaInputDirective {
  @Input() value: string | number = '';
  @Input() label: string = '';
  @Input() hint: string = '';
  @Input() placeholder: string = '';
  @Input() size: 'medium' | 'large' = 'medium';
  @Input() type: string = 'text';

  // Private backing field for clearable
  private _clearable: boolean = false;

  // Getter and setter to handle both string and boolean
  @Input()
  get clearable(): boolean {
    return this._clearable;
  }
  set clearable(value: boolean | string) {
    this._clearable = value === '' || value === 'true' || value === true;
  }

  // Password toggle handling
  private _passwordToggle: boolean = false;
  @Input()
  get passwordToggle(): boolean {
    return this._passwordToggle;
  }
  set passwordToggle(value: boolean | string) {
    this._passwordToggle = value === '' || value === 'true' || value === true;
  }


  @Output() inputChange = new EventEmitter<any>();

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    this.inputChange.emit(event);
  }

  @HostListener('keyup.enter')
  onEnterPress() {
    // Handle enter key press if needed
  }

  // Method to clear input if clearable is true
  clear() {
    if (this.clearable) {
      this.value = '';
      this.inputChange.emit({ target: { value: '' } });
    }
  }

  // Method to toggle password visibility if passwordToggle is true
  togglePassword() {
    if (this.passwordToggle) {
      const inputEl = this.el.nativeElement;
      inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    }
  }
}
