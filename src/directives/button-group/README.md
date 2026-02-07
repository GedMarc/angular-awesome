# WaButtonGroupDirective

An Angular wrapper for the Web Awesome `<wa-button-group>` web component that allows declarative usage, input binding, and integration with Angular templates.

## Features

- Container component for grouping related `<wa-button>` elements
- Supports shared attributes (size, variant, orientation)
- Provides accessibility features via label attribute
- Allows slot projection for buttons and compatible components
- Supports both element ('wa-button-group') and attribute ('[waButtonGroup]') selectors

## Installation

The directive is part of the Angular Awesome library. No additional installation steps are required if you're already using the library.

## Usage

Import the directive in your module or standalone component:

```typescript
import { WaButtonGroupDirective } from 'angular-awesome';

@Component({
  // ...
  standalone: true,
  imports: [WaButtonGroupDirective]
})
export class YourComponent { }
```

Use it in your templates:

```html
<!-- As an element -->
<wa-button-group label="Alignment">
  <wa-button>Left</wa-button>
  <wa-button>Center</wa-button>
  <wa-button>Right</wa-button>
</wa-button-group>

<!-- As an attribute -->
<div waButtonGroup label="Alignment">
  <button waButton>Left</button>
  <button waButton>Center</button>
  <button waButton>Right</button>
</div>
```

## API Reference

### Inputs

| Input       | Type                                    | Default     | Description                                                     |
|-------------|----------------------------------------|-------------|-----------------------------------------------------------------|
| label       | string                                  | undefined   | Required for accessibility. Describes the purpose of the group. |
| size        | 'small' \| 'medium' \| 'large' \| string | undefined   | Inherited by contained buttons unless overridden.               |
| variant     | 'neutral' \| 'brand' \| 'success' \| 'warning' \| 'danger' \| string | undefined | Inherited by contained buttons unless overridden. |
| orientation | 'horizontal' \| 'vertical' \| string    | 'horizontal' | Layout direction of the buttons.                                |

### Content Projection

The directive supports content projection through the default slot:

```html
<wa-button-group label="Actions">
  <!-- Buttons go here -->
  <wa-button>Save</wa-button>
  <wa-button>Cancel</wa-button>
</wa-button-group>
```

## Examples

See [buttongroup.example.md](./buttongroup.example.md) for detailed usage examples.

## Implementation Details

The directive wraps the Web Awesome `<wa-button-group>` web component and provides Angular-specific features:

- Uses both element and attribute selectors for flexibility
- Maps attributes to the underlying web component
- Provides type safety for inputs
- Sets aria-label for accessibility when label is provided
- Exposes the native button group element for direct interaction

## Requirements Fulfilled

This implementation satisfies all requirements specified in the [buttongroup.rules.md](./buttongroup.rules.md) file:

- ✅ Supports both element ('wa-button-group') and attribute ('[waButtonGroup]') selectors
- ✅ Implements all required inputs (label, size, variant, orientation)
- ✅ Ensures accessibility by setting aria-label when label is provided
- ✅ Allows slot projection for buttons and compatible components
- ✅ Supports inheritance of size and variant by contained buttons
