# Stepper (`wa-stepper`)

`wa-stepper` displays progress through named `<wa-step>` children. Import `WaStepperDirective` and `WaStepDirective` from `angular-awesome`. The stepper is a navigation display, not a form control.

## Inputs

| Input | Type | Purpose |
| --- | --- | --- |
| `active` | `string` | Name of the current step; defaults to the first step. |
| `orientation` | `horizontal`, `vertical`, `auto` | Layout direction; `auto` stacks in narrow space. |
| `linear` | `boolean` | Require previous steps to be completed before proceeding. |
| `clickable` | `boolean` | Allow users to select reachable steps directly. |
| `label` | `string` | Accessible label, especially useful with multiple steppers. |

## Events and methods

`waBeforeStepChange` / `wa-before-step-change` emits the cancelable native event before navigation. Calling `preventDefault()` stops the change. `waStepChange` / `wa-step-change` emits after navigation. Both expose `detail.name`, `previousName`, `step`, and `previousStep`. `activeChange` emits the new name for `[(active)]`. The methods `goTo(name)`, `next()`, and `previous()` delegate to the web component.

## Slots and styling

The default slot holds `<wa-step>` children. CSS custom properties: `--gap`, `--marker-size`, `--connector-color`, `--connector-color-active`, `--connector-width`, `--connector-gap`. CSS parts: `stepper`, `steps`, `summary`. Custom states: `completed`, `loading`, `stacked`.

For server rendering, set `active` on both the stepper and the matching step, because the server cannot inspect the stepper's children.
