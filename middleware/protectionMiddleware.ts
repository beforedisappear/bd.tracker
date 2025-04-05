import { NextRequest, NextResponse } from 'next/server';

import {
  getMainRoute,
  getHomeRoute,
  privateRoutesByPath,
  publicRoutesByPath,
} from '@/shared/config/routes';
import { refreshTokenName } from '@/shared/lib/cookies/config';

export const protectionMiddleware = (req: NextRequest) => {
  const { cookies } = req;

  const isAuth = cookies.get(refreshTokenName)?.value;

  //TODO: продумать проверку вложенных роутов

  //is authenticated and public url
  if (isAuth && publicRoutesByPath[req.nextUrl.pathname]) {
    return NextResponse.redirect(new URL(getHomeRoute(), req.url));
  }
  //is not authenticated and private url
  else if (!isAuth) {
    const currentPathname = req.nextUrl.pathname;

    const pathParts = currentPathname.split('/').filter(Boolean);

    const route = pathParts[pathParts.length - 1];

    if (privateRoutesByPath[`/${route}`])
      return NextResponse.redirect(new URL(getMainRoute(), req.url));
  }

  return null;
};
