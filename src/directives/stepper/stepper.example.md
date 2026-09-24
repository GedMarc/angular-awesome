# Stepper examples

```typescript
import { Component, ViewChild } from '@angular/core';
import { WaStepDirective, WaStepperDirective } from 'angular-awesome';

@Component({
  standalone: true,
  imports: [WaStepperDirective, WaStepDirective],
  template: `
    <wa-stepper [(active)]="currentStep" orientation="auto" [linear]="true"
      label="Checkout" (waBeforeStepChange)="guardStep($event)">
      <wa-step name="cart" [completed]="cartComplete">Cart</wa-step>
      <wa-step name="shipping">Shipping</wa-step>
      <wa-step name="payment">Payment</wa-step>
    </wa-stepper>
    <button (click)="next()">Next</button>
  `
})
export class CheckoutComponent {
  currentStep = 'cart';
  cartComplete = false;
  @ViewChild(WaStepperDirective) stepper!: WaStepperDirective;
  next(): void { this.stepper.next(); }
  guardStep(event: CustomEvent): void {
    if (!this.cartComplete && event.detail.name === 'shipping') event.preventDefault();
  }
}
```
