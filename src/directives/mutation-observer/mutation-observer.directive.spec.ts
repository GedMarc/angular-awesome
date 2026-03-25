import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaMutationObserverDirective } from './mutation-observer.directive';

@Component({
  template: `
    <wa-mutation-observer
      [attr]="attr"
      [attrOldValue]="attrOldValue"
      [charData]="charData"
      [charDataOldValue]="charDataOldValue"
      [childList]="childList"
      [disabled]="disabled"
    >
      <div class="observed-content">Observed Content</div>
    </wa-mutation-observer>
  `,
  standalone: true,
  imports: [WaMutationObserverDirective]
})
class TestHostComponent {
  attr?: string;
  attrOldValue?: boolean | string;
  charData?: boolean | string;
  charDataOldValue?: boolean | string;
  childList?: boolean | string;
  disabled?: boolean | string;
}

describe('WaMutationObserverDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let observerElement: HTMLElement;

  beforeEach(async () => {
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

    observerElement = hostFixture.nativeElement.querySelector('wa-mutation-observer');
  });

  it('should create the directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(observerElement).toBeTruthy();
  });

  it('should set attr attribute', () => {
    hostComponent.attr = '*';
    hostFixture.detectChanges();
    expect(observerElement.getAttribute('attr')).toBe('*');

    hostComponent.attr = 'class style';
    hostFixture.detectChanges();
    expect(observerElement.getAttribute('attr')).toBe('class style');
  });

  it('should set attr-old-value boolean attribute', () => {
    hostComponent.attrOldValue = true;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('attr-old-value')).toBeTrue();

    hostComponent.attrOldValue = false;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('attr-old-value')).toBeFalse();
  });

  it('should set char-data boolean attribute', () => {
    hostComponent.charData = true;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('char-data')).toBeTrue();

    hostComponent.charData = false;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('char-data')).toBeFalse();
  });

  it('should set char-data-old-value boolean attribute', () => {
    hostComponent.charDataOldValue = true;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('char-data-old-value')).toBeTrue();

    hostComponent.charDataOldValue = false;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('char-data-old-value')).toBeFalse();
  });

  it('should set child-list boolean attribute', () => {
    hostComponent.childList = true;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('child-list')).toBeTrue();

    hostComponent.childList = false;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('child-list')).toBeFalse();
  });

  it('should set disabled boolean attribute', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('disabled')).toBeTrue();

    hostComponent.disabled = false;
    hostFixture.detectChanges();
    expect(observerElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should handle string values for boolean attributes', () => {
    hostComponent.attrOldValue = 'true';
    hostComponent.charData = '';
    hostComponent.childList = 'true';
    hostFixture.detectChanges();

    expect(observerElement.hasAttribute('attr-old-value')).toBeTrue();
    expect(observerElement.hasAttribute('char-data')).toBeTrue();
    expect(observerElement.hasAttribute('child-list')).toBeTrue();
  });

  it('should project content correctly', () => {
    expect(observerElement.textContent).toContain('Observed Content');
  });
});

