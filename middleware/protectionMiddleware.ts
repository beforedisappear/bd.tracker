import { NextRequest, NextResponse } from 'next/server';

import {
  getMainRoute,
  getHomeRoute,
  privateRoutesByPath,
  publicRoutesByPath,
} from '@/shared/config/routes';
import { REFRESH_TOKEN_NAME } from '@/shared/constants/cookie.constants';
import { getCurrentPath, getPathTail } from './middleware.utils';

export const protectionMiddleware = (req: NextRequest) => {
  const { cookies } = req;

  const isAuth = !!cookies.get(REFRESH_TOKEN_NAME)?.value;

  const currentPath = getCurrentPath(req.nextUrl.pathname);

  //is authenticated and public url
  if (isAuth && publicRoutesByPath[currentPath]) {
    return NextResponse.redirect(new URL(getHomeRoute(), req.url));
  }
  //is not authenticated and private url
  else if (!isAuth && privateRoutesByPath[getPathTail(currentPath)]) {
    return NextResponse.redirect(new URL(getMainRoute(), req.url));
  }

  return null;
};
