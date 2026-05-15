import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaTabGroupComponent } from './tab-group.component';
import { WaTabComponent } from './tab.component';
import { WaTabPanelComponent } from './tab-panel.component';
import { WaTabContent } from './tab-content.directive';

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
      (wa-tab-show)="onTabShow($event)"
      (wa-tab-hide)="onTabHide($event)"
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

  it('should only render DOM content for the active wa-tab-panel and remove it for inactive ones', async () => {
    // Initial state: tab1 active, others inactive
    hostComponent.tab1Active = true;
    hostComponent.tab2Active = false;
    hostComponent.tab3Active = false;
    hostFixture.detectChanges();
    // Allow MutationObserver callbacks to fire
    await new Promise(resolve => setTimeout(resolve, 0));

    const p1: HTMLElement = tabPanelElements[0];
    const p2: HTMLElement = tabPanelElements[1];
    const p3: HTMLElement = tabPanelElements[2];

    expect(p1.textContent!.trim()).toContain('Content for Tab 1');
    expect(p2.textContent!.trim()).toBe('');
    expect(p3.textContent!.trim()).toBe('');

    // Toggle: make tab2 active, tab1 inactive
    hostComponent.tab1Active = false;
    hostComponent.tab2Active = true;
    hostComponent.activeTab = 'tab2';
    hostFixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(p1.textContent!.trim()).toBe('');
    expect(p2.textContent!.trim()).toContain('Content for Tab 2');
    expect(p3.textContent!.trim()).toBe('');

    // Toggle again: activate tab3
    hostComponent.tab2Active = false;
    hostComponent.tab3Active = true;
    hostComponent.activeTab = 'tab3';
    hostFixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(p1.textContent!.trim()).toBe('');
    expect(p2.textContent!.trim()).toBe('');
    expect(p3.textContent!.trim()).toContain('Content for Tab 3');
  });

  it('should handle ngModel binding', async () => {
    // Initial state
    expect(hostComponent.activeTab).toBe('tab1');
    expect(tabGroupElement.getAttribute('active')).toBe('tab1');

    // Update model -> view
    hostComponent.activeTab = 'tab2';
    hostFixture.detectChanges();
    await hostFixture.whenStable();
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

// ----------------------------------------------
// Additional lifecycle-focused tests
// ----------------------------------------------

@Component({
  selector: 'test-pane',
  template: `pane`,
  standalone: true
})
class TestPaneComponent implements OnInit, AfterViewInit, OnDestroy {
  static inits = 0;
  static viewInits = 0;
  static destroys = 0;

  ngOnInit(): void {
    TestPaneComponent.inits++;
  }
  ngAfterViewInit(): void {
    TestPaneComponent.viewInits++;
  }
  ngOnDestroy(): void {
    TestPaneComponent.destroys++;
  }
  static reset(): void {
    TestPaneComponent.inits = 0;
    TestPaneComponent.viewInits = 0;
    TestPaneComponent.destroys = 0;
  }
}

// Host using projected content (no <ng-template waTabContent>)
@Component({
  template: `
    <wa-tab-group [(ngModel)]="active">
      <wa-tab panel="a">A</wa-tab>
      <wa-tab panel="b">B</wa-tab>
      <wa-tab panel="c">C</wa-tab>

      <wa-tab-panel name="a" [active]="active==='a'">
        <test-pane></test-pane>
      </wa-tab-panel>
      <wa-tab-panel name="b" [active]="active==='b'">
        <test-pane></test-pane>
      </wa-tab-panel>
      <wa-tab-panel name="c" [active]="active==='c'">
        <test-pane></test-pane>
      </wa-tab-panel>
    </wa-tab-group>
  `,
  standalone: true,
  imports: [WaTabGroupComponent, WaTabComponent, WaTabPanelComponent, FormsModule, TestPaneComponent]
})
class ProjectedHostComponent {
  active: 'a' | 'b' | 'c' = 'a';
}

// Host using template-based lazy content (<ng-template waTabContent>)
@Component({
  template: `
    <wa-tab-group [(ngModel)]="active">
      <wa-tab panel="a">A</wa-tab>
      <wa-tab panel="b">B</wa-tab>
      <wa-tab panel="c">C</wa-tab>

      <wa-tab-panel name="a" [active]="active==='a'">
        <ng-template waTabContent>
          <test-pane></test-pane>
        </ng-template>
      </wa-tab-panel>
      <wa-tab-panel name="b" [active]="active==='b'">
        <ng-template waTabContent>
          <test-pane></test-pane>
        </ng-template>
      </wa-tab-panel>
      <wa-tab-panel name="c" [active]="active==='c'">
        <ng-template waTabContent>
          <test-pane></test-pane>
        </ng-template>
      </wa-tab-panel>
    </wa-tab-group>
  `,
  standalone: true,
  imports: [WaTabGroupComponent, WaTabComponent, WaTabPanelComponent, FormsModule, TestPaneComponent, WaTabContent]
})
class TemplateLazyLifecycleHostComponent {
  active: 'a' | 'b' | 'c' = 'a';
}

describe('Tab Panel component instantiation modes', () => {
  it('projected content: child components are instantiated eagerly for all panels', async () => {
    TestPaneComponent.reset();
    const fixture = await TestBed.configureTestingModule({
      imports: [ProjectedHostComponent]
    }).createComponent(ProjectedHostComponent);
    fixture.detectChanges();

    // All three TestPaneComponent instances are created at initial render
    expect(TestPaneComponent.inits).toBe(3);
    expect(TestPaneComponent.viewInits).toBe(3);

    // Switching active tab should not create new instances
    fixture.componentInstance.active = 'b';
    fixture.detectChanges();
    expect(TestPaneComponent.inits).toBe(3);
    expect(TestPaneComponent.viewInits).toBe(3);
    // No destroys happen merely due to our manual DOM movement approach
    expect(TestPaneComponent.destroys).toBe(0);
  });

  it('template-based lazy content: instantiate only the active panel component and destroy previous on switch', async () => {
    TestPaneComponent.reset();
    const fixture = await TestBed.configureTestingModule({
      imports: [TemplateLazyLifecycleHostComponent]
    }).createComponent(TemplateLazyLifecycleHostComponent);
    fixture.detectChanges();

    // Only the active tab's component is created
    expect(TestPaneComponent.inits).toBe(1);
    expect(TestPaneComponent.viewInits).toBe(1);
    expect(TestPaneComponent.destroys).toBe(0);

    // Switch to tab b
    fixture.componentInstance.active = 'b';
    fixture.detectChanges();
    expect(TestPaneComponent.inits).toBe(2);
    expect(TestPaneComponent.viewInits).toBe(2);
    expect(TestPaneComponent.destroys).toBe(1);

    // Switch to tab c
    fixture.componentInstance.active = 'c';
    fixture.detectChanges();
    expect(TestPaneComponent.inits).toBe(3);
    expect(TestPaneComponent.viewInits).toBe(3);
    expect(TestPaneComponent.destroys).toBe(2);
  });
});

// Additional host for non-lazy mode verification
@Component({
  template: `
    <wa-tab-group [(ngModel)]="activeTab">
      <wa-tab panel="tab1">Tab 1</wa-tab>
      <wa-tab panel="tab2">Tab 2</wa-tab>
      <wa-tab panel="tab3">Tab 3</wa-tab>

      <wa-tab-panel name="tab1" [active]="activeTab==='tab1'" [lazy]="false">
        Content 1
      </wa-tab-panel>
      <wa-tab-panel name="tab2" [active]="activeTab==='tab2'" [lazy]="false">
        Content 2
      </wa-tab-panel>
      <wa-tab-panel name="tab3" [active]="activeTab==='tab3'" [lazy]="false">
        Content 3
      </wa-tab-panel>
    </wa-tab-group>
  `,
  standalone: true,
  imports: [WaTabGroupComponent, WaTabComponent, WaTabPanelComponent, FormsModule]
})
class NonLazyHostComponent {
  activeTab = 'tab1';
}

// Additional host for template-based lazy content verification
@Component({
  template: `
    <wa-tab-group [(ngModel)]="activeTab">
      <wa-tab panel="tab1">Tab 1</wa-tab>
      <wa-tab panel="tab2">Tab 2</wa-tab>

      <wa-tab-panel name="tab1" [active]="activeTab==='tab1'">
        <ng-template waTabContent>
          <div class="tmpl-1">Tmpl 1</div>
        </ng-template>
      </wa-tab-panel>
      <wa-tab-panel name="tab2" [active]="activeTab==='tab2'">
        <ng-template waTabContent>
          <div class="tmpl-2">Tmpl 2</div>
        </ng-template>
      </wa-tab-panel>
    </wa-tab-group>
  `,
  standalone: true,
  imports: [WaTabGroupComponent, WaTabComponent, WaTabPanelComponent, WaTabContent, FormsModule]
})
class TemplateLazyHostComponent {
  activeTab = 'tab1';
}

describe('Tab Panel lazy modes', () => {
  it('non-lazy ([lazy]="false") should keep DOM for inactive panels', async () => {
    await TestBed.configureTestingModule({
      imports: [NonLazyHostComponent]
    }).compileComponents();

    const fix = TestBed.createComponent(NonLazyHostComponent);
    fix.detectChanges();

    const panels: NodeListOf<HTMLElement> = fix.nativeElement.querySelectorAll('wa-tab-panel');
    expect(panels.length).toBe(3);

    const [p1, p2, p3] = Array.from(panels);
    // Default active is tab1; but since lazy=false, all panels should have their content present
    expect(p1.textContent!.trim()).toContain('Content 1');
    expect(p2.textContent!.trim()).toContain('Content 2');
    expect(p3.textContent!.trim()).toContain('Content 3');

    // Switch active tab; DOM should still remain present for all
    const cmp = fix.componentInstance as NonLazyHostComponent;
    cmp.activeTab = 'tab2';
    fix.detectChanges();

    expect(p1.textContent!.trim()).toContain('Content 1');
    expect(p2.textContent!.trim()).toContain('Content 2');
    expect(p3.textContent!.trim()).toContain('Content 3');
  });

  it('template-based lazy (<ng-template waTabContent>) should render only active panel', async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateLazyHostComponent]
    }).compileComponents();

    const fix = TestBed.createComponent(TemplateLazyHostComponent);
    fix.detectChanges();

    const el: HTMLElement = fix.nativeElement as HTMLElement;
    const p1: HTMLElement = el.querySelector('wa-tab-panel[name="tab1"]')!;
    const p2: HTMLElement = el.querySelector('wa-tab-panel[name="tab2"]')!;

    // Initially active tab1
    expect(p1.querySelector('.tmpl-1')).not.toBeNull();
    expect(p2.querySelector('.tmpl-2')).toBeNull();

    // Switch to tab2
    const cmp = fix.componentInstance as TemplateLazyHostComponent;
    cmp.activeTab = 'tab2';
    fix.detectChanges();

    expect(p1.querySelector('.tmpl-1')).toBeNull();
    expect(p2.querySelector('.tmpl-2')).not.toBeNull();
  });
});
