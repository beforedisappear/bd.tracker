import { defineConfig } from 'cypress';
import webpackPreprocessor from '@cypress/webpack-preprocessor';
import { CypressWebpackConfig } from './webpack.config';
import dotenv from 'dotenv';
import path from 'path';

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

  e2e: {
    baseUrl: process.env.NEXT_PUBLIC_URL,
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
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
