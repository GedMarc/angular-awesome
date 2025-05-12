# Angular Awesome Implementation Rules

## Angular 19 Compatibility

This project is built for Angular 19 and must use the latest Angular 19 syntax and features:

1. **Use input() instead of @Input()**: Use the new input() function instead of the @Input() decorator.
   ```typescript
   // Old way
   @Input() value: string = '';

   // New way
   value = input<string>('');
   ```

2. **Use model() for two-way binding**: Use the model() function for two-way bindable properties.
   ```typescript
   // Two-way bindable value
   value = model<string>('');
   ```

3. **Use output() instead of @Output()**: Use the new output() function instead of the @Output() decorator.
   ```typescript
   // Old way
   @Output() valueChange = new EventEmitter<any>();

   // New way
   valueChange = output<any>();
   ```

4. **Use signals for reactive state**: Access input values using function call syntax and subscribe to value changes.
   ```typescript
   // Access input value
   const type = this.type();

   // Subscribe to value changes
   this.value.subscribe((value) => {
     // Handle value change
   });
   ```

5. **Use .apply() for model inputs**: When updating model inputs, use the `.apply()` method instead of `.set()`.
   ```typescript
   // Incorrect
   this.value.set(newValue);

   // Correct
   this.value.apply(newValue);
   ```

## Data Binding and Angular Integration

The most important rule for this project is to ensure proper data binding between Angular and the web awesome framework. The web awesome framework handles the core functionality, but the Angular wrapper must handle the Angular integration, including two-way data binding and form validation.

### What to Avoid:

1. **No Formatting Logic**: Do not add logic that formats or transforms the displayed values. The web awesome framework handles all display formatting.

2. **No Business Logic**: Do not add business logic or validation rules that should be handled by the web awesome framework.

### What to Do:

1. **Define Inputs and Outputs**: Define inputs and outputs that match the web awesome component's API.

2. **Implement Two-Way Binding**: Ensure all directives support two-way data binding using Angular's model() API.

3. **Support ngModel**: Make directives compatible with ngModel for use in Angular forms.

4. **Handle Events**: Add necessary event handlers to ensure data flows correctly between Angular and web awesome components.

5. **Support Validation**: Ensure directives properly support Angular form validation.

## Handling Standalone Attributes

When implementing directives that need to support standalone attributes (attributes without values), follow these guidelines:

### 1. Default Values for Standalone Attributes

Some attributes should have specific default values when used as standalone attributes:

- **autocapitalize**: When used as a standalone attribute, autocapitalize should default to 'words'.
  ```typescript
  effect(() => {
    const autocapitalize = this.autocapitalize();
    if (autocapitalize === '') {
      // Default to 'words' when used as a standalone attribute
      inputEl.autocapitalize = 'words';
    } else if (autocapitalize !== undefined) {
      inputEl.autocapitalize = autocapitalize;
    }
  });
  ```

### 2. Use Two or Three Inputs for Each Attribute

For non-hyphenated attributes (e.g., "clearable"):

```typescript
// Regular input for property binding
attributeName = input<boolean | string>(false);
```

For hyphenated attributes (e.g., "password-toggle"):

```typescript
// Regular input for property binding
attributeName = input<boolean | string>(false);
// Separate input for the kebab-case standalone attribute
attributeNameAttr = input<string | boolean>('', { alias: 'attribute-name' });

```

### 2. Create a Helper Method

Create a helper method to determine if the attribute is enabled, checking all possible inputs:

For non-hyphenated attributes:

```typescript
isAttributeNameEnabled(): boolean {
  return this.attributeName() || 
         this.attributeNameAttr() === '' || 
         this.attributeNameAttr() === 'true';
}
```

For hyphenated attributes:

```typescript
isAttributeNameEnabled(): boolean {
  return this.attributeName() || 
         this.attributeNameAttr() === '' || 
         this.attributeNameAttr() === 'true';
}
```

### 3. Use the Helper Method in Templates and Tests

When checking if the attribute is enabled, use the helper method instead of directly accessing the inputs:

```typescript
// In tests
expect(directive.isAttributeNameEnabled()).toBe(true);

// In templates
<div *ngIf="isAttributeNameEnabled()">...</div>
```

## Examples

### Password Toggle (Hyphenated Attribute)

```typescript
// Regular input for property binding
passwordToggle = input<any>(false);

// Separate input for the kebab-case standalone attribute
passwordToggleAttr = input<string | boolean>('', { alias: 'password-toggle' });

// Separate input for the camelCase standalone attribute
passwordToggleAttrCamel = input<string | boolean>('', { alias: 'passwordToggle' });

// Helper method to determine if password toggle is enabled
isPasswordToggleEnabled(): boolean {
  return this.passwordToggle() || 
         this.passwordToggleAttr() === '' || 
         this.passwordToggleAttr() === 'true' ||
         this.passwordToggleAttrCamel() === '' || 
         this.passwordToggleAttrCamel() === 'true';
}
```

### Clearable (Non-Hyphenated Attribute)

```typescript
// Regular input for property binding
clearable = input<any>(false);

// Separate input for the standalone attribute
clearableAttr = input<string | boolean>('', { alias: 'clearable' });

// Helper method to determine if clearable is enabled
isClearableEnabled(): boolean {
  return this.clearable() || 
         this.clearableAttr() === '' || 
         this.clearableAttr() === 'true';
}
```

## Testing

When testing directives with standalone attributes, create tests for all possible syntax variations:

1. Property binding: `[attribute]="value"`
2. Standalone attribute: `attribute`
3. Attribute with value: `attribute="true"` and `attribute="false"`
4. CamelCase attribute: `attributeName="true"` and `attributeName="false"`
5. Property binding with camelCase: `[attributeName]="value"`

Use the helper method in assertions:

```typescript
expect(directive.isAttributeNameEnabled()).toBe(true);
```
