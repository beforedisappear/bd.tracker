import {
  getMainRoute,
  getLoginRoute,
  getProfileRoute,
  getHomeRoute,
  getInviteRoute,
  getTeamRoute,
} from './routes';
import { AppRoutes } from './routes.types';

export const publicRoutesByPath: Record<string, AppRoutes> = {
  [getMainRoute()]: AppRoutes.MAIN,
  [getLoginRoute()]: AppRoutes.LOGIN,
};

export const privateRoutesByPath: Record<string, AppRoutes> = {
  [getProfileRoute()]: AppRoutes.PROFILE,
  [getHomeRoute()]: AppRoutes.HOME,
  [getTeamRoute()]: AppRoutes.TEAM,
};

export const serviceRoutesByPath: Record<string, AppRoutes> = {
  [getInviteRoute()]: AppRoutes.INVITE,
};
