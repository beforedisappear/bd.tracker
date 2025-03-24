import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../../src/**/*.mdx',
    '../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-themes',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: '../../next.config.ts',
    },
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    check: false,
    reactDocgenTypescriptOptions: {
      tsconfigPath: '../../tsconfig.json',
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async config => {
    if (config.module) {
      config.module.rules = config.module.rules?.map(rule => {
        if (
          rule &&
          typeof rule !== 'string' &&
          rule.test instanceof RegExp &&
          rule.test.test('test.css')
        ) {
          return { ...rule, sideEffects: true };
        }
        return rule;
      });
    }
    return config;
  },
  // staticDirs: ["..\\public"],
};

export default config;
