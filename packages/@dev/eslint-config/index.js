import tsEsLintPlugin from '@typescript-eslint/eslint-plugin'
import { default as tsEsLintParser } from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import tailwindCssPlugin from 'eslint-plugin-tailwindcss'
import testingLibraryPlugin from 'eslint-plugin-testing-library'

export default [
  { ignores: ['**/node_modules/', '**/dist/', '**/build/'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'array-callback-return': 'error',
      curly: 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'func-style': 'error',
      'prefer-const': 'error',
      'no-console': 'off',

      'no-restricted-globals': ['error', 'close', 'open'],
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '_',
          ignoreRestSiblings: false,
          varsIgnorePattern: '_',
        },
      ],
      'object-shorthand': ['error', 'properties'],
      'one-var': ['error', 'never'],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsEsLintParser,
      parserOptions: {
        project: false,
      },
    },
    plugins: {
      import: importPlugin,
      '@typescript-eslint': tsEsLintPlugin,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      tailwindcss: tailwindCssPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    plugins: {
      'testing-library': testingLibraryPlugin,
    },
  },
]
