import type { PropsWithChildren } from 'react';

import { SetupProjectMenu } from '../SetupProjectMenu/SetupProjectMenu';

interface Props extends PropsWithChildren {}

// TODO: add mobile version
// TODO: mb it's better to use another way
export function SetupProject({ children }: Props) {
  return (
    <div className='flex items-center gap-2'>
      {children}

      <SetupProjectMenu />
    </div>
  );
}
