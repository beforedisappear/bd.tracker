'use client';

import { useDeviceType } from '@/shared/lib/deviceType/c';

import { LazyChangeEmailFormMobile } from './ChangeEmail.mobile.async';
import { LazyChangeEmailFormDesktop } from './ChangeEmail.desktop.async';

interface Props {
  email: string;
}

export const ChangeEmail = ({ email }: Props) => {
  const { isMobile, isDesktop } = useDeviceType();

  return (
    <>
      {isMobile && <LazyChangeEmailFormMobile email={email} />}
      {isDesktop && <LazyChangeEmailFormDesktop email={email} />}
    </>
  );
};
