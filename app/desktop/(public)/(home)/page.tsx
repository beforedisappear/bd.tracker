import {
  PUBLIC_HOME_PAGE_DESC,
  PUBLIC_HOME_PAGE_TITLE,
} from '@/pages/PublicHomePage';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: PUBLIC_HOME_PAGE_TITLE,
  description: PUBLIC_HOME_PAGE_DESC,
};

export { PublicHomePage as default } from '@/pages/PublicHomePage';
