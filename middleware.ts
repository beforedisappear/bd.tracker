import { protectionMiddleware } from './middleware/protectionMiddleware';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const protectionRes = protectionMiddleware(request);

  if (protectionRes) return protectionRes;

  return null;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
