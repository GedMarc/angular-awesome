import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
  forwardRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'wa-tab-group',
  template: `<ng-content></ng-content>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WaTabGroupComponent),
      multi: true
    }
  ],
  host: {
    '[attr.active]': 'value',
    '[attr.placement]': 'placement',
    '[attr.activation]': 'activation',
    '[attr.without-scroll-controls]': 'withoutScrollControls ? "" : null',
    '(wa-tab-show)': 'onTabShow($event)',
    '(wa-tab-hide)': 'onTabHide($event)'
  }
})
export class WaTabGroupComponent implements ControlValueAccessor {
  @Input() placement: 'top' | 'bottom' | 'start' | 'end' = 'top';
  @Input() activation: 'auto' | 'manual' = 'auto';
  // Updated naming to match spec: withoutScrollControls reflects to without-scroll-controls
  @Input() withoutScrollControls = false;

  @Output() waTabShow = new EventEmitter<CustomEvent>();
  @Output('wa-tab-show') waTabShowHyphen = this.waTabShow;
  @Output() waTabHide = new EventEmitter<CustomEvent>();
  @Output('wa-tab-hide') waTabHideHyphen = this.waTabHide;
  @Output() valueChange = new EventEmitter<string | null>();

  // Support binding via [active]
  @Input('active')
  set active(val: string | null) {
    this.value = val;
  }
  get active(): string | null {
    return this.value;
  }

  @Input()
  get value(): string | null {
    return this._value;
  }
  set value(val: string | null) {
    this._value = val;
    // Reflect to DOM attribute immediately so the underlying WC reacts
    if (val == null || val === '') {
      this.renderer.removeAttribute(this.el.nativeElement, 'active');
    } else {
      this.renderer.setAttribute(this.el.nativeElement, 'active', val);
    }
    this.onChange(val);
    this.valueChange.emit(val);
    this.onTouched();
  }
  private _value: string | null = null;

  onChange = (value: any) => {};
  onTouched = () => {};

  onTabShow(event: CustomEvent) {
    this.waTabShow.emit(event);
    // Detail often contains the name of the tab being shown
    const tabName = event.detail?.name;
    if (tabName && tabName !== this.value) {
      this.value = tabName;
    }
  }

  onTabHide(event: CustomEvent) {
    this.waTabHide.emit(event);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  writeValue(value: any): void {
    this._value = value;
    this.renderer.setAttribute(this.el.nativeElement, 'active', value ?? '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Custom property setters
  @Input() set indicatorColor(value: string) {
    this.setStyle('--indicator-color', value);
  }

  @Input() set trackColor(value: string) {
    this.setStyle('--track-color', value);
  }

  @Input() set trackWidth(value: string) {
    this.setStyle('--track-width', value);
  }

  private setStyle(prop: string, value: string) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, prop, value);
    }
  }
}
