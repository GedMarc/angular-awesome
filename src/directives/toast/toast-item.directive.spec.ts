import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaToastItemDirective } from './toast-item.directive';

@Component({
  selector: 'test-host',
  standalone: true,
  imports: [WaToastItemDirective],
  template: `
    <wa-toast-item
      [variant]="variant"
      [size]="size"
      [duration]="duration"
      (wa-show)="onShow($event)"
      (wa-hide)="onHide($event)"
    >
      {{ message }}
    </wa-toast-item>
  `
})
class TestHostComponent {
  variant: string = 'success';
  size: string = 'medium';
  duration: number = 5000;
  message: string = 'Test toast';
  showEvents: Event[] = [];
  hideEvents: Event[] = [];

  onShow(e: Event) { this.showEvents.push(e); }
  onHide(e: Event) { this.hideEvents.push(e); }
}

describe('WaToastItemDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
  });

  it('should create a wa-toast-item element', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('wa-toast-item');
    expect(el).not.toBeNull();
  });

  it('should set variant attribute', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('wa-toast-item');
    expect(el.getAttribute('variant')).toBe('success');
  });

  it('should set size attribute', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('wa-toast-item');
    expect(el.getAttribute('size')).toBe('medium');
  });

  it('should set duration attribute', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('wa-toast-item');
    expect(el.getAttribute('duration')).toBe('5000');
  });

  it('should update variant when input changes', () => {
    fixture.detectChanges();
    host.variant = 'danger';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('wa-toast-item');
    expect(el.getAttribute('variant')).toBe('danger');
  });

  it('should update size when input changes', () => {
    fixture.detectChanges();
    host.size = 'large';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('wa-toast-item');
    expect(el.getAttribute('size')).toBe('large');
  });

  it('should render message content', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('wa-toast-item');
    expect(el.textContent).toContain('Test toast');
  });

  it('should support all variant values', () => {
    const variants = ['brand', 'success', 'warning', 'danger', 'neutral'];
    for (const v of variants) {
      host.variant = v;
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('wa-toast-item');
      expect(el.getAttribute('variant')).toBe(v);
    }
  });

  it('should support all size values', () => {
    const sizes = ['small', 'medium', 'large'];
    for (const s of sizes) {
      host.size = s;
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('wa-toast-item');
      expect(el.getAttribute('size')).toBe(s);
    }
  });

  it('should set duration to 0 for sticky toast', () => {
    host.duration = 0;
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('wa-toast-item');
    expect(el.getAttribute('duration')).toBe('0');
  });
});

