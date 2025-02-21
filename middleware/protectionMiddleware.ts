import { NextRequest, NextResponse } from 'next/server';

import {
  getMainRoute,
  getProfileRoute,
  privateRoutesByPath,
  publicRoutesByPath,
} from '@/shared/config/routes';
import { refreshTokenName } from '@/shared/lib/cookies/config';

export const protectionMiddleware = (req: NextRequest) => {
  const { cookies } = req;

  const isAuth = cookies.get(refreshTokenName)?.value;

  //is authenticated and public url
  if (isAuth && publicRoutesByPath[req.nextUrl.pathname]) {
    return NextResponse.redirect(new URL(getProfileRoute(), req.url));
  }
  //is not authenticated and private url
  else if (!isAuth && privateRoutesByPath[req.nextUrl.pathname]) {
    return NextResponse.redirect(new URL(getMainRoute(), req.url));
  }

  return null;
};
