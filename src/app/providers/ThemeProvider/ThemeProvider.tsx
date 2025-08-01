'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { themeConfig } from './ThemeProvider.config';

interface IProps extends React.PropsWithChildren {}

export function ThemeProvider({ children }: IProps) {
  return <NextThemesProvider {...themeConfig}>{children}</NextThemesProvider>;
}
