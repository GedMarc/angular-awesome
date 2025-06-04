import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaIncludeDirective } from './include.directive';

// Create a test host component to test the include directive
@Component({
  template: `
    <wa-include
      [src]="src"
      [mode]="mode"
      [allowScripts]="allowScripts"
      (waLoad)="onLoad()"
      (waError)="onError($event)"
    ></wa-include>
  `,
  standalone: true,
  imports: [WaIncludeDirective]
})
class TestHostComponent {
  src?: string;
  mode?: 'cors' | 'no-cors' | 'same-origin' | string;
  allowScripts?: boolean | string;

  onLoad(): void {}
  onError(error: { status: number }): void {}
}

describe('WaIncludeDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let includeElement: HTMLElement;
  let includeDirective: WaIncludeDirective;

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

    // Get the wa-include element
    includeElement = hostFixture.nativeElement.querySelector('wa-include');
    includeDirective = hostFixture.debugElement.query(sel => sel.nativeElement === includeElement).injector.get(WaIncludeDirective);
  });

  it('should create the include directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(includeElement).toBeTruthy();
    expect(includeDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.src = 'test-src.html';
    hostComponent.mode = 'no-cors';
    hostFixture.detectChanges();

    expect(includeElement.getAttribute('src')).toBe('test-src.html');
    expect(includeElement.getAttribute('mode')).toBe('no-cors');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.allowScripts = true;
    hostFixture.detectChanges();

    expect(includeElement.hasAttribute('allow-scripts')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.allowScripts = false;
    hostFixture.detectChanges();

    expect(includeElement.hasAttribute('allow-scripts')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.allowScripts = 'true';
    hostFixture.detectChanges();

    expect(includeElement.hasAttribute('allow-scripts')).toBeTrue();

    hostComponent.allowScripts = '';
    hostFixture.detectChanges();

    expect(includeElement.hasAttribute('allow-scripts')).toBeTrue();
  });

  it('should expose the native element', () => {
    expect(includeDirective.nativeElement).toBe(includeElement);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onLoad');
    spyOn(hostComponent, 'onError');

    // Create mock events
    const loadEvent = new Event('waLoad');
    const errorEvent = new CustomEvent('waError', {
      detail: { status: 404 }
    });

    // Dispatch events on the native element
    includeElement.dispatchEvent(loadEvent);
    includeElement.dispatchEvent(errorEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onLoad).toHaveBeenCalled();
    expect(hostComponent.onError).toHaveBeenCalledWith({ status: 404 });
  });

  it('should handle different mode values', () => {
    const modes = ['cors', 'no-cors', 'same-origin'];

    modes.forEach(mode => {
      hostComponent.mode = mode as any;
      hostFixture.detectChanges();
      expect(includeElement.getAttribute('mode')).toBe(mode);
    });
  });
});
