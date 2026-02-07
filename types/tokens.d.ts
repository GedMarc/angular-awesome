export type VariantToken = 'brand' | 'neutral' | 'success' | 'warning' | 'danger' | 'inherit';
export type SizeToken = 'small' | 'medium' | 'large' | 'inherit';
export type AppearanceToken = 'accent' | 'filled' | 'outlined' | 'plain' | 'filled-outlined';
export type Appearance = AppearanceToken | `${AppearanceToken} ${AppearanceToken}` | `${AppearanceToken} ${AppearanceToken} ${AppearanceToken}`;
/**
 * Normalize appearance value to Web Awesome 3.0.0 format.
 * - Maps legacy 'filled outlined' or 'outlined filled' to 'filled-outlined'
 * - Trims whitespace and collapses spaces
 */
export declare function normalizeAppearance(value: string | null | undefined): string | undefined;
export type BooleanLike = boolean | '' | 'true' | 'false' | string;
//# sourceMappingURL=tokens.d.ts.map