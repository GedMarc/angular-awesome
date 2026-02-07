# Angular Awesome Pact

Angular Awesome exists to keep Web Awesome web components first-class for Angular 19+ teams. This pact binds maintainers, contributors, and AI collaborators to the enterprise `rules/` submodule so every change remains documentation-first, forward-only, and reviewable.

## Collaboration Principles

- **Documentation-first workflow** — follow the stage gates in `rules/README.md` (Architecture → Guides → Implementation Plan → Implementation). No source edits happen until prior stages are approved or satisfied for CI automation.
- **Forward-only mindset** — apply changes comprehensively, updating affected indexes/anchors in one change per `rules/RULES.md#6-forward-only-change-policy`.
- **Topic-first language** — rely on the glossaries inside `rules/generative/frontend/angular-awesome/` and related language stacks before adding new host-specific terms.
- **Closed-loop traceability** — ensure `PACT.md`, `GLOSSARY.md`, `RULES.md`, `GUIDES.md`, `IMPLEMENTATION.md`, and `docs/architecture/c4-context.md` reference each other and the submodule to satisfy the linking policy in `rules/README.md#linking-guidance-closing-loops`.
- **Sandbox awareness** — keep all host artifacts at the repo root or `docs/`; When all changes completed and a new release is performd update the rules `rules/frontend/angular-awesome` as the ruleset that this project maintains. never modify rules repository when changes are outside of our projects rules-repository location `repository/frontend/angular-awesome`

## Enterprise Rules Alignment

| Area | Link |
| --- | --- |
| Rules repository overview | `rules/README.md` |
| Behavioral/technical guardrails | `rules/RULES.md#4-behavioral-rules`, `rules/RULES.md#5-technical-rules` |
| Angular language rules | `rules/generative/language/angular/README.md` |
| TypeScript base rules | `rules/generative/language/typescript/README.md` |
<!-- [MermaidChart: 90e60cb8-594a-48e7-af80-53130cbac368] -->
| WebAwesome + Angular Awesome topics | `rules/generative/frontend/webawesome/README.md`, `rules/generative/frontend/angular-awesome/README.md` |
| Docs-as-code policy | `rules/README.md#docs-as-code-diagrams-policy` |

## Required Artifacts and Cross-Links

| Artifact | Purpose | Path |
| --- | --- | --- |
| Pact (this file) | Declares tone, constraints, and enterprise alignment | `PACT.md` |
| Glossary | Topic-first language; links to submodule glossaries | `GLOSSARY.md` |
| Rules | Library-specific behavior, extending enterprise guides | `RULES.md` |
| Guides | Stage-gated process + how to apply rules in this repo | `GUIDES.md` |
| Implementation Notes | Current implementation & validation expectations | `IMPLEMENTATION.md` |
| Architecture Diagram | C4 context for rules-aware traceability | `docs/architecture/c4-context.md` |
| Enterprise Submodule | Authoritative rules and prompts | `rules/` (read-only) |

Every Pull Request must reference the relevant artifacts above. When contributing, start with this pact, confirm glossary coverage, align with `RULES.md`, follow the guidance, and only then move into implementation. This keeps Angular Awesome synchronized with the broader enterprise ecosystem.
