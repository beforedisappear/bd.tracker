import { NextRequest, NextResponse } from 'next/server';
import { getDeviceType } from '@/shared/lib/deviceType/s';
import { getCleanPath } from './middleware.utils';

export const deviceTypeMiddleware = async (req: NextRequest) => {
  const cleanPath = getCleanPath(req.nextUrl.pathname);
  const { isDesktop } = await getDeviceType(req);

  const pathname = isDesktop ? `/desktop${cleanPath}` : `/mobile${cleanPath}`;

  const newUrl = req.nextUrl.clone();
  newUrl.pathname = pathname;

  return NextResponse.rewrite(newUrl);
};
