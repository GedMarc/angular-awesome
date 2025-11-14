# Angular Awesome

Angular Awesome is an Angular 19+ wrapper library for the [Web Awesome](https://backers.webawesome.com/) UI framework. It provides idiomatic Angular bindings for `wa-*` custom elements, allowing full integration with Angular forms, events, styles, and lifecycle mechanisms.

## Enterprise Rules Alignment

This repository consumes the enterprise Rules Repository as a submodule under `rules/`. All contributors must follow the documentation-first, stage-gated workflow described in `rules/README.md` before touching source code. Start every change by reviewing the host artifacts:

- Pact — `PACT.md`
- Glossary — `GLOSSARY.md` (links back to the topic glossaries under `rules/generative/**`)
- Project Rules — `RULES.md`
- Guides & stage gates — `GUIDES.md`
- Implementation notes & validation plan — `IMPLEMENTATION.md`
- Architecture diagrams — `docs/architecture/c4-context.md`

Each artifact links back to the submodule so the forward-only change policy (`rules/RULES.md#6-forward-only-change-policy`) stays enforced. When syncing new Web Awesome releases, run through `PROMPT_LIBRARY_RULES_UPDATE.md` to refresh both this repo and the enterprise rules at the same time.




📦 Version: `3.0.0`

### Version Compatibility
- Current: 3.0.0 is synced with Web Awesome 3.0.0 (stable).
- 1.1.x matched Web Awesome 3.0.0-beta6
- 1.0.4 matched Web Awesome 3.0.0-beta.1
- 1.0.0 – 1.0.3 matched Web Awesome 3.0.0-alpha.13

### Component Removals
- Removed the experimental `<wa-code-demo>` component
- `<wa-menu>`, `<wa-menu-item>`, `<wa-menu-label>` were dropped; use `<wa-dropdown-item>` instead
- `<wa-icon-button>` was removed; icon buttons can be added via `<wa-button>` now
- `<wa-radio-button>` was dropped; use `<wa-radio appearance="button">` instead

### What's New in 1.1.0
- Alignment with Web Awesome 3.0.0-beta6 (preparing for Web Awesome 1.0.0)
- Added all component removals from recent Web Awesome betas
- Regenerated documentation and examples to reflect latest changes
- General bug fixes and improvements

### What's New in 1.0.3
- Enhanced checkbox directive with improved form integration
- Updated icon and icon-button directives for better customization
- Improved color-picker directive with additional styling options
- Fixed issues in comparison and details directives
- Enhanced select directive functionality
- Updated documentation for various components
- General bug fixes and performance improvements

🔗 [Web Awesome Component Docs](https://backers.webawesome.com/)

---

## 📌 About

This library makes it easy to use Web Awesome's rich set of components in Angular projects. It preserves native performance and design fidelity while enabling Angular-style development patterns:

* Angular `@Input()`s and `@Output()`s for binding
* Full support for `ngModel`
* Scoped styling via Angular-style inputs mapped to CSS custom properties
* Web component slot and attribute integration
* Standalone component packaging (no module needed)

---

## 🚀 Getting Started

### 1. Install the package

Angular Awesome requires Web Awesome as a peer dependency. Install both:

```bash
npm install angular-awesome web-awesome@^3.0.0
```

Make sure you’ve installed `@angular/core`, `@angular/forms`, and `@angular/common` version 19.2 or later.

### 2. Import a component

Each component is standalone and can be imported individually.

```ts
import { WaInputComponent } from 'angular-awesome/input';

@Component({
  standalone: true,
  imports: [WaInputComponent, FormsModule],
  template: `<wa-input [(ngModel)]="value" hint="Enter text"></wa-input>`
})
export class MyComponent {
  value = '';
}
```

---

## 📚 Components

All components and directives mirror the structure of the Web Awesome library. Check out the component-specific README files under:

```
projects/angular-awesome/src/lib/<component>/README.md
```

Each contains:

* Angular usage examples
* Available inputs and outputs
* Styling customizations
* Link to general [Web Awesome Angular Rules](./RULES.md)

### 📖 Documentation

Visit our [GitHub Pages documentation](https://gedmarc.github.io/angular-awesome/) for comprehensive information about all components and directives, including:

* Component overviews
* API references
* Usage examples
* Styling options

---

## 🎨 Styling

Angular-style input bindings automatically set the corresponding Web Awesome CSS custom properties. For example:

```html
<wa-spinner [trackWidth]="'6px'" [indicatorColor]="'deeppink'"></wa-spinner>
```

These map directly to:

```css
--track-width: 6px;
--indicator-color: deeppink;
```

---

## 🧪 Testing

To run tests:

```bash
npm test
```

For CI or headless testing:

```bash
npm run test:headless
```

---

## 📦 Build

To produce the production bundle:

```bash
npm run build
```

This uses `ng-packagr` and outputs all formats in the `dist/angular-awesome` directory.

### 🤖 Codex Auto Update Build

This repository exposes a dedicated GitHub Actions workflow at `.github/workflows/codex-auto-update.yml` that can run a Codex prompt in CI and open a pull request with the resulting edits.

To use it:

1. Add a repository secret named `CODEX_API_KEY` that contains a Codex-compatible API key.
2. Open **Actions → Codex Auto Update → Run workflow** and provide the prompt that describes the change you want Codex to make (optionally override the branch name).
3. The workflow downloads the Codex CLI, authenticates with the secret, executes the prompt inside this repo, and creates a pull request when files were changed.

In addition to the manual trigger, any push to the `master` branch that touches `react/**` automatically runs the workflow using the default instructions stored in `PROMPT_LIBRARY_RULES_UPDATE.md`. This keeps the Angular wrapper synchronized with React changes without any manual action.

If Codex does not modify the workspace the job will finish without creating a pull request. You can rerun the workflow with a new or refined prompt at any time.

---

## 🛠️ Contributing

Contributions are welcome through issues and PR's!

---

## Running tests on BrowserStack

This project can run its Karma/Jasmine test suite on BrowserStack.

Prerequisites:
- Create a BrowserStack account and obtain BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY.
- Install dev dependencies: npm install

Run:
- Set environment variables and run the BrowserStack test script:

Notes:
- If you don’t set env vars, karma.conf.js will fall back to the above defaults when BS=true.
- The config uses a Windows 11 Chrome latest launcher by default.
- You can set BUILD_TAG to label runs (e.g., BUILD_TAG=CI-123).
- Locally, you can still run tests with Chrome using: npm test
- SECURITY: Consider rotating these credentials if this repository becomes public.

### Quick commands (Windows)
- Run BrowserStack tests via batch file (uses default credentials):
  - .\bs-test.bat
  - With build tag: .\bs-test.bat MyBuildTag
- Run BrowserStack tests via npm one-liner (uses default credentials inline):
  - npm run test:bs:win
