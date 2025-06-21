import { LazyManageStickersMobile } from './ManageStickers.mobile.async';
import { LazyManageStickersDesktop } from './ManageStickers.desktop.async';

import { useDeviceType } from '@/shared/lib/deviceType/c';

export function ManageStickers() {
  const { isMobile, isDesktop } = useDeviceType();

  return (
    <>
      {isMobile && <LazyManageStickersMobile />}
      {isDesktop && <LazyManageStickersDesktop />}
    </>
  );
}
