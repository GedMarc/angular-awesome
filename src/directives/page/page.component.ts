import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef, OnChanges, Renderer2
} from '@angular/core';

@Component({
  selector: 'wa-page',
  templateUrl: './page.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class WaPageComponent implements OnChanges {
  constructor(private el: ElementRef<HTMLElement>,private renderer: Renderer2) {}

  @Input() mobileBreakpoint?: string | number;
  @Input() navOpen?: boolean;
  @Input() disableSticky?: string;
  @Input() navigationPlacement?: 'start' | 'end';

  @Input() menuWidth?: string;
  @Input() mainWidth?: string;
  @Input() asideWidth?: string;
  @Input() bannerHeight?: string;
  @Input() headerHeight?: string;
  @Input() subheaderHeight?: string;

  get view(): 'mobile' | 'desktop' | null {
    return this.el.nativeElement.getAttribute('view') as 'mobile' | 'desktop' | null;
  }

  ngOnChanges(): void {
    const el = this.el.nativeElement;

    if (this.mobileBreakpoint !== undefined) {
      el.setAttribute('mobile-breakpoint', this.mobileBreakpoint.toString());
    }
    if (this.navOpen !== undefined) {
      if (this.navOpen) {
        el.setAttribute('nav-open', '');
      } else {
        el.removeAttribute('nav-open');
      }
    }
    if (this.disableSticky !== undefined) {
      el.setAttribute('disable-sticky', this.disableSticky);
    }
    if (this.navigationPlacement !== undefined) {
      el.setAttribute('navigation-placement', this.navigationPlacement);
    }

    this.setCssVar('--menu-width', this.menuWidth || '');
    this.setCssVar('--main-width', this.mainWidth || '');
    this.setCssVar('--aside-width', this.asideWidth || '');
    this.setCssVar('--banner-height', this.bannerHeight || '');
    this.setCssVar('--header-height', this.headerHeight || '');
    this.setCssVar('--subheader-height', this.subheaderHeight || '');
  }

  showNavigation() {
    (this.el.nativeElement as any).showNavigation?.();
  }

  hideNavigation() {
    (this.el.nativeElement as any).hideNavigation?.();
  }

  toggleNavigation() {
    (this.el.nativeElement as any).toggleNavigation?.();
  }

  private setCssVar(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setStyle(this.el.nativeElement, name, value);
    }
  }
}
