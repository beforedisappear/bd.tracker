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
    '@': path.join(process.cwd(), 'src'),
    api: path.join(process.cwd(), 'api'),
    app: path.join(process.cwd(), 'app'),
    config: path.join(process.cwd(), 'config'),
    socket: path.join(process.cwd(), 'socket'),
  };

  return config;
};
