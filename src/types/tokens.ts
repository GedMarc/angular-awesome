// Shared tokens and typed unions for Angular wrappers, aligned with React/Web Components

// Core variants supported across components
export type VariantToken = 'brand' | 'neutral' | 'success' | 'warning' | 'danger' | 'inherit';

// Common control sizes
export type SizeToken = 'small' | 'medium' | 'large' | 'inherit';

// Visual appearance tokens (Web Awesome 3.0.0)
// Note: 'filled-outlined' replaces the former space-delimited 'filled outlined'
export type AppearanceToken = 'accent' | 'filled' | 'outlined' | 'plain' | 'filled-outlined';

// Allows 1–3 space-delimited appearance tokens (legacy), but prefer single tokens.
// Keep the template unions for backwards-compat only; normalize at runtime.
export type Appearance =
  | AppearanceToken
  | `${AppearanceToken} ${AppearanceToken}`
  | `${AppearanceToken} ${AppearanceToken} ${AppearanceToken}`;

/**
 * Normalize appearance value to Web Awesome 3.0.0 format.
 * - Maps legacy 'filled outlined' or 'outlined filled' to 'filled-outlined'
 * - Trims whitespace and collapses spaces
 */
export function normalizeAppearance(value: string | null | undefined): string | undefined {
  if (value == null) return undefined;
  const v = String(value).trim().replace(/\s+/g, ' ');
  if (!v) return undefined;
  const lower = v.toLowerCase();
  if (lower === 'filled outlined' || lower === 'outlined filled') {
    return 'filled-outlined';
  }
  return v;
}

// Utility booleans often represented as boolean attributes in web components
export type BooleanLike = boolean | '' | 'true' | 'false' | string;
