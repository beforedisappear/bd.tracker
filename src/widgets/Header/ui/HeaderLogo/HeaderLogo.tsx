import Link from 'next/link';

import Logo from '@/shared/assets/icons/Logo.svgr';

import { SITE_NAME } from '@/shared/constants';
import { getMainRoute } from '@/shared/config/routes';

interface Props {}

export function HeaderLogo({}: Props) {
  return (
    <Link href={getMainRoute()} className='flex items-center font-bold text-xl'>
      <Logo className='lucide lucide-panels-top-left mr-2 w-6 h-6' />
      <span>{SITE_NAME}</span>
    </Link>
  );
}
