import { useDeviceType } from '@/shared/lib/deviceType/c';
import { LazyCreateColumnDesktop } from './CreateColumn.desktop.async';
import { LazyCreateColumnMobile } from './CreateColumn.mobile.async';

export function CreateColumn() {
  const { isDesktop, isMobile } = useDeviceType();

  return (
    <>
      {isDesktop && <LazyCreateColumnDesktop />}
      {isMobile && <LazyCreateColumnMobile />}
    </>
  );
}
