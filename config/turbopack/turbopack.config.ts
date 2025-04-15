import type { TurbopackOptions } from 'next/dist/server/config-shared';

export const TurbopackConfig: TurbopackOptions = {
  rules: {
    '*.svgr': {
      loaders: ['@svgr/webpack'],
      as: '*.js',
    },
  },
  resolveExtensions: [
    '.mdx',
    '.tsx',
    '.ts',
    '.jsx',
    '.js',
    '.mjs',
    '.json',
    '.svgr',
  ],
};
