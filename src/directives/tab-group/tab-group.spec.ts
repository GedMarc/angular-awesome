import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaTabGroupComponent } from './tab-group.component';
import { WaTabComponent } from './tab.component';
import { WaTabPanelComponent } from './tab-panel.component';

// Create a test host component for the tab group components
@Component({
  template: `
    <wa-tab-group
      [placement]="placement"
      [activation]="activation"
      [withoutScrollControls]="withoutScrollControls"
      [(ngModel)]="activeTab"
      [indicatorColor]="indicatorColor"
      [trackColor]="trackColor"
      [trackWidth]="trackWidth"
      (tabShow)="onTabShow($event)"
      (tabHide)="onTabHide($event)"
    >
      <wa-tab panel="tab1" [disabled]="tab1Disabled" [activeTabColor]="tab1ActiveColor">Tab 1</wa-tab>
      <wa-tab panel="tab2" [disabled]="tab2Disabled" [activeTabColor]="tab2ActiveColor">Tab 2</wa-tab>
      <wa-tab panel="tab3" [disabled]="tab3Disabled">Tab 3</wa-tab>

      <wa-tab-panel name="tab1" [active]="tab1Active" [padding]="tab1Padding">
        Content for Tab 1
      </wa-tab-panel>
      <wa-tab-panel name="tab2" [active]="tab2Active" [padding]="tab2Padding">
        Content for Tab 2
      </wa-tab-panel>
      <wa-tab-panel name="tab3" [active]="tab3Active">
        Content for Tab 3
      </wa-tab-panel>
    </wa-tab-group>
  `,
  standalone: true,
  imports: [WaTabGroupComponent, WaTabComponent, WaTabPanelComponent, FormsModule]
})
class TestHostComponent {
  // Tab Group properties
  placement: 'top' | 'bottom' | 'start' | 'end' = 'top';
  activation: 'auto' | 'manual' = 'auto';
  withoutScrollControls = false;
  activeTab = 'tab1';
  indicatorColor?: string;
  trackColor?: string;
  trackWidth?: string;

  // Tab properties
  tab1Disabled = false;
  tab2Disabled = false;
  tab3Disabled = false;
  tab1ActiveColor?: string;
  tab2ActiveColor?: string;

  // Tab Panel properties
  tab1Active = true;
  tab2Active = false;
  tab3Active = false;
  tab1Padding?: string;
  tab2Padding?: string;

  // Event tracking
  tabShowCalled = false;
  tabHideCalled = false;
  lastShownTab?: string;
  lastHiddenTab?: string;

  onTabShow(event: CustomEvent) {
    this.tabShowCalled = true;
    this.lastShownTab = event.detail?.name;
  }

  onTabHide(event: CustomEvent) {
    this.tabHideCalled = true;
    this.lastHiddenTab = event.detail?.name;
  }
}

describe('Tab Group Components', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let tabGroupElement: HTMLElement;
  let tabElements: NodeListOf<HTMLElement>;
  let tabPanelElements: NodeListOf<HTMLElement>;

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

    // Get the elements
    tabGroupElement = hostFixture.nativeElement.querySelector('wa-tab-group');
    tabElements = hostFixture.nativeElement.querySelectorAll('wa-tab');
    tabPanelElements = hostFixture.nativeElement.querySelectorAll('wa-tab-panel');
  });

  it('should create the tab group components', () => {
    expect(hostComponent).toBeTruthy();
    expect(tabGroupElement).toBeTruthy();
    expect(tabElements.length).toBe(3);
    expect(tabPanelElements.length).toBe(3);
  });

  it('should set tab group attributes correctly', () => {
    hostComponent.placement = 'bottom';
    hostComponent.activation = 'manual';
    hostComponent.withoutScrollControls = true;
    hostFixture.detectChanges();

    expect(tabGroupElement.getAttribute('placement')).toBe('bottom');
    expect(tabGroupElement.getAttribute('activation')).toBe('manual');
    expect(tabGroupElement.hasAttribute('without-scroll-controls')).toBe(true);
  });

  it('should set tab attributes correctly', () => {
    hostComponent.tab1Disabled = true;
    hostFixture.detectChanges();

    expect(tabElements[0].hasAttribute('disabled')).toBe(true);
    expect(tabElements[1].hasAttribute('disabled')).toBe(false);

    expect(tabElements[0].getAttribute('panel')).toBe('tab1');
    expect(tabElements[1].getAttribute('panel')).toBe('tab2');
  });

  it('should set tab panel attributes correctly', () => {
    hostComponent.tab1Active = false;
    hostComponent.tab2Active = true;
    hostFixture.detectChanges();

    expect(tabPanelElements[0].hasAttribute('active')).toBe(false);
    expect(tabPanelElements[1].hasAttribute('active')).toBe(true);

    expect(tabPanelElements[0].getAttribute('name')).toBe('tab1');
    expect(tabPanelElements[1].getAttribute('name')).toBe('tab2');
  });

  it('should set style properties correctly', () => {
    hostComponent.indicatorColor = '#2196F3';
    hostComponent.trackColor = '#e0e0e0';
    hostComponent.trackWidth = '2px';
    hostComponent.tab1ActiveColor = '#4CAF50';
    hostComponent.tab1Padding = '24px';
    hostFixture.detectChanges();

    expect(tabGroupElement.style.getPropertyValue('--indicator-color')).toBe('#2196F3');
    expect(tabGroupElement.style.getPropertyValue('--track-color')).toBe('#e0e0e0');
    expect(tabGroupElement.style.getPropertyValue('--track-width')).toBe('2px');

    expect(tabElements[0].style.getPropertyValue('--active-tab-color')).toBe('#4CAF50');

    expect(tabPanelElements[0].style.getPropertyValue('--padding')).toBe('24px');
  });

  it('should handle ngModel binding', () => {
    // Initial state
    expect(hostComponent.activeTab).toBe('tab1');
    expect(tabGroupElement.getAttribute('active')).toBe('tab1');

    // Update model -> view
    hostComponent.activeTab = 'tab2';
    hostFixture.detectChanges();
    expect(tabGroupElement.getAttribute('active')).toBe('tab2');
  });

  it('should emit events correctly', () => {
    // Simulate tab show event
    tabGroupElement.dispatchEvent(new CustomEvent('wa-tab-show', {
      detail: { name: 'tab2' }
    }));
    expect(hostComponent.tabShowCalled).toBe(true);
    expect(hostComponent.lastShownTab).toBe('tab2');

    // Simulate tab hide event
    tabGroupElement.dispatchEvent(new CustomEvent('wa-tab-hide', {
      detail: { name: 'tab1' }
    }));
    expect(hostComponent.tabHideCalled).toBe(true);
    expect(hostComponent.lastHiddenTab).toBe('tab1');
  });
});
