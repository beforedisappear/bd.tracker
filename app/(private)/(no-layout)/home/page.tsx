import { PRIVATE_HOME_PAGE_TITLE } from '@/pages/PrivateHomePage';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: PRIVATE_HOME_PAGE_TITLE,
};

export { PrivateHomePage as default } from '@/pages/PrivateHomePage';
