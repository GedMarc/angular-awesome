# Angular Awesome

[![CI](https://github.com/GedMarc/angular-awesome/actions/workflows/ci.yml/badge.svg)](https://github.com/GedMarc/angular-awesome/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/angular-awesome.svg)](https://www.npmjs.com/package/angular-awesome)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Angular](https://img.shields.io/badge/Angular-19%2B-dd0031.svg?logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> Angular 19+ wrapper directives for the [Web Awesome](https://www.webawesome.com/) web-components framework.

## Overview

**Angular Awesome** provides first-class Angular directives that wrap every Web Awesome web component, giving you:

- **Native Angular binding** — `@Input()` properties, `@Output()` events, and two-way binding via `ngModel` / Reactive Forms where applicable.
- **Full component coverage** — 70+ directives including layout primitives, form controls, navigation, overlays, charts, toasts, and more.
- **Type safety** — full TypeScript declarations with strict mode support.
- **Lightweight** — thin wrappers with zero extra runtime dependencies beyond Angular and Web Awesome.

## Prerequisites

| Dependency | Version |
|------------|---------|
| Angular    | `^19.2` |
| Node.js    | `20+`   |
| Web Awesome | `3.3.x` |

## Installation

```bash
npm install angular-awesome
```

Make sure the Web Awesome stylesheet and scripts are loaded in your application (see the [Web Awesome docs](https://www.webawesome.com/docs/) for details).

## Quick Start

Import the directives you need directly — every directive is standalone:

```typescript
import { WaButtonDirective } from 'angular-awesome';

@Component({
  standalone: true,
  imports: [WaButtonDirective],
  template: `<wa-button variant="brand" (click)="save()">Save</wa-button>`,
})
export class MyComponent {
  save() {
    console.log('Saved!');
  }
}
```

## Available Components

<details>
<summary>Expand full component list (70+)</summary>

| Category | Components |
|----------|-----------|
| **Layout** | `wa-layout-align`, `wa-layout-cluster`, `wa-layout-flank`, `wa-layout-frame`, `wa-layout-gap`, `wa-layout-grid`, `wa-layout-split`, `wa-layout-stack` |
| **Navigation** | `wa-breadcrumbs`, `wa-tab-group`, `wa-tree` |
| **Buttons** | `wa-button`, `wa-button-group`, `wa-copy-button` |
| **Form Controls** | `wa-checkbox`, `wa-color-picker`, `wa-combobox`, `wa-file-input`, `wa-input`, `wa-number-input`, `wa-radio`, `wa-rating`, `wa-select`, `wa-slider`, `wa-switch`, `wa-text-area` |
| **Data Display** | `wa-avatar`, `wa-badge`, `wa-card`, `wa-carousel`, `wa-comparison`, `wa-icon`, `wa-skeleton`, `wa-sparkline`, `wa-tag`, `wa-text`, `wa-qr-code` |
| **Charts** | `wa-chart`, `wa-bar-chart`, `wa-bubble-chart`, `wa-doughnut-chart`, `wa-line-chart`, `wa-pie-chart`, `wa-polar-area-chart`, `wa-radar-chart`, `wa-scatter-chart` |
| **Feedback** | `wa-callout`, `wa-dialog`, `wa-drawer`, `wa-popover`, `wa-popup`, `wa-toast`, `wa-toast-item`, `wa-tooltip` |
| **Progress** | `wa-progress-bar`, `wa-progress-ring`, `wa-spinner` |
| **Formatting** | `wa-format-bytes`, `wa-format-date`, `wa-format-number`, `wa-relative-time` |
| **Media** | `wa-animated-image`, `wa-animation`, `wa-zoomable-frame` |
| **Utilities** | `wa-divider`, `wa-dropdown`, `wa-include`, `wa-intersection-observer`, `wa-mutation-observer`, `wa-resize-observer`, `wa-scroller`, `wa-split-panel` |

</details>

## Development

### Build

```bash
npm install
npm run build
```

### Test

```bash
# Headless (recommended — no browser window)
npm run test:headless

# Interactive (opens Chrome for debugging)
npm test
```

### Documentation

```bash
npm run docs:build
```

Generated docs are deployed to [https://gedmarc.github.io/angular-awesome](https://gedmarc.github.io/angular-awesome).

## Project Structure

```
src/
├── directives/       # One folder per Web Awesome component
│   ├── button/
│   ├── checkbox/
│   ├── dialog/
│   └── ...           # 70+ component directories
├── services/         # Shared Angular services (e.g. toast service)
├── types/            # Shared TypeScript types
├── public-api.ts     # Library public API surface
└── test-main.ts      # Karma test bootstrap
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-change`).
3. Run `npm run build` and `npm run test:headless` to verify your changes.
4. Open a pull request against `master`.

All pull requests are validated by the [CI workflow](.github/workflows/ci.yml).

## License

This project is licensed under the [Apache License 2.0](LICENSE).

## Links

- 📦 [npm package](https://www.npmjs.com/package/angular-awesome)
- 📖 [Documentation](https://gedmarc.github.io/angular-awesome)
- 🐛 [Issue tracker](https://github.com/GedMarc/angular-awesome/issues)
- 📝 [Changelog](CHANGELOG.md)


