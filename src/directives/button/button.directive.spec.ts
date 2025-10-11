import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaButtonDirective } from './button.directive';

// Create a test host component to test the button directive
@Component({
  template: `
    <wa-button
      [variant]="variant"
      [appearance]="appearance"
      [size]="size"
      [pill]="pill"
      [caret]="caret"
      [disabled]="disabled"
      [loading]="loading"
      [type]="type"
      [name]="name"
      [value]="value"
      [href]="href"
      [target]="target"
      [rel]="rel"
      [download]="download"
      [form]="form"
      [formAction]="formAction"
      [formEnctype]="formEnctype"
      [formMethod]="formMethod"
      [formNoValidate]="formNoValidate"
      [formTarget]="formTarget"
      (blur)="onBlur($event)"
      (focus)="onFocus($event)"
      (waInvalid)="onInvalid($event)"
    >
      <div slot="start" *ngIf="showPrefix">Prefix</div>
      {{ buttonText }}
      <div slot="end" *ngIf="showSuffix">Suffix</div>
    </wa-button>
  `,
  standalone: true,
  imports: [WaButtonDirective]
})
class TestHostComponent {
  variant?: string;
  appearance?: string;
  size?: string;
  pill?: boolean;
  caret?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: string;
  name?: string;
  value?: string;
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
  form?: string;
  formAction?: string;
  formEnctype?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  buttonText = 'Button Text';
  showPrefix = false;
  showSuffix = false;

  onBlur(event: Event): void {}
  onFocus(event: Event): void {}
  onInvalid(event: Event): void {}
}

