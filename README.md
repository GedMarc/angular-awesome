# Angular Awesome

Angular Awesome is an Angular 19+ wrapper library for the [Web Awesome](https://backers.webawesome.com/) UI framework. It provides idiomatic Angular bindings for `wa-*` custom elements, allowing full integration with Angular forms, events, styles, and lifecycle mechanisms.




📦 Version: `1.1.0`

### Version Compatibility
- Versions 1.0.0 to 1.0.3 match to Web Awesome 3.0.0-alpha.13
- Versions 1.0.4 match to Web Awesome 3.0.0-beta.1
- Versions 2.0.0+ match to Web Awesome 3.0.0-beta.4

### Component Removals
- Removed the experimental `<wa-code-demo>` component
- `<wa-menu>`, `<wa-menu-item>`, `<wa-menu-label>` were dropped; use `<wa-dropdown-item>` instead
- `<wa-icon-button>` was removed; icon buttons can be added via `<wa-button>` now
- `<wa-radio-button>` was dropped; use `<wa-radio appearance="button">` instead

### What's New in 1.1.0
- Major version update to align with Web Awesome 3.0.0-beta.4
- Added all component removals from Web Awesome beta
- Updated documentation to reflect the latest changes
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

```bash
npm install angular-awesome
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

---

## 🛠️ Contributing

Contributions are welcome through issues and PR's!

---

## 🧾 License

2025 GedMarc
