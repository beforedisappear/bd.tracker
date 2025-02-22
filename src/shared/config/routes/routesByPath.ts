import { getMainRoute, getLoginRoute, getProfileRoute } from './routes';
import { AppRoutes } from './routes.types';

export const publicRoutesByPath: Record<string, AppRoutes> = {
  [getMainRoute()]: AppRoutes.MAIN,
  [getLoginRoute()]: AppRoutes.LOGIN,
};

export const privateRoutesByPath: Record<string, AppRoutes> = {
  [getProfileRoute()]: AppRoutes.PROFILE,
};
