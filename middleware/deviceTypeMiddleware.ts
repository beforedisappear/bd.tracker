import { NextRequest, NextResponse } from 'next/server';
import { getDeviceType } from '@/shared/lib/deviceType/s';
import { getCurrentPath } from './middleware.utils';

export const deviceTypeMiddleware = async (req: NextRequest) => {
  const currentPath = getCurrentPath(req.nextUrl.pathname);
  const { isDesktop } = await getDeviceType(req);

  const pathname = isDesktop
    ? `/desktop${currentPath}`
    : `/mobile${currentPath}`;

  const newUrl = req.nextUrl.clone();
  newUrl.pathname = pathname;

  return NextResponse.rewrite(newUrl);
};
