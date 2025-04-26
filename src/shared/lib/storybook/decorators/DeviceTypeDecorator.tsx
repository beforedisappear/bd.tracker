import { DeviceTypeProvider } from '@/app/providers/DeviceTypeProvider/testing';
import type { Decorator } from '@storybook/react';

export const DeviceTypeDecorator: Decorator = StoryComponent => {
  return (
    <DeviceTypeProvider
      value={{ isDesktop: true, isMobile: false, deviceType: 'desktop' }}
    >
      <StoryComponent />
    </DeviceTypeProvider>
  );
};
