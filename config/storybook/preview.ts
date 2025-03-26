import '@/app/styles/globals.css';

import { ThemeDecorator } from '@/shared/lib/storybook/decorators';
import { themes } from '@storybook/theming';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [ThemeDecorator],
  parameters: {
    docs: {
      theme: themes.dark,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: 'hsl(var(--background))' }],
    },
  },
};

export default preview;
