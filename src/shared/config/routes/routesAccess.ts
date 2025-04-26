import { AppRoutes, type RouteAccess } from './routes.types';

export const routesAccess: Record<AppRoutes, RouteAccess> = {
  //public
  [AppRoutes.MAIN]: 'public',
  [AppRoutes.LOGIN]: 'public',

  //private
  [AppRoutes.HOME]: 'private',
  [AppRoutes.PROFILE]: 'private',
  [AppRoutes.TEAM]: 'private',
  [AppRoutes.PROJECT]: 'private',

  //service
  [AppRoutes.INVITE]: 'service',
  [AppRoutes.NOT_FOUND]: 'service',
};
