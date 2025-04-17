import TailwindAnimate from 'tailwindcss-animate';
import TailwindLineClamp from '@tailwindcss/line-clamp';

import { colors } from './colors';
import { borderRadius } from './borderRadius';
import { screens } from './screens';
import { keyframes } from './keyframes';
import { animation } from './animation';
import { container } from './container';

import type { Config } from 'tailwindcss';

export const tailwindConfig: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors,
      borderRadius,
      screens,
      keyframes,
      animation,
      container,
    },
  },
  plugins: [TailwindAnimate, TailwindLineClamp],
};
