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

4. **Use signals for reactive state**: Access input values using function call syntax.
   ```typescript
   // Access input value
   const type = this.type();
   ```

5. **Use effect() for tracking signal changes**: Use the effect() function instead of subscribe() to track changes to signals.
   ```typescript
   // Old way (pre-Angular 19.1)
   this.value.subscribe((value) => {
     // Handle value change
   });

   // New way (Angular 19.1+)
   effect(() => {
     const value = this.value(); // Reading the signal inside effect() tracks it
     // Handle value change
   });
   ```

6. **Use .apply() for model inputs**: When updating model inputs, use the `.apply()` method instead of `.set()`.
   ```typescript
   // Incorrect
   this.value.set(newValue);

   // Correct
   this.value.apply(newValue);
   ```

7. **Constructor Injection**: Use constructor injection for dependencies and track value changes using effect().

   For directives with model() values, use effect() to track model value changes in the constructor to ensure ngModel binding works correctly:
   ```typescript
   constructor(private el: ElementRef) {
     effect(() => {
       this.onModelChange(this.value());
     });
   }
   ```

## Directive Structure and Implementation

When implementing new directives, follow these guidelines for consistent structure:

1. **Implement ControlValueAccessor and Validator**: For form-related directives, implement these interfaces to ensure proper integration with Angular forms.
   ```typescript
   @Directive({
     selector: 'wa-component',
     standalone: true,
     providers: [
       {
         provide: NG_VALUE_ACCESSOR,
         multi: true,
         useExisting: WaComponentDirective
       },
       {
         provide: NG_VALIDATORS,
         multi: true,
         useExisting: WaComponentDirective
       }
     ]
   })
   export class WaComponentDirective implements ControlValueAccessor, Validator {
     // Implementation...
   }
   ```

2. **Group Related Properties**: Organize properties in logical groups with comments.
   ```typescript
   // Basic properties
   label = input<string>('');
   hint = input<string>('');

   // Two-way bindable value
   value = model<string | number>('');

   // Boolean properties
   required = input<boolean | string>(false);
   disabled = input<boolean | string>(false);

   // Output events
   change = output<any>();
   blur = output<any>();
   ```

3. **Use Type Union for Fixed Values**: When a property has a fixed set of possible values, use a union type.
   ```typescript
   // Good
   type = input<'date' | 'number' | 'text'>('text');
   size = input<'small' | 'medium' | 'large'>('medium');

   // Bad
   type = input<string>('text');
   size = input<string>('medium');
   ```

4. **Implement Host Listeners**: Use @HostListener to handle DOM events.
   ```typescript
   @HostListener('input', ['$event'])
   onInput(event: any) {
     const value = event.target.value;
     this.value.apply(value);
     this.inputChange.emit(event);
     this.onModelChange(value);
   }
   ```

5. **Use effect() in Constructor**: Set up attribute watchers in the constructor using effect().
   ```typescript
   constructor(private el: ElementRef) {
     effect(() => {
       const value = this.value();
       this.onModelChange(value);
     });

     effect(() => {
       this.el.nativeElement.disabled = this.isDisabled();
     });
   }
   ```

## Data Binding and Angular Integration

The most important rule for this project is to ensure proper data binding between Angular and the web awesome framework. The web awesome framework handles the core functionality, but the Angular wrapper must handle the Angular integration, including two-way data binding and form validation.

### What to Avoid:

1. **No Formatting Logic**: Do not add logic that formats or transforms the displayed values. The web awesome framework handles all display formatting.

2. **No Business Logic**: Do not add business logic or validation rules that should be handled by the web awesome framework.

### What to Do:

1. **Define Inputs and Outputs**: Define inputs and outputs that match the web awesome component's API.

2. **Implement Two-Way Binding**: Ensure all directives support two-way data binding using Angular's model() API.

3. **Support ngModel**: Make directives compatible with ngModel for use in Angular forms by implementing ControlValueAccessor.
   ```typescript
   @Directive({
     selector: 'wa-component',
     standalone: true,
     providers: [
       {
         provide: NG_VALUE_ACCESSOR,
         multi: true,
         useExisting: WaComponentDirective
       }
     ]
   })
   export class WaComponentDirective implements ControlValueAccessor {
     // ControlValueAccessor implementation
     private onModelChange: (value: any) => void = () => {};
     private onTouched: () => void = () => {};

     writeValue(value: any): void {
       if (value !== undefined && value !== null) {
         this.value.apply(value);
       }
     }

     registerOnChange(fn: (value: any) => void): void {
       this.onModelChange = fn;
     }

     registerOnTouched(fn: () => void): void {
       this.onTouched = fn;
     }

     setDisabledState(isDisabled: boolean): void {
       // Implement if needed
     }
   }
   ```

4. **Handle Events**: Add necessary event handlers to ensure data flows correctly between Angular and web awesome components.
   ```typescript
   @HostListener('input', ['$event'])
   onInput(event: any) {
     const value = event.target.value;
     this.value.apply(value);
     this.valueChange.emit(event);
     this.onModelChange(value);
   }
   ```

5. **Support Validation**: Ensure directives properly support Angular form validation by implementing Validator.
   ```typescript
   @Directive({
     selector: 'wa-component',
     standalone: true,
     providers: [
       {
         provide: NG_VALUE_ACCESSOR,
         multi: true,
         useExisting: WaComponentDirective
       },
       {
         provide: NG_VALIDATORS,
         multi: true,
         useExisting: WaComponentDirective
       }
     ]
   })
   export class WaComponentDirective implements ControlValueAccessor, Validator {
     // Validator implementation
     validate(control: AbstractControl): ValidationErrors | null {
       const value = control.value;

       if (value === null || value === undefined || value === '') {
         return null; // Empty values are handled by required validator
       }

       // Add validation logic here

       return null;
     }
   }
   ```

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

