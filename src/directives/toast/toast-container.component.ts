import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaToastService } from '../../services/toast/toast.service';
import { DEFAULT_TOAST_CONFIG, Toast, ToastPosition } from '../../services/toast/toast.types';
import { WaCalloutDirective } from '../callout/callout.directive';

@Component({
  selector: 'wa-toast-container',
  standalone: true,
  imports: [CommonModule, WaCalloutDirective],
  template: `
    <div class="wa-toast-stack" [attr.data-position]="positionValue()" role="region" aria-live="polite" aria-label="Notifications">
      <ng-container *ngFor="let t of toasts(); trackBy: trackById">
        <wa-callout
          class="wa-toast"
          [variant]="t.variant"
          [appearance]="t.appearance || 'filled'"
          [size]="t.size || 'medium'"
          [attr.role]="'status'"
        >
          <div class="wa-toast__content">
            <div class="wa-toast__text">
              <strong *ngIf="t.title">{{ t.title }}</strong>
              <div class="wa-toast__message">{{ t.message }}</div>
            </div>
            <button *ngIf="t.closable !== false" type="button" class="wa-toast__close" (click)="close(t)">
              ×
            </button>
          </div>
        </wa-callout>
      </ng-container>
    </div>
  `,
  styles: [`
    :host { position: fixed; inset: auto; pointer-events: none; z-index: ${DEFAULT_TOAST_CONFIG.zIndex}; }
    .wa-toast-stack { display: flex; gap: ${DEFAULT_TOAST_CONFIG.gap}px; }
    .wa-toast { pointer-events: auto; }
    .wa-toast__content { display: flex; align-items: start; gap: 12px; }
    .wa-toast__text { display: grid; gap: 4px; }
    .wa-toast__message { line-height: 1.35; }
    .wa-toast__close { background: none; border: 0; font-size: 18px; line-height: 1; cursor: pointer; color: inherit; }

    /* Positioning */
    :host([data-pos="top-right"]) { top: 16px; right: 16px; }
    :host([data-pos="top-left"]) { top: 16px; left: 16px; }
    :host([data-pos="bottom-right"]) { bottom: 16px; right: 16px; }
    :host([data-pos="bottom-left"]) { bottom: 16px; left: 16px; }
    :host([data-pos="top-center"]) { top: 16px; left: 50%; transform: translateX(-50%); }
    :host([data-pos="bottom-center"]) { bottom: 16px; left: 50%; transform: translateX(-50%); }

    /* Stack direction based on position */
    [data-position^="top"] { flex-direction: column; }
    [data-position^="bottom"] { flex-direction: column-reverse; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaToastContainerComponent implements OnInit, OnDestroy {
  private service = inject(WaToastService);

  private positionSig = signal<ToastPosition>(DEFAULT_TOAST_CONFIG.position);
  @Input() set position(value: ToastPosition | undefined) {
    this.positionSig.set(value ?? this.service.config.position);
  }
  positionValue = computed(() => this.positionSig());

  // reflect for CSS positioning
  @HostBinding('attr.data-pos') get posAttr() { return this.positionValue(); }

  toasts = signal<Toast[]>([]);
  private subscription?: any;

  ngOnInit(): void {
    this.toasts.set([]);
    this.subscription = this.service.toasts$.subscribe(list => this.toasts.set(list));
    // initialize position from service config if not provided
    if (!this.positionSig()) {
      this.positionSig.set(this.service.config.position);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe?.();
    }
  }

  close(t: Toast) {
    this.service.close(t.id);
  }

  trackById = (_: number, t: Toast) => t.id;
}
