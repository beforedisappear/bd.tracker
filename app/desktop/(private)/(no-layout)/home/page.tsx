import { AppRoutes, routesMetadata } from '@/shared/config/routes';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...routesMetadata[AppRoutes.HOME],
};

export { HomePage as default } from '@/pages/HomePage';
