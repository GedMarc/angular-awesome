The `[waText]` attribute directive provides a typed, ergonomic way to apply Web Awesome Text utility classes as options for setting content.

- Base behavior: adds the corresponding Web Awesome text utility classes to the host element.
- Accepts short tokens (e.g., `s`, `xl`) or full class tokens (e.g., `wa-body-s`).
- Groups: `Body`, `Heading`, `Caption`, and `Longform` each accept a size token and map to `wa-body-*`, `wa-heading-*`, `wa-caption-*`, and `wa-longform-*` respectively.
- Single-purpose utilities are supported: `waFontSize`, `waFontWeight`, `waColorText`.
- Also supports `waLink` and `waLink="plain"`, `waListPlain`, `waFormControlText`, and `waTextTruncate`.

Selectors
- `[waText]` (attribute selector)

Inputs
- `waBody?: '2xs'|'xs'|'s'|'m'|'l'|'xl'|'2xl'|'3xl'|'4xl| 'wa-body' | 'wa-body-*'`
- `waHeading?: '2xs'|'xs'|'s'|'m'|'l'|'xl'|'2xl'|'3xl'|'4xl| 'wa-heading' | 'wa-heading-*'`
- `waCaption?: '2xs'|'xs'|'s'|'m'|'l'|'xl'|'2xl'|'3xl'|'4xl| 'wa-caption' | 'wa-caption-*'`
- `waLongform?: '2xs'|'xs'|'s'|'m'|'l'|'xl'|'2xl'|'3xl'|'4xl| 'wa-longform' | 'wa-longform-*'`
- `waLink?: boolean | 'link' | 'plain' | 'wa-link' | 'wa-link-plain'`
- `waListPlain?: boolean`
- `waFormControlText?: 'label' | 'value' | 'placeholder' | 'hint'`
- `waFontSize?: '2xs'|'xs'|'s'|'m'|'l'|'xl'|'2xl'|'3xl'|'4xl | 'wa-font-size-*'`
- `waFontWeight?: 'light'|'normal'|'semibold'|'bold'`
- `waColorText?: 'quiet'|'normal'|'link'`
- `waTextTruncate?: boolean`

Notes
- When multiple inputs are specified, all resulting utility classes are applied. Within each group input, only one resulting class will be applied.
- Values are tolerant: both short tokens and full utility class names are supported.
- `waColorText` also accepts legacy tokens like `wa-color-quiet` and normalizes to `wa-color-text-quiet`.
