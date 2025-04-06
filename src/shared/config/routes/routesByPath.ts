import {
  getMainRoute,
  getLoginRoute,
  getProfileRoute,
  getHomeRoute,
} from './routes';
import { AppRoutes } from './routes.types';

export const publicRoutesByPath: Record<string, AppRoutes> = {
  [getMainRoute()]: AppRoutes.MAIN,
  [getLoginRoute()]: AppRoutes.LOGIN,
};

export const privateRoutesByPath: Record<string, AppRoutes> = {
  [getProfileRoute()]: AppRoutes.PROFILE,
  [getHomeRoute()]: AppRoutes.HOME,
};

export const serviceRoutesByPath: Record<string, AppRoutes> = {};
