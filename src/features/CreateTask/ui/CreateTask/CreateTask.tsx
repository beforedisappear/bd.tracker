import { useDeviceType } from '@/shared/lib/deviceType/c';
import { LazyCreateTaskDesktop } from './CreateTask.desktop.async';
import { LazyCreateTaskMobile } from './CreateTask.mobile.async';

export function CreateTask() {
  const { isDesktop, isMobile } = useDeviceType();

  return (
    <>
      {isDesktop && <LazyCreateTaskDesktop />}
      {isMobile && <LazyCreateTaskMobile />}
    </>
  );
}
