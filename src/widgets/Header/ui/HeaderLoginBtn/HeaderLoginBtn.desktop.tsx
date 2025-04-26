'use client';

import { getLoginRoutePath } from '@/shared/config/routes';
import { buttonVariants } from '@/shared/ui/s';

import Link from 'next/link';

interface Props {}

export function HeaderLoginBtnDesktop({}: Props) {
  return (
    <Link
      href={getLoginRoutePath()}
      scroll={false}
      className={buttonVariants()}
    >
      Войти
    </Link>
  );
}
