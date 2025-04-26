import { AppRoutes, routesMetadata } from '@/shared/config/routes';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...routesMetadata[AppRoutes.LOGIN],
};

export { LoginPage as default } from '@/pages/LoginPage';
