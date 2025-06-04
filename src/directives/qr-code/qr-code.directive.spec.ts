import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaQrCodeDirective } from './qr-code.directive';
import { FormsModule } from '@angular/forms';

// Create a test host component to test the QR code directive
@Component({
  template: `
    <wa-qr-code
      [(ngModel)]="value"
      [label]="label"
      [size]="size"
      [fill]="fill"
      [background]="background"
      [radius]="radius"
      [errorCorrection]="errorCorrection"
      [styleSize]="styleSize"
      [styleFill]="styleFill"
      [styleBackground]="styleBackground"
      [styleRadius]="styleRadius"
      [styleColor]="styleColor"
      [styleDisplay]="styleDisplay"
      (focusEvent)="onFocus($event)"
      (blurEvent)="onBlur($event)"
    >
      <div slot="prefix">{{ prefixContent }}</div>
    </wa-qr-code>
  `,
  standalone: true,
  imports: [WaQrCodeDirective, FormsModule]
})
class TestHostComponent {
  value?: string = 'https://example.com';
  label?: string;
  size?: number | string;
  fill?: string;
  background?: string;
  radius?: number | string;
  errorCorrection?: 'L' | 'M' | 'Q' | 'H' | string;
  styleSize?: string;
  styleFill?: string;
  styleBackground?: string;
  styleRadius?: string;
  styleColor?: string;
  styleDisplay?: string;
  prefixContent = 'Scan me';

  onFocus(event: FocusEvent): void {}
  onBlur(event: FocusEvent): void {}
}

describe('WaQrCodeDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let qrCodeElement: HTMLElement;
  let qrCodeDirective: WaQrCodeDirective;

  beforeEach(async () => {
    // Mock the customElements API
    if (!window.customElements) {
      (window as any).customElements = {
        whenDefined: () => Promise.resolve(),
        define: () => {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    // Get the wa-qr-code element
    qrCodeElement = hostFixture.nativeElement.querySelector('wa-qr-code');
    qrCodeDirective = hostFixture.debugElement.query(sel => sel.nativeElement === qrCodeElement).injector.get(WaQrCodeDirective);
  });

  it('should create the QR code directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(qrCodeElement).toBeTruthy();
    expect(qrCodeDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.value = 'https://example.org';
    hostComponent.label = 'Scan this QR code';
    hostComponent.fill = '#000000';
    hostComponent.background = '#ffffff';
    hostComponent.errorCorrection = 'H';
    hostFixture.detectChanges();

    expect(qrCodeElement.getAttribute('value')).toBe('https://example.org');
    expect(qrCodeElement.getAttribute('label')).toBe('Scan this QR code');
    expect(qrCodeElement.getAttribute('fill')).toBe('#000000');
    expect(qrCodeElement.getAttribute('background')).toBe('#ffffff');
    expect(qrCodeElement.getAttribute('error-correction')).toBe('H');
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.size = 200;
    hostComponent.radius = 0.2;
    hostFixture.detectChanges();

    expect(qrCodeElement.getAttribute('size')).toBe('200');
    expect(qrCodeElement.getAttribute('radius')).toBe('0.2');
  });

  it('should set style attributes correctly', () => {
    hostComponent.styleSize = '250px';
    hostComponent.styleFill = '#333333';
    hostComponent.styleBackground = '#f5f5f5';
    hostComponent.styleRadius = '0.3';
    hostComponent.styleColor = '#666666';
    hostComponent.styleDisplay = 'block';
    hostFixture.detectChanges();

    expect(qrCodeElement.style.getPropertyValue('--size')).toBe('250px');
    expect(qrCodeElement.style.getPropertyValue('--fill')).toBe('#333333');
    expect(qrCodeElement.style.getPropertyValue('--background')).toBe('#f5f5f5');
    expect(qrCodeElement.style.getPropertyValue('--radius')).toBe('0.3');
    expect(qrCodeElement.style.getPropertyValue('--color')).toBe('#666666');
    expect(qrCodeElement.style.getPropertyValue('--display')).toBe('block');
  });

  it('should project content correctly', () => {
    const prefixSlot = qrCodeElement.querySelector('[slot="prefix"]');
    expect(prefixSlot?.textContent?.trim()).toBe('Scan me');

    hostComponent.prefixContent = 'Scan this code';
    hostFixture.detectChanges();
    expect(prefixSlot?.textContent?.trim()).toBe('Scan this code');
  });

  it('should expose the native element', () => {
    expect(qrCodeDirective.nativeElement).toBe(qrCodeElement);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onFocus');
    spyOn(hostComponent, 'onBlur');

    // Create mock events
    const focusEvent = new FocusEvent('focus');
    const blurEvent = new FocusEvent('blur');

    // Dispatch events on the native element
    qrCodeElement.dispatchEvent(focusEvent);
    qrCodeElement.dispatchEvent(blurEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onFocus).toHaveBeenCalled();
    expect(hostComponent.onBlur).toHaveBeenCalled();
  });

  it('should implement ControlValueAccessor correctly', () => {
    // Test writeValue
    qrCodeDirective.writeValue('https://newexample.com');
    expect(qrCodeElement.getAttribute('value')).toBe('https://newexample.com');

    // Test setDisabledState
    qrCodeDirective.setDisabledState(true);
    expect(qrCodeElement.hasAttribute('disabled')).toBeTrue();

    qrCodeDirective.setDisabledState(false);
    expect(qrCodeElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should handle different error correction levels', () => {
    const errorCorrectionLevels = ['L', 'M', 'Q', 'H'];

    errorCorrectionLevels.forEach(level => {
      hostComponent.errorCorrection = level;
      hostFixture.detectChanges();
      expect(qrCodeElement.getAttribute('error-correction')).toBe(level);
    });
  });
});
