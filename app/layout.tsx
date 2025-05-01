import { SITE_DESCRIPTION, SITE_NAME } from '@/shared/constants';

import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
};

export { App as default } from '@/app/App';
