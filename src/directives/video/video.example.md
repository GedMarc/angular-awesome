# Video Examples

## Basic Usage (src attribute)

```html
<wa-video src="https://example.com/video.mp4" controls="standard"></wa-video>
```

## With Poster and Title

```html
<wa-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  title="Introduction to Angular Awesome"
  controls="full">
</wa-video>
```

## Multiple Sources with Captions

```html
<wa-video controls="full" title="Demo Video">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <track kind="subtitles" src="captions.vtt" srclang="en" label="English">
</wa-video>
```

## Autoplay (Muted)

```html
<wa-video src="hero.mp4" autoplay-muted loop controls="none"></wa-video>
```

## Autoplay On Visible

```html
<wa-video
  src="demo.mp4"
  autoplay-on-visible
  muted
  controls="standard">
</wa-video>
```

## Angular Bindings

```html
<wa-video
  [src]="videoUrl"
  [poster]="posterUrl"
  [title]="videoTitle"
  [controls]="controlsPreset"
  [muted]="isMuted"
  [volume]="volumeLevel"
  [autoplay]="shouldAutoplay"
  [loop]="shouldLoop"
  [preload]="preloadStrategy"
  (waPlay)="onPlay()"
  (waPause)="onPause()"
  (waEnded)="onEnded()"
  (waTimeupdate)="onTimeUpdate($event)"
  (waError)="onError($event)">
</wa-video>
```

## Programmatic Control

```typescript
import { Component, ViewChild } from '@angular/core';
import { WaVideoDirective } from 'angular-awesome';

@Component({
  selector: 'app-video-demo',
  standalone: true,
  imports: [WaVideoDirective],
  template: `
    <wa-video #player src="demo.mp4" controls="full"></wa-video>
    <div class="controls">
      <button (click)="player.play()">Play</button>
      <button (click)="player.pause()">Pause</button>
      <button (click)="player.seek(30)">Skip to 30s</button>
      <button (click)="player.setVolume(0.5)">50% Volume</button>
      <button (click)="player.requestFullscreen()">Fullscreen</button>
    </div>
  `
})
export class VideoDemoComponent {}
```

## Video Playlist

```html
<wa-video-playlist controls="full" (waVideoChange)="onVideoChange($event)">
  <wa-video
    src="episode1.mp4"
    poster="ep1-poster.jpg"
    title="Episode 1: Getting Started">
  </wa-video>
  <wa-video
    src="episode2.mp4"
    poster="ep2-poster.jpg"
    title="Episode 2: Core Concepts">
  </wa-video>
  <wa-video
    src="episode3.mp4"
    poster="ep3-poster.jpg"
    title="Episode 3: Advanced Topics">
  </wa-video>
</wa-video-playlist>
```

## Playlist with Programmatic Navigation

```typescript
import { Component, ViewChild } from '@angular/core';
import { WaVideoPlaylistDirective, WaVideoDirective } from 'angular-awesome';

@Component({
  selector: 'app-playlist-demo',
  standalone: true,
  imports: [WaVideoPlaylistDirective, WaVideoDirective],
  template: `
    <wa-video-playlist #playlist controls="full">
      <wa-video src="ep1.mp4" title="Episode 1"></wa-video>
      <wa-video src="ep2.mp4" title="Episode 2"></wa-video>
      <wa-video src="ep3.mp4" title="Episode 3"></wa-video>
    </wa-video-playlist>
    <div>
      <button (click)="playlist.previous()">Previous</button>
      <button (click)="playlist.goTo(0)">First</button>
      <button (click)="playlist.next()">Next</button>
    </div>
  `
})
export class PlaylistDemoComponent {}
```

## Custom Controls Preset — No Controls (Background Video)

```html
<wa-video
  src="background.mp4"
  controls="none"
  autoplay-muted
  loop
  style="width: 100%; height: 400px; object-fit: cover;">
</wa-video>
```
