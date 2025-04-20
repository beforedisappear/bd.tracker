import { LOGIN_PAGE_DESC, LOGIN_PAGE_TITLE } from '@/pages/LoginPage';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: LOGIN_PAGE_TITLE,
  description: LOGIN_PAGE_DESC,
};

export { LoginPage as default } from '@/pages/LoginPage';
