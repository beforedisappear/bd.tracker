'use client';

import { Button, type ButtonSize, type ButtonVariant } from '@/shared/ui/c';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { getMainRoute } from '@/shared/config/routes';
import { getRefreshToken, removeJwt } from '@/shared/lib/cookies';
import { logoutQueries } from '../../api/queries';
import { toast } from 'sonner';
import {
  ERROR_MESSAGE,
  SENDING_DATA_MESSAGE,
  SUCCESS_MESSAGE,
} from '@/shared/constants';
import { LogOut } from 'lucide-react';

interface Props {
  className?: string;
  btnSize?: ButtonSize;
  btnVariant?: ButtonVariant;
  withLabel?: boolean;
  withIcon?: boolean;
}

export function Logout(props: Props) {
  const {
    className,
    btnSize = 'default',
    btnVariant = 'secondary',
    withLabel = true,
    withIcon = true,
  } = props;

  const { push } = useRouter();

  const { mutateAsync } = useMutation(logoutQueries.logout());

  const onLogout = () => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) throw new Error('REFRESH_TOKEN_UNDEFINED');

    const toastId = toast.loading(SENDING_DATA_MESSAGE);

    mutateAsync({ refreshToken })
      .then(() => toast.success(SUCCESS_MESSAGE, { id: toastId }))
      .catch(() => toast.error(ERROR_MESSAGE, { id: toastId }))
      .finally(() => removeJwt())
      .finally(() => push(getMainRoute()));
  };

  return (
    <Button
      size={btnSize}
      variant={btnVariant}
      onClick={onLogout}
      className={className}
    >
      {withIcon && <LogOut />}
      {withLabel && <span>Выйти</span>}
    </Button>
  );
}
