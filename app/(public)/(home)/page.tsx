import { HOME_PAGE_TITLE, HOME_PAGE_DESC } from '@/pages/HomePage';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: HOME_PAGE_TITLE,
  description: HOME_PAGE_DESC,
};

export { HomePage as default } from '@/pages/HomePage';
