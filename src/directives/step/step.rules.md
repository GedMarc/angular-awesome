# Step (`wa-step`)

`wa-step` is one stage inside a `wa-stepper`. Import `WaStepDirective` from `angular-awesome` and place each step inside a stepper.

## Inputs

| Input | Type | Purpose |
| --- | --- | --- |
| `name` | `string` | Identifies the step for navigation and events. |
| `completed`, `loading`, `disabled` | `boolean` | Control the step status. |
| `variant` | `neutral`, `brand`, `success`, `warning`, `danger` | Marker color. |
| `attention` | `none`, `pulse`, `bounce` | Marker animation. |
| `withDescription` | `boolean` | Include a slotted description in server-rendered markup. |
| `active` | `boolean` | Mark this step active for server rendering; the parent controls it after hydration. |

## Slots and styling

The default slot holds the label; `description` holds supporting text; `icon` replaces the marker icon. `--pulse-color` controls the pulse color. CSS parts: `step`, `connector`, `button`, `marker`, `spinner`, `content`, `label`, `status`, `description`. Custom states: `active`, `completed`, `loading`, `disabled`, `locked`, `clickable`.
