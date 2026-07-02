import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WaAnimationDirective } from './animation.directive';

@Component({
  template: `
    <wa-animation
      [name]="name"
      [delay]="delay"
      [duration]="duration"
      [iterations]="iterations"
      [iterationStart]="iterationStart"
      [endDelay]="endDelay"
      [playbackRate]="playbackRate"
    ></wa-animation>
  `,
  standalone: true,
  imports: [WaAnimationDirective]
})
class TestHostComponent {
  name?: string;
  delay?: number | string;
  duration?: number | string;
  iterations?: number | string;
  iterationStart?: number | string;
  endDelay?: number | string;
  playbackRate?: number | string;
}

describe('WaAnimationDirective numeric attribute coercion', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    // Note: the directive applies inputs in ngOnInit, so set values before the first detectChanges.
  });

  function getEl(): HTMLElement {
    return fixture.nativeElement.querySelector('wa-animation');
  }

  it('should create the directive', () => {
    fixture.detectChanges();
    expect(getEl()).toBeTruthy();
  });

  it('should set numeric attributes from number values', () => {
    host.delay = 100;
    host.duration = 200;
    host.iterations = 3;
    host.iterationStart = 1;
    host.endDelay = 50;
    host.playbackRate = 2;
    fixture.detectChanges();

    const el = getEl();
    expect(el.getAttribute('delay')).toBe('100');
    expect(el.getAttribute('duration')).toBe('200');
    expect(el.getAttribute('iterations')).toBe('3');
    expect(el.getAttribute('iteration-start')).toBe('1');
    expect(el.getAttribute('end-delay')).toBe('50');
    expect(el.getAttribute('playback-rate')).toBe('2');
  });

  it('should accept string values (standard bindings)', () => {
    host.delay = '100';
    host.duration = '200';
    host.iterations = '3';
    host.playbackRate = '2';
    fixture.detectChanges();

    const el = getEl();
    expect(el.getAttribute('delay')).toBe('100');
    expect(el.getAttribute('duration')).toBe('200');
    expect(el.getAttribute('iterations')).toBe('3');
    expect(el.getAttribute('playback-rate')).toBe('2');
  });
});

