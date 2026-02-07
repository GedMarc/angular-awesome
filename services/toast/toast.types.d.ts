import { Appearance, SizeToken, VariantToken } from '../../types/tokens';
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
export interface Toast {
    id: string;
    message: string;
    variant?: VariantToken | string;
    appearance?: Appearance | string;
    size?: SizeToken | string;
    closable?: boolean;
    duration?: number;
    title?: string;
    createdAt: number;
}
export interface ToastConfig {
    position?: ToastPosition;
    /** Max visible toasts at the same time. Extra toasts are queued and displayed FIFO. */
    max?: number;
    /** Default duration if not specified per-toast. */
    duration?: number;
    /** Whether newest toasts appear on top of the stack. */
    newestOnTop?: boolean;
    /** Spacing between toasts in pixels. */
    gap?: number;
    /** z-index for the container. */
    zIndex?: number;
}
export declare const DEFAULT_TOAST_CONFIG: Required<ToastConfig>;
//# sourceMappingURL=toast.types.d.ts.map