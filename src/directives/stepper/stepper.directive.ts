import { Directive, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';

export interface WaStepChangeDetail {
  name: string;
  previousName: string;
  step: HTMLElement;
  previousStep: HTMLElement;
}

/** Navigation and change events for Web Awesome's stepper. */
@Directive({
  selector: 'wa-stepper',
  standalone: true,
  host: {
    '[attr.active]': 'active ?? null',
    '[attr.orientation]': 'orientation ?? null',
    '[attr.linear]': 'linear ? "" : null',
    '[attr.clickable]': 'clickable ? "" : null',
    '[attr.label]': 'label ?? null',
    '(wa-before-step-change)': 'onBeforeStepChange($event)',
    '(wa-step-change)': 'onStepChange($event)'
  }
})
export class WaStepperDirective {
  @Input() active?: string;
  @Input() orientation?: 'horizontal' | 'vertical' | 'auto';
  @Input() linear = false;
  @Input() clickable = false;
  @Input() label?: string;

  @Output() waBeforeStepChange = new EventEmitter<CustomEvent<WaStepChangeDetail>>();
  @Output('wa-before-step-change') waBeforeStepChangeHyphen = this.waBeforeStepChange;
  @Output() waStepChange = new EventEmitter<CustomEvent<WaStepChangeDetail>>();
  @Output('wa-step-change') waStepChangeHyphen = this.waStepChange;
  @Output() activeChange = new EventEmitter<string>();

  private readonly el = inject(ElementRef<HTMLElement>);
  get nativeElement(): HTMLElement { return this.el.nativeElement; }

  onBeforeStepChange(event: CustomEvent<WaStepChangeDetail>): void {
    if (event.target === this.el.nativeElement) this.waBeforeStepChange.emit(event);
  }

  onStepChange(event: CustomEvent<WaStepChangeDetail>): void {
    if (event.target !== this.el.nativeElement) return;
    this.waStepChange.emit(event);
    const name = event.detail?.name ?? this.el.nativeElement.getAttribute('active');
    if (name != null) this.activeChange.emit(name);
  }

  goTo(name: string): void {
    (this.el.nativeElement as HTMLElement & { goTo?: (name: string) => void }).goTo?.(name);
  }
  next(): void {
    (this.el.nativeElement as HTMLElement & { next?: () => void }).next?.();
  }
  previous(): void {
    (this.el.nativeElement as HTMLElement & { previous?: () => void }).previous?.();
  }
}
