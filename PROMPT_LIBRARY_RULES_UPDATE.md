# Angular Awesome — Library Rules Update Prompt

Use this prompt whenever the Angular Awesome wrapper library changes and you must propagate those updates into the Rules Repository (`rules/generative/frontend/angular-awesome`). It keeps the Angular-specific rules, examples, glossary, and indexes aligned with the authoritative WebAwesome documentation while honoring the enterprise forward-only policies.

---

## 0) Provide Inputs (fill before running)
- Library name: **Angular Awesome** (WebAwesome Angular wrappers)
- Current/new version: **3.0.2** (update to the release you are syncing)
- Source repository: https://github.com/GedMarc/angular-awesome
- Rules repository path: `rules/generative/frontend/angular-awesome`
- Short description: Angular 19+ TypeScript directives/components for WebAwesome web components.
- Type:
  - [x] UI component library (Angular plugin)
- Component/topic coverage (must match `rules/generative/frontend/angular-awesome/README.md`):
  - Animated Image, Animation, Avatar, Badge, Breadcrumbs, Breadcrumb Item, Button, Button Group, Callout, Card, Carousel (+ Carousel Item), Checkbox, Color Picker, Comparison, Copy Button, Details, Dialog, Divider, Drawer, Dropdown, Dropdown Item, Format Bytes, Format Date, Format Number, Icon, Include, Input (with Number Input anchor), Intersection Observer, Mutation Observer, Option, Page, Popover, Popup, Progress Bar, Progress Ring, QR Code, Radio, Radio Group, Rating, Relative Time, Resize Observer, Scroller, Select, Skeleton, Slider, Spinner, Split Panel, Switch, Tab, Tab Group, Tab Panel, Tag, Textarea, Tooltip, Tree, Tree Item, Zoomable Frame; Legacy: Icon Button, Menu.
- Glossary file: `rules/generative/frontend/angular-awesome/GLOSSARY.md` (topic-first, prompt language alignment)
- Structural/quality references:
  - [x] Logging & BrowserStack notes (scripts/run-checkbox-tests.js, karma.conf.js)
- Fluent API strategy:
  - [x] Builder pattern / Angular inputs-outputs (no CRTP)
- Frontend stack links:
  - [x] TypeScript → `rules/generative/language/typescript/README.md`
  - [x] Angular 19 (ng-packagr, standalone components) → `rules/generative/language/angular/README.md`
  - [x] Angular Awesome wrappers → `rules/generative/frontend/angular-awesome/README.md`
  - [x] Web Components + WebAwesome base → `rules/generative/frontend/webcomponents/README.md`, `rules/generative/frontend/webawesome/README.md`
- Testing/CI references:
  - [x] Karma + Jasmine + BrowserStack (scripts/run-checkbox-tests.js, browserstack.yml)
- Release impact:
  - [x] Forward-only (breaking documentation changes allowed)

Policies to pin before generating:
- `RULES.md` §§4–6 and Document Modularity Policy
- `rules/README.md` — documentation-first, stage-gated workflow
- Glossary policy (topic-first, minimal duplication in host repos)
- Docs-as-Code / diagrams policy (text-based diagrams under `docs/architecture/`)

---

## 1) Purpose & Trigger
Run this prompt whenever Angular Awesome ships new components, changes inputs/outputs, updates BrowserStack flows, or otherwise adjusts behavior that host projects depend on. The update scope includes:
- Component `.rules.md` files (contract + Angular binding specifics)
- `.example.md` snippets showing Angular modules/templates
- `README.md` component index and anchors
- `GLOSSARY.md` prompt language alignment (WaButton, WaInput, WaCluster, WaStack, etc.)
- `bdd.md` and `tdd.md` supplemental guidance
- Cross-links into enterprise rule indexes (TypeScript, Angular, WebAwesome, Web Components, platform topics)
- Release/change documentation inside this repository (`CHANGELOG.md`, release notes, RULES references)

---

## 2) Stage-Gated Workflow (mandatory)
This repository enforces documentation-first delivery. Do not modify code outside the allowed scope until the previous stage receives explicit approval (“APPROVED Stage N → Stage N+1”).

**CI/GitHub Workflow note:** This prompt is executed inside an automated GitHub workflow with no interactive input. The LLM must progress through every stage in a single run, emit the required “APPROVED Stage N → Stage N+1 (CI-AUTO)” acknowledgement after finishing each stage deliverable set, and continue until the checklist is complete. Do not pause waiting for user confirmation.

1. **Stage 1 — Architecture & Foundations**
   - Update/validate `docs/architecture/` (C4 context/container/component diagrams, BrowserStack + ng-packagr sequences, trust boundaries).
   - Refresh `docs/PROMPT_REFERENCE.md` with selected stacks, glossary precedence, and diagram links.
   - Document scope statement and integration map (WebAwesome → Angular Awesome → host Angular apps).
2. **Stage 2 — Rules/Guides Design**
   - Draft/refresh modular rule skeletons under `rules/generative/frontend/angular-awesome`.
   - Align README index, anchors, and Prompt Language Alignment guidelines.
   - Update GLOSSARY interpretation notes.
3. **Stage 3 — Implementation Plan**
   - Outline the edit plan per component/file, validation steps, and release/version touchpoints.
