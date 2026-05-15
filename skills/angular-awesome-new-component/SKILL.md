---
name: angular-awesome-new-component
description: "Create a new Angular Awesome wrapper directive or component for a Web Awesome web component. Use when adding a new wa-* component wrapper, scaffolding a directive with its spec/rules/example files, wiring it into public-api.ts, updating the changelog, and regenerating docs. Covers the full end-to-end flow from llms.txt API extraction through to build verification."
metadata:
  short-description: Scaffold a new Angular Awesome component wrapper
---

# Angular Awesome — New Component

End-to-end workflow for adding a new `wa-*` component wrapper to Angular Awesome.

## Workflow

1. **Extract API** from `llms.txt` — find the `<wa-name>` entry; note properties, slots, events, CSS parts, CSS custom properties.
2. **Create directive** at `src/directives/<name>/<name>.directive.ts`.
3. **Create spec** at `src/directives/<name>/<name>.directive.spec.ts`.
4. **Create rules** at `src/directives/<name>/<name>.rules.md`.
5. **Create examples** at `src/directives/<name>/<name>.example.md`.
6. **Export** from `src/public-api.ts`.
7. **Build** — `npx ng build` must succeed.
8. **Test** — `npx ng test --no-watch --browsers=ChromeHeadless --include="**/<name>*.spec.ts"` must pass.
9. **Generate docs** — `node docs/generate-docs.js`.
10. **Update CHANGELOG.md** — add entry under current version.

## Step 1: Extract API from llms.txt

Search `llms.txt` for `#### \`<wa-name>\`` to find:
- **Properties** → become `@Input()` fields
- **Events** → become `@Output()` fields with dual aliases
- **Slots** → document in rules.md for slot projection
- **CSS Custom Properties** → document in rules.md styling section
- **CSS Parts** → document in rules.md styling section
- **Methods** → expose via `nativeElement` or wrapper methods

## Step 2: Directive Template

```ts
import { Directive, ElementRef, EventEmitter, Input, OnInit, OnChanges, OnDestroy, Output, SimpleChanges, Renderer2, inject } from '@angular/core';

@Directive({
  selector: 'wa-<name>',
  standalone: true
})
export class Wa<Name>Directive implements OnInit, OnChanges, OnDestroy {
  // Map each Property from llms.txt to an @Input()
  @Input() propertyName?: string;

  // Map each Event from llms.txt to dual @Output()
  @Output() waEventName = new EventEmitter<Event>();
  @Output('wa-event-name') waEventNameHyphen = this.waEventName;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private eventCleanups: (() => void)[] = [];

  ngOnInit() { this.applyInputs(); this.setupEventListeners(); }
  ngOnChanges(_: SimpleChanges) { this.applyInputs(); }
  ngOnDestroy() { this.eventCleanups.forEach(fn => fn()); }

  private applyInputs() {
    // this.setAttr('property-name', this.propertyName); for each input
  }

  private setupEventListeners() {
    const n = this.el.nativeElement;
    // this.eventCleanups.push(this.renderer.listen(n, 'wa-event-name', e => this.waEventName.emit(e)));
  }

  public get nativeElement(): HTMLElement { return this.el.nativeElement; }

  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) this.renderer.setAttribute(this.el.nativeElement, name, value);
  }
}
```

## Step 3: Spec Template

```ts
@Component({
  selector: 'test-host', standalone: true,
  imports: [Wa<Name>Directive],
  template: `<wa-<name> [propertyName]="prop"></wa-<name>>`
})
class TestHostComponent { prop = 'value'; }

describe('Wa<Name>Directive', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
  });
  it('should create element', () => { /* ... */ });
  it('should bind attributes', () => { /* ... */ });
  it('should update on change', () => { /* ... */ });
});
```

## Step 4: Rules Template

```markdown
# <Name>
<Description from llms.txt>
## Overview
## Getting Started
## API Reference
### Inputs / Outputs / Slots / Methods
## Styling
### CSS Custom Properties / CSS Parts
```

## Step 5: Example Template

```markdown
# <Name> Examples
## Basic Usage
## Variants / Sizes
## Events
## Slots
```

## Checklist

- [ ] Directive created with all properties/events from llms.txt
- [ ] Spec created with element creation, attribute binding, input change, content projection tests
- [ ] Rules markdown documents full API including slots, CSS parts, CSS custom properties
- [ ] Example markdown has runnable code snippets
- [ ] Exported from `src/public-api.ts`
- [ ] Build succeeds (`npx ng build`)
- [ ] Tests pass
- [ ] Docs regenerated (`node docs/generate-docs.js`)
- [ ] CHANGELOG.md updated

## References
- Directive authoring patterns: see `$angular-awesome` skill → `references/directive-patterns.md`
- Testing conventions: see `$angular-awesome` skill → `references/testing-conventions.md`

