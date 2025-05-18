import type { NextJsWebpackConfig } from 'next/dist/server/config-shared';
import path from 'path';
export const WebpackConfig: NextJsWebpackConfig = function (config) {
  config.resolve.extensions.push('.svgr');

  config.module.rules.push({
    test: /\.svgr$/i,
    loader: '@svgr/webpack',
  });

  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, '../../src'),
    'api/': path.resolve(__dirname, '../../api'),
    'app/': path.resolve(__dirname, '../../app'),
    'config/': path.resolve(__dirname, '../../config'),
  };

  return config;
};
