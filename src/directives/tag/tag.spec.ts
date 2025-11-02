import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaTagDirective } from './tag.component';

// Create a test host component for the tag directive
@Component({
  selector: 'test-host',
  template: `
    <wa-tag
      ngModel
      [variant]="variant"
      [appearance]="appearance"
      [size]="size"
      [pill]="pill"
      [removable]="removable"
      (waRemove)="onRemove($event)"
    >
      {{ content }}
    </wa-tag>
  `,
  standalone: true,
  imports: [WaTagDirective, FormsModule]
})
class TestHostComponent {
  variant: 'brand' | 'neutral' | 'success' | 'warning' | 'danger' | 'inherit' = 'inherit';
  appearance: 'accent' | 'outlined accent' | 'filled' | 'outlined' | 'filled-outlined' = 'filled-outlined';
  size: 'small' | 'medium' | 'large' | 'inherit' = 'inherit';
  pill = false;
  removable = false;
  content = 'Tag Content';

  removeEventCalled = false;

  onRemove(event: Event) {
    this.removeEventCalled = true;
  }
}

describe('WaTagDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let tagElement: HTMLElement;

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

    // Get the wa-tag element
    tagElement = hostFixture.nativeElement.querySelector('wa-tag');
  });

  it('should create the tag directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(tagElement).toBeTruthy();
  });

  it('should set variant attribute correctly', () => {
    hostComponent.variant = 'brand';
    hostFixture.detectChanges();
    expect(tagElement.getAttribute('variant')).toBe('brand');

    hostComponent.variant = 'success';
    hostFixture.detectChanges();
    expect(tagElement.getAttribute('variant')).toBe('success');
  });

  it('should set appearance attribute correctly', () => {
    hostComponent.appearance = 'filled';
    hostFixture.detectChanges();
    expect(tagElement.getAttribute('appearance')).toBe('filled');

    hostComponent.appearance = 'outlined';
    hostFixture.detectChanges();
    expect(tagElement.getAttribute('appearance')).toBe('outlined');
  });

  it('should set size attribute correctly', () => {
    hostComponent.size = 'small';
    hostFixture.detectChanges();
    expect(tagElement.getAttribute('size')).toBe('small');

    hostComponent.size = 'large';
    hostFixture.detectChanges();
    expect(tagElement.getAttribute('size')).toBe('large');
  });

  it('should set boolean attributes correctly', () => {
    // Test pill attribute
    hostComponent.pill = true;
    hostFixture.detectChanges();
    expect(tagElement.hasAttribute('pill')).toBe(true);

    hostComponent.pill = false;
    hostFixture.detectChanges();
    expect(tagElement.hasAttribute('pill')).toBe(false);

    // Test removable attribute
    hostComponent.removable = true;
    hostFixture.detectChanges();
    expect(tagElement.hasAttribute('removable')).toBe(true);

    hostComponent.removable = false;
    hostFixture.detectChanges();
    expect(tagElement.hasAttribute('removable')).toBe(false);
  });

  it('should project content correctly', () => {
    expect(tagElement.textContent?.trim()).toBe('Tag Content');

    hostComponent.content = 'New Tag Content';
    hostFixture.detectChanges();
    expect(tagElement.textContent?.trim()).toBe('New Tag Content');
  });

  it('should emit remove event correctly', () => {
    // Simulate wa-remove event
    tagElement.dispatchEvent(new CustomEvent('wa-remove'));
    expect(hostComponent.removeEventCalled).toBe(true);
  });
});
