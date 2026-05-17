import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaVideoPlaylistDirective } from './video-playlist.directive';

@Component({
  template: `
    <wa-video-playlist
      [controls]="controls"
      [iconLibrary]="iconLibrary"
      (waVideoChange)="onVideoChange($event)"
    ></wa-video-playlist>
  `,
  standalone: true,
  imports: [WaVideoPlaylistDirective]
})
class TestHostComponent {
  controls?: string;
  iconLibrary?: string;

  onVideoChange(_event: Event): void {}
}

describe('WaVideoPlaylistDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let playlistElement: HTMLElement;
  let playlistDirective: WaVideoPlaylistDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    playlistElement = hostFixture.nativeElement.querySelector('wa-video-playlist');
    playlistDirective = hostFixture.debugElement.query(sel => sel.nativeElement === playlistElement).injector.get(WaVideoPlaylistDirective);
  });

  it('should create the video-playlist directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(playlistElement).toBeTruthy();
    expect(playlistDirective).toBeTruthy();
  });

  it('should set string attributes correctly', () => {
    hostComponent.controls = 'standard';
    hostComponent.iconLibrary = 'default';
    hostFixture.detectChanges();

    expect(playlistElement.getAttribute('controls')).toBe('standard');
    expect(playlistElement.getAttribute('icon-library')).toBe('default');
  });

  it('should remove attributes when set to undefined', () => {
    hostComponent.controls = 'full';
    hostFixture.detectChanges();
    expect(playlistElement.getAttribute('controls')).toBe('full');

    hostComponent.controls = undefined;
    hostFixture.detectChanges();
    expect(playlistElement.hasAttribute('controls')).toBeFalse();
  });

  it('should expose the native element', () => {
    expect(playlistDirective.nativeElement).toBe(playlistElement);
  });

  it('should emit wa-video-change event', () => {
    spyOn(hostComponent, 'onVideoChange');

    playlistElement.dispatchEvent(new Event('wa-video-change'));

    expect(hostComponent.onVideoChange).toHaveBeenCalled();
  });

  it('should expose programmatic methods', () => {
    (playlistElement as any).next = jasmine.createSpy('next');
    (playlistElement as any).previous = jasmine.createSpy('previous');
    (playlistElement as any).goTo = jasmine.createSpy('goTo');

    playlistDirective.next();
    playlistDirective.previous();
    playlistDirective.goTo(2);

    expect((playlistElement as any).next).toHaveBeenCalled();
    expect((playlistElement as any).previous).toHaveBeenCalled();
    expect((playlistElement as any).goTo).toHaveBeenCalledWith(2);
  });
});
