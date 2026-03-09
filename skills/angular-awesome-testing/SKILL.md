---
name: angular-awesome-testing
description: "Write and maintain tests for Angular Awesome wrapper directives, components, and services. Use when creating spec files for wa-* components, testing form control integration, testing event emission, testing toast/service behavior, running headless or BrowserStack tests, or debugging test failures in Angular Awesome."
metadata:
  short-description: Test Angular Awesome components and services
---

# Angular Awesome — Testing

Write reliable, maintainable tests for Angular Awesome wrappers.

## Test Runner

- Framework: Jasmine + Karma
- Headless: `npm run test:headless` or `npx ng test --no-watch --browsers=ChromeHeadless`
- Scoped: `npx ng test --no-watch --browsers=ChromeHeadless --include="**/<name>*.spec.ts"`
- BrowserStack: `npm run test:bs`

## Directive Test Pattern

```ts
@Component({
  selector: 'test-host', standalone: true,
  imports: [WaButtonDirective],
  template: `<wa-button [variant]="v" [disabled]="d" (wa-click)="clicked($event)">Go</wa-button>`
})
class TestHostComponent {
  v = 'brand'; d = false;
  events: Event[] = [];
  clicked(e: Event) { this.events.push(e); }
}

describe('WaButtonDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
  });

  it('creates element', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('wa-button')).toBeTruthy();
  });

  it('binds variant', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('wa-button').getAttribute('variant')).toBe('brand');
  });

  it('updates on change', () => {
    fixture.detectChanges();
    host.v = 'danger';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('wa-button').getAttribute('variant')).toBe('danger');
  });

  it('projects content', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('wa-button').textContent).toContain('Go');
  });
});
```

## Service Test Pattern (WaToastService)

```ts
describe('WaToastService', () => {
  let service: WaToastService;
  function getToasts() {
    let v: Toast[] = [];
    service.toasts$.subscribe(t => v = t).unsubscribe();
    return v;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaToastService, { provide: WA_TOAST_CONFIG, useValue: { placement: 'top-end', max: 2, duration: 100 } }]
    });
    service = TestBed.inject(WaToastService);
  });

  it('show returns id', () => expect(typeof service.show('Hi')).toBe('string'));
  it('emits visible list', () => { service.show('A'); expect(getToasts().length).toBe(1); });
  it('queues beyond max', () => { service.show('A'); service.show('B'); service.show('C'); expect(getToasts().length).toBe(2); });
  it('auto-dismiss', fakeAsync(() => { service.setConfig({ duration: 5 }); service.show('X'); tick(6); expect(getToasts().length).toBe(0); }));
  it('sticky', fakeAsync(() => { service.show('S', { duration: 0 }); tick(9999); expect(getToasts().length).toBe(1); }));
});
```

## Component Test Pattern (WaToastContainerComponent)

```ts
describe('WaToastContainerComponent', () => {
  let fixture: ComponentFixture<WaToastContainerComponent>;
  let service: WaToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaToastContainerComponent],
      providers: [{ provide: WA_TOAST_CONFIG, useValue: { placement: 'top-end', max: 3, duration: 0 } }]
    }).compileComponents();
    fixture = TestBed.createComponent(WaToastContainerComponent);
    service = TestBed.inject(WaToastService);
  });

  it('renders wa-toast', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('wa-toast')).toBeTruthy();
  });

  it('renders toast items', () => {
    fixture.detectChanges();
    service.show('Hi');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('wa-toast-item').length).toBe(1);
  });
});
```

## Checklist

Every spec must test:
- [ ] Element exists in DOM after `detectChanges()`
- [ ] Each `@Input` reflects as the correct attribute
- [ ] Input changes propagate to attributes
- [ ] Boolean attributes toggle correctly (present/absent)
- [ ] Content projection renders text/slots
- [ ] Events emit when native events fire (for event directives)
- [ ] Timer-based behavior uses `fakeAsync`/`tick`

## Rules

- Query with `querySelector`/`querySelectorAll` — web components are unknown elements in test DOM.
- Use `getAttribute()` — not property access — to verify attribute reflection.
- Call `fixture.detectChanges()` after every mutation.
- `fakeAsync` + `tick` for any setTimeout/auto-dismiss behavior.
- No `--include` glob for `.md` files — only `*.spec.ts`.

