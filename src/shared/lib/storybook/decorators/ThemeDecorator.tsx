import { withThemeByClassName } from '@storybook/addon-themes';

export const ThemeDecorator = withThemeByClassName({
  themes: {
    light: 'light',
    dark: 'dark',
  },
  defaultTheme: 'light',
});
