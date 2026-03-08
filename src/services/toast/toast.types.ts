/**
 * Toast placement values matching the official <wa-toast> component.
 * Uses start/end instead of left/right for RTL support.
 */
export type ToastPlacement =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';

/**
 * @deprecated Use ToastPlacement instead. Kept for backwards compatibility.
 */
export type ToastPosition = ToastPlacement;

/**
 * Represents a programmatically managed toast notification.
 * Aligned with the official <wa-toast-item> web component properties.
 */
export interface Toast {
  id: string;
  message: string;
  /** The toast item's variant. */
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral' | string;
  /** The toast item's size. */
  size?: 'small' | 'medium' | 'large' | string;
  /**
   * The length of time in milliseconds before the toast item is automatically dismissed.
   * Set to 0 to keep the toast item open until the user dismisses it.
   */
  duration?: number;
  /** Optional title displayed in the toast. */
  title?: string;
  /** Timestamp for ordering. */
  createdAt: number;
}

/**
 * Configuration for the toast service, aligned with the official <wa-toast> component.
 */
export interface ToastConfig {
  /** The placement of the toast stack. Uses official <wa-toast> placement values. */
  placement?: ToastPlacement;
  /** Max visible toasts at the same time. Extra toasts are queued and displayed FIFO. */
  max?: number;
  /** Default duration in ms if not specified per-toast. Set to 0 for sticky toasts. */
  duration?: number;
  /** Whether newest toasts appear on top of the stack. */
  newestOnTop?: boolean;
}

export const DEFAULT_TOAST_CONFIG: Required<ToastConfig> = {
  placement: 'top-end',
  max: 5,
  duration: 5000,
  newestOnTop: true
};
