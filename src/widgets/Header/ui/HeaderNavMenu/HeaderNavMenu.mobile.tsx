'use client';

import Link from 'next/link';
import { routes } from '../../config';
import { buttonVariants } from '@/shared/ui/s';
import { getLoginRoute } from '@/shared/config/routes';

interface Props {
  onSetShowSheet?: (state: boolean) => void;
}

export function HeaderNavMenuMobile({ onSetShowSheet }: Props) {
  const items = [...routes, { label: 'Войти', href: getLoginRoute() }];

  return (
    <nav className='flex flex-col justify-center items-center gap-2 mt-4'>
      {items.map(({ href, label }) => (
        <Link
          rel='noreferrer noopener'
          key={label}
          href={href}
          onClick={() => onSetShowSheet?.(false)}
          scroll={false}
          className={buttonVariants({ variant: 'ghost' })}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
