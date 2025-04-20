import 'server-only';

import { NextRequest, userAgent } from 'next/server';

export async function getDeviceType(req: NextRequest) {
  const { device } = userAgent({ headers: req.headers });

  const isMobile = device.type === 'mobile' || device.type === 'tablet';

  return {
    isMobile: isMobile,
    isDesktop: !isMobile,
    deviceType: isMobile ? 'mobile' : 'desktop',
  };
}
