# Code Highlighter

Display syntax-highlighted source code with an optional copy button.

## Overview

Import `WaCodeHighlighterDirective` from `angular-awesome` and load the Web Awesome 3.15 Core element in your application. The element displays plain text when the browser lacks the CSS Custom Highlight API or no language is selected.

## API Reference

| Input | Purpose |
| --- | --- |
| `code` | Programmatic source text. Pass an empty string or null to use the default slot. |
| `language` | Web Awesome grammar name or alias. |
| `label` | Accessible name of the code region. |
| `withoutCopy` | Hide the copy button. |
| `withoutDedent` | Preserve indentation in the default slot. |
| `wrap` | Wrap long lines. |

The `waLoad` / `wa-load` output reports successful highlighting. The `waError` / `wa-error` output reports an unavailable grammar.

For custom languages, import `registerCodeGrammar()` from `@awesome.me/webawesome`. When self-hosting, serve the Web Awesome grammar assets alongside the component scripts so grammars can load on demand.

## Styling

Bind the token color inputs `commentColor`, `keywordColor`, `operatorColor`, `stringColor`, `constantColor`, `functionColor`, `typeColor`, `variableColor`, `propertyColor`, `tagColor`, `selectorColor`, `insertedColor`, and `deletedColor`. Each sets its corresponding CSS custom property, for example `keywordColor` sets `--keyword-color`.

Use `::part(pre)`, `::part(code)`, and `::part(copy-button)` to style the scroll container, source text, and copy control.

[Web Awesome code highlighter](https://webawesome.com/docs/components/code-highlighter/)
