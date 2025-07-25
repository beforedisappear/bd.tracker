import { AppRoutes, routesMetadata } from '@/shared/config/routes';

import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  ...routesMetadata[AppRoutes.PROFILE],
};

export { ProfilePage as default } from '@/pages/ProfilePage';