### 2. Use Two Inputs for Each Attribute

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

### 3. Create a Helper Method

Create a helper method to determine if the attribute is enabled, checking all possible inputs:

For non-hyphenated attributes:

```typescript
isAttributeNameEnabled(): boolean {
  const attributeValue = this.attributeName();
  return attributeValue === true || 
         attributeValue === '' || 
         attributeValue === 'true';
}
```

For hyphenated attributes:

```typescript
isAttributeNameEnabled(): boolean {
  const attributeValue = this.attributeName();
  const attributeAttrValue = this.attributeNameAttr();

  return attributeValue === true || 
         attributeValue === '' || 
         attributeValue === 'true' ||
         attributeAttrValue === '' || 
         attributeAttrValue === 'true' ||
         attributeAttrValue === true;
}
```

### 4. Use the Helper Method in Templates and Tests

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
passwordToggle = input<boolean | string>(false);

// Separate input for the kebab-case standalone attribute
passwordToggleAttr = input<string | boolean>('', { alias: 'password-toggle' });

// Helper method to determine if password toggle is enabled
isPasswordToggleEnabled(): boolean {
  const passwordToggleValue = this.passwordToggle();
  const passwordToggleAttrValue = this.passwordToggleAttr();

  return passwordToggleValue === true ||
         passwordToggleValue === '' ||
         passwordToggleValue === 'true' ||
         passwordToggleAttrValue === '' ||
         passwordToggleAttrValue === 'true' ||
         passwordToggleAttrValue === true;
}
```

### Clearable (Non-Hyphenated Attribute)

```typescript
// Regular input for property binding
clearable = input<boolean | string>(false);

// Helper method to determine if clearable is enabled
isClearableEnabled(): boolean {
  const clearableValue = this.clearable();
  return clearableValue === true || 
         clearableValue === '' || 
         clearableValue === 'true';
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

## Test Component Structure

When creating test components for directives, follow these guidelines:

1. **Create Multiple Test Components**: Create separate test components for different scenarios.
   ```typescript
   // Basic test component
   @Component({
     template: `<wa-component [(value)]="testValue"></wa-component>`,
     standalone: true,
     imports: [WaComponentDirective]
   })
   class TestComponent { ... }

   // Test component with ngModel
   @Component({
     template: `<wa-component [(ngModel)]="testValue"></wa-component>`,
     standalone: true,
     imports: [WaComponentDirective, FormsModule]
   })
   class TestComponentWithNgModel { ... }

   // Test component with standalone attributes
   @Component({
     template: `<wa-component required disabled></wa-component>`,
     standalone: true,
     imports: [WaComponentDirective]
   })
   class TestComponentWithStandaloneAttributes { ... }
   ```

2. **Initialize All Test Components**: Initialize all test components in the beforeEach block.
   ```typescript
   beforeEach(async () => {
     await TestBed.configureTestingModule({
       imports: [
         FormsModule,
         TestComponent,
         TestComponentWithNgModel,
         TestComponentWithStandaloneAttributes
       ]
     }).compileComponents();

     // Initialize main test component
     fixture = TestBed.createComponent(TestComponent);
     component = fixture.componentInstance;
     directiveEl = fixture.debugElement.query(By.directive(WaComponentDirective));
     directive = directiveEl.injector.get(WaComponentDirective);
     fixture.detectChanges();

     // Initialize ngModel test component
     ngModelFixture = TestBed.createComponent(TestComponentWithNgModel);
     ngModelComponent = ngModelFixture.componentInstance;
     ngModelDirectiveEl = ngModelFixture.debugElement.query(By.directive(WaComponentDirective));
     ngModelDirective = ngModelDirectiveEl.injector.get(WaComponentDirective);
     ngModelFixture.detectChanges();

     // Initialize standalone attributes test component
     standaloneFixture = TestBed.createComponent(TestComponentWithStandaloneAttributes);
     standaloneComponent = standaloneFixture.componentInstance;
     standaloneDirectiveEl = standaloneFixture.debugElement.query(By.directive(WaComponentDirective));
     standaloneDirective = standaloneDirectiveEl.injector.get(WaComponentDirective);
     standaloneFixture.detectChanges();
   });
   ```

3. **Group Related Tests**: Group related tests using describe blocks.
   ```typescript
   describe('Basic functionality', () => {
     it('should create an instance', () => {
       expect(directive).toBeTruthy();
     });

     it('should initialize with the correct values', () => {
       expect(directive.value()).toBe('initial value');
     });
   });

   describe('ngModel binding', () => {
     it('should update the model when value changes', () => {
       ngModelDirective.value.apply('new value');
       ngModelFixture.detectChanges();
       expect(ngModelComponent.testValue).toBe('new value');
     });
   });
   ```

4. **Test All Attribute Variations**: Test all possible attribute variations.
   ```typescript
   it('should recognize attribute as a standalone attribute', () => {
     expect(standaloneDirective.isAttributeEnabled()).toBeTrue();
   });

   it('should handle attribute="true" attribute', () => {
     // Create a new test component with attribute="true"
     @Component({
       template: `<wa-component attribute="true"></wa-component>`,
       standalone: true,
       imports: [WaComponentDirective]
     })
     class TrueAttributeComponent {}

     const trueFixture = TestBed.createComponent(TrueAttributeComponent);
     const trueDirective = trueFixture.debugElement.query(By.directive(WaComponentDirective)).injector.get(WaComponentDirective);
     trueFixture.detectChanges();

     expect(trueDirective.isAttributeEnabled()).toBeTrue();
   });
   ```
