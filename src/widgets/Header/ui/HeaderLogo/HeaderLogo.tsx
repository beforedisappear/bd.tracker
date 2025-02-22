import Link from 'next/link';

import { getMainRoute } from '@/shared/config/routes';

interface Props {}

export function HeaderLogo({}: Props) {
  return <Link href={getMainRoute()}>BD.tracker</Link>;
}
