export type DeviceType = 'mobile' | 'desktop';

export type DeviceContext = {
  deviceType: DeviceType;
  isMobile: boolean;
  isDesktop: boolean;
};
