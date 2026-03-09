# Angular Awesome — Testing Conventions

Standard testing patterns for Angular Awesome wrapper directives and components.

## Test File Structure

Every directive/component has a co-located `.spec.ts` file:
```
src/directives/<name>/
├── <name>.directive.ts
├── <name>.directive.spec.ts   ← tests here
├── <name>.rules.md
└── <name>.example.md
```

## Test Host Component Pattern

Create a minimal test host component that uses the directive:

```ts
@Component({
  selector: 'test-host',
  standalone: true,
  imports: [WaButtonDirective],
  template: `<wa-button [variant]="variant" [disabled]="disabled">Click</wa-button>`
})
class TestHostComponent {
  variant = 'brand';
  disabled = false;
}
```

## Standard Test Suite

```ts
describe('WaButtonDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
  });

  // 1. Element creation
  it('should create the wa-button element', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('wa-button')).not.toBeNull();
  });

  // 2. Attribute binding
  it('should set variant attribute', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('wa-button');
    expect(el.getAttribute('variant')).toBe('brand');
  });

  // 3. Input change propagation
  it('should update attribute when input changes', () => {
    fixture.detectChanges();
    host.variant = 'danger';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('wa-button').getAttribute('variant')).toBe('danger');
  });

  // 4. Boolean attribute handling
  it('should toggle boolean attribute', () => {
    host.disabled = true;
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('wa-button');
    expect(el.hasAttribute('disabled')).toBeTrue();
  });

  // 5. Content projection
  it('should project content', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('wa-button').textContent).toContain('Click');
  });
});
```

## Required Test Categories

Every directive spec must cover:

1. **Element creation** — the `wa-*` element exists in DOM
2. **Attribute binding** — each `@Input` sets the correct attribute
3. **Input changes** — attributes update when inputs change
4. **Boolean attributes** — toggled correctly (present/absent, not `"true"/"false"`)
5. **Content/slot projection** — projected content is visible
6. **Event emission** — `@Output` fires when native event dispatches (for event-emitting directives)

## Service Tests (e.g., WaToastService)

```ts
describe('WaToastService', () => {
  let service: WaToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WaToastService,
        { provide: WA_TOAST_CONFIG, useValue: { placement: 'top-end', max: 2, duration: 100 } }
      ]
    });
    service = TestBed.inject(WaToastService);
  });

  // Use getToasts() helper to read latest from BehaviorSubject
  function getToasts() {
    let latest: Toast[] = [];
    service.toasts$.subscribe(v => (latest = v)).unsubscribe();
    return latest;
  }

  // Test show, close, update, clearAll, queueing, auto-dismiss (fakeAsync+tick)
});
```

## Component Tests (e.g., WaToastContainerComponent)

```ts
describe('WaToastContainerComponent', () => {
  let fixture: ComponentFixture<WaToastContainerComponent>;
  let service: WaToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaToastContainerComponent],
      providers: [{ provide: WA_TOAST_CONFIG, useValue: { ... } }]
    }).compileComponents();
    fixture = TestBed.createComponent(WaToastContainerComponent);
    service = TestBed.inject(WaToastService);
  });

  // Test rendered elements, attribute reflection, ordering, auto-dismiss (fakeAsync)
});
```

## Running Tests

```bash
# All tests
npm test -- --watch=false --browsers=ChromeHeadless

# Specific component tests
npx ng test --no-watch --browsers=ChromeHeadless --include="**/button*.spec.ts"

# Toast tests
npx ng test --no-watch --browsers=ChromeHeadless --include="**/toast*.spec.ts"
```

## Key Rules

- Use `fakeAsync` + `tick` for timer-based tests (auto-dismiss, debounce).
- Use `fixture.detectChanges()` after every input change or service call.
- Query DOM via `fixture.nativeElement.querySelector()` — not `By.directive()` for web components.
- Use `getAttribute()` to verify attribute reflection, not property access.
- Never import `By` from `@angular/platform-browser` for web component attribute checks.

