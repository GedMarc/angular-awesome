# Angular Awesome Guides

These guides translate the enterprise Rules Repository requirements into actionable steps for the Angular Awesome host project. Always read this file together with `PACT.md`, `RULES.md`, `GLOSSARY.md`, and `IMPLEMENTATION.md`.

## 1. Use the Enterprise Submodule

1. Treat `rules/` as read-only. Reference its folders (especially `rules/generative/frontend/angular-awesome/`) instead of duplicating content.
2. When writing prompts or planning work, cite the relevant rules paths (Angular language, TypeScript, WebAwesome, BrowserStack) so AI engines stay aligned.
3. Update host docs (this file set) whenever the submodule revision changes to keep indexes, glossaries, and diagrams synchronized.

## 2. Documentation-First Stage Gates

The workflow in `rules/README.md#documentation-first-stage-gated-workflow` applies to this project verbatim:

1. **Stage 1 — Architecture & Foundations**  
   Refresh or extend diagrams under `docs/architecture/` (e.g., `c4-context.md`). Capture integration points with BrowserStack, ng-packagr, and host Angular apps.
2. **Stage 2 — Guides & Design Validation**  
   Update this file plus the component-level rules under `src/directives/*/*.rules.md` referencing `rules/generative/frontend/angular-awesome/README.md`.
3. **Stage 3 — Implementation Plan**  
   Extend `IMPLEMENTATION.md` with scaffolding plans, CI wiring, and validation strategies before touching code.
4. **Stage 4 — Implementation & Scaffolding**  
   Only after documenting the plan do we modify source files. Validate via `npm test`, BrowserStack jobs, and targeted demos.

Each stage must close the documentation loop: PACT ↔ GLOSSARY ↔ RULES ↔ GUIDES ↔ IMPLEMENTATION ↔ `docs/architecture/c4-context.md`.

## 3. BrowserStack and Testing Expectations

- Cross-browser coverage is delegated to BrowserStack using `browserstack.yml` and scripts referenced in `rules/generative/platform/ci-cd/`.
- Local validation uses Karma/Jasmine; keep test commands documented in `README.md` and reference them from `IMPLEMENTATION.md`.
- When tests fail remotely, treat the BrowserStack job logs as required artifacts before merging.

## 4. Referencing Component Rules

- Every directive/component must have an up-to-date `.rules.md` sibling inside `src/directives/<component>/`.
- Map these files back to `rules/generative/frontend/angular-awesome` anchors so maintainers can jump between host docs and enterprise rules quickly.
- When a Web Awesome release introduces changes, start with `PROMPT_LIBRARY_RULES_UPDATE.md`, update the submodule, refresh host docs via this guide, then regenerate component wrappers.

By following the steps above, Angular Awesome remains a compliant consumer of the enterprise Rules Repository while providing clear onboarding for contributors.
