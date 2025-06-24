import { useDeviceType } from '@/shared/lib/deviceType/c';

import { LazyCreateProjectDesktop } from './CreateProject.desktop.async';
import { LazyCreateProjectMobile } from './CreateProject.mobile.async';

export const CreateProject = () => {
  const { isMobile, isDesktop } = useDeviceType();

  return (
    <>
      {isMobile && <LazyCreateProjectMobile />}
      {isDesktop && <LazyCreateProjectDesktop />}
    </>
  );
};
