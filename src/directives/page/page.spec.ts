import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaPageComponent } from './page.component';

// Create a test host component for the page component
@Component({
  template: `
    <wa-page
      [mobileBreakpoint]="mobileBreakpoint"
      [navOpen]="navOpen"
      [disableSticky]="disableSticky"
      [navigationPlacement]="navigationPlacement"
      [menuWidth]="menuWidth"
      [mainWidth]="mainWidth"
      [asideWidth]="asideWidth"
      [bannerHeight]="bannerHeight"
      [headerHeight]="headerHeight"
      [subheaderHeight]="subheaderHeight"
    >
      <a href="#main-content" waPageSkipToContent>Skip to content</a>
      <div waPageBanner>Banner content</div>
      <header waPageHeader>Header content</header>
      <div waPageSubheader>Subheader content</div>
      <header waPageNavigationHeader>Navigation header</header>
      <nav waPageNavigation>Navigation content</nav>
      <footer waPageNavigationFooter>Navigation footer</footer>
      <div waPageMenu>Menu content</div>
      <header waPageMainHeader>Main header</header>
      <main id="main-content">Main content</main>
      <footer waPageMainFooter>Main footer</footer>
      <aside waPageAside>Aside content</aside>
      <footer waPageFooter>Footer content</footer>
      <div waPageDialogWrapper>Dialog wrapper</div>
    </wa-page>
  `,
  standalone: true,
  imports: [WaPageComponent]
})
class TestHostComponent {
  mobileBreakpoint?: string | number;
  navOpen?: boolean;
  disableSticky?: string;
  navigationPlacement?: 'start' | 'end';

  menuWidth?: string;
  mainWidth?: string;
  asideWidth?: string;
  bannerHeight?: string;
  headerHeight?: string;
  subheaderHeight?: string;
}

describe('WaPageComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let pageElement: HTMLElement;

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

    // Get the wa-page element
    pageElement = hostFixture.nativeElement.querySelector('wa-page');
  });

  it('should create the page component', () => {
    expect(hostComponent).toBeTruthy();
    expect(pageElement).toBeTruthy();
  });

  it('should set mobile breakpoint attribute correctly', () => {
    hostComponent.mobileBreakpoint = '768px';
    hostFixture.detectChanges();
    expect(pageElement.getAttribute('mobile-breakpoint')).toBe('768px');

    hostComponent.mobileBreakpoint = 768;
    hostFixture.detectChanges();
    expect(pageElement.getAttribute('mobile-breakpoint')).toBe('768');
  });

  it('should set nav open attribute correctly', () => {
    hostComponent.navOpen = true;
    hostFixture.detectChanges();
    expect(pageElement.hasAttribute('nav-open')).toBe(true);

    hostComponent.navOpen = false;
    hostFixture.detectChanges();
    expect(pageElement.hasAttribute('nav-open')).toBe(false);
  });

  it('should set disable sticky attribute correctly', () => {
    hostComponent.disableSticky = 'header';
    hostFixture.detectChanges();
    expect(pageElement.getAttribute('disable-sticky')).toBe('header');

    hostComponent.disableSticky = 'header,footer';
    hostFixture.detectChanges();
    expect(pageElement.getAttribute('disable-sticky')).toBe('header,footer');
  });

  it('should set navigation placement attribute correctly', () => {
    hostComponent.navigationPlacement = 'start';
    hostFixture.detectChanges();
    expect(pageElement.getAttribute('navigation-placement')).toBe('start');

    hostComponent.navigationPlacement = 'end';
    hostFixture.detectChanges();
    expect(pageElement.getAttribute('navigation-placement')).toBe('end');
  });

  it('should set style properties correctly', () => {
    hostComponent.menuWidth = '300px';
    hostComponent.mainWidth = '800px';
    hostComponent.asideWidth = '250px';
    hostComponent.bannerHeight = '50px';
    hostComponent.headerHeight = '80px';
    hostComponent.subheaderHeight = '40px';
    hostFixture.detectChanges();

    expect(pageElement.style.getPropertyValue('--menu-width')).toBe('300px');
    expect(pageElement.style.getPropertyValue('--main-width')).toBe('800px');
    expect(pageElement.style.getPropertyValue('--aside-width')).toBe('250px');
    expect(pageElement.style.getPropertyValue('--banner-height')).toBe('50px');
    expect(pageElement.style.getPropertyValue('--header-height')).toBe('80px');
    expect(pageElement.style.getPropertyValue('--subheader-height')).toBe('40px');
  });

  it('should project content correctly', () => {
    // Check that all content projection slots are working
    expect(pageElement.querySelector('[waPageSkipToContent]')).toBeTruthy();
    expect(pageElement.querySelector('[waPageBanner]')).toBeTruthy();
    expect(pageElement.querySelector('[waPageHeader]')).toBeTruthy();
    expect(pageElement.querySelector('[waPageSubheader]')).toBeTruthy();
    expect(pageElement.querySelector('[waPageNavigationHeader]')).toBeTruthy();
    expect(pageElement.querySelector('[waPageNavigation]')).toBeTruthy();
    expect(pageElement.querySelector('[waPageNavigationFooter]')).toBeTruthy();
    expect(pageElement.querySelector('[waPageMenu]')).toBeTruthy();
    expect(pageElement.querySelector('[waPageMainHeader]')).toBeTruthy();
    expect(pageElement.querySelector('main')).toBeTruthy();
    expect(pageElement.querySelector('[waPageMainFooter]')).toBeTruthy();
    expect(pageElement.querySelector('[waPageAside]')).toBeTruthy();
    expect(pageElement.querySelector('[waPageFooter]')).toBeTruthy();
    expect(pageElement.querySelector('[waPageDialogWrapper]')).toBeTruthy();
  });

  it('should have a view getter that returns the current view', () => {
    const pageComponent = hostFixture.debugElement.query(sel => sel.name === 'wa-page').componentInstance;

    // Mock the view attribute
    pageElement.setAttribute('view', 'mobile');
    expect(pageComponent.view).toBe('mobile');

    pageElement.setAttribute('view', 'desktop');
    expect(pageComponent.view).toBe('desktop');

    pageElement.removeAttribute('view');
    expect(pageComponent.view).toBeNull();
  });

  // Test the navigation methods
  it('should have methods to control navigation', () => {
    const pageComponent = hostFixture.debugElement.query(sel => sel.name === 'wa-page').componentInstance;

    // Mock the native element methods
    const nativeElement = pageComponent.el.nativeElement;
    nativeElement.showNavigation = jasmine.createSpy('showNavigation');
    nativeElement.hideNavigation = jasmine.createSpy('hideNavigation');
    nativeElement.toggleNavigation = jasmine.createSpy('toggleNavigation');

    // Call the methods
    pageComponent.showNavigation();
    expect(nativeElement.showNavigation).toHaveBeenCalled();

    pageComponent.hideNavigation();
    expect(nativeElement.hideNavigation).toHaveBeenCalled();

    pageComponent.toggleNavigation();
    expect(nativeElement.toggleNavigation).toHaveBeenCalled();
  });
});
