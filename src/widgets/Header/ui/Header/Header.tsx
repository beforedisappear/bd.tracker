import { SwitchTheme } from '@/features/SwitchTheme';
import { HeaderLogo } from '../HeaderLogo/HeaderLogo';
import Link from 'next/link';

import { getLoginRoute } from '@/shared/config/routes';

interface Props {}

export function Header({}: Props) {
  return (
    <header className='container flex items-center justify-between p-4 h-14 '>
      <HeaderLogo />

      <Link href={getLoginRoute()}>Войти</Link>

      <SwitchTheme />
    </header>
  );
}
