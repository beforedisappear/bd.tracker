'use client';

import { getLoginRoute } from '@/shared/config/routes';
import { buttonVariants } from '@/shared/ui/s';

import Link from 'next/link';

interface Props {}

export function HeaderLoginBtnDesktop({}: Props) {
  return (
    <Link href={getLoginRoute()} scroll={false} className={buttonVariants()}>
      Войти
    </Link>
  );
}
