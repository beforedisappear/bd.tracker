import { SwitchTheme } from '@/features/SwitchTheme';
import { HeaderLogo } from '../HeaderLogo/HeaderLogo';
import { HeaderLoginBtn } from '../HeaderLoginBtn/HeaderLoginBtn';
import { HeaderSheet } from '../HeaderSheet';

import { HeaderNavMenu } from '../HeaderNavMenu';

interface Props {}

export function Header({}: Props) {
  return (
    <header className='sticky top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-slate-700 dark:bg-background'>
      <div className='flex container h-14 justify-between items-center mx-auto'>
        <HeaderLogo />

        <HeaderNavMenu offMobile />

        <div className='flex gap-3'>
          <HeaderLoginBtn />
          <SwitchTheme />
          <HeaderSheet />
        </div>
      </div>
    </header>
  );
}
