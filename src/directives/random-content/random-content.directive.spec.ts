import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaRandomContentDirective } from './random-content.directive';

@Component({
  template: `
    <wa-random-content
      [items]="items"
      [mode]="mode"
      [autoplay]="autoplay"
      [autoplayInterval]="autoplayInterval"
      [animation]="animation"
      [animationDuration]="animationDuration"
      [animationEasing]="animationEasing"
      [animationTranslate]="animationTranslate"
      (waContentChange)="onContentChange($event)"
    >
      <div class="pool-item">One</div>
      <div class="pool-item">Two</div>
      <div class="pool-item">Three</div>
    </wa-random-content>
  `,
  standalone: true,
  imports: [WaRandomContentDirective]
})
class TestHostComponent {
  items?: number | string;
  mode?: 'random' | 'unique' | 'sequence' | string;
  autoplay?: boolean | string;
  autoplayInterval?: number | string;
  animation?: string;
  animationDuration?: string;
  animationEasing?: string;
  animationTranslate?: string;

  lastEvent?: CustomEvent;
  onContentChange(event: CustomEvent) {
    this.lastEvent = event;
  }
}

describe('WaRandomContentDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let randomContentElement: HTMLElement;
  let directive: WaRandomContentDirective;

  beforeEach(async () => {
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

    randomContentElement = hostFixture.nativeElement.querySelector('wa-random-content');
    directive = hostFixture.debugElement
      .query(sel => sel.nativeElement === randomContentElement)
      .injector.get(WaRandomContentDirective);
  });

  it('should create the directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(randomContentElement).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should project content correctly', () => {
    expect(randomContentElement.querySelectorAll('.pool-item').length).toBe(3);
  });

  it('should set the items attribute', () => {
    hostComponent.items = 2;
    hostFixture.detectChanges();
    expect(randomContentElement.getAttribute('items')).toBe('2');
  });

  it('should set the mode attribute', () => {
    const modes = ['random', 'unique', 'sequence'];
    modes.forEach(mode => {
      hostComponent.mode = mode;
      hostFixture.detectChanges();
      expect(randomContentElement.getAttribute('mode')).toBe(mode);
    });
  });

  it('should set the animation attribute', () => {
    hostComponent.animation = 'fade-up';
    hostFixture.detectChanges();
    expect(randomContentElement.getAttribute('animation')).toBe('fade-up');
  });

  it('should set the autoplay boolean attribute', () => {
    hostComponent.autoplay = true;
    hostFixture.detectChanges();
    expect(randomContentElement.hasAttribute('autoplay')).toBeTrue();

    hostComponent.autoplay = false;
    hostFixture.detectChanges();
    expect(randomContentElement.hasAttribute('autoplay')).toBeFalse();
  });

  it('should set the autoplay-interval attribute', () => {
    hostComponent.autoplayInterval = 5000;
    hostFixture.detectChanges();
    expect(randomContentElement.getAttribute('autoplay-interval')).toBe('5000');

    hostComponent.autoplayInterval = undefined;
    hostFixture.detectChanges();
    expect(randomContentElement.hasAttribute('autoplay-interval')).toBeFalse();
  });

  it('should set animation CSS custom properties', () => {
    hostComponent.animationDuration = '500ms';
    hostComponent.animationEasing = 'ease-in-out';
    hostComponent.animationTranslate = '1em';
    hostFixture.detectChanges();

    expect(randomContentElement.style.getPropertyValue('--animation-duration')).toBe('500ms');
    expect(randomContentElement.style.getPropertyValue('--animation-easing')).toBe('ease-in-out');
    expect(randomContentElement.style.getPropertyValue('--animation-translate')).toBe('1em');
  });

  it('should remove animation CSS custom properties when cleared', () => {
    hostComponent.animationDuration = '500ms';
    hostFixture.detectChanges();
    expect(randomContentElement.style.getPropertyValue('--animation-duration')).toBe('500ms');

    hostComponent.animationDuration = undefined;
    hostFixture.detectChanges();
    expect(randomContentElement.style.getPropertyValue('--animation-duration')).toBe('');
  });

  it('should expose the native element', () => {
    expect(directive.nativeElement).toBe(randomContentElement);
  });

  it('should call randomize() on the native element when available', () => {
    const shown = [document.createElement('div')];
    (randomContentElement as any).randomize = jasmine.createSpy('randomize').and.returnValue(shown);

    const result = directive.randomize();
    expect((randomContentElement as any).randomize).toHaveBeenCalled();
    expect(result).toBe(shown);
  });

  it('should return undefined from randomize() when the method is unavailable', () => {
    expect(directive.randomize()).toBeUndefined();
  });

  it('should emit waContentChange when the native event fires', () => {
    const event = new CustomEvent('wa-content-change', { detail: {} });
    randomContentElement.dispatchEvent(event);
    expect(hostComponent.lastEvent).toBe(event);
  });
});

