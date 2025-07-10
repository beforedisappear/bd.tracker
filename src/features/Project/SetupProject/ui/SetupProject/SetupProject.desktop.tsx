import { SetupProjectTitle } from '../SetupProjectTitle/SetupProjectTitle';
import { SetupProjectMenu } from '../SetupProjectMenu/SetupProjectMenu';

import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export function SetupProjectDesktop(props: Props) {
  const { children } = props;

  return (
    <div className='flex items-center gap-2'>
      {children}
      <SetupProjectTitle />
      <SetupProjectMenu />
    </div>
  );
}
