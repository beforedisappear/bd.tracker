import { AppRoutes, routesMetadata } from '@/shared/config/routes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...routesMetadata[AppRoutes.PROJECT_BY_ID],
};

export { ProjectByIdPage as default } from '@/pages/ProjectByIdPage';