describe('WaButtonDirective', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let buttonElement: HTMLElement;
  let buttonDirective: WaButtonDirective;

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

    // Get the wa-button element
    buttonElement = hostFixture.nativeElement.querySelector('wa-button');
    buttonDirective = hostFixture.debugElement.query(sel => sel.nativeElement === buttonElement).injector.get(WaButtonDirective);
  });

  it('should create the button directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(buttonElement).toBeTruthy();
    expect(buttonDirective).toBeTruthy();
  });

  it('should set appearance attributes correctly', () => {
    hostComponent.variant = 'success';
    hostComponent.appearance = 'outlined';
    hostComponent.size = 'large';
    hostFixture.detectChanges();

    expect(buttonElement.getAttribute('variant')).toBe('success');
    expect(buttonElement.getAttribute('appearance')).toBe('outlined');
    expect(buttonElement.getAttribute('size')).toBe('large');
  });

  it('should set boolean attributes correctly', () => {
    hostComponent.pill = true;
    hostComponent.caret = true;
    hostComponent.disabled = true;
    hostComponent.loading = true;
    hostFixture.detectChanges();

    expect(buttonElement.hasAttribute('pill')).toBeTrue();
    expect(buttonElement.hasAttribute('caret')).toBeTrue();
    expect(buttonElement.hasAttribute('disabled')).toBeTrue();
    expect(buttonElement.hasAttribute('loading')).toBeTrue();
  });

  it('should not set boolean attributes when false', () => {
    hostComponent.pill = false;
    hostComponent.caret = false;
    hostFixture.detectChanges();

    expect(buttonElement.hasAttribute('pill')).toBeFalse();
    expect(buttonElement.hasAttribute('caret')).toBeFalse();
  });

  it('should set link attributes correctly', () => {
    hostComponent.href = 'https://example.com';
    hostComponent.target = '_blank';
    hostComponent.rel = 'noopener';
    hostComponent.download = 'file.pdf';
    hostFixture.detectChanges();

    expect(buttonElement.getAttribute('href')).toBe('https://example.com');
    expect(buttonElement.getAttribute('target')).toBe('_blank');
    expect(buttonElement.getAttribute('rel')).toBe('noopener');
    expect(buttonElement.getAttribute('download')).toBe('file.pdf');
  });

  it('should set form attributes correctly', () => {
    hostComponent.form = 'myForm';
    hostComponent.formAction = '/submit';
    hostComponent.formEnctype = 'multipart/form-data';
    hostComponent.formMethod = 'post';
    hostComponent.formNoValidate = true;
    hostComponent.formTarget = '_self';
    hostFixture.detectChanges();

    expect(buttonElement.getAttribute('form')).toBe('myForm');
    expect(buttonElement.getAttribute('formaction')).toBe('/submit');
    expect(buttonElement.getAttribute('formenctype')).toBe('multipart/form-data');
    expect(buttonElement.getAttribute('formmethod')).toBe('post');
    expect(buttonElement.hasAttribute('formnovalidate')).toBeTrue();
    expect(buttonElement.getAttribute('formtarget')).toBe('_self');
  });

  it('should project content correctly', () => {
    expect(buttonElement.textContent?.trim()).toBe('Button Text');

    hostComponent.showPrefix = true;
    hostComponent.showSuffix = true;
    hostFixture.detectChanges();

    const prefixSlot = hostFixture.nativeElement.querySelector('[slot="start"]');
    const suffixSlot = hostFixture.nativeElement.querySelector('[slot="end"]');

    expect(prefixSlot).toBeTruthy();
    expect(prefixSlot.textContent?.trim()).toBe('Prefix');
    expect(suffixSlot).toBeTruthy();
    expect(suffixSlot.textContent?.trim()).toBe('Suffix');
  });

  it('should expose methods for programmatic interaction', () => {
    // Mock the native element methods
    spyOn(buttonElement, 'click');
    spyOn(buttonElement, 'focus');
    spyOn(buttonElement, 'blur');

    // Call the directive methods
    buttonDirective.click();
    buttonDirective.focus();
    buttonDirective.blur();

    // Verify the native methods were called
    expect(buttonElement.click).toHaveBeenCalled();
    expect(buttonElement.focus).toHaveBeenCalled();
    expect(buttonElement.blur).toHaveBeenCalled();
  });

  it('should expose the native button element', () => {
    expect(buttonDirective.nativeButton).toBe(buttonElement);
  });

  it('should emit events correctly', () => {
    spyOn(hostComponent, 'onBlur');
    spyOn(hostComponent, 'onFocus');
    spyOn(hostComponent, 'onInvalid');

    // Create mock events
    const blurEvent = new Event('blur');
    const focusEvent = new Event('focus');
    const invalidEvent = new Event('waInvalid');

    // Dispatch events on the native element
    buttonElement.dispatchEvent(blurEvent);
    buttonElement.dispatchEvent(focusEvent);
    buttonElement.dispatchEvent(invalidEvent);

    // Verify the host component event handlers were called
    expect(hostComponent.onBlur).toHaveBeenCalled();
    expect(hostComponent.onFocus).toHaveBeenCalled();
    expect(hostComponent.onInvalid).toHaveBeenCalled();
  });
  it('should open dialog by id on click even if dialog is added later', () => {
    // Ensure no dialog initially
    expect(document.getElementById('testDialog')).toBeFalsy();

    // Set data-dialog attribute after init to simulate dynamic usage
    buttonElement.setAttribute('data-dialog', 'open testDialog');

    // Create dialog element later (after button init)
    const dialogEl: any = document.createElement('wa-dialog');
    dialogEl.id = 'testDialog';
    dialogEl.show = jasmine.createSpy('show');
    dialogEl.hide = jasmine.createSpy('hide');
    document.body.appendChild(dialogEl);

    // Click the button
    buttonElement.click();

    expect(dialogEl.show).toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(dialogEl);
  });

  it('should update variant and appearance when inputs change', () => {
    // Initial values
    hostComponent.variant = 'neutral';
    hostComponent.appearance = 'filled';
    hostFixture.detectChanges();
    expect(buttonElement.getAttribute('variant')).toBe('neutral');
    expect(buttonElement.getAttribute('appearance')).toBe('filled');

    // Update values
    hostComponent.variant = 'danger';
    hostComponent.appearance = 'outlined';
    hostFixture.detectChanges();

    expect(buttonElement.getAttribute('variant')).toBe('danger');
    expect(buttonElement.getAttribute('appearance')).toBe('outlined');
  });
});
