import './styles/globals.css';

import { geistMono } from './fonts/geistMono';
import { geistSans } from './fonts/geistSans';

import type { PropsWithChildren } from 'react';

export function App({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
