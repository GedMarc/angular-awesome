import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaToastDirective } from './toast.directive';

@Component({
  selector: 'test-host',
  standalone: true,
  imports: [WaToastDirective],
  template: `<wa-toast [placement]="placement"></wa-toast>`
})
class TestHostComponent {
  placement: string = 'top-end';
}

describe('WaToastDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
  });

  it('should create a wa-toast element', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('wa-toast');
    expect(el).not.toBeNull();
  });

  it('should set placement attribute', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('wa-toast');
    expect(el.getAttribute('placement')).toBe('top-end');
  });

  it('should update placement attribute when input changes', () => {
    fixture.detectChanges();
    host.placement = 'bottom-center';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('wa-toast');
    expect(el.getAttribute('placement')).toBe('bottom-center');
  });

  it('should support all official placement values', () => {
    const placements = ['top-start', 'top-center', 'top-end', 'bottom-start', 'bottom-center', 'bottom-end'];
    for (const p of placements) {
      host.placement = p;
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('wa-toast');
      expect(el.getAttribute('placement')).toBe(p);
    }
  });
});

