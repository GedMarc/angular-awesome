---
name: angular-awesome-docs
description: "Generate, update, and maintain documentation for Angular Awesome components. Use when creating or updating rules.md, example.md, or toast/component docs, running the doc generator (generate-docs.js), updating the CHANGELOG.md, updating the components index, or syncing version badges across the docs site."
metadata:
  short-description: Generate and maintain Angular Awesome documentation
---

# Angular Awesome — Documentation

Maintain the docs pipeline: source markdown → generated HTML → changelog.

## Documentation Pipeline

```
src/directives/<name>/<name>.rules.md   ──┐
src/directives/<name>/<name>.example.md ──┤
docs/includes/template.html             ──┼──→ node docs/generate-docs.js ──→ docs/components/<name>.html
docs/includes/components-list-template.html ─┘                            ──→ docs/components.html
```

## Source Files (per component)

### `<name>.rules.md`
Authoritative API documentation. Structure:

```markdown
# <ComponentName>
<One-line description extracted by generate-docs.js>

## Overview
<Detailed description — extracted as componentOverview>

## Getting Started
<Basic setup instructions>

## API Reference
<Inputs, Outputs, Methods, Slots — extracted as apiSection>

## Styling
<CSS custom properties, CSS parts — extracted as stylingSection>
```

Key: The doc generator extracts sections by heading. `## API Reference` and `## Styling` are parsed into separate page sections. The first paragraph after `# Title` becomes the subtitle.

### `<name>.example.md`
Runnable code examples. Structure:

```markdown
# <Name> Examples

## Basic Usage
\`\`\`html
<wa-name>content</wa-name>
\`\`\`

## Variants
\`\`\`ts
// TypeScript usage example
\`\`\`
```

Rendered as HTML via `marked` and inserted into the Examples section.

## Generating Docs

```bash
node docs/generate-docs.js
```

This:
1. Scans `src/directives/*/` for `<name>.rules.md` and `<name>.example.md`
2. Falls back to `rules/generative/frontend/webawesome/<name>.rules.md` if local rules missing
3. Parses markdown sections (description, overview, API, styling, examples)
4. Applies `docs/includes/template.html` placeholders
5. Writes `docs/components/<name>.html`
6. Regenerates `docs/components.html` (component index)

## Template Placeholders

| Placeholder | Source |
|-------------|--------|
| `PAGE_TITLE` | Component name (camelCase, capitalized) |
| `PAGE_SUBTITLE` | First paragraph from rules.md |
| `PAGE_CONTENT` | Full assembled sections |
| `{{COMPONENT_NAME}}` | camelCase component name |
| `{{COMPONENT_EXAMPLES}}` | Rendered example markdown |
| `{{COMPONENT_API}}` | Rendered API Reference section |
| `{{COMPONENT_STYLING}}` | Rendered Styling section |
| `{{COMPONENT_CARDS}}` | Component index cards (components.html) |

## Version Badge

Global badge in `docs/includes/template.html`:
```html
<span class="version-badge">synced with Web Awesome 3.3.x</span>
```
Update when bumping the Web Awesome version alignment.

## CHANGELOG.md

Format: [Keep a Changelog](https://keepachangelog.com/) + SemVer.

```markdown
## [X.Y.Z] - YYYY-MM-DD
### Added
- New component wrappers...

### Changed
- Migration/breaking changes...

### Notes
- Breaking change callouts...
```

Add entries under the current version section. Create a new section only for new releases.

## Component Index (`docs/components.html`)

Auto-generated from `docs/includes/components-list-template.html`. Categories are defined in `generate-docs.js`:
```js
const componentCategories = {
  'toast': 'feedback',
  'button': 'input',
  'dialog': 'feedback',
  // ...
};
```

Add new components to this map when they don't match an existing category.

## Checklist

- [ ] `<name>.rules.md` has Overview, API Reference, Styling sections
- [ ] `<name>.example.md` has runnable code snippets
- [ ] `node docs/generate-docs.js` succeeds without errors
- [ ] Generated `docs/components/<name>.html` renders correctly
- [ ] Component appears in `docs/components.html` index
- [ ] CHANGELOG.md updated for the current version
- [ ] Version badge matches current Web Awesome alignment

