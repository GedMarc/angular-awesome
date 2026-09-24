# Step examples

```html
<wa-step name="cart" [completed]="cartComplete">Cart</wa-step>
<wa-step name="shipping" attention="pulse" [withDescription]="true">
  Shipping <span slot="description">Choose an address</span>
</wa-step>
<wa-step name="payment" [disabled]="paymentLocked" variant="warning">Payment</wa-step>
```

Place these elements inside a `<wa-stepper>` and import `WaStepDirective` with `WaStepperDirective`.
