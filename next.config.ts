import { NextСommonConfig } from 'config/nextCommon/nextCommon.config';
import { TurbopackConfig } from 'config/turbopack/turbopack.config';
import { WebpackConfig } from 'config/webpack/webpack.config';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: WebpackConfig,
  turbopack: TurbopackConfig,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },

  ...NextСommonConfig,
};

export default nextConfig;
