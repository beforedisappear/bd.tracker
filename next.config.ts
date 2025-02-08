import type { NextConfig } from 'next';

import { TurbopackConfig } from './config/turbopack/turbopack.config';
import { WebpackConfig } from './config/webpack/webpack.config';

const nextConfig: NextConfig = {
  webpack: WebpackConfig,
  experimental: {
    turbo: TurbopackConfig,
  },
  // reactStrictMode: false,
};

export default nextConfig;
