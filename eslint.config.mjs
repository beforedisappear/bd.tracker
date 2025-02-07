import { FlatCompat } from '@eslint/eslintrc';
import jseslint from '@eslint/js';
import { config, configs } from 'typescript-eslint';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: config(jseslint.configs.recommended, configs.recommended),
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/typescript',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@next/next/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:prettier/recommended',
      'prettier',
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          jsxSingleQuote: true,
          endOfLine: 'auto',
          arrowParens: 'avoid',
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  }),
];

export default eslintConfig;
