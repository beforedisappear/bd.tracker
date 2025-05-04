import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  e2e: {
    supportFile: 'config/cypress/support/e2e.ts',
    fixturesFolder: 'config/cypress/fixtures',
    videosFolder: 'config/cypress/videos',
    screenshotsFolder: 'config/cypress/screenshots',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
