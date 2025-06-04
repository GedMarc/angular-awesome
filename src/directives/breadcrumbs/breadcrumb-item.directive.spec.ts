import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaBreadcrumbItemDirective } from './breadcrumb-item.directive';

// Create a test host component to test the breadcrumb-item directive
@Component({
  template: `
    <wa-breadcrumb-item
      [href]="href"
      [target]="target"
      [rel]="rel"
    >
      <div slot="prefix" *ngIf="showPrefix">Prefix Icon</div>
      <div slot="suffix" *ngIf="showSuffix">Suffix Icon</div>
      <div slot="separator" *ngIf="showSeparator">Custom Separator</div>
      {{ content }}
    </wa-breadcrumb-item>
  `,
  standalone: true,
  imports: [WaBreadcrumbItemDirective]
})
class TestHostComponent {
  href?: string;
  target?: '_blank' | '_parent' | '_self' | '_top';
  rel: string = 'noreferrer noopener';
  content: string = 'Breadcrumb Item';
  showPrefix = false;
  showSuffix = false;
  showSeparator = false;
}

describe('WaBreadcrumbItemDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let breadcrumbItemElement: HTMLElement;

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

    // Get the wa-breadcrumb-item element
    breadcrumbItemElement = hostFixture.nativeElement.querySelector('wa-breadcrumb-item');
  });

  it('should create the breadcrumb-item directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(breadcrumbItemElement).toBeTruthy();
  });

  it('should set href attribute correctly', () => {
    hostComponent.href = '/home';
    hostFixture.detectChanges();
    expect(breadcrumbItemElement.getAttribute('href')).toBe('/home');
  });

  it('should set target attribute correctly', () => {
    hostComponent.target = '_blank';
    hostFixture.detectChanges();
    expect(breadcrumbItemElement.getAttribute('target')).toBe('_blank');
  });

  it('should set rel attribute correctly', () => {
    hostComponent.rel = 'nofollow';
    hostFixture.detectChanges();
    expect(breadcrumbItemElement.getAttribute('rel')).toBe('nofollow');
  });

  it('should project content into default slot correctly', () => {
    hostComponent.content = 'Home';
    hostFixture.detectChanges();
    expect(breadcrumbItemElement.textContent?.trim()).toBe('Home');
  });

  it('should project content into slot="prefix" correctly', () => {
    hostComponent.showPrefix = true;
    hostFixture.detectChanges();

    const slotContent = hostFixture.nativeElement.querySelector('[slot="prefix"]');
    expect(slotContent).toBeTruthy();
    expect(slotContent.textContent?.trim()).toBe('Prefix Icon');
  });

  it('should project content into slot="suffix" correctly', () => {
    hostComponent.showSuffix = true;
    hostFixture.detectChanges();

    const slotContent = hostFixture.nativeElement.querySelector('[slot="suffix"]');
    expect(slotContent).toBeTruthy();
    expect(slotContent.textContent?.trim()).toBe('Suffix Icon');
  });

  it('should project content into slot="separator" correctly', () => {
    hostComponent.showSeparator = true;
    hostFixture.detectChanges();

    const slotContent = hostFixture.nativeElement.querySelector('[slot="separator"]');
    expect(slotContent).toBeTruthy();
    expect(slotContent.textContent?.trim()).toBe('Custom Separator');
  });
});
