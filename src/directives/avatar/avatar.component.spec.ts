import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaAvatarDirective } from './avatar.component';

// Create a test host component to test the avatar directive
@Component({
  template: `
    <wa-avatar
      [image]="image"
      [label]="label"
      [initials]="initials"
      [shape]="shape"
      [loading]="loading"
      [fontSize]="fontSize"
      [size]="size"
      [backgroundColor]="backgroundColor"
      [textColor]="textColor"
    >
      <div slot="icon" *ngIf="showIcon">Custom Icon</div>
    </wa-avatar>
  `,
  standalone: true,
  imports: [WaAvatarDirective]
})
class TestHostComponent {
  image?: string;
  label?: string;
  initials?: string;
  shape: 'circle' | 'square' | 'rounded' = 'circle';
  loading: 'lazy' | 'eager' = 'eager';
  fontSize?: string;
  size?: string;
  backgroundColor?: string;
  textColor?: string;
  showIcon = false;
}

describe('WaAvatarDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let avatarElement: HTMLElement;

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

    // Get the wa-avatar element
    avatarElement = hostFixture.nativeElement.querySelector('wa-avatar');
  });

  it('should create the avatar directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(avatarElement).toBeTruthy();
  });

  it('should set image attribute correctly', () => {
    hostComponent.image = 'avatar.jpg';
    hostFixture.detectChanges();
    expect(avatarElement.getAttribute('image')).toBe('avatar.jpg');
  });

  it('should set label attribute correctly', () => {
    hostComponent.label = 'User Avatar';
    hostFixture.detectChanges();
    expect(avatarElement.getAttribute('label')).toBe('User Avatar');
  });

  it('should set initials attribute correctly', () => {
    hostComponent.initials = 'JD';
    hostFixture.detectChanges();
    expect(avatarElement.getAttribute('initials')).toBe('JD');
  });

  it('should set shape attribute correctly', () => {
    hostComponent.shape = 'square';
    hostFixture.detectChanges();
    expect(avatarElement.getAttribute('shape')).toBe('square');
  });

  it('should set loading attribute correctly', () => {
    hostComponent.loading = 'lazy';
    hostFixture.detectChanges();
    expect(avatarElement.getAttribute('loading')).toBe('lazy');
  });

  it('should set font-size style when fontSize is provided', () => {
    hostComponent.fontSize = 'var(--wa-font-size-m)';
    hostFixture.detectChanges();
    expect(avatarElement.style.fontSize).toBe('var(--wa-font-size-m)');
  });

  it('should set --size CSS variable when size is provided', () => {
    hostComponent.size = '3rem';
    hostFixture.detectChanges();
    expect(avatarElement.style.getPropertyValue('--size')).toBe('3rem');
  });

  it('should set custom CSS variables when provided', () => {
    hostComponent.backgroundColor = '#cccccc';
    hostComponent.textColor = '#333333';
    hostFixture.detectChanges();

    expect(avatarElement.style.getPropertyValue('--background-color')).toBe('#cccccc');
    expect(avatarElement.style.getPropertyValue('--text-color')).toBe('#333333');
  });

  it('should project content into slot="icon" correctly', () => {
    hostComponent.showIcon = true;
    hostFixture.detectChanges();

    const slotContent = hostFixture.nativeElement.querySelector('[slot="icon"]');
    expect(slotContent).toBeTruthy();
    expect(slotContent.textContent?.trim()).toBe('Custom Icon');
  });
});
