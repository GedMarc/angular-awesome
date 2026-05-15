

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaDialogDirective } from './dialog.directive';
import { WaDialogContent } from './dialog-content.directive';

// Additional host components for alias testing
@Component({
  template: `<wa-dialog [light-dismiss]="ld"></wa-dialog>`,
  standalone: true,
  imports: [WaDialogDirective]
})
class KebabCaseHostComponent { ld = true; }

@Component({
  template: `<wa-dialog [lightdismiss]="ld"></wa-dialog>`,
  standalone: true,
  imports: [WaDialogDirective]
})
class NoDashHostComponent { ld = true; }

// Additional tests for input aliasing
describe('WaDialogDirective input aliasing', () => {
  it('should accept kebab-case [light-dismiss] binding and reflect attribute', async () => {
    await TestBed.configureTestingModule({
      imports: [KebabCaseHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(KebabCaseHostComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('wa-dialog');
    expect(el).toBeTruthy();
    expect(el.hasAttribute('light-dismiss')).toBeTrue();
  });

  it('should accept no-dash [lightdismiss] binding and reflect attribute', async () => {
    await TestBed.configureTestingModule({
      imports: [NoDashHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(NoDashHostComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('wa-dialog');
    expect(el).toBeTruthy();
    expect(el.hasAttribute('light-dismiss')).toBeTrue();
  });
});


// Static attribute host components for testing bare attributes
@Component({
  template: `<wa-dialog light-dismiss></wa-dialog>`,
  standalone: true,
  imports: [WaDialogDirective]
})
class StaticKebabHostComponent {}

@Component({
  template: `<wa-dialog lightdismiss></wa-dialog>`,
  standalone: true,
  imports: [WaDialogDirective]
})
class StaticNoDashHostComponent {}

// Tests for static/bare attribute presence
describe('WaDialogDirective static attribute handling', () => {
  it('should reflect bare light-dismiss attribute on rendered element', async () => {
    await TestBed.configureTestingModule({
      imports: [StaticKebabHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(StaticKebabHostComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('wa-dialog');
    expect(el).toBeTruthy();
    expect(el.hasAttribute('light-dismiss')).toBeTrue();
  });

  it('should accept bare no-dash lightdismiss and reflect as light-dismiss', async () => {
    await TestBed.configureTestingModule({
      imports: [StaticNoDashHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(StaticNoDashHostComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('wa-dialog');
    expect(el).toBeTruthy();
    expect(el.hasAttribute('light-dismiss')).toBeTrue();
  });
});

// Host component for testing waDialogContent lazy instantiation
@Component({
  template: `
    <wa-dialog [(open)]="open">
      <ng-template waDialogContent>
        <div class="lazy-block">Lazy Content</div>
      </ng-template>
    </wa-dialog>
  `,
  standalone: true,
  imports: [WaDialogDirective, WaDialogContent]
})
class LazyHostComponent { open = false; }

describe('WaDialogDirective with waDialogContent (true lazy)', () => {
  let hostFixture: ComponentFixture<LazyHostComponent>;
  let hostComponent: LazyHostComponent;
  let dialogElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LazyHostComponent] }).compileComponents();
    hostFixture = TestBed.createComponent(LazyHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
    dialogElement = hostFixture.nativeElement.querySelector('wa-dialog');
  });

  it('should not instantiate lazy content when closed', () => {
    const lazy = dialogElement.querySelector('.lazy-block');
    expect(lazy).toBeNull();
  });

  it('should instantiate lazy content when opened and remove when closed again', () => {
    // Open
    hostComponent.open = true;
    hostFixture.detectChanges();
    let lazy = dialogElement.querySelector('.lazy-block');
    expect(lazy).toBeTruthy();

    // Close
    hostComponent.open = false;
    hostFixture.detectChanges();
    lazy = dialogElement.querySelector('.lazy-block');
    expect(lazy).toBeNull();
  });
});
