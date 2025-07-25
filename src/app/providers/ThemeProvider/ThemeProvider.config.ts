import type { ThemeProviderProps } from 'next-themes';

export const themeConfig: ThemeProviderProps = {
  // forcedTheme: 'dark',
  attribute: 'class',
  defaultTheme: 'dark',
  enableSystem: false,
  disableTransitionOnChange: true,
};
