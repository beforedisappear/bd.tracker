/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    'postcss-sort-media-queries': { sort: 'desktop-first' },
  },
};

export default config;
