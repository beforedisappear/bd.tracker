'use client';

import { SwitchTheme } from '@/features/SwitchTheme';
import { HeaderLogo } from '../HeaderLogo/HeaderLogo';
import { HeaderLoginBtnDesktop } from '../HeaderLoginBtn';
import { HeaderSheetMobile } from '../HeaderSheet';

import { HeaderNavMenuDesktop } from '../HeaderNavMenu';
import { useDeviceType } from '@/shared/lib/deviceType/hooks';

interface Props {}

export function Header({}: Props) {
  const { isDesktop, isMobile } = useDeviceType();

  return (
    <header className='sticky top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-slate-700 dark:bg-background'>
      <div className='flex container h-14 justify-between items-center mx-auto'>
        <HeaderLogo />

        {isDesktop && <HeaderNavMenuDesktop />}

        <div className='flex gap-3'>
          {isDesktop && <HeaderLoginBtnDesktop />}
          <SwitchTheme />
          {isMobile && <HeaderSheetMobile />}
        </div>
      </div>
    </header>
  );
}
