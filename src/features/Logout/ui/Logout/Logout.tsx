'use client';

import { Button } from '@/shared/ui/c';

import { useRouter } from 'next/navigation';

import { getMainRoute } from '@/shared/config/routes';
import { removeJwt } from '@/shared/lib/cookies';

interface Props {}

export function Logout({}: Props) {
  const { push } = useRouter();

  const onLogout = () => {
    removeJwt();
    push(getMainRoute());
  };

  return <Button onClick={onLogout}>Выйти</Button>;
}
