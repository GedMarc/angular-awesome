import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaZoomableFrameDirective } from './zoomable-frame.directive';

@Component({
  template: `
    <wa-zoomable-frame
      [src]="src"
      [srcdoc]="srcdoc"
      [allowfullscreen]="allowfullscreen"
      [loading]="loading"
      [zoom]="zoom"
      [zoomLevels]="zoomLevels"
      [withoutControls]="withoutControls"
      [withoutInteraction]="withoutInteraction"
      [withThemeSync]="withThemeSync"
      (load)="onLoad($event)"
      (error)="onError($event)"
    ></wa-zoomable-frame>
  `,
  standalone: true,
  imports: [WaZoomableFrameDirective]
})
class TestHostComponent {
  src?: string;
  srcdoc?: string;
  allowfullscreen?: boolean | string;
  loading?: 'eager' | 'lazy' | string;
  zoom?: number | string;
  zoomLevels?: string;
  withoutControls?: boolean | string;
  withoutInteraction?: boolean | string;
  withThemeSync?: boolean | string;

  onLoad(_: Event) {}
  onError(_: Event) {}
}

describe('WaZoomableFrameDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let frameElement: HTMLElement;

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

    frameElement = hostFixture.nativeElement.querySelector('wa-zoomable-frame');
  });

  it('should create the directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(frameElement).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.src = 'https://example.com';
    hostComponent.loading = 'lazy';
    hostComponent.zoomLevels = '0.5 1 1.5 2';
    hostFixture.detectChanges();

    expect(frameElement.getAttribute('src')).toBe('https://example.com');
    expect(frameElement.getAttribute('loading')).toBe('lazy');
    expect(frameElement.getAttribute('zoom-levels')).toBe('0.5 1 1.5 2');
  });

  it('should set numeric zoom attribute', () => {
    hostComponent.zoom = 1.5;
    hostFixture.detectChanges();
    expect(frameElement.getAttribute('zoom')).toBe('1.5');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.allowfullscreen = true;
    hostComponent.withoutControls = true;
    hostComponent.withoutInteraction = true;
    hostComponent.withThemeSync = true;
    hostFixture.detectChanges();

    expect(frameElement.hasAttribute('allowfullscreen')).toBeTrue();
    expect(frameElement.hasAttribute('without-controls')).toBeTrue();
    expect(frameElement.hasAttribute('without-interaction')).toBeTrue();
    expect(frameElement.hasAttribute('with-theme-sync')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.allowfullscreen = false;
    hostComponent.withoutControls = false;
    hostComponent.withoutInteraction = false;
    hostComponent.withThemeSync = false;
    hostFixture.detectChanges();

    expect(frameElement.hasAttribute('allowfullscreen')).toBeFalse();
    expect(frameElement.hasAttribute('without-controls')).toBeFalse();
    expect(frameElement.hasAttribute('without-interaction')).toBeFalse();
    expect(frameElement.hasAttribute('with-theme-sync')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.withThemeSync = 'true';
    hostFixture.detectChanges();
    expect(frameElement.hasAttribute('with-theme-sync')).toBeTrue();

    hostComponent.withThemeSync = '';
    hostFixture.detectChanges();
    expect(frameElement.hasAttribute('with-theme-sync')).toBeTrue();
  });

  it('should set srcdoc attribute', () => {
    hostComponent.srcdoc = '<h1>Hello</h1>';
    hostFixture.detectChanges();
    expect(frameElement.getAttribute('srcdoc')).toBe('<h1>Hello</h1>');
  });
});

