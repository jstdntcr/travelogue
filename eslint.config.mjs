import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      import: importPlugin,
      'node': importPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'sort-imports': 'off', // Disable sort-imports since we're using import/order
      'import/order': [
        'error',
        {
          // Group imports to match ['none', 'single', 'multiple', 'all']
          groups: [
            ['builtin', 'external'], // 'none', 'single', 'multiple' (default and named imports from external modules)
            ['internal', 'parent', 'sibling', 'index'], // Local imports
          ],
          // Handle 'all' (namespace imports) by ensuring they come last within each group
          pathGroups: [
            {
              pattern: '{*,**/*}', // Matches namespace imports (e.g., import * as module)
              group: 'external',
              position: 'after', // Place namespace imports after other external imports
            },
          ],
          'newlines-between': 'never', // No blank lines between import groups
          alphabetize: {
            order: 'asc', // Sort alphabetically
            caseInsensitive: false, // Case-sensitive sorting
          },
        },
      ],
      'import/named': 'error', // Enforce sorting of named imports (e.g., import { b, a } -> import { a, b })
      'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
      '@/no-process-env': 'error',
    },
  },
];