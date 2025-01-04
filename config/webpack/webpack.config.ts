import type { NextJsWebpackConfig } from 'next/dist/server/config-shared';

export const WebpackConfig: NextJsWebpackConfig = function (config) {
  config.resolve.extensions.push('.svgr');

  config.module.rules.push({
    test: /\.svgr$/i,
    loader: '@svgr/webpack',
  });

  return config;
};
