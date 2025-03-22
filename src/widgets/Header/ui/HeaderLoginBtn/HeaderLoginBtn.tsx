import { getLoginRoute } from '@/shared/config/routes';
import { cn } from '@/shared/lib/css';
import { buttonVariants } from '@/shared/ui/s';

import Link from 'next/link';

interface Props {}

export function HeaderLoginBtn({}: Props) {
  return (
    <Link href={getLoginRoute()} className={cn(buttonVariants(), 'md:hidden')}>
      Войти
    </Link>
  );
}
