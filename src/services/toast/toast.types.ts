import { Appearance, SizeToken, VariantToken } from '../../types/tokens';

export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';

export interface Toast {
  id: string;
  message: string;
  // visual tokens reuse Callout tokens
  variant?: VariantToken | string;
  appearance?: Appearance | string;
  size?: SizeToken | string;
  // behavior
  closable?: boolean;
  duration?: number; // ms; 0 or negative means sticky
  // optional title or custom content keys for future extensibility
  title?: string;
  // timestamp for ordering
  createdAt: number;
}

export interface ToastConfig {
  position?: ToastPosition;
  /** Max visible toasts at the same time. Extra toasts are queued and displayed FIFO. */
  max?: number;
  /** Default duration if not specified per-toast. */
  duration?: number; // ms
  /** Whether newest toasts appear on top of the stack. */
  newestOnTop?: boolean;
  /** Spacing between toasts in pixels. */
  gap?: number;
  /** z-index for the container. */
  zIndex?: number;
}

export const DEFAULT_TOAST_CONFIG: Required<ToastConfig> = {
  position: 'top-right',
  max: 5,
  duration: 5000,
  newestOnTop: true,
  gap: 12,
  zIndex: 10000
};
