import js from '@eslint/js';
import {defineConfig} from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const noWildcardImports = {
  selector: 'ImportNamespaceSpecifier',
  message:
    'Avoid wildcard (import * as X) imports — prefer named imports for clarity and tree-shaking.',
};

const noFalsyTernaryConsequent = {
  selector:
    'ConditionalExpression > Identifier.consequent[name="undefined"], ConditionalExpression > Literal.consequent[value=null], ConditionalExpression > Literal.consequent[value=false]',
  message:
    'Invert this ternary — put the meaningful value in the truthy branch, not undefined/null/false. `cond ? value : undefined` reads clearer than `cond ? undefined : value` (flip the condition too if needed).',
};

const noHardcodedHexColors = {
  selector: 'Literal[value=/^#([0-9a-fA-F]{3}){1,2}$/]',
  message:
    'Reference a theme.other.<token> color instead of a hardcoded hex value — colors live in theme.ts so CSS stays maintainable. Add the token there if it does not exist yet.',
};

const noRelativeParentImports = {
  selector:
    'ImportDeclaration[source.value=/^\\.\\./], ExportNamedDeclaration[source.value=/^\\.\\./], ExportAllDeclaration[source.value=/^\\.\\./]',
  message:
    'Use an absolute "@/..." import instead of a relative parent import ("../") — same-directory ("./") imports are still fine.',
};

// Base rules mirror Google's official gts ESLint config
// (https://github.com/google/gts), the reference implementation of
// https://google.github.io/styleguide/tsguide.html
export default defineConfig(
  {ignores: ['dist', 'dist-ssr', '.claude']},
  js.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      prettier: eslintPluginPrettier,
      'simple-import-sort': simpleImportSort,
      'prefer-arrow-functions': preferArrowFunctions,
    },
    rules: {
      'prettier/prettier': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'block-scoped-var': 'error',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'eol-last': 'error',
      'prefer-arrow-callback': 'error',
      // Arrow functions everywhere; the rule itself skips cases where converting
      // would change behavior (uses `this`/`arguments`, generators, hoisting-
      // dependent recursion) — those are the "good reason" exceptions.
      'prefer-arrow-functions/prefer-arrow-functions': ['error', {returnStyle: 'unchanged'}],
      'no-trailing-spaces': 'error',
      quotes: ['warn', 'single', {avoidEscape: true}],
      'no-else-return': ['error', {allowElseIf: false}],
      'no-nested-ternary': 'error',
      curly: ['error', 'multi-line'],
      // Keeps brace-less if bodies (allowed by `curly` above) on the same
      // line as the condition, so they read as one-liners rather than
      // wrapping onto their own unbraced line.
      'nonblock-statement-body-position': ['error', 'beside'],
      'padding-line-between-statements': [
        'error',
        {blankLine: 'always', prev: '*', next: 'return'},
        {blankLine: 'always', prev: '*', next: 'if'},
      ],
      'no-restricted-syntax': [
        'error',
        noWildcardImports,
        noFalsyTernaryConsequent,
        noRelativeParentImports,
      ],
      'max-lines-per-function': [
        'warn',
        {max: 150, skipBlankLines: true, skipComments: true, IIFEs: true},
      ],
    },
  },
  {
    // TypeScript, linted in strict mode
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.strictTypeChecked],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
      '@typescript-eslint/array-type': ['error', {default: 'array-simple'}],
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    // Colors belong in theme.ts, referenced via theme.other.<token> —
    // hardcoding hex values elsewhere makes the CSS harder to keep consistent.
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/theme.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        noWildcardImports,
        noHardcodedHexColors,
        noFalsyTernaryConsequent,
        noRelativeParentImports,
      ],
    },
  },
  {
    // React and JSX accessibility rules
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...jsxA11y.configs.strict.rules,
    },
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
    },
    settings: {
      react: {version: '19.2'},
    },
  },
  storybook.configs['flat/recommended'],
);
