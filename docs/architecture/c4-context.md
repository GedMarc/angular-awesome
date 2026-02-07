# Angular Awesome — C4 Context

Angular Awesome wraps the Web Awesome web components so Angular teams can rely on enterprise-approved UI primitives. The Rules Repository under `rules/` drives every change, so this diagram anchors host documentation for the stage-gated workflow described in `GUIDES.md`.

```mermaid
---
id: 3016cf03-2024-4b4b-9b40-3a2c492da276
---
C4Context
    Person(dev, "Angular Developer", "Implements host applications")
    System_Boundary(angularAwesome, "Angular Awesome Library") {
        System(ngWrapper, "Angular Wrapper Components", "Standalone Angular 19 directives bridging to web components")
    }
    System_Ext(webAwesome, "Web Awesome Components", "Canonical web components & styles")
    System_Ext(rulesRepo, "Enterprise Rules Repository", "Submodule providing RULES, GUIDES, and glossary topics")
    System_Ext(browserstack, "BrowserStack", "Remote execution for Karma/Jasmine cross-browser tests")

    Rel(dev, ngWrapper, "Builds features with", "docs-first workflow")
    Rel(ngWrapper, webAwesome, "Delegates rendering/events to")
    Rel(ngWrapper, rulesRepo, "Constrained by", "rules/generative frontend+language guides")
    Rel(ngWrapper, browserstack, "Validates via", "scripts/run-checkbox-tests.js")
```

## Traceability

- `PACT.md`, `RULES.md`, `GUIDES.md`, and `IMPLEMENTATION.md` must reference this diagram to satisfy the documentation loop mandated in `rules/README.md`.
- Updates to Web Awesome APIs require a forward-only refresh of this diagram plus downstream docs in the same change set.
