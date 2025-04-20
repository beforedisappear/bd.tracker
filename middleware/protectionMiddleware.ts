import { NextRequest, NextResponse } from 'next/server';

import {
  getMainRoute,
  getHomeRoute,
  privateRoutesByPath,
  publicRoutesByPath,
} from '@/shared/config/routes';
import { REFRESH_TOKEN_NAME } from '@/shared/constants/cookie.constants';

const getLastPath = (path: string) => {
  const pathParts = path.split('/').filter(Boolean);
  const route = pathParts[pathParts.length - 1];
  return `/${route}`;
};

export const protectionMiddleware = (req: NextRequest) => {
  const { cookies } = req;

  const isAuth = cookies.get(REFRESH_TOKEN_NAME)?.value;

  //is authenticated and public url
  if (isAuth && publicRoutesByPath[req.nextUrl.pathname]) {
    return NextResponse.redirect(new URL(getHomeRoute(), req.url));
  }
  //is not authenticated and private url
  else if (!isAuth && privateRoutesByPath[getLastPath(req.nextUrl.pathname)]) {
    return NextResponse.redirect(new URL(getMainRoute(), req.url));
  }

  return null;
};
