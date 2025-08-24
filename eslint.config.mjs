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
    ],
    plugins: ['boundaries'],
    settings: {
      'import/resolver': { typescript: { alwaysTryTypes: true } },
      'boundaries/elements': [
        { type: 'app', pattern: 'app/*', capture: ['app'] },
        { type: 'pages', pattern: 'pages/*', capture: ['page'] },
        { type: 'widgets', pattern: 'widgets/*', capture: ['widget'] },
        { type: 'features', pattern: 'features/*', capture: ['feature'] },
        { type: 'entitiesX', pattern: 'entities/**/@x/**' },
        { type: 'entities', pattern: 'entities/*', capture: ['entity'] },
        { type: 'shared', pattern: 'shared/*', capture: ['shared'] },
      ],
    },
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
      '@typescript-eslint/no-namespace': 'off',
      // disallow all entry-points by default
      'boundaries/entry-point': [
        'error',
        {
          // disallow all entry-points by default
          default: 'disallow',
          // message: '${file.type} is not allowed to import ${dependency.type}',
          rules: [
            { target: ['app', 'shared'], allow: '**/*.*' },
            {
              target: ['pages', 'widgets', 'features', 'entities', 'entitiesX'],
              allow: [
                'index.ts',
                'index.tsx',
                's.ts',
                's.tsx',
                'c.ts',
                'c.tsx',
                'testing.ts',
                'testing.tsx',
              ],
            },
            { target: ['features'], allow: ['*/index.ts', '*/index.tsx'] }, // feature groups
            { target: ['entitiesX'], allow: ['*'] }, // entities cross import
          ],
        },
      ],
      // allow ui to import modules
      'boundaries/element-types': [
        'error',
        {
          default: 'allow',
          rules: [
            {
              from: ['pages'],
              disallow: ['app'],
              message: `Pages must not import upper layers`,
            },
            {
              from: ['widgets'],
              disallow: ['app', 'pages'],
              message: `Widgets must not import upper layers`,
            },
            {
              from: ['features'],
              disallow: ['app', 'pages', 'widgets'],
              message: `Features must not import upper layers`,
            },
            {
              from: ['entities'],
              disallow: ['app', 'pages', 'widgets', 'features'],
              message: `Entities must not import upper layers`,
            },
            {
              from: ['shared'],
              disallow: ['app', 'pages', 'widgets', 'features', 'entities'],
              message: `Shared must not import upper layers`,
            },
            {
              from: ['pages'],
              message: 'Page must not import other page',
              disallow: [['pages', { page: '!${page}' }]],
            },
            {
              from: ['widgets'],
              message: 'Widget must not import other widget',
              disallow: [['widgets', { widget: '!${widget}' }]],
            },
            {
              from: ['features'],
              message: 'Feature must not import other feature',
              disallow: [['features', { feature: '!${feature}' }]],
            },
            {
              from: ['entities'],
              message: 'Entities must not import other entities',
              disallow: [['entities', { entity: '!${entity}' }]],
            },
            {
              from: ['app', 'pages', 'widgets', 'features', 'shared'],
              message: 'EntitiesX must not import other layers',
              disallow: ['entitiesX'],
            },
          ],
        },
      ],
    },
  }),
];

export default eslintConfig;