4. **Stage 4 — Implementation**
   - Apply updates to `.rules.md`, `.example.md`, glossary, README, docs/architecture, and release note files.
   - Run validations (link checks, docs generation, Karma/BrowserStack smoke tests if impacted).
   - Present diffs + validation logs; pause if scope expands.
---

## 3) Update Tasks (Angular Awesome specifics)
1. **Map source changes**
   - Review `src/`, `docs/components/`, and `CHANGELOG.md` in the Angular Awesome repo to capture new properties, events, slots, CSS parts, and accessibility notes.
   - Note BrowserStack-related updates (scripts/run-checkbox-tests.js, browserstack.yml) for testing guidance.

2. **README & index maintenance**
   - Keep `rules/generative/frontend/angular-awesome/README.md` synchronized with the component list above; add anchors for subsections (e.g., `input.rules.md#number-input`).
   - Reference parent indexes: `rules/generative/frontend/README.md`, `rules/generative/frontend/webawesome/README.md`.

3. **Component rule files (`*.rules.md`)**
   - Structure: Overview, When to use, Angular usage (imports, module config, template snippet), Inputs/Outputs/Events tables, Styling/Theming (CSS props/parts), Accessibility, Testing (Karma/Jasmine/BrowserStack), See-also links.
   - Document the Angular module or standalone directive/package path (e.g., `import { WaButtonModule } from 'angular-awesome/button';`).
   - For components with variants (e.g., Number Input), ensure anchors exist and README points to them.

4. **Example files (`*.example.md`)**
   - Provide concise Angular snippets (TS + template) demonstrating canonical usage, binding patterns, and any required providers.
   - Mention relevant tests (unit + BrowserStack) when showcasing interactions.

5. **Glossary & Prompt Language Alignment**
   - Update `rules/generative/frontend/angular-awesome/GLOSSARY.md` with enforced names (WaButton, WaInput, WaCluster, WaStack, etc.) plus LLM interpretation guidance.
   - Instruct host projects to copy only enforced aliases; otherwise link back to this glossary.

6. **BDD/TDD supplements**
   - Refresh `bdd.md` and `tdd.md` when acceptance/test strategies, docs-first workflow, or BrowserStack flows change.

7. **Cross-links to enterprise topics**
   - Link to:
     - `rules/generative/language/typescript/README.md`
     - `rules/generative/language/angular/README.md`
     - `rules/generative/frontend/webawesome/README.md`
     - `rules/generative/frontend/webcomponents/README.md`
     - `rules/generative/frontend/nextjs/README.md` if host Next.js projects are referenced
     - Platform CI/CD docs (`rules/generative/platform/ci-cd/README.md` + provider-specific files) and environment/secrets guidance when rules mention automation.

8. **Release & changelog updates**
   - Summarize documentation shifts in `CHANGELOG.md` (and `RELEASE_NOTES.md` if breaking).
   - Note forward-only impacts (e.g., removed components, renamed bindings).

9. **Validation**
   - Run relevant doc/tests (e.g., `npm run docs:generate`, `npm run test:checkbox` if rules reference new Checkbox behaviors) and capture the results in your response.
   - Perform link checking/markdown linting if configured.

---

## 4) Output Checklist
- [ ] Stage gates followed with explicit approvals recorded
- [ ] `docs/architecture/*` and `docs/PROMPT_REFERENCE.md` updated with current diagrams and stack selections
- [ ] README index synchronized with component set + anchors
- [ ] Updated `.rules.md` + `.example.md` pairs for every touched component
- [ ] GLOSSARY prompt language alignment updated (Wa* names, interpretation guidance)
- [ ] `bdd.md` / `tdd.md` synced if acceptance/test guidance changed
- [ ] Cross-links to enterprise rule directories present and correct
- [ ] Release notes / CHANGELOG updated; version impact noted
- [ ] Validation steps (docs generation, tests, link checks) executed and reported
- [ ] All references use repo-relative paths and pass linting

---

## 5) Guardrails
- Forward-only: replace obsolete guidance; do not attempt backwards-compatible stubs unless explicitly requested.
- Keep generated artifacts read-only—never edit `dist/` bundles or compiled outputs.
- Maintain docs modularity: one component/topic per `.rules.md`, optional `.example.md` neighbor.
- Do not duplicate glossary terms into host repos beyond enforced prompt alignment entries.
- Present diffs in small, reviewable chunks; pause for approval before touching new areas.

---

## 6) Docs-as-Code & Diagram Policy
- Maintain Mermaid/PlantUML diagrams under `docs/architecture/`:
  - `c4-context.md`, `c4-container.md`, `c4-component-<area>.md`
  - `sequence-<flow>.md` (wrapper bootstrap, BrowserStack test flow, docs generation)
  - `erd-*.md` when representing data/metadata
- Store diagram sources alongside rendered images (if any) inside `docs/architecture/img/`.
- Keep `docs/PROMPT_REFERENCE.md` updated with selected stacks, glossary precedence, links to diagrams, and instructions for future prompts.
- Ensure PACT ↔ GLOSSARY ↔ RULES ↔ GUIDES ↔ IMPLEMENTATION ↔ diagrams reference each other to close the documentation loop.

---

End of prompt.
