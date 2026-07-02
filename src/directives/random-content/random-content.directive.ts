import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, inject } from '@angular/core';

/**
 * WaRandomContentDirective
 *
 * Angular wrapper for the `<wa-random-content>` Web Awesome component (added in Web Awesome 3.10).
 *
 * Selects one or more child elements at random and displays them, hiding the rest.
 *
 * Features:
 * - Binds `items`, `mode`, `autoplay`, `autoplayInterval`, and `animation` inputs
 * - Exposes the `randomize()` method to programmatically pick a new selection
 * - Emits `wa-content-change` via the `waContentChange` output (and the hyphenated alias)
 * - Supports styling the entrance animation through CSS custom property inputs
 * - Supports default slot projection (the pool of children to choose from)
 *
 * Event binding:
 * Consumers can bind directly to the native DOM event: `(wa-content-change)="onChange($event)"`
 * or use the camelCase output `(waContentChange)="onChange($event)"`.
 */
@Directive({
  selector: 'wa-random-content',
  standalone: true
})
export class WaRandomContentDirective implements OnInit, OnChanges {
  /** Number of children to show simultaneously. Clamped to [1, childCount]. */
  @Input() items?: number | string;
  /** Selection strategy: `unique` (default), `random`, or `sequence`. */
  @Input() mode?: 'random' | 'unique' | 'sequence' | string;
  /** Rotate the content automatically. Set the cadence with `autoplayInterval`. */
  @Input() autoplay?: boolean | string;
  /** Autoplay cadence in milliseconds. */
  @Input() autoplayInterval?: number | string;
  /** Entrance animation for newly shown children. */
  @Input() animation?: 'none' | 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | string;

  // Styling inputs (CSS custom properties)
  /** Duration of the entrance animation. Maps to `--animation-duration`. */
  @Input() animationDuration?: string;
  /** Easing function for the entrance animation. Maps to `--animation-easing`. */
  @Input() animationEasing?: string;
  /** Translation distance for directional animations. Maps to `--animation-translate`. */
  @Input() animationTranslate?: string;

  // Event outputs
  @Output() waContentChange = new EventEmitter<CustomEvent>();
  @Output('wa-content-change') waContentChangeHyphen = this.waContentChange;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    this.applyInputs();
    this.renderer.listen(this.el.nativeElement, 'wa-content-change', (event: CustomEvent) => {
      this.waContentChange.emit(event);
    });
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  private applyInputs() {
    this.setAttr('items', this.items);
    this.setAttr('mode', this.mode);
    this.setAttr('animation', this.animation);
    this.setBooleanAttr('autoplay', this.autoplay);

    if (this.autoplayInterval != null && this.autoplayInterval !== '') {
      this.setAttr('autoplay-interval', this.autoplayInterval);
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'autoplay-interval');
    }

    this.setCssVar('--animation-duration', this.animationDuration);
    this.setCssVar('--animation-easing', this.animationEasing);
    this.setCssVar('--animation-translate', this.animationTranslate);
  }

  /**
   * Exposes the native random-content element for direct interaction.
   */
  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Selects a new set of children using the current mode.
   * Returns the elements now shown.
   */
  public randomize(): Element[] | undefined {
    const el: any = this.el.nativeElement;
    if (typeof el.randomize === 'function') {
      return el.randomize();
    }
    return undefined;
  }

  private setAttr(name: string, value: string | number | null | undefined) {
    if (value != null && value !== '') {
      this.renderer.setAttribute(this.el.nativeElement, name, String(value));
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

  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null && value !== '') {
      this.el.nativeElement.style.setProperty(name, value);
    } else {
      this.el.nativeElement.style.removeProperty(name);
    }
  }
}

