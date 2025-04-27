import { AppRoutes, routePatterns } from '../../../config/routes';
import { match } from 'path-to-regexp';

export const getRouteByPath = (pathname: string): AppRoutes => {
  for (const [routeKey, pattern] of Object.entries(routePatterns)) {
    if (pattern === '*') continue;

    const matcher = match(pattern, { decode: decodeURIComponent });

    const matched = matcher(pathname);

    if (matched) return routeKey as AppRoutes;
  }

  return AppRoutes.NOT_FOUND;
};
