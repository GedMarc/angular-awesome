import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaAnimatedImageDirective } from './animated-image.directive';

// Create a test host component to test the animated-image directive
@Component({
  template: `
    <wa-animated-image
      [src]="src"
      [alt]="alt"
      [play]="play"
      [iconSize]="iconSize"
      [controlBoxSize]="controlBoxSize"
    >
      <div slot="play-icon" *ngIf="showPlayIcon">Custom Play Icon</div>
      <div slot="pause-icon" *ngIf="showPauseIcon">Custom Pause Icon</div>
    </wa-animated-image>
  `,
  standalone: true,
  imports: [WaAnimatedImageDirective]
})
class TestHostComponent {
  src = 'animation.gif';
  alt = 'Animation';
  play?: boolean;
  iconSize?: string;
  controlBoxSize?: string;
  showPlayIcon = false;
  showPauseIcon = false;
}

describe('WaAnimatedImageDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let animatedImageElement: HTMLElement;

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

    // Get the wa-animated-image element
    animatedImageElement = hostFixture.nativeElement.querySelector('wa-animated-image');
  });

  it('should create the animated-image directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(animatedImageElement).toBeTruthy();
  });

  it('should set src attribute correctly', () => {
    hostComponent.src = 'new-animation.gif';
    hostFixture.detectChanges();
    expect(animatedImageElement.getAttribute('src')).toBe('new-animation.gif');
  });

  it('should set alt attribute correctly', () => {
    hostComponent.alt = 'New Animation';
    hostFixture.detectChanges();
    expect(animatedImageElement.getAttribute('alt')).toBe('New Animation');
  });

  it('should set play attribute when play is true', () => {
    hostComponent.play = true;
    hostFixture.detectChanges();
    expect(animatedImageElement.hasAttribute('play')).toBe(true);
  });

  it('should not set play attribute when play is false', () => {
    hostComponent.play = false;
    hostFixture.detectChanges();
    expect(animatedImageElement.hasAttribute('play')).toBe(false);
  });

  it('should set --icon-size CSS variable when iconSize is provided', () => {
    hostComponent.iconSize = '1.5rem';
    hostFixture.detectChanges();
    expect(animatedImageElement.style.getPropertyValue('--icon-size')).toBe('1.5rem');
  });

  it('should set --control-box-size CSS variable when controlBoxSize is provided', () => {
    hostComponent.controlBoxSize = '2rem';
    hostFixture.detectChanges();
    expect(animatedImageElement.style.getPropertyValue('--control-box-size')).toBe('2rem');
  });

  it('should project content into slot="play-icon" correctly', () => {
    hostComponent.showPlayIcon = true;
    hostFixture.detectChanges();

    const slotContent = hostFixture.nativeElement.querySelector('[slot="play-icon"]');
    expect(slotContent).toBeTruthy();
    expect(slotContent.textContent?.trim()).toBe('Custom Play Icon');
  });

  it('should project content into slot="pause-icon" correctly', () => {
    hostComponent.showPauseIcon = true;
    hostFixture.detectChanges();

    const slotContent = hostFixture.nativeElement.querySelector('[slot="pause-icon"]');
    expect(slotContent).toBeTruthy();
    expect(slotContent.textContent?.trim()).toBe('Custom Pause Icon');
  });
});
