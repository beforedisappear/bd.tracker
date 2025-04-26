import { AppRoutes, routesMetadata } from '@/shared/config/routes';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...routesMetadata[AppRoutes.MAIN],
};

export { MainPage as default } from '@/pages/MainPage';
