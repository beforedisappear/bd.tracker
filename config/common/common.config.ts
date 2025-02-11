import type { NextConfig } from 'next';

type CommonCfg = Omit<NextConfig, 'webpack'>;

export const СommonConfig: CommonCfg = {
  reactStrictMode: false,
};
