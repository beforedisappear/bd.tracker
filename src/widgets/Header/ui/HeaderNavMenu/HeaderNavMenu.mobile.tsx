'use client';

import Link from 'next/link';
import { routes } from '../../config';
import { buttonVariants } from '@/shared/ui/s';

interface Props {}

export function MobileHeaderNavMenu({}: Props) {
  return (
    <nav className='flex flex-col justify-center items-center gap-2 mt-4'>
      {routes.map(({ href, label }) => (
        <Link
          rel='noreferrer noopener'
          key={label}
          href={href}
          // onClick={() => setIsOpen(false)}
          className={buttonVariants({ variant: 'ghost' })}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
