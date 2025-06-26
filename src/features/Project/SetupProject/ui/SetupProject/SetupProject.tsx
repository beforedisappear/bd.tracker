import type { PropsWithChildren } from 'react';

import { useDeviceType } from '@/shared/lib/deviceType/c';
import { SetupProjectMenu } from '../SetupProjectMenu';
import { SetupProjectTitle } from '../SetupProjectTitle/SetupProjectTitle';

interface Props extends PropsWithChildren {}

// TODO: add mobile version
// TODO: mb it's better to use another way
export function SetupProject({ children }: Props) {
  const { isDesktop } = useDeviceType();

  return (
    <div className='flex items-center gap-2'>
      {isDesktop && children}

      <SetupProjectTitle />
      <SetupProjectMenu />
    </div>
  );
}
