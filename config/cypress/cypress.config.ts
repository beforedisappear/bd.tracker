import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'cypress';
import webpackPreprocessor from '@cypress/webpack-preprocessor';
import { CypressWebpackConfig } from './webpack.config';

//load env variables
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    TEST_USER_AUTH_CODE: process.env.TEST_USER_AUTH_CODE,
    TEST_USER_EMAIL: process.env.TEST_USER_EMAIL,
  },

  e2e: {
    baseUrl: process.env.NEXT_PUBLIC_URL,
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'config/cypress/support/e2e.ts',
    fixturesFolder: 'config/cypress/fixtures',
    videosFolder: 'config/cypress/videos',
    screenshotsFolder: 'config/cypress/screenshots',
    setupNodeEvents(on, config) {
      on(
        'file:preprocessor',
        webpackPreprocessor({
          webpackOptions: CypressWebpackConfig,
        }),
      );

      return config;
    },
  },
});
