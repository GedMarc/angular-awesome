import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaBreadcrumbDirective } from './breadcrumb.directive';

// Create a test host component to test the breadcrumb directive
@Component({
  template: `
    <wa-breadcrumb
      [label]="label"
    >
      <div slot="separator" *ngIf="showSeparator">Custom Separator</div>
      <ng-content></ng-content>
    </wa-breadcrumb>
  `,
  standalone: true,
  imports: [WaBreadcrumbDirective]
})
class TestHostComponent {
  label?: string;
  showSeparator = false;
}

describe('WaBreadcrumbDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let breadcrumbElement: HTMLElement;

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

    // Get the wa-breadcrumb element
    breadcrumbElement = hostFixture.nativeElement.querySelector('wa-breadcrumb');
  });

  it('should create the breadcrumb directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(breadcrumbElement).toBeTruthy();
  });

  it('should set label attribute correctly', () => {
    hostComponent.label = 'Site Navigation';
    hostFixture.detectChanges();
    expect(breadcrumbElement.getAttribute('label')).toBe('Site Navigation');
  });

  it('should project content into slot="separator" correctly', () => {
    hostComponent.showSeparator = true;
    hostFixture.detectChanges();

    const slotContent = hostFixture.nativeElement.querySelector('[slot="separator"]');
    expect(slotContent).toBeTruthy();
    expect(slotContent.textContent?.trim()).toBe('Custom Separator');
  });
});
