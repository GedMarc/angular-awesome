// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    ignores: ["**/*.spec.ts"],
  },
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // --- Angular selector rules ---
      // Directives in this library wrap <wa-*> web-component elements,
      // so both "element" and "attribute" selector types are valid.
      // Directives in this library use both kebab-case element selectors
      // (wa-toast, wa-button) and camelCase attribute selectors (waLayoutAlign).
      // The rule doesn't support multiple styles, so we disable it.
      "@angular-eslint/directive-selector": "off",
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "wa",
          style: "kebab-case",
        },
      ],

      // --- Angular binding alias rules ---
      // Output aliases (e.g. @Output('wa-show')) mirror native web-component
      // event names and are intentional.
      "@angular-eslint/no-output-rename": "off",
      // Input aliases (e.g. @Input('aria-label')) map to web-component attributes.
      "@angular-eslint/no-input-rename": "off",
      // Some outputs re-emit native DOM events from the underlying web component.
      "@angular-eslint/no-output-native": "off",

      // --- Angular lifecycle & DI rules ---
      // Empty lifecycle hooks are used as extension points in base directives.
      "@angular-eslint/no-empty-lifecycle-method": "off",
      // Constructor injection is acceptable alongside inject().
      "@angular-eslint/prefer-inject": "off",

      // --- TypeScript rules ---
      // Web-component interop frequently requires `any` for native element
      // properties that lack typings.
      "@typescript-eslint/no-explicit-any": "off",
      // Allow underscore-prefixed parameters to signal intentionally unused args
      // (e.g. `_changes` in ngOnChanges, `_e` in test stubs).
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Empty functions are used for CVA stubs (onChange / onTouched) and
      // test-host event handlers.
      "@typescript-eslint/no-empty-function": "off",
      // Allow explicit type annotations even when inferrable – they can
      // improve readability in directive property declarations.
      "@typescript-eslint/no-inferrable-types": "off",

      // --- Core ESLint rules ---
      // Empty catch/if blocks are used intentionally in several directives.
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
