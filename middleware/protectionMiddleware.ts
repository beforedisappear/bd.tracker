import { NextRequest, NextResponse } from 'next/server';

import {
  getMainRoutePath,
  getHomeRoutePath,
  routesAccess,
} from '@/shared/config/routes';
import { getRouteByPath } from '@/shared/lib/routes';
import { getCleanPath } from './middleware.utils';

import { REFRESH_TOKEN_COOKIE_NAME } from '@/shared/constants';

export const protectionMiddleware = (req: NextRequest) => {
  const { cookies } = req;

  const isAuth = !!cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  const currentRoute = getRouteByPath(getCleanPath(req.nextUrl.pathname));

  //is authenticated and public url
  if (isAuth && routesAccess[currentRoute] === 'public') {
    return NextResponse.redirect(new URL(getHomeRoutePath(), req.url));
  }
  //is not authenticated and private url
  else if (!isAuth && routesAccess[currentRoute] === 'private') {
    return NextResponse.redirect(new URL(getMainRoutePath(), req.url));
  }

  return null;
};
