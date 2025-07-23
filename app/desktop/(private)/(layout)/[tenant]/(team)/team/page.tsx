import { AppRoutes, routesMetadata } from '@/shared/config/routes';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...routesMetadata[AppRoutes.TEAM],
};

export const dynamic = 'force-static';

export { TeamPage as default } from '@/pages/TeamPage';
