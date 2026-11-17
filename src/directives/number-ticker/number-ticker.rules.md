# Number Ticker

Animate numbers for dashboard statistics and other changing values.

## Overview

Import `WaNumberTickerDirective` from `angular-awesome`. The ticker starts when visible unless `eager` is set. Subsequent value changes start from the currently displayed number.

## API Reference

| Input | Purpose |
| --- | --- |
| `value`, `startValue` | Target number and first-run or restart value. |
| `duration`, `delay`, `easing` | Maximum count duration, initial wait in milliseconds, and CSS easing. Set duration to zero for an immediate update. |
| `eager` | Start without waiting for visibility. |
| `type`, `currency`, `currencyDisplay` | Intl number format and currency settings. |
| `withoutGrouping` | Hide grouping separators. |
| `minimumIntegerDigits`, `minimumFractionDigits`, `maximumFractionDigits`, `minimumSignificantDigits`, `maximumSignificantDigits` | Intl precision options. |
| `valueFormatter` | Optional callback that overrides built-in formatting. |

Call `restart()` to count from `startValue` again. Use `waFinish` or `wa-finish` to handle completion.

## Styling

The ticker exposes the `counting` custom state during animation.

[Web Awesome number ticker](https://webawesome.com/docs/components/number-ticker/)
