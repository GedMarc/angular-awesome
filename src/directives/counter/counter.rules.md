# Counter

Count down to a date or duration, or show elapsed time from a starting date.

## Overview

Import `WaCounterDirective` from `angular-awesome`. Bind an ISO 8601 string or `Date` to `date`, or supply a countdown duration in milliseconds.

## API Reference

| Input | Purpose |
| --- | --- |
| `date` | Target date for a countdown or starting date for elapsed time. |
| `duration` | Countdown duration when no date is set. |
| `direction` | Use `down` for countdowns or `up` for elapsed time. |
| `label` | Accessible description of the counter. |
| `largestUnit`, `smallestUnit` | Visible unit range, from `years` through `seconds`. Defaults to days through seconds. |
| `format` | Unit label format. Use `long`, `short`, or `narrow`. |
| `withoutLabels`, `delimiter` | Hide unit labels and optionally separate values with text. |
| `paused` | Pause at the displayed time. |
| `valueFormatter` | Optional callback receiving the number and its `CounterUnit`. |

Use the `years`, `months`, `days`, `hours`, `minutes`, and `seconds` slots for custom labels. Use the `finished` slot for content displayed at zero. The `waFinish` / `wa-finish` output fires when a running countdown reaches zero.

## Styling

Use the `unit`, `value`, `label`, and `delimiter` parts to style the counter. The host gains the `finished` custom state when a countdown reaches zero.

[Web Awesome counter](https://webawesome.com/docs/components/counter/)
