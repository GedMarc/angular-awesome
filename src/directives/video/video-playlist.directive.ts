import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, Renderer2, inject } from '@angular/core';

/**
 * WaVideoPlaylistDirective
 *
 * Angular wrapper for the <wa-video-playlist> Web Component.
 * Video playlist wraps multiple videos into a playlist with navigation controls and a sidebar.
 *
 * Features:
 * - Binds all supported attributes as @Input() properties
 * - Supports controls and iconLibrary configuration
 * - Emits wa-video-change event when the active video changes
 * - Provides programmatic methods (next, previous, goTo)
 * - Allows slot projection for <wa-video> elements
 * - Supports custom styling via CSS custom properties
 */
@Directive({
  selector: 'wa-video-playlist',
  standalone: true
})
export class WaVideoPlaylistDirective implements OnInit, OnChanges, OnDestroy {
  /** The controls preset forwarded to each child <wa-video>. */
  @Input() controls?: 'none' | 'standard' | 'full' | string;

  /** Icon library used for placeholder icons. */
  @Input() iconLibrary?: string;

  // Event outputs
  @Output() waVideoChange = new EventEmitter<Event>();
  @Output('wa-video-change') waVideoChangeHyphen = this.waVideoChange;

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
    this.setAttr('icon-library', this.iconLibrary);
  }

  private setupEventListeners() {
    const native = this.el.nativeElement;
    this.eventCleanups.push(
      this.renderer.listen(native, 'wa-video-change', (e: Event) => this.waVideoChange.emit(e)),
    );
  }

  /** Plays the next video in the playlist. */
  public next(): void {
    (this.el.nativeElement as any).next();
  }

  /** Plays the previous video in the playlist. */
  public previous(): void {
    (this.el.nativeElement as any).previous();
  }

  /** Jumps to the video at the given index. */
  public goTo(index: number): void {
    (this.el.nativeElement as any).goTo(index);
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

  ngOnDestroy() {
    this.eventCleanups.forEach(fn => fn());
  }
}
