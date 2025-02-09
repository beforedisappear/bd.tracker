import TailwindAnimate from 'tailwindcss-animate';

import { colors } from './colors';
import { borderRadius } from './borderRadius';
import { screens } from './screens';

import type { Config } from 'tailwindcss';

export const tailwindConfig: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors,
      borderRadius,
      screens,
    },
  },
  plugins: [TailwindAnimate],
};
