import { headers } from 'next/headers';
import { userAgent } from 'next/server';

export async function getDeviceType() {
  const headersList = await headers();
  const { device } = userAgent({ headers: headersList });

  const isMobile = device.type === 'mobile' || device.type === 'tablet';

  return {
    isMobile: isMobile,
    isDesktop: !isMobile,
    deviceType: isMobile ? 'mobile' : 'desktop',
  };
}
