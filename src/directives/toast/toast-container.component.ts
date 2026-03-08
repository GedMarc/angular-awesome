import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaToastService } from '../../services/toast/toast.service';
import { DEFAULT_TOAST_CONFIG, Toast, ToastPlacement } from '../../services/toast/toast.types';
import { WaToastDirective } from './toast.directive';
import { WaToastItemDirective } from './toast-item.directive';

/**
 * WaToastContainerComponent
 *
 * Renders the on-screen stack of toasts using the official <wa-toast> and <wa-toast-item>
 * web components. Place a single instance near the application root.
 *
 * The container subscribes to WaToastService.toasts$ and renders <wa-toast-item> elements
 * for each visible toast notification.
 */
@Component({
  selector: 'wa-toast-container',
  standalone: true,
  imports: [CommonModule, WaToastDirective, WaToastItemDirective],
  template: `
    <wa-toast [placement]="placementValue()" role="region" aria-live="polite" aria-label="Notifications">
      <ng-container *ngFor="let t of toasts(); trackBy: trackById">
        <wa-toast-item
          [variant]="t.variant || 'neutral'"
          [size]="t.size || 'medium'"
          [duration]="0"
          [attr.data-toast-id]="t.id"
          (wa-after-hide)="onToastHidden(t)"
        >
          <strong *ngIf="t.title">{{ t.title }}</strong>
          {{ t.message }}
        </wa-toast-item>
      </ng-container>
    </wa-toast>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaToastContainerComponent implements OnInit, OnDestroy {
  private service = inject(WaToastService);

  private placementSig = signal<ToastPlacement>(DEFAULT_TOAST_CONFIG.placement);

  @Input() set placement(value: ToastPlacement | undefined) {
    this.placementSig.set(value ?? this.service.config.placement);
  }
  placementValue = this.placementSig;

  toasts = signal<Toast[]>([]);
  private subscription?: any;

  ngOnInit(): void {
    this.toasts.set([]);
    this.subscription = this.service.toasts$.subscribe(list => this.toasts.set(list));
    // initialize placement from service config if not provided
    if (!this.placementSig()) {
      this.placementSig.set(this.service.config.placement);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe?.();
    }
  }

  onToastHidden(t: Toast) {
    this.service.close(t.id);
  }

  close(t: Toast) {
    this.service.close(t.id);
  }

  trackById = (_: number, t: Toast) => t.id;
}
