# Angular Awesome Implementation Notes

This document describes the current implementation scope, validation plan, and dependencies that tie the Angular Awesome codebase to the enterprise Rules Repository (`rules/`). Update it whenever we change build tooling, CI, or wrapper behavior.

## Current Scope

- Angular 19 standalone components and directives that wrap Web Awesome 3.x custom elements. See `RULES.md` for component-level requirements and `rules/generative/frontend/angular-awesome/README.md` for canonical behaviors.
- Documentation-first cadence: any work begins with `PACT.md` → `GLOSSARY.md` → `RULES.md`/`GUIDES.md` updates → implementation planning in this file → code.
- Architecture references live under `docs/architecture/`, starting with `c4-context.md`.

## Validation Path

| Layer | Command/Artifact | Notes |
| --- | --- | --- |
| Unit/integration | `npm test` (Karma/Jasmine) | Mirrors expectations in `rules/generative/language/angular/README.md`. |
| Cross-browser | BrowserStack via `browserstack.yml`, `scripts/run-checkbox-tests.js` | Required before releases; link job IDs in PR descriptions. |
| Documentation | `docs/` static site plus `.rules.md` files | Keep in sync with enterprise component guides. |
| Rules linkage | `PROMPT_LIBRARY_RULES_UPDATE.md` | Run after any Web Awesome spec changes to refresh both host docs and submodule references. |

## Implementation Plan Checklist

- [ ] Confirm the related stage gate in `GUIDES.md` is complete before editing code.
- [ ] Reference the relevant enterprise guide (e.g., `rules/generative/frontend/webawesome/button.rules.md`) for each component touched.
- [ ] Update or add Mermaid diagrams if a new integration/flow is introduced.
- [ ] Record BrowserStack coverage evidence in release notes or PR templates.

## Cross-References

- PACT — `PACT.md`
- Glossary — `GLOSSARY.md`
- Rules — `RULES.md`
- Guides — `GUIDES.md`
- Architecture diagram — `docs/architecture/c4-context.md`
- Enterprise submodule — `rules/`

Maintainers should treat this file as the landing zone for implementation-specific details so that architecture, rules, and execution remain synchronized.
