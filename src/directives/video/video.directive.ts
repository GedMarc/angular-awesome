import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, Renderer2, inject } from '@angular/core';

/**
 * WaVideoDirective
 *
 * Angular wrapper for the <wa-video> Web Component.
 * Videos are used to embed and play video content with custom controls, and captions.
 *
 * Features:
 * - Binds all supported video attributes as @Input() properties
 * - Supports boolean attributes like playing, muted, autoplay, loop, autoplayMuted, autoplayOnVisible
 * - Supports numeric attributes like volume, duration, currentTime
 * - Supports string attributes like controls, src, poster, title, thumbnails, preload, iconLibrary
 * - Emits playback events (play, pause, timeupdate, volumechange, error, ended, loadedmetadata)
 * - Provides programmatic methods (play, pause, togglePlay, seek, etc.)
 * - Allows slot projection for source/track elements and icon customisation
 * - Supports custom styling via CSS custom properties
 */
@Directive({
  selector: 'wa-video',
  standalone: true
})
export class WaVideoDirective implements OnInit, OnChanges, OnDestroy {
  /** The video's controls preset. */
  @Input() controls?: 'none' | 'standard' | 'full' | string;

  /** A URL pointing to a WebVTT file for timeline thumbnail previews. */
  @Input() thumbnails?: string;

  /** The URL of the video source. For multiple formats, use <source> elements instead. */
  @Input() src?: string;

  /** Poster image URL. */
  @Input() poster?: string;

  /** The video's title. */
  @Input() title?: string;

  /** Indicates whether the video is currently playing. */
  @Input() playing?: boolean | string;

  /** When set, the video will be muted. */
  @Input() muted?: boolean | string;

  /** The video's volume (0–1). */
  @Input() volume?: number | string;

  /** The total duration of the video in seconds (read-only from the element). */
  @Input() duration?: number | string;

  /** The current playback position in seconds. */
  @Input() currentTime?: number | string;

  /** Enables autoplay when the component connects. */
  @Input() autoplay?: boolean | string;

  /** Loops the video when playback ends. */
  @Input() loop?: boolean | string;

  /** Enables autoplay in a muted state. */
  @Input() autoplayMuted?: boolean | string;

  /** Automatically resumes playback when the player scrolls back into view. */
  @Input() autoplayOnVisible?: boolean | string;

  /** Controls how the browser preloads the video. */
  @Input() preload?: 'auto' | 'metadata' | 'none' | string;

  /** Icon library used for all built-in control icons. */
  @Input() iconLibrary?: string;

  // Event outputs
  @Output() waPlay = new EventEmitter<Event>();
  @Output('play') waPlayNative = this.waPlay;
  @Output() waPause = new EventEmitter<Event>();
  @Output('pause') waPauseNative = this.waPause;
  @Output() waTimeupdate = new EventEmitter<Event>();
  @Output('timeupdate') waTimeupdateNative = this.waTimeupdate;
  @Output() waVolumechange = new EventEmitter<Event>();
  @Output('volumechange') waVolumechangeNative = this.waVolumechange;
  @Output() waError = new EventEmitter<Event>();
  @Output('error') waErrorNative = this.waError;
  @Output() waEnded = new EventEmitter<Event>();
  @Output('ended') waEndedNative = this.waEnded;
  @Output() waLoadedmetadata = new EventEmitter<Event>();
  @Output('loadedmetadata') waLoadedmetadataNative = this.waLoadedmetadata;

  // Injected services
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private eventCleanups: (() => void)[] = [];

  ngOnInit() {
    this.applyInputs();
    this.setupEventListeners();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs() {
    this.setAttr('controls', this.controls);
    this.setAttr('thumbnails', this.thumbnails);
    this.setAttr('src', this.src);
    this.setAttr('poster', this.poster);
    this.setAttr('title', this.title);
    this.setAttr('preload', this.preload);
    this.setAttr('icon-library', this.iconLibrary);

    this.setBooleanAttr('playing', this.playing);
    this.setBooleanAttr('muted', this.muted);
    this.setBooleanAttr('autoplay', this.autoplay);
    this.setBooleanAttr('loop', this.loop);
    this.setBooleanAttr('autoplay-muted', this.autoplayMuted);
    this.setBooleanAttr('autoplay-on-visible', this.autoplayOnVisible);

    this.setNumericAttr('volume', this.volume);
    this.setNumericAttr('duration', this.duration);
    this.setNumericAttr('current-time', this.currentTime);
  }

  private setupEventListeners() {
    const native = this.el.nativeElement;

    this.eventCleanups.push(
      this.renderer.listen(native, 'play', (e: Event) => this.waPlay.emit(e)),
      this.renderer.listen(native, 'pause', (e: Event) => this.waPause.emit(e)),
      this.renderer.listen(native, 'timeupdate', (e: Event) => this.waTimeupdate.emit(e)),
      this.renderer.listen(native, 'volumechange', (e: Event) => this.waVolumechange.emit(e)),
      this.renderer.listen(native, 'error', (e: Event) => this.waError.emit(e)),
      this.renderer.listen(native, 'ended', (e: Event) => this.waEnded.emit(e)),
      this.renderer.listen(native, 'loadedmetadata', (e: Event) => this.waLoadedmetadata.emit(e)),
    );
  }

  /** Starts playback. */
  public play(): void {
    (this.el.nativeElement as any).play();
  }

  /** Pauses playback. */
  public pause(): void {
    (this.el.nativeElement as any).pause();
  }

  /** Toggles between play and pause. */
  public togglePlay(): void {
    (this.el.nativeElement as any).togglePlay();
  }

  /** Toggles the muted state. */
  public toggleMute(): void {
    (this.el.nativeElement as any).toggleMute();
  }

  /** Seeks to a specific time in the video. */
  public seek(time: number): void {
    (this.el.nativeElement as any).seek(time);
  }

  /** Sets the volume level (0–1). */
  public setVolume(volume: number): void {
    (this.el.nativeElement as any).setVolume(volume);
  }

  /** Sets the playback rate (speed). */
  public setPlaybackRate(rate: number): void {
    (this.el.nativeElement as any).setPlaybackRate(rate);
  }

  /** Enters fullscreen mode. */
  public requestFullscreen(): void {
    (this.el.nativeElement as any).requestFullscreen();
  }

  /** Exits fullscreen mode. */
  public exitFullscreen(): void {
    (this.el.nativeElement as any).exitFullscreen();
  }

  /** Gets the native video element. */
  public getVideoElement(): HTMLVideoElement {
    return (this.el.nativeElement as any).getVideoElement();
  }

  /** Gets the current playback state. */
  public getState(): unknown {
    return (this.el.nativeElement as any).getState();
  }

  /** Exposes the native element for direct interaction. */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  private setNumericAttr(name: string, value: number | string | null | undefined) {
    if (value != null) {
      const numericValue = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(numericValue)) {
        this.renderer.setAttribute(this.el.nativeElement, name, numericValue.toString());
      }
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  private setBooleanAttr(name: string, value: boolean | string | null | undefined) {
    if (value === true || value === 'true' || value === '') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }

  ngOnDestroy() {
    this.eventCleanups.forEach(fn => fn());
  }
}
