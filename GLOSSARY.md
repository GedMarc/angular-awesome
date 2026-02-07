# Angular Awesome Glossary

Angular Awesome inherits its canonical terminology from the enterprise Rules Repository (`rules/`). This file keeps host-specific prompts aligned without duplicating the authoritative definitions. Before adding new entries, check the linked topic glossaries below.

## Linked Topic Glossaries

- Angular language rules — `rules/generative/language/angular/GLOSSARY.md`
- TypeScript language rules — `rules/generative/language/typescript/GLOSSARY.md`
- WebAwesome UI components — `rules/generative/frontend/webawesome/GLOSSARY.md`
- Angular Awesome wrappers — `rules/generative/frontend/angular-awesome/GLOSSARY.md`
- Testing and BrowserStack references — see `rules/generative/platform/ci-cd/README.md` (if present) and repo-specific guides.

## Prompt Language Alignment

| Term | Meaning | Source |
| --- | --- | --- |
| Angular Awesome | Angular 19+ directives/components that wrap Web Awesome custom elements. Prefer `wa-*` selectors and template-driven forms. | `rules/generative/frontend/angular-awesome/README.md` |
| Web Awesome | Base web component library that provides the rendered UI and events consumed by the wrappers. | `rules/generative/frontend/webawesome/README.md` |
| Rules Repository | Enterprise submodule at `rules/` providing forward-only policies, glossaries, and prompts. | `rules/README.md`, `rules/RULES.md` |
| Documentation-first workflow | Stage-gated delivery that progresses through Architecture → Guides → Plan → Implementation with explicit approvals. | `rules/README.md#documentation-first-stage-gated-workflow` |
| BrowserStack pipeline | Remote execution path for Karma/Jasmine via `scripts/run-checkbox-tests.js` and `browserstack.yml`; required for cross-browser validation. | `GUIDES.md`, `IMPLEMENTATION.md` |

## Host-Specific Notes

- When a term already exists in the submodule, reference it rather than redefining it. Host-only language should be scoped to Angular Awesome delivery mechanics (e.g., naming repository folders or CI jobs).
- Each artifact (`PACT.md`, `RULES.md`, `GUIDES.md`, `IMPLEMENTATION.md`) must link back here so updates remain synchronized per `rules/README.md#linking-guidance-closing-loops`.
