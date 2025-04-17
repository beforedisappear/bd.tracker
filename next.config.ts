import { СommonConfig } from '&/common/common.config';
import { TurbopackConfig } from '&/turbopack/turbopack.config';
import { WebpackConfig } from '&/webpack/webpack.config';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: WebpackConfig,
  turbopack: TurbopackConfig,

  ...СommonConfig,
};

export default nextConfig;
