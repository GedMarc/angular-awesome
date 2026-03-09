# Angular Awesome — Directive Authoring Patterns

Canonical patterns for creating and maintaining Angular Awesome wrapper directives.

## Standard Directive Structure

```ts
import { Directive, ElementRef, EventEmitter, Input, OnInit, OnChanges, OnDestroy, Output, SimpleChanges, Renderer2, inject } from '@angular/core';

@Directive({
  selector: 'wa-<name>',
  standalone: true
})
export class Wa<Name>Directive implements OnInit, OnChanges, OnDestroy {
  // --- Typed inputs (union with string for template compat) ---
  @Input() variant?: 'brand' | 'neutral' | 'success' | 'warning' | 'danger' | string;
  @Input() size?: 'small' | 'medium' | 'large' | string;
  @Input() disabled?: boolean | string;

  // --- Event outputs (dual alias: camelCase + hyphenated) ---
  @Output() waChange = new EventEmitter<Event>();
  @Output('wa-change') waChangeHyphen = this.waChange;

  // --- Injected services ---
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private eventCleanups: (() => void)[] = [];

  ngOnInit() {
    this.applyInputs();
    this.setupEventListeners();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.applyInputs();
  }

  ngOnDestroy() {
    this.eventCleanups.forEach(fn => fn());
  }

  private applyInputs() {
    this.setAttr('variant', this.variant);
    this.setAttr('size', this.size);
    this.setBoolAttr('disabled', this.disabled);
  }

  private setupEventListeners() {
    const native = this.el.nativeElement;
    this.eventCleanups.push(
      this.renderer.listen(native, 'wa-change', (e: Event) => this.waChange.emit(e))
    );
  }

  public get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  private setAttr(name: string, value: string | null | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, name, value);
    }
  }

  private setBoolAttr(name: string, value: boolean | string | undefined) {
    if (value === true || value === '' || value === 'true') {
      this.renderer.setAttribute(this.el.nativeElement, name, '');
    } else if (value === false || value === 'false') {
      this.renderer.removeAttribute(this.el.nativeElement, name);
    }
  }
}
```

## Key Rules

1. **Selector** matches the web component tag exactly: `wa-<name>`.
2. **Standalone: true** — no NgModule needed.
3. **String union inputs** — include `| string` for Angular template compatibility.
4. **Dual-alias outputs** — emit once, alias for both `(waEvent)` and `(wa-event)` bindings.
5. **Renderer2** — never use `nativeElement.setAttribute()` directly; use injected `Renderer2`.
6. **Attribute reflection** — set attributes in `applyInputs()` called from both `ngOnInit` and `ngOnChanges`.
7. **Event cleanup** — store listener teardown functions; call in `ngOnDestroy`.
8. **nativeElement getter** — always expose for consumers needing direct DOM access.
9. **normalizeAppearance()** — call from `tokens.ts` when setting `appearance` attributes.

## Component (vs Directive) Pattern

Use `@Component` instead of `@Directive` only when the wrapper needs its own Angular template (e.g., `WaToastContainerComponent`, `WaPageComponent`, `WaBadgeComponent`). The component:

- Has `template` with `<wa-*>` tags and Angular bindings
- Uses `imports: [CommonModule, ...otherDirectives]`
- Uses `ChangeDetectionStrategy.OnPush`
- Follows the same input/output/nativeElement conventions

## ControlValueAccessor Pattern

For form-integrated directives, implement `ControlValueAccessor`:

```ts
@Directive({
  selector: 'wa-input',
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => WaInputDirective), multi: true }]
})
export class WaInputDirective implements ControlValueAccessor, OnInit {
  writeValue(value: any): void { /* set native value */ }
  registerOnChange(fn: any): void { /* store change callback */ }
  registerOnTouched(fn: any): void { /* store touched callback */ }
  setDisabledState(disabled: boolean): void { /* toggle disabled */ }
}
```

## File Naming Conventions

| File | Pattern | Example |
|------|---------|---------|
| Directive | `<name>.directive.ts` | `button.directive.ts` |
| Component | `<name>.component.ts` | `badge.component.ts` |
| Spec | `<name>.directive.spec.ts` | `button.directive.spec.ts` |
| Rules | `<name>.rules.md` | `button.rules.md` |
| Examples | `<name>.example.md` | `button.example.md` |

## Public API Export

Every new directive must be exported from `src/public-api.ts`:
```ts
export * from './directives/<name>/<name>.directive';
```

