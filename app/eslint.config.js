import js from '@eslint/js';
import {defineConfig} from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Base rules mirror Google's official gts ESLint config
// (https://github.com/google/gts), the reference implementation of
// https://google.github.io/styleguide/tsguide.html
export default defineConfig(
  {ignores: ['dist']},
  js.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      prettier: eslintPluginPrettier,
      'simple-import-sort': simpleImportSort,
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
      'no-trailing-spaces': 'error',
      quotes: ['warn', 'single', {avoidEscape: true}],
      'no-else-return': ['error', {allowElseIf: false}],
      curly: ['error', 'multi-line'],
      'padding-line-between-statements': [
        'error',
        {blankLine: 'always', prev: '*', next: 'return'},
        {blankLine: 'always', prev: '*', next: 'if'},
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ImportNamespaceSpecifier',
          message:
            'Avoid wildcard (import * as X) imports — prefer named imports for clarity and tree-shaking.',
        },
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
      'react-refresh/only-export-components': [
        'warn',
        {allowConstantExport: true},
      ],
      '@typescript-eslint/array-type': ['error', {default: 'array-simple'}],
      '@typescript-eslint/no-non-null-assertion': 'off',
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
);
