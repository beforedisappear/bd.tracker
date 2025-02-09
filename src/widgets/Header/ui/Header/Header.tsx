import { HeaderLogo } from '../HeaderLogo/HeaderLogo';

import Link from 'next/link';

interface Props {}

export function Header({}: Props) {
  return (
    <header className='container flex items-center justify-between p-4 h-14 border border-gray-50'>
      <HeaderLogo />

      <Link href={'/login'}>Войти</Link>
    </header>
  );
}
