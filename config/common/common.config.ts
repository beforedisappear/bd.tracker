import type { NextConfig } from 'next';

type CommonCfg = {
  [K in keyof NextConfig as K extends 'webpack' | 'turbopack'
    ? never
    : K]: NextConfig[K];
};

export const СommonConfig: CommonCfg = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
    ],
  },
};
