/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    'tailwindcss',
    ['postcss-sort-media-queries', { sort: 'desktop-first' }],
    'autoprefixer',
  ],
};
