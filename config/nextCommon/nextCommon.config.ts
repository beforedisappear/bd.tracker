import type { NextConfig } from 'next';

type NextCommonCfg = {
  [K in keyof NextConfig as K extends 'webpack' | 'turbopack'
    ? never
    : K]: NextConfig[K];
};

export const NextСommonConfig: NextCommonCfg = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },
    ],
  },
  devIndicators: { position: 'top-right' },
};
