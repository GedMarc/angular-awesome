import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaVideoDirective } from './video.directive';

@Component({
  template: `
    <wa-video
      [controls]="controls"
      [src]="src"
      [poster]="poster"
      [title]="title"
      [thumbnails]="thumbnails"
      [playing]="playing"
      [muted]="muted"
      [volume]="volume"
      [currentTime]="currentTime"
      [autoplay]="autoplay"
      [loop]="loop"
      [autoplayMuted]="autoplayMuted"
      [autoplayOnVisible]="autoplayOnVisible"
      [preload]="preload"
      [iconLibrary]="iconLibrary"
      (waPlay)="onPlay($event)"
      (waPause)="onPause($event)"
      (waEnded)="onEnded($event)"
    ></wa-video>
  `,
  standalone: true,
  imports: [WaVideoDirective]
})
class TestHostComponent {
  controls?: string;
  src?: string;
  poster?: string;
  title?: string;
  thumbnails?: string;
  playing?: boolean | string;
  muted?: boolean | string;
  volume?: number | string;
  currentTime?: number | string;
  autoplay?: boolean | string;
  loop?: boolean | string;
  autoplayMuted?: boolean | string;
  autoplayOnVisible?: boolean | string;
  preload?: string;
  iconLibrary?: string;

  onPlay(_event: Event): void {}
  onPause(_event: Event): void {}
  onEnded(_event: Event): void {}
}

describe('WaVideoDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let videoElement: HTMLElement;
  let videoDirective: WaVideoDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    videoElement = hostFixture.nativeElement.querySelector('wa-video');
    videoDirective = hostFixture.debugElement.query(sel => sel.nativeElement === videoElement).injector.get(WaVideoDirective);
  });

  it('should create the video directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(videoElement).toBeTruthy();
    expect(videoDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.controls = 'full';
    hostComponent.src = 'video.mp4';
    hostComponent.poster = 'poster.jpg';
    hostComponent.title = 'My Video';
    hostComponent.preload = 'auto';
    hostComponent.iconLibrary = 'default';
    hostFixture.detectChanges();

    expect(videoElement.getAttribute('controls')).toBe('full');
    expect(videoElement.getAttribute('src')).toBe('video.mp4');
    expect(videoElement.getAttribute('poster')).toBe('poster.jpg');
    expect(videoElement.getAttribute('title')).toBe('My Video');
    expect(videoElement.getAttribute('preload')).toBe('auto');
    expect(videoElement.getAttribute('icon-library')).toBe('default');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.playing = true;
    hostComponent.muted = true;
    hostComponent.autoplay = true;
    hostComponent.loop = true;
    hostComponent.autoplayMuted = true;
    hostComponent.autoplayOnVisible = true;
    hostFixture.detectChanges();

    expect(videoElement.hasAttribute('playing')).toBeTrue();
    expect(videoElement.hasAttribute('muted')).toBeTrue();
    expect(videoElement.hasAttribute('autoplay')).toBeTrue();
    expect(videoElement.hasAttribute('loop')).toBeTrue();
    expect(videoElement.hasAttribute('autoplay-muted')).toBeTrue();
    expect(videoElement.hasAttribute('autoplay-on-visible')).toBeTrue();
  });

  it('should remove boolean attributes when false', () => {
    hostComponent.playing = false;
    hostComponent.muted = false;
    hostComponent.autoplay = false;
    hostComponent.loop = false;
    hostFixture.detectChanges();

    expect(videoElement.hasAttribute('playing')).toBeFalse();
    expect(videoElement.hasAttribute('muted')).toBeFalse();
    expect(videoElement.hasAttribute('autoplay')).toBeFalse();
    expect(videoElement.hasAttribute('loop')).toBeFalse();
  });

  it('should set numeric attributes correctly', () => {
    hostComponent.volume = 0.5;
    hostComponent.currentTime = 30;
    hostFixture.detectChanges();

    expect(videoElement.getAttribute('volume')).toBe('0.5');
    expect(videoElement.getAttribute('current-time')).toBe('30');
  });

  it('should expose the native element', () => {
    expect(videoDirective.nativeElement).toBe(videoElement);
  });

  it('should emit play event', () => {
    spyOn(hostComponent, 'onPlay');

    videoElement.dispatchEvent(new Event('play'));

    expect(hostComponent.onPlay).toHaveBeenCalled();
  });

  it('should emit pause event', () => {
    spyOn(hostComponent, 'onPause');

    videoElement.dispatchEvent(new Event('pause'));

    expect(hostComponent.onPause).toHaveBeenCalled();
  });

  it('should emit ended event', () => {
    spyOn(hostComponent, 'onEnded');

    videoElement.dispatchEvent(new Event('ended'));

    expect(hostComponent.onEnded).toHaveBeenCalled();
  });

  it('should expose programmatic methods', () => {
    (videoElement as any).play = jasmine.createSpy('play');
    (videoElement as any).pause = jasmine.createSpy('pause');
    (videoElement as any).togglePlay = jasmine.createSpy('togglePlay');
    (videoElement as any).toggleMute = jasmine.createSpy('toggleMute');
    (videoElement as any).seek = jasmine.createSpy('seek');
    (videoElement as any).setVolume = jasmine.createSpy('setVolume');
    (videoElement as any).setPlaybackRate = jasmine.createSpy('setPlaybackRate');
    (videoElement as any).requestFullscreen = jasmine.createSpy('requestFullscreen');
    (videoElement as any).exitFullscreen = jasmine.createSpy('exitFullscreen');

    videoDirective.play();
    videoDirective.pause();
    videoDirective.togglePlay();
    videoDirective.toggleMute();
    videoDirective.seek(10);
    videoDirective.setVolume(0.8);
    videoDirective.setPlaybackRate(1.5);
    videoDirective.requestFullscreen();
    videoDirective.exitFullscreen();

    expect((videoElement as any).play).toHaveBeenCalled();
    expect((videoElement as any).pause).toHaveBeenCalled();
    expect((videoElement as any).togglePlay).toHaveBeenCalled();
    expect((videoElement as any).toggleMute).toHaveBeenCalled();
    expect((videoElement as any).seek).toHaveBeenCalledWith(10);
    expect((videoElement as any).setVolume).toHaveBeenCalledWith(0.8);
    expect((videoElement as any).setPlaybackRate).toHaveBeenCalledWith(1.5);
    expect((videoElement as any).requestFullscreen).toHaveBeenCalled();
    expect((videoElement as any).exitFullscreen).toHaveBeenCalled();
  });
});
