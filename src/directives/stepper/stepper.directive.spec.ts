import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaStepDirective } from '../step/step.directive';
import { WaStepperDirective, WaStepChangeDetail } from './stepper.directive';

@Component({
  standalone: true,
  imports: [WaStepDirective, WaStepperDirective],
  template: `<wa-stepper [active]="active" [orientation]="orientation" [linear]="linear" [clickable]="clickable"
    label="Checkout" (waBeforeStepChange)="before = $event" (waStepChange)="changed = $event"
    (activeChange)="newActive = $event">
    <wa-step name="cart" [completed]="completed">Cart</wa-step>
    <wa-step name="shipping" [disabled]="disabled" [withDescription]="true">
      Shipping <span slot="description">Address</span>
    </wa-step>
  </wa-stepper>`
})
class Host {
  active = 'cart';
  orientation: 'horizontal' | 'vertical' | 'auto' = 'auto';
  linear = true;
  clickable = false;
  completed = false;
  disabled = false;
  before?: CustomEvent<WaStepChangeDetail>;
  changed?: CustomEvent<WaStepChangeDetail>;
  newActive?: string;
}

describe('Web Awesome 3.14 stepper wrappers', () => {
  let fixture: ComponentFixture<Host>;
  let host: Host;
  let stepper: HTMLElement;
  let steps: NodeListOf<HTMLElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    fixture = TestBed.createComponent(Host);
    host = fixture.componentInstance;
    fixture.detectChanges();
    stepper = fixture.nativeElement.querySelector('wa-stepper');
    steps = fixture.nativeElement.querySelectorAll('wa-step');
  });

  it('projects steps and updates attributes on model changes', () => {
    expect(steps.length).toBe(2);
    expect(steps[0].textContent).toContain('Cart');
    expect(steps[1].querySelector('[slot=description]')?.textContent).toBe('Address');
    expect(stepper.getAttribute('active')).toBe('cart');
    expect(stepper.getAttribute('orientation')).toBe('auto');
    expect(stepper.hasAttribute('linear')).toBeTrue();
    expect(steps[1].hasAttribute('with-description')).toBeTrue();
    host.active = 'shipping';
    host.completed = true;
    host.disabled = true;
    host.clickable = true;
    host.linear = false;
    fixture.detectChanges();
    expect(stepper.getAttribute('active')).toBe('shipping');
    expect(stepper.hasAttribute('clickable')).toBeTrue();
    expect(stepper.hasAttribute('linear')).toBeFalse();
    expect(steps[0].hasAttribute('completed')).toBeTrue();
    expect(steps[1].hasAttribute('disabled')).toBeTrue();
  });

  it('forwards cancelable change events and the new active name', () => {
    const detail = { name: 'shipping', previousName: 'cart', step: steps[1], previousStep: steps[0] };
    const before = new CustomEvent('wa-before-step-change', { detail, cancelable: true });
    stepper.dispatchEvent(before);
    expect(host.before).toBe(before);
    host.before?.preventDefault();
    expect(before.defaultPrevented).toBeTrue();
    const changed = new CustomEvent('wa-step-change', { detail });
    stepper.dispatchEvent(changed);
    expect(host.changed).toBe(changed);
    expect(host.newActive).toBe('shipping');
  });

  it('delegates navigation methods to the native element', () => {
    const directive = fixture.debugElement.children[0].injector.get(WaStepperDirective);
    const calls: string[] = [];
    Object.assign(stepper, { goTo: (name: string) => calls.push(name), next: () => calls.push('next'), previous: () => calls.push('previous') });
    directive.goTo('shipping');
    directive.next();
    directive.previous();
    expect(calls).toEqual(['shipping', 'next', 'previous']);
  });
});
