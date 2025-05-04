import path from 'path';

export const CypressWebpackConfig = {
  resolve: {
    extensions: ['.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
};
