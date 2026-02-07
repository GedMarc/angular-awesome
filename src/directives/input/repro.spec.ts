
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaInputDirective } from './input.directive';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <wa-input
      [(value)]="value"
      (wa-input)="onWaInput($event)"
      (wa-clear)="onWaClear($event)"
    ></wa-input>
  `,
  standalone: true,
  imports: [WaInputDirective, FormsModule]
})
class ReproHostComponent {
  value = 'initial';
  waInputCalled = false;
  waClearCalled = false;

  onWaInput(event: any) {
    this.waInputCalled = true;
  }

  onWaClear(event: any) {
    this.waClearCalled = true;
  }
}

describe('WaInputDirective Repro', () => {
  let hostComponent: ReproHostComponent;
  let hostFixture: ComponentFixture<ReproHostComponent>;
  let inputElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReproHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(ReproHostComponent);
    hostComponent = hostFixture.componentInstance;
    inputElement = hostFixture.nativeElement.querySelector('wa-input');
    hostFixture.detectChanges();
  });

  it('should support (wa-input) event', () => {
    const event = new CustomEvent('wa-input', { detail: { value: 'new value' } });
    inputElement.dispatchEvent(event);
    expect(hostComponent.waInputCalled).toBeTrue();
  });

  it('should support (wa-clear) event', () => {
    const event = new CustomEvent('wa-clear');
    inputElement.dispatchEvent(event);
    expect(hostComponent.waClearCalled).toBeTrue();
  });

  it('should support two-way binding on value [(value)]', () => {
    hostComponent.value = 'updated';
    hostFixture.detectChanges();
    expect(inputElement.getAttribute('value')).toBe('updated');

    // Simulate internal change
    const event = new CustomEvent('wa-input', { bubbles: true });
    (inputElement as any).value = 'from web component';
    inputElement.dispatchEvent(event);
    hostFixture.detectChanges();

    expect(hostComponent.value).toBe('from web component');
  });
});
